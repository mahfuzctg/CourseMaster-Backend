import { Model, Types } from 'mongoose';

export type TAdminName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export type TAdmin = {
    id: string;
    user: Types.ObjectId;
    designation: string;
    name: TAdminName;
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

export interface AdminModel extends Model<TAdmin> {
    // eslint-disable-next-line no-unused-vars
    isUserExists(id: string): Promise<TAdmin | null>;
}
