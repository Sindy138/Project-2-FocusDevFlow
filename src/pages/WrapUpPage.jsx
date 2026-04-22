import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FocusContext } from "../context/FocusContext";
import styles from "./WrapUpPage.module.css";

const WrapUpPage = () => {
  const navigate = useNavigate();
  const { projects, completeProject } = useContext(FocusContext);

  // Funciones de formato
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatTaskTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  // Obtener solo proyectos en progreso (no completados)
  const activeProjects = useMemo(() => {
    return projects.filter((proj) => !proj.completed);
  }, [projects]);

  // Calcular métricas para cada proyecto
  const projectMetrics = useMemo(() => {
    return activeProjects.map((project) => {
      const sessions = project.sessions || [];

      // Calcular Flow Time (suma de todas las sesiones Focus)
      const flowTimeSeconds = sessions
        .filter((s) => s.mode === "Focus")
        .reduce((acc, s) => acc + s.duration, 0);

      // Calcular Total Time (suma de todas las sesiones)
      const totalTimeSeconds = sessions.reduce((acc, s) => acc + s.duration, 0);

      // Count de tasks únicas
      const uniqueTasks = new Set(sessions.map((s) => s.taskName)).size;

      // Count de sesiones
      const totalSessions = sessions.length;

      // Agrupar por task para mostrar tiempo individual y porcentaje
      const tasksSummary = {};
      sessions.forEach((session) => {
        if (!tasksSummary[session.taskName]) {
          tasksSummary[session.taskName] = {
            name: session.taskName,
            totalTime: 0,
            sessions: 0,
          };
        }
        tasksSummary[session.taskName].totalTime += session.duration;
        tasksSummary[session.taskName].sessions += 1;
      });

      const tasksArray = Object.values(tasksSummary);

      return {
        project,
        flowTime: flowTimeSeconds,
        flowTimeFormatted: formatTime(flowTimeSeconds),
        totalTime: totalTimeSeconds,
        tasksWorkedOn: uniqueTasks,
        totalSessions,
        tasks: tasksArray,
        sessions,
      };
    });
  }, [activeProjects]);

  const handleMarkComplete = (projectId) => {
    completeProject(projectId);
  };

  return (
    <div className={styles.wrapUpContainer}>
      {activeProjects.length === 0 ? (
        <div className={styles.wrapUpEmpty}>
          <p>No projects in progress. Create one to get started!</p>
          <button className={styles.btnBackHome} onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      ) : (
        <div className={styles.wrapUpContent}>
          {projectMetrics.map(
            ({
              project,
              flowTimeFormatted,
              tasksWorkedOn,
              totalSessions,
              tasks,
              totalTime,
            }) => (
              <div key={project.id} className={styles.wrapUpSection}>
                {/* KPI Cards */}
                <div className={styles.kpiCards}>
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiIcon}></span>
                    <div className={styles.kpiContent}>
                      <span className={styles.kpiLabel}>Flow time</span>
                      <span className={styles.kpiValue}>
                        {flowTimeFormatted}
                      </span>
                    </div>
                  </div>

                  <div className={styles.kpiCard}>
                    <span className={styles.kpiIcon}></span>
                    <div className={styles.kpiContent}>
                      <span className={styles.kpiLabel}>Tasks Worked On</span>
                      <span className={styles.kpiValue}>{tasksWorkedOn}</span>
                    </div>
                  </div>

                  <div className={styles.kpiCard}>
                    <span className={styles.kpiIcon}></span>
                    <div className={styles.kpiContent}>
                      <span className={styles.kpiLabel}>Sessions</span>
                      <span className={styles.kpiValue}>{totalSessions}</span>
                    </div>
                  </div>
                </div>

                {/* Project Tasks Card */}
                <div className={styles.projectTasksCard}>
                  <h2 className={styles.projectName}>{project.name}</h2>

                  <div className={styles.tasksList}>
                    {tasks.map((task, idx) => {
                      const percentage =
                        totalTime > 0 ? (task.totalTime / totalTime) * 100 : 0;
                      return (
                        <div key={idx} className={styles.taskRow}>
                          <div className={styles.taskHeader}>
                            <span className={styles.taskName}>{task.name}</span>
                            <span className={styles.taskTime}>
                              {formatTaskTime(task.totalTime)}
                            </span>
                          </div>
                          <div className={styles.taskPercentage}>
                            {percentage.toFixed(0)}%
                          </div>
                          <div className={styles.taskBarContainer}>
                            <div
                              className={styles.taskBar}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    className={styles.btnMarkComplete}
                    onClick={() => handleMarkComplete(project.id)}
                  >
                    ✓ Mark as completed
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default WrapUpPage;
