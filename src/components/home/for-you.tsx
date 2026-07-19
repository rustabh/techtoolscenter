"use client";

import Link from "next/link";
import { History, Sparkles, ArrowRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { useToolPrefs } from "@/hooks/use-tool-prefs";
import { getTool, tools, type Tool } from "@/lib/tools";
import { collectionOf } from "@/lib/collections";

/** Continue Working + Recommended For You — from local recents/favorites only.
 *  Hidden entirely until the visitor has used a tool (no fake data). */
export function ForYou() {
  const { recents, favorites, ready } = useToolPrefs();
  if (!ready || recents.length === 0) return null;

  const recentTools = recents.map(getTool).filter(Boolean) as Tool[];
  const usedSlugs = new Set([...recents, ...favorites]);

  // Recommend tools from the same collections as recently used, not yet used.
  const recommended: Tool[] = [];
  const seen = new Set(usedSlugs);
  for (const t of recentTools) {
    const col = collectionOf(t);
    for (const cand of tools) {
      if (!seen.has(cand.slug) && collectionOf(cand) === col) {
        seen.add(cand.slug);
        recommended.push(cand);
      }
      if (recommended.length >= 6) break;
    }
    if (recommended.length >= 6) break;
  }

  return (
    <section className="container-tight py-14">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-5 flex items-center gap-2 text-xl font-bold tracking-tight"><History className="size-5 text-primary" /> Continue working</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {recentTools.slice(0, 4).map((t) => <MiniCard key={t.slug} tool={t} />)}
          </div>
        </div>
        {recommended.length > 0 && (
          <div>
            <h2 className="mb-5 flex items-center gap-2 text-xl font-bold tracking-tight"><Sparkles className="size-5 text-primary" /> Recommended for you</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {recommended.slice(0, 4).map((t) => <MiniCard key={t.slug} tool={t} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function MiniCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}`}
      className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <span className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon name={tool.icon} className="size-5" /></span>
        <span className="text-sm font-medium">{tool.name}</span>
      </span>
      <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
