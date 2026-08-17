"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { showToast } from "@/components/ui/toaster";

type ImagePosition = "left" | "right" | "top" | "background";

interface Slide {
  id: string;
  title: string;
  bullets: string;
  image?: string;
  imageW?: number;
  imageH?: number;
  imagePosition: ImagePosition;
  imageScale: number; // 25-70, box size for left/right/top; ignored for background (always full-bleed)
}

interface PitchDeckState {
  companyName: string;
  tagline: string;
  contactEmail: string;
  accent: string;
  slides: Slide[];
}

const rid = () => Math.random().toString(36).slice(2);
const newSlide = (title: string, bullets = ""): Slide => ({ id: rid(), title, bullets, imagePosition: "right", imageScale: 45 });

// Backward compatibility for decks saved before image support existed —
// older saved data won't actually have these fields despite the type
// saying they're required, so fall back explicitly rather than trusting it.
function normalizeSlide(s: Slide): Slide {
  return { ...s, imagePosition: s.imagePosition ?? "right", imageScale: s.imageScale ?? 45 };
}

const ACCENTS = [
  { id: "indigo", hex: "#4f46e5" }, { id: "emerald", hex: "#059669" }, { id: "rose", hex: "#e11d48" },
  { id: "amber", hex: "#d97706" }, { id: "slate", hex: "#334155" }, { id: "sky", hex: "#0284c7" },
];

const POSITIONS: { id: ImagePosition; label: string }[] = [
  { id: "left", label: "Left" },
  { id: "right", label: "Right" },
  { id: "top", label: "Top" },
  { id: "background", label: "Background" },
];

function hexToRgb(hex: string) {
  const int = parseInt(hex.replace("#", ""), 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function bulletLines(bullets: string): string[] {
  return bullets.split("\n").map((l) => l.trim()).filter(Boolean);
}

function fitContain(iw: number, ih: number, bw: number, bh: number) {
  const s = Math.min(bw / iw, bh / ih);
  return { w: iw * s, h: ih * s };
}
function fitCover(iw: number, ih: number, bw: number, bh: number) {
  const s = Math.max(bw / iw, bh / ih);
  return { w: iw * s, h: ih * s };
}

function tint(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

type IconTopic = "problem" | "solution" | "market" | "product" | "model" | "traction" | "competition" | "team" | "ask";

// Simple flat-icon glyphs drawn with plain canvas primitives — no external
// assets or network fetches, so the default template can ship with a
// distinct placeholder per slide topic without fabricating stock photos.
function drawIcon(ctx: CanvasRenderingContext2D, topic: IconTopic, cx: number, cy: number, r: number, solid: string) {
  ctx.fillStyle = solid;
  ctx.strokeStyle = solid;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  switch (topic) {
    case "problem": {
      const s = r * 1.15;
      ctx.lineWidth = r * 0.18;
      ctx.beginPath();
      ctx.moveTo(cx, cy - s);
      ctx.lineTo(cx + s * 0.95, cy + s * 0.75);
      ctx.lineTo(cx - s * 0.95, cy + s * 0.75);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy - s * 0.25);
      ctx.lineTo(cx, cy + s * 0.15);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy + s * 0.42, r * 0.09, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "solution": {
      ctx.beginPath();
      ctx.arc(cx, cy - r * 0.15, r * 0.62, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(cx - r * 0.22, cy + r * 0.35, r * 0.44, r * 0.22);
      ctx.lineWidth = r * 0.1;
      [[-1, -1], [1, -1], [-1.3, 0], [1.3, 0]].forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(cx + dx * r * 0.75, cy - r * 0.15 + dy * r * 0.5);
        ctx.lineTo(cx + dx * r * 1.05, cy - r * 0.15 + dy * r * 0.7);
        ctx.stroke();
      });
      break;
    }
    case "market": {
      const bw = r * 0.32;
      [0.5, 0.9, 0.7, 1.1].forEach((hf, i) => {
        const x = cx - r * 1.05 + i * (bw + r * 0.18);
        const bh = r * hf;
        ctx.fillRect(x, cy + r * 0.55 - bh, bw, bh);
      });
      break;
    }
    case "product": {
      const s = r * 1.1;
      roundRectPath(ctx, cx - s, cy - s * 0.8, s * 2, s * 1.6, r * 0.15);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = r * 0.09;
      ctx.beginPath();
      ctx.moveTo(cx - s, cy - s * 0.1);
      ctx.lineTo(cx + s, cy - s * 0.1);
      ctx.moveTo(cx, cy - s * 0.1);
      ctx.lineTo(cx, cy + s * 0.8);
      ctx.stroke();
      break;
    }
    case "model": {
      ctx.globalAlpha = 0.85;
      ctx.beginPath(); ctx.arc(cx - r * 0.35, cy, r * 0.55, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.55;
      ctx.beginPath(); ctx.arc(cx + r * 0.35, cy, r * 0.55, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      break;
    }
    case "traction": {
      ctx.lineWidth = r * 0.14;
      ctx.beginPath();
      ctx.moveTo(cx - r * 1.1, cy + r * 0.6);
      ctx.lineTo(cx - r * 0.3, cy - r * 0.1);
      ctx.lineTo(cx + r * 0.25, cy + r * 0.2);
      ctx.lineTo(cx + r * 1.1, cy - r * 0.75);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + r * 1.1, cy - r * 0.75);
      ctx.lineTo(cx + r * 0.65, cy - r * 0.75);
      ctx.moveTo(cx + r * 1.1, cy - r * 0.75);
      ctx.lineTo(cx + r * 1.1, cy - r * 0.3);
      ctx.stroke();
      break;
    }
    case "competition": {
      const bw = r * 0.5;
      [{ h: r * 0.9, x: cx - bw * 1.5 - r * 0.12 }, { h: r * 1.3, x: cx - bw / 2 }, { h: r * 0.65, x: cx + bw * 0.5 + r * 0.12 }].forEach((bar) => {
        ctx.fillRect(bar.x, cy + r * 0.7 - bar.h, bw, bar.h);
      });
      break;
    }
    case "team": {
      [-r * 0.55, 0, r * 0.55].forEach((dx, i) => {
        ctx.globalAlpha = i === 1 ? 1 : 0.7;
        ctx.beginPath(); ctx.arc(cx + dx, cy - r * 0.35, r * 0.28, 0, Math.PI * 2); ctx.fill();
        roundRectPath(ctx, cx + dx - r * 0.34, cy + r * 0.02, r * 0.68, r * 0.55, r * 0.2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      break;
    }
    case "ask": {
      [1, 0.66].forEach((f) => {
        ctx.globalAlpha = f === 1 ? 0.4 : 0.7;
        ctx.lineWidth = r * 0.16;
        ctx.beginPath();
        ctx.arc(cx, cy, r * f, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.33, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }
}

function generatePlaceholder(topic: IconTopic, accentHex: string): { dataUrl: string; w: number; h: number } {
  const W = 480, H = 300;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = tint(accentHex, 0.94);
  roundRectPath(ctx, 0, 0, W, H, 20);
  ctx.fill();

  const cx = W / 2, cy = H / 2, r = 78;
  ctx.fillStyle = tint(accentHex, 0.82);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  const { r: rr, g: gg, b: bb } = hexToRgb(accentHex);
  drawIcon(ctx, topic, cx, cy, r * 0.62, `rgb(${rr}, ${gg}, ${bb})`);

  return { dataUrl: canvas.toDataURL("image/png"), w: W, h: H };
}

function slideWithImage(title: string, bullets: string, topic: IconTopic, position: ImagePosition, accent: string): Slide {
  const img = generatePlaceholder(topic, accent);
  return { ...newSlide(title, bullets), image: img.dataUrl, imageW: img.w, imageH: img.h, imagePosition: position };
}

function initial(): PitchDeckState {
  const accent = ACCENTS[0].hex;
  return {
    companyName: "Northwind Retail",
    tagline: "Sustainable everyday essentials, delivered.",
    contactEmail: "founder@northwind.example",
    accent,
    slides: [
      newSlide("Northwind Retail"),
      slideWithImage("Problem", "Everyday household products are overwhelmingly sold in single-use plastic\nRefill options exist but are inconvenient or unavailable in most retail channels\nEnvironmentally conscious households have no easy, affordable alternative", "problem", "right", accent),
      slideWithImage("Solution", "A subscription refill service for household essentials\nCustomers buy a reusable container once, then order concentrated refills\nRefills are cheaper per use and generate a fraction of the packaging waste", "solution", "left", accent),
      slideWithImage("Market", "Target: urban, environmentally conscious households aged 25–45\nInitial focus on 3 metro cities before national expansion\nGrowing regulatory and consumer pressure against single-use plastic", "market", "top", accent),
      slideWithImage("Product", "Reusable containers designed for repeat refilling\nConcentrated refill pouches — cleaning, personal care, home essentials\nDirect-to-door subscription with flexible delivery frequency", "product", "right", accent),
      slideWithImage("Business Model", "Recurring refill subscriptions plus one-time container sales\nTarget 60% gross margin on refills after the first container purchase\nRetention-driven — the model gets more profitable the longer a customer stays", "model", "left", accent),
      slideWithImage("Traction", "Pre-launch waitlist validated real demand ahead of building\nFounding team has prior D2C operations and sustainable packaging experience\nManufacturing partner secured for refill concentrate production", "traction", "top", accent),
      slideWithImage("Competition", "Large FMCG brands offer no refill option\nSmall refill shops exist but with no delivery\nNorthwind combines e-commerce convenience with refill-model sustainability", "competition", "right", accent),
      slideWithImage("Team", "Founding team of 2 with D2C operations and packaging manufacturing background\nHiring a logistics lead in month 3", "team", "left", accent),
      slideWithImage("The Ask", "Raising ₹50,00,000 for 12 months of runway\nFunds inventory, warehouse setup, and initial customer acquisition\nTargeting break-even at ~2,500 active subscribers, within 14 months of launch", "ask", "background", accent),
    ],
  };
}

export default function PitchDeckGenerator() {
  // The default template's placeholder icons are drawn to a canvas, which is
  // real work — computing it fresh on every keystroke's re-render (initial()
  // would otherwise be called on every render, since it's evaluated before
  // useLocalStorage even runs) would be wasteful, so it's memoized to once
  // per mount instead.
  const initialState = useMemo(() => initial(), []);
  const { value: stored, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<PitchDeckState>("uh:pitch-deck", initialState);
  const value: PitchDeckState = { ...stored, accent: stored.accent ?? ACCENTS[0].hex, slides: (stored.slides ?? []).map(normalizeSlide) };
  const [exporting, setExporting] = useState(false);
  const patch = (p: Partial<PitchDeckState>) => set({ ...value, ...p });

  const patchSlide = (id: string, p: Partial<Slide>) => patch({ slides: value.slides.map((s) => (s.id === id ? { ...s, ...p } : s)) });
  const addSlide = () => patch({ slides: [...value.slides, newSlide("New slide")] });
  const removeSlide = (id: string) => patch({ slides: value.slides.filter((s) => s.id !== id) });
  const moveSlide = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= value.slides.length) return;
    const next = [...value.slides];
    [next[index], next[target]] = [next[target], next[index]];
    patch({ slides: next });
  };

  const onSlideImage = (id: string, file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("That's not an image file — try a JPG, PNG or WebP", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Normalise every upload to PNG on an offscreen canvas — keeps the
        // PDF embed format (and this component's format handling) simple
        // regardless of whether the source was a JPG, WebP or GIF.
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) { showToast("Couldn't process that image", "error"); return; }
        ctx.drawImage(img, 0, 0);
        patchSlide(id, { image: canvas.toDataURL("image/png"), imageW: img.naturalWidth, imageH: img.naturalHeight });
      };
      img.onerror = () => showToast("Couldn't read that image — the file may be corrupted", "error");
      img.src = reader.result as string;
    };
    reader.onerror = () => showToast("Couldn't read that file — try again", "error");
    reader.readAsDataURL(file);
  };
  const removeSlideImage = (id: string) => patchSlide(id, { image: undefined, imageW: undefined, imageH: undefined });

  const downloadPdf = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      await generatePdf();
      showToast("Pitch deck PDF downloaded");
    } catch {
      showToast("Couldn't generate the PDF — try again", "error");
    } finally {
      setExporting(false);
    }
  };

  const generatePdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const { r, g, b } = hexToRgb(value.accent);
    const PAGE_W = 297;
    const PAGE_H = 210;
    const MARGIN = 18;

    const drawBullets = (lines: string[], x: number, yStart: number, maxWidth: number) => {
      let y = yStart;
      doc.setFontSize(13);
      lines.forEach((line) => {
        const wrapped = doc.splitTextToSize(line, Math.max(maxWidth - 7, 10));
        doc.setTextColor(r, g, b);
        doc.text("•", x, y);
        doc.setTextColor(40);
        doc.text(wrapped, x + 7, y);
        y += wrapped.length * 7.5 + 5;
      });
    };

    const drawImageIn = (slide: Slide, x: number, y: number, w: number, h: number, mode: "contain" | "cover") => {
      if (!slide.image || !slide.imageW || !slide.imageH) return;
      const fit = mode === "cover" ? fitCover(slide.imageW, slide.imageH, w, h) : fitContain(slide.imageW, slide.imageH, w, h);
      const dx = x + (w - fit.w) / 2;
      const dy = y + (h - fit.h) / 2;
      doc.addImage(slide.image, "PNG", dx, dy, fit.w, fit.h);
    };

    const panel = (x: number, y: number, w: number, h: number) => {
      doc.saveGraphicsState();
      doc.setGState(doc.GState({ opacity: 0.88 }));
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, y, w, h, 3, 3, "F");
      doc.restoreGraphicsState();
    };

    value.slides.forEach((slide, i) => {
      if (i > 0) doc.addPage();
      const isCover = i === 0;

      if (isCover) {
        if (slide.image) drawImageIn(slide, 0, 0, PAGE_W, PAGE_H, "cover");
        doc.setFillColor(r, g, b);
        doc.rect(0, 0, PAGE_W, 8, "F");

        if (slide.image) panel(PAGE_W / 2 - 90, PAGE_H / 2 - 26, 180, 52);
        doc.setFontSize(34);
        doc.setTextColor(20);
        doc.text(slide.title || value.companyName, PAGE_W / 2, PAGE_H / 2 - 8, { align: "center" });
        if (value.tagline) {
          doc.setFontSize(14);
          doc.setTextColor(100);
          doc.text(value.tagline, PAGE_W / 2, PAGE_H / 2 + 6, { align: "center" });
        }
        if (value.contactEmail) {
          doc.setFontSize(10);
          doc.setTextColor(r, g, b);
          doc.text(value.contactEmail, PAGE_W / 2, PAGE_H - 20, { align: "center" });
        }
        return;
      }

      const contentTop = 45;
      const contentBottom = PAGE_H - 18;
      const contentLeft = MARGIN;
      const contentRight = PAGE_W - MARGIN;
      const contentWidth = contentRight - contentLeft;
      const contentHeight = contentBottom - contentTop;
      const bullets = bulletLines(slide.bullets);
      const hasImage = Boolean(slide.image);

      if (hasImage && slide.imagePosition === "background") {
        drawImageIn(slide, 0, 0, PAGE_W, PAGE_H, "cover");
      }

      doc.setFillColor(r, g, b);
      doc.rect(0, 0, PAGE_W, 6, "F");

      const panelWidth = hasImage && slide.imagePosition === "background" ? contentWidth * 0.55 : contentWidth;
      if (hasImage && slide.imagePosition === "background") panel(contentLeft - 6, 20, panelWidth + 12, contentBottom - 20 + 6);

      doc.setFontSize(24);
      doc.setTextColor(20);
      doc.text(slide.title || `Slide ${i + 1}`, MARGIN, 32);

      doc.setDrawColor(r, g, b);
      doc.setLineWidth(0.8);
      doc.line(MARGIN, 38, MARGIN + 30, 38);

      if (hasImage && slide.imagePosition === "left") {
        const boxW = contentWidth * (slide.imageScale / 100);
        drawImageIn(slide, contentLeft, contentTop, boxW, contentHeight, "contain");
        drawBullets(bullets, contentLeft + boxW + 8, 55, contentWidth - boxW - 8);
      } else if (hasImage && slide.imagePosition === "right") {
        const boxW = contentWidth * (slide.imageScale / 100);
        drawImageIn(slide, contentRight - boxW, contentTop, boxW, contentHeight, "contain");
        drawBullets(bullets, contentLeft, 55, contentWidth - boxW - 8);
      } else if (hasImage && slide.imagePosition === "top") {
        const boxH = contentHeight * (slide.imageScale / 100);
        drawImageIn(slide, contentLeft, contentTop, contentWidth, boxH, "contain");
        drawBullets(bullets, contentLeft, contentTop + boxH + 12, contentWidth);
      } else if (hasImage && slide.imagePosition === "background") {
        drawBullets(bullets, contentLeft, 55, panelWidth);
      } else {
        drawBullets(bullets, contentLeft, 55, contentWidth);
      }

      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text(value.companyName, MARGIN, PAGE_H - 10);
      doc.text(`${i + 1} / ${value.slides.length}`, PAGE_W - MARGIN, PAGE_H - 10, { align: "right" });
    });

    doc.save(`${(value.companyName || "pitch-deck").replace(/\s+/g, "-").toLowerCase()}-pitch-deck.pdf`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Company details</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Input placeholder="Company name" className="col-span-2" value={value.companyName} onChange={(e) => patch({ companyName: e.target.value })} />
            <Input placeholder="Tagline" className="col-span-2" value={value.tagline} onChange={(e) => patch({ tagline: e.target.value })} />
            <Input placeholder="Contact email" className="col-span-2" value={value.contactEmail} onChange={(e) => patch({ contactEmail: e.target.value })} />
            <div className="col-span-2 space-y-1.5">
              <Label>Accent color</Label>
              <div className="flex flex-wrap gap-2">
                {ACCENTS.map((a) => (
                  <button key={a.id} type="button" aria-label={`Use ${a.id} accent`} onClick={() => patch({ accent: a.hex })}
                    className={`size-7 rounded-full border-2 transition-transform ${value.accent === a.hex ? "scale-110 border-foreground" : "border-transparent"}`}
                    style={{ background: a.hex }} />
                ))}
                <input type="color" aria-label="Custom accent color" value={value.accent} onChange={(e) => patch({ accent: e.target.value })}
                  className="size-7 cursor-pointer rounded-full border border-border bg-transparent p-0" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Slides</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {value.slides.map((slide, i) => (
              <div key={slide.id} className="space-y-2 rounded-xl border border-border p-3">
                <div className="flex items-center gap-2">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-muted-foreground">{i + 1}</span>
                  <Input placeholder="Slide title" value={slide.title} onChange={(e) => patchSlide(slide.id, { title: e.target.value })} />
                </div>
                {i > 0 && (
                  <Textarea
                    placeholder="One bullet point per line"
                    value={slide.bullets}
                    onChange={(e) => patchSlide(slide.id, { bullets: e.target.value })}
                  />
                )}

                <SlideImageEditor
                  slide={slide}
                  isCover={i === 0}
                  onUpload={(f) => onSlideImage(slide.id, f)}
                  onRemove={() => removeSlideImage(slide.id)}
                  onPosition={(p) => patchSlide(slide.id, { imagePosition: p })}
                  onScale={(n) => patchSlide(slide.id, { imageScale: n })}
                />

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" aria-label="Move slide up" disabled={i === 0} onClick={() => moveSlide(i, -1)}><ChevronUp className="size-4" /></Button>
                  <Button variant="ghost" size="sm" aria-label="Move slide down" disabled={i === value.slides.length - 1} onClick={() => moveSlide(i, 1)}><ChevronDown className="size-4" /></Button>
                  <Button variant="ghost" size="sm" aria-label="Remove slide" onClick={() => removeSlide(slide.id)}><Trash2 className="size-4" /> Remove</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addSlide}><Plus /> Add slide</Button>
          </CardContent>
        </Card>

        <ActionBar onUndo={undo} onRedo={redo} onReset={() => reset()} onDownload={downloadPdf} downloadLabel={exporting ? "Generating…" : "Download PDF"} canUndo={canUndo} canRedo={canRedo} />
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Preview — {value.slides.length} slides</p>
        <div className="space-y-3">
          {value.slides.map((slide, i) => (
            <SlidePreview key={slide.id} slide={slide} index={i} total={value.slides.length} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideImageEditor({
  slide, isCover, onUpload, onRemove, onPosition, onScale,
}: {
  slide: Slide;
  isCover: boolean;
  onUpload: (f: File) => void;
  onRemove: () => void;
  onPosition: (p: ImagePosition) => void;
  onScale: (n: number) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-lg border border-dashed border-border/70 p-2.5">
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = "";
        }}
      />
      {!slide.image ? (
        <Button variant="outline" size="sm" type="button" onClick={() => ref.current?.click()}>
          <ImageIcon className="size-4" /> Add image
        </Button>
      ) : (
        <div className="flex items-start gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.image} alt="" className="h-14 w-20 shrink-0 rounded-md border border-border object-cover" />
          <div className="min-w-0 flex-1 space-y-2">
            {!isCover && (
              <div className="flex flex-wrap gap-1">
                {POSITIONS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onPosition(p.id)}
                    className={`rounded-md border px-2 py-1 text-[11px] font-medium transition-colors ${
                      slide.imagePosition === p.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
            {!isCover && slide.imagePosition !== "background" && (
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={25}
                  max={70}
                  value={slide.imageScale}
                  onChange={(e) => onScale(Number(e.target.value))}
                  aria-label="Image size"
                  className="w-full accent-[hsl(var(--primary))]"
                />
                <span className="w-9 shrink-0 text-right text-[11px] text-muted-foreground">{slide.imageScale}%</span>
              </div>
            )}
            {isCover && <p className="text-[11px] text-muted-foreground">Cover images always fill the slide as a background.</p>}
          </div>
          <Button variant="ghost" size="sm" type="button" aria-label="Remove image" onClick={onRemove}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function SlideText({ title, bullets, accent }: { title: string; bullets: string[]; accent: string }) {
  return (
    <>
      <h3 className="text-sm font-bold" style={{ color: accent }}>{title}</h3>
      <div className="mt-2 space-y-1 overflow-hidden">
        {bullets.slice(0, 5).map((line, j) => (
          <p key={j} className="text-[11px] leading-snug text-slate-600">• {line}</p>
        ))}
      </div>
    </>
  );
}

function SlidePreview({ slide, index, total, value }: { slide: Slide; index: number; total: number; value: PitchDeckState }) {
  const title = slide.title || (index === 0 ? value.companyName : `Slide ${index + 1}`);
  const bullets = bulletLines(slide.bullets);
  const isCover = index === 0;

  return (
    <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-white text-slate-900 shadow-sm">
      {isCover ? (
        slide.image ? (
          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative rounded-xl bg-white/85 px-4 py-3 backdrop-blur-sm">
              <h2 className="text-lg font-bold">{title}</h2>
              {value.tagline && <p className="mt-1 text-xs text-slate-500">{value.tagline}</p>}
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-5 text-center">
            <h2 className="text-lg font-bold">{title}</h2>
            {value.tagline && <p className="mt-1 text-xs text-slate-500">{value.tagline}</p>}
          </div>
        )
      ) : !slide.image ? (
        <div className="flex h-full flex-col p-5">
          <SlideText title={title} bullets={bullets} accent={value.accent} />
          <div className="mt-auto flex justify-between pt-1 text-[9px] text-slate-400">
            <span>{value.companyName}</span>
            <span>{index + 1} / {total}</span>
          </div>
        </div>
      ) : slide.imagePosition === "background" ? (
        <div className="relative flex h-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="relative flex h-full w-[58%] flex-col bg-white/85 p-4 backdrop-blur-sm">
            <SlideText title={title} bullets={bullets} accent={value.accent} />
          </div>
        </div>
      ) : slide.imagePosition === "top" ? (
        <div className="flex h-full flex-col gap-2 p-5">
          <div className="overflow-hidden rounded-md bg-slate-100" style={{ height: `${slide.imageScale}%` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.image} alt="" className="h-full w-full object-contain" />
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            <SlideText title={title} bullets={bullets} accent={value.accent} />
          </div>
        </div>
      ) : (
        <div className={`flex h-full gap-3 p-5 ${slide.imagePosition === "left" ? "flex-row" : "flex-row-reverse"}`}>
          <div className="shrink-0 overflow-hidden rounded-md bg-slate-100" style={{ width: `${slide.imageScale}%` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.image} alt="" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <SlideText title={title} bullets={bullets} accent={value.accent} />
          </div>
        </div>
      )}
    </div>
  );
}
