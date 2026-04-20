import { useContext, useState } from "react";
import { FocusContext } from "../context/FocusContext";
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

  // --- FUNCIONES DE MANEJO ---
  const handleCreate = () => {
    const name = prompt("Nombre del nuevo proyecto:");
    if (name) addProject(name);
  };

  return (
    <div className="project-manager-container">
      {/* 1. LÓGICA: ¿Hay proyectos creados? */}
      {projects.length === 0 ? (
        <button className="btn-create" onClick={handleCreate}>
          <FiPlus /> Create project
        </button>
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
                {projects.map((proj) => (
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
                <li className="add-new-option" onClick={handleCreate}>
                  + New Project
                </li>
              </ul>
            )}
          </div>
        </div>
      )}

      {/* 2. INPUT DE TAREA: Siempre visible si ya hay un proyecto seleccionado */}
      <div className="task-input-container">
        <input
          type="text"
          placeholder="What are you focusing on?"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          className="task-input"
        />
      </div>
    </div>
  );
};

export default ProjectTaskManager;
