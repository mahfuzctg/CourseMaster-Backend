import QueryBuilder from '../../builder/QueryBuilder';
import { TLesson } from './lesson.interface';
import { Lesson } from './lesson.model';

const createLessonIntoDB = async (payload: TLesson) => {
    const result = await Lesson.create(payload);
    return result;
};

const getAllLessonsFromDB = async (query: Record<string, unknown>) => {
    const lessonQuery = new QueryBuilder(Lesson.find().populate('module'), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await lessonQuery.modelQuery;
    const meta = await lessonQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getSingleLessonFromDB = async (id: string) => {
    const result = await Lesson.findById(id).populate('module');
    return result;
};

const updateLessonIntoDB = async (id: string, payload: Partial<TLesson>) => {
    const result = await Lesson.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteLessonFromDB = async (id: string) => {
    const result = await Lesson.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};

export const LessonServices = {
    createLessonIntoDB,
    getAllLessonsFromDB,
    getSingleLessonFromDB,
    updateLessonIntoDB,
    deleteLessonFromDB,
};
