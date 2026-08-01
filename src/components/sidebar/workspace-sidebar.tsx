"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown, ChevronRight, ChevronLeft, PanelLeftOpen, Star, Clock, Flame,
  Menu, X, ExternalLink, Sun, Moon,
} from "lucide-react";
import { Icon } from "@/components/icon";
import { sidebarSections, type SidebarLink } from "@/lib/sidebar/config";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import { useSidebarDynamic, type SidebarLinkItem } from "@/hooks/use-sidebar-dynamic";
import { KeyboardShortcutsDialog } from "./keyboard-shortcuts-dialog";
import { AiToolOfWeekWidget, RecentlyAddedToolWidget, GovernmentUpdateWidget, LatestBlogWidget, DailyFooterWidgets } from "./sidebar-widgets";

const SECTION_WIDGETS: Record<string, React.ComponentType> = {
  productivity: RecentlyAddedToolWidget,
  ai: AiToolOfWeekWidget,
  india: GovernmentUpdateWidget,
  learning: LatestBlogWidget,
};

function DynamicRow({ item }: { item: SidebarLinkItem }) {
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary/60">
      <span className="truncate">{item.label}</span>
      <ExternalLink className="size-3 shrink-0 text-muted-foreground" />
    </a>
  ) : (
    <Link href={item.href} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary/60">
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function DynamicSection({ label, icon, items, emptyHint }: { label: string; icon: React.ReactNode; items: SidebarLinkItem[]; emptyHint: string }) {
  return (
    <div>
      <p className="mb-1 flex items-center gap-1.5 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {icon} {label}
      </p>
      {items.length > 0 ? (
        <div className="space-y-0.5">{items.map((item) => <DynamicRow key={item.key} item={item} />)}</div>
      ) : (
        <p className="px-2 py-1 text-xs text-muted-foreground/70">{emptyHint}</p>
      )}
    </div>
  );
}

function ThemeItemRow({ onAction }: { onAction: (a: "theme") => void }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = mounted ? (theme === "system" ? resolvedTheme : theme) : undefined;
  return (
    <button
      type="button"
      onClick={() => onAction("theme")}
      className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-secondary/60"
    >
      <span className="truncate">Theme</span>
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        {current === "dark" ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
        {current ? (current === "dark" ? "Dark" : "Light") : ""}
      </span>
    </button>
  );
}

function ItemRow({ item, onAction, onNavigate }: { item: SidebarLink; onAction: (a: NonNullable<SidebarLink["action"]>) => void; onNavigate?: () => void }) {
  if (item.comingSoon) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground/60">
        <span className="truncate">{item.label}</span>
        <span className="shrink-0 rounded-full bg-secondary/70 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide">Soon</span>
      </div>
    );
  }
  if (item.action === "theme") {
    return <ThemeItemRow onAction={onAction} />;
  }
  if (item.action) {
    return (
      <button
        type="button"
        onClick={() => onAction(item.action!)}
        className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-secondary/60"
      >
        <span className="truncate">{item.label}</span>
      </button>
    );
  }
  if (!item.href) return null;
  const isExternal = item.href.startsWith("http");
  if (isExternal) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary/60">
        <span className="truncate">{item.label}</span>
        <ExternalLink className="size-3 shrink-0 text-muted-foreground" />
      </a>
    );
  }
  return (
    <Link href={item.href} onClick={onNavigate} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary/60">
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function CategorySection({
  sectionId, emoji, label, icon, items, open, onToggle, onAction, onNavigate,
}: {
  sectionId: string; emoji: string; label: string; icon: string; items: SidebarLink[];
  open: boolean; onToggle: () => void; onAction: (a: NonNullable<SidebarLink["action"]>) => void; onNavigate?: () => void;
}) {
  const Widget = SECTION_WIDGETS[sectionId];
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm font-semibold hover:bg-secondary/50"
      >
        <span className="flex items-center gap-2">
          <span aria-hidden>{emoji}</span>
          <Icon name={icon} className="size-3.5 text-muted-foreground" />
          {label}
        </span>
        {open ? <ChevronDown className="size-3.5 text-muted-foreground" /> : <ChevronRight className="size-3.5 text-muted-foreground" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-1 space-y-0.5 border-l border-border/50 pl-3">
              {items.map((item) => <ItemRow key={item.label} item={item} onAction={onAction} onNavigate={onNavigate} />)}
              {Widget && (
                <div className="pt-1.5">
                  <Widget />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarContent({
  openSections, toggleSection, onAction, onNavigate,
}: {
  openSections: string[]; toggleSection: (id: string) => void; onAction: (a: NonNullable<SidebarLink["action"]>) => void; onNavigate?: () => void;
}) {
  const { favoriteItems, recentItems, trendingItems } = useSidebarDynamic();
  const { theme, setTheme } = useTheme();

  function handleAction(action: NonNullable<SidebarLink["action"]>) {
    if (action === "theme") {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }
    onAction(action);
  }

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-3">
      <DynamicSection label="Favorites" icon={<Star className="size-3" />} items={favoriteItems} emptyHint="Star a tool to pin it here." />
      <DynamicSection label="Recently Used" icon={<Clock className="size-3" />} items={recentItems} emptyHint="Tools you open will show up here." />
      <DynamicSection label="Trending" icon={<Flame className="size-3" />} items={trendingItems} emptyHint="Nothing trending yet." />

      <div className="h-px bg-border/60" />

      <div className="space-y-1">
        {sidebarSections.map((section) => (
          <CategorySection
            key={section.id}
            sectionId={section.id}
            emoji={section.emoji}
            label={section.label}
            icon={section.icon}
            items={section.items}
            open={openSections.includes(section.id)}
            onToggle={() => toggleSection(section.id)}
            onAction={handleAction}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      <div className="h-px bg-border/60" />

      <DailyFooterWidgets />
    </div>
  );
}

export function WorkspaceSidebar() {
  const { mounted, collapsed, setCollapsed, mobileOpen, setMobileOpen, openSections, toggleSection } = useSidebarState();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [hovering, setHovering] = useState(false);

  if (!mounted) return null;

  function handleAction(action: NonNullable<SidebarLink["action"]>) {
    if (action === "command-palette") window.dispatchEvent(new Event("ttc:open-command"));
    if (action === "incinc") window.dispatchEvent(new Event("incinc:open"));
    if (action === "shortcuts") setShortcutsOpen(true);
  }

  // Pinned-open (collapsed=false) always shows the panel. Otherwise, hovering
  // the rail "peeks" it open without changing the persisted pinned state.
  const visualExpanded = !collapsed || hovering;

  return (
    <>
      <KeyboardShortcutsDialog open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />

      {/* Desktop: full-height floating rail (collapsed) or panel (expanded/peeked) */}
      <div className="hidden md:block">
        {!visualExpanded ? (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="glass fixed left-4 top-20 bottom-4 z-40 flex w-14 flex-col items-center gap-1 overflow-y-auto rounded-2xl py-3 shadow-lg"
          >
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              aria-label="Pin Workspace sidebar open"
              title="Pin sidebar open (Ctrl+B)"
              className="grid size-9 shrink-0 place-items-center rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <PanelLeftOpen className="size-4" />
            </button>
            <div className="my-1 h-px w-6 shrink-0 bg-border/60" />
            {sidebarSections.map((section) => (
              <button
                key={section.id}
                type="button"
                title={section.label}
                onClick={() => {
                  setCollapsed(false);
                  if (!openSections.includes(section.id)) toggleSection(section.id);
                }}
                className="grid size-9 shrink-0 place-items-center rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Icon name={section.icon} className="size-4" />
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -12, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", damping: 28, stiffness: 340 }}
            onMouseLeave={() => collapsed && setHovering(false)}
            className="glass fixed left-4 top-20 bottom-4 z-40 flex w-[300px] flex-col rounded-2xl shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-3 py-3">
              <p className="text-sm font-bold">Workspace</p>
              <div className="flex items-center gap-1">
                {collapsed && (
                  <span className="rounded-full bg-secondary/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">Preview</span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setCollapsed(true);
                    setHovering(false);
                  }}
                  aria-label="Collapse Workspace sidebar"
                  title={collapsed ? "Pin sidebar closed" : "Collapse sidebar (Ctrl+B)"}
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <ChevronLeft className="size-4" />
                </button>
              </div>
            </div>
            <SidebarContent openSections={openSections} toggleSection={toggleSection} onAction={handleAction} />
          </motion.div>
        )}
      </div>

      {/* Mobile: floating trigger + slide-over drawer */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open Workspace sidebar"
          className="glass fixed bottom-4 left-4 z-40 grid size-12 place-items-center rounded-full shadow-lg"
        >
          <Menu className="size-5" />
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/40"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                className="glass fixed inset-y-0 left-0 z-[61] flex w-[85vw] max-w-sm flex-col rounded-none shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-border/60 px-4 py-4">
                  <p className="text-base font-bold">Workspace</p>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close"
                    className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <SidebarContent
                  openSections={openSections}
                  toggleSection={toggleSection}
                  onAction={handleAction}
                  onNavigate={() => setMobileOpen(false)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
