import { useContext } from "react";
import { FocusContext } from "../context/FocusContext"; // Conectamos con el almacén de datos
import { FiPlay, FiSquare } from "react-icons/fi";
import "./TimerControls.css";

const TimerControls = () => {
  // Pedimos al contexto lo que necesitamos
  const { isActive, setIsActive, stopSession, currentProject } =
    useContext(FocusContext);

  const handleStart = () => {
    if (!currentProject) {
      alert("Please select a project first!");
      return;
    }
    setIsActive(true);
  };

  return (
    <div className="timer-controls-container">
      {!isActive ? (
        <button className="btn-start" onClick={handleStart}>
          <FiPlay size={24} /> Start
        </button>
      ) : (
        <button className="btn-stop" onClick={stopSession}>
          <FiSquare size={24} /> Stop Session
        </button>
      )}
    </div>
  );
};

export default TimerControls;
