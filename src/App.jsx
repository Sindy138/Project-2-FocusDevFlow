import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Timer from "./components/Timer";
import TimerControls from "./components/TimerControls";
import ProjectTaskManager from "./components/ProjectTaskManager";
import { useFlowTimer } from "./hooks/useFlowTimer";
import "./App.css";
import DailyLog from "./components/DailyLog";

const Home = () => {
  return (
    <div className="home-layout">
      <Timer />

      <ProjectTaskManager />

      <div className="control-section">
        <TimerControls />
        <DailyLog />
      </div>
    </div>
  );
};

const WrapUp = () => <div>Página Daily Wrap-up</div>;
const Projects = () => <div>Página de Proyectos</div>;

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wrap-up" element={<WrapUp />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
