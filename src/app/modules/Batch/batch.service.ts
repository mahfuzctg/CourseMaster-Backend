import QueryBuilder from '../../builder/QueryBuilder';
import { TBatch } from './batch.interface';
import { Batch } from './batch.model';

const createBatchIntoDB = async (payload: TBatch) => {
    const result = await Batch.create(payload);
    return result;
};

const getAllBatchesFromDB = async (query: Record<string, unknown>) => {
    const batchQuery = new QueryBuilder(Batch.find().populate('course'), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await batchQuery.modelQuery;
    const meta = await batchQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getSingleBatchFromDB = async (id: string) => {
    const result = await Batch.findById(id).populate('course');
    return result;
};

const updateBatchIntoDB = async (id: string, payload: Partial<TBatch>) => {
    const result = await Batch.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteBatchFromDB = async (id: string) => {
    const result = await Batch.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};

export const BatchServices = {
    createBatchIntoDB,
    getAllBatchesFromDB,
    getSingleBatchFromDB,
    updateBatchIntoDB,
    deleteBatchFromDB,
};
