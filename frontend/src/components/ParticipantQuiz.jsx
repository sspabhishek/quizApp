import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../services/socket";
import { useParticipant } from "../services/ParticipantContext";
import { useTimer } from "react-timer-hook";

const ParticipantQuiz = () => {
  const { questions, timeLimit, pointsPerQuestion } = useSelector((state) => state.quiz.questions);
  const { code } = useParams();
  const { participant } = useParticipant();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  // console.log("Check it is render multiple times or not Participant Quiz");

  
  const timerRef = useRef({ minutes: 0, seconds: 0 });

  const moveToNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
  
    // Check if the selected option is correct and add score
    if (selectedOption === currentQuestion.correctOption) {
      setScore((prevScore) => prevScore + pointsPerQuestion);
    }
  
    // Reset the selected option
  setSelectedOption("");

    if (currentQuestionIndex < questions.length - 1) {  
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      resetTimer();
    } else {
      setQuizFinished(true); // Finish quiz after processing the last question
    }
  };
  
  

  const getExpiryTimestamp = () => {
    const timer = new Date();
    const timeLimitMinutes = questions.length > 0 ? timeLimit : 1;
    timer.setSeconds(timer.getSeconds() + timeLimitMinutes * 60);
    return timer;
  };

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: getExpiryTimestamp(),
    onExpire: moveToNextQuestion,
  });

  useEffect(() => {
    timerRef.current = { minutes, seconds };
    // console.log("Timer updated: ", minutes, seconds); // Logs timer updates without causing re-renders
  }, [minutes, seconds]);

  useEffect(() => {
    const handleLeaderboardUpdate = (participants) => {
      setLeaderboard(participants);
    };

    socket.on("leaderboardUpdate", handleLeaderboardUpdate);

    return () => {
      socket.off("leaderboardUpdate", handleLeaderboardUpdate);
    };
  }, []); // Empty dependency array ensures it runs only once

  const resetTimer = () => {
    restart(getExpiryTimestamp());
  };

  const handleSubmitQuiz = () => {
    // Check the correctness of the final question's selected answer
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctOption) {
      setScore((prevScore) => prevScore + pointsPerQuestion);
    }
    
    console.log("Submitting quiz with score: ", code, participant.username, score + (selectedOption === currentQuestion.correctOption ? pointsPerQuestion : 0));
    setQuizFinished(true);
    socket.emit("submitQuiz", { code, username: participant.username, score: score + (selectedOption === currentQuestion.correctOption ? pointsPerQuestion : 0) });
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
          Time left: {timerRef.current.minutes}:{timerRef.current.seconds < 10 ? `0${timerRef.current.seconds}` : timerRef.current.seconds}
        </div>
        {currentQuestionIndex < questions.length-1 ? (
          <button
            onClick={moveToNextQuestion}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            Next
          </button>
        ) : (
          <button
            
            onClick={handleSubmitQuiz}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default ParticipantQuiz;