"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CLIENT = "ca-pub-8948395080060177";
// Configure real ad-unit slot IDs from your AdSense dashboard via env.
// Until a slot is provided the component renders nothing — no empty boxes.
const DEFAULT_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

interface Props {
  slot?: string;
  className?: string;
  /** Reserved height to prevent layout shift before the ad loads. */
  minHeight?: number;
}

/**
 * Premium, non-intrusive AdSense unit.
 * - Lazy-loaded via IntersectionObserver (only when near the viewport)
 * - Reserves space to prevent CLS
 * - Auto-hides when the ad is unfilled (never shows an empty box)
 * - Elegant "Sponsored" label, rounded container, theme-aware, responsive
 */
export function PremiumAd({ slot = DEFAULT_SLOT, className, minHeight = 120 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!slot) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || pushed.current) return;
        pushed.current = true;
        io.disconnect();
        try {
          const w = window as unknown as { adsbygoogle?: unknown[] };
          (w.adsbygoogle = w.adsbygoogle || []).push({});
        } catch {
          /* script blocked or not ready */
        }
        // Collapse gracefully if the slot comes back unfilled — keeps it premium.
        let tries = 0;
        const check = () => {
          const status = insRef.current?.getAttribute("data-ad-status");
          if (status === "unfilled") setHidden(true);
          else if (status !== "filled" && tries++ < 12) setTimeout(check, 400);
        };
        setTimeout(check, 800);
      },
      { rootMargin: "320px" }, // start loading before it enters the viewport
    );
    io.observe(el);
    return () => io.disconnect();
  }, [slot]);

  // No slot configured, or the ad was unfilled → render nothing at all.
  if (!slot || hidden) return null;

  return (
    <div ref={containerRef} className={cn("mx-auto w-full max-w-3xl px-4 py-10 sm:py-14", className)} aria-label="Advertisement">
      <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
        Sponsored
      </p>
      <div
        className="overflow-hidden rounded-2xl border border-border/50 bg-muted/20 p-2"
        style={{ minHeight }}
      >
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
