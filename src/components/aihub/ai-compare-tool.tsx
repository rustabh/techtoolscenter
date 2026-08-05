"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Search, X, Check, Minus } from "lucide-react";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { getAiCategory } from "@/lib/aihub/categories";
import type { AiTool } from "@/lib/aihub/types";
import { cn } from "@/lib/utils";

const PRICING_STYLE: Record<AiTool["pricing"], string> = {
  Free: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Freemium: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Paid: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Enterprise: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

function ToolPicker({ tools, exclude, onPick, label }: { tools: AiTool[]; exclude: string[]; onPick: (slug: string) => void; label: string }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const pool = tools.filter((t) => !exclude.includes(t.slug));
    if (!term) return pool.slice(0, 8);
    return pool.filter((t) => [t.name, t.developer, t.category].join(" ").toLowerCase().includes(term)).slice(0, 8);
  }, [q, tools, exclude]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border p-6 text-center">
      <span className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground">
        <Search className="size-4" />
      </span>
      <p className="text-sm font-medium">{label}</p>
      <div className="w-full max-w-xs">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search AI tools…"
          aria-label={label}
          className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
        />
        {results.length > 0 && (
          <div className="mt-2 max-h-56 space-y-1 overflow-y-auto text-left">
            {results.map((t) => (
              <button
                key={t.slug}
                type="button"
                onClick={() => onPick(t.slug)}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary"
              >
                <Icon name={t.icon} className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{t.name}</span>
                <span className="ml-auto shrink-0 text-xs text-muted-foreground">{t.developer}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BoolCell({ value }: { value?: boolean }) {
  return value ? <Check className="mx-auto size-4 text-emerald-500" /> : <Minus className="mx-auto size-4 text-muted-foreground/40" />;
}

export function AiCompareTool({ tools, initialSlugs }: { tools: AiTool[]; initialSlugs: string[] }) {
  const bySlug = useMemo(() => new Map(tools.map((t) => [t.slug, t])), [tools]);
  const [slots, setSlots] = useState<(string | null)[]>(() => {
    const s: (string | null)[] = [null, null, null];
    initialSlugs.slice(0, 3).forEach((slug, i) => { if (bySlug.has(slug)) s[i] = slug; });
    return s;
  });

  const selected = slots.filter((s): s is string => !!s).map((s) => bySlug.get(s)!).filter(Boolean);
  const selectedSlugs = selected.map((t) => t.slug);

  const setSlot = (i: number, slug: string | null) => setSlots((prev) => prev.map((s, idx) => (idx === i ? slug : s)));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {slots.map((slug, i) => {
          const tool = slug ? bySlug.get(slug) : null;
          if (!tool) {
            return (
              <ToolPicker
                key={i}
                tools={tools}
                exclude={selectedSlugs}
                onPick={(s) => setSlot(i, s)}
                label={i === 2 ? "Add a third tool (optional)" : `Pick tool ${i + 1}`}
              />
            );
          }
          const cat = getAiCategory(tool.category);
          return (
            <div key={i} className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <button
                type="button"
                onClick={() => setSlot(i, null)}
                aria-label={`Remove ${tool.name} from comparison`}
                className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="size-4" />
              </button>
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={tool.icon} className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold tracking-tight">{tool.name}</h3>
                <p className="text-xs text-muted-foreground">{tool.developer}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{tool.overview}</p>
              <div className="flex flex-wrap gap-1.5">
                {cat && <Badge variant="outline" className="text-[10px]">{cat.name}</Badge>}
                <Badge className={cn("text-[10px]", PRICING_STYLE[tool.pricing])}>{tool.pricing}</Badge>
              </div>
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Official site <ExternalLink className="size-3" />
              </a>
            </div>
          );
        })}
      </div>

      {selected.length >= 2 && (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left">
                <th className="p-3 font-medium text-muted-foreground">Feature</th>
                {selected.map((t) => <th key={t.slug} className="p-3 font-semibold">{t.name}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="p-3 text-muted-foreground">Developer</td>
                {selected.map((t) => <td key={t.slug} className="p-3">{t.developer}</td>)}
              </tr>
              <tr className="border-b border-border/60">
                <td className="p-3 text-muted-foreground">Category</td>
                {selected.map((t) => <td key={t.slug} className="p-3">{getAiCategory(t.category)?.name ?? t.category}</td>)}
              </tr>
              <tr className="border-b border-border/60">
                <td className="p-3 text-muted-foreground">Pricing</td>
                {selected.map((t) => (
                  <td key={t.slug} className="p-3">
                    <Badge className={cn("text-[10px]", PRICING_STYLE[t.pricing])}>{t.pricing}</Badge>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border/60">
                <td className="p-3 text-muted-foreground">API available</td>
                {selected.map((t) => <td key={t.slug} className="p-3"><BoolCell value={t.apiAvailable} /></td>)}
              </tr>
              <tr className="border-b border-border/60">
                <td className="p-3 text-muted-foreground">Open source</td>
                {selected.map((t) => <td key={t.slug} className="p-3"><BoolCell value={t.openSource} /></td>)}
              </tr>
              <tr className="border-b border-border/60">
                <td className="p-3 text-muted-foreground">Platforms</td>
                {selected.map((t) => <td key={t.slug} className="p-3">{t.platforms?.length ? t.platforms.join(", ") : "—"}</td>)}
              </tr>
              <tr>
                <td className="p-3 text-muted-foreground">Tags</td>
                {selected.map((t) => (
                  <td key={t.slug} className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {t.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="rounded-md bg-secondary/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selected.length < 2 && (
        <p className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          Pick at least two AI tools above to see a side-by-side comparison.
        </p>
      )}
    </div>
  );
}
