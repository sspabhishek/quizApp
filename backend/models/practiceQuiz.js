import mongoose from "mongoose";

// Schema for individual quiz questions
const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

// Schema for a single quiz (title + multiple questions)
const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [QuestionSchema], // ✅ Array of questions
});

// Main Schema: Stores multiple quizzes under the same category
const PracticeQuizSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true }, // ✅ Predefined categories
  quizzes: [QuizSchema], // ✅ Array of quizzes under each category
});

// Create and export the model
const PracticeQuiz = mongoose.model("PracticeQuiz", PracticeQuizSchema);
export default PracticeQuiz;
