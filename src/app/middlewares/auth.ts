import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { User } from '../modules/User/user.model';
import type { TUserRole } from '../modules/User/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let token = req.headers.authorization;

        // Check if token exists
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
        }

        // Remove 'Bearer ' prefix if it exists
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trim();
        }

        let decoded: JwtPayload;
        try {
            decoded = jwt.verify(token, config.jwt.access_secret as string) as JwtPayload;
        } catch (err) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
        }

        const { role, userId, iat } = decoded;

        // Find user in DB using 'id' field
        const user = await User.isUserExistsByCustomId(userId);

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
        }

        if (user.isDeleted) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
        }

        if (user.status === 'blocked') {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
        }

        if (user.passwordChangedAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
        }

        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
        }

        req.user = decoded;
        next();
    });
};


export default auth;
