import { Schema, model } from 'mongoose';
import { TQuizSubmission } from './quizSubmission.interface';

const quizSubmissionSchema = new Schema<TQuizSubmission>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        quiz: {
            type: Schema.Types.ObjectId,
            ref: 'Quiz',
            required: true,
        },
        answers: [
            {
                question: {
                    type: String,
                    required: true,
                },
                selectedOption: {
                    type: String,
                    required: true,
                },
            },
        ],
        score: {
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

export const QuizSubmission = model<TQuizSubmission>(
    'QuizSubmission',
    quizSubmissionSchema,
);
