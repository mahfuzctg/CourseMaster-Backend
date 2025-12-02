import { Types } from 'mongoose';

export type TReview = {
    assignment: Types.ObjectId;
    student: Types.ObjectId;
    submission: string;
    score?: number;
    feedback?: string;
    status: 'pending' | 'reviewed';
    isDeleted: boolean;
};
