import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { QuizSubmissionServices } from './quizSubmission.service';

const createQuizSubmission = catchAsync(async (req, res) => {
    const result = await QuizSubmissionServices.createQuizSubmissionIntoDB(
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'QuizSubmission is created successfully',
        data: result,
    });
});

const getAllQuizSubmissions = catchAsync(async (req, res) => {
    const result = await QuizSubmissionServices.getAllQuizSubmissionsFromDB(
        req.query,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'QuizSubmissions are retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleQuizSubmission = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await QuizSubmissionServices.getSingleQuizSubmissionFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'QuizSubmission is retrieved successfully',
        data: result,
    });
});

const updateQuizSubmission = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await QuizSubmissionServices.updateQuizSubmissionIntoDB(
        id,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'QuizSubmission is updated successfully',
        data: result,
    });
});

const deleteQuizSubmission = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await QuizSubmissionServices.deleteQuizSubmissionFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'QuizSubmission is deleted successfully',
        data: result,
    });
});

export const QuizSubmissionControllers = {
    createQuizSubmission,
    getAllQuizSubmissions,
    getSingleQuizSubmission,
    updateQuizSubmission,
    deleteQuizSubmission,
};
