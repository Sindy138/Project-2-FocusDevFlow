import { renderHook, act } from '@testing-library/react';
import { useFlowTimer } from '../src/hooks/useFlowTimer';
import { describe, it, expect } from 'vitest';

describe('useFlowTimer Hook', () => {
  it('inicia el timer en 0 segundos', () => {
    const { result } = renderHook(() => useFlowTimer());
    
    expect(result.current.seconds).toBe(0);
    expect(result.current.isActive).toBe(false);
  });

  it('comienza a contar cuando se llama startTimer', async () => {
    const { result } = renderHook(() => useFlowTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    expect(result.current.isActive).toBe(true);
    
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    expect(result.current.seconds).toBeGreaterThanOrEqual(1);
  });

  it('detiene el contador cuando se llama stopTimer', async () => {
    const { result } = renderHook(() => useFlowTimer());
    
    act(() => {
      result.current.startTimer();
    });
    
    await new Promise(resolve => setTimeout(resolve, 1100));
    const secondsBeforeStop = result.current.seconds;
    
    act(() => {
      result.current.stopTimer();
    });
    
    expect(result.current.isActive).toBe(false);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    expect(result.current.seconds).toBe(secondsBeforeStop);
  });

  it('reinicia el timer a 0 cuando se llama resetTimer', () => {
    const { result } = renderHook(() => useFlowTimer());
    
    act(() => {
      result.current.setSeconds(10);
    });
    
    act(() => {
      result.current.resetTimer();
    });
    
    expect(result.current.seconds).toBe(0);
    expect(result.current.isActive).toBe(false);
  });
});
