import { Types } from 'mongoose';

export type TBatch = {
    batchNumber: number;
    course: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    instructors: [Types.ObjectId];
    isDeleted: boolean;
};
