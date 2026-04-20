import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProjectTaskManager from "./components/ProjectTaskManager";
import "./App.css";

const Home = () => {
  return (
    <div className="home-layout">
      {/* Timer (Parte Superior) */}
      <div
        className="timer-placeholder"
        style={{
          textAlign: "center",
          padding: "20px",
          border: "1px dashed #ccc",
          borderRadius: "20px",
        }}
      >
        [ Aquí irá el componente Timer.jsx ]
      </div>

      {/* Selector de Proyecto y Tarea (Parte Media) */}
      <ProjectTaskManager />

      {/* Controles y el Daily Log (Parte Inferior) */}
      <div
        className="controls-placeholder"
        style={{
          textAlign: "center",
          padding: "20px",
          border: "1px dashed #ccc",
          borderRadius: "20px",
        }}
      >
        [ Aquí irán TimerControls.jsx y DailyLog.jsx ]
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
