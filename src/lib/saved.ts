"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Client-side "workspace" store. Everything a user creates or downloads is
 * kept privately in localStorage — no account required. Studios call
 * `saveItem` to push a project/template/QR/mockup/brand-kit into the
 * dashboard, and every download is auto-recorded via `recordDownload`.
 */
export type SavedType = "project" | "template" | "qr" | "mockup" | "brandkit" | "download";

export interface SavedItem {
  id: string;
  type: SavedType;
  title: string;
  subtitle?: string;
  thumb?: string; // small data URL preview (optional)
  href?: string; // deep link back to the tool
  ts: number;
}

const KEY = "ttc:saved";
const EVT = "ttc:saved-change";
const LIMIT = 60;

function read(): SavedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: SavedItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(items.slice(0, LIMIT)));
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* storage unavailable */
  }
}

export function saveItem(item: Omit<SavedItem, "id" | "ts"> & { id?: string }) {
  const items = read();
  const id = item.id ?? Math.random().toString(36).slice(2);
  const next: SavedItem = { ...item, id, ts: Date.now() };
  write([next, ...items.filter((i) => i.id !== id)]);
  return id;
}

export function removeItem(id: string) {
  write(read().filter((i) => i.id !== id));
}

export function clearType(type: SavedType) {
  write(read().filter((i) => i.type !== type));
}

/** Auto-called on every download so the dashboard "Downloads" tab stays live. */
export function recordDownload(filename: string, href?: string) {
  const ext = filename.includes(".") ? filename.split(".").pop()!.toUpperCase() : "FILE";
  saveItem({ type: "download", title: filename, subtitle: ext, href });
}

export function useSaved() {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setItems(read());
    sync();
    setReady(true);
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const byType = useCallback((type: SavedType) => items.filter((i) => i.type === type), [items]);

  return { items, ready, byType, save: saveItem, remove: removeItem, clear: clearType };
}
