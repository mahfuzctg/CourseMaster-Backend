import { Model, Types } from 'mongoose';

export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export type TStudent = {
    id: string;
    user: Types.ObjectId;
    name: TUserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    profileImg?: string;
    isDeleted: boolean;
};

export interface StudentModel extends Model<TStudent> {
    // eslint-disable-next-line no-unused-vars
    isUserExists(id: string): Promise<TStudent | null>;
}
