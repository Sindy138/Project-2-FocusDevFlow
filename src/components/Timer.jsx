import { useContext } from "react";
import { FocusContext } from "../context/FocusContext";
import { FiTarget, FiCoffee } from "react-icons/fi";
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
      {/* Indicadores de modo: ahora no tienen onClick porque el cambio es automático */}
      <div className="mode-selector">
        <div className={`mode-btn ${isFocusMode ? "active-focus" : ""}`}>
          <FiTarget /> Deep Work
        </div>
        <div className={`mode-btn ${!isFocusMode ? "active-break" : ""}`}>
          <FiCoffee /> Break
        </div>
      </div>

      <div className="timer-circle-wrapper">
        {/* Cambiamos la clase del círculo según el modo para el color (púrpura o verde) */}
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
