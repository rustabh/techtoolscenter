"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Copy, Check } from "lucide-react";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { useCopy } from "@/hooks/use-copy";
import { promptCategories, type PromptTemplate } from "@/lib/aihub/prompts";
import { getTool } from "@/lib/tools";

function PromptCard({ prompt }: { prompt: PromptTemplate }) {
  const { copied, copy } = useCopy();
  const cat = promptCategories.find((c) => c.slug === prompt.category);
  const related = (prompt.relatedTools ?? []).map(getTool).filter(Boolean);

  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {cat && (
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <Icon name={cat.icon} className="size-4" />
            </span>
          )}
          <h3 className="font-semibold tracking-tight">{prompt.title}</h3>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{prompt.description}</p>
      <pre className="max-h-40 flex-1 overflow-y-auto whitespace-pre-wrap rounded-xl bg-secondary/50 p-3 font-mono text-xs leading-relaxed">{prompt.prompt}</pre>
      <div className="flex flex-wrap gap-1">
        {prompt.tags.map((t) => (
          <span key={t} className="rounded-md bg-secondary/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">{t}</span>
        ))}
      </div>
      {related.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 border-t border-border pt-3">
          <span className="text-[10px] text-muted-foreground">Pair with:</span>
          {related.map((t) => t && (
            <Link key={t.slug} href={`/tools/${t.slug}`} className="text-[10px] font-medium text-primary hover:underline">
              {t.name}
            </Link>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => copy(prompt.prompt)}
        className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />} Copy prompt
      </button>
    </div>
  );
}

export function PromptLibrary({ prompts }: { prompts: PromptTemplate[] }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return prompts.filter((p) => {
      if (category && p.category !== category) return false;
      if (!term) return true;
      return [p.title, p.description, p.prompt, p.tags.join(" ")].join(" ").toLowerCase().includes(term);
    });
  }, [prompts, q, category]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search prompts — resume, email, debug…"
          aria-label="Search prompts"
          className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${!category ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`}
        >
          All ({prompts.length})
        </button>
        {promptCategories.map((c) => {
          const count = prompts.filter((p) => p.category === c.slug).length;
          if (!count) return null;
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCategory(c.slug === category ? null : c.slug)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${category === c.slug ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`}
            >
              <Icon name={c.icon} className="size-3.5" /> {c.name} ({count})
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <PromptCard key={p.slug} prompt={p} />)}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          No prompts found{q.trim() ? ` for "${q}"` : ""} — try a different search or category.
        </p>
      )}

      <Badge variant="outline" className="block w-fit">Tip: fill in the [bracketed] parts before pasting into any chatbot.</Badge>
    </div>
  );
}
