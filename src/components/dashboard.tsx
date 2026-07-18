"use client";

import Link from "next/link";
import { Star, History, TrendingUp, LayoutGrid, Pin, FolderKanban, Download, LayoutTemplate, QrCode, MonitorSmartphone, Palette, Trash2 } from "lucide-react";
import { ToolCard } from "@/components/tool-card";
import { Icon } from "@/components/icon";
import { useToolPrefs } from "@/hooks/use-tool-prefs";
import { useSaved, type SavedType, type SavedItem } from "@/lib/saved";
import { getPopularTools, getTool, tools } from "@/lib/tools";
import { collectionsWithCounts } from "@/lib/collections";

const SAVED_SECTIONS: { type: SavedType; title: string; icon: React.ReactNode; empty: string }[] = [
  { type: "project", title: "Projects", icon: <FolderKanban className="size-5 text-primary" />, empty: "Save a document from any business tool (Invoice Maker, Quotation Maker…) to start a project." },
  { type: "template", title: "Saved templates", icon: <LayoutTemplate className="size-5 text-primary" />, empty: "Save a design from any business tool to reuse it later." },
  { type: "qr", title: "Saved QR codes", icon: <QrCode className="size-5 text-primary" />, empty: "Generate and save a QR in QR Studio." },
  { type: "mockup", title: "Saved mockups", icon: <MonitorSmartphone className="size-5 text-primary" />, empty: "Save a mockup from Mockup Studio." },
  { type: "brandkit", title: "Saved brand kits", icon: <Palette className="size-5 text-primary" />, empty: "Save a brand kit from Brand Studio." },
  { type: "download", title: "Downloads", icon: <Download className="size-5 text-primary" />, empty: "Anything you export across TechToolsCenter shows up here." },
];

export function Dashboard() {
  const { favorites, recents, ready } = useToolPrefs();
  const { byType, ready: savedReady, remove } = useSaved();
  const favTools = favorites.map(getTool).filter(Boolean) as typeof tools;
  const recentTools = recents.map(getTool).filter(Boolean) as typeof tools;
  const trending = getPopularTools();

  return (
    <div className="space-y-14">
      <section>
        <SectionHead icon={<Pin className="size-5 text-primary" />} title="Pinned & favorites"
          empty={ready && favTools.length === 0 ? "Tap the ⭐ on any tool to pin it here." : undefined} />
        {favTools.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favTools.map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
          </div>
        )}
      </section>

      <section>
        <SectionHead icon={<History className="size-5 text-primary" />} title="History — recently used"
          empty={ready && recentTools.length === 0 ? "Tools you open will appear here." : undefined} />
        {recentTools.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentTools.map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
          </div>
        )}
      </section>

      {/* Workspace: saved items */}
      {SAVED_SECTIONS.map((s) => {
        const items = byType(s.type);
        return (
          <section key={s.type}>
            <SectionHead icon={s.icon} title={s.title}
              empty={savedReady && items.length === 0 ? s.empty : undefined} />
            {items.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((it) => <SavedCard key={it.id} item={it} onRemove={() => remove(it.id)} />)}
              </div>
            )}
          </section>
        );
      })}

      <section>
        <SectionHead icon={<TrendingUp className="size-5 text-primary" />} title="Trending" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trending.slice(0, 6).map((t, i) => <ToolCard key={t.slug} tool={t} index={i} />)}
        </div>
      </section>

      <section>
        <SectionHead icon={<LayoutGrid className="size-5 text-primary" />} title="Collections" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collectionsWithCounts().map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={c.icon} className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{c.description}</p>
                <span className="mt-1 inline-block text-xs font-medium text-primary">{c.count} tools →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function SavedCard({ item, onRemove }: { item: SavedItem; onRemove: () => void }) {
  const inner = (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all group-hover:border-primary/40">
      {item.thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.thumb} alt="" className="size-12 shrink-0 rounded-lg border border-border object-cover" />
      ) : (
        <Star className="size-10 shrink-0 rounded-lg bg-accent p-2 text-primary" />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{item.title}</p>
        <p className="text-xs text-muted-foreground">
          {item.subtitle ? `${item.subtitle} · ` : ""}{new Date(item.ts).toLocaleDateString()}
        </p>
      </div>
      <button onClick={(e) => { e.preventDefault(); onRemove(); }} aria-label="Remove" className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive">
        <Trash2 className="size-4" />
      </button>
    </div>
  );
  return item.href ? <Link href={item.href} className="group block">{inner}</Link> : <div className="group">{inner}</div>;
}

function SectionHead({ icon, title, empty }: { icon: React.ReactNode; title: string; empty?: string }) {
  return (
    <div className="mb-5">
      <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">{icon} {title}</h2>
      {empty && <p className="mt-2 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">{empty}</p>}
    </div>
  );
}
