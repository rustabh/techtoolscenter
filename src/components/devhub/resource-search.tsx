"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ResourceCard } from "@/components/devhub/resource-card";
import type { DevResource } from "@/lib/devhub/types";

export function ResourceSearch({ resources }: { resources: DevResource[] }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return resources.filter((r) =>
      [r.name, r.description, r.category, r.tags.join(" ")].join(" ").toLowerCase().includes(term),
    );
  }, [q, resources]);

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search developer resources — React, Postman, Docker…"
          aria-label="Search developer resources"
          className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none focus:border-primary"
        />
      </div>
      {q.trim() && (
        <div className="mt-4">
          {results.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((r) => <ResourceCard key={r.slug} resource={r} />)}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">No resources found for &quot;{q}&quot;.</p>
          )}
        </div>
      )}
    </div>
  );
}
