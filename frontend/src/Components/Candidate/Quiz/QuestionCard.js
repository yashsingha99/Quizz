import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

function QuestionCard({
  title,
  question,
  index,
  shuffle,
  time,
  setResult,
  setNextQuestion,
  setRegistered,
  timeLeftToEnd,
  setTimeLeftToEnd,
  setQuizEnded,
}) {
  const [timer, setTimer] = useState(time);
  const shuffledOptions = useMemo(() => {
    const options = [...question.options];
    if (shuffle) {
      for (let i = options?.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
    }
    return options;
  }, [question.options, shuffle]);

  const handleMark = (option) => {
    if (question.correctOption === option)
      setResult((prevResult) => prevResult + 1);
    setNextQuestion((nextQuestion) => !nextQuestion);
    setRegistered(true);
  };

  useEffect(() => {
    setTimer(time);
  }, [time, question]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) return prev - 1;
        setNextQuestion((nextQuestion) => !nextQuestion);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [setNextQuestion]);

  useEffect(() => {
    const endInterval = setInterval(() => {
      setTimeLeftToEnd((prevTime) => {
        if (prevTime <= 1000) {
          setQuizEnded(true);
          clearInterval(endInterval);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(endInterval);
  }, [setQuizEnded, setTimeLeftToEnd]);

  const backgroundGradient = `linear-gradient(to left, white ${(
    (timer / time) *
    100
  ).toFixed(2)}%, skyblue ${((timer / time) * 100).toFixed(2)}%)`;

  return (
    <div className="w-full  pb-10 flex flex-col items-center bg-blue-950">
      <motion.div
        className="w-full h-20 m-10 shadow-lg flex justify-between items-center px-4 text-blue-950 animate-fade-in"
        style={{
          background: backgroundGradient,
          overflow: "hidden",
        }}
      >
        <h1 className="text-xl font-semibold">{title}</h1>
        <h2 className="text-xl font-bold">Time Left: {timer}s</h2>
      </motion.div>
      <div className="w-2/3 m-10 bg-white bg-opacity-90 p-14 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-900 tracking-wide mb-4">
          {index + 1 + ". " + question.question}
        </h1>
        <div className="mt-10 space-y-4">
          {shuffledOptions?.map((option, number) => (
            <button
              key={option._id}
              className="flex w-full items-center text-lg font-medium bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-md text-blue-900 transition-transform duration-300 hover:bg-blue-900 hover:text-white hover:shadow-xl transform hover:scale-x-105 cursor-pointer"
              onClick={() => handleMark(option)}
            >
              <span className="font-semibold ml-6">{`${String.fromCharCode(
                97 + number
              )}.`}</span>
              <span className="ml-3">{option}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
