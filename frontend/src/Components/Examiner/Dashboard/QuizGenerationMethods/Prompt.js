import React, { useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

function PromptQuiz({ setMethod }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for generating quiz based on the prompt
    console.log("Generated quiz from prompt:", prompt);
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <button
        className="text-purple-950 w-20 h-10 rounded-md transition-colors mt-10 ml-10 flex justify-center items-center opacity-70 hover:opacity-100"
        onClick={() => setMethod(0)}
      >
        <ArrowBackOutlinedIcon />
        <h1 className="ml-1 font-rubik font-bold">Back</h1>
      </button>
      <div className="flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-rubik font-bold pb-4 flex border-b-4 w-2/3 items-center justify-center border-purple-300 rounded">
          <span>Create Quizzes from Prompts</span>
        </h1>
        <h2 className="font-roboto font-semibold text-blue-950 text-center mb-6 w-2/3 p-8">
          Transform any prompt into an interactive quiz! Simply input your
          prompt below, and our system will help you create engaging questions
          based on the content. Perfect for educational purposes, training
          sessions, or creative exercises!
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6 w-1/2 flex items-center">
          <form className="w-full" onSubmit={handleSubmit}>
            <label
              htmlFor="prompt-input"
              className="mb-2 text-sm font-medium text-slate-100 sr-only"
            >
              Enter Prompt
            </label>
            <div className="relative">
              <input
                id="prompt-input"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Type the topic here..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2 bottom-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 bg-blue-900"
              >
                Generate
              </button>
            </div>
          </form>
        </div>
        <ul className="list-disc list-inside mt-6 w-2/3 p-6">
          {[
            "Type your prompt in the input field.",
            "Automatically generate questions based on the prompt.",
            "Customize your quiz by adding additional details or options.",
            "Share your quiz with others and track their results in real-time!",
          ]?.map((step, index) => (
            <li
              key={index}
              className="mb-4 flex items-center p-2 bg-blue-50 rounded-md transition-transform transform hover:scale-105 cursor-pointer"
            >
              <span className="text-blue-600 mr-2">✔️</span>
              <span>{`Step ${index + 1}: ${step}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PromptQuiz;
