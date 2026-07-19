"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, CornerDownLeft, Clock, TrendingUp, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { getPopularTools, type Tool } from "@/lib/tools";
import { globalSearch, type GlobalResult } from "@/lib/search/global";
import { cn } from "@/lib/utils";

const RECENT_KEY = "ttc:recent-searches";

function highlight(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-primary/20 text-inherit">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  const trending = useMemo(() => getPopularTools().slice(0, 6), []);

  useEffect(() => {
    try { setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) || "[]")); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  // Unified search across tools, India Services and blog guides.
  const results = useMemo<GlobalResult[]>(() => {
    const query = q.trim();
    if (!query) return [];
    return globalSearch(query, 8);
  }, [q]);

  const commit = (term: string) => {
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 5);
    setRecent(next);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const goResult = (r: GlobalResult) => {
    commit(r.name);
    setOpen(false);
    router.push(r.href);
  };

  const goTool = (tool: Tool) => {
    commit(tool.name);
    setOpen(false);
    router.push(`/tools/${tool.slug}`);
  };

  const submit = () => {
    if (results[active]) return goResult(results[active]);
    if (q.trim()) { commit(q.trim()); router.push(`/tools?q=${encodeURIComponent(q.trim())}`); }
  };

  const showPanel = open && (q.trim() ? results.length > 0 : recent.length > 0 || trending.length > 0);

  return (
    <div ref={boxRef} className="relative mx-auto w-full max-w-xl">
      <div className="glass flex items-center gap-2 rounded-full p-2 pl-5" role="search">
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setActive(0); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
            else if (e.key === "Enter") { e.preventDefault(); submit(); }
            else if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search tools, India services & guides — PAN, marriage certificate, PDF…"
          aria-label="Search tools"
          aria-expanded={showPanel}
          role="combobox"
          aria-controls="hero-search-list"
          className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {q && (
          <button aria-label="Clear" onClick={() => { setQ(""); setActive(0); }} className="rounded-full p-1.5 hover:bg-secondary">
            <X className="size-4" />
          </button>
        )}
        <Button type="button" size="sm" className="shrink-0" onClick={submit}>Search</Button>
      </div>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            id="hero-search-list"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.14 }}
            className="glass absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-auto rounded-2xl p-2 text-left shadow-2xl"
          >
            {q.trim() ? (
              results.map((r, i) => (
                <button
                  key={r.key}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => goResult(r)}
                  className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                    active === i ? "bg-secondary" : "hover:bg-secondary/60")}
                >
                  <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg",
                    r.kind === "india" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : r.kind === "blog" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                      : "bg-accent text-accent-foreground")}>
                    <Icon name={r.icon} className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{highlight(r.name, q)}</span>
                    <span className="block truncate text-xs text-muted-foreground">{r.reason}</span>
                  </span>
                  {r.kind !== "tool" && (
                    <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                      r.kind === "india" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : "bg-blue-500/15 text-blue-600 dark:text-blue-400")}>
                      {r.kind === "india" ? "India" : "Guide"}
                    </span>
                  )}
                  {active === i && <CornerDownLeft className="size-3.5 shrink-0 text-muted-foreground" />}
                </button>
              ))
            ) : (
              <>
                {recent.length > 0 && (
                  <div className="mb-1">
                    <p className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground"><Clock className="size-3.5" /> Recent</p>
                    <div className="flex flex-wrap gap-1.5 px-2 pb-1">
                      {recent.map((r) => (
                        <button key={r} onClick={() => { setQ(r); setActive(0); }} className="rounded-full bg-secondary px-3 py-1 text-xs hover:bg-secondary/70">{r}</button>
                      ))}
                    </div>
                  </div>
                )}
                <p className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground"><TrendingUp className="size-3.5" /> Trending</p>
                {trending.map((t) => (
                  <button key={t.slug} onClick={() => goTool(t)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-secondary/60">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground"><Icon name={t.icon} className="size-4" /></span>
                    <span className="text-sm font-medium">{t.name}</span>
                  </button>
                ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
