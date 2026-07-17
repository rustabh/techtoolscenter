"use client";

import Link from "next/link";
import { Star, History, TrendingUp, LayoutGrid, Pin } from "lucide-react";
import { ToolCard } from "@/components/tool-card";
import { Icon } from "@/components/icon";
import { useToolPrefs } from "@/hooks/use-tool-prefs";
import { getPopularTools, getTool, tools } from "@/lib/tools";
import { collectionsWithCounts } from "@/lib/collections";

export function Dashboard() {
  const { favorites, recents, ready } = useToolPrefs();
  const favTools = favorites.map(getTool).filter(Boolean) as typeof tools;
  const recentTools = recents.map(getTool).filter(Boolean) as typeof tools;
  const trending = getPopularTools();

  return (
    <div className="space-y-14">
      <section>
        <SectionHead icon={<Pin className="size-5 text-primary" />} title="Pinned & favorites"
          empty={ready && favTools.length === 0 ? "Tap the ⭐ on any tool to pin it here." : undefined} />
        {favTools.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favTools.map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
          </div>
        )}
      </section>

      <section>
        <SectionHead icon={<History className="size-5 text-primary" />} title="Recently used"
          empty={ready && recentTools.length === 0 ? "Tools you open will appear here." : undefined} />
        {recentTools.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentTools.map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
          </div>
        )}
      </section>

      <section>
        <SectionHead icon={<TrendingUp className="size-5 text-primary" />} title="Trending" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trending.slice(0, 6).map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
        </div>
      </section>

      <section>
        <SectionHead icon={<LayoutGrid className="size-5 text-primary" />} title="Collections" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collectionsWithCounts().map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={c.icon} className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{c.description}</p>
                <span className="mt-1 inline-block text-xs font-medium text-primary">{c.count} tools →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHead({ icon, title, empty }: { icon: React.ReactNode; title: string; empty?: string }) {
  return (
    <div className="mb-5">
      <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">{icon} {title}</h2>
      {empty && <p className="mt-2 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">{empty}</p>}
    </div>
  );
}
