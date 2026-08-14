"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const openSearch = () => window.dispatchEvent(new Event("ttc:open-command"));
  const openMenu = () => window.dispatchEvent(new Event("ttc:open-mobile-menu"));

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/90 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-4">
        <Link
          href="/"
          aria-current={isHome ? "page" : undefined}
          className={cn(
            "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors active:scale-95",
            isHome ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Home className={cn("size-5", isHome && "fill-primary/15")} />
          Home
        </Link>
        <Link
          href="/tools"
          aria-current={isTools ? "page" : undefined}
          className={cn(
            "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors active:scale-95",
            isTools ? "text-primary" : "text-muted-foreground"
          )}
        >
          <LayoutGrid className={cn("size-5", isTools && "fill-primary/15")} />
          Tools
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
