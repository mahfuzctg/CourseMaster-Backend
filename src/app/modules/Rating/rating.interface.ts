import { Types } from 'mongoose';

export type TRating = {
    student: Types.ObjectId;
    course: Types.ObjectId;
    rating: number;
    review: string;
    isDeleted: boolean;
};
