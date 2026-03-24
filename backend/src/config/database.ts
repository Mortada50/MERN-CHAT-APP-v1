import mongoose from "mongoose";

export const connectDB = async () => {
    
    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI environment variable is not defined');
        process.exit(1);
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('mongoDB connection error: ', error)        
        process.exit(1) // exit with failure
        // status code 1 means failure
        // status code 0 means success
    }
}