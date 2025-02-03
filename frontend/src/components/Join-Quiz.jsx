import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinQuiz, getQuiz } from '../services/api';
import socket from "../services/socket";
import { useSelector } from 'react-redux';
import { useParticipant } from '../services/ParticipantContext';

const JoinQuiz = () => {
  const [quizCode, setQuizCode] = useState('');
  const [userName, setUserName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { saveParticipant } = useParticipant();

  useEffect(() => {
    if (user) {
      socket.emit("storeSocketId", user._id);
    }

    const fetchQuizDetails = async () => {
      try {
        const quiz = await getQuiz(quizCode);
        setQuizStarted(quiz.started);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    if (quizCode) {
      fetchQuizDetails();
    }
  }, [quizCode, user]);

  const handleJoinQuiz = async (e) => {
    e.preventDefault();
    try {
      const response = await joinQuiz(quizCode, userName);
      saveParticipant(userName); // Save the participant's username
      console.log(`Joined quiz with code: ${quizCode} and username: ${userName}`);
      socket.emit("joinQuiz", { code: quizCode, username: userName });
      navigate(`/start-quiz/${quizCode}`);
    } catch (error) {
      console.error("Error joining quiz:", error);
      alert("Error joining quiz.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Join Quiz</h2>
        <form onSubmit={handleJoinQuiz}>
          <div className="mb-4">
            <label htmlFor="quizCode" className="block text-sm font-medium text-gray-600 mb-2">Quiz Code:</label>
            <input
              type="text"
              id="quizCode"
              value={quizCode}
              onChange={(e) => setQuizCode(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-600 mb-2">Username:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all" disabled={quizStarted}>
            Join Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinQuiz;