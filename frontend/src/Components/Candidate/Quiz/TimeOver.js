import React, { useEffect } from "react";
import TIMER from "./../../../Assets/Work time-pana.svg";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../LocalStorage";
import { updateScore } from "./../../../API/Candidate.js";
import { updateQuiz } from "./../../../API/Quiz.js";

function TimeOver({ result, registered, quiz }) {
  let { user } = useAppContext();
  user= JSON.parse(localStorage.getItem("user"))
  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((error) => {
        console.error("Failed to exit fullscreen:", error);
      });
    } else {
      console.warn("Document is not in fullscreen mode.");
    }
  };
  useEffect(() => {
    const updateMarks = async () => {
      if (registered && user?.email) {
        try {
          await updateScore({
            score: result,
            email: user?.email,
            totalMarks: quiz.numberOfQuestions,
            code: quiz.code,
            date: quiz.scheduledTime,
            examiner: quiz.generator,
            topic: quiz.quizTitle,
          });
          await updateQuiz({
            code: quiz.code,
            score: result,
            email: user?.email,
          });
        } catch (error) {
          console.error("Error updating score:", error);
        }
      }
    };
    updateMarks();
  }, [registered, user, result, quiz]);

  return (
    <div className="flex flex-row justify-around items-center w-full h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-black text-white">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Time’s Up!</h1>
        <p className="text-lg mb-8 text-blue-200">
          Your quiz session has ended.
        </p>
        <p className="mb-4">
          {registered
            ? "Thank you for participating!"
            : "You didn’t participate in this session."}
        </p>
        <h2 className="text-2xl font-semibold mb-6">Score: {result}</h2>
        <Link to="/candidate/dashboard">
          <button
            className="px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out"
            onClick={exitFullScreen}
          >
            Back to Dashboard
          </button>
        </Link>
      </div>
      <img src={TIMER} alt="Time Over" className="w-2/5 mb-6 opacity-75" />
    </div>
  );
}

export default TimeOver;
