import { Types } from 'mongoose';

export type TModule = {
    title: string;
    course: Types.ObjectId;
    isDeleted: boolean;
};
