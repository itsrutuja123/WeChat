import dotenv from 'dotenv';
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer"; // For file uploads
import fs from "fs"; // For filesystem operations

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config({ path: './backend/.env' }); 

const __dirname = path.resolve();

// PORT should be assigned after calling dotenv.config() because we need to access the env variables.
const PORT = process.env.PORT || 5000;

// Logging the MongoDB URI to check if it's loaded correctly
console.log("MongoDB URI:", process.env.MONGO_DB_URI); 

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log('Uploads folder created');
}

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files to the "uploads" folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "video/mp4"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported file type"), false);
        }
    },
});

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// File upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        res.status(200).json({ message: "File uploaded successfully", file });
    } catch (error) {
        console.error("File upload error:", error.message);
        res.status(500).json({ message: "File upload failed", error: error.message });
    }
});

// Serve frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Listen on the port and handle the MongoDB connection
server.listen(PORT, () => {
    connectToMongoDB().catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process if DB connection fails
    });
    console.log(`Server Running on port ${PORT}`);
});
