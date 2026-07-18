"use client";

import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { useStats } from "@/lib/stats/stats";
import { getTool } from "@/lib/tools";

/** Homepage "Most used tools" — real per-browser usage. Hidden until data exists. */
export function MostUsedTools() {
  const { stats, ready } = useStats();
  if (!ready) return null;

  const items = stats.topTools.map((t) => ({ tool: getTool(t.slug), count: t.count })).filter((x) => x.tool).slice(0, 6);
  if (items.length === 0) return null;

  return (
    <section className="container-tight py-14">
      <div className="mb-8 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Your favourites</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">Your most used tools</h2>
          <p className="mt-1 text-sm text-muted-foreground">Based on your real activity here — tracked privately in your browser.</p>
        </div>
        <Link href="/stats" className="hidden shrink-0 text-sm font-medium text-primary hover:underline sm:inline">View analytics →</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ tool, count }) => tool && (
          <Link key={tool.slug} href={`/tools/${tool.slug}`}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
            <span className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={tool.icon} className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-medium">{tool.name}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Flame className="size-3 text-primary" /> used {count}×</span>
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}
