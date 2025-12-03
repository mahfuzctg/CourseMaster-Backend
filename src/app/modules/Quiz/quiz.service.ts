import QueryBuilder from '../../builder/QueryBuilder';
import { TQuiz } from './quiz.interface';
import { Quiz } from './quiz.model';

const createQuizIntoDB = async (payload: TQuiz) => {
    const result = await Quiz.create(payload);
    return result;
};

const getAllQuizzesFromDB = async (query: Record<string, unknown>) => {
    const quizQuery = new QueryBuilder(Quiz.find().populate('module'), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await quizQuery.modelQuery;
    const meta = await quizQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getSingleQuizFromDB = async (id: string) => {
    const result = await Quiz.findById(id).populate('module');
    return result;
};

const updateQuizIntoDB = async (id: string, payload: Partial<TQuiz>) => {
    const result = await Quiz.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteQuizFromDB = async (id: string) => {
    const result = await Quiz.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};

export const QuizServices = {
    createQuizIntoDB,
    getAllQuizzesFromDB,
    getSingleQuizFromDB,
    updateQuizIntoDB,
    deleteQuizFromDB,
};
