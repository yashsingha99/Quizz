import React from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SearchIcon from "@mui/icons-material/Search";
import YOUTUBE_SVG from "./../../../../Assets/icons/youtube-svgrepo-com (1).svg";
import { YouTube } from "@mui/icons-material";

function Youtube({ setMethod }) {
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
        <h1 className="text-3xl font-rubik font-bold mb-4 flex items-center border-b-4  w-2/3 items-center justify-center border-purple-300 rounded">
          <span>Create Quizzes from</span>
          <img src={YOUTUBE_SVG} alt="YouTube Logo" className="w-20 p-3" />
          <span>Videos</span>
        </h1>
        <h2 className="font-roboto font-semibold text-blue-950 text-center mb-6 w-2/3 p-8">
          Transform any YouTube video into an engaging quiz! Simply paste the
          link below, and our system will help you create interactive questions
          based on the content. Whether it's for educational purposes, training
          sessions, or just for fun, you can easily generate questions that
          capture key moments from the video. Make learning more interactive and
          engaging with quizzes that keep your audience interested throughout.
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6 w-1/2 flex items-center">
          <form class="w-full">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-slate-100 sr-only dark:text-white"
            >
              Generate
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <YouTube style={{ color: "grey" }}></YouTube>
              </div>
              <input
                class="block w-full p-4 ps-12  text-white-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Enter the YouTube video link"
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2 bottom-2  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 bg-blue-900"
              >
                Generate
              </button>
            </div>
          </form>
        </div>
        <ul className="list-disc list-inside mt-6 w-2/3 p-6">
          {[
            "Paste the YouTube video link.",
            "Automatically generate questions based on video content or manually create your own.",
            "Customize your quiz by adding additional details, options, or images.",
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

export default Youtube;
