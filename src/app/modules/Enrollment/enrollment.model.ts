import { Schema, model } from 'mongoose';
import { TEnrollment } from './enrollment.interface';

const enrollmentSchema = new Schema<TEnrollment>(
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
        batch: {
            type: Schema.Types.ObjectId,
            ref: 'Batch',
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

export const Enrollment = model<TEnrollment>('Enrollment', enrollmentSchema);
