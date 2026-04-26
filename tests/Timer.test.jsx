import { render, screen } from "@testing-library/react";
import Timer from "../src/components/dashboard/Timer";
import { FocusContext } from "../src/context/FocusContext";
import { describe, it, expect } from "vitest";

describe("Timer Component", () => {
  const mockContextValue = {
    currentProject: { name: "Mi Proyecto" },
    isFocusMode: true,
  };

  it("formatea 65 segundos como 01:05", () => {
    render(
      <FocusContext.Provider value={mockContextValue}>
        <Timer seconds={65} />
      </FocusContext.Provider>,
    );

    expect(screen.getByText("01:05")).toBeInTheDocument();
  });

  it("formatea 0 segundos como 00:00", () => {
    render(
      <FocusContext.Provider value={mockContextValue}>
        <Timer seconds={0} />
      </FocusContext.Provider>,
    );

    expect(screen.getByText("00:00")).toBeInTheDocument();
  });

  it('muestra "Deep Focus" cuando isFocusMode es true', () => {
    render(
      <FocusContext.Provider value={mockContextValue}>
        <Timer seconds={0} />
      </FocusContext.Provider>,
    );

    expect(screen.getByText("Deep Focus")).toBeInTheDocument();
  });

  it('muestra "Recovery Break" cuando isFocusMode es false', () => {
    const mockContextBreak = {
      currentProject: { name: "Mi Proyecto" },
      isFocusMode: false,
    };

    render(
      <FocusContext.Provider value={mockContextBreak}>
        <Timer seconds={0} />
      </FocusContext.Provider>,
    );

    // Buscar específicamente en el span.current-status
    const statusElements = screen.getAllByText("Recovery Break");
    expect(statusElements.length).toBeGreaterThan(0);
  });

  it("muestra el nombre del proyecto activo", () => {
    render(
      <FocusContext.Provider value={mockContextValue}>
        <Timer seconds={0} />
      </FocusContext.Provider>,
    );

    expect(screen.getByText("Mi Proyecto")).toBeInTheDocument();
  });
});
