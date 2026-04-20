import { useContext, useEffect } from "react"; // Eliminamos useState porque usaremos el global
import { FocusContext } from "../context/FocusContext";
import { FiTarget, FiCoffee } from "react-icons/fi";
import "./Timer.css";

const Timer = () => {
  // Extraemos los estados globales del contexto
  const {
    currentProject,
    seconds, // Este es tu 'secondsElapsed' pero global
    setSeconds,
    isFocusMode,
    setIsFocusMode,
    setIsActive,
  } = useContext(FocusContext);

  // Estados locales cronómetro -> AHORA SON GLOBALES (Vienen del Contexto)

  // Formatear segundos a MM:SS (o HH:MM:SS si te pasas de una hora)
  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const parts = [
      mins.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ];

    if (hrs > 0) parts.unshift(hrs.toString().padStart(2, "0"));

    return parts.join(":");
  };

  return (
    <div className="timer-container">
      <div className="mode-selector">
        <button
          className={`mode-btn ${isFocusMode ? "active-focus" : ""}`}
          onClick={() => {
            setIsActive(false); // Paramos el crono al cambiar
            setIsFocusMode(true);
            setSeconds(0);
          }}
        >
          <FiTarget /> Deep Work
        </button>
        <button
          className={`mode-btn ${!isFocusMode ? "active-break" : ""}`}
          onClick={() => {
            setIsActive(false); // Paramos el crono al cambiar
            setIsFocusMode(false);
            setSeconds(0);
          }}
        >
          <FiCoffee /> Break
        </button>
      </div>

      <div className="timer-circle-wrapper">
        <div className="timer-circle">
          {/* El tiempo ahora sube */}
          <span className="time-display">{formatTime(seconds)}</span>
          <span className="current-status">
            {isFocusMode ? "Focus Flow" : "Resting Time"}
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
