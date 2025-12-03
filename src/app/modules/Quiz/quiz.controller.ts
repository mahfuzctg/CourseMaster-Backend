import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { QuizServices } from './quiz.service';

const createQuiz = catchAsync(async (req, res) => {
    const result = await QuizServices.createQuizIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Quiz is created successfully',
        data: result,
    });
});

const getAllQuizzes = catchAsync(async (req, res) => {
    const result = await QuizServices.getAllQuizzesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Quizzes are retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleQuiz = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await QuizServices.getSingleQuizFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Quiz is retrieved successfully',
        data: result,
    });
});

const updateQuiz = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await QuizServices.updateQuizIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Quiz is updated successfully',
        data: result,
    });
});

const deleteQuiz = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await QuizServices.deleteQuizFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Quiz is deleted successfully',
        data: result,
    });
});

export const QuizControllers = {
    createQuiz,
    getAllQuizzes,
    getSingleQuiz,
    updateQuiz,
    deleteQuiz,
};
