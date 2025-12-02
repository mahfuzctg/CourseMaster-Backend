import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ModuleServices } from './module.service';

const createModule = catchAsync(async (req, res) => {
    const result = await ModuleServices.createModuleIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Module is created successfully',
        data: result,
    });
});

const getAllModules = catchAsync(async (req, res) => {
    const result = await ModuleServices.getAllModulesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Modules are retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleModule = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ModuleServices.getSingleModuleFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Module is retrieved successfully',
        data: result,
    });
});

const updateModule = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ModuleServices.updateModuleIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Module is updated successfully',
        data: result,
    });
});

const deleteModule = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ModuleServices.deleteModuleFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Module is deleted successfully',
        data: result,
    });
});

export const ModuleControllers = {
    createModule,
    getAllModules,
    getSingleModule,
    updateModule,
    deleteModule,
};
