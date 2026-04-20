import { createContext, useState, useEffect } from "react";

export const FocusContext = createContext();

export const FocusProvider = ({ children }) => {
  // --- ESTADOS GLOBALES ---
  // Cargar los datos del localStorage al arrancar, si no hay nada, usamos array vacío
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [taskLogs, setTaskLogs] = useState(() => {
    const saved = localStorage.getItem("taskLogs");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentProject, setCurrentProject] = useState(null);
  const [currentTask, setCurrentTask] = useState("");

  // --- PERSISTENCIA ---
  // Cada vez que 'projects' cambie, se guarda en el localStorage
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // Cada vez que 'taskLogs' cambie, se guarda
  useEffect(() => {
    localStorage.setItem("taskLogs", JSON.stringify(taskLogs));
  }, [taskLogs]);

  // --- FUNCIONES DE ACCIÓN ---

  const addProject = (projectName) => {
    const newProject = {
      id: Date.now().toString(),
      name: projectName,
      color: "#6366f1",
    };
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
  };

  const addLog = (logEntry) => {
    const newLog = {
      ...logEntry,
      id: Date.now().toString(),
    };
    setTaskLogs([newLog, ...taskLogs]);
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
        addProject,
        addLog,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};
