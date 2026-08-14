"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Next's template.tsx convention remounts on every navigation (unlike
// layout.tsx, which persists) — giving every route change a brief, cheap
// enter transition without needing AnimatePresence + exit-animation timing
// coordinated across 200+ routes. Kept short and GPU-cheap (opacity +
// transform only) so it reads as a native screen transition rather than a
// loading delay, and skipped entirely under prefers-reduced-motion.
export default function Template({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
