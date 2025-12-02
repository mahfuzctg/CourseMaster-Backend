import { Schema, model } from 'mongoose';
import { TLesson } from './lesson.interface';

const lessonSchema = new Schema<TLesson>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        module: {
            type: Schema.Types.ObjectId,
            ref: 'Module',
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export const Lesson = model<TLesson>('Lesson', lessonSchema);
