import { useContext } from "react";
import { FocusContext } from "../../context/FocusContext";
import { FiTarget, FiCoffee, FiClock } from "react-icons/fi";
import "./DailyLog.css";

const DailyLog = () => {
  const { currentProject } = useContext(FocusContext);

  const formatLogTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return mins > 0 ? `${mins}m` : `${secs}s`;
  };

  // Si no hay proyecto seleccionado, mostrar vacío
  if (!currentProject) {
    return (
      <div className="daily-log-container">
        <div className="log-header">
          <h3 className="log-title">
            <FiClock /> Daily log
          </h3>
          <span className="sessions-count">0 sessions</span>
        </div>
        <div className="log-list">
          <p style={{ color: "#999", textAlign: "center", padding: "2rem" }}>
            Select a project to view today's sessions
          </p>
        </div>
      </div>
    );
  }

  // Mostrar solo sesiones del proyecto seleccionado
  const sessions = currentProject.sessions || [];

  return (
    <div className="daily-log-container">
      <div className="log-header">
        <h3 className="log-title">
          <FiClock /> Daily log
        </h3>
        <span className="sessions-count">{sessions.length} sessions</span>
      </div>

      <div className="log-list">
        <div className="project-card">
          <div className="project-card-header">
            <strong>{currentProject.name}</strong>
          </div>

          <div className="sessions-list">
            {sessions.length === 0 ? (
              <p style={{ color: "#999", padding: "1rem" }}>
                No sessions yet. Start working!
              </p>
            ) : (
              sessions.map((session) => (
                <div key={session.id} className="session-row">
                  <div className="session-main">
                    {session.mode === "Focus" ? (
                      <FiTarget className="icon-focus" />
                    ) : (
                      <FiCoffee className="icon-break" />
                    )}
                    <div className="session-text">
                      <span className="session-task">{session.taskName}</span>
                      <span className="session-meta">
                        {session.time} · {formatLogTime(session.duration)}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`session-mode-tag ${session.mode?.toLowerCase()}`}
                  >
                    {session.mode}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLog;
