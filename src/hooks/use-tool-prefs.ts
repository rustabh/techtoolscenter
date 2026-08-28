"use client";

import { useCallback, useEffect, useState } from "react";

const FAV_KEY = "ttc:favorites";
const RECENT_KEY = "ttc:recent";
const EVT = "ttc:prefs-change";

function read(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(key: string, value: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* storage unavailable */
  }
}

export function useToolPrefs() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setFavorites(read(FAV_KEY));
      setRecents(read(RECENT_KEY));
    };
    sync();
    setReady(true);
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    const current = read(FAV_KEY);
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [slug, ...current];
    write(FAV_KEY, next);
  }, []);

  // Swaps a favorite with its neighbour in the saved order (-1 = move
  // earlier, 1 = move later) — a no-op at either end of the list.
  const moveFavorite = useCallback((slug: string, direction: -1 | 1) => {
    const current = read(FAV_KEY);
    const i = current.indexOf(slug);
    const j = i + direction;
    if (i === -1 || j < 0 || j >= current.length) return;
    const next = [...current];
    [next[i], next[j]] = [next[j], next[i]];
    write(FAV_KEY, next);
  }, []);

  const addRecent = useCallback((slug: string) => {
    const current = read(RECENT_KEY).filter((s) => s !== slug);
    write(RECENT_KEY, [slug, ...current].slice(0, 8));
  }, []);

  return { favorites, recents, ready, toggleFavorite, moveFavorite, addRecent, isFavorite: (s: string) => favorites.includes(s) };
}
