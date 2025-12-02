import { Schema, model } from 'mongoose';
import { TQuestion, TQuiz } from './quiz.interface';

const questionSchema = new Schema<TQuestion>({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
});

const quizSchema = new Schema<TQuiz>(
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
        questions: [questionSchema],
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export const Quiz = model<TQuiz>('Quiz', quizSchema);
