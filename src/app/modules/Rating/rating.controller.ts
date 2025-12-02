import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RatingServices } from './rating.service';

const createRating = catchAsync(async (req, res) => {
    const result = await RatingServices.createRatingIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rating is created successfully',
        data: result,
    });
});

const getAllRatings = catchAsync(async (req, res) => {
    const result = await RatingServices.getAllRatingsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Ratings are retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getAverageRating = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const result = await RatingServices.getAverageRatingFromDB(courseId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Average rating is retrieved successfully',
        data: result,
    });
});

export const RatingControllers = {
    createRating,
    getAllRatings,
    getAverageRating,
};
