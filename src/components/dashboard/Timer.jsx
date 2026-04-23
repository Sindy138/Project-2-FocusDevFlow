import { useContext } from "react";
import { FocusContext } from "../../context/FocusContext";
import { FiCoffee } from "react-icons/fi";
import { Brain } from "lucide-react";
import "./Timer.css";

const Timer = ({ seconds }) => {
  const { currentProject, isFocusMode } = useContext(FocusContext);

  const formatTime = (totalSeconds) => {
    const s = totalSeconds || 0;
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="timer-container">
      {/* Indicadores de modo: mouestran el modo actual activo */}
      <div className="mode-selector">
        <div className={`mode-btn ${isFocusMode ? "active-focus" : ""}`}>
          <Brain color="#ffffff" size={20} strokeWidth={1.5} /> Focus Session
        </div>
        <div className={`mode-btn ${!isFocusMode ? "active-break" : ""}`}>
          <FiCoffee /> Recovery Break
        </div>
      </div>

      <div className="timer-circle-wrapper">
        {/* El círculo cambia de color según el modo (púrpura o verde) */}
        <div className={`timer-circle ${!isFocusMode ? "break-mode" : ""}`}>
          <span className="time-display">{formatTime(seconds)}</span>
          <span className="current-status">
            {isFocusMode ? "Deep Focus" : "Recovery Break"}
          </span>

          {currentProject && (
            <span className="active-project-tag">{currentProject.name}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
