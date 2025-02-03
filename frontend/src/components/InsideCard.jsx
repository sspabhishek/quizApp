import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function InsideCard() {
  const location = useLocation();
  const quizData = location.state?.data || [];

  const [answers, setAnswers] = useState({});

  const handleOptionChange = (questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = () => {
    // Check if answers are correct
    const results = quizData.map((quiz, index) => {
      return answers[index] === quiz.correctAnswer ? "Correct" : "Incorrect";
    });

    alert(`Results: ${results.join(", ")}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quiz Questions</h1>
      {quizData.length > 0 ? (
        quizData.map((quiz, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-bold">{quiz.question}</h2>
            <ul className="list-disc ml-6">
              {quiz.options.map((option, i) => (
                <li key={i} className="cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleOptionChange(index, option)}
                    checked={answers[index] === option}
                  />
                  {option}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No quiz data available.</p>
      )}

      {/* Button to submit answers */}
      <button
        className="mt-6 p-2 bg-green-500 text-white rounded-md"
        onClick={handleSubmit}
      >
        Submit Answers
      </button>
    </div>
  );
}

export default InsideCard;
