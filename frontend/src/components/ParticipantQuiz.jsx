import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../services/socket";
import { useParticipant } from "../services/ParticipantContext";
import { useTimer } from "react-timer-hook";

const ParticipantQuiz = () => {
  const questions = useSelector((state) => state.quiz.questions.questions);
  const { code } = useParams();
  const { participant } = useParticipant();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const timeLimit = useSelector((state) => state.quiz.questions.timeLimit);
  const preScore = useSelector((state) => state.quiz.questions.pointsPerQuestion);
  console.log("Pre Score is : ", preScore)
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length) {
      handleSubmitAnswer();
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      resetTimer();
    } else {
      handleSubmitAnswer();
      setQuizFinished(true);
    }
  };

  const getExpiryTimestamp = () => {
    const timer = new Date();
    const timeLimitMinutes = questions.length > 0 ? timeLimit || 1 : 1;
    timer.setSeconds(timer.getSeconds() + timeLimitMinutes * 60);
    return timer;
  };

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: getExpiryTimestamp(),
    onExpire: moveToNextQuestion,
  });

  useEffect(() => {
    if (questions.length > 0 && !quizFinished) {
      restart(getExpiryTimestamp());
    }
  }, [currentQuestionIndex, questions, quizFinished, restart]);

  useEffect(() => {
    socket.on("leaderboardUpdate", (participants) => {
      setLeaderboard(participants);
    });

    return () => {
      socket.off("leaderboardUpdate");
    };
  }, []);

  const resetTimer = () => {
    restart(getExpiryTimestamp());
  };

  const handleSubmitAnswer = () => {
    const username = participant.username || "Guest";
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctOption;

    socket.emit("submitAnswer", {
      code,
      username,
      isCorrect,
    });

    setSelectedOption("");
    if (isCorrect) {
      setScore(score + preScore);
    }
  };

  if (quizFinished) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Quiz Finished!</h2>
          <p className="text-lg text-gray-700 mb-4">Your score: {score}</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Quiz</h2>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-700 mb-2">{currentQuestion.question}</h3>
          <div className="flex flex-col">
            {currentQuestion.options.map((option, index) => (
              <label key={index} className="mb-2">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div className="text-gray-500 text-lg mb-4">
          Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      </div>
    </div>
  );
};

export default ParticipantQuiz;