import React, { useState } from "react";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function JoinQuiz() {
  const [code, setCode] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleJoinClick = () => {
    if (code?.length !== 6) {
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-200 to-purple-200 p-6">
      <div className="bg-white shadow-lg rounded-lg pl-20 w-1/2 pr-20 pb-20 text-center">
        <h2 className="text-4xl font-bold text-blue-800 p-10">Join the Quiz</h2>
        <p className="text-red-300 text-sm font-serif mb-8">
          Please enter the code provided by your instructor or quiz master to
          join the quiz. If you do not have a code, contact your organizer for
          assistance.
        </p>

        <input
          type="text"
          placeholder="Enter Quiz Code"
          className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:border-blue-300 border-4 text-blue-800 font-bold tracking-wider text-center"
          onChange={(e) => setCode(e.target.value)}
        />

        <Link to={code?.length === 6 ? `/candidate/quiz/${code}` : "#"}>
          <button
            onClick={handleJoinClick}
            className="bg-blue-900 text-white font-semibold rounded-md w-4/5 p-3 mt-4 hover:bg-blue-700 transition duration-200"
          >
            Join Quiz
          </button>
        </Link>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled">
          Incorrect code! Please enter a 6-digit code.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default JoinQuiz;
