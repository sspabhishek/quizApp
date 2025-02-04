import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../services/socket";

const CreatorQuiz = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);

  // Leaderboard Update Listener
  useEffect(() => {
    const leaderboardListener = (participants) => {
      // console.log("Participants are ", participants);
      setLeaderboard(participants || []);
      setLoadingLeaderboard(false);
    };

    console.log("Registering leaderboard update listener");
    socket.on("leaderboardUpdate", leaderboardListener);

    // Cleanup the listener when the component unmounts
    return () => {
      socket.off("leaderboardUpdate", leaderboardListener);
    };
  }, []);

  // Function to get the winner from leaderboard
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
          <p className="text-gray-500">Waiting for leaderboard updates...</p>
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
      </div>
    </div>
  );
};

export default CreatorQuiz;