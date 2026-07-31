"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AiToolCard } from "@/components/aihub/ai-tool-card";
import type { AiTool } from "@/lib/aihub/types";

export function AiToolSearch({ tools }: { tools: AiTool[] }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return tools.filter((t) =>
      [t.name, t.developer, t.overview, t.category, t.tags.join(" ")].join(" ").toLowerCase().includes(term),
    );
  }, [q, tools]);

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search AI tools — ChatGPT, Midjourney, Cursor…"
          aria-label="Search AI tools"
          className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none focus:border-primary"
        />
      </div>
      {q.trim() && (
        <div className="mt-4">
          {results.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((t) => <AiToolCard key={t.slug} tool={t} />)}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">No AI tools found for &quot;{q}&quot;.</p>
          )}
        </div>
      )}
    </div>
  );
}
