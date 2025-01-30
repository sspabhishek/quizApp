import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import quizRoutes from "./routes/quizRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
connectDB();

// Routes
app.use("/api/quiz", quizRoutes);
app.use("/api/user", userRoutes);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
