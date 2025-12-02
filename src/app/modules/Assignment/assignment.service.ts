import QueryBuilder from '../../builder/QueryBuilder';
import { TAssignment } from './assignment.interface';
import { Assignment } from './assignment.model';

const createAssignmentIntoDB = async (payload: TAssignment) => {
    const result = await Assignment.create(payload);
    return result;
};

const getAllAssignmentsFromDB = async (query: Record<string, unknown>) => {
    const assignmentQuery = new QueryBuilder(
        Assignment.find().populate('module'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await assignmentQuery.modelQuery;
    const meta = await assignmentQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getSingleAssignmentFromDB = async (id: string) => {
    const result = await Assignment.findById(id).populate('module');
    return result;
};

const updateAssignmentIntoDB = async (
    id: string,
    payload: Partial<TAssignment>,
) => {
    const result = await Assignment.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteAssignmentFromDB = async (id: string) => {
    const result = await Assignment.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};

export const AssignmentServices = {
    createAssignmentIntoDB,
    getAllAssignmentsFromDB,
    getSingleAssignmentFromDB,
    updateAssignmentIntoDB,
    deleteAssignmentFromDB,
};
