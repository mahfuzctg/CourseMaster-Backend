import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProgressServices } from './progress.service';

const updateProgress = catchAsync(async (req, res) => {
    const { userId } = req.user;
    const result = await ProgressServices.updateProgressIntoDB({
        ...req.body,
        student: userId,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Progress is updated successfully',
        data: result,
    });
});

const getMyProgress = catchAsync(async (req, res) => {
    const { userId } = req.user;
    const result = await ProgressServices.getMyProgressFromDB(userId, req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Progress is retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

export const ProgressControllers = {
    updateProgress,
    getMyProgress,
};
