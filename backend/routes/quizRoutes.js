import express from "express";
import { addQuiz, getQuizzes } from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a new quiz (Protected Route)
router.post("/add", protect, addQuiz);

// Get all quizzes
router.get("/", getQuizzes);

export default router;
