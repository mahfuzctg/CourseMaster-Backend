import { Types } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TProgress } from './progress.interface';
import { Progress } from './progress.model';

const updateProgressIntoDB = async (payload: {
    student: string;
    course: string;
    lesson: string;
    module: string;
}) => {
    const { student, course, lesson, module } = payload;

    const isProgressExists = await Progress.findOne({
        student,
        course,
    });

    if (!isProgressExists) {
        const newProgress: Partial<TProgress> = {
            student: new Types.ObjectId(student),
            course: new Types.ObjectId(course),
            completedLessons: [new Types.ObjectId(lesson)],
            completedModules: [new Types.ObjectId(module)],
            totalCompletedLessons: 1,
            totalCompletedModules: 1,
        };
        const result = await Progress.create(newProgress);
        return result;
    }

    const result = await Progress.findOneAndUpdate(
        {
            student,
            course,
        },
        {
            $addToSet: {
                completedLessons: lesson,
                completedModules: module,
            },
            $inc: {
                totalCompletedLessons: 1,
                totalCompletedModules: 1,
            },
        },
        {
            new: true,
        },
    );

    return result;
};

const getMyProgressFromDB = async (userId: string, query: Record<string, unknown>) => {
    const progressQuery = new QueryBuilder(
        Progress.find({ student: userId }).populate('course'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await progressQuery.modelQuery;
    const meta = await progressQuery.countTotal();

    return {
        meta,
        result,
    };
};

export const ProgressServices = {
    updateProgressIntoDB,
    getMyProgressFromDB,
};
