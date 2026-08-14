"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Every homepage section (and most other pages) goes through this component,
// so a missing prefers-reduced-motion check here is a site-wide accessibility
// gap, not a one-off — the 20px slide-up + fade is exactly the kind of motion
// WCAG 2.3.3 asks sites to suppress for users who've asked their OS not to
// animate content, since it can trigger real vestibular discomfort.
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
