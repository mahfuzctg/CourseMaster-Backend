import { Types } from 'mongoose';

export type TQuizSubmission = {
    student: Types.ObjectId;
    quiz: Types.ObjectId;
    answers: {
        question: string;
        selectedOption: string;
    }[];
    score: number;
    isDeleted: boolean;
};
