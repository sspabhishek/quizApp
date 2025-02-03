import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../services/socket";

const CreatorQuiz = () => {
  const questions = useSelector((state) => state.quiz.questions.questions);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const timeLimit = useSelector((state) => state.quiz.questions.timeLimit);

  useEffect(() => {
    // Listen for leaderboard updates from the server
    socket.on("leaderboardUpdate", (participants) => {
      setLeaderboard(participants || []);
      setLoadingLeaderboard(false); // Set loading to false once data arrives
    });

    return () => {
      socket.off("leaderboardUpdate");
    };
  }, []);

  useEffect(() => {
    if (questions.length > 0 && !quizFinished) {
      const timer = setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= questions.length) {
            setQuizFinished(true); // End the quiz
            return prevIndex;
          }
          return nextIndex;
        });
      }, questions[currentQuestionIndex].timeLimit * 1000 || 1000);

      return () => clearTimeout(timer);
    }
  }, [questions, currentQuestionIndex, quizFinished]);

  const getWinner = () => {
    if (leaderboard.length === 0) return null;
    return leaderboard.reduce(
      (max, participant) => (participant.score > max.score ? participant : max),
      leaderboard[0]
    );
  };

  const winner = getWinner();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Leaderboard</h2>

        {loadingLeaderboard ? (
          <p className="text-gray-500">Waiting for participants...</p>
        ) : leaderboard.length > 0 ? (
          <ul>
            {leaderboard
              .sort((a, b) => b.score - a.score)
              .map((entry, index) => (
                <li key={index} className="text-gray-700">
                  {index + 1}. {entry.username}: {entry.score} points
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-500">No participants yet.</p>
        )}

        {quizFinished && winner && (
          <div className="mt-6 p-4 bg-green-100 rounded-xl">
            <h3 className="text-xl font-bold text-green-800">
              🎉 Winner: {winner.username} with {winner.score} points! 🎉
            </h3>
          </div>
        )}

        {!quizFinished && (
          <div className="mt-4 text-gray-600">
            <p>
              Quiz in progress... (Question {currentQuestionIndex + 1}/
              {questions.length})
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorQuiz;