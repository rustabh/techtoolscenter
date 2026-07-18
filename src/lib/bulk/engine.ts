"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type ItemStatus = "queued" | "processing" | "done" | "failed" | "canceled";

export interface BulkItem {
  id: string;
  file: File;
  path: string; // relative path (folder structure preserved)
  status: ItemStatus;
  outBlob?: Blob;
  outName?: string;
  error?: string;
}

export interface ProcessResult {
  blob: Blob;
  name: string;
}

/** Reusable bulk queue — sequential, CPU-friendly, with pause/resume/cancel/retry,
 *  live progress, ETA and completed/failed tallies. Works for any file task. */
export function useBulkQueue(process: (file: File, index: number) => Promise<ProcessResult>) {
  const [items, setItems] = useState<BulkItem[]>([]);
  const itemsRef = useRef<BulkItem[]>([]);
  useEffect(() => { itemsRef.current = items; }, [items]);

  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const canceledRef = useRef(false);
  const timesRef = useRef<number[]>([]);
  const [eta, setEta] = useState<number | null>(null);

  const patch = (id: string, p: Partial<BulkItem>) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...p } : it)));

  const add = useCallback((files: File[]) => {
    const next = files.map((f) => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2)}`,
      file: f,
      path: (f as File & { webkitRelativePath?: string }).webkitRelativePath || f.name,
      status: "queued" as ItemStatus,
    }));
    setItems((prev) => [...prev, ...next]);
  }, []);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const run = useCallback(async () => {
    if (running) return;
    setRunning(true);
    canceledRef.current = false;
    pausedRef.current = false;
    setPaused(false);
    timesRef.current = [];
    let index = 0;

    for (;;) {
      const next = itemsRef.current.find((i) => i.status === "queued");
      if (!next || canceledRef.current) break;
      while (pausedRef.current && !canceledRef.current) await sleep(150);
      if (canceledRef.current) break;

      patch(next.id, { status: "processing" });
      const t0 = performance.now();
      try {
        const res = await process(next.file, index);
        patch(next.id, { status: "done", outBlob: res.blob, outName: res.name });
      } catch (e) {
        patch(next.id, { status: "failed", error: (e as Error)?.message || "Failed" });
      }
      timesRef.current.push(performance.now() - t0);
      index++;
      await sleep(0); // let React commit before finding the next item

      const remaining = itemsRef.current.filter((i) => i.status === "queued").length;
      const avg = timesRef.current.reduce((a, b) => a + b, 0) / Math.max(1, timesRef.current.length);
      setEta(remaining > 0 ? Math.round((avg * remaining) / 1000) : null);
    }

    setRunning(false);
    setEta(null);
  }, [running, process]);

  const pause = useCallback(() => { pausedRef.current = true; setPaused(true); }, []);
  const resume = useCallback(() => { pausedRef.current = false; setPaused(false); }, []);
  const cancel = useCallback(() => {
    canceledRef.current = true;
    pausedRef.current = false;
    setPaused(false);
    setItems((prev) => prev.map((i) => (i.status === "queued" || i.status === "processing" ? { ...i, status: "canceled" } : i)));
  }, []);
  const retryFailed = useCallback(() => {
    setItems((prev) => prev.map((i) => (i.status === "failed" || i.status === "canceled" ? { ...i, status: "queued", error: undefined } : i)));
  }, []);
  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => { setItems([]); setEta(null); }, []);

  const stats = useMemo(() => {
    const total = items.length;
    const done = items.filter((i) => i.status === "done").length;
    const failed = items.filter((i) => i.status === "failed").length;
    const canceled = items.filter((i) => i.status === "canceled").length;
    const processed = done + failed + canceled;
    return { total, done, failed, canceled, processed, percent: total ? Math.round((processed / total) * 100) : 0 };
  }, [items]);

  return { items, running, paused, eta, stats, add, run, pause, resume, cancel, retryFailed, remove, clear };
}
