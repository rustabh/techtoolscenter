"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Search, Sparkles, X, ExternalLink } from "lucide-react";
import { Icon } from "@/components/icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { megaMenus } from "@/lib/megamenu/config";
import type { MegaMenuConfig } from "@/lib/megamenu/types";
import { cn } from "@/lib/utils";

function MobileSection({ menu, open, onToggle, onNavigate }: { menu: MegaMenuConfig; open: boolean; onToggle: () => void; onNavigate: () => void }) {
  return (
    <div className="border-b border-border/60">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-2 py-3.5 text-left"
      >
        <Link href={menu.href} onClick={(e) => { e.stopPropagation(); onNavigate(); }} className="text-base font-semibold">
          {menu.label}
        </Link>
        {open ? <ChevronDown className="size-4 text-muted-foreground" /> : <ChevronRight className="size-4 text-muted-foreground" />}
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
            <div className="space-y-4 pb-4">
              {menu.columns.map((col) => (
                <div key={col.title}>
                  <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <Icon name={col.icon} className="size-3.5" /> {col.title}
                  </p>
                  {col.groups.map((group, gi) => (
                    <div key={gi} className={gi > 0 ? "mt-2" : ""}>
                      {group.title && <p className="mb-1 text-[11px] font-medium text-muted-foreground/80">{group.title}</p>}
                      <div className="grid grid-cols-2 gap-1.5">
                        {group.items.map((item) =>
                          item.comingSoon ? (
                            <span key={item.label} className="rounded-lg px-2 py-1.5 text-sm text-muted-foreground/50">{item.label}</span>
                          ) : item.action === "incinc" ? (
                            <button
                              key={item.label}
                              type="button"
                              onClick={() => { window.dispatchEvent(new Event("incinc:open")); onNavigate(); }}
                              className="rounded-lg px-2 py-1.5 text-left text-sm hover:bg-secondary/60"
                            >
                              {item.label}
                            </button>
                          ) : item.href ? (
                            item.external ? (
                              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary/60">
                                {item.label} <ExternalLink className="size-3 text-muted-foreground" />
                              </a>
                            ) : (
                              <Link key={item.label} href={item.href} onClick={onNavigate} className="rounded-lg px-2 py-1.5 text-sm hover:bg-secondary/60">
                                {item.label}
                              </Link>
                            )
                          ) : null,
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileNavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex flex-col bg-background md:hidden"
        >
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-4">
            <p className="text-lg font-bold">Menu</p>
            <button type="button" onClick={onClose} aria-label="Close menu" className="rounded-full p-2 hover:bg-secondary">
              <X className="size-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              window.dispatchEvent(new Event("ttc:open-command"));
            }}
            className="mx-4 mt-4 flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground"
          >
            <Search className="size-4" /> Search everything…
          </button>

          <div className="flex-1 overflow-y-auto px-4 pt-4">
            {megaMenus.map((menu) => (
              <MobileSection
                key={menu.id}
                menu={menu}
                open={openSection === menu.id}
                onToggle={() => setOpenSection((s) => (s === menu.id ? null : menu.id))}
                onNavigate={onClose}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-border/60 px-4 py-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                window.dispatchEvent(new Event("incinc:open"));
              }}
              className={cn("flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground")}
            >
              <Sparkles className="size-4" /> Incinc AI
            </button>
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
