"use client";

import Link from "next/link";
import { ExternalLink, BookOpen, Star, Cpu, Monitor, Smartphone, Laptop, Chrome } from "lucide-react";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { useDevHubFavorites } from "@/hooks/use-devhub-favorites";
import { getAiCategory } from "@/lib/aihub/categories";
import { getTool } from "@/lib/tools";
import type { AiTool } from "@/lib/aihub/types";
import { cn } from "@/lib/utils";

const PRICING_STYLE: Record<AiTool["pricing"], string> = {
  Free: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Freemium: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Paid: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Enterprise: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

const PLATFORM_ICON: Record<string, typeof Monitor> = {
  Web: Monitor,
  Mobile: Smartphone,
  Desktop: Laptop,
  "Chrome Extension": Chrome,
};

export function AiToolCard({ tool }: { tool: AiTool }) {
  const { isFavorite, toggleFavorite, ready } = useDevHubFavorites();
  const fav = ready && isFavorite(`ai:${tool.slug}`);
  const cat = getAiCategory(tool.category);
  const relatedTools = (tool.relatedTools ?? []).map(getTool).filter(Boolean);

  return (
    <div className="group relative flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon name={tool.icon} className="size-5" />
        </span>
        <div className="flex items-center gap-1">
          {tool.badge && <Badge variant="secondary" className="text-[10px]">{tool.badge}</Badge>}
          <button
            type="button"
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            onClick={() => toggleFavorite(`ai:${tool.slug}`)}
            className="rounded-full p-1 text-muted-foreground transition-colors hover:text-amber-400"
          >
            <Star className={cn("size-4", fav && "fill-amber-400 text-amber-400")} />
          </button>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-semibold tracking-tight">{tool.name}</h3>
        <p className="text-xs text-muted-foreground">{tool.developer}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tool.overview}</p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {cat && <Badge variant="outline" className="text-[10px]">{cat.name}</Badge>}
        <Badge className={cn("text-[10px]", PRICING_STYLE[tool.pricing])}>{tool.pricing}</Badge>
        {tool.openSource && <Badge variant="outline" className="text-[10px]">Open Source</Badge>}
        {tool.apiAvailable && <Badge variant="outline" className="text-[10px]">API</Badge>}
      </div>

      {tool.platforms && tool.platforms.length > 0 && (
        <div className="flex items-center gap-2 text-muted-foreground">
          {tool.platforms.map((p) => {
            const PIcon = PLATFORM_ICON[p] ?? Cpu;
            return <PIcon key={p} className="size-3.5" aria-label={p} />;
          })}
        </div>
      )}

      {tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tool.tags.slice(0, 4).map((t) => (
            <span key={t} className="rounded-md bg-secondary/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">{t}</span>
          ))}
        </div>
      )}

      {relatedTools.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t border-border pt-3">
          <span className="text-[10px] text-muted-foreground">Pair with:</span>
          {relatedTools.map((t) => t && (
            <Link key={t.slug} href={`/tools/${t.slug}`} className="text-[10px] font-medium text-primary hover:underline">
              {t.name}
            </Link>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-t border-border pt-3">
        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Official site <ExternalLink className="size-3" />
        </a>
        {tool.docsUrl && (
          <a
            href={tool.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary"
          >
            <BookOpen className="size-3" /> Docs
          </a>
        )}
      </div>
    </div>
  );
}
