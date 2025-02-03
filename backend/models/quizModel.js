import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pointsPerQuestion: { type: Number, required: true },
  timeLimit: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  started: { type: Boolean, default: false },
  questions: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      correctOption: { type: String, required: true },
    },
  ],
  participants: [
    {
      username: { type: String, required: true },
      score: { type: Number, default: 0 },
      timeTaken: { type: Number, default: 0 },
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;