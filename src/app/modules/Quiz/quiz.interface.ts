import { Types } from 'mongoose';

export type TQuestion = {
    question: string;
    options: string[];
    correctAnswer: string;
};

export type TQuiz = {
    title: string;
    module: Types.ObjectId;
    questions: TQuestion[];
    isDeleted: boolean;
};
