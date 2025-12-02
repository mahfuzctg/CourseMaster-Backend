import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrollmentServices } from './enrollment.service';

const createEnrollment = catchAsync(async (req, res) => {
    const result = await EnrollmentServices.createEnrollmentIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Enrollment is created successfully',
        data: result,
    });
});

const getAllEnrollments = catchAsync(async (req, res) => {
    const result = await EnrollmentServices.getAllEnrollmentsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Enrollments are retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleEnrollment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await EnrollmentServices.getSingleEnrollmentFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Enrollment is retrieved successfully',
        data: result,
    });
});

const updateEnrollment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await EnrollmentServices.updateEnrollmentIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Enrollment is updated successfully',
        data: result,
    });
});

const deleteEnrollment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await EnrollmentServices.deleteEnrollmentFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Enrollment is deleted successfully',
        data: result,
    });
});

export const EnrollmentControllers = {
    createEnrollment,
    getAllEnrollments,
    getSingleEnrollment,
    updateEnrollment,
    deleteEnrollment,
};
