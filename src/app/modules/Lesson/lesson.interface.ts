import { Types } from 'mongoose';

export type TLesson = {
    title: string;
    module: Types.ObjectId;
    videoUrl: string;
    duration: string;
    isDeleted: boolean;
};
