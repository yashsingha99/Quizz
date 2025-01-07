import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../LocalStorage";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import JoinQuiz from "./JoinQuiz";
import Statistics from "./Statistics";
import InsightsSharpIcon from "@mui/icons-material/InsightsSharp";

function Main() {
  let { user, setUser } = useAppContext();
  const [joinQuiz, setJoinQuiz] = useState(true);
  const navigate = useNavigate();
  user= JSON.parse(localStorage.getItem("user"))

  useEffect(() => {    
    if (user === undefined) {
      navigate("/auth/candidate");
    } else if (user?.type === 1) {
      navigate("/examiner/dashboard");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
    navigate('/')
  }


  return (
    <div className="flex flex-row w-full h-screen">
      <nav className="bg-purple-200 w-1/5 border-r-2 text-blue-950 border-purple-300 justify-between flex flex-col">
        <Link to="/">
          <div className="text-2xl md:text-4xl font-bold tracking-wide mb-4 md:mb-0 cursor-pointer w-full text-center mt-14">
            <span className="text-purple-800">Quiz</span>Wiz
          </div>
        </Link>
        <div className="flex flex-col justify-center items-center mt-10 ">
          <img
            alt="profile picture"
            src={
              user?.photo === "default"
                ? "https://avatar.iran.liara.run/public"
                : user?.photo
            }
            className="rounded-full border-4 p-2 border-purple-400 w-40"
          />
          <h2 className="font-rubik font-semibold m-2 mt-6 ">
            {user?.firstName} {user?.lastName}
          </h2>
          <h3 className="font-serif text-sm m-2 ">{user?.email}</h3>
          <h3 className="font-playfair font-bold text-sm m-2 ">
            {user?.college}
          </h3>
        </div>
        {joinQuiz ? (
          <button
            onClick={() => setJoinQuiz(!joinQuiz)}
            className="bg-blue-900 p-3 m-4 rounded-md text-white font-rubik flex justify-center items-center hover:text-blue-950 hover:bg-white hover:border-2 hover:border-blue-900 transition-colors duration-300"
          >
            <EditNoteOutlinedIcon />
            <h1 className="ml-2">Join a Quiz</h1>
          </button>
        ) : (
          <button
            onClick={() => setJoinQuiz(!joinQuiz)}
            className="bg-blue-900 p-3 m-4 rounded-md text-white font-rubik flex justify-center items-center hover:text-blue-950 hover:bg-white hover:border-2 hover:border-blue-900 transition-colors duration-300"
          >
            <InsightsSharpIcon></InsightsSharpIcon>
            <h1 className="ml-2">View Statistics</h1>
          </button>
        )}

        <button
          onClick={handleLogout}
          className="mb-6 flex flex-row justify-center bg-purple-300 border-t-4 border-b-4 border-purple-400 p-4"
        >
          <LogoutIcon />
          <h1 className="ml-2 font-rubik font-semibold">Log out</h1>
        </button>
      </nav>
      <div className=" w-4/5 overflow-y-scroll overflow-x-hidden">
        {joinQuiz ? <Statistics /> : <JoinQuiz />}
      </div>
    </div>
  );
}

export default Main;
