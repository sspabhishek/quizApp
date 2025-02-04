import React, { useState } from "react";
import { saveQuiz } from "../services/api";


const categories = [
  { name: "Sports" },
  { name: "Health" },
  { name: "Technology" },
  { name: "Science" },
  { name: "Entertainment" },
  { name: "Geography" },
  { name: "History" },
  { name: "General Knowledge" },
];

// ✅ FIX: Ensure each question has its own object reference
const initialQuestions = Array.from({ length: 10 }, () => ({
  question: "",
  options: ["", "", "", ""],
  correctAnswer: "",
}));

const QuizForm = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    category: categories[0].name,
    questions: initialQuestions,
  });

  // ✅ Handle title/category changes
  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  // ✅ Handle question changes
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = quiz.questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // ✅ Handle option changes
  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = quiz.questions.map((q, i) =>
      i === qIndex
        ? { ...q, options: q.options.map((opt, j) => (j === optIndex ? value : opt)) }
        : q
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await saveQuiz(quiz);
    alert(response.message || response.error);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create a New Quiz</h2>

      {/* ✅ Quiz Title */}
      <input
        type="text"
        name="title"
        placeholder="Quiz Title"
        className="w-full border p-2 mb-3"
        value={quiz.title}
        onChange={handleChange}
      />

      {/* ✅ Category Selection */}
      <select
        name="category"
        className="w-full border p-2 mb-3"
        value={quiz.category}
        onChange={handleChange}
      >
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* ✅ Loop through 10 Questions */}
      {quiz.questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-4 p-2 border rounded">
          {/* ✅ Question Input */}
          <input
            type="text"
            placeholder={`Question ${qIndex + 1}`}
            className="w-full border p-2 mb-2"
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)}
          />

          {/* ✅ Options */}
          {q.options.map((option, optIndex) => (
            <input
              key={optIndex}
              type="text"
              placeholder={`Option ${optIndex + 1}`}
              className="w-full border p-2 mb-1"
              value={option}
              onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
            />
          ))}

          {/* ✅ Correct Answer */}
          <input
            type="text"
            placeholder="Correct Answer"
            className="w-full border p-2 mb-2"
            value={q.correctAnswer}
            onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
          />
        </div>
      ))}

      {/* ✅ Save Button */}
      <button className="p-2 bg-blue-500 text-white rounded-md w-full" onClick={handleSubmit}>
        Save Quiz
      </button>
    </div>
  );
};

export default QuizForm;
