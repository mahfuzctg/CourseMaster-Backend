import { Schema, model } from 'mongoose';
import { TProgress } from './progress.interface';

const progressSchema = new Schema<TProgress>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        completedLessons: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Lesson',
            },
        ],
        completedModules: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Module',
            },
        ],
        totalCompletedLessons: {
            type: Number,
            default: 0,
        },
        totalCompletedModules: {
            type: Number,
            default: 0,
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

export const Progress = model<TProgress>('Progress', progressSchema);
