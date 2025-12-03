import QueryBuilder from '../../builder/QueryBuilder';
import { Quiz } from '../Quiz/quiz.model';
import { TQuizSubmission } from './quizSubmission.interface';
import { QuizSubmission } from './quizSubmission.model';

const createQuizSubmissionIntoDB = async (payload: TQuizSubmission) => {
    // Calculate score
    const quiz = await Quiz.findById(payload.quiz);
    let score = 0;

    if (quiz) {
        payload.answers.forEach(answer => {
            const question = quiz.questions.find(q => q.question === answer.question);
            if (question && question.correctAnswer === answer.selectedOption) {
                score += 1;
            }
        });
    }

    payload.score = score;

    const result = await QuizSubmission.create(payload);
    return result;
};

const getAllQuizSubmissionsFromDB = async (query: Record<string, unknown>) => {
    const quizSubmissionQuery = new QueryBuilder(
        QuizSubmission.find().populate('student').populate('quiz'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await quizSubmissionQuery.modelQuery;
    const meta = await quizSubmissionQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getSingleQuizSubmissionFromDB = async (id: string) => {
    const result = await QuizSubmission.findById(id)
        .populate('student')
        .populate('quiz');
    return result;
};

const updateQuizSubmissionIntoDB = async (
    id: string,
    payload: Partial<TQuizSubmission>,
) => {
    const result = await QuizSubmission.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteQuizSubmissionFromDB = async (id: string) => {
    const result = await QuizSubmission.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};

export const QuizSubmissionServices = {
    createQuizSubmissionIntoDB,
    getAllQuizSubmissionsFromDB,
    getSingleQuizSubmissionFromDB,
    updateQuizSubmissionIntoDB,
    deleteQuizSubmissionFromDB,
};
