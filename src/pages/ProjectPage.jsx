import { useContext, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FocusContext } from "../context/FocusContext";
import styles from "./WrapUpPage.module.css";

const ProjectPage = () => {
  const navigate = useNavigate();
  const { projects } = useContext(FocusContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [expandedProjectId, setExpandedProjectId] = useState(null);

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

  // Obtener solo proyectos completados
  const completedProjects = useMemo(() => {
    return projects.filter((proj) => proj.completed);
  }, [projects]);

  // Filtrar proyectos por búsqueda
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return completedProjects;
    }
    return completedProjects.filter((proj) =>
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [completedProjects, searchQuery]);

  // Calcular métricas para cada proyecto completado
  const projectMetrics = useMemo(() => {
    return filteredProjects.map((project) => {
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
  }, [filteredProjects]);

  return (
    <div className={styles.wrapUpContainer}>
      {completedProjects.length === 0 ? (
        <div className={styles.wrapUpEmpty}>
          <p>No completed projects yet. Complete a project to see it here!</p>
          <button className={styles.btnBackHome} onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      ) : (
        <div className={styles.wrapUpContent}>
          {/* Projects List */}
          {projectMetrics.map(
            ({
              project,
              flowTimeFormatted,
              tasksWorkedOn,
              totalSessions,
              tasks,
              totalTime,
            }) => {
              const isExpanded = expandedProjectId === project.id;
              return (
                <div
                  key={project.id}
                  className={styles.projectCard}
                  onClick={() =>
                    setExpandedProjectId(isExpanded ? null : project.id)
                  }
                >
                  {/* Card Header - Siempre visible */}
                  <div className={styles.projectCardHeader}>
                    {/* Cuando no está expandida, muestra: nombre + stats + barra + icono */}
                    {!isExpanded && (
                      <div className={styles.projectCardTitle}>
                        <h3 className={styles.projectCardName}>
                          {project.name}
                        </h3>
                        <div className={styles.projectCardStats}>
                          <span>{tasks.length} Tasks</span>
                          <span>100%</span>
                        </div>
                        <div className={styles.projectProgressBar}>
                          <div
                            className={styles.projectProgressFill}
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Cuando está expandida, solo muestra nombre e icono */}
                    {isExpanded && (
                      <h3 className={styles.projectCardName}>{project.name}</h3>
                    )}

                    <div className={styles.projectStatusIcon}>✓</div>
                  </div>

                  {/* Card Content - Solo visible cuando está expandida */}
                  {isExpanded && (
                    <div className={styles.projectCardExpanded}>
                      {/* KPI Row */}
                      <div className={styles.kpiRow}>
                        <div className={styles.kpiItem}>
                          <span className={styles.kpiItemLabel}>Flow time</span>
                          <span className={styles.kpiItemValue}>
                            {flowTimeFormatted}
                          </span>
                        </div>
                        <div className={styles.kpiItem}>
                          <span className={styles.kpiItemLabel}>
                            Tasks Worked On
                          </span>
                          <span className={styles.kpiItemValue}>
                            {tasksWorkedOn}
                          </span>
                        </div>
                        <div className={styles.kpiItem}>
                          <span className={styles.kpiItemLabel}>Sessions</span>
                          <span className={styles.kpiItemValue}>
                            {totalSessions}
                          </span>
                        </div>
                      </div>

                      {/* Tasks List */}
                      <div className={styles.tasksList}>
                        {tasks.map((task, idx) => {
                          const percentage =
                            totalTime > 0
                              ? (task.totalTime / totalTime) * 100
                              : 0;
                          return (
                            <div key={idx} className={styles.taskRowExpanded}>
                              <div className={styles.taskHeader}>
                                <span className={styles.taskName}>
                                  {task.name}
                                </span>
                                <span className={styles.taskPercentage}>
                                  {percentage.toFixed(0)}%
                                </span>
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
                    </div>
                  )}
                </div>
              );
            },
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
