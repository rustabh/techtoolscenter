"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Serp { title: string; url: string; desc: string; }
const initial: Serp = {
  title: "TechToolsCenter — Free Online Tools for Everyday Work",
  url: "https://techtoolscenter.com",
  desc: "A premium collection of 30+ free, privacy-first online tools — invoices, PDFs, calculators and generators, all running in your browser.",
};

// Google actually truncates by rendered pixel width in the font it displays
// results in (Arial), not by a fixed character count — a title full of "W"/
// "M" can overflow well under 60 characters, while one full of "i"/"l" can
// stay short of the limit well past it. These budgets are the commonly-cited
// approximate desktop/mobile pixel widths Google's snippet rendering wraps
// at; not pixel-perfect to Google's own (unpublished, locale/zoom-dependent)
// layout, but genuinely measured rather than a character-count guess.
const BUDGETS = {
  desktop: { titlePx: 600, titleFont: "20px Arial, sans-serif", descPx: 920, descFont: "14px Arial, sans-serif" },
  mobile: { titlePx: 490, titleFont: "20px Arial, sans-serif", descPx: 680, descFont: "14px Arial, sans-serif" },
};

let measureCanvas: HTMLCanvasElement | null = null;
function textWidthPx(text: string, font: string): number {
  if (!measureCanvas) measureCanvas = document.createElement("canvas");
  const ctx = measureCanvas.getContext("2d");
  if (!ctx) return text.length * 8; // crude fallback if canvas is ever unavailable
  ctx.font = font;
  return ctx.measureText(text).width;
}

// Truncates character-by-character (not a fixed slice index) until the
// rendered width — including the trailing ellipsis — fits the pixel budget.
function truncateToWidth(text: string, font: string, maxWidth: number): { text: string; truncated: boolean } {
  if (textWidthPx(text, font) <= maxWidth) return { text, truncated: false };
  const ellipsis = "…";
  let lo = 0, hi = text.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (textWidthPx(text.slice(0, mid) + ellipsis, font) <= maxWidth) lo = mid;
    else hi = mid - 1;
  }
  return { text: text.slice(0, lo) + ellipsis, truncated: true };
}

export default function SerpPreview() {
  const { value, set } = useLocalStorage<Serp>("uh:serp", initial);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const budget = BUDGETS[device];
  const titleWidth = useMemo(() => textWidthPx(value.title, budget.titleFont), [value.title, budget.titleFont]);
  const descWidth = useMemo(() => textWidthPx(value.desc, budget.descFont), [value.desc, budget.descFont]);
  const titleTooLong = titleWidth > budget.titlePx;
  const descTooLong = descWidth > budget.descPx;
  const titlePreview = useMemo(() => truncateToWidth(value.title, budget.titleFont, budget.titlePx), [value.title, budget.titleFont, budget.titlePx]);
  const descPreview = useMemo(() => truncateToWidth(value.desc, budget.descFont, budget.descPx), [value.desc, budget.descFont, budget.descPx]);
  const crumb = value.url.replace(/^https?:\/\//, "").replace(/\/$/, "").split("/").join(" › ");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Snippet content</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between"><Label htmlFor="serp-title">Title</Label><span className={titleTooLong ? "text-destructive text-xs" : "text-muted-foreground text-xs"}>{Math.round(titleWidth)}/{budget.titlePx}px</span></div>
            <Input id="serp-title" value={value.title} onChange={(e) => set({ ...value, title: e.target.value })} />
          </div>
          <div className="space-y-1.5"><Label htmlFor="serp-url">URL</Label><Input id="serp-url" value={value.url} onChange={(e) => set({ ...value, url: e.target.value })} /></div>
          <div className="space-y-1.5">
            <div className="flex justify-between"><Label htmlFor="serp-desc">Description</Label><span className={descTooLong ? "text-destructive text-xs" : "text-muted-foreground text-xs"}>{Math.round(descWidth)}/{budget.descPx}px</span></div>
            <Textarea id="serp-desc" value={value.desc} onChange={(e) => set({ ...value, desc: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(["desktop", "mobile"] as const).map((d) => (
              <Button key={d} variant={device === d ? "default" : "outline"} size="sm" onClick={() => setDevice(d)} className="capitalize">{d}</Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Google preview</CardTitle></CardHeader>
        <CardContent>
          <div className={`rounded-xl border border-border bg-white p-4 ${device === "mobile" ? "max-w-sm" : ""}`}>
            <p className="text-xs text-[#202124]">{crumb}</p>
            <p className="mt-1 text-[18px] leading-snug text-[#1a0dab] hover:underline">
              {titlePreview.text}
            </p>
            <p className="mt-1 text-sm text-[#4d5156]">
              {descPreview.text}
            </p>
          </div>
          {(titleTooLong || descTooLong) && (
            <p className="mt-3 text-xs text-amber-600 dark:text-amber-400">⚠ {titleTooLong && "Title"} {titleTooLong && descTooLong && "and "} {descTooLong && "description"} may be truncated by Google.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
