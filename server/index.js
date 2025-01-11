import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from 'path';


// Routes
import AuthRoute from './routes/AuthRoute.js';
import UserRoute from './routes/UserRoute.js';
import PostRoute from './routes/PostRoute.js';
import UploadRoute from './routes/UploadRoute.js';
import ChatRoute from './routes/ChatRoute.js';
import MessageRoute from './routes/MessageRoute.js';

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin: "http://localhost:3000", 
}));
app.use(express.static('public'));
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;
const CONNECTION = process.env.MONGODB_CONNECTION;

mongoose.set('strictQuery', true);

(async () => {
  try {
    await mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
})();

// Routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/posts', PostRoute);
app.use('/upload', UploadRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);
