import Quiz from "../models/quizModel.js";
import { nanoid } from "nanoid";

// Add a new quiz
const addQuiz = async (req, res) => {
  try {
    const quizCode = nanoid(6); // Generate a unique 6-character code
    const quiz = new Quiz({ ...req.body, code: quizCode, creator: req.user.id });
    await quiz.save();
    res.json({ message: "Quiz added successfully!", code: quizCode, quiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all quizzes
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get quiz details
const getQuiz = async (req, res) => {
  const { code } = req.params;

  try {
    const quiz = await Quiz.findOne({ code });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Join a quiz
const joinQuiz = async (req, res) => {
  const { code } = req.params;
  const { username } = req.body;
  
  try {
    const quiz = await Quiz.findOne({ code });
    
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.started) {
      return res.status(400).json({ message: "Quiz has already started" });
    }

    quiz.participants.push({ username });
    await quiz.save();

    res.json({ message: "Joined quiz successfully", participants: quiz.participants });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Start a quiz
const startQuiz = async (req, res) => {
  const { code } = req.params;

  try {
    const quiz = await Quiz.findOne({ code });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the quiz creator can start the quiz" });
    }

    quiz.started = true;
    await quiz.save();

    res.json({ message: "Quiz started successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { addQuiz, getQuizzes, getQuiz, joinQuiz, startQuiz };