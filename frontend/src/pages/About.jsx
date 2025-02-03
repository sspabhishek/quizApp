import React from 'react'
import officeTour from "../assets/office_tour.png"
import ourMission from "../assets/our_mission.png"
import whyChooseUs from "../assets/why_choose.png"

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section with Image */}
      <div className="relative w-full h-80">
        <img
          src={officeTour}
          alt="Office Tour"
          className="w-full h-full object-cover brightness-75"
        />
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-200 text-center">
          <h1 className="text-5xl font-bold">About Owling.com</h1>
          <p className="text-lg mt-2">Where learning meets fun! 🚀</p>
        </div> */}
      </div>

      {/* About Us Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-blue-600 text-center">Who We Are</h2>
        <p className="text-gray-700 text-center mt-4">
          Owling.com is your go-to platform for engaging and challenging quizzes!  
          We believe learning should be fun, interactive, and rewarding.  
          Our quizzes help users test their knowledge, challenge friends, and discover new topics every day.
        </p>

        {/* Our Mission */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
            <p className="text-gray-600 mt-2">
              We strive to make education exciting by offering a variety of quizzes 
              across different categories like General Knowledge, Science, Pop Culture, and Tech.  
              Whether you're a student, a professional, or a trivia lover, we have something for you!
            </p>
          </div>
          <img src={ourMission} alt="Our Mission" className="rounded-lg shadow-lg" />
        </div>

        {/* Why Choose Us */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <img src={whyChooseUs} alt="Why Choose Us" className="rounded-lg shadow-lg" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Why Choose Us?</h2>
            <ul className="text-gray-600 mt-2 list-disc list-inside">
              <li>🌟 Thousands of unique quizzes on various topics</li>
              <li>🎯 Challenge Mode to play against friends</li>
              <li>🏆 Earn badges & rewards as you progress</li>
              <li>📊 Track your performance with detailed insights</li>
              <li>📱 Mobile-friendly for learning on the go</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-semibold text-gray-800">Join the Owling.com Community</h2>
          <p className="text-gray-600 mt-2">
            Join thousands of quiz lovers and put your knowledge to the test.  
            Sign up now and become a part of the Owling family! 🦉
          </p>
          <Link to="/" className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
