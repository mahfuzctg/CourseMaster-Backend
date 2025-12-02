import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
    const result = await ReviewServices.createReviewIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review is created successfully',
        data: result,
    });
});

const getAllReviews = catchAsync(async (req, res) => {
    const result = await ReviewServices.getAllReviewsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reviews are retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ReviewServices.getSingleReviewFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review is retrieved successfully',
        data: result,
    });
});

const updateReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ReviewServices.updateReviewIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review is updated successfully',
        data: result,
    });
});

const deleteReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ReviewServices.deleteReviewFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review is deleted successfully',
        data: result,
    });
});

export const ReviewControllers = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};
