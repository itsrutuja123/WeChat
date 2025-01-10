import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Load the environment variables from the .env file

const connectToMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_DB_URI; // Get Mongo URI from .env
    if (!mongoURI) {
      throw new Error('MONGO_DB_URI is not defined in .env file');
    }
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

export default connectToMongoDB; // ES Module export
