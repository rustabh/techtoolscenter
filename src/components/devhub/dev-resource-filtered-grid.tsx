"use client";

import { useMemo, useState } from "react";
import { ResourceCard } from "@/components/devhub/resource-card";
import type { DevResource, PricingModel } from "@/lib/devhub/types";
import { cn } from "@/lib/utils";

const FILTERS: Array<PricingModel | "All"> = ["All", "Free", "Freemium", "Paid"];

export function DevResourceFilteredGrid({ resources }: { resources: DevResource[] }) {
  const [filter, setFilter] = useState<PricingModel | "All">("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: resources.length };
    for (const r of resources) c[r.pricing] = (c[r.pricing] ?? 0) + 1;
    return c;
  }, [resources]);

  const filtered = filter === "All" ? resources : resources.filter((r) => r.pricing === filter);

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
          {filtered.map((r) => <ResourceCard key={r.slug} resource={r} />)}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No {filter.toLowerCase()} resources in this category yet.
        </p>
      )}
    </div>
  );
}
