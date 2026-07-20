"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Quote as QuoteIcon, Lightbulb } from "lucide-react";
import { quotes, productivityTips } from "@/lib/home/quotes";
import { pickForDay, greetingFor, formatToday } from "@/lib/home/daily";

/**
 * Daily Inspiration glass card — greeting, the quote of the day, its author,
 * the current day/date, and a productivity tip. Time-based, so it renders
 * client-side after mount (with reserved space to avoid layout shift).
 */
export function DailyInspiration({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const quote = pickForDay(quotes, 0);
  const tip = pickForDay(productivityTips, 3);
  const greeting = greetingFor();
  const today = formatToday();

  return (
    <div className={`glass relative overflow-hidden rounded-2xl p-5 text-left shadow-lg ${className}`} style={{ minHeight: 260 }}>
      <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/10 blur-2xl" aria-hidden />
      {mounted ? (
        <>
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              <Sparkles className="size-4" /> Daily Inspiration
            </span>
            <span className="text-xs text-muted-foreground">{today.day}</span>
          </div>

          <p className="mt-1 text-sm font-medium">
            {greeting.text} {greeting.emoji}
          </p>
          <p className="text-xs text-muted-foreground">{today.date}</p>

          <AnimatePresence mode="wait">
            <motion.figure
              key={quote.text}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mt-4"
            >
              <QuoteIcon className="size-4 text-primary/60" />
              <blockquote className="mt-1 text-sm leading-relaxed">{quote.text}</blockquote>
              <figcaption className="mt-2 text-xs font-medium text-muted-foreground">— {quote.author} · {quote.category}</figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Lightbulb className="size-3.5 text-amber-500" /> Productivity Tip of the Day
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{tip}</p>
          </div>
        </>
      ) : (
        // Skeleton keeps the same height so there is no layout shift.
        <div className="animate-pulse space-y-3" aria-hidden>
          <div className="h-4 w-32 rounded bg-secondary" />
          <div className="h-3 w-24 rounded bg-secondary" />
          <div className="mt-6 h-3 w-full rounded bg-secondary" />
          <div className="h-3 w-5/6 rounded bg-secondary" />
          <div className="mt-6 h-12 w-full rounded-xl bg-secondary" />
        </div>
      )}
    </div>
  );
}
