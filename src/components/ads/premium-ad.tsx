"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CLIENT = "ca-pub-8948395080060177";
// "TTC Responsive" ad unit — powers every placement/shape by default. Override
// per-shape with NEXT_PUBLIC_ADSENSE_SLOT[_RECTANGLE|_VERTICAL] env vars if you
// create dedicated units later.
const SLOT_DEFAULT = "6988078158";
const SLOT_INLINE = process.env.NEXT_PUBLIC_ADSENSE_SLOT || SLOT_DEFAULT;
const SLOT_RECT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE || SLOT_INLINE;
const SLOT_VERT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_VERTICAL || SLOT_INLINE;

export type AdVariant = "inline" | "rectangle" | "vertical";

interface Props {
  variant?: AdVariant;
  slot?: string;
  className?: string;
}

const CONFIG: Record<AdVariant, { slot?: string; adFormat: string; responsive: boolean; minHeight: number; wrap: string; insStyle: React.CSSProperties }> = {
  // Full-width responsive banner — the default, used at section breaks.
  inline: { slot: SLOT_INLINE, adFormat: "auto", responsive: true, minHeight: 120, wrap: "mx-auto w-full max-w-3xl", insStyle: { display: "block" } },
  // Compact in-content rectangle — for tighter spots.
  rectangle: { slot: SLOT_RECT, adFormat: "rectangle", responsive: true, minHeight: 260, wrap: "mx-auto w-full max-w-sm", insStyle: { display: "block" } },
  // Vertical skyscraper — desktop sidebars only (sticky).
  vertical: { slot: SLOT_VERT, adFormat: "vertical", responsive: false, minHeight: 600, wrap: "w-full", insStyle: { display: "block", width: 300, height: 600 } },
};

/**
 * Premium, non-intrusive AdSense unit with three shapes (inline / rectangle /
 * vertical). Lazy-loaded via IntersectionObserver, reserves space (no CLS),
 * auto-hides when unfilled, elegant "Sponsored" label, theme-aware & responsive.
 */
export function PremiumAd({ variant = "inline", slot, className }: Props) {
  const cfg = CONFIG[variant];
  const activeSlot = slot ?? cfg.slot;
  const containerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!activeSlot) return;
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
        let tries = 0;
        const check = () => {
          const status = insRef.current?.getAttribute("data-ad-status");
          if (status === "unfilled") setHidden(true);
          else if (status !== "filled" && tries++ < 12) setTimeout(check, 400);
        };
        setTimeout(check, 800);
      },
      { rootMargin: "320px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [activeSlot]);

  if (!activeSlot || hidden) return null;

  return (
    <div
      ref={containerRef}
      aria-label="Advertisement"
      className={cn(cfg.wrap, variant === "vertical" ? "" : "px-4 py-10 sm:py-14", className)}
    >
      <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">Sponsored</p>
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-muted/20 p-2" style={{ minHeight: cfg.minHeight }}>
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={cfg.insStyle}
          data-ad-client={CLIENT}
          data-ad-slot={activeSlot}
          data-ad-format={cfg.adFormat}
          {...(cfg.responsive ? { "data-full-width-responsive": "true" } : {})}
        />
      </div>
    </div>
  );
}
