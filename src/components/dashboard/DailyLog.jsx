import { useContext } from "react";
import { FocusContext } from "../../context/FocusContext";
import { FiTarget, FiCoffee, FiClock } from "react-icons/fi";
import "./DailyLog.css";

const DailyLog = () => {
  const { taskLogs, projects } = useContext(FocusContext);

  // Filtrar solo taskLogs de proyectos activos (no completados)
  const filteredTaskLogs = taskLogs.filter((log) =>
    projects.some((proj) => proj.id === log.projectId && !proj.completed)
  );

  const formatLogTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    // Si hay minutos, mostramos minutos, si no, solo segundos
    return mins > 0 ? `${mins}m` : `${secs}s`;
  };

  return (
    <div className="daily-log-container">
      <div className="log-header">
        <h3 className="log-title">
          <FiClock /> Daily log
        </h3>
        <span className="sessions-count">{filteredTaskLogs.length} projects</span>
      </div>

      <div className="log-list">
        {filteredTaskLogs.map((projectGroup, index) => (
          <div
            key={`${projectGroup.projectId}-${index}`}
            className="project-card"
          >
            <div className="project-card-header">
              <strong>{projectGroup.projectName}</strong>
            </div>

            <div className="sessions-list">
              {projectGroup.sessions?.map((session) => (
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyLog;
