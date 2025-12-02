import { Types } from 'mongoose';

export type TAssignment = {
    title: string;
    module: Types.ObjectId;
    description: string;
    dueDate: Date;
    isDeleted: boolean;
};
