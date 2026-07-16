"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { ToolCard } from "@/components/tool-card";
import { categories, tools, type ToolCategory } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function ToolsExplorer() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [active, setActive] = useState<ToolCategory | "all">("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return tools.filter((t) => {
      const inCat = active === "all" || t.category === active;
      const inQuery =
        !query ||
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.keywords.some((k) => k.includes(query));
      return inCat && inQuery;
    });
  }, [q, active]);

  return (
    <div className="space-y-8">
      <div className="glass mx-auto flex w-full max-w-xl items-center gap-2 rounded-full p-2 pl-5">
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tools…"
          aria-label="Search tools"
          className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {q && (
          <button aria-label="Clear search" onClick={() => setQ("")} className="rounded-full p-1.5 hover:bg-secondary">
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActive("all")}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            active === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">No tools match “{q}”.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <ToolCard key={t.slug} tool={t} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
