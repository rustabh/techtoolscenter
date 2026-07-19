"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { finderGoals, type FinderGoal } from "@/lib/india/finder";
import { getIndiaService } from "@/lib/india/services";
import { cn } from "@/lib/utils";

export function ServiceFinder() {
  const [goal, setGoal] = useState<FinderGoal | null>(null);

  const services = goal
    ? goal.serviceSlugs.map(getIndiaService).filter((s): s is NonNullable<typeof s> => !!s)
    : [];

  return (
    <div>
      <AnimatePresence mode="wait">
        {!goal ? (
          <motion.div
            key="goals"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <h2 className="mb-1 text-lg font-semibold">What do you need it for?</h2>
            <p className="mb-5 text-sm text-muted-foreground">Pick your goal and we&apos;ll show the exact documents & services to apply for.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {finderGoals.map((g) => (
                <button
                  key={g.slug}
                  onClick={() => setGoal(g)}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-xl">{g.icon}</span>
                  <span className="text-sm font-medium group-hover:text-primary">{g.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm">
                  <span className="text-base">{goal.icon}</span> {goal.label}
                </span>
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{goal.intro}</p>
              </div>
              <button
                onClick={() => setGoal(null)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary"
              >
                <RotateCcw className="size-3.5" /> Start over
              </button>
            </div>

            <h3 className="mb-3 mt-6 text-sm font-semibold text-muted-foreground">You&apos;ll likely need:</h3>
            <ol className="space-y-3">
              {services.map((s, i) => (
                <li key={s.slug}>
                  <Link
                    href={`/india-services/${s.category}/${s.slug}`}
                    className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <span className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold",
                      i === 0 ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
                    )}>
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium group-hover:text-primary">{s.name}</span>
                      <span className="mt-0.5 block line-clamp-2 text-sm text-muted-foreground">{s.overview}</span>
                      <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-primary">
                        Full guide <ArrowRight className="size-3" />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>

            <p className="mt-5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <ExternalLink className="size-3.5" />
              Each guide links to the official government website. We are an educational directory, not a government body.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
