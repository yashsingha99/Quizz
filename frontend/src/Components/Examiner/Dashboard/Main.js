import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../LocalStorage";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import InsightsSharpIcon from "@mui/icons-material/InsightsSharp";
import Statistics from "./Statistics";
import CreateQuiz from "./CreateQuiz";
import { SlidersHorizontal, X } from 'lucide-react';
function Main() {
  let { user, setUser } = useAppContext();
  const [showStatistics, setShowStatistics] = useState(true);
  const [sliderOpen, setSliderOpen] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    user= JSON.parse(localStorage.getItem("user"))
    if (user === undefined) {
      navigate("/auth/examiner");
    } else if (user?.type === 0) {
      navigate("/candidate/dashboard");
    }
  }, [user, navigate]);


  const handleLogout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
    navigate('/')
  }

  return (
    <div className="flex relative flex-row w-full h-screen">
     { !sliderOpen && <nav className="bg-purple-200 relative w-1/5 border-r-2 text-blue-950 border-purple-300 justify-between flex flex-col">
        <div className="absolute right-2 top-2"> <X color="#A855F7" className="cursor-pointer" onClick={() => setSliderOpen((P) => !P)} /> </div>
        <Link to="/">
          <div className="text-3xl text-center flex justify-center items-center mt-10 md:text-4xl font-bold tracking-wide mb-4 md:mb-0 cursor-pointer">
            <span className="text-purple-500">Quiz</span>Wiz
          </div>
        </Link>
        <div className="flex flex-col justify-center items-center">
          <img
            alt=""
            src={
              user?.photo === "default"
                ? "https://avatar.iran.liara.run/public"
                : user?.photo
            }
            className="rounded-full border-4 p-2 border-purple-400 w-40"
          ></img>
          <h2 className="font-rubik font-semibold m-2 mt-6 ">
            {user?.firstName} {user?.lastName}
          </h2>
          <h3 className="font-serif text-sm m-2 ">{user?.email}</h3>
          <h3 className="font-playfair font-bold text-sm m-2 ">
            {user?.college}
          </h3>
        </div>
        <button
          onClick={(e) => setShowStatistics(!showStatistics)}
          className="bg-blue-900 p-3 m-4 rounded-md text-white font-rubik flex justify-center items-center hover:text-blue-950 hover:bg-white hover:border-2 hover:border-blue-900 transition-colors duration-300"
        >
          {showStatistics ? (
            <div className="flex justify-center">
              <AddCircleOutlineSharpIcon></AddCircleOutlineSharpIcon>
              <h1 className="ml-2">Create new Quiz</h1>
            </div>
          ) : (
            <div className="flex justify-center">
              <InsightsSharpIcon></InsightsSharpIcon>
              <h1 className="ml-2">Show Statistics</h1>
            </div>
          )}
        </button>
        <button
          onClick={handleLogout}
          className="mb-6 flex flex-row justify-center bg-purple-300 border-t-4 border-b-4  border-purple-400 p-4"
        >
          <LogoutIcon></LogoutIcon>
          <h1 classNameName="ml-2 font-rubik font-semibold">Log out</h1>
        </button>
      </nav>}
      { sliderOpen && 
      <SlidersHorizontal color="#A855F7" className="cursor-pointer absolute top-4 left-4" onClick={() => setSliderOpen((P) => !P)} />
      } 
      <div className=" w-[100%] overflow-y-scroll overflow-x-hidden">
        {showStatistics ? <Statistics></Statistics> : <CreateQuiz></CreateQuiz>}
      </div>
    </div>
  );
}

export default Main;
