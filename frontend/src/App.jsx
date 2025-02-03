import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PracticeQuiz from "./components/Practice-Quiz";
import CreateQuiz from "./components/Create-Quiz";
import JoinQuiz from "./components/Join-Quiz";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StartQuiz from "./components/StartQuiz";
// import Quiz from "./components/Quiz"; // Ensure this matches the actual file path
import { ParticipantProvider } from "./services/ParticipantContext";
import Participents from "./components/ParticipantQuiz";
import QuizCreator from "./components/CreatorQuiz";
import Footer from "./components/Footer";
import InsideCard from "./components/InsideCard";
import NotFound from "./components/NotFound";
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
            {/* <Route path="/quiz/:code" element={<Quiz />} /> */}
            <Route path="/participants" element={<Participents />} />
            <Route path="/quiz-creator" element={<QuizCreator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/insideCard" element={<InsideCard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ParticipantProvider>
  );
};

export default App;