import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useFlowTimer } from "../hooks/useFlowTimer";

export const FocusContext = createContext();

export const FocusProvider = ({ children }) => {
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
  const [isFocusMode, setIsFocusMode] = useState(true);

  // Usando useFlowTimer - solo para Focus Mode (cuenta hacia arriba)
  const {
    seconds,
    setSeconds,
    isActive,
    setIsActive,
    startTimer,
    stopTimer: stopTimerHook,
    resetTimer,
  } = useFlowTimer();

  // Estado separado para Break Mode countdown
  const [breakTimeLeft, setBreakTimeLeft] = useState(0);
  const breakSavedRef = useRef(false);
  const taskNameForBreakRef = useRef(""); // Guardar el nombre de la tarea para la sesión Break

  // Persistencia solo para proyectos
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // Persistencia para taskLogs (sesiones de trabajo)
  useEffect(() => {
    localStorage.setItem("taskLogs", JSON.stringify(taskLogs));
  }, [taskLogs]);

  // Efecto para el countdown del Break Mode
  useEffect(() => {
    if (!isFocusMode && isActive && breakTimeLeft > 0) {
      const timer = setTimeout(() => {
        setBreakTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (
      !isFocusMode &&
      isActive &&
      breakTimeLeft === 0 &&
      !breakSavedRef.current
    ) {
      // Break completó automáticamente
      breakSavedRef.current = true;

      // Guardar sesión Break con el nombre de tarea guardado
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
          taskName: taskNameForBreakRef.current || "Recovery Break",
          duration: calculatedBreakTimeRef.current,
          time: timestamp,
          mode: "Break",
        };

        if (projectIndex !== -1) {
          const updatedProject = { ...newLogs[projectIndex] };
          updatedProject.sessions = [sessionEntry, ...updatedProject.sessions];
          newLogs[projectIndex] = updatedProject;
          return newLogs;
        } else {
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

      setIsFocusMode(true);
      setBreakTimeLeft(0);
      setSeconds(0);
      stopTimerHook();
    }
  }, [
    isFocusMode,
    isActive,
    breakTimeLeft,
    stopTimerHook,
    currentProject,
    setSeconds,
  ]);

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

  // Guardar sesión - versión mejorada
  const saveSession = useCallback(
    (durationInSeconds, mode) => {
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
          mode: mode,
        };

        if (projectIndex !== -1) {
          const updatedProject = { ...newLogs[projectIndex] };
          updatedProject.sessions = [sessionEntry, ...updatedProject.sessions];
          newLogs[projectIndex] = updatedProject;
          return newLogs;
        } else {
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

      // Limpia tarea después de Focus
      if (mode === "Focus") {
        setCurrentTask("");
      }
    },
    [currentProject, currentTask],
  );

  // Ref para rastrear el nombre de la tarea de la sesión actual
  const currentTaskRef = useRef("");

  // Asegurar que taskRef siempre tenga el nombre actual
  useEffect(() => {
    currentTaskRef.current = currentTask;
  }, [currentTask]);

  // Ref para rastrear breakTime calculado
  const calculatedBreakTimeRef = useRef(0);

  // Detener Focus e iniciar Break automáticamente
  const stopSession = useCallback(() => {
    if (seconds > 0 && isFocusMode) {
      // 1. Guardar sesión Focus
      saveSession(seconds, "Focus");

      // 2. Guardar el nombre de la tarea para la sesión Break
      taskNameForBreakRef.current = currentTask || "Focus Session";

      // 3. Calcular break (duration / 5)
      calculatedBreakTimeRef.current = Math.ceil(seconds / 5);

      // 4. Cambiar a Break Mode
      setIsFocusMode(false);
      setBreakTimeLeft(calculatedBreakTimeRef.current);
      breakSavedRef.current = false;

      // 5. Resetear Focus timer y segundos
      stopTimerHook();
      setSeconds(0);

      // 6. Limpiar tarea DESPUÉS de guardar
      setCurrentTask("");

      // 7. Iniciar automáticamente el break (debe ser DESPUÉS de stopTimerHook)
      setIsActive(true);
    } else if (!isFocusMode && isActive) {
      // Usuario presiona Stop durante el Break
      const breakDuration = calculatedBreakTimeRef.current - breakTimeLeft;
      if (breakDuration > 0) {
        // Guardar manualmente la sesión Break si el usuario presiona Stop
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
            taskName: taskNameForBreakRef.current || "Recovery Break",
            duration: breakDuration,
            time: timestamp,
            mode: "Break",
          };

          if (projectIndex !== -1) {
            const updatedProject = { ...newLogs[projectIndex] };
            updatedProject.sessions = [
              sessionEntry,
              ...updatedProject.sessions,
            ];
            newLogs[projectIndex] = updatedProject;
            return newLogs;
          } else {
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
      }
      breakSavedRef.current = true;

      // Volver a Focus
      setIsFocusMode(true);
      setBreakTimeLeft(0);
      setSeconds(0);
      setIsActive(false);
    } else if (!isFocusMode && !isActive) {
      // Break completó pero usuario presiona Stop
      setIsFocusMode(true);
      setBreakTimeLeft(0);
      setSeconds(0);
      breakSavedRef.current = false;
    }
  }, [
    seconds,
    isFocusMode,
    isActive,
    saveSession,
    stopTimerHook,
    setSeconds,
    setIsActive,
    currentProject,
    currentTask,
  ]);

  // Display time - mostrar breakTimeLeft en Break mode, seconds en Focus
  const displaySeconds = isFocusMode ? seconds : breakTimeLeft;

  return (
    <FocusContext.Provider
      value={{
        // Proyectos
        projects,
        setProjects,
        addProject,
        currentProject,
        setCurrentProject,

        // Tareas
        currentTask,
        setCurrentTask,

        // Log diario
        taskLogs,
        saveSession,

        // Timer
        seconds: displaySeconds,
        setSeconds: isFocusMode ? setSeconds : setBreakTimeLeft,
        isActive,
        setIsActive,
        startTimer,
        stopSession,
        resetTimer,

        // Modo
        isFocusMode,
        setIsFocusMode,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};
