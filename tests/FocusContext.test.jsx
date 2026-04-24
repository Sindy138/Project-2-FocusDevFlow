import { render, screen, waitFor } from '@testing-library/react';
import { FocusProvider, FocusContext } from '../src/context/FocusContext';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useContext } from 'react';

describe('FocusContext - localStorage Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('carga proyectos desde localStorage al iniciar', async () => {
    const testProjects = [
      { id: 1, name: 'Proyecto Guardado', completed: false },
    ];

    localStorage.setItem('focusflow_projects', JSON.stringify(testProjects));

    const TestComponent = () => {
      const { projects } = useContext(FocusContext);
      return (
        <div>
          {projects.map((proj) => (
            <span key={proj.id}>{proj.name}</span>
          ))}
        </div>
      );
    };

    render(
      <FocusProvider>
        <TestComponent />
      </FocusProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Proyecto Guardado')).toBeInTheDocument();
    });
  });

  it('inicia con un array vacío cuando no hay datos en localStorage', async () => {
    const TestComponent = () => {
      const { projects } = useContext(FocusContext);
      return <div>{projects.length === 0 ? 'Sin proyectos' : 'Con proyectos'}</div>;
    };

    render(
      <FocusProvider>
        <TestComponent />
      </FocusProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Sin proyectos')).toBeInTheDocument();
    });
  });

  it('no falla si localStorage tiene datos corruptos', async () => {
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    localStorage.setItem('focusflow_projects', 'JSON INVÁLIDO {]');

    const TestComponent = () => {
      const { projects } = useContext(FocusContext);
      return <div>Proyectos: {projects.length}</div>;
    };

    render(
      <FocusProvider>
        <TestComponent />
      </FocusProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Proyectos: 0')).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it('completa la carga (isLoading pasa a false)', async () => {
    const TestComponent = () => {
      const { isLoading } = useContext(FocusContext);
      return <div>{isLoading ? 'Cargando' : 'Listo'}</div>;
    };

    render(
      <FocusProvider>
        <TestComponent />
      </FocusProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Listo')).toBeInTheDocument();
    });
  });
});
