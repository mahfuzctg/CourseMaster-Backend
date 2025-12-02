import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AssignmentServices } from './assignment.service';

const createAssignment = catchAsync(async (req, res) => {
    const result = await AssignmentServices.createAssignmentIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Assignment is created successfully',
        data: result,
    });
});

const getAllAssignments = catchAsync(async (req, res) => {
    const result = await AssignmentServices.getAllAssignmentsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Assignments are retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleAssignment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AssignmentServices.getSingleAssignmentFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Assignment is retrieved successfully',
        data: result,
    });
});

const updateAssignment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AssignmentServices.updateAssignmentIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Assignment is updated successfully',
        data: result,
    });
});

const deleteAssignment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AssignmentServices.deleteAssignmentFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Assignment is deleted successfully',
        data: result,
    });
});

export const AssignmentControllers = {
    createAssignment,
    getAllAssignments,
    getSingleAssignment,
    updateAssignment,
    deleteAssignment,
};
