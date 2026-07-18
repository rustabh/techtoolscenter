"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-bits";
import type { BlogPost } from "@/lib/blog/types";

/** Lightweight client search over the blog — indexes titles, excerpts and tags. */
export function BlogSearch({ posts }: { posts: BlogPost[] }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return posts.filter((p) =>
      [p.title, p.excerpt, p.tags.join(" "), p.category].join(" ").toLowerCase().includes(term),
    );
  }, [q, posts]);

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles…"
          aria-label="Search articles"
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
        />
      </div>
      {q.trim() && (
        <div className="mt-4">
          {results.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => <BlogCard key={p.slug} post={p} />)}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">No articles found for “{q}”.</p>
          )}
        </div>
      )}
    </div>
  );
}
