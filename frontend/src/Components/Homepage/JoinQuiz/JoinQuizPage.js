import React, { useState } from "react";
import "./style.css";
import { Alert, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../LocalStorage";
function JoinQuizPage() {
  const [code, setCode] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  let { user } = useAppContext();
  user= JSON.parse(localStorage.getItem("user"))
  // console.log(user);
  const handleJoinClick = () => {
    if (code?.length !== 6) {
      setOpenSnackbar(true);
      setMessage("Incorrect code! Please enter a 6-digit code.");
    } else if (user === undefined) {
      setOpenSnackbar(true);
      setMessage("Please login to you account first.");
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  return (
    <div>
      <div className="absolute w-full h-screen overflow-hidden">
        <div className="bg-transparent p-6 bg-purple-400 bg-opacity-20 flex flex-row shadow-lg w-full absolute items-center">
          <Link to="/">
            <div className="text-2xl md:text-3xl font-bold tracking-wide mb-4 md:mb-0 cursor-pointer ml-6">
              <span className="text-purple-800">Quiz</span>Wiz
            </div>
          </Link>
        </div>
        <div>
          {user === undefined ? (
            <Link to="/auth/candidate">
              <button className="absolute right-0 mr-16 bg-blue-900 shadow-lg hover:scale-95 transition-transform px-10 py-2 mt-5 rounded-md text-white font-semibold ">
                LogIn
              </button>
            </Link>
          ) : (
            <Link to="/candidate/dashboard">
              <button className="absolute right-0 mr-16 bg-blue-900 shadow-lg hover:scale-95 transition-transform px-10 py-2 mt-5 rounded-md text-white font-semibold ">
                Dashboard
              </button>
            </Link>
          )}
        </div>
        <div className="w-full h-screen bg-gradient-to-b from-[#4e54c8] to-[#b693bd] flex flex-col items-center justify-center">
          <h2 className="text-white text-4xl mb-14 font-semibold ">
            Join the Quiz
          </h2>
          <p className="text-white mb-8 text-center px-4">
            Enter your unique quiz code below to get started. Challenge yourself
            and test your knowledge!
          </p>
          <input
            placeholder="Enter the Quiz Code"
            className="rounded-lg z-50 p-3 h-14 w-96 opacity-80 text-purple-900 font-semibold text-lg text-center focus:outline-none"
            onChange={(e) => setCode(e.target.value)}
          />
          <Link
            to={
              code?.length === 6 && user !== undefined
                ? `/candidate/quiz/${code}`
                : "#"
            }
          >
            <button
              className="bg-purple-950 px-16 py-3 mt-6 rounded-md text-purple-100 font-semibold border-2 border-purple-300"
              onClick={handleJoinClick}
            >
              Attend
            </button>
          </Link>
          <p className="text-blue-950 font-semibold mt-6 text-sm text-center px-4">
            Need help? Contact the organizer for your quiz code.
          </p>
        </div>

        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default JoinQuizPage;
