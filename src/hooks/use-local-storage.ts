"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Persist state to localStorage with an in-memory undo/redo stack.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  const past = useRef<T[]>([]);
  const future = useRef<T[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) setValue(JSON.parse(stored) as T);
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full / unavailable */
    }
  }, [key, value, hydrated]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        past.current.push(prev);
        future.current = [];
        return resolved;
      });
    },
    []
  );

  const undo = useCallback(() => {
    setValue((prev) => {
      const previous = past.current.pop();
      if (previous === undefined) return prev;
      future.current.push(prev);
      return previous;
    });
  }, []);

  const redo = useCallback(() => {
    setValue((prev) => {
      const next = future.current.pop();
      if (next === undefined) return prev;
      past.current.push(prev);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    set(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set]);

  return {
    value,
    set,
    undo,
    redo,
    reset,
    hydrated,
    canUndo: past.current.length > 0,
    canRedo: future.current.length > 0,
  };
}
