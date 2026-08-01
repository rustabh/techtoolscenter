"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft, Star, Slash } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/icon";
import { tools } from "@/lib/tools";
import { collections } from "@/lib/collections";
import { globalSearch, type GlobalResult, type GlobalKind } from "@/lib/search/global";
import { useToolPrefs } from "@/hooks/use-tool-prefs";
import { cn } from "@/lib/utils";

interface ResultRow {
  key: string;
  href: string;
  name: string;
  icon: string;
  description: string;
  external?: boolean;
  isFavorite?: boolean;
}

interface Group {
  label: string;
  rows: ResultRow[];
}

const GROUP_META: Partial<Record<GlobalKind, string>> = {
  tool: "🛠 Tools",
  ai: "🤖 AI",
  developer: "👨‍💻 Developer",
  india: "🇮🇳 India",
  blog: "📚 Blogs",
  update: "📚 Blogs",
};

function toRow(r: GlobalResult, favoriteSlugs: Set<string>): ResultRow {
  const slug = r.href.startsWith("/tools/") ? r.href.replace("/tools/", "") : "";
  return { key: r.key, href: r.href, name: r.name, icon: r.icon, description: r.reason ?? "", external: r.external, isFavorite: slug ? favoriteSlugs.has(slug) : false };
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { favorites, recents } = useToolPrefs();
  const favoriteSlugs = useMemo(() => new Set(favorites), [favorites]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "/" && !open) {
        const target = e.target as HTMLElement | null;
        const typing = target && ["INPUT", "TEXTAREA"].includes(target.tagName);
        if (!typing) {
          e.preventDefault();
          setOpen(true);
        }
        return;
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
  }, [open]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const groups = useMemo((): Group[] => {
    const query = q.trim();

    if (!query) {
      const favTools = favorites.map((s) => tools.find((t) => t.slug === s)).filter(Boolean) as typeof tools;
      const recentTools = recents.map((s) => tools.find((t) => t.slug === s)).filter(Boolean) as typeof tools;
      const out: Group[] = [];
      if (favTools.length) {
        out.push({
          label: "⭐ Favorites",
          rows: favTools.map((t) => ({ key: `fav:${t.slug}`, href: `/tools/${t.slug}`, name: t.name, icon: t.icon, description: t.description, isFavorite: true })),
        });
      }
      if (recentTools.length) {
        out.push({
          label: "⚡ Recent",
          rows: recentTools.map((t) => ({ key: `rec:${t.slug}`, href: `/tools/${t.slug}`, name: t.name, icon: t.icon, description: t.description, isFavorite: favoriteSlugs.has(t.slug) })),
        });
      }
      const seen = new Set([...favTools, ...recentTools].map((t) => t.slug));
      const rest = tools.filter((t) => !seen.has(t.slug)).slice(0, 8);
      out.push({
        label: "🛠 Popular Tools",
        rows: rest.map((t) => ({ key: `pop:${t.slug}`, href: `/tools/${t.slug}`, name: t.name, icon: t.icon, description: t.description, isFavorite: favoriteSlugs.has(t.slug) })),
      });
      return out;
    }

    const all = globalSearch(query, 60);
    const order: GlobalKind[] = ["tool", "ai", "developer", "india", "blog", "update"];
    const byLabel = new Map<string, GlobalResult[]>();
    for (const kind of order) {
      const label = GROUP_META[kind]!;
      const existing = byLabel.get(label) ?? [];
      const additions = all.filter((r) => r.kind === kind);
      byLabel.set(label, [...existing, ...additions]);
    }
    const out: Group[] = [];
    for (const [label, rows] of byLabel) {
      if (!rows.length) continue;
      out.push({ label, rows: rows.slice(0, 6).map((r) => toRow(r, favoriteSlugs)) });
    }
    return out;
  }, [q, favorites, recents, favoriteSlugs]);

  const flatRows = useMemo(() => groups.flatMap((g) => g.rows), [groups]);

  const go = (row: ResultRow) => {
    setOpen(false);
    if (row.external || row.href.startsWith("http")) {
      window.open(row.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(row.href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-background/60 p-4 pt-[10vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
            role="dialog"
            aria-label="Global search"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-5 text-muted-foreground" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => { setQ(e.target.value); setActive(0); }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, flatRows.length - 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
                  if (e.key === "Enter" && flatRows[active]) go(flatRows[active]);
                }}
                placeholder="Search tools, AI, developer resources, India Hub, blog…"
                className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search everything"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">ESC</kbd>
            </div>
            <div className="max-h-[28rem] overflow-auto p-2">
              {flatRows.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">No results found.</p>
              ) : (
                groups.map((group) => {
                  let runningIndex = 0;
                  for (const g of groups) {
                    if (g === group) break;
                    runningIndex += g.rows.length;
                  }
                  return (
                    <div key={group.label} className="mb-1">
                      <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">{group.label}</p>
                      {group.rows.map((row, i) => {
                        const flatIndex = runningIndex + i;
                        return (
                          <button
                            key={row.key}
                            onMouseEnter={() => setActive(flatIndex)}
                            onClick={() => go(row)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                              active === flatIndex ? "bg-secondary" : "hover:bg-secondary/60",
                            )}
                          >
                            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                              <Icon name={row.icon} className="size-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium">{row.name}</span>
                              <span className="block truncate text-xs text-muted-foreground">{row.description}</span>
                            </span>
                            {row.isFavorite && <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />}
                            {active === flatIndex && <CornerDownLeft className="size-3.5 shrink-0 text-muted-foreground" />}
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
              <span>{collections.length} collections · {tools.length} tools</span>
              <span className="flex items-center gap-2">
                <span>↑↓ navigate · ↵ open</span>
                <span className="hidden items-center gap-1 sm:flex"><Slash className="size-3" /> or ⌘K to open</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
