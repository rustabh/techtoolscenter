"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, Star, History } from "lucide-react";
import { ToolCard } from "@/components/tool-card";
import { tools, getTool, searchText } from "@/lib/tools";
import { collectionsWithCounts, collectionOf, getCollection } from "@/lib/collections";
import { useToolPrefs } from "@/hooks/use-tool-prefs";
import { cn } from "@/lib/utils";

export function ToolsExplorer() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [active, setActive] = useState<string>("all");
  const { favorites, recents, ready, moveFavorite } = useToolPrefs();
  const cols = collectionsWithCounts();

  const favTools = favorites.map(getTool).filter(Boolean);
  const recentTools = recents.map(getTool).filter(Boolean);
  const showCollections = ready && !q.trim() && active === "all";

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return tools.filter((t) => {
      const inCol = active === "all" || collectionOf(t) === active;
      const colName = getCollection(collectionOf(t))?.name.toLowerCase() ?? "";
      const inQuery = !query || searchText(t).includes(query) || colName.includes(query);
      return inCol && inQuery;
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
        {cols.map((c) => (
          <button
            key={c.slug}
            onClick={() => setActive(c.slug)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      {showCollections && favTools.length > 0 && (
        <Collection
          title="Your favorites"
          icon={<Star className="size-4 fill-amber-400 text-amber-400" />}
          items={favTools as typeof tools}
          reorderable
          onMoveEarlier={(slug) => moveFavorite(slug, -1)}
          onMoveLater={(slug) => moveFavorite(slug, 1)}
        />
      )}
      {showCollections && recentTools.length > 0 && (
        <Collection title="Recently used" icon={<History className="size-4 text-primary" />} items={recentTools as typeof tools} />
      )}

      <div>
        {(showCollections && (favTools.length > 0 || recentTools.length > 0)) && (
          <h2 className="mb-4 text-sm font-semibold text-muted-foreground">All tools</h2>
        )}
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
    </div>
  );
}

function Collection({ title, icon, items, reorderable, onMoveEarlier, onMoveLater }: {
  title: string;
  icon: React.ReactNode;
  items: typeof tools;
  reorderable?: boolean;
  onMoveEarlier?: (slug: string) => void;
  onMoveLater?: (slug: string) => void;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold">{icon} {title}</h2>
        {reorderable && items.length > 1 && (
          <p className="text-xs text-muted-foreground">Use the arrows to reorder</p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <ToolCard
            key={t.slug}
            tool={t}
            index={i}
            reorder={reorderable ? {
              canMoveEarlier: i > 0,
              canMoveLater: i < items.length - 1,
              onMoveEarlier: () => onMoveEarlier?.(t.slug),
              onMoveLater: () => onMoveLater?.(t.slug),
            } : undefined}
          />
        ))}
      </div>
    </div>
  );
}
