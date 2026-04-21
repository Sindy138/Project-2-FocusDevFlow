import { useState, useEffect, useCallback } from "react";

/**
 * useFlowTimer Hook
 * Maneja la lógica del cronómetro para sesiones de focus/break
 *
 * Características:
 * - Timer persiste a través de navegación (cuando está en contexto global)
 * - Se detiene solo cuando se llama a stopTimer()
 * - Retorna segundos, estado activo, y funciones de control
 */
export const useFlowTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Timer loop - se ejecuta mientras isActive sea true
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Funciones de control del timer
  const startTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  const stopTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setSeconds(0);
  }, []);

  // Retorna todo lo necesario para controlar el timer globalmente
  return {
    seconds,
    setSeconds,
    isActive,
    setIsActive,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
