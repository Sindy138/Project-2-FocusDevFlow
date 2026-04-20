import { createContext, useState, useEffect } from "react";

export const FocusContext = createContext();

export const FocusProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  // El Daily Log de la Home empieza vacío cada vez que abres la app (no localStorage)
  const [taskLogs, setTaskLogs] = useState([]);

  const [currentProject, setCurrentProject] = useState(null);
  const [currentTask, setCurrentTask] = useState("");
  const [isFocusMode, setIsFocusMode] = useState(true);

  // Persistencia solo para proyectos y el historial definitivo (db)
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (projectName) => {
    const newProject = {
      id: crypto.randomUUID(),
      name: projectName,
      tasksCount: 0,
      completed: false,
    };
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
  };

  const saveSession = (durationInSeconds) => {
    if (durationInSeconds <= 0) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const projectId = currentProject?.id || "default";

    setTaskLogs((prevLogs) => {
      const newLogs = [...prevLogs];
      const projectIndex = newLogs.findIndex(
        (log) => log.projectId === projectId,
      );

      const sessionEntry = {
        id: crypto.randomUUID(),
        taskName: currentTask || "Untitled Task",
        duration: durationInSeconds,
        time: timestamp,
        mode: isFocusMode ? "Focus" : "Break",
      };

      if (projectIndex !== -1) {
        // Si el proyecto ya tiene tarjeta en el log, añadimos la tarea debajo
        const updatedProject = { ...newLogs[projectIndex] };
        updatedProject.sessions = [sessionEntry, ...updatedProject.sessions];
        newLogs[projectIndex] = updatedProject;
        return newLogs;
      } else {
        // Si es el primero, creamos la tarjeta
        return [
          {
            projectId,
            projectName: currentProject?.name || "No Project",
            sessions: [sessionEntry],
          },
          ...prevLogs,
        ];
      }
    });

    // IMPORTANTE: Limpiamos el input de la tarea
    setCurrentTask("");
  };

  return (
    <FocusContext.Provider
      value={{
        projects,
        taskLogs,
        currentProject,
        setCurrentProject,
        currentTask,
        setCurrentTask,
        isFocusMode,
        setIsFocusMode,
        addProject,
        saveSession,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};
