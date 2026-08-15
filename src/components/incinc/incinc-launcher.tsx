"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { IncincPanel } from "./incinc-panel";

export function IncincLauncher() {
  const [open, setOpen] = useState(false);

  // Lets other UI (e.g. the Workspace sidebar's "Workflow Hub") open Incinc AI.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("incinc:open", onOpen);
    return () => window.removeEventListener("incinc:open", onOpen);
  }, []);

  return (
    <>
      <AnimatePresence>{open && <IncincPanel onClose={() => setOpen(false)} />}</AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Incinc AI" : "Open Incinc AI"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="glass fixed bottom-[calc(6.5rem+env(safe-area-inset-bottom))] right-4 z-50 flex items-center gap-2 rounded-full px-4 py-3 shadow-lg ring-1 ring-primary/20 md:bottom-4 md:right-6"
      >
        {/* Glow is inset (not inset-0) + a softer blur so it can't visually
            bleed onto the mobile tab bar even with only ~1.5rem of clearance
            below this button — a full inset-0 + blur-xl halo extends well
            past the button's own edges regardless of how much bottom offset
            is added. */}
        <span className="absolute inset-2 -z-10 animate-pulse rounded-full bg-primary/20 blur-md" />
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
