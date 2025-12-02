import { Schema, model } from 'mongoose';
import { TModule } from './module.interface';

const moduleSchema = new Schema<TModule>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
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

export const Module = model<TModule>('Module', moduleSchema);
