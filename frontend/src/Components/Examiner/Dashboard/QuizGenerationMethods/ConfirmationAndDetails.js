import React, { useEffect, useState } from "react";
import {
  Checkbox,
  TextField,
  Slider,
  Snackbar,
  Modal,
  IconButton,
  Fade,
  Box,
  Alert,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useAppContext } from "../../../../LocalStorage";
import { generateQuiz } from "./../../../../API/Quiz";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function ConfirmationAndDetails({ setMethod }) {
  let { user, questions, setQuestions } = useAppContext();
  user= JSON.parse(localStorage.getItem("user"))
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [quizCode, setQuizCode] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("00:00");

  useEffect(() => {
    const dateTimeString = `${date}T${time}:00.000605+05:30`;
    setFormData((prevData) => ({
      ...prevData,
      scheduledTime: dateTimeString,
    }));
  }, [date, time]);

  const [formData, setFormData] = useState({
    scheduledTime: new Date().toISOString(),
    quizTitle: "",
    quizDuration: 20,
    timePerQuestion: 30,
    questionShuffle: false,
    optionShuffle: false,
    questions,
    numberOfQuestions: questions?.length,
    generator: user?.email,
  });

  const handleCreateQuiz = async () => {
    if (!formData.quizTitle || !formData.quizDuration) {
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const res = await generateQuiz(formData);
      if (res.status === 201) {
        setQuizCode(res.data.code);
        setModalOpen(true);
      } else if (res.status === 500) {
        setSnackbarMessage("Error creating quiz. Please try again later.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage(
        "An unexpected error occurred. Please try again later."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCopyQuizCode = () => {
    navigator.clipboard.writeText(quizCode);
    setSnackbarMessage("Quiz code copied to clipboard!");
    setSnackbarSeverity("success"); // Set severity to success for copy action
    setSnackbarOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseModal = () => {
    setMethod(0);
    setQuestions([]);
    setModalOpen(false);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-purple-100 p-10">
      <button
        className="absolute top-4 left-4 text-purple-950 w-20 h-10 rounded-md transition-colors flex justify-center items-center opacity-70 hover:opacity-100"
        onClick={() => setMethod(0)}
      >
        <ArrowBackOutlinedIcon />
        <h1 className="ml-1 font-rubik font-bold">Back</h1>
      </button>
      <button
        onClick={handleCreateQuiz}
        className="absolute flex flex-row top-6 right-6 bg-purple-600 text-white px-6 py-3 font-bold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
      >
        <p>Save Quiz</p>
        <TaskAltIcon className="ml-4" />
      </button>
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-2 gap-6 items-start">
          <TextField
            name="date"
            type="date"
            label="Schedule Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: date }}
          />
          <TextField
            name="time"
            type="time"
            label="Schedule Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: time }}
          />
          <div className="col-span-2 grid grid-cols-2 gap-6">
            <TextField
              name="quizTitle"
              label="Quiz Title"
              value={formData.quizTitle}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              name="quizDuration"
              label="Quiz Duration (mins)"
              type="number"
              value={formData.quizDuration}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-6">
            <div className="flex flex-col items-start">
              <label className="text-gray-600 font-medium">
                Number of Questions
              </label>
              <span className="text-purple-700 font-bold text-lg">
                {questions?.length}
              </span>
            </div>
            <div>
              <label className="flex flex-row justify-between items-center text-gray-600 font-medium mb-2">
                <h3>Time Per Question (secs)</h3>
                <div className="text-purple-700 font-bold text-lg mt-1">
                  {formData.timePerQuestion} seconds
                </div>
              </label>
              <div className="flex items-center pl-4 pr-2">
                <Slider
                  value={formData.timePerQuestion}
                  onChange={(e, newValue) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      timePerQuestion: newValue,
                    }))
                  }
                  aria-labelledby="time-per-question-slider"
                  min={5}
                  max={120}
                  step={5}
                  sx={{
                    color: "purple",
                    "& .MuiSlider-thumb": {
                      height: 24,
                      width: 24,
                      backgroundColor: "#fff",
                      border: "2px solid currentColor",
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                name="questionShuffle"
                checked={formData.questionShuffle}
                onChange={handleChange}
                sx={{ color: "purple", "&.Mui-checked": { color: "purple" } }}
              />
              <label className="text-purple-800 font-medium">
                Shuffle Questions
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                name="optionShuffle"
                checked={formData.optionShuffle}
                onChange={handleChange}
                sx={{ color: "purple", "&.Mui-checked": { color: "purple" } }}
              />
              <label className="text-purple-800 font-medium">
                Shuffle Options
              </label>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{
            width: "100%",
            backgroundColor:
              snackbarSeverity === "success" ? "#a7f3d0" : "#f59fa6",
            color: snackbarSeverity === "success" ? "#047857" : "#850b15",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Fade in={modalOpen}>
          <Box className="flex flex-col justify-center items-center min-h-screen">
            <div className="bg-white pl-14 pr-14 pb-10 pt-10 rounded-lg shadow-lg  text-center">
              <h2 className="font-bold mb-2 text-2xl text-blue-950 font-rubik">
                Quiz Created Successfully!
              </h2>
              <h2 variant="body2" className="mb-2">
                Your quiz code is:
              </h2>
              <div className="flex justify-center items-center">
                <span className="font-bold text-lg text-blue-800">
                  {quizCode}
                </span>
                <IconButton onClick={handleCopyQuizCode}>
                  <ContentCopyIcon className="text-blue-950 ml-2" />
                </IconButton>
              </div>
              <button
                className="mt-4 bg-blue-900 px-8 py-2 rounded text-white font-semibold"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ConfirmationAndDetails;
