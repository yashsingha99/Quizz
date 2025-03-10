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
  const { user: contextUser, setUser } = useAppContext();
  const [user, setLocalUser] = useState(null);
  const [showStatistics, setShowStatistics] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setLocalUser(parsedUser);
        
        // Redirect based on user type
        if (parsedUser?.type === 0) {
          navigate("/candidate/dashboard");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/auth/examiner");
      }
    } else if (contextUser) {
      setLocalUser(contextUser);
      if (contextUser?.type === 0) {
        navigate("/candidate/dashboard");
      }
    } else {
      navigate("/auth/examiner");
    }
  }, [contextUser, navigate]);

  // Auto-close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
    navigate('/');
  };

  return (
    <div className="flex relative w-full h-screen bg-white overflow-hidden">
      {/* Sidebar Toggle Button (visible when sidebar is closed) */}
      {!sidebarOpen && (
        <button 
          className="absolute top-4 left-4 z-50 p-2 rounded-full bg-purple-100 shadow-md"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <SlidersHorizontal color="#A855F7" size={24} />
        </button>
      )}

      {/* Animated Sidebar */}
      <div 
        className={`fixed md:relative z-40 h-screen bg-purple-200 border-r-2 text-blue-950 border-purple-300 flex flex-col justify-between transition-all duration-500 ease-in-out
        ${sidebarOpen ? "translate-x-0 w-full md:w-1/4 lg:w-1/5" : "-translate-x-full -w-0 "}
        shadow-2xl md:shadow-none`}
      >
        {/* Close button */}
        <button
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-purple-300 transition-colors duration-200"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X color="#A855F7" size={20} />
        </button>

        {/* Logo */}
        <div className="mt-12 md:mt-8">
          <Link to="/">
            <div className="text-3xl text-center font-bold tracking-wide cursor-pointer">
              <span className="text-purple-500">Quiz</span>Wiz
            </div>
          </Link>
        </div>

        {/* User Profile */}
        <div className="flex flex-col justify-center items-center mt-4 px-4">
          <img
            alt="User avatar"
            src={
              user?.photo === "default"
                ? "https://avatar.iran.liara.run/public"
                : user?.photo
            }
            className="rounded-full border-4 p-2 border-purple-400 w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 object-cover"
          />
          <h2 className="font-rubik font-semibold m-2 mt-4 text-center">
            {user?.firstName} {user?.lastName}
          </h2>
          <h3 className="font-serif text-sm m-1 text-center truncate max-w-full">
            {user?.email}
          </h3>
          <h3 className="font-playfair font-bold text-sm m-1 text-center">
            {user?.college}
          </h3>
        </div>

        {/* Action Button */}
        <button
        
          onClick={() =>{ setShowStatistics(!showStatistics); setSidebarOpen(false);}}
          className="bg-blue-900 p-3 mx-4 my-6 rounded-md text-white font-rubik flex justify-center items-center hover:text-blue-950 hover:bg-white hover:border-2 hover:border-blue-900 transition-colors duration-300"
        >
          {showStatistics ? (
            <div className="flex items-center justify-center">
              <AddCircleOutlineSharpIcon />
              <span className="ml-2 text-sm md:text-base whitespace-nowrap">Create new Quiz</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <InsightsSharpIcon />
              <span className="ml-2 text-sm md:text-base whitespace-nowrap">Show Statistics</span>
            </div>
          )}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mb-6 flex flex-row justify-center items-center bg-purple-300 border-t-4 border-b-4 border-purple-400 p-4 hover:bg-purple-400 transition-colors duration-300"
        >
          <LogoutIcon />
          <span className="ml-2 font-rubik font-semibold">Log out</span>
        </button>
      </div>

      {/* Overlay that appears when sidebar is open on mobile */}
      <div 
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ease-in-out ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-4 md:p-6">
          {showStatistics ? <Statistics /> : <CreateQuiz />}
        </div>
      </div>
    </div>
  );
}

export default Main;