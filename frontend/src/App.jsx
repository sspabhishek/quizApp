import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PracticeQuiz from "./components/PracticeQuiz";
import CreateQuiz from "./components/Create-Quiz";
import JoinQuiz from "./components/Join-Quiz";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StartQuiz from "./components/StartQuiz";
import { ParticipantProvider } from "./services/ParticipantContext";
import Participents from "./components/ParticipantQuiz";
import QuizCreator from "./components/CreatorQuiz";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import QuizForm from "./pages/QuizForm";
import QuizPage from "./pages/QuizPage";

const App = () => {
  return (
    <ParticipantProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice-quiz" element={<PracticeQuiz />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/start-quiz/:code" element={<StartQuiz />} />
            <Route path="/join-quiz" element={<JoinQuiz />} />
            <Route path="/participants" element={<Participents />} />
            <Route path="/quiz-creator" element={<QuizCreator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-practice-quiz" element={<QuizForm />} />
            <Route path="/quizzes/:category" element={<QuizPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      <Footer />
      </Router>
    </ParticipantProvider>
  );
};

export default App;