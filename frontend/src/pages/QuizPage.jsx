import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizPlayer from "../components/QuizPlayer";
import defaultImage from "../assets/default_image.png";

const QuizPage = () => {
  const location = useLocation();
  const { quizzes } = location.state || { quizzes: [] };

  const extractedQuizzes = quizzes.length > 0 ? quizzes[0].quizzes : [];
  const [currentQuizIndex, setCurrentQuizIndex] = useState(null);
  const navigate = useNavigate();

  if (!extractedQuizzes.length) {
    return <p className="text-center text-lg font-semibold text-gray-700">No questions available for this category quiz.</p>;
  }

  const handleStartQuiz = (index) => {
    setCurrentQuizIndex(index);
  };

  const handleFinish = (results) => {
    navigate("/", { state: { results } });
  };

  return (
    <div className="p-6 text-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">
      <h1 className="text-5xl font-extrabold mb-8 text-gray-800 drop-shadow-xl transition-all duration-300">{quizzes.length > 0 ? quizzes[0].category + " Quizzes" : "Quiz"}</h1>
      {currentQuizIndex === null ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
          {extractedQuizzes.map((quiz, index) => (
            <div
              key={index}
              className="relative w-full max-w-xs h-72 rounded-3xl overflow-hidden cursor-pointer transform transition-transform duration-500 hover:scale-110 hover:shadow-2xl bg-gray-800 backdrop-blur-md bg-opacity-50"
              style={{
                backgroundImage: `url(${defaultImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => handleStartQuiz(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                <h2 className="font-extrabold text-2xl text-white mb-28 text-shadow-md">{quiz.title}</h2>
                <button
                  className="mt-4 py-2 px-6 text-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartQuiz(index);
                  }}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-3xl mx-auto mt-8 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">{extractedQuizzes[currentQuizIndex].title}</h2>
          <QuizPlayer quizData={extractedQuizzes[currentQuizIndex].questions} onFinish={handleFinish} />
        </div>
      )}
    </div>
  );
};

export default QuizPage;
