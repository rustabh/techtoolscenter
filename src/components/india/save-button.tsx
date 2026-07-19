"use client";

import Link from "next/link";
import { Bookmark, BookmarkCheck, ArrowRight } from "lucide-react";
import { useIndiaSaved } from "@/hooks/use-india-saved";
import { cn } from "@/lib/utils";

/**
 * "Save to My Documents" toggle for an India Service page. Lets a visitor
 * bookmark the service and later track its documents on the My Documents page.
 */
export function SaveButton({ slug, className = "" }: { slug: string; className?: string }) {
  const { isSaved, toggleSave } = useIndiaSaved();
  const saved = isSaved(slug);

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <button
        onClick={() => toggleSave(slug)}
        aria-pressed={saved}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          saved
            ? "border-primary bg-primary/10 text-primary"
            : "border-border bg-card hover:border-primary/40"
        )}
      >
        {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
        {saved ? "Saved to My Documents" : "Save to My Documents"}
      </button>
      {saved && (
        <Link href="/india-services/my-documents" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
          View my checklist <ArrowRight className="size-3.5" />
        </Link>
      )}
    </div>
  );
}
