"use client";

import { useCallback, useEffect, useState } from "react";

const COLLAPSED_KEY = "ttc:sidebar-collapsed";
const HIDDEN_KEY = "ttc:sidebar-hidden";
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
  const [hidden, setHiddenState] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(["favorites"]);

  useEffect(() => {
    setCollapsedState(readBool(COLLAPSED_KEY, true));
    setHiddenState(readBool(HIDDEN_KEY, false));
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

  const setHidden = useCallback((value: boolean) => {
    setHiddenState(value);
    try {
      localStorage.setItem(HIDDEN_KEY, value ? "1" : "0");
    } catch {
      /* storage unavailable */
    }
    // Hiding is a distinct state from collapsing — un-hiding always brings
    // back the compact icon rail (never the full panel), same as a fresh visit.
    if (!value) setCollapsed(true);
  }, [setCollapsed]);

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

  // Ctrl+B / Cmd+B toggles the sidebar globally. If it's fully hidden, this
  // is the recovery path — it un-hides (back to the compact rail) rather
  // than toggling collapsed, since there's no rail visible to click.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        const target = e.target as HTMLElement | null;
        if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
        e.preventDefault();
        if (hidden) {
          setHidden(false);
          return;
        }
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
  }, [hidden, setHidden]);

  return { mounted, collapsed, setCollapsed, toggleCollapsed, hidden, setHidden, mobileOpen, setMobileOpen, openSections, toggleSection };
}
