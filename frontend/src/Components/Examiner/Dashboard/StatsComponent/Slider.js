import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./Slider.css";
import DetailedModal from "./DetailedQuiz";

const ReactCardSlider = ({ slides }) => {
  const scrollSlider = (direction) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += direction * 500;
  };

  const [openDetailedModal, setOpenDetailedModal] = useState(false);
  const [data, setData] = useState();

  return (
    <div id="main-slider-container" className="relative">
      <MdChevronLeft
        size={40}
        className="slider-icon z-30 left hover:opacity-100 left-0 absolute rounded-full opacity-75 bg-blue-50 text-blue-800"
        onClick={() => scrollSlider(-1)}
      />
      <div id="slider" className="w-full whitespace-nowrap bg-blue-50 p-2 pt-4">
        {slides?.map((slide, index) => (
          <div
            className={`relative w-80 h-28 bg-blue-950 rounded-lg ml-2 mr-2 shadow-lg cursor-pointer inline-block transition-transform duration-300 hover:scale-105`}
            key={slide.id}
            onClick={() => {
              setOpenDetailedModal(true);
              setData(slide);
            }}
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 p-4 flex flex-col justify-between text-white">
              <div>
                <div className="flex flex-row justify-between items-center">
                  <h2 className="font-semibold ml-2 mr-6 text-xl max-h-14 overflow-hidden">
                    {slide.quizTitle}
                  </h2>
                  <h2 className="text-sm tracking-wider">{slide.code}</h2>
                </div>
                <div className="flex flex-row justify-between items-center m-2 absolute bottom-2 w-4/5 ml-4">
                  <h1 className="font-bold font-playfair tracking-wider">
                    {slide.scheduledTime.substring(0, 10)}
                  </h1>{" "}
                  |
                  <h2 className="font-thin text-sm">
                    {slide.quizDuration} Min
                  </h2>{" "}
                  |
                  <h1 className="font-bold font-playfair tracking-wider flex flex-row items-baseline">
                    {slide.scheduledTime.substring(11, 16)}
                    <p className="text-sm font-thin ml-1">IST</p>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openDetailedModal && (
        <DetailedModal
          setModal={() => setOpenDetailedModal(false)}
          data={data}
        ></DetailedModal>
      )}

      <MdChevronRight
        size={40}
        className="slider-icon right hover:opacity-100 right-0 absolute rounded-full opacity-75 bg-blue-50 text-blue-800"
        onClick={() => scrollSlider(1)}
      />
    </div>
  );
};

export default ReactCardSlider;
