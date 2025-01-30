const QuizCard = ({ quiz }) => {
    return (
      <div className="border p-4 rounded-md shadow-md mb-4">
        <h2 className="text-xl font-semibold">{quiz.title}</h2>
      </div>
    );
  };
  
  export default QuizCard;
  