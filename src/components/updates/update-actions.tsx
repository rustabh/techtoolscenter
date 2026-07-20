"use client";

import { Share2, Bookmark, BookmarkCheck } from "lucide-react";
import { useUpdateBookmarks } from "@/hooks/use-update-bookmarks";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function UpdateActions({ slug, title, summary }: { slug: string; title: string; summary: string }) {
  const { isBookmarked, toggle } = useUpdateBookmarks();
  const saved = isBookmarked(slug);
  const url = `${siteConfig.url}/updates/${slug}`;

  const share = async () => {
    const text = `${title}\n\n${summary}\n\nvia ${siteConfig.name}\n${url}`;
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    if (nav && typeof nav.share === "function") {
      try { await nav.share({ title, text, url }); return; } catch { /* fall through */ }
    }
    if (typeof window !== "undefined") window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={share} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary">
        <Share2 className="size-4" /> Share
      </button>
      <button onClick={() => toggle(slug)} className={cn("inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors", saved ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:border-primary/40")}>
        {saved ? <><BookmarkCheck className="size-4" /> Bookmarked</> : <><Bookmark className="size-4" /> Bookmark</>}
      </button>
    </div>
  );
}
