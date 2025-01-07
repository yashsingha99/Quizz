import React from "react";
import TIMER from "./../../../Assets/hourglass.gif";

function WaitingPage({ timeLeftToStart }) {
  const formatTimeLeftToStart = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours > 9 ? hours : "0" + hours} : ${
      minutes > 9 ? minutes : "0" + minutes
    } : ${seconds > 9 ? seconds : "0" + seconds}`;
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h2 className="text-3xl p-10 pb-2 font-bold font-rubik ">Get Ready!</h2>
      <h2 className="text-3xl p-10 pt-0 font-bold font-rubik ">
        {" "}
        The Quiz Starts Soon!
      </h2>
      <img
        src={TIMER}
        className="w-60 opacity-75 p-10 bg-white rounded-lg"
      ></img>
      <h2 className="text-4xl font-semibold font-playfair bg-blue-600 border-4 p-4 px-8 border-slate-400 rounded-lg m-10">
        {formatTimeLeftToStart(timeLeftToStart)}
      </h2>
    </div>
  );
}

export default WaitingPage;
