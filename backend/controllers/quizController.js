import Quiz from "../models/quizModel.js";

// Add a new quiz
const addQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.json({ message: "Quiz added successfully!" });
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

export { addQuiz, getQuizzes };
