"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-bits";
import type { BlogSearchEntry } from "@/lib/blog/posts";

/** Lightweight client search over the blog — indexes titles, excerpts and
 *  tags. Takes the slim BlogSearchEntry[] projection (see blogSearchIndex in
 *  lib/blog/posts), not full BlogPost[] — this component and its props cross
 *  the server/client boundary, so shipping every post's full article body
 *  and FAQ here would serialize the entire blog into the page just to power
 *  this search input. */
export function BlogSearch({ posts }: { posts: BlogSearchEntry[] }) {
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
              {results.map((p) => <BlogCard key={p.slug} post={p} readingMinutes={p.readingMinutes} />)}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">No articles found for “{q}”.</p>
          )}
        </div>
      )}
    </div>
  );
}
