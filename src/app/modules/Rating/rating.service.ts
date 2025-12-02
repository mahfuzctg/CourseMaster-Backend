import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TRating } from './rating.interface';
import { Rating } from './rating.model';

const createRatingIntoDB = async (payload: TRating) => {
    const isRatingExists = await Rating.findOne({
        student: payload.student,
        course: payload.course,
    });

    if (isRatingExists) {
        throw new AppError(httpStatus.CONFLICT, 'You have already rated this course !');
    }

    const result = await Rating.create(payload);
    return result;
};

const getAllRatingsFromDB = async (query: Record<string, unknown>) => {
    const ratingQuery = new QueryBuilder(
        Rating.find().populate('student').populate('course'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await ratingQuery.modelQuery;
    const meta = await ratingQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getAverageRatingFromDB = async (courseId: string) => {
    const result = await Rating.aggregate([
        {
            $match: {
                course: courseId,
            },
        },
        {
            $group: {
                _id: '$course',
                averageRating: { $avg: '$rating' },
                totalRatings: { $sum: 1 },
            },
        },
    ]);

    return result[0];
};

export const RatingServices = {
    createRatingIntoDB,
    getAllRatingsFromDB,
    getAverageRatingFromDB,
};
