import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addQuiz } from "../services/api";

const PreviewQuestions = ({ questions, quizName, pointsPerQuestion, timeLimit, onEdit }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedOptions, setEditedOptions] = useState(["", "", "", ""]);
  const [editedCorrectOption, setEditedCorrectOption] = useState("");
  const navigate = useNavigate();

  const handleEditClick = (index) => {
    setEditingIndex(index);
    const question = questions[index];
    setEditedQuestion(question.question);
    setEditedOptions(question.options);
    setEditedCorrectOption(question.correctOption);
  };

  const handleSaveEdit = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[editingIndex] = {
      question: editedQuestion,
      options: editedOptions,
      correctOption: editedCorrectOption,
    };
    onEdit(updatedQuestions);
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...editedOptions];
    updatedOptions[index] = value;
    setEditedOptions(updatedOptions);
  };

  const handleSaveQuiz = async () => {
    const quizData = {
      title: quizName,
      pointsPerQuestion,
      timeLimit,
      questions,
    };

    try {
      const response = await addQuiz(quizData);
      console.log("Quiz saved successfully:", response.code);
      navigate(`/start-quiz/${response.code}`);
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Error saving quiz.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Quiz Preview</h2>

        {/* Display quiz details */}
        <div className="mb-6 flex items-center justify-center flex-col">
          <div className="text-lg font-medium text-gray-800">Quiz Name: {quizName}</div>
          <div className="text-sm text-gray-600">Points per Question: {pointsPerQuestion}</div>
          <div className="text-sm text-gray-600">Time per Question: {timeLimit || 0} minutes</div>
        </div>

        {questions.map((question, index) => (
          <div key={index} className="border-b py-4 space-y-2">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Q{index + 1}: {question.question}
              </h3>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleEditClick(index)}
              >
                Edit
              </button>
            </div>
            <ul className="space-y-1">
              {question.options.map((option, i) => (
                <li
                  key={i}
                  className={`${
                    option === question.correctOption
                      ? "font-bold text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {i + 1}. {option}
                </li>
              ))}
            </ul>

            {editingIndex === index && (
              <div className="mt-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Edit Question
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg"
                    value={editedQuestion}
                    onChange={(e) => setEditedQuestion(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Edit Options
                  </label>
                  {editedOptions.map((option, i) => (
                    <div key={i} className="mb-2">
                      <input
                        type="text"
                        className="w-full p-3 border rounded-lg mb-2"
                        value={option}
                        onChange={(e) => handleOptionChange(i, e.target.value)}
                        placeholder={`Option ${i + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Correct Option
                  </label>
                  <select
                    value={editedCorrectOption}
                    onChange={(e) => setEditedCorrectOption(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    {editedOptions.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleSaveEdit}
                    className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="w-full bg-gray-500 text-white font-bold py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSaveQuiz}
            className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewQuestions;