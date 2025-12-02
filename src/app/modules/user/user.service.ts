import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TStudent } from '../Student/student.interface';
import { Student } from '../Student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createStudentIntoDB = async (file: any, password: string, payload: TStudent) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.jwt.access_secret as string);

    //set student role
    userData.role = 'student';
    //set student email
    userData.email = payload.email;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set manually generated it
        userData.id = 'S-' + Date.now();

        if (file) {
            const imageName = `${userData.id}${payload?.name?.firstName}`;
            const path = file?.path;
            const { secure_url } = (await sendImageToCloudinary(
                imageName,
                path,
            )) as any;
            payload.profileImg = secure_url as string;
        }

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session }); // array

        //create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a student (transaction-2)
        const newStudent = await Student.create([payload], { session });

        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
        }

        await session.commitTransaction();
        await session.endSession();

        return newStudent;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

const createAdminIntoDB = async (file: any, password: string, payload: TAdmin) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.jwt.access_secret as string);

    //set admin role
    userData.role = 'admin';
    //set admin email
    userData.email = payload.email;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set manually generated it
        userData.id = 'A-' + Date.now();

        if (file) {
            const imageName = `${userData.id}${payload?.name?.firstName}`;
            const path = file?.path;
            const { secure_url } = (await sendImageToCloudinary(
                imageName,
                path,
            )) as any;
            payload.profileImg = secure_url as string;
        }

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session });

        //create a admin
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a admin (transaction-2)
        const newAdmin = await Admin.create([payload], { session });

        if (!newAdmin.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

const getMe = async (userId: string, role: string) => {
    let result = null;

    if (role === 'student') {
        result = await Student.findOne({ id: userId }).populate('user');
    }
    if (role === 'admin') {
        result = await Admin.findOne({ id: userId }).populate('user');
    }

    return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
    const result = await User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

export const UserServices = {
    createStudentIntoDB,
    createAdminIntoDB,
    getMe,
    changeStatus,
};
