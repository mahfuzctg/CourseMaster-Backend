import QueryBuilder from '../../builder/QueryBuilder';
import { TModule } from './module.interface';
import { Module } from './module.model';

const createModuleIntoDB = async (payload: TModule) => {
    const result = await Module.create(payload);
    return result;
};

const getAllModulesFromDB = async (query: Record<string, unknown>) => {
    const moduleQuery = new QueryBuilder(Module.find().populate('course'), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await moduleQuery.modelQuery;
    const meta = await moduleQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getSingleModuleFromDB = async (id: string) => {
    const result = await Module.findById(id).populate('course');
    return result;
};

const updateModuleIntoDB = async (id: string, payload: Partial<TModule>) => {
    const result = await Module.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteModuleFromDB = async (id: string) => {
    const result = await Module.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};

export const ModuleServices = {
    createModuleIntoDB,
    getAllModulesFromDB,
    getSingleModuleFromDB,
    updateModuleIntoDB,
    deleteModuleFromDB,
};
