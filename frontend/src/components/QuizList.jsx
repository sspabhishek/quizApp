// QuizList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizzes } from "../redux/practiceQuizSlice";
import CardComponent from "./CardComponent";

const QuizList = () => {
  const dispatch = useDispatch();
  const { quizzes, status } = useSelector((state) => state.practicequiz);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuizzes());
    }
  }, [dispatch, status]);

  const categoryQuizzes = quizzes.reduce((acc, quiz) => {
    acc[quiz.category] = acc[quiz.category] || [];
    acc[quiz.category].push(quiz);
    return acc;
  }, {});

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to load quizzes.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
      {Object.keys(categoryQuizzes).map((category) => (
        <CardComponent key={category} category={category} quizzes={categoryQuizzes[category]} />
      ))}
    </div>
  );
};

export default QuizList;