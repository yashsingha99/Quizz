import React, { useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useAppContext } from "./../../../../LocalStorage.js";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Manual({ setMethod }) {
  const [showModal, setShowModal] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const { questions, setQuestions } = useAppContext();

  const handleAddQuestionClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectOptionIndex(0);
    setEditingIndex(null);
  };

  const handleSaveQuestion = () => {
    if (
      questionText.trim() === "" ||
      options.some((opt) => opt.trim() === "")
    ) {
      alert("Please fill in all fields.");
      return;
    }
    const newQuestion = {
      question: questionText,
      options: options.filter((opt) => opt !== ""),
      correctOption: options[correctOptionIndex],
    };

    if (editingIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex] = newQuestion;
      setQuestions(updatedQuestions);
    } else {
      setQuestions([...questions, newQuestion]);
    }
    handleCloseModal();
  };

  const handleEditQuestion = (index) => {
    const questionToEdit = questions[index];
    setQuestionText(questionToEdit.question);
    setOptions(questionToEdit.options);
    setCorrectOptionIndex(
      questionToEdit.options.indexOf(questionToEdit.correctOption)
    );
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const confirm = () => {
    setMethod(7);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="bg-purple-50 flex flex-col min-h-screen">
      <div className="flex justify-between items-center p-4">
        <button
          className="text-purple-700 w-20 h-10 rounded-md transition-colors mt-10 ml-10 flex justify-center items-center opacity-70 hover:opacity-100"
          onClick={() => setMethod(0)}
        >
          <ArrowBackOutlinedIcon />
          <h1 className="ml-1 font-rubik font-bold">Back</h1>
        </button>
      </div>

      <div className="flex flex-col justify-center items-center p-8">
        {questions?.length === 0 ? (
          <>
            <h1 className="text-3xl font-rubik font-bold flex items-center border-b-4 pb-4 w-2/3 border-purple-400 rounded">
              <span className="text-center w-full">
                Create Quizzes Manually
              </span>
            </h1>
            <h2 className="font-roboto font-semibold text-purple-900 text-center mb-6 w-2/3 p-8">
              Transform any idea into an engaging quiz! You can create
              interactive questions manually. Make learning more interactive and
              engaging with quizzes that keep your audience interested
              throughout.
            </h2>
            <button
              onClick={handleAddQuestionClick}
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300 mt-6"
            >
              Add Question
            </button>
          </>
        ) : (
          <ul className="list-disc list-inside mt-6 w-2/3 p-6">
            {questions?.map((q, index) => (
              <li
                key={index}
                className="mb-4 flex flex-col bg-purple-100 rounded-md p-4 transition-transform transform hover:scale-105 cursor-pointer"
              >
                <span className="text-purple-700 font-semibold">
                  {q.question}
                </span>
                <div className="mt-2">
                  {q.options?.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center">
                      <span className="mr-2">
                        {optIndex === q.options.indexOf(q.correctOption)
                          ? "✔️"
                          : "⚪"}
                      </span>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
                <span className="mt-2 text-green-500 font-medium">
                  Correct: {q.correctOption}
                </span>
                <div className="flex space-x-4 mt-2 w-full justify-end">
                  <button
                    onClick={() => handleEditQuestion(index)}
                    className="text-blue-600 hover:underline flex items-center pr-5"
                  >
                    <EditIcon
                      className="mr-1 hover:scale-110"
                      fontSize="medium"
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(index)}
                    className="text-red-600 hover:underline flex items-center pr-10"
                  >
                    <DeleteIcon
                      className="mr-1 hover:scale-110"
                      fontSize="medium"
                    />
                  </button>
                </div>
              </li>
            ))}
            <div className="flex flex-row justify-between w-full">
              <button
                onClick={handleAddQuestionClick}
                className="bg-purple-600 flex flex-row text-center font-semibold text-white px-6 py-3 rounded-md hover:bg-purple-700 transition duration-300 mt-6"
              >
                <h3>Add Question</h3>
                <AddCircleOutlineOutlinedIcon className="ml-3" />
              </button>
              {questions?.length > 0 && (
                <button
                  onClick={confirm}
                  className="bg-green-500 text-center font-semibold flex flex-row text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 mt-6"
                >
                  <h3>Continue</h3>
                  <SendIcon className="ml-3" />
                </button>
              )}
            </div>
          </ul>
        )}
      </div>

      {/* Modal for Adding Questions */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4 text-purple-700">
              Add Question
            </h2>
            <label
              htmlFor="question-input"
              className="mb-2 text-sm font-medium text-purple-600"
            >
              Question
            </label>
            <input
              type="text"
              id="question-input"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="block w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your question"
              required
            />
            <div className="flex flex-col mb-4">
              {options?.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="radio"
                    checked={correctOptionIndex === index}
                    onChange={() => setCorrectOptionIndex(index)}
                    className="ml-3 h-5 w-5 text-purple-600 focus:ring-purple-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 mr-2"
              >
                Close
              </button>
              <button
                onClick={handleSaveQuestion}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                {editingIndex !== null ? "Update Question" : "Save Question"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Manual;
