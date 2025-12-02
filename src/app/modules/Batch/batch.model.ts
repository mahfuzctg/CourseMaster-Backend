import { Schema, model } from 'mongoose';
import { TBatch } from './batch.interface';

const batchSchema = new Schema<TBatch>(
    {
        batchNumber: {
            type: Number,
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        instructors: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Faculty',
            },
        ],
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export const Batch = model<TBatch>('Batch', batchSchema);
