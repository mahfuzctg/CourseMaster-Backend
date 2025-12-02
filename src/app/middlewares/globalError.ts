/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';

export type TErrorSources = {
    path: string | number;
    message: string;
}[];

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];

    if (err instanceof ZodError) {
        statusCode = 400;
        message = 'Validation Error';
        errorSources = err.issues.map(issue => {
            return {
                path: issue.path[issue.path.length - 1] as string | number,
                message: issue.message,
            };
        });
    } else if (err?.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        errorSources = Object.values(err.errors).map(
            (val: any) => {
                return {
                    path: val?.path,
                    message: val?.message,
                };
            },
        );
    } else if (err?.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID';
        errorSources = [
            {
                path: err.path,
                message: err.message,
            },
        ];
    } else if (err?.code === 11000) {
        statusCode = 400;
        message = 'Duplicate Entry';
        errorSources = [
            {
                path: '',
                message: err.message,
            },
        ];
    } else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: config.env === 'development' ? err?.stack : null,
    });
};

export default globalErrorHandler;
