import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes } from "../redux/quizSlice";
import { getQuizzes } from "../services/api";
import QuizCard from "../components/QuizCard";

const Home = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quiz.quizzes);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzesData = await getQuizzes();
      dispatch(setQuizzes(quizzesData));
    };

    fetchQuizzes();
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      {quizzes.map((quiz) => (
        <QuizCard key={quiz._id} quiz={quiz} />
      ))}
    </div>
  );
};

export default Home;
