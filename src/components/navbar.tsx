"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavMegaItem } from "@/components/navbar/nav-mega-item";
import { MegaMenuPanel } from "@/components/navbar/mega-menu-panel";
import { MobileNavDrawer } from "@/components/navbar/mobile-nav-drawer";
import { megaMenus } from "@/lib/megamenu/config";

const CLOSE_DELAY = 150;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }
  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setActiveMenu(null), CLOSE_DELAY);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveMenu(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = megaMenus.find((m) => m.id === activeMenu) ?? null;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-x-0 border-t-0">
        <nav className="container-tight relative flex h-16 items-center justify-between" aria-label="Main">
          <Link href="/" aria-label="TechToolsCenter home">
            <Logo />
          </Link>

          <div
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={scheduleClose}
          >
            {megaMenus.map((menu) => (
              <NavMegaItem
                key={menu.id}
                menu={menu}
                active={activeMenu === menu.id}
                onActivate={() => { cancelClose(); setActiveMenu(menu.id); }}
                onClose={() => setActiveMenu((cur) => (cur === menu.id ? null : cur))}
              />
            ))}

            <AnimatePresence>
              {active && (
                <motion.div
                  key="mega-dim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-none fixed inset-0 z-30 bg-black/[0.1] dark:bg-black/[0.35]"
                  aria-hidden
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {active && (
                <div
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                  className="fixed left-1/2 top-16 z-40 mt-2 w-[min(96vw,1040px)] -translate-x-1/2"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="mega-glass overflow-hidden rounded-[28px]"
                    role="menu"
                  >
                    <MegaMenuPanel menu={active} onNavigate={() => setActiveMenu(null)} />
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => window.dispatchEvent(new Event("ttc:open-command"))}
              aria-label="Search everything (Ctrl+K or /)"
              className="hidden items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary sm:flex"
            >
              <Search className="size-4" />
              <span>Search</span>
              <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
            </button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </nav>
      </div>

      <MobileNavDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
