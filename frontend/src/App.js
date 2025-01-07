import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Main";
import Examiner from "./Components/Examiner/Dashboard/Main";
import Candidate from "./Components/Candidate/Dashboard/Main";
import AuthenticationCandidate from "./Components/Authentication/CandidateAuth";
import AuthenticationExaminer from "./Components/Authentication/ExaminerAuth";
import NotFoundPage from "./Components/Homepage/NotFoundPage";
import Quiz from "./Components/Candidate/Quiz/Main";
import JoinQuizPage from "./Components/Homepage/JoinQuiz/JoinQuizPage";
import AboutPage from "./Components/Homepage/AboutPage"; // Import AboutPage
import ContactPage from "./Components/Homepage/ContactPage"; // Import ContactPage
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Homepage />} />
          <Route path="/auth/candidate" element={<AuthenticationCandidate />} />
          <Route path="/auth/examiner" element={<AuthenticationExaminer />} />
          <Route path="/candidate/dashboard" element={<Candidate />} />
          <Route path="/candidate/quiz/:id" element={<Quiz />} />
          <Route path="/examiner/dashboard" element={<Examiner />} />
          <Route path="/join" element={<JoinQuizPage></JoinQuizPage>}></Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
