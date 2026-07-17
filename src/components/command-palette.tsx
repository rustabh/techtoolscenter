"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/icon";
import { tools, categories } from "@/lib/tools";
import { useToolPrefs } from "@/hooks/use-tool-prefs";
import { cn } from "@/lib/utils";

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { favorites, recents } = useToolPrefs();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("ttc:open-command", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ttc:open-command", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) {
      const favTools = favorites.map((s) => tools.find((t) => t.slug === s)).filter(Boolean);
      const recentTools = recents.map((s) => tools.find((t) => t.slug === s)).filter(Boolean);
      const base = [...favTools, ...recentTools];
      const seen = new Set(base.map((t) => t!.slug));
      const rest = tools.filter((t) => !seen.has(t.slug)).slice(0, 8 - base.length);
      return [...base, ...rest].slice(0, 8) as typeof tools;
    }
    return tools
      .filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.keywords.some((k) => k.includes(query))
      )
      .slice(0, 10);
  }, [q, favorites, recents]);

  const go = (slug: string) => {
    setOpen(false);
    router.push(`/tools/${slug}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-background/60 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-5 text-muted-foreground" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => { setQ(e.target.value); setActive(0); }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
                  if (e.key === "Enter" && results[active]) go(results[active].slug);
                }}
                placeholder="Search tools…"
                className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search tools"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-auto p-2">
              {!q && (favorites.length > 0 || recents.length > 0) && (
                <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">Favorites & recent</p>
              )}
              {results.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">No tools found.</p>
              ) : (
                results.map((t, i) => (
                  <button
                    key={t.slug}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(t.slug)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                      active === i ? "bg-secondary" : "hover:bg-secondary/60"
                    )}
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                      <Icon name={t.icon} className="size-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{t.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">{t.description}</span>
                    </span>
                    {favorites.includes(t.slug) && <Star className="size-3.5 fill-amber-400 text-amber-400" />}
                    {active === i && <CornerDownLeft className="size-3.5 text-muted-foreground" />}
                  </button>
                ))
              )}
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
              <span>{categories.length} categories · {tools.length} tools</span>
              <span>↑↓ navigate · ↵ open</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
