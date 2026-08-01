"use client";

import { useMemo, useState } from "react";
import { AiToolCard } from "@/components/aihub/ai-tool-card";
import type { AiTool, AiPricing } from "@/lib/aihub/types";
import { cn } from "@/lib/utils";

const FILTERS: Array<AiPricing | "All"> = ["All", "Free", "Freemium", "Paid", "Enterprise"];

export function AiToolFilteredGrid({ tools }: { tools: AiTool[] }) {
  const [filter, setFilter] = useState<AiPricing | "All">("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: tools.length };
    for (const t of tools) c[t.pricing] = (c[t.pricing] ?? 0) + 1;
    return c;
  }, [tools]);

  const filtered = filter === "All" ? tools : tools.filter((t) => t.pricing === filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.filter((f) => f === "All" || counts[f] > 0).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {f} <span className="opacity-70">({counts[f] ?? 0})</span>
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => <AiToolCard key={t.slug} tool={t} />)}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No {filter.toLowerCase()} tools in this category yet.
        </p>
      )}
    </div>
  );
}
