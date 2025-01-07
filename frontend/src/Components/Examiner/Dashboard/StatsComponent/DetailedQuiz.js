import * as React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function QuizModal({ setModal, data }) {
  const handleClose = () => setModal(false);

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="quiz-modal-title"
        aria-describedby="quiz-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl w-2/3 max-h-[80vh] overflow-auto scrollbar-custom">
          <div className="flex flex-col justify-between pb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{data.quizTitle}</h1>
              <h1 className="text-xl font-semibold text-gray-600">
                {data.code}
              </h1>
            </div>

            <div className="mb-4 text-gray-600">
              <Typography variant="body1" className="text-lg">
                {data.quizDuration} Minutes | Time per question:{" "}
                {data.timePerQuestion} seconds
              </Typography>
            </div>

            <Divider sx={{ mb: 3 }} />
            <div className="flex flex-row justify-between w-full">
              <div className="w-1/2 flex flex-col pr-5">
                <h3 className="text-xl font-bold mb-2 ml-4 flex flex-row justify-between items-center ">
                  <p>Participants</p>
                  <p className="mr-6 font-medium text-sm">
                    {data?.attemptedBy?.length} Participants
                  </p>
                </h3>
                <div className="max-h-[50vh] bg-slate-300 scrollbar-custom overflow-scroll overflow-x-auto p-4 border-8 border-slate-300 rounded-lg">
                  {data.attemptedBy?.length > 0 ? (
                    data.attemptedBy?.map((attempt) => (
                      <h3
                        key={attempt._id}
                        className="flex justify-between items-center bg-white p-3 mb-2 rounded-lg shadow-sm"
                      >
                        <p className="font-semibold text-blue-950">
                          {attempt.email}
                        </p>
                        <p className="text-xl font-bold mr-4 text-purple-950">
                          {attempt.correctAnswers}
                        </p>
                      </h3>
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      className="text-center text-gray-600"
                    >
                      No participants available.
                    </Typography>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-1/2 pl-5">
                <h3 className="text-xl font-bold mb-2 w-full ml-4 flex flex-row justify-between items-center">
                  <p>Questions List</p>
                  <p className="mr-10 font-medium text-sm ">
                    {data?.questions?.length} questions
                  </p>
                </h3>
                <div>
                  <div className="max-h-[50vh] bg-slate-300 scrollbar-custom overflow-scroll overflow-x-auto p-4 border-8 border-slate-300 rounded-lg">
                    {data.questions?.length > 0 ? (
                      data.questions?.map((question) => (
                        <Accordion key={question._id} className="mb-2">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel-${question._id}-content`}
                            id={`panel-${question._id}-header`}
                          >
                            <Typography className="font-semibold text-blue-950">
                              {question.question}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className="flex flex-col space-y-2">
                              <Typography
                                variant="body1"
                                className="font-medium"
                              >
                                <strong>Options:</strong>
                              </Typography>
                              <ul className="list-disc pl-5">
                                {question.options?.map((option, index) => (
                                  <li key={index} className="text-blue-800">
                                    {option}
                                  </li>
                                ))}
                              </ul>
                              <Typography
                                variant="body1"
                                className="font-medium"
                              >
                                <strong>Correct Option:</strong>{" "}
                                {question.correctOption}
                              </Typography>
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      ))
                    ) : (
                      <Typography
                        variant="body2"
                        className="text-center text-gray-600"
                      >
                        No questions available.
                      </Typography>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
