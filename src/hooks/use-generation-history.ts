"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

export interface HistoryEntry {
  id: string;
  value: string; // the generated output (or a joined batch)
  createdAt: number; // epoch ms
  meta?: string; // optional short context, e.g. "5 numbers, 1-100"
}

/**
 * Persists a capped, most-recent-first log of past generations for tools
 * where the output is destructively replaced on every regenerate (so the
 * previous result would otherwise be lost the moment you click again).
 * Backed by localStorage under its own key, independent of whatever the
 * tool's own input state is stored under.
 */
export function useGenerationHistory(key: string, limit = 20) {
  const { value: history, set } = useLocalStorage<HistoryEntry[]>(key, []);

  const add = useCallback(
    (value: string, meta?: string) => {
      if (!value) return;
      set((prev) => {
        if (prev[0]?.value === value) return prev; // skip exact-duplicate consecutive entries
        return [{ id: crypto.randomUUID(), value, createdAt: Date.now(), meta }, ...prev].slice(0, limit);
      });
    },
    [set, limit]
  );

  const remove = useCallback((id: string) => set((prev) => prev.filter((e) => e.id !== id)), [set]);
  const clear = useCallback(() => set([]), [set]);

  return { history, add, remove, clear };
}
