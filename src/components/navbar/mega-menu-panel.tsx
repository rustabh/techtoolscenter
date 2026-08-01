"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, ArrowUpRight, Sparkles, Flame, Star, Compass } from "lucide-react";
import { Icon } from "@/components/icon";
import type { MegaMenuConfig, MegaMenuLink } from "@/lib/megamenu/types";
import { themeFor, CATEGORY_ICON } from "@/lib/megamenu/icon-theme";
import { cn } from "@/lib/utils";

function CategoryIconChip({ label }: { label: string }) {
  const iconName = CATEGORY_ICON[label];
  if (!iconName) return null;
  const theme = themeFor(label);
  return (
    <span className={cn("grid size-7 shrink-0 place-items-center rounded-lg transition-transform duration-200 group-hover:scale-105", theme.bg, theme.fg)}>
      <Icon name={iconName} className="size-3.5" />
    </span>
  );
}

function LinkRow({ item, onNavigate, showCategoryIcon }: { item: MegaMenuLink; onNavigate?: () => void; showCategoryIcon?: boolean }) {
  if (item.comingSoon) {
    return (
      <div className="group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-muted-foreground/45">
        {showCategoryIcon && <CategoryIconChip label={item.label} />}
        <span className="min-w-0 flex-1 leading-snug">{item.label}</span>
        <span className="shrink-0 rounded-full bg-secondary/70 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide">Soon</span>
      </div>
    );
  }

  const inner = (
    <>
      {showCategoryIcon && <CategoryIconChip label={item.label} />}
      <span className="min-w-0 flex-1">
        <span className="flex items-start gap-1.5">
          <span className="text-[0.925rem] leading-snug">{item.label}</span>
          {item.external && <ExternalLink className="mt-1 size-3 shrink-0 text-muted-foreground" />}
        </span>
        {item.badge && (
          <span className={cn(
            "mt-0.5 inline-block w-fit rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
            item.badge === "New" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-orange-500/15 text-orange-600 dark:text-orange-400",
          )}>
            {item.badge}
          </span>
        )}
      </span>
      <ArrowRight className="size-3.5 shrink-0 -translate-x-1 text-muted-foreground/0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-muted-foreground/70" />
    </>
  );

  const className = "group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-foreground/90 transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-white/50 dark:hover:bg-white/[0.06]";

  if (item.action === "incinc") {
    return (
      <button type="button" onClick={() => { window.dispatchEvent(new Event("incinc:open")); onNavigate?.(); }} className={cn(className, "w-full text-left")}>
        {inner}
      </button>
    );
  }
  if (!item.href) return null;
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onNavigate}>{inner}</a>
  ) : (
    <Link href={item.href} className={className} onClick={onNavigate}>{inner}</Link>
  );
}

const CHIP_ICONS = [Flame, ArrowUpRight, Star, Sparkles];

function TrendingChip({ item, index, onNavigate }: { item: MegaMenuLink; index: number; onNavigate?: () => void }) {
  const ChipIcon = CHIP_ICONS[index % CHIP_ICONS.length];
  if (item.comingSoon || (!item.href && item.action !== "incinc")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/30 px-3 py-1.5 text-xs text-muted-foreground/50 dark:border-white/5 dark:bg-white/5">
        <ChipIcon className="size-3" /> {item.label}
      </span>
    );
  }
  const content = (
    <>
      <ChipIcon className="size-3" />
      <span className="max-w-[9rem] truncate">{item.description ?? item.label}</span>
      {item.badge && <span className="text-[9px] font-semibold uppercase tracking-wide opacity-70">{item.badge}</span>}
    </>
  );
  const className = "group inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/50 px-3 py-1.5 text-xs font-medium text-foreground/90 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-primary/30 hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10";
  return item.href ? (
    <Link href={item.href} className={className} onClick={onNavigate}>{content}</Link>
  ) : (
    <button type="button" onClick={() => { window.dispatchEvent(new Event("incinc:open")); onNavigate?.(); }} className={className}>{content}</button>
  );
}

function ColumnCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  const theme = themeFor(title);
  return (
    <div className="mega-card min-w-[175px] p-3.5">
      <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
        <span className={cn("grid size-6 place-items-center rounded-lg", theme.bg, theme.fg)}>
          <Icon name={icon} className="size-3.5" />
        </span>
        {title}
      </p>
      {children}
    </div>
  );
}

function HeroCard({ menu, onNavigate }: { menu: MegaMenuConfig; onNavigate?: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-violet-500/20 via-primary/15 to-blue-500/10 p-5 dark:border-white/10">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/30 blur-2xl"
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute size-1 rounded-full bg-primary/60"
          style={{ left: `${30 + i * 22}%`, top: `${20 + i * 15}%` }}
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}
      <span className="relative inline-flex items-center gap-1 text-xs font-semibold text-primary">{menu.featured.eyebrow}</span>
      <p className="relative mt-2 text-lg font-bold tracking-tight">{menu.featured.title}</p>
      <p className="relative mt-1 text-sm text-muted-foreground">{menu.featured.subtitle}</p>
      {menu.featured.action === "incinc" ? (
        <button
          type="button"
          onClick={() => { window.dispatchEvent(new Event("incinc:open")); onNavigate?.(); }}
          className="relative mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-200 hover:scale-[1.03]"
        >
          <Sparkles className="size-3.5" /> {menu.featured.cta}
        </button>
      ) : (
        <Link
          href={menu.featured.href ?? "#"}
          onClick={onNavigate}
          className="relative mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-200 hover:scale-[1.03]"
        >
          {menu.featured.cta} <ArrowRight className="size-3.5" />
        </Link>
      )}
    </div>
  );
}

function DiscoverCard({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <button
      type="button"
      onClick={() => { window.dispatchEvent(new Event("incinc:open")); onNavigate?.(); }}
      className="mega-card group w-full p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01]"
    >
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary"><Compass className="size-3.5" /> Don&apos;t know where to start?</span>
      <p className="mt-1.5 text-sm font-semibold">Ask Incinc AI</p>
      <p className="mt-1 text-xs text-muted-foreground">Describe what you need — we&apos;ll recommend the perfect tools.</p>
      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
        Start Discovering <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}

const COLUMN_GRID: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function MegaMenuPanel({ menu, onNavigate }: { menu: MegaMenuConfig; onNavigate?: () => void }) {
  const isChipColumn = (title: string) => title === "Featured";

  return (
    <div className="mega-glow grid gap-5 p-5 lg:grid-cols-[1fr_auto] lg:gap-5">
      <div className={cn("grid gap-3", COLUMN_GRID[menu.columns.length] ?? "sm:grid-cols-2")}>
        {menu.columns.map((col) => (
          <ColumnCard key={col.title} title={col.title} icon={col.icon}>
            {isChipColumn(col.title) ? (
              <div className="flex flex-wrap gap-1.5">
                {col.groups.flatMap((g) => g.items).map((item, i) => (
                  <TrendingChip key={item.label} item={item} index={i} onNavigate={onNavigate} />
                ))}
              </div>
            ) : (
              col.groups.map((group, gi) => (
                <div key={gi} className={gi > 0 ? "mt-4" : ""}>
                  {group.title && gi > 0 && <div className="mega-divider mb-2 h-px" aria-hidden />}
                  {group.title && <p className="mb-1.5 px-2.5 text-[11px] font-semibold text-muted-foreground/70">{group.title}</p>}
                  <div className="space-y-0.5">
                    {group.items.map((item) => (
                      <LinkRow key={item.label} item={item} onNavigate={onNavigate} showCategoryIcon={col.title === "Categories"} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </ColumnCard>
        ))}
      </div>

      <div className="flex w-full flex-col gap-3 lg:w-64">
        <HeroCard menu={menu} onNavigate={onNavigate} />
        {menu.featured.action !== "incinc" && <DiscoverCard onNavigate={onNavigate} />}

        <div className="mega-divider h-px" aria-hidden />

        <div className="flex flex-wrap gap-1.5">
          {menu.quickAccess.map((item) =>
            item.href ? (
              item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className="rounded-full border border-white/50 bg-white/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground dark:border-white/10 dark:bg-white/5">
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} onClick={onNavigate} className="rounded-full border border-white/50 bg-white/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground dark:border-white/10 dark:bg-white/5">
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
