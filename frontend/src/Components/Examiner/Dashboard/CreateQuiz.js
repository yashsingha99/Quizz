import React, { useState, useEffect } from "react";
import { Youtube, Globe, FileText, Type, MessageSquare, Edit } from 'lucide-react';
import YouTube from "./QuizGenerationMethods/Youtube";
import Website from "./QuizGenerationMethods/Website";
import Document from "./QuizGenerationMethods/Document";
import Text from "./QuizGenerationMethods/Text";
import Prompt from "./QuizGenerationMethods/Prompt";
import Manual from "./QuizGenerationMethods/Manual";
import ConfirmationAndDetails from "./QuizGenerationMethods/ConfirmationAndDetails";

function CreateQuiz() {
  const [method, setMethod] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle responsive window resizing
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Quiz generation methods with icons from Lucide
  const quizMethods = [
    { 
      name: "YouTube", 
      icon: <Youtube size={windowWidth < 768 ? 40 : 56} strokeWidth={1.5} className="text-white" />,
      onClick: () => setMethod(1)
    },
    { 
      name: "Website", 
      icon: <Globe size={windowWidth < 768 ? 40 : 56} strokeWidth={1.5} className="text-white" />,
      onClick: () => setMethod(2)
    },
    { 
      name: "Document", 
      icon: <FileText size={windowWidth < 768 ? 40 : 56} strokeWidth={1.5} className="text-white" />,
      onClick: () => setMethod(3)
    },
    { 
      name: "Text", 
      icon: <Type size={windowWidth < 768 ? 40 : 56} strokeWidth={1.5} className="text-white" />,
      onClick: () => setMethod(4)
    },
    { 
      name: "Prompt", 
      icon: <MessageSquare size={windowWidth < 768 ? 40 : 56} strokeWidth={1.5} className="text-white" />,
      onClick: () => setMethod(5)
    },
    { 
      name: "Manual", 
      icon: <Edit size={windowWidth < 768 ? 40 : 56} strokeWidth={1.5} className="text-white" />,
      onClick: () => setMethod(6)
    }
  ];

  // Render method selection screen
  const renderMethodSelection = () => {
    return (
      <div className="flex flex-col justify-center items-center bg-slate-50 p-4 min-h-screen">
        <section className="text-center mt-4 md:mt-8 flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-roboto font-bold p-4 md:p-6 border-b-4 rounded border-purple-300 w-full md:w-3/4 lg:w-1/2">
            Create a{" "}
            <span className="text-3xl md:text-5xl text-blue-950 font-rubik">Quiz</span>{" "}
            That Rocks!
          </h1>
          <h2 className="font-roboto font-semibold text-center p-3 md:p-4 mt-4 md:mt-8 w-full md:w-4/5 lg:w-2/3 text-blue-950 text-sm md:text-base">
            Bring your ideas to life by creating quizzes that capture
            attention and make learning fun. Design quizzes that encourage
            curiosity and keep participants engaged.
          </h2>
        </section>
        
        <section className="w-full flex flex-col items-center mt-4 md:mt-8">
          <div className="bg-purple-100 rounded-xl md:rounded-2xl p-4 md:p-8 w-full max-w-6xl">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              {quizMethods.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="bg-blue-950 rounded-lg md:rounded-xl p-4 md:p-6 flex flex-col justify-center items-center transition-all duration-300 
                    hover:scale-[0.97] hover:bg-blue-900 hover:shadow-lg"
                >
                  <div className="flex items-center justify-center h-16 md:h-28">
                    {item.icon}
                  </div>
                  <h2 className="mt-3 md:mt-4 font-sans text-base md:text-lg font-medium md:font-semibold text-white">
                    {item.name}
                  </h2>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };

  // Render the appropriate component based on method state
  const renderComponent = () => {
    switch (method) {
      case 0:
        return renderMethodSelection();
      case 1:
        return <YouTube setMethod={setMethod} />;
      case 2:
        return <Website setMethod={setMethod} />;
      case 3:
        return <Document setMethod={setMethod} />;
      case 4:
        return <Text setMethod={setMethod} />;
      case 5:
        return <Prompt setMethod={setMethod} />;
      case 6:
        return <Manual setMethod={setMethod} />;
      default:
        return <ConfirmationAndDetails setMethod={setMethod} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderComponent()}
    </div>
  );
}

export default CreateQuiz;