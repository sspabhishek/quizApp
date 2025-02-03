import React, { useState } from "react";
import PreviewQuestions from "./PreviewQuestions";

const QuizBuilder = ({ totalQuestions, quizName, pointsPerQuestion, timeLimit }) => {
  

  const [remainingQuestions, setRemainingQuestions] = useState(totalQuestions);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    if (
      !currentQuestion ||
      options.some((opt) => opt.trim() === "") ||
      correctOption === ""
    ) {
      alert("Please fill all fields and select the correct option!");
      return;
    }

    setQuestions([
      ...questions,
      { question: currentQuestion, options, correctOption },
    ]);
    setCurrentQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectOption("");
    setRemainingQuestions(remainingQuestions - 1);
  };

  // Function to handle editing a question
  const handleEditQuestion = (editedQuestions) => {
    setQuestions(editedQuestions);
  };

  if (remainingQuestions === 0) {
    return <PreviewQuestions 
    questions={questions} 
    quizName={quizName}
    pointsPerQuestion={pointsPerQuestion}
    timeLimit={timeLimit}
    onEdit={handleEditQuestion} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Remaining Questions: {remainingQuestions}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Question
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Question"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
            />
          </div>

          {["Option 1", "Option 2", "Option 3", "Option 4"].map(
            (label, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  {label}
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${label}`}
                  value={options[index]}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </div>
            )
          )}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Correct Option
            </label>
            <select
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
            >
              <option value="">Select Correct Option</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {`${option}`}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddQuestion}
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizBuilder;