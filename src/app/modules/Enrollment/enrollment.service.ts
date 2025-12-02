import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TEnrollment } from './enrollment.interface';
import { Enrollment } from './enrollment.model';

const createEnrollmentIntoDB = async (payload: TEnrollment) => {
    const isEnrollmentExists = await Enrollment.findOne({
        student: payload.student,
        course: payload.course,
    });

    if (isEnrollmentExists) {
        throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled !');
    }

    const result = await Enrollment.create(payload);
    return result;
};

const getAllEnrollmentsFromDB = async (query: Record<string, unknown>) => {
    const enrollmentQuery = new QueryBuilder(
        Enrollment.find().populate('student').populate('course').populate('batch'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await enrollmentQuery.modelQuery;
    const meta = await enrollmentQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getSingleEnrollmentFromDB = async (id: string) => {
    const result = await Enrollment.findById(id)
        .populate('student')
        .populate('course')
        .populate('batch');
    return result;
};

const updateEnrollmentIntoDB = async (
    id: string,
    payload: Partial<TEnrollment>,
) => {
    const result = await Enrollment.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteEnrollmentFromDB = async (id: string) => {
    const result = await Enrollment.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};

export const EnrollmentServices = {
    createEnrollmentIntoDB,
    getAllEnrollmentsFromDB,
    getSingleEnrollmentFromDB,
    updateEnrollmentIntoDB,
    deleteEnrollmentFromDB,
};
