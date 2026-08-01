"use client";

import Link from "next/link";
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { Icon } from "@/components/icon";
import type { MegaMenuConfig, MegaMenuLink } from "@/lib/megamenu/types";
import { cn } from "@/lib/utils";

function LinkItem({ item, onNavigate }: { item: MegaMenuLink; onNavigate?: () => void }) {
  if (item.comingSoon) {
    return (
      <div className="flex flex-col rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground/50">
        <span className="truncate">{item.label}</span>
        <span className="mt-0.5 w-fit rounded-full bg-secondary/70 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide">Soon</span>
      </div>
    );
  }
  if (item.action === "incinc") {
    return (
      <button
        type="button"
        onClick={() => {
          window.dispatchEvent(new Event("incinc:open"));
          onNavigate?.();
        }}
        className="flex w-full flex-col rounded-lg px-2.5 py-1.5 text-left text-sm hover:bg-secondary/60"
      >
        <span className="truncate">{item.label}</span>
        {item.description && <span className="truncate text-xs text-muted-foreground">{item.description}</span>}
      </button>
    );
  }
  if (!item.href) return null;
  const content = (
    <span className="flex min-w-0 flex-col">
      <span className="flex items-center gap-1.5">
        <span className="truncate">{item.label}</span>
        {item.external && <ExternalLink className="size-3 shrink-0 text-muted-foreground" />}
      </span>
      {item.badge && (
        <span className={cn(
          "mt-0.5 w-fit rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
          item.badge === "New" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-orange-500/15 text-orange-600 dark:text-orange-400",
        )}>
          {item.badge}
        </span>
      )}
    </span>
  );
  const className = "flex items-center rounded-lg px-2.5 py-1.5 text-sm hover:bg-secondary/60";
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onNavigate}>{content}</a>
  ) : (
    <Link href={item.href} className={className} onClick={onNavigate}>{content}</Link>
  );
}

const COLUMN_GRID: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function MegaMenuPanel({ menu, onNavigate }: { menu: MegaMenuConfig; onNavigate?: () => void }) {
  return (
    <div className="grid gap-6 p-5 lg:grid-cols-[1fr_auto] lg:gap-8">
      <div className={cn("grid gap-6", COLUMN_GRID[menu.columns.length] ?? "sm:grid-cols-2")}>
        {menu.columns.map((col) => (
          <div key={col.title} className="min-w-[150px]">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Icon name={col.icon} className="size-3.5" /> {col.title}
            </p>
            {col.groups.map((group, gi) => (
              <div key={gi} className={gi > 0 ? "mt-3" : ""}>
                {group.title && <p className="mb-1 px-2.5 text-[11px] font-medium text-muted-foreground/80">{group.title}</p>}
                <div className="space-y-0.5">
                  {group.items.map((item) => <LinkItem key={item.label} item={item} onNavigate={onNavigate} />)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col gap-4 lg:w-64">
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-4">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">{menu.featured.eyebrow}</span>
          <p className="mt-2 text-base font-bold tracking-tight">{menu.featured.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{menu.featured.subtitle}</p>
          {menu.featured.action === "incinc" ? (
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new Event("incinc:open"));
                onNavigate?.();
              }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Sparkles className="size-3.5" /> {menu.featured.cta}
            </button>
          ) : (
            <Link
              href={menu.featured.href ?? "#"}
              onClick={onNavigate}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {menu.featured.cta} <ArrowRight className="size-3.5" />
            </Link>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-border/60 pt-3">
          {menu.quickAccess.map((item) =>
            item.href ? (
              item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground">
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} onClick={onNavigate} className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground">
                  {item.label}
                </Link>
              )
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
