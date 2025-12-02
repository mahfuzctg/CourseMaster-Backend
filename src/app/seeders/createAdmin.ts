import mongoose from 'mongoose';
import config from '../config';
import { User } from '../modules/User/user.model';

const seedAdmin = async () => {
    try {
        await mongoose.connect(config.database_url as string);

        const adminEmail = config.admin.email;
        const adminPassword = config.admin.password;

        if (!adminEmail || !adminPassword) {
            console.error(
                'Admin email or password not found in environment variables.',
            );
            process.exit(1);
        }

        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin already exists');
            process.exit(0);
        }

        const newAdmin = {
            id: 'A-00001',
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
            status: 'in-progress',
            needsPasswordChange: true,
            isDeleted: false,
        };

        await User.create(newAdmin);

        console.log('Default admin created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
