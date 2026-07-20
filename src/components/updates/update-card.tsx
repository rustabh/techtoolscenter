"use client";

import Link from "next/link";
import { Clock, ArrowRight, Share2, Bookmark, BookmarkCheck } from "lucide-react";
import { Icon } from "@/components/icon";
import { getUpdateCategory } from "@/lib/updates/categories";
import { useUpdateBookmarks } from "@/hooks/use-update-bookmarks";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export interface UpdateCardData {
  slug: string;
  title: string;
  summary: string;
  icon: string;
  category: string;
  publishedOn: string;
  readingMinutes: number;
}

const catTint: Record<string, string> = {
  google: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  government: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  platform: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  "tool-improvements": "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "new-features": "bg-primary/15 text-primary",
  announcements: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  security: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  maintenance: "bg-slate-500/15 text-slate-600 dark:text-slate-400",
};

export function UpdateCard({ update }: { update: UpdateCardData }) {
  const { isBookmarked, toggle } = useUpdateBookmarks();
  const cat = getUpdateCategory(update.category);
  const saved = isBookmarked(update.slug);
  const href = `/updates/${update.slug}`;
  const date = new Date(update.publishedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const share = async () => {
    const url = `${siteConfig.url}${href}`;
    const text = `${update.title}\n\n${update.summary}\n\nvia ${siteConfig.name}\n${url}`;
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    if (nav && typeof nav.share === "function") {
      try { await nav.share({ title: update.title, text, url }); return; } catch { /* fall through */ }
    }
    if (typeof window !== "undefined") window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="flex items-center justify-between gap-2">
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", catTint[update.category] ?? "bg-secondary text-muted-foreground")}>
          {cat?.emoji} {cat?.name ?? update.category}
        </span>
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon name={update.icon} className="size-4" />
        </span>
      </div>

      <Link href={href} className="mt-4 flex-1">
        <h3 className="font-semibold leading-snug group-hover:text-primary">{update.title}</h3>
        <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground">{update.summary}</p>
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{date}</span>
          <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {update.readingMinutes} min</span>
        </span>
        <div className="flex items-center gap-1">
          <button onClick={share} aria-label="Share" className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Share2 className="size-4" />
          </button>
          <button onClick={() => toggle(update.slug)} aria-label={saved ? "Remove bookmark" : "Bookmark"} className={cn("rounded-full p-1.5 hover:bg-secondary", saved ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
            {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
          </button>
        </div>
      </div>

      <Link href={href} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Read more <ArrowRight className="size-3.5" />
      </Link>
    </article>
  );
}
