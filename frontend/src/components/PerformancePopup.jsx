// PerformancePopup.jsx
import React from "react";

const PerformancePopup = ({ results, onClose }) => {
  const correctAnswers = results.filter((r) => r === "Correct").length;
  const totalQuestions = results.length;
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold mb-4">Quiz Completed 🎉</h2>
        <p className="text-lg font-semibold mb-4">Your Score: {correctAnswers} / {totalQuestions}</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PerformancePopup;
