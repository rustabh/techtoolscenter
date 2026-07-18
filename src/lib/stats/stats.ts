"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Live statistics engine — 100% real, zero fake numbers.
 *
 * TechToolsCenter is a static, privacy-first site with no backend, so the only
 * honest usage data available is what actually happens in this browser. Every
 * counter here is incremented by a real user action (a real compression, a real
 * download, a real QR generated…). Nothing is seeded or invented, and any metric
 * that is still 0 is hidden by the UI rather than shown as a fake value.
 */

export type CounterKey =
  | "filesProcessed"
  | "imagesOptimized"
  | "pdfsConverted"
  | "qrCodes"
  | "calculations"
  | "conversions"
  | "downloads";

interface StatsData {
  counters: Record<CounterKey, number>;
  tools: Record<string, number>; // slug -> open count
  timeSum: number; // ms
  timeCount: number;
  events: { d: string; k: CounterKey }[]; // per-action log (day + kind)
  visitDays: string[]; // distinct YYYY-MM-DD this browser was active
  firstSeen?: string;
}

const KEY = "ttc:stats";
const EVT = "ttc:stats-change";
const EVENT_CAP = 3000;

const EMPTY: StatsData = {
  counters: { filesProcessed: 0, imagesOptimized: 0, pdfsConverted: 0, qrCodes: 0, calculations: 0, conversions: 0, downloads: 0 },
  tools: {},
  timeSum: 0,
  timeCount: 0,
  events: [],
  visitDays: [],
};

function read(): StatsData {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY, counters: { ...EMPTY.counters }, tools: {}, events: [], visitDays: [] };
    const parsed = JSON.parse(raw) as Partial<StatsData>;
    return {
      counters: { ...EMPTY.counters, ...(parsed.counters ?? {}) },
      tools: parsed.tools ?? {},
      timeSum: parsed.timeSum ?? 0,
      timeCount: parsed.timeCount ?? 0,
      events: parsed.events ?? [],
      visitDays: parsed.visitDays ?? [],
      firstSeen: parsed.firstSeen,
    };
  } catch {
    return { ...EMPTY, counters: { ...EMPTY.counters }, tools: {}, events: [], visitDays: [] };
  }
}

function write(data: StatsData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* storage unavailable */
  }
}

const today = () => new Date().toISOString().slice(0, 10);

/** Increment one or more counters for a single real action. */
export function track(keys: CounterKey | CounterKey[], timeMs?: number) {
  const list = Array.isArray(keys) ? keys : [keys];
  const d = read();
  const day = today();
  for (const k of list) {
    d.counters[k] = (d.counters[k] ?? 0) + 1;
    d.events.push({ d: day, k });
  }
  if (d.events.length > EVENT_CAP) d.events = d.events.slice(-EVENT_CAP);
  if (typeof timeMs === "number" && timeMs > 0) {
    d.timeSum += timeMs;
    d.timeCount += 1;
  }
  if (!d.firstSeen) d.firstSeen = day;
  write(d);
}

/** Count a real tool open (drives "Most used tool"). */
export function trackTool(slug: string) {
  const d = read();
  d.tools[slug] = (d.tools[slug] ?? 0) + 1;
  if (!d.firstSeen) d.firstSeen = today();
  write(d);
}

/** Record that this browser was active today (drives active-days metrics). */
export function recordVisit() {
  const d = read();
  const day = today();
  if (!d.visitDays.includes(day)) {
    d.visitDays = [...d.visitDays, day].slice(-370);
    if (!d.firstSeen) d.firstSeen = day;
    write(d);
  }
}

export interface AggregatedStats {
  counters: Record<CounterKey, number>;
  total: number;
  mostUsedTool: { slug: string; count: number } | null;
  topTools: { slug: string; count: number }[];
  avgMs: number | null;
  activeDaysThisMonth: number;
  returning: boolean;
  perDay: { day: string; count: number }[];
  visitDays: string[];
}

function aggregate(d: StatsData): AggregatedStats {
  const total = Object.values(d.counters).reduce((a, b) => a + b, 0);
  const toolEntries = Object.entries(d.tools).sort((a, b) => b[1] - a[1]);
  const mostUsedTool = toolEntries.length ? { slug: toolEntries[0][0], count: toolEntries[0][1] } : null;
  const topTools = toolEntries.slice(0, 8).map(([slug, count]) => ({ slug, count }));
  const avgMs = d.timeCount > 0 ? Math.round(d.timeSum / d.timeCount) : null;
  const monthAgo = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
  const activeDaysThisMonth = d.visitDays.filter((x) => x >= monthAgo).length;

  // per-day action counts for the last 30 days
  const byDay = new Map<string, number>();
  for (const e of d.events) byDay.set(e.d, (byDay.get(e.d) ?? 0) + 1);
  const perDay: { day: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const day = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    perDay.push({ day, count: byDay.get(day) ?? 0 });
  }

  return {
    counters: d.counters,
    total,
    mostUsedTool,
    topTools,
    avgMs,
    activeDaysThisMonth,
    returning: d.visitDays.length > 1,
    perDay,
    visitDays: d.visitDays,
  };
}

export function getStats(): AggregatedStats {
  return aggregate(read());
}

export function useStats() {
  const [stats, setStats] = useState<AggregatedStats>(() => aggregate(EMPTY));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setStats(aggregate(read()));
    sync();
    setReady(true);
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const refresh = useCallback(() => setStats(aggregate(read())), []);
  return { stats, ready, refresh };
}
