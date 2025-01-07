import React, { useState } from "react";
import YOUTUBE_SVG from "./../../../Assets/icons/youtube-svgrepo-com.svg";
import WEBSITE_SVG from "./../../../Assets/icons/internet-2-svgrepo-com.svg";
import DOCUMENT_SVG from "./../../../Assets/icons/document-svgrepo-com.svg";
import TEXT_SVG from "./../../../Assets/icons/textformat-abc-svgrepo-com.svg";
import PROMPT_SVG from "./../../../Assets/icons/text-square-svgrepo-com.svg";
import MANUAL_SVG from "./../../../Assets/icons/write-svgrepo-com (1).svg";
import Youtube from "./QuizGenerationMethods/Youtube";
import Website from "./QuizGenerationMethods/Website";
import Document from "./QuizGenerationMethods/Document";
import Text from "./QuizGenerationMethods/Text";
import Prompt from "./QuizGenerationMethods/Prompt";
import Manual from "./QuizGenerationMethods/Manual";
import ConfirmationAndDetails from "./QuizGenerationMethods/ConfirmationAndDetails";
function CreateQuiz() {
  const [method, setMethod] = useState(0);
  return (
    <div>
      {method === 0 ? (
        <div className="flex flex-col justify-center items-center bg-slate-50">
          <section className="text-center mt-8 flex flex-col items-center ">
            <h1 className="text-3xl font-roboto font-bold p-6 border-b-4 rounded border-purple-300 w-1/2">
              Create a{" "}
              <span className="text-5xl text-blue-950 font-rubik">Quiz</span>{" "}
              That Rocks!
            </h1>
            <h2 className="font-roboto font-semibold text-center p-4 mt-8 w-2/3 text-blue-950">
              Bring your ideas to life by creating quizzes that capture
              attention and make learning fun. Design quizzes that encourage
              curiosity and keep participants engaged. Whether it's for
              education, training, or just for fun, your quiz can be an
              interactive and enjoyable way for people to learn something new.
            </h2>
          </section>
          <section className="flex flex-wrap bg-purple-100 justify-center p-8 items-center rounded-2xl ml-32 mr-32 m-10">
            <button
              onClick={() => setMethod(1)}
              className="bg-blue-950 w-60 h-60 m-6 rounded-md flex flex-col justify-around items-center cursor-pointer hover:scale-95 duration-500 hover:bg-blue-900"
            >
              <img
                src={YOUTUBE_SVG}
                className="w-28 h-28 mt-6"
                alt="YouTube"
              ></img>
              <h2 className="mb-6 font-sans text-lg font-semibold text-slate-200">
                YouTube
              </h2>
            </button>
            <button
              onClick={() => setMethod(2)}
              className="bg-blue-950 w-60 h-60 m-6 rounded-md flex flex-col justify-around items-center cursor-pointer hover:scale-95 duration-500 hover:bg-blue-900"
            >
              <img
                src={WEBSITE_SVG}
                className="w-28 h-28 mt-6"
                alt="Website"
              ></img>
              <h2 className="mb-6 font-sans text-lg font-semibold text-slate-200">
                Website
              </h2>
            </button>
            <button
              onClick={() => setMethod(3)}
              className="bg-blue-950 w-60 h-60 m-6 rounded-md flex flex-col justify-around items-center cursor-pointer hover:scale-95 duration-500 hover:bg-blue-900"
            >
              <img
                src={DOCUMENT_SVG}
                className="w-28 h-28 mt-6"
                alt="Document"
              ></img>
              <h2 className="mb-6 font-sans text-lg font-semibold text-slate-200">
                Document
              </h2>
            </button>
            <button
              onClick={() => setMethod(4)}
              className="bg-blue-950 w-60 h-60 m-6 rounded-md flex flex-col justify-around items-center cursor-pointer hover:scale-95 duration-500 hover:bg-blue-900"
            >
              <img src={TEXT_SVG} className="w-28 h-28 mt-6" alt="Text"></img>
              <h2 className="mb-6 font-sans text-lg font-semibold text-slate-200">
                Text
              </h2>
            </button>
            <button
              onClick={() => setMethod(5)}
              className="bg-blue-950 w-60 h-60 m-6 rounded-md flex flex-col justify-around items-center cursor-pointer hover:scale-95 duration-500 hover:bg-blue-900"
            >
              <img
                src={PROMPT_SVG}
                className="w-28 h-28 mt-6"
                alt="Prompt"
              ></img>
              <h2 className="mb-6 font-sans text-lg font-semibold text-slate-200">
                Prompt
              </h2>
            </button>
            <button
              onClick={() => setMethod(6)}
              className="bg-blue-950 w-60 h-60 m-6 rounded-md flex flex-col justify-around items-center cursor-pointer hover:scale-95 duration-500 hover:bg-blue-900"
            >
              <img
                src={MANUAL_SVG}
                className="w-28 h-28 mt-6"
                alt="Manual"
              ></img>
              <h2 className="mb-6 font-sans text-lg font-semibold text-slate-200">
                Manual
              </h2>
            </button>
          </section>
        </div>
      ) : method === 1 ? (
        <Youtube setMethod={setMethod} />
      ) : method === 2 ? (
        <Website setMethod={setMethod} />
      ) : method === 3 ? (
        <Document setMethod={setMethod} />
      ) : method === 4 ? (
        <Text setMethod={setMethod} />
      ) : method === 5 ? (
        <Prompt setMethod={setMethod} />
      ) : method === 6 ? (
        <Manual setMethod={setMethod} />
      ) : (
        <ConfirmationAndDetails setMethod={setMethod}></ConfirmationAndDetails>
      )}
    </div>
  );
}

export default CreateQuiz;
