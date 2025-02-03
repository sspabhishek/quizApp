import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import QuizBuilder from "./QuizBuilder";

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [pointsPerQuestion, setPointsPerQuestion] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [quizDetails, setQuizDetails] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleNext = () => {
    if (quizName && numQuestions && pointsPerQuestion && timeLimit) {

        setQuizDetails(true);
        
        
      
      // You can add navigation or logic here
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <>
    {!quizDetails ? (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Create Your Quiz
          </h2>
  
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Quiz Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Quiz Name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Number of Questions
              </label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Number of Questions"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                min="1"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Points per Question
              </label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Points per Question"
                value={pointsPerQuestion}
                onChange={(e) => setPointsPerQuestion(e.target.value)}
                min="1"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Time Limit (in Minutes)
              </label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Time Limit"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                min="1"
              />
            </div>
  
            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-all"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    ):(
        <QuizBuilder totalQuestions={parseInt(numQuestions)} 
        quizName={quizName}
        pointsPerQuestion={parseInt(pointsPerQuestion)}
        timeLimit={parseInt(timeLimit)}
        
        />
    )}
    </>
  );
};

export default CreateQuiz;