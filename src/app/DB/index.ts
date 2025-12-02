import mongoose from 'mongoose';
import config from '../config';

const connectDB = async () => {
    try {
        await mongoose.connect(config.database_url as string);
        console.log('🛢 Database connected successfully');
    } catch (err) {
        console.error('Failed to connect to database', err);
        process.exit(1);
    }
};

export default connectDB;
