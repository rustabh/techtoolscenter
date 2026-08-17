"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { showToast } from "@/components/ui/toaster";
import { formatCurrency, localDateISO } from "@/lib/utils";
import { LogoEditor, fitContain, readLogoFile, type LogoAlign } from "@/components/tools/logo-editor";

interface ScopeItem { id: string; title: string; detail: string; }
interface TimelineItem { id: string; phase: string; duration: string; }
interface PricingItem { id: string; item: string; amount: string; }

interface ProposalState {
  companyName: string; companyEmail: string; companyWebsite: string;
  clientName: string; clientCompany: string;
  title: string; proposalNumber: string; date: string; validUntil: string;
  overview: string;
  scope: ScopeItem[];
  timeline: TimelineItem[];
  pricing: PricingItem[];
  terms: string;
  accent: string;
  logo?: string;
  logoW?: number;
  logoH?: number;
  logoAlign: LogoAlign;
  logoSize: number; // 30-70, % of the logo's max box width
}

const rid = () => Math.random().toString(36).slice(2);
const scopeItem = (): ScopeItem => ({ id: rid(), title: "", detail: "" });
const timelineItem = (): TimelineItem => ({ id: rid(), phase: "", duration: "" });
const pricingItem = (): PricingItem => ({ id: rid(), item: "", amount: "" });

const ACCENTS = [
  { id: "indigo", hex: "#4f46e5" }, { id: "emerald", hex: "#059669" }, { id: "rose", hex: "#e11d48" },
  { id: "amber", hex: "#d97706" }, { id: "slate", hex: "#334155" }, { id: "sky", hex: "#0284c7" },
];

function hexToRgb(hex: string) {
  const int = parseInt(hex.replace("#", ""), 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function initial(): ProposalState {
  return {
    companyName: "Acme Studio", companyEmail: "hello@acmestudio.com", companyWebsite: "acmestudio.com",
    clientName: "Jordan Lee", clientCompany: "Northwind Retail",
    title: "Website Redesign Proposal", proposalNumber: "PROP-001", date: localDateISO(), validUntil: "",
    overview: "This proposal outlines our approach to redesigning Northwind Retail's e-commerce site, focused on improving conversion rate and mobile performance.",
    scope: [
      { id: "1", title: "Discovery & UX audit", detail: "Review current site analytics, run a heuristic UX audit, and interview 3-5 stakeholders." },
      { id: "2", title: "Redesign & build", detail: "Design and develop the new storefront across 8 key page templates." },
      { id: "3", title: "QA & launch", detail: "Cross-browser testing, performance tuning, and a staged production launch." },
    ],
    timeline: [
      { id: "1", phase: "Discovery", duration: "1 week" },
      { id: "2", phase: "Design", duration: "2 weeks" },
      { id: "3", phase: "Build", duration: "3 weeks" },
      { id: "4", phase: "QA & launch", duration: "1 week" },
    ],
    pricing: [
      { id: "1", item: "Discovery & UX audit", amount: "50000" },
      { id: "2", item: "Design & build", amount: "250000" },
      { id: "3", item: "QA & launch support", amount: "40000" },
    ],
    terms: "50% due to begin work, 50% due on launch. This proposal is valid for 30 days from the date above. Scope changes outside the items listed will be quoted separately.",
    accent: ACCENTS[0].hex,
    logoAlign: "left",
    logoSize: 45,
  };
}

export default function ProposalGenerator() {
  const { value: stored, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<ProposalState>("uh:proposal", initial());
  const value: ProposalState = {
    ...stored,
    accent: stored.accent ?? ACCENTS[0].hex,
    logoAlign: stored.logoAlign ?? "left",
    logoSize: stored.logoSize ?? 45,
  };
  const [exporting, setExporting] = useState(false);
  const patch = (p: Partial<ProposalState>) => set({ ...value, ...p });

  const onLogoUpload = (file: File) =>
    readLogoFile(
      file,
      (dataUrl, w, h) => patch({ logo: dataUrl, logoW: w, logoH: h }),
      (message) => showToast(message, "error"),
    );
  const removeLogo = () => patch({ logo: undefined, logoW: undefined, logoH: undefined });

  const total = useMemo(
    () => value.pricing.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0),
    [value.pricing],
  );

  const patchScope = (id: string, p: Partial<ScopeItem>) => patch({ scope: value.scope.map((s) => (s.id === id ? { ...s, ...p } : s)) });
  const patchTimeline = (id: string, p: Partial<TimelineItem>) => patch({ timeline: value.timeline.map((t) => (t.id === id ? { ...t, ...p } : t)) });
  const patchPricing = (id: string, p: Partial<PricingItem>) => patch({ pricing: value.pricing.map((x) => (x.id === id ? { ...x, ...p } : x)) });

  const downloadPdf = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      await generatePdf();
      showToast("Proposal PDF downloaded");
    } catch {
      showToast("Couldn't generate the PDF — try again", "error");
    } finally {
      setExporting(false);
    }
  };

  const generatePdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const { r, g, b } = hexToRgb(value.accent);
    let y = 20;

    const PAGE_BOTTOM = 279;
    const ensureSpace = (needed: number) => { if (y + needed > PAGE_BOTTOM) { doc.addPage(); y = 20; } };
    const section = (title: string) => { ensureSpace(10); doc.setFontSize(12); doc.setTextColor(r, g, b); doc.text(title.toUpperCase(), 14, y); y += 6; doc.setTextColor(40); };
    const wrap = (text: string, size = 9) => {
      if (!text) return;
      doc.setFontSize(size);
      const lines = doc.splitTextToSize(text, 182);
      const needed = lines.length * 5;
      ensureSpace(needed);
      doc.text(lines, 14, y); y += needed;
    };

    if (value.logo && value.logoW && value.logoH) {
      const boxW = 18 + (value.logoSize / 100) * 24; // 30-70% maps to ~25-35mm
      const fit = fitContain(value.logoW, value.logoH, boxW, 22);
      const x = value.logoAlign === "left" ? 14 : value.logoAlign === "right" ? 196 - fit.w : 105 - fit.w / 2;
      doc.addImage(value.logo, "PNG", x, y, fit.w, fit.h);
      y += fit.h + 6;
    }

    doc.setFontSize(20); doc.setTextColor(20); doc.text(value.title || "Proposal", 14, y); y += 7;
    doc.setFontSize(10); doc.setTextColor(r, g, b);
    doc.text([value.proposalNumber, value.date].filter(Boolean).join("  ·  "), 14, y); y += 8;
    doc.setDrawColor(220); doc.line(14, y, 196, y); y += 8;

    doc.setFontSize(9); doc.setTextColor(90);
    doc.text(`From: ${value.companyName}`, 14, y);
    doc.text(`To: ${value.clientName}${value.clientCompany ? ` (${value.clientCompany})` : ""}`, 110, y);
    y += 5;
    doc.text([value.companyEmail, value.companyWebsite].filter(Boolean).join("  ·  "), 14, y);
    if (value.validUntil) doc.text(`Valid until: ${value.validUntil}`, 110, y);
    y += 10;

    if (value.overview) { section("Overview"); wrap(value.overview); y += 4; }

    if (value.scope.some((s) => s.title || s.detail)) {
      section("Scope of Work");
      value.scope.forEach((s) => {
        if (!s.title && !s.detail) return;
        ensureSpace(5);
        doc.setFontSize(10); doc.setTextColor(20); doc.text(s.title, 14, y); y += 5;
        doc.setTextColor(70); wrap(s.detail); y += 2;
      });
      y += 2;
    }

    if (value.timeline.some((t) => t.phase || t.duration)) {
      section("Timeline");
      value.timeline.forEach((t) => {
        if (!t.phase && !t.duration) return;
        ensureSpace(5);
        doc.setFontSize(10); doc.setTextColor(20); doc.text(t.phase, 14, y);
        doc.setTextColor(120); doc.text(t.duration, 196, y, { align: "right" }); y += 5.5;
      });
      y += 4;
    }

    if (value.pricing.some((p) => p.item || p.amount)) {
      section("Investment");
      value.pricing.forEach((p) => {
        if (!p.item && !p.amount) return;
        ensureSpace(5);
        doc.setFontSize(10); doc.setTextColor(20); doc.text(p.item, 14, y);
        doc.setTextColor(70); doc.text(formatCurrency(parseFloat(p.amount) || 0), 196, y, { align: "right" }); y += 5.5;
      });
      ensureSpace(7);
      doc.setDrawColor(220); doc.line(14, y, 196, y); y += 5;
      doc.setFontSize(11); doc.setTextColor(r, g, b);
      doc.text("Total", 14, y);
      doc.text(formatCurrency(total), 196, y, { align: "right" });
      y += 9;
    }

    if (value.terms) { section("Terms"); wrap(value.terms); }

    doc.save(`${(value.title || "proposal").replace(/\s+/g, "-").toLowerCase()}.pdf`);
  };

  const ListEditor = <T extends { id: string }>({
    title, items, onAdd, onRemove, children,
  }: { title: string; items: T[]; onAdd: () => void; onRemove: (id: string) => void; children: (item: T) => React.ReactNode }) => (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="space-y-2 rounded-xl border border-border p-3">
            {children(item)}
            <Button variant="ghost" size="sm" aria-label="Remove" onClick={() => onRemove(item.id)}><Trash2 className="size-4" /> Remove</Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={onAdd}><Plus /> Add</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Input placeholder="Proposal title" className="col-span-2" value={value.title} onChange={(e) => patch({ title: e.target.value })} />
            <Input placeholder="Proposal number" value={value.proposalNumber} onChange={(e) => patch({ proposalNumber: e.target.value })} />
            <Input type="date" value={value.date} onChange={(e) => patch({ date: e.target.value })} />
            <Input placeholder="Your company" value={value.companyName} onChange={(e) => patch({ companyName: e.target.value })} />
            <Input placeholder="Your email" value={value.companyEmail} onChange={(e) => patch({ companyEmail: e.target.value })} />
            <Input placeholder="Your website" value={value.companyWebsite} onChange={(e) => patch({ companyWebsite: e.target.value })} />
            <Input placeholder="Valid until (optional)" value={value.validUntil} onChange={(e) => patch({ validUntil: e.target.value })} />
            <Input placeholder="Client name" value={value.clientName} onChange={(e) => patch({ clientName: e.target.value })} />
            <Input placeholder="Client company" value={value.clientCompany} onChange={(e) => patch({ clientCompany: e.target.value })} />
            <Textarea className="col-span-2" placeholder="Overview — what this proposal covers and why" value={value.overview} onChange={(e) => patch({ overview: e.target.value })} />
            <div className="col-span-2">
              <LogoEditor logo={value.logo} align={value.logoAlign} size={value.logoSize} onUpload={onLogoUpload} onRemove={removeLogo}
                onAlign={(a) => patch({ logoAlign: a })} onSize={(n) => patch({ logoSize: n })} />
            </div>
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

        <ListEditor title="Scope of work" items={value.scope} onAdd={() => patch({ scope: [...value.scope, scopeItem()] })} onRemove={(id) => patch({ scope: value.scope.filter((s) => s.id !== id) })}>
          {(s: ScopeItem) => (
            <>
              <Input placeholder="Deliverable title" value={s.title} onChange={(e) => patchScope(s.id, { title: e.target.value })} />
              <Textarea placeholder="What's included" value={s.detail} onChange={(e) => patchScope(s.id, { detail: e.target.value })} />
            </>
          )}
        </ListEditor>

        <ListEditor title="Timeline" items={value.timeline} onAdd={() => patch({ timeline: [...value.timeline, timelineItem()] })} onRemove={(id) => patch({ timeline: value.timeline.filter((t) => t.id !== id) })}>
          {(t: TimelineItem) => (
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Phase" value={t.phase} onChange={(e) => patchTimeline(t.id, { phase: e.target.value })} />
              <Input placeholder="Duration (e.g. 2 weeks)" value={t.duration} onChange={(e) => patchTimeline(t.id, { duration: e.target.value })} />
            </div>
          )}
        </ListEditor>

        <ListEditor title="Investment" items={value.pricing} onAdd={() => patch({ pricing: [...value.pricing, pricingItem()] })} onRemove={(id) => patch({ pricing: value.pricing.filter((p) => p.id !== id) })}>
          {(p: PricingItem) => (
            <div className="grid grid-cols-[1fr_140px] gap-2">
              <Input placeholder="Line item" value={p.item} onChange={(e) => patchPricing(p.id, { item: e.target.value })} />
              <Input type="number" placeholder="Amount (₹)" value={p.amount} onChange={(e) => patchPricing(p.id, { amount: e.target.value })} />
            </div>
          )}
        </ListEditor>
        <div className="flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-3 text-sm font-semibold">
          <span>Total</span><span>{formatCurrency(total)}</span>
        </div>

        <Card>
          <CardHeader><CardTitle>Terms</CardTitle></CardHeader>
          <CardContent><Textarea value={value.terms} onChange={(e) => patch({ terms: e.target.value })} placeholder="Payment terms, validity, scope-change policy…" /></CardContent>
        </Card>

        <ActionBar onUndo={undo} onRedo={redo} onReset={() => reset()} onDownload={downloadPdf} downloadLabel={exporting ? "Generating…" : "Download PDF"} canUndo={canUndo} canRedo={canRedo} />
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <div className="rounded-2xl border border-border bg-white p-8 text-slate-900 shadow-sm">
          {value.logo && (
            <div className={`mb-4 flex ${value.logoAlign === "left" ? "justify-start" : value.logoAlign === "right" ? "justify-end" : "justify-center"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value.logo} alt="" className="max-h-16 object-contain" style={{ maxWidth: `${value.logoSize}%` }} />
            </div>
          )}
          <h2 className="text-xl font-bold">{value.title || "Proposal title"}</h2>
          <p className="mt-0.5 text-xs" style={{ color: value.accent }}>{[value.proposalNumber, value.date].filter(Boolean).join(" · ")}</p>
          <div className="my-4 h-px bg-slate-200" />
          <div className="flex justify-between text-xs text-slate-500">
            <span>From: {value.companyName}</span>
            <span>To: {value.clientName}{value.clientCompany ? ` (${value.clientCompany})` : ""}</span>
          </div>
          {value.overview && (
            <PreviewSection title="Overview" accent={value.accent}>
              <p className="text-xs leading-relaxed text-slate-600">{value.overview}</p>
            </PreviewSection>
          )}
          {value.scope.some((s) => s.title || s.detail) && (
            <PreviewSection title="Scope of Work" accent={value.accent}>
              {value.scope.filter((s) => s.title || s.detail).map((s) => (
                <div key={s.id} className="mb-2">
                  <p className="text-sm font-semibold text-slate-800">{s.title}</p>
                  <p className="text-xs text-slate-600">{s.detail}</p>
                </div>
              ))}
            </PreviewSection>
          )}
          {value.timeline.some((t) => t.phase || t.duration) && (
            <PreviewSection title="Timeline" accent={value.accent}>
              {value.timeline.filter((t) => t.phase || t.duration).map((t) => (
                <div key={t.id} className="flex justify-between text-xs text-slate-600">
                  <span>{t.phase}</span><span className="text-slate-400">{t.duration}</span>
                </div>
              ))}
            </PreviewSection>
          )}
          {value.pricing.some((p) => p.item || p.amount) && (
            <PreviewSection title="Investment" accent={value.accent}>
              {value.pricing.filter((p) => p.item || p.amount).map((p) => (
                <div key={p.id} className="flex justify-between text-xs text-slate-600">
                  <span>{p.item}</span><span>{formatCurrency(parseFloat(p.amount) || 0)}</span>
                </div>
              ))}
              <div className="mt-1 flex justify-between border-t border-slate-200 pt-1 text-sm font-semibold text-slate-800">
                <span>Total</span><span>{formatCurrency(total)}</span>
              </div>
            </PreviewSection>
          )}
          {value.terms && (
            <PreviewSection title="Terms" accent={value.accent}>
              <p className="text-xs leading-relaxed text-slate-600">{value.terms}</p>
            </PreviewSection>
          )}
        </div>
      </div>
    </div>
  );
}

function PreviewSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>{title}</h3>
      {children}
    </div>
  );
}
