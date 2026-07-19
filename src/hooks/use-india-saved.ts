"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "ttc:india-saved";
const EVENT = "ttc:india-saved-change";

export interface SavedEntry {
  slug: string;
  savedAt: number;
  checked: string[]; // document strings the user has ticked off
}

type Store = Record<string, SavedEntry>;

function read(): Store {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") as Store;
  } catch {
    return {};
  }
}

function write(store: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* ignore */
  }
}

/**
 * localStorage-backed "My Documents" store — lets a visitor save India
 * Services and tick off the documents they've collected. No backend, no login.
 */
export function useIndiaSaved() {
  const [store, setStore] = useState<Store>({});

  useEffect(() => {
    setStore(read());
    const sync = () => setStore(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isSaved = useCallback((slug: string) => !!store[slug], [store]);

  const toggleSave = useCallback((slug: string) => {
    const s = read();
    if (s[slug]) {
      delete s[slug];
    } else {
      s[slug] = { slug, savedAt: Date.now(), checked: [] };
    }
    write(s);
  }, []);

  const toggleDoc = useCallback((slug: string, doc: string) => {
    const s = read();
    const entry = s[slug] ?? { slug, savedAt: Date.now(), checked: [] };
    entry.checked = entry.checked.includes(doc)
      ? entry.checked.filter((d) => d !== doc)
      : [...entry.checked, doc];
    s[slug] = entry;
    write(s);
  }, []);

  const remove = useCallback((slug: string) => {
    const s = read();
    delete s[slug];
    write(s);
  }, []);

  const savedSlugs = Object.values(store)
    .sort((a, b) => b.savedAt - a.savedAt)
    .map((e) => e.slug);

  return { store, savedSlugs, isSaved, toggleSave, toggleDoc, remove };
}
