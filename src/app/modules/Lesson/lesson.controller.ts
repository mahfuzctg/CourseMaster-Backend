import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { LessonServices } from './lesson.service';

const createLesson = catchAsync(async (req, res) => {
    const result = await LessonServices.createLessonIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Lesson is created successfully',
        data: result,
    });
});

const getAllLessons = catchAsync(async (req, res) => {
    const result = await LessonServices.getAllLessonsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Lessons are retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleLesson = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LessonServices.getSingleLessonFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Lesson is retrieved successfully',
        data: result,
    });
});

const updateLesson = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LessonServices.updateLessonIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Lesson is updated successfully',
        data: result,
    });
});

const deleteLesson = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await LessonServices.deleteLessonFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Lesson is deleted successfully',
        data: result,
    });
});

export const LessonControllers = {
    createLesson,
    getAllLessons,
    getSingleLesson,
    updateLesson,
    deleteLesson,
};
