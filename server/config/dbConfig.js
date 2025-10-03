import mongoose from 'mongoose';

export const dbConfig = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      minPoolSize: 2,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
};
