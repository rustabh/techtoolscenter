"use client";

import { useCallback, useEffect, useState } from "react";

const FAV_KEY = "ttc:devhub-favorites";
const EVT = "ttc:devhub-favorites-change";

function read(): string[] {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(value: string[]) {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(value));
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* storage unavailable */
  }
}

export function useDevHubFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setFavorites(read());
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
    const current = read();
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [slug, ...current];
    write(next);
  }, []);

  return { favorites, ready, toggleFavorite, isFavorite: (slug: string) => favorites.includes(slug) };
}
