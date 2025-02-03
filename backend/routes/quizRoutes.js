import express from "express";
import { addQuiz, getQuizzes, getQuiz, joinQuiz, startQuiz } from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

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

export default router;