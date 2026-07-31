"use client";

import Link from "next/link";
import { ExternalLink, BookOpen, Star } from "lucide-react";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { useDevHubFavorites } from "@/hooks/use-devhub-favorites";
import { getDevCategory } from "@/lib/devhub/categories";
import type { DevResource } from "@/lib/devhub/types";
import { cn } from "@/lib/utils";

const PRICING_STYLE: Record<DevResource["pricing"], string> = {
  Free: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Freemium: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Paid: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export function ResourceCard({ resource }: { resource: DevResource }) {
  const { isFavorite, toggleFavorite, ready } = useDevHubFavorites();
  const fav = ready && isFavorite(resource.slug);
  const cat = getDevCategory(resource.category);
  const isInternal = !!resource.internalToolSlug;

  return (
    <div className="group relative flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon name={resource.icon} className="size-5" />
        </span>
        <div className="flex items-center gap-1">
          {resource.badge && (
            <Badge variant="secondary" className="text-[10px]">{resource.badge}</Badge>
          )}
          <button
            type="button"
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            onClick={() => toggleFavorite(resource.slug)}
            className="rounded-full p-1 text-muted-foreground transition-colors hover:text-amber-400"
          >
            <Star className={cn("size-4", fav && "fill-amber-400 text-amber-400")} />
          </button>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-semibold tracking-tight">{resource.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {cat && <Badge variant="outline" className="text-[10px]">{cat.name}</Badge>}
        <Badge className={cn("text-[10px]", PRICING_STYLE[resource.pricing])}>{resource.pricing}</Badge>
        {resource.openSource && <Badge variant="outline" className="text-[10px]">Open Source</Badge>}
      </div>

      {resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {resource.tags.slice(0, 4).map((t) => (
            <span key={t} className="rounded-md bg-secondary/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">{t}</span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-t border-border pt-3">
        {isInternal ? (
          <Link
            href={resource.officialUrl}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Open tool
          </Link>
        ) : (
          <a
            href={resource.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Official site <ExternalLink className="size-3" />
          </a>
        )}
        {!isInternal && resource.docsUrl && (
          <a
            href={resource.docsUrl}
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
