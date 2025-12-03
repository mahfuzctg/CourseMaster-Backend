import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BatchServices } from './batch.service';

const createBatch = catchAsync(async (req, res) => {
    const result = await BatchServices.createBatchIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Batch is created successfully',
        data: result,
    });
});

const getAllBatches = catchAsync(async (req, res) => {
    const result = await BatchServices.getAllBatchesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Batches are retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleBatch = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BatchServices.getSingleBatchFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Batch is retrieved successfully',
        data: result,
    });
});

const updateBatch = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BatchServices.updateBatchIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Batch is updated successfully',
        data: result,
    });
});

const deleteBatch = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BatchServices.deleteBatchFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Batch is deleted successfully',
        data: result,
    });
});

export const BatchControllers = {
    createBatch,
    getAllBatches,
    getSingleBatch,
    updateBatch,
    deleteBatch,
};
