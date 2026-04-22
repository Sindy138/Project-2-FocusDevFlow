import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { useFlowTimer } from "../hooks/useFlowTimer";

export const FocusContext = createContext();

const API_URL = "http://localhost:3001";

export const FocusProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentTask, setCurrentTask] = useState("");
  const [isFocusMode, setIsFocusMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
  const taskNameForBreakRef = useRef("");
  const calculatedBreakTimeRef = useRef(0);
  const currentTaskRef = useRef("");

  // Cargar proyectos desde la API al iniciar
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/projects`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error("Error loading projects:", response.status);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Asegurar que currentTaskRef siempre tenga el nombre actual
  useEffect(() => {
    currentTaskRef.current = currentTask;
  }, [currentTask]);

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

      // Guardar sesión Break
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (currentProject) {
        saveSessionToAPI("Break", calculatedBreakTimeRef.current, timestamp);
      }

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
    setSeconds,
    currentProject,
  ]);

  // Crear nuevo proyecto
  const addProject = async (projectName) => {
    const newProject = {
      id: crypto.randomUUID(),
      name: projectName,
      completed: false,
      createdAt: new Date().toISOString(),
      sessions: [],
    };

    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const savedProject = await response.json();
        setProjects([...projects, savedProject]);
        setCurrentProject(savedProject);
      } else {
        console.error("Error creating project:", response.status);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Guardar sesión en la API
  const saveSessionToAPI = useCallback(
    async (mode, duration, timestamp) => {
      if (!currentProject || duration <= 0) return;

      const sessionEntry = {
        id: crypto.randomUUID(),
        taskName:
          mode === "Break"
            ? taskNameForBreakRef.current || "Recovery Break"
            : currentTask || "Untitled Task",
        duration: duration,
        time: timestamp,
        mode: mode,
      };

      try {
        const updatedProject = {
          ...currentProject,
          sessions: [sessionEntry, ...currentProject.sessions],
        };

        const response = await fetch(
          `${API_URL}/projects/${currentProject.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProject),
          },
        );

        if (response.ok) {
          const savedProject = await response.json();
          // Actualizar proyecto en el estado local
          setProjects((prevProjects) =>
            prevProjects.map((p) =>
              p.id === savedProject.id ? savedProject : p,
            ),
          );
          setCurrentProject(savedProject);
        } else {
          console.error("Error saving session:", response.status);
        }
      } catch (error) {
        console.error("Error saving session:", error);
      }

      // Limpiar tarea después de Focus
      if (mode === "Focus") {
        setCurrentTask("");
      }
    },
    [currentProject, currentTask],
  );

  // Detener Focus e iniciar Break automáticamente
  const stopSession = useCallback(() => {
    if (seconds > 0 && isFocusMode) {
      // Obtener timestamp
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // 1. Guardar sesión Focus
      saveSessionToAPI("Focus", seconds, timestamp);

      // 2. Guardar el nombre de la tarea para la sesión Break
      taskNameForBreakRef.current = currentTask || "Focus Session";

      // 3. Calcular break (duration / 5)
      calculatedBreakTimeRef.current = Math.ceil(seconds / 5);

      // 4. Cambiar a Break Mode
      setIsFocusMode(false);
      setBreakTimeLeft(calculatedBreakTimeRef.current);
      breakSavedRef.current = false;

      // 5. Resetear Focus timer
      stopTimerHook();
      setSeconds(0);

      // 6. Limpiar tarea
      setCurrentTask("");

      // 7. Iniciar automáticamente el break
      setIsActive(true);
    } else if (!isFocusMode && isActive) {
      // Usuario presiona Stop durante el Break
      const breakDuration = calculatedBreakTimeRef.current - breakTimeLeft;

      if (breakDuration > 0) {
        const timestamp = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        saveSessionToAPI("Break", breakDuration, timestamp);
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
    saveSessionToAPI,
    stopTimerHook,
    setSeconds,
    setIsActive,
    currentTask,
  ]);

  // Display time - mostrar breakTimeLeft en Break mode, seconds en Focus
  const displaySeconds = isFocusMode ? seconds : breakTimeLeft;

  // Completar proyecto
  const completeProject = async (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    try {
      const updatedProject = { ...project, completed: true };
      const response = await fetch(`${API_URL}/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      });

      if (response.ok) {
        const savedProject = await response.json();
        setProjects((prevProjects) =>
          prevProjects.map((p) => (p.id === projectId ? savedProject : p)),
        );
        if (currentProject?.id === projectId) {
          setCurrentProject(null);
        }
      } else {
        console.error("Error completing project:", response.status);
      }
    } catch (error) {
      console.error("Error completing project:", error);
    }
  };

  return (
    <FocusContext.Provider
      value={{
        // Proyectos
        projects,
        setProjects,
        addProject,
        completeProject,
        currentProject,
        setCurrentProject,

        // Tareas
        currentTask,
        setCurrentTask,

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

        // Estado de carga
        isLoading,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};
