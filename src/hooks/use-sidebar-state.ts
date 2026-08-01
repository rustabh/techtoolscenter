"use client";

import { useCallback, useEffect, useState } from "react";

const COLLAPSED_KEY = "ttc:sidebar-collapsed";
const OPEN_SECTIONS_KEY = "ttc:sidebar-open-sections";

function readBool(key: string, fallback: boolean): boolean {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : raw === "1";
  } catch {
    return fallback;
  }
}

function readSections(): string[] {
  try {
    const raw = localStorage.getItem(OPEN_SECTIONS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : ["favorites"];
  } catch {
    return ["favorites"];
  }
}

export function useSidebarState() {
  const [collapsed, setCollapsedState] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(["favorites"]);

  useEffect(() => {
    setCollapsedState(readBool(COLLAPSED_KEY, true));
    setOpenSections(readSections());
    setMounted(true);
  }, []);

  const setCollapsed = useCallback((value: boolean) => {
    setCollapsedState(value);
    try {
      localStorage.setItem(COLLAPSED_KEY, value ? "1" : "0");
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggleCollapsed = useCallback(() => setCollapsed(!collapsed), [collapsed, setCollapsed]);

  const toggleSection = useCallback((id: string) => {
    setOpenSections((prev) => {
      const next = prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id];
      try {
        localStorage.setItem(OPEN_SECTIONS_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  // Ctrl+B / Cmd+B toggles the sidebar globally.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        const target = e.target as HTMLElement | null;
        if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
        e.preventDefault();
        setCollapsedState((prev) => {
          const next = !prev;
          try {
            localStorage.setItem(COLLAPSED_KEY, next ? "1" : "0");
          } catch {
            /* storage unavailable */
          }
          return next;
        });
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return { mounted, collapsed, setCollapsed, toggleCollapsed, mobileOpen, setMobileOpen, openSections, toggleSection };
}
