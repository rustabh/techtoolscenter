"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Clock, Gauge, ArrowRight } from "lucide-react";
import { challenges } from "@/lib/home/challenges";
import { pickForDay } from "@/lib/home/daily";

const diffTint: Record<string, string> = {
  Easy: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Medium: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Fun: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
};

/** Today's Challenge card — rotates once per day and links to the tool. */
export function TodaysChallenge({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const c = pickForDay(challenges, 0);

  return (
    <div className={`glass relative overflow-hidden rounded-2xl p-5 shadow-lg ${className}`} style={{ minHeight: 180 }}>
      <div className="pointer-events-none absolute -left-8 -bottom-8 size-28 rounded-full bg-primary/10 blur-2xl" aria-hidden />
      {mounted ? (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Target className="size-4" /> Today&apos;s Challenge
          </span>
          <h3 className="mt-3 text-lg font-bold tracking-tight">{c.title}</h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${diffTint[c.difficulty]}`}>
              <Gauge className="size-3" /> {c.difficulty}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
              <Clock className="size-3" /> {c.time}
            </span>
          </div>
          <Link
            href={`/tools/${c.toolSlug}`}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Try Now <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      ) : (
        <div className="animate-pulse space-y-3" aria-hidden>
          <div className="h-4 w-36 rounded bg-secondary" />
          <div className="mt-4 h-6 w-3/4 rounded bg-secondary" />
          <div className="h-8 w-40 rounded-full bg-secondary" />
        </div>
      )}
    </div>
  );
}
