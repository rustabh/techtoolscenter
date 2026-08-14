"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, LayoutGrid, Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

// Feature-detected — most Android browsers support it, iOS Safari never has
// and just silently no-ops, so this is safe to fire unconditionally.
function tap() {
  navigator.vibrate?.(8);
}

/**
 * Persistent bottom tab bar, mobile only — the single most recognizable
 * "this is an app, not a website" UI pattern, and one the site was missing
 * entirely (mobile only had a top hamburger menu). Reuses the same
 * window-event conventions already used elsewhere (ttc:open-command for
 * search, a matching ttc:open-mobile-menu for the drawer) rather than
 * threading new shared state through the component tree.
 */
export function MobileBottomNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isTools = pathname?.startsWith("/tools") ?? false;
  const activeTab = isHome ? "home" : isTools ? "tools" : null;

  const openSearch = () => { tap(); window.dispatchEvent(new Event("ttc:open-command")); };
  const openMenu = () => { tap(); window.dispatchEvent(new Event("ttc:open-mobile-menu")); };

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/90 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-4">
        <Link
          href="/"
          onClick={tap}
          aria-current={isHome ? "page" : undefined}
          className="relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground transition-colors active:scale-95"
        >
          {activeTab === "home" && (
            <motion.span
              layoutId="bottom-tab-indicator"
              className="absolute inset-x-3 top-1 h-8 rounded-xl bg-primary/10"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <Home className={cn("relative size-5", isHome && "text-primary fill-primary/15")} />
          <span className={cn("relative", isHome && "text-primary")}>Home</span>
        </Link>
        <Link
          href="/tools"
          onClick={tap}
          aria-current={isTools ? "page" : undefined}
          className="relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground transition-colors active:scale-95"
        >
          {activeTab === "tools" && (
            <motion.span
              layoutId="bottom-tab-indicator"
              className="absolute inset-x-3 top-1 h-8 rounded-xl bg-primary/10"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <LayoutGrid className={cn("relative size-5", isTools && "text-primary fill-primary/15")} />
          <span className={cn("relative", isTools && "text-primary")}>Tools</span>
        </Link>
        <button
          type="button"
          onClick={openSearch}
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground transition-colors active:scale-95"
        >
          <Search className="size-5" />
          Search
        </button>
        <button
          type="button"
          onClick={openMenu}
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground transition-colors active:scale-95"
        >
          <Menu className="size-5" />
          Menu
        </button>
      </div>
    </nav>
  );
}
