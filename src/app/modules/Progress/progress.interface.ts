import { Types } from 'mongoose';

export type TProgress = {
    student: Types.ObjectId;
    course: Types.ObjectId;
    completedLessons: Types.ObjectId[];
    completedModules: Types.ObjectId[];
    totalCompletedLessons: number;
    totalCompletedModules: number;
    isDeleted: boolean;
};
