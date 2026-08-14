"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, ArrowRight } from "lucide-react";

// Bump the id whenever the message changes so returning users see it again.
const CURRENT = {
  id: "useful-websites-2026-08",
  text: "Useful Websites — a hand-picked directory of free sites that complement our tools",
  href: "/useful-websites",
};
const KEY = "ttc:whatsnew-dismissed";

/** Compact, dismissible "What's New" banner. Dismissal is remembered per message. */
export function WhatsNewBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let dismissed: string | null = null;
    try { dismissed = localStorage.getItem(KEY); } catch { /* ignore */ }
    if (dismissed !== CURRENT.id) setShow(true);
  }, []);

  const dismiss = () => {
    try { localStorage.setItem(KEY, CURRENT.id); } catch { /* ignore */ }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="container-tight"
        >
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" /> New
            </span>
            <Link href={CURRENT.href} className="group flex min-w-0 flex-1 items-center gap-1 text-sm">
              <span className="truncate">{CURRENT.text}</span>
              <ArrowRight className="size-3.5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button onClick={dismiss} aria-label="Dismiss" className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
