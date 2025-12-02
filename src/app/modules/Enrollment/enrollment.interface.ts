import { Types } from 'mongoose';

export type TEnrollment = {
    student: Types.ObjectId;
    course: Types.ObjectId;
    batch: Types.ObjectId;
    isDeleted: boolean;
};
