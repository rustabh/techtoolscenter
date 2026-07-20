"use client";

import { useEffect, useState } from "react";
import { greetingFor } from "@/lib/home/daily";

/** Small time-based greeting shown above the hero heading. */
export function DailyGreeting() {
  const [g, setG] = useState<{ text: string; emoji: string } | null>(null);
  useEffect(() => setG(greetingFor()), []);

  // Reserve a line of height to avoid layout shift before mount.
  return (
    <p className="mb-3 h-5 text-sm font-medium text-muted-foreground">
      {g ? (
        <>
          {g.text} {g.emoji}
        </>
      ) : null}
    </p>
  );
}
