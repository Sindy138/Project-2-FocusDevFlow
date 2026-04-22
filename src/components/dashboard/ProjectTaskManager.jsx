import { useContext, useState } from "react";
import { FocusContext } from "../../context/FocusContext";
import { FiPlus, FiFolder } from "react-icons/fi";
import "./ProjectTaskManager.css";

const ProjectTaskManager = () => {
  const {
    projects,
    addProject,
    currentProject,
    setCurrentProject,
    currentTask,
    setCurrentTask,
  } = useContext(FocusContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [showNewProjectInput, setShowNewProjectInput] = useState(false);

  // Filtrar solo proyectos activos (no completados)
  const activeProjects = projects.filter((proj) => !proj.completed);

  // --- FUNCIONES DE MANEJO ---
  const handleCreateProject = async () => {
    if (newProjectName.trim()) {
      await addProject(newProjectName);
      setNewProjectName("");
      setShowNewProjectInput(false);
      setShowDropdown(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateProject();
    } else if (e.key === "Escape") {
      setShowNewProjectInput(false);
      setNewProjectName("");
    }
  };

  return (
    <div className="project-manager-container">
      {/* 1. LÓGICA: ¿Hay proyectos activos creados? */}
      {activeProjects.length === 0 ? (
        <div className="create-first-project">
          {!showNewProjectInput ? (
            <button
              className="btn-create"
              onClick={() => setShowNewProjectInput(true)}
            >
              <FiPlus /> Create project
            </button>
          ) : (
            <div className="new-project-input-group">
              <input
                type="text"
                placeholder="Project name..."
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
                className="new-project-input"
              />
              <button
                className="btn-create-confirm"
                onClick={handleCreateProject}
              >
                Create
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="selector-group">
          <div className="dropdown-container">
            <button
              className="btn-choose"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FiFolder />{" "}
              {currentProject ? currentProject.name : "Choose project"}
            </button>

            {showDropdown && (
              <ul className="project-dropdown">
                {activeProjects.map((proj) => (
                  <li
                    key={proj.id}
                    onClick={() => {
                      setCurrentProject(proj);
                      setShowDropdown(false);
                    }}
                  >
                    {proj.name}
                  </li>
                ))}
                <li
                  className="add-new-option"
                  onClick={() => setShowNewProjectInput(true)}
                >
                  + New Project
                </li>
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Input para nuevo proyecto (cuando está en la lista) */}
      {showNewProjectInput && activeProjects.length > 0 && (
        <div className="new-project-input-group">
          <input
            type="text"
            placeholder="Project name..."
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
            className="new-project-input"
          />
          <button className="btn-create-confirm" onClick={handleCreateProject}>
            Create
          </button>
        </div>
      )}

      {/* 2. INPUT DE TAREA: Siempre visible si ya hay un proyecto seleccionado */}
      {currentProject && (
        <div className="task-input-container">
          <input
            type="text"
            placeholder="What are you focusing on?"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            className="task-input"
          />
        </div>
      )}
    </div>
  );
};

export default ProjectTaskManager;
