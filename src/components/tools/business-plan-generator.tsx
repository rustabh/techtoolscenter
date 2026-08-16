"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { showToast } from "@/components/ui/toaster";
import { localDateISO } from "@/lib/utils";

interface Milestone { id: string; name: string; date: string; }

interface BusinessPlanState {
  companyName: string;
  tagline: string;
  date: string;
  contactEmail: string;
  website: string;
  accent: string;
  executiveSummary: string;
  problem: string;
  solution: string;
  market: string;
  competition: string;
  businessModel: string;
  marketing: string;
  operations: string;
  team: string;
  milestones: Milestone[];
  financials: string;
  fundingAsk: string;
}

const rid = () => Math.random().toString(36).slice(2);
const milestoneItem = (): Milestone => ({ id: rid(), name: "", date: "" });

const ACCENTS = [
  { id: "indigo", hex: "#4f46e5" }, { id: "emerald", hex: "#059669" }, { id: "rose", hex: "#e11d48" },
  { id: "amber", hex: "#d97706" }, { id: "slate", hex: "#334155" }, { id: "sky", hex: "#0284c7" },
];

function hexToRgb(hex: string) {
  const int = parseInt(hex.replace("#", ""), 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function initial(): BusinessPlanState {
  return {
    companyName: "Northwind Retail",
    tagline: "Sustainable everyday essentials, delivered.",
    date: localDateISO(),
    contactEmail: "founder@northwind.example",
    website: "northwind.example",
    accent: ACCENTS[0].hex,
    executiveSummary:
      "Northwind Retail sells sustainably sourced household essentials direct to consumers, replacing single-use plastic packaging with refillable alternatives. We're seeking to formalise our first-year roadmap and use this plan to guide hiring, inventory and fundraising decisions.",
    problem:
      "Everyday household products (cleaning supplies, personal care) are overwhelmingly sold in single-use plastic, and refill options are inconvenient or unavailable in most retail channels.",
    solution:
      "A subscription-based refill service: customers buy a reusable container once, then order concentrated refills that are cheaper per use and generate a fraction of the packaging waste.",
    market:
      "Target market is urban, environmentally conscious households aged 25-45. Initial focus on 3 metro cities before expanding nationally.",
    competition:
      "Most competitors are either large FMCG brands with no refill option, or small refill shops with no delivery. We combine the convenience of e-commerce with the sustainability of a refill model.",
    businessModel:
      "Revenue from recurring refill subscriptions plus one-time container sales. Target 60% gross margin on refills after the first container purchase.",
    marketing:
      "Organic social content, partnerships with sustainability-focused creators, and referral incentives. Paid acquisition scaled only after CAC:LTV is validated in the first market.",
    operations:
      "Fulfilled from a single 3PL warehouse initially, with refill concentrate manufactured by a contract partner under our formulation.",
    team:
      "Founding team of 2 with prior experience in D2C operations and sustainable packaging manufacturing. Hiring a logistics lead in month 3.",
    milestones: [
      { id: "1", name: "Close pre-seed round", date: "" },
      { id: "2", name: "Launch in first city", date: "" },
      { id: "3", name: "Reach 1,000 active subscribers", date: "" },
      { id: "4", name: "Expand to 2 additional cities", date: "" },
    ],
    financials:
      "Break-even projected at ~2,500 active subscribers, expected within 14 months of launch based on current unit economics.",
    fundingAsk:
      "Raising ₹50,00,000 to fund 12 months of runway: inventory, warehouse setup, and initial customer acquisition.",
  };
}

export default function BusinessPlanGenerator() {
  const { value: stored, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<BusinessPlanState>(
    "uh:business-plan",
    initial(),
  );
  const value = stored.accent ? stored : { ...stored, accent: ACCENTS[0].hex };
  const [exporting, setExporting] = useState(false);
  const patch = (p: Partial<BusinessPlanState>) => set({ ...value, ...p });

  const patchMilestone = (id: string, p: Partial<Milestone>) =>
    patch({ milestones: value.milestones.map((m) => (m.id === id ? { ...m, ...p } : m)) });

  const downloadPdf = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      await generatePdf();
      showToast("Business plan PDF downloaded");
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

    doc.setFontSize(20); doc.setTextColor(20); doc.text(value.companyName || "Business Plan", 14, y); y += 7;
    if (value.tagline) { doc.setFontSize(10); doc.setTextColor(90); doc.text(value.tagline, 14, y); y += 6; }
    doc.setFontSize(9); doc.setTextColor(r, g, b);
    doc.text([value.date, value.contactEmail, value.website].filter(Boolean).join("  ·  "), 14, y); y += 8;
    doc.setDrawColor(220); doc.line(14, y, 196, y); y += 8;

    const sections: [string, string][] = [
      ["Executive Summary", value.executiveSummary],
      ["Problem", value.problem],
      ["Solution", value.solution],
      ["Market", value.market],
      ["Competition", value.competition],
      ["Business Model", value.businessModel],
      ["Marketing & Sales", value.marketing],
      ["Operations", value.operations],
      ["Team", value.team],
    ];
    sections.forEach(([title, text]) => { if (text) { section(title); wrap(text); y += 4; } });

    if (value.milestones.some((m) => m.name || m.date)) {
      section("Milestones");
      value.milestones.forEach((m) => {
        if (!m.name && !m.date) return;
        ensureSpace(5.5);
        doc.setFontSize(10); doc.setTextColor(20); doc.text(m.name, 14, y);
        doc.setTextColor(120); doc.text(m.date, 196, y, { align: "right" }); y += 5.5;
      });
      y += 4;
    }

    if (value.financials) { section("Financial Summary"); wrap(value.financials); y += 4; }
    if (value.fundingAsk) { section("Funding Ask"); wrap(value.fundingAsk); }

    doc.save(`${(value.companyName || "business-plan").replace(/\s+/g, "-").toLowerCase()}-plan.pdf`);
  };

  const field = (key: keyof BusinessPlanState, label: string, placeholder: string) => (
    <div className="space-y-1.5">
      <Label htmlFor={`bp-${key}`}>{label}</Label>
      <Textarea
        id={`bp-${key}`}
        placeholder={placeholder}
        value={value[key] as string}
        onChange={(e) => patch({ [key]: e.target.value } as Partial<BusinessPlanState>)}
      />
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Company details</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Input placeholder="Company name" className="col-span-2" value={value.companyName} onChange={(e) => patch({ companyName: e.target.value })} />
            <Input placeholder="Tagline" className="col-span-2" value={value.tagline} onChange={(e) => patch({ tagline: e.target.value })} />
            <Input type="date" value={value.date} onChange={(e) => patch({ date: e.target.value })} />
            <Input placeholder="Contact email" value={value.contactEmail} onChange={(e) => patch({ contactEmail: e.target.value })} />
            <Input placeholder="Website" className="col-span-2" value={value.website} onChange={(e) => patch({ website: e.target.value })} />
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
          <CardHeader><CardTitle>Plan sections</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {field("executiveSummary", "Executive summary", "What the business does and why this plan exists")}
            {field("problem", "Problem", "The problem you're solving")}
            {field("solution", "Solution", "How your product or service solves it")}
            {field("market", "Market", "Target market and size")}
            {field("competition", "Competition", "Who else solves this, and your edge")}
            {field("businessModel", "Business model", "How the business makes money")}
            {field("marketing", "Marketing & sales", "How you'll reach and convert customers")}
            {field("operations", "Operations", "How the business runs day to day")}
            {field("team", "Team", "Founders and key hires")}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Milestones</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {value.milestones.map((m) => (
              <div key={m.id} className="space-y-2 rounded-xl border border-border p-3">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Milestone" value={m.name} onChange={(e) => patchMilestone(m.id, { name: e.target.value })} />
                  <Input placeholder="Target date" value={m.date} onChange={(e) => patchMilestone(m.id, { date: e.target.value })} />
                </div>
                <Button variant="ghost" size="sm" aria-label="Remove milestone" onClick={() => patch({ milestones: value.milestones.filter((x) => x.id !== m.id) })}>
                  <Trash2 className="size-4" /> Remove
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => patch({ milestones: [...value.milestones, milestoneItem()] })}><Plus /> Add milestone</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Financials & funding</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {field("financials", "Financial summary", "Break-even point, projected revenue, unit economics")}
            {field("fundingAsk", "Funding ask (optional)", "How much you're raising and what it funds")}
          </CardContent>
        </Card>

        <ActionBar onUndo={undo} onRedo={redo} onReset={() => reset()} onDownload={downloadPdf} downloadLabel={exporting ? "Generating…" : "Download PDF"} canUndo={canUndo} canRedo={canRedo} />
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <div className="rounded-2xl border border-border bg-white p-8 text-slate-900 shadow-sm">
          <h2 className="text-xl font-bold">{value.companyName || "Company name"}</h2>
          {value.tagline && <p className="mt-0.5 text-xs text-slate-500">{value.tagline}</p>}
          <p className="mt-1 text-xs" style={{ color: value.accent }}>{[value.date, value.contactEmail, value.website].filter(Boolean).join(" · ")}</p>
          <div className="my-4 h-px bg-slate-200" />

          {[
            ["Executive Summary", value.executiveSummary],
            ["Problem", value.problem],
            ["Solution", value.solution],
            ["Market", value.market],
            ["Competition", value.competition],
            ["Business Model", value.businessModel],
            ["Marketing & Sales", value.marketing],
            ["Operations", value.operations],
            ["Team", value.team],
          ].map(([title, text]) =>
            text ? (
              <PreviewSection key={title} title={title} accent={value.accent}>
                <p className="text-xs leading-relaxed text-slate-600">{text}</p>
              </PreviewSection>
            ) : null,
          )}

          {value.milestones.some((m) => m.name || m.date) && (
            <PreviewSection title="Milestones" accent={value.accent}>
              {value.milestones.filter((m) => m.name || m.date).map((m) => (
                <div key={m.id} className="flex justify-between text-xs text-slate-600">
                  <span>{m.name}</span><span className="text-slate-400">{m.date}</span>
                </div>
              ))}
            </PreviewSection>
          )}

          {value.financials && (
            <PreviewSection title="Financial Summary" accent={value.accent}>
              <p className="text-xs leading-relaxed text-slate-600">{value.financials}</p>
            </PreviewSection>
          )}
          {value.fundingAsk && (
            <PreviewSection title="Funding Ask" accent={value.accent}>
              <p className="text-xs leading-relaxed text-slate-600">{value.fundingAsk}</p>
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
