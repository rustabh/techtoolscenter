"use client";

import { useEffect, useRef, useState } from "react";
import { useStats, type CounterKey } from "@/lib/stats/stats";

const TILES: { key: CounterKey; emoji: string; label: string }[] = [
  { key: "filesProcessed", emoji: "🚀", label: "Files Processed" },
  { key: "imagesOptimized", emoji: "🖼️", label: "Images Optimized" },
  { key: "pdfsConverted", emoji: "📄", label: "PDFs Compressed" },
  { key: "qrCodes", emoji: "🔳", label: "QR Codes Generated" },
  { key: "conversions", emoji: "🔄", label: "Conversions Completed" },
  { key: "calculations", emoji: "🧮", label: "Calculations Performed" },
  { key: "downloads", emoji: "⬇️", label: "Downloads" },
];

/** Counts up to `value` once the element scrolls into view. */
function useCountUp(value: number) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const duration = 900;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * value));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return { ref, display };
}

function StatTile({ emoji, label, value }: { emoji: string; label: string; value: number }) {
  const { ref, display } = useCountUp(value);
  return (
    <div ref={ref} className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
      <div className="text-2xl">{emoji}</div>
      <div className="mt-2 text-3xl font-bold tabular-nums tracking-tight">{display.toLocaleString()}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function LiveStats() {
  const { stats, ready } = useStats();
  if (!ready) return null;

  // Only show tiles with real, non-zero data. Hide the whole section if empty.
  const tiles = TILES.filter((t) => (stats.counters[t.key] ?? 0) > 0);
  if (tiles.length === 0) return null;

  return (
    <section className="container-tight py-14">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Live activity</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">Your activity on TechToolsCenter</h2>
        <p className="mt-1 text-sm text-muted-foreground">Real counts of what you&apos;ve done here — tracked privately in your browser, never on a server.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {tiles.map((t) => <StatTile key={t.key} emoji={t.emoji} label={t.label} value={stats.counters[t.key]} />)}
        {stats.activeDaysThisMonth > 1 && (
          <StatTile emoji="👥" label="Active Days (30d)" value={stats.activeDaysThisMonth} />
        )}
      </div>
    </section>
  );
}
