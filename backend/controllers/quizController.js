import Quiz from "../models/quizModel.js";
import PracticeQuiz from "../models/practiceQuiz.js";
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
      return res.status(404).json({ message: "Quiz not found 1" });
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
      return res.status(404).json({ message: "Quiz not found 2" });
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
      return res.status(404).json({ message: "Quiz not found 3" });
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


// ✅ Save a Practice Quiz (Check for Existing Category)
export const savePracticeQuiz = async (req, res) => {
  try {
    const { title, category, questions } = req.body;

    // Check if a quiz for this category already exists
    let existingQuizCategory = await PracticeQuiz.findOne({ category });

    if (existingQuizCategory) {
      // If category exists, add new quiz to the existing category
      existingQuizCategory.quizzes.push({ title, questions });
      await existingQuizCategory.save();
      return res.status(200).json({ message: "Quiz added to existing category!" });
    }

    // If category does not exist, create a new one
    const newQuiz = new PracticeQuiz({ category, quizzes: [{ title, questions }] });
    await newQuiz.save();

    res.status(201).json({ message: "New category created and quiz saved!" });
  } catch (error) {
    console.error("Error saving quiz:", error);
    res.status(500).json({ error: "Error saving quiz" });
  }
};

// ✅ Get All Practice Quizzes
export const getPracticeQuizzes = async (req, res) => {
  try {
    const quizzes = await PracticeQuiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Get Practice Quizzes by Category
export const getPracticeQuizByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const quizzes = await PracticeQuiz.findOne({ category });

    if (!quizzes) {
      return res.status(404).json({ error: `No quizzes found for category: ${category}` });
    }

    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes by category:", error);
    res.status(500).json({ error: "Server Error" });
  }
};


export { addQuiz, getQuizzes, getQuiz, joinQuiz, startQuiz };