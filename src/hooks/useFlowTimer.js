import { useState, useEffect, useCallback } from "react";

export const useFlowTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

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

  // Estas funciones son las que usaremos en los componentes
  const startTimer = useCallback(() => setIsActive(true), []);

  const stopTimer = useCallback(() => setIsActive(false), []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setSeconds(0);
  }, []);

  return {
    seconds,
    setSeconds,
    isActive,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
