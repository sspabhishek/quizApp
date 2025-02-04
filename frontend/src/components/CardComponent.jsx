import React from "react";
import { useNavigate } from "react-router-dom";
import sportImage from "../assets/sports.png";
import technology from "../assets/technology.png"
import defaultImage from "../assets/sport_card.jpg";
import science from "../assets/science.png"
import health from "../assets/health.png"
import entertainment from "../assets/entertainment.png"
import geography from "../assets/geography.png"
import history from "../assets/history.png"
import general from "../assets/general.png"


const categoryImages = {
  Sports: sportImage,
  Technology: technology,
  Science : science,
  Health : health,
  Entertainment : entertainment,
  Geography : geography,
  History : history,
  "General Knowledge" : general,
};

const CardComponent = ({ category, quizzes = [] }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navigating to category:", category);
    console.log("Quizzes Data:", quizzes);

    if (!quizzes.length) {
      console.warn(`No quizzes available for category: ${category}`);
    }
    window.scrollTo(0, 0);
    navigate(`/quizzes/${category}`, { state: { quizzes } });
  };



  return (

    <div className="flex justify-center items-center p-4">
      <div
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-96 relative rounded-2xl overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-2xl"
        style={{
          backgroundImage: `url(${categoryImages[category] || defaultImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={handleClick}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="relative z-10 p-5 flex flex-col justify-end h-full">
          <h2 className="font-extrabold text-3xl text-white mb-2">{category}</h2>
          <button
            className="mt-4 p-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Take Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
