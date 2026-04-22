import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FocusContext } from "../context/FocusContext";
import { FiSearch } from "react-icons/fi";
import styles from "./WrapUpPage.module.css";

const ProjectPage = () => {
  const navigate = useNavigate();
  const { projects } = useContext(FocusContext);
  const [searchQuery, setSearchQuery] = useState("");

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
          {/* Search Bar */}
          <div
            className={styles.searchContainer}
            style={{ marginBottom: "2rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                position: "relative",
              }}
            >
              <FiSearch
                style={{ position: "absolute", left: "1rem", color: "#666" }}
              />
              <input
                type="text"
                placeholder="Search projects by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 2.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                }}
              />
            </div>
            {searchQuery && filteredProjects.length === 0 && (
              <p style={{ marginTop: "1rem", color: "#999" }}>
                No projects found matching "{searchQuery}"
              </p>
            )}
          </div>

          {/* Projects List */}
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

                  <div className={styles.completedBadge}>
                    ✓ Project Completed
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
