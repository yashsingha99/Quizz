import React from "react";
import { Link } from "react-router-dom";
const AboutPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(to bottom, #e595f0, #7f6fc9, #70a1c4)",
      }}
    >
      <div className="container mx-auto p-8 bg-slate-800  text-purple-100 rounded-lg shadow-xl max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          About Us
        </h1>
        <p className="text-lg leading-7 mb-6 text-center">
          Welcome to{" "}
          <span className="font-semibold text-purple-300">QuizWiz</span>! We are
          a platform designed to help you create, attempt, and enjoy quizzes
          across various subjects. Whether you're preparing for an exam or just
          want to test your knowledge, QuizWiz is the right place for you.
        </p>
        <p className="text-lg leading-7 text-center">
          Our goal is to provide a fun and educational experience for learners
          of all ages. With easy-to-create quizzes and a wide range of topics,{" "}
          <span className="font-semibold text-purple-300">QuizWiz</span> is the
          go-to quiz maker and quiz platform for everyone.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Contributors
          </h2>
          <ul className="list-disc list-inside text-center space-y-4">
            <li>
              Prashant Pathak -{" "}
              <a
                href="mailto:prashant.pathak_cs22@gla.ac.in"
                className="text-purple-300 hover:text-white"
              >
                prashantpathak6395@gmail.com
              </a>{" "}
              |{" "}
              <a
                href="https://www.linkedin.com/in/prashantpathak01/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white"
              >
                LinkedIn
              </a>
            </li>
            <li>
              Shiva Gaur -{" "}
              <a
                href="mailto:shivagaur1100@gmail.com"
                className="text-purple-300 hover:text-white"
              >
                shivagaur1100@gmail.com
              </a>{" "}
              |{" "}
              <a
                href="https://www.linkedin.com/in/shivaagaur/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white"
              >
                LinkedIn
              </a>
            </li>
            <li>
              Harsh Bansal -{" "}
              <a
                href="mailto:harshbansal695@gmail.com"
                className="text-purple-300 hover:text-white"
              >
                harshbansal695@gmail.com
              </a>{" "}
              |{" "}
              <a
                href="https://www.linkedin.com/in/harsh-bansal-50185a293/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white"
              >
                LinkedIn
              </a>
            </li>
            <li>
              Tushar Sharma -{" "}
              <a
                href="mailto:tusharsharma7037@gmail.com"
                className="text-purple-300 hover:text-white"
              >
                tusharsharma7037@gmail.com
              </a>{" "}
              |{" "}
              <a
                href="https://www.linkedin.com/in/tusharsharma7037/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
