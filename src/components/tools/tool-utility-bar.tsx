"use client";

import Link from "next/link";
import { Star, Share2, Flag, MessageSquarePlus, Check } from "lucide-react";
import { useState } from "react";
import { useToolPrefs } from "@/hooks/use-tool-prefs";
import { showToast } from "@/components/ui/toaster";

/** Universal per-tool utility bar (page level, reused across every tool):
 *  Favorite · Share · Report · Feedback. No per-tool wiring needed. */
export function ToolUtilityBar({ slug, name }: { slug: string; name: string }) {
  const { isFavorite, toggleFavorite } = useToolPrefs();
  const [shared, setShared] = useState(false);
  const fav = isFavorite(slug);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : `/tools/${slug}`;
    try {
      if (navigator.share) await navigator.share({ title: name, url });
      else { await navigator.clipboard.writeText(url); showToast("Link copied"); }
      setShared(true);
      setTimeout(() => setShared(false), 1500);
    } catch { /* cancelled */ }
  };

  const favorite = () => {
    toggleFavorite(slug);
    showToast(fav ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button onClick={favorite}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${fav ? "border-amber-400/50 bg-amber-400/10 text-amber-600 dark:text-amber-400" : "border-border hover:bg-secondary"}`}>
        <Star className={`size-3.5 ${fav ? "fill-current" : ""}`} /> {fav ? "Favorited" : "Favorite"}
      </button>
      <button onClick={share} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-secondary">
        {shared ? <Check className="size-3.5 text-emerald-500" /> : <Share2 className="size-3.5" />} Share
      </button>
      <Link href="/community?compose=bug" className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-secondary">
        <Flag className="size-3.5" /> Report
      </Link>
      <Link href="/community?compose=idea" className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-secondary">
        <MessageSquarePlus className="size-3.5" /> Feedback
      </Link>
    </div>
  );
}
