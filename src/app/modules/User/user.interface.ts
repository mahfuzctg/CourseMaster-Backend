import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUserRole = keyof typeof USER_ROLE;

export type TUser = {
    id: string;
    email: string;
    password?: string;
    needsPasswordChange: boolean;
    role: TUserRole;
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
    passwordChangedAt?: Date;
};

export interface UserModel extends Model<TUser> {
    // eslint-disable-next-line no-unused-vars
    isUserExistsByCustomId(id: string): Promise<TUser | null>;
    // eslint-disable-next-line no-unused-vars
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
    // eslint-disable-next-line no-unused-vars
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
    ): boolean;
}
