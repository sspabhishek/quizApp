import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { startQuiz, getQuiz } from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import socket from "../services/socket";
import { setQuestions } from "../redux/quizSlice";
import CreatorQuiz from "./CreatorQuiz";
import ParticipantQuiz from "./ParticipantQuiz";

const StartQuiz = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [participants, setParticipants] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (user) {
      socket.emit("storeSocketId", user._id);
    }

    const fetchQuizDetails = async () => {
      try {
        const quiz = await getQuiz(code);
        setParticipants(quiz.participants);
        setIsCreator(quiz.creator === user?._id);
        setQuizStarted(quiz.started);
        dispatch(setQuestions(quiz));
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    fetchQuizDetails();

    socket.on("quizStarted", () => {
      setQuizStarted(true);
      navigate(isCreator ? `/quiz-creator` : `/participants`);
    });

    if (isCreator) {
      socket.on("newParticipant", ({ username }) => {
        setParticipants((prevParticipants) => [...prevParticipants, { username }]);
      });
    }

    return () => {
      socket.off("newParticipant");
      socket.off("quizStarted");
    };
  }, [code, user, isCreator, dispatch, navigate]);

  const handleStart = async () => {
    try {
      await startQuiz(code);
      setQuizStarted(true);
      socket.emit("startQuiz", code);
      navigate(`/quiz-creator`);
    } catch (error) {
      console.error("Error starting quiz:", error);
      alert("Error starting quiz.");
    }
  };

  if (quizStarted) {
    return isCreator ? <CreatorQuiz /> : <ParticipantQuiz />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Quiz Code: {code}</h2>
        {isCreator && !quizStarted && (
          <>
            <button
              onClick={handleStart}
              className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all"
            >
              Start
            </button>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-700 mb-2">Participants:</h3>
              <ul>
                {participants.map((participant, index) => (
                  <li key={index} className="text-gray-700">
                    {participant.username}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {!isCreator && !quizStarted && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-700 mb-2">Waiting for the quiz to start...</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartQuiz;