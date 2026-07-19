"use client";

import { useRef, useState } from "react";

/** Interactive before/after image comparison slider. */
export function CompareSlider({ before, after, beforeLabel = "Original", afterLabel = "Result" }: {
  before: string; after: string; beforeLabel?: string; afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-video w-full select-none overflow-hidden rounded-xl border border-border bg-secondary/40"
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onClick={(e) => move(e.clientX)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={afterLabel} className="absolute inset-0 size-full object-contain" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt={beforeLabel} className="absolute inset-0 h-full object-contain" style={{ width: ref.current?.clientWidth ?? "100%", maxWidth: "none" }} draggable={false} />
        <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">{beforeLabel}</span>
      </div>
      <span className="absolute right-2 top-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">{afterLabel}</span>
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow" />
        <div className="absolute top-1/2 -ml-4 -mt-4 grid size-8 place-items-center rounded-full border-2 border-white bg-primary text-white shadow-lg">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5" /></svg>
        </div>
      </div>
    </div>
  );
}
