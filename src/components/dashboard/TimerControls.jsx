import { useContext } from "react";
import { FocusContext } from "../../context/FocusContext";
import { FiPlay, FiSquare } from "react-icons/fi";
import "./TimerControls.css";

const TimerControls = () => {
  const { isActive, stopSession, currentProject, isFocusMode, startTimer } =
    useContext(FocusContext);

  const handleStart = () => {
    if (!currentProject) {
      alert("Please select a project first!");
      return;
    }
    startTimer();
  };

  return (
    <div className="timer-controls-container">
      {!isActive ? (
        <button className="btn-start" onClick={handleStart}>
          <FiPlay size={24} /> Start
        </button>
      ) : (
        <button className="btn-stop" onClick={stopSession}>
          <FiSquare size={24} /> Stop
        </button>
      )}
    </div>
  );
};

export default TimerControls;
