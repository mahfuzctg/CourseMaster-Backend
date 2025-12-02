import QueryBuilder from '../../builder/QueryBuilder';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
    const result = await Review.create(payload);
    return result;
};

const getAllReviewsFromDB = async (query: Record<string, unknown>) => {
    const reviewQuery = new QueryBuilder(
        Review.find().populate('assignment').populate('student'),
        query,
    )
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await reviewQuery.modelQuery;
    const meta = await reviewQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getSingleReviewFromDB = async (id: string) => {
    const result = await Review.findById(id)
        .populate('assignment')
        .populate('student');
    return result;
};

const updateReviewIntoDB = async (id: string, payload: Partial<TReview>) => {
    const result = await Review.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteReviewFromDB = async (id: string) => {
    const result = await Review.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};

export const ReviewServices = {
    createReviewIntoDB,
    getAllReviewsFromDB,
    getSingleReviewFromDB,
    updateReviewIntoDB,
    deleteReviewFromDB,
};
