"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, Clock, Wrench, Activity } from "lucide-react";
import { useStats } from "@/lib/stats/stats";
import { getTool } from "@/lib/tools";

const COUNTER_LABELS: Record<string, string> = {
  filesProcessed: "Files processed",
  imagesOptimized: "Images optimized",
  pdfsConverted: "PDFs compressed",
  qrCodes: "QR codes generated",
  calculations: "Calculations",
  conversions: "Conversions",
  downloads: "Downloads",
};

export function AnalyticsDashboard() {
  const { stats, ready } = useStats();

  if (!ready) return null;

  if (stats.total === 0 && (stats.mostUsedTool === null)) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center">
        <Activity className="mx-auto size-8 text-muted-foreground" />
        <p className="mt-3 font-medium">No activity yet</p>
        <p className="mt-1 text-sm text-muted-foreground">Use a few tools and your real analytics will appear here — nothing is faked or pre-filled.</p>
        <Link href="/tools" className="mt-4 inline-block rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Explore tools</Link>
      </div>
    );
  }

  const last14 = stats.perDay.slice(-14);
  const max = Math.max(1, ...last14.map((d) => d.count));
  const thisWeek = stats.perDay.slice(-7).reduce((a, b) => a + b.count, 0);
  const prevWeek = stats.perDay.slice(-14, -7).reduce((a, b) => a + b.count, 0);
  const growth = prevWeek === 0 ? (thisWeek > 0 ? 100 : 0) : Math.round(((thisWeek - prevWeek) / prevWeek) * 100);
  const monthTotal = stats.perDay.reduce((a, b) => a + b.count, 0);

  const activeCounters = Object.entries(stats.counters).filter(([, v]) => v > 0);

  return (
    <div className="space-y-8">
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Kpi label="Total actions" value={stats.total} />
        <Kpi label="This week" value={thisWeek} trend={growth} />
        <Kpi label="Last 30 days" value={monthTotal} />
        <Kpi label="Avg. processing" value={stats.avgMs != null ? `${stats.avgMs} ms` : "—"} icon={<Clock className="size-4" />} />
      </div>

      {/* Daily activity chart */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="mb-4 flex items-center gap-2 text-sm font-semibold"><Activity className="size-4 text-primary" /> Daily activity (last 14 days)</p>
        <div className="flex h-40 items-end gap-1.5">
          {last14.map((d) => (
            <div key={d.day} className="group flex flex-1 flex-col items-center justify-end gap-1">
              <div className="w-full rounded-t bg-primary/80 transition-all group-hover:bg-primary" style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count > 0 ? 4 : 0 }} title={`${d.day}: ${d.count}`} />
              <span className="text-[9px] text-muted-foreground">{d.day.slice(8)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Breakdown by type */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-4 text-sm font-semibold">Activity by type</p>
          {activeCounters.length ? (
            <div className="space-y-3">
              {activeCounters.sort((a, b) => b[1] - a[1]).map(([k, v]) => {
                const m = Math.max(...activeCounters.map(([, x]) => x));
                return (
                  <div key={k}>
                    <div className="mb-1 flex justify-between text-xs"><span>{COUNTER_LABELS[k] ?? k}</span><span className="font-semibold tabular-nums">{v}</span></div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${(v / m) * 100}%` }} /></div>
                  </div>
                );
              })}
            </div>
          ) : <p className="text-sm text-muted-foreground">No actions recorded yet.</p>}
        </div>

        {/* Top tools */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold"><Wrench className="size-4 text-primary" /> Top tools</p>
          {stats.topTools.length ? (
            <ol className="space-y-2.5">
              {stats.topTools.map((t, i) => {
                const tool = getTool(t.slug);
                return (
                  <li key={t.slug} className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2 truncate">
                      <span className="grid size-5 place-items-center rounded bg-secondary text-xs font-semibold">{i + 1}</span>
                      {tool ? <Link href={`/tools/${tool.slug}`} className="truncate hover:text-primary">{tool.name}</Link> : <span className="truncate">{t.slug}</span>}
                    </span>
                    <span className="font-semibold tabular-nums">{t.count}</span>
                  </li>
                );
              })}
            </ol>
          ) : <p className="text-sm text-muted-foreground">Open a few tools to see your top tools.</p>}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        All figures are real actions tracked privately in your browser. TechToolsCenter has no analytics server — nothing here is estimated or fabricated.
      </p>
    </div>
  );
}

function Kpi({ label, value, trend, icon }: { label: string; value: number | string; trend?: number; icon?: React.ReactNode }) {
  const TrendIcon = trend == null ? null : trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const color = trend == null ? "" : trend > 0 ? "text-emerald-600 dark:text-emerald-400" : trend < 0 ? "text-rose-600 dark:text-rose-400" : "text-muted-foreground";
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">{icon} {label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums">{typeof value === "number" ? value.toLocaleString() : value}</p>
      {TrendIcon && <p className={`mt-0.5 flex items-center gap-1 text-xs font-medium ${color}`}><TrendIcon className="size-3" /> {trend! > 0 ? "+" : ""}{trend}% vs last week</p>}
    </div>
  );
}
