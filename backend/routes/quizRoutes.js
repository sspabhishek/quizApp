import express from "express";
import { addQuiz, getQuizzes, getQuiz, joinQuiz, startQuiz, savePracticeQuiz, getPracticeQuizzes, getPracticeQuizByCategory } from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";
import PracticeQuiz from "../models/practiceQuiz.js";
import { get } from "mongoose";

const router = express.Router();

// ✅ Get all quizzes
router.get("/practice-quizzes", getPracticeQuizzes);              

// Add a new quiz (Protected Route)
router.post("/add", protect, addQuiz);

// Get all quizzes
router.get("/", getQuizzes);

// Get quiz details
router.get("/:code", getQuiz);

// Join a quiz
router.post("/join/:code", joinQuiz);

// Start a quiz (Protected Route)
router.post("/start/:code", protect, startQuiz);


// ✅ Save a new quiz to MongoDB
router.post("/practice-quizzes", savePracticeQuiz);

// Get quizzes by category
router.get("/quizzes/:category", getPracticeQuizByCategory);


export default router;