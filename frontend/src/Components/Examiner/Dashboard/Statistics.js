import React, { useEffect, useState } from "react";
import Slider from "./StatsComponent/Slider";
import { useAppContext } from "../../../LocalStorage";
import { getQuizes } from "./../../../API/Quiz";
import { LineChart } from "@mui/x-charts";

function Statistics() {
  const [quizes, setQuizes] = useState([]);
  let { user } = useAppContext();
  const [avgScore, setAvgScore] = useState([]);
  const [quizCode, setQuizCode] = useState([]);

  useEffect(() => {
    const calculateAvgScore = () => {
      const avgScores = [];
      const quizCodes = [];

      quizes?.forEach((quiz) => {
        quizCodes.push(quiz.code);
        let totalScore = 0;
        let totalParticipants = 0;

        quiz.attemptedBy.forEach((attempt) => {
          totalScore += attempt.correctAnswers;
          totalParticipants++;
        });

        const totalQuestions = quiz.questions?.length;
        const avgPercentage =
          totalParticipants > 0
            ? (totalScore / (totalQuestions * totalParticipants)) * 100
            : 0;
        avgScores.push(avgPercentage);
      });

      setQuizCode(quizCodes);
      setAvgScore(avgScores);
    };

    if (quizes?.length > 0) {
      calculateAvgScore();
    }
  }, [quizes]);
  useEffect(() => {
     user= JSON.parse(localStorage.getItem("user"))

    const getAllQuizes = async () => {

      let res = await getQuizes({
        email: user?.email,
        password: user?.password,
      });
      
      setQuizes(res.data);
    };
    getAllQuizes();
  }, []);
  return (
    <div>
      <div className="w-full  p-4 mt-4 ">
        {quizes?.length !== 0 ? (
          <div>
            <h1 className="text-xl mb-2 ml-2 font-bold ">Your Quizes -</h1>
            <Slider slides={quizes}></Slider>
            <h1 className="text-xl mb-2 ml-2 font-bold mt-10">
              Performance Chart -
            </h1>
            <div className="bg-slate-100 mt-4 rounded-xl shadow-inner  flex items-center justify-center">
              <LineChart
                xAxis={[
                  {
                    label: "Quiz Code",
                    data: quizCode,
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    label: "Average Score",
                    data: avgScore,
                    color: "#965fe3",
                  },
                ]}
                width={1100}
                height={400}
                title="Quiz"
                yAxisLabel="Marks"
                xAxisLabel="Quiz Code"
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-max items-center justify-center flex flex-col mt-60 bg-blue-50 p-10 rounded-xl text-blue-950">
            <h2 className="font-semibold text-4xl">No Data found</h2>
            <p className="mt-4">Create a new Quiz</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Statistics;
