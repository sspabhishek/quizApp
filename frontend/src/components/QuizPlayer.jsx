import React, { useState } from "react";
import PerformancePopup from "./PerformancePopup";

const QuizPlayer = ({ quizData, onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (!quizData || quizData.length === 0) {
    return <p>No questions available for this category quiz.</p>;
  }

  const handleOptionSelect = (option) => {
    const isCorrect = option === quizData[currentQuestion].correctAnswer;

    // Update answers first
    setAnswers((prevAnswers) => [...prevAnswers, isCorrect ? "Correct" : "Incorrect"]);

    // Move to next question if available
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Quiz is completed, show PerformancePopup
      setQuizCompleted(true);
    }
  };

  return (
    <div className="p-6">
      {!quizCompleted ? (
        <>
          <h2 className="text-lg font-bold mb-2">{quizData[currentQuestion].question}</h2>
          <div className="flex flex-col gap-2">
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="p-2 bg-gray-200 rounded-md lg:hover:bg-blue-500 lg:hover:text-white active:bg-blue-500 active:text-white transition"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <PerformancePopup results={answers} onClose={() => onFinish(answers)} />
      )}
    </div>
  );
};

export default QuizPlayer;
