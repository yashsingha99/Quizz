import React from "react";
import { Link } from "react-router-dom";
import BACKGROUND_IMAGE from "./../../Assets/homepage.svg";
const Body = () => {
  return (
    <div
      className="relative h-screen w-full"
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center h-full text-center text-white p-10">
        <h1 className="text-6xl font-bold mb-2">Elevate Your Knowledge</h1>
        <h1 className="text-6xl font-bold mb-8">with QuizWiz</h1>
        <h2 className="text-10l mb-2">
          Challenge yourself with interactive quizzes and engage in friendly
          competition.
        </h2>
        <h2 className="text-10l mb-12">
          Join us for a fun learning experience with friends!
        </h2>
        <div className="space-x-5">
          <Link
            to="/join"
            className="bg-purple-600 hover:bg-white text-white hover:text-purple-500 font-bold py-3 px-8 rounded transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Join the Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Body;
