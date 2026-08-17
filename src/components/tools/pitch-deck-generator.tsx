"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { showToast } from "@/components/ui/toaster";

interface Slide { id: string; title: string; bullets: string; }

interface PitchDeckState {
  companyName: string;
  tagline: string;
  contactEmail: string;
  accent: string;
  slides: Slide[];
}

const rid = () => Math.random().toString(36).slice(2);

const ACCENTS = [
  { id: "indigo", hex: "#4f46e5" }, { id: "emerald", hex: "#059669" }, { id: "rose", hex: "#e11d48" },
  { id: "amber", hex: "#d97706" }, { id: "slate", hex: "#334155" }, { id: "sky", hex: "#0284c7" },
];

function hexToRgb(hex: string) {
  const int = parseInt(hex.replace("#", ""), 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function initial(): PitchDeckState {
  return {
    companyName: "Northwind Retail",
    tagline: "Sustainable everyday essentials, delivered.",
    contactEmail: "founder@northwind.example",
    accent: ACCENTS[0].hex,
    slides: [
      { id: rid(), title: "Northwind Retail", bullets: "" },
      { id: rid(), title: "Problem", bullets: "Everyday household products are overwhelmingly sold in single-use plastic\nRefill options exist but are inconvenient or unavailable in most retail channels\nEnvironmentally conscious households have no easy, affordable alternative" },
      { id: rid(), title: "Solution", bullets: "A subscription refill service for household essentials\nCustomers buy a reusable container once, then order concentrated refills\nRefills are cheaper per use and generate a fraction of the packaging waste" },
      { id: rid(), title: "Market", bullets: "Target: urban, environmentally conscious households aged 25–45\nInitial focus on 3 metro cities before national expansion\nGrowing regulatory and consumer pressure against single-use plastic" },
      { id: rid(), title: "Product", bullets: "Reusable containers designed for repeat refilling\nConcentrated refill pouches — cleaning, personal care, home essentials\nDirect-to-door subscription with flexible delivery frequency" },
      { id: rid(), title: "Business Model", bullets: "Recurring refill subscriptions plus one-time container sales\nTarget 60% gross margin on refills after the first container purchase\nRetention-driven — the model gets more profitable the longer a customer stays" },
      { id: rid(), title: "Traction", bullets: "Pre-launch waitlist validated real demand ahead of building\nFounding team has prior D2C operations and sustainable packaging experience\nManufacturing partner secured for refill concentrate production" },
      { id: rid(), title: "Competition", bullets: "Large FMCG brands offer no refill option\nSmall refill shops exist but with no delivery\nNorthwind combines e-commerce convenience with refill-model sustainability" },
      { id: rid(), title: "Team", bullets: "Founding team of 2 with D2C operations and packaging manufacturing background\nHiring a logistics lead in month 3" },
      { id: rid(), title: "The Ask", bullets: "Raising ₹50,00,000 for 12 months of runway\nFunds inventory, warehouse setup, and initial customer acquisition\nTargeting break-even at ~2,500 active subscribers, within 14 months of launch" },
    ],
  };
}

export default function PitchDeckGenerator() {
  const { value: stored, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<PitchDeckState>("uh:pitch-deck", initial());
  const value = stored.accent ? stored : { ...stored, accent: ACCENTS[0].hex };
  const [exporting, setExporting] = useState(false);
  const patch = (p: Partial<PitchDeckState>) => set({ ...value, ...p });

  const patchSlide = (id: string, p: Partial<Slide>) => patch({ slides: value.slides.map((s) => (s.id === id ? { ...s, ...p } : s)) });
  const addSlide = () => patch({ slides: [...value.slides, { id: rid(), title: "New slide", bullets: "" }] });
  const removeSlide = (id: string) => patch({ slides: value.slides.filter((s) => s.id !== id) });
  const moveSlide = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= value.slides.length) return;
    const next = [...value.slides];
    [next[index], next[target]] = [next[target], next[index]];
    patch({ slides: next });
  };

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

    value.slides.forEach((slide, i) => {
      if (i > 0) doc.addPage();
      const isCover = i === 0;

      if (isCover) {
        doc.setFillColor(r, g, b);
        doc.rect(0, 0, PAGE_W, 8, "F");
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

      doc.setFillColor(r, g, b);
      doc.rect(0, 0, PAGE_W, 6, "F");

      doc.setFontSize(24);
      doc.setTextColor(20);
      doc.text(slide.title || `Slide ${i + 1}`, MARGIN, 32);

      doc.setDrawColor(r, g, b);
      doc.setLineWidth(0.8);
      doc.line(MARGIN, 38, MARGIN + 30, 38);

      const bullets = slide.bullets.split("\n").map((l) => l.trim()).filter(Boolean);
      let y = 55;
      doc.setFontSize(14);
      bullets.forEach((line) => {
        const wrapped = doc.splitTextToSize(line, PAGE_W - MARGIN * 2 - 10);
        doc.setTextColor(r, g, b);
        doc.text("•", MARGIN, y);
        doc.setTextColor(40);
        doc.text(wrapped, MARGIN + 7, y);
        y += wrapped.length * 8 + 6;
      });

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
            <div key={slide.id} className="aspect-video rounded-2xl border border-border bg-white p-5 text-slate-900 shadow-sm">
              {i === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <h2 className="text-lg font-bold">{slide.title || value.companyName}</h2>
                  {value.tagline && <p className="mt-1 text-xs text-slate-500">{value.tagline}</p>}
                </div>
              ) : (
                <div className="flex h-full flex-col">
                  <h3 className="text-sm font-bold" style={{ color: value.accent }}>{slide.title || `Slide ${i + 1}`}</h3>
                  <div className="mt-2 space-y-1 overflow-hidden">
                    {slide.bullets.split("\n").map((l) => l.trim()).filter(Boolean).slice(0, 5).map((line, j) => (
                      <p key={j} className="text-[11px] leading-snug text-slate-600">• {line}</p>
                    ))}
                  </div>
                  <div className="mt-auto flex justify-between pt-1 text-[9px] text-slate-400">
                    <span>{value.companyName}</span>
                    <span>{i + 1} / {value.slides.length}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
