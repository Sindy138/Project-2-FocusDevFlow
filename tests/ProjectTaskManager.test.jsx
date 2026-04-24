import { render, screen, fireEvent } from '@testing-library/react';
import ProjectTaskManager from '../src/components/dashboard/ProjectTaskManager';
import { FocusContext } from '../src/context/FocusContext';
import { describe, it, expect, vi } from 'vitest';

describe('ProjectTaskManager Component', () => {
  const mockAddProject = vi.fn();
  const mockSetCurrentProject = vi.fn();
  const mockSetCurrentTask = vi.fn();

  const mockContextEmpty = {
    projects: [],
    addProject: mockAddProject,
    currentProject: null,
    setCurrentProject: mockSetCurrentProject,
    currentTask: '',
    setCurrentTask: mockSetCurrentTask,
  };

  it('muestra el botón "Create project" cuando no hay proyectos', () => {
    render(
      <FocusContext.Provider value={mockContextEmpty}>
        <ProjectTaskManager />
      </FocusContext.Provider>
    );

    expect(screen.getByText(/Create project/i)).toBeInTheDocument();
  });

  it('muestra el input cuando se hace click en crear proyecto', () => {
    render(
      <FocusContext.Provider value={mockContextEmpty}>
        <ProjectTaskManager />
      </FocusContext.Provider>
    );

    const createButton = screen.getByText(/Create project/i);
    fireEvent.click(createButton);

    expect(screen.getByPlaceholderText(/Project name/i)).toBeInTheDocument();
  });

  it('filtra y muestra solo proyectos activos', () => {
    const mockContextWithProjects = {
      projects: [
        { id: 1, name: 'Proyecto Activo', completed: false },
        { id: 2, name: 'Proyecto Completado', completed: true },
      ],
      addProject: mockAddProject,
      currentProject: null,
      setCurrentProject: mockSetCurrentProject,
      currentTask: '',
      setCurrentTask: mockSetCurrentTask,
    };

    render(
      <FocusContext.Provider value={mockContextWithProjects}>
        <ProjectTaskManager />
      </FocusContext.Provider>
    );

    // Verificar que el dropdown está visible (lo que significa que hay proyectos)
    const chooseButton = screen.getByText(/Choose project/i);
    expect(chooseButton).toBeInTheDocument();
    
    // Abrir el dropdown
    fireEvent.click(chooseButton);
    
    // Ahora debe estar visible el proyecto activo
    expect(screen.getByText('Proyecto Activo')).toBeInTheDocument();
    // El proyecto completado NO debe estar visible
    expect(screen.queryByText('Proyecto Completado')).not.toBeInTheDocument();
  });
});
