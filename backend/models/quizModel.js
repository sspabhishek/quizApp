import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
