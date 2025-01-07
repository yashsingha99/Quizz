import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { sampleUsers } from "./dummyData";
import { LineChart, PieChart } from "@mui/x-charts";
import { Modal, Box, CircularProgress, Typography } from "@mui/material";
import { useAppContext } from "../../../LocalStorage";
import { getCandidate } from "../../../API/Candidate";

const Statistics = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [avgPerformace, setAvgPerformance] = useState(0.0);
  const [quizCodeArray, setQuizCodeArray] = useState([]);
  const [quizObtainedArray, setQuizObtainedArray] = useState([]);
  let { user, setUser } = useAppContext();
  user= JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    const getUpdatedUser = async () => {
      const res = await getCandidate({
        email: user?.email,
        password: user?.password,
      });
      setUser(res.data._doc);
    };

    const updateQuizData = () => {
      setQuizCodeArray([]);
      setQuizObtainedArray([]);
      const codes = [];
      const scores = [];
      user?.quizzesAttended.forEach((quiz) => {
        codes.push(quiz.topic);
        scores.push((quiz.score * 100) / quiz.totalMarks);
      });
      setQuizCodeArray(codes);
      setQuizObtainedArray(scores);
    };

    const averagePerformance = () => {
      let totalMarks = 0;
      let obtainedMarks = 0;
      user?.quizzesAttended.forEach((quiz) => {
        totalMarks += quiz.totalMarks;
        obtainedMarks += quiz.score;
      });
      setAvgPerformance((obtainedMarks * 100) / totalMarks);
    };

    getUpdatedUser();
    averagePerformance();
    updateQuizData();
  }, []);

  const getProgressColor = (score) => {
    if (score >= 75) return "#4caf50";
    if (score >= 50) return "#ffeb3b";
    return "#f44336";
  };
  const scrollSlider = (direction) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += direction * 500;
  };

  const handleOpenModal = (quiz) => {
    setSelectedQuiz(quiz);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedQuiz(null);
    setOpenModal(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      {user?.quizzesAttended?.length != 0 ? (
        <>
          {/* Charts Section */}
          <div className="w-full flex justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl flex space-x-4">
              {/* Line Chart */}
              <div className="w-1/2 flex flex-col justify-center items-center ml-10">
                <LineChart
                  xAxis={[
                    {
                      label: "Quiz Name",
                      data: quizCodeArray,
                      scaleType: "band",
                    },
                  ]}
                  series={[
                    {
                      label: "Marks Percentage",
                      data: quizObtainedArray,
                      color: "#965fe3",
                    },
                  ]}
                  width={600}
                  height={300}
                  title="Candidate's Performance"
                  yAxisLabel="Marks"
                  xAxisLabel="Quiz Name"
                />
                <h2 className="text-lg font-semibold text-purple-900 mb-4">
                  Your Performance per Quiz
                </h2>
              </div>
              {/* Pie Chart */}
              <div className="w-1/2 flex flex-col items-center justify-center ">
                <div className="ml-20 mb-0">
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: avgPerformace,
                            color: "#5dd469",
                            label: "Good",
                          },
                          {
                            id: 1,
                            value: 100 - avgPerformace,
                            color: "#f54c4c",
                            label: "Bad",
                          },
                        ],
                      },
                    ]}
                    width={300}
                    height={300}
                  />
                </div>
                <h2 className="text-lg font-semibold text-purple-900 mb-4">
                  Overall Performace
                </h2>
              </div>
            </div>
          </div>

          {/* Total Quizzes Attended */}
          <div className="mt-6 w-full max-w-6xl bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-purple-900">
              Total Quizzes Attended: {user?.quizzesAttended?.length}
            </h2>
          </div>

          {/* Attended Quizzes Section */}
          <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 mt-4">
            <h2 className="text-xl font-semibold text-purple-900 mb-4">
              Attended Quizzes
            </h2>
            <div className="relative flex items-center">
              <MdChevronLeft
                size={40}
                className="slider-icon left-0 z-50 hover:opacity-100 absolute rounded-full opacity-75 bg-blue-50 text-blue-800"
                onClick={() => scrollSlider(-1)}
              />
              <div
                id="slider"
                className="w-full whitespace-nowrap bg-blue-50 p-2 pt-4 pl-10 overflow-x-scroll scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-100"
              >
                {user?.quizzesAttended?.map((quiz, index) => {
                  const percentageScore = Math.round(
                    (quiz.score / quiz.totalMarks) * 100
                  );
                  return (
                    <div
                      key={index}
                      className="relative w-80 h-28 bg-gray-50 border border-gray-200 rounded-lg ml-2 mr-2 shadow-lg inline-block transition-transform duration-300 text-gray-700  hover:scale-105 hover:bg-blue-950 hover:text-white cursor-pointer"
                      onClick={() => handleOpenModal(quiz)}
                    >
                      <div className="absolute top-0 left-0 right-0 bottom-0 p-4 flex flex-col justify-between ">
                        <h3 className="font-bold text-purple-700 text-xl">
                          {quiz.code}
                        </h3>
                        <p className="font-semibold">{quiz.topic}</p>
                        <p className="text-sm">{quiz.date}</p>
                      </div>
                      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                        <CircularProgress
                          variant="determinate"
                          value={percentageScore}
                          size={50}
                          style={{ color: getProgressColor(percentageScore) }}
                        />
                        <Typography
                          variant="caption"
                          component="div"
                          color="textSecondary"
                          style={{
                            position: "absolute",
                            color: "grey",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          {`${percentageScore}%`}
                        </Typography>
                      </div>
                    </div>
                  );
                })}
              </div>
              <MdChevronRight
                size={40}
                className="slider-icon right-0 hover:opacity-100 absolute rounded-full opacity-75 bg-blue-50 text-blue-800"
                onClick={() => scrollSlider(1)}
              />
            </div>
          </div>

          {/* Modal for Quiz Details */}
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="quiz-modal-title"
            aria-describedby="quiz-modal-description"
          >
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
              {selectedQuiz && (
                <>
                  <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
                    <h2
                      className="text-2xl font-bold text-purple-800 mb-4"
                      id="quiz-modal-title"
                    >
                      Quiz Code: {selectedQuiz.code}
                    </h2>
                    <div className="bg-purple-50 p-4 rounded-md shadow-sm">
                      <p
                        id="quiz-modal-description"
                        className="text-purple-700 font-semibold mb-3"
                      >
                        <span className="text-purple-900">Topic:</span>{" "}
                        {selectedQuiz.topic}
                      </p>
                      <p className="text-purple-700 font-semibold mb-3">
                        <span className="text-purple-900">Date:</span>{" "}
                        {selectedQuiz.time.substring(0, 10) +
                          " @ " +
                          selectedQuiz.time.substring(11, 16) +
                          " ( India ) "}
                      </p>
                      <p className="text-purple-700 font-semibold mb-3">
                        <span className="text-purple-900">Score:</span>{" "}
                        {selectedQuiz.score} / {selectedQuiz.totalMarks}
                      </p>
                      <p className="text-purple-700 font-semibold">
                        <span className="text-purple-900">Examiner:</span>{" "}
                        {selectedQuiz.examiner}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </Box>
          </Modal>
        </>
      ) : (
        <div className="w-full h-max items-center justify-center flex flex-col mt-60 bg-blue-100 p-10 rounded-xl text-blue-950">
          <h2 className="font-semibold text-4xl">No Data found</h2>
          <p className="mt-4">Create a new Quiz</p>
        </div>
      )}
    </div>
  );
};

export default Statistics;
