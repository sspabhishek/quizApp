import React from "react";
import useMobile from "../hooks/useMobile";
import homeDesktop from "../assets/homeDesktop.png";
import homeMobile from "../assets/homeMobile.png";
import QuizList from "../components/QuizList"; // Import QuizList

const Home = () => {
  const [isMobile] = useMobile(768); 

  return (
    <section className="left-0 right-0 top-0 bottom-0 w-full h-full bg-gray-100 text-gray-900">
      {/* Banner Image */}
      <div className="w-full h-[400px]">
        <img src={isMobile ? homeMobile : homeDesktop} alt="Home Banner" className="w-full h-full object-cover" />
      </div>

      {/* Heading */}
      <div className="flex justify-center items-center pt-6 text-neutral-800 mb-3">
        <h1 className="text-4xl font-extrabold relative">
          Public
          <span className="text-blue-500 relative px-3">
            Quiz
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500"></span>
          </span>
          Events
        </h1>
      </div>

      {/* Quiz List (Displays quizzes grouped by category) */}
      <QuizList />
    </section>
  );
};

export default Home;
