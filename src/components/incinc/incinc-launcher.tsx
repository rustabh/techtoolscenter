"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { IncincPanel } from "./incinc-panel";

export function IncincLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>{open && <IncincPanel onClose={() => setOpen(false)} />}</AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Incinc AI" : "Open Incinc AI"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="glass fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full px-4 py-3 shadow-lg ring-1 ring-primary/20 sm:right-6"
      >
        <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-primary/20 blur-xl" />
        <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="size-3.5" />
              </motion.span>
            ) : (
              <motion.span key="sparkles" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Sparkles className="size-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span className="hidden text-sm font-semibold sm:inline">Incinc AI</span>
      </motion.button>
    </>
  );
}
