"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "ttc:update-bookmarks";
const EVENT = "ttc:update-bookmarks-change";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]") as string[]; } catch { return []; }
}
function write(list: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(EVENT));
  } catch { /* ignore */ }
}

/** localStorage bookmarks for Updates — no login required. */
export function useUpdateBookmarks() {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    setList(read());
    const sync = () => setList(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isBookmarked = useCallback((slug: string) => list.includes(slug), [list]);
  const toggle = useCallback((slug: string) => {
    const cur = read();
    write(cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]);
  }, []);

  return { bookmarks: list, isBookmarked, toggle };
}
