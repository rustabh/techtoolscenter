"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { categories } from "@/lib/tools";
import { cn } from "@/lib/utils";

const links = [
  { href: "/tools", label: "All Tools" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/#categories", label: "Categories" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-x-0 border-t-0">
        <nav className="container-tight flex h-16 items-center justify-between" aria-label="Main">
          <Link href="/" aria-label="TechToolsCenter home">
            <Logo />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => window.dispatchEvent(new Event("ttc:open-command"))}
              aria-label="Search tools (Command K)"
              className="hidden items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary sm:flex"
            >
              <Search className="size-4" />
              <span>Search</span>
              <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
            </button>
            <ThemeToggle />
            <Link href="/tools" className={cn(buttonVariants(), "hidden md:inline-flex")}>
              Explore tools
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass overflow-hidden border-x-0 border-t-0 md:hidden"
          >
            <div className="container-tight space-y-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/category/${c.id.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className={cn("rounded-xl bg-secondary px-3 py-2 text-xs font-medium")}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
