"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { UpdateCard, type UpdateCardData } from "./update-card";
import { updateCategories } from "@/lib/updates/categories";
import { cn } from "@/lib/utils";

type Item = UpdateCardData & { tags: string[]; popular?: boolean };
type Sort = "latest" | "popular" | "oldest";

const PAGE = 9;

export function UpdatesBrowser({ items }: { items: Item[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("latest");
  const [count, setCount] = useState(PAGE);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = items.filter((u) => {
      if (cat && u.category !== cat) return false;
      if (!query) return true;
      return `${u.title} ${u.summary} ${u.tags.join(" ")}`.toLowerCase().includes(query);
    });
    list = [...list].sort((a, b) => {
      if (sort === "popular") return Number(!!b.popular) - Number(!!a.popular) || b.publishedOn.localeCompare(a.publishedOn);
      if (sort === "oldest") return a.publishedOn.localeCompare(b.publishedOn);
      return b.publishedOn.localeCompare(a.publishedOn);
    });
    return list;
  }, [items, q, cat, sort]);

  const visible = filtered.slice(0, count);

  return (
    <div>
      {/* Search */}
      <div className="glass flex items-center gap-3 rounded-full p-2 pl-5">
        <Search className="size-5 shrink-0 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setCount(PAGE); }}
          placeholder="Search updates — Google, Aadhaar, PDF, security, feature…"
          aria-label="Search updates"
          className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button onClick={() => { setCat(null); setCount(PAGE); }}
          className={cn("rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors", cat === null ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40")}>
          All
        </button>
        {updateCategories.map((c) => (
          <button key={c.slug} onClick={() => { setCat(c.slug); setCount(PAGE); }}
            className={cn("inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors", cat === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40")}>
            <span>{c.emoji}</span> {c.name}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 rounded-full border border-border bg-card p-1 text-xs">
          {(["latest", "popular", "oldest"] as Sort[]).map((s) => (
            <button key={s} onClick={() => setSort(s)}
              className={cn("rounded-full px-3 py-1 font-medium capitalize transition-colors", sort === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {visible.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-border bg-secondary/30 p-10 text-center text-sm text-muted-foreground">
          No updates match your search.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((u) => <UpdateCard key={u.slug} update={u} />)}
        </div>
      )}

      {count < filtered.length && (
        <div className="mt-8 text-center">
          <button onClick={() => setCount((c) => c + PAGE)}
            className="rounded-full border border-border bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary">
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
