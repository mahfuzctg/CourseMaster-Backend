import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
    {
        assignment: {
            type: Schema.Types.ObjectId,
            ref: 'Assignment',
            required: true,
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        submission: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
        },
        feedback: {
            type: String,
        },
        status: {
            type: String,
            enum: ['pending', 'reviewed'],
            default: 'pending',
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

export const Review = model<TReview>('Review', reviewSchema);
