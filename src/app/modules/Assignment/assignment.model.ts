import { Schema, model } from 'mongoose';
import { TAssignment } from './assignment.interface';

const assignmentSchema = new Schema<TAssignment>(
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
        description: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date,
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

export const Assignment = model<TAssignment>('Assignment', assignmentSchema);
