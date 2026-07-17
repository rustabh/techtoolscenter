"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Trash2, Upload, Printer, FileDown, ImageDown, Sparkles, Wand2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency } from "@/lib/utils";
import { newItem, subtotal, type LineItem, type Party } from "./doc-types";

/* ------------------------------------------------------------------ */
/* Document types                                                      */
/* ------------------------------------------------------------------ */
type DocKind =
  | "invoice" | "quotation" | "estimate" | "purchase-order" | "receipt"
  | "delivery-challan" | "credit-note" | "debit-note" | "packing-slip" | "letterhead";

const DOC_TYPES: { id: DocKind; label: string; title: string; prefix: string; priced: boolean }[] = [
  { id: "invoice", label: "Invoice", title: "INVOICE", prefix: "INV", priced: true },
  { id: "quotation", label: "Quotation", title: "QUOTATION", prefix: "QTN", priced: true },
  { id: "estimate", label: "Estimate", title: "ESTIMATE", prefix: "EST", priced: true },
  { id: "purchase-order", label: "Purchase Order", title: "PURCHASE ORDER", prefix: "PO", priced: true },
  { id: "receipt", label: "Receipt", title: "RECEIPT", prefix: "RCPT", priced: true },
  { id: "delivery-challan", label: "Delivery Challan", title: "DELIVERY CHALLAN", prefix: "DC", priced: false },
  { id: "credit-note", label: "Credit Note", title: "CREDIT NOTE", prefix: "CN", priced: true },
  { id: "debit-note", label: "Debit Note", title: "DEBIT NOTE", prefix: "DN", priced: true },
  { id: "packing-slip", label: "Packing Slip", title: "PACKING SLIP", prefix: "PS", priced: false },
  { id: "letterhead", label: "Letterhead", title: "", prefix: "LTR", priced: false },
];

/* ------------------------------------------------------------------ */
/* 20 professional templates (layout × accent)                        */
/* ------------------------------------------------------------------ */
type Layout = "classic" | "modern" | "bold" | "minimal" | "sidebar";
type Template = { id: string; name: string; accent: string; layout: Layout };
const TEMPLATES: Template[] = [
  { id: "indigo-classic", name: "Indigo Classic", accent: "#4f46e5", layout: "classic" },
  { id: "indigo-modern", name: "Indigo Modern", accent: "#6366f1", layout: "modern" },
  { id: "ocean-bold", name: "Ocean Bold", accent: "#0284c7", layout: "bold" },
  { id: "ocean-sidebar", name: "Ocean Sidebar", accent: "#0891b2", layout: "sidebar" },
  { id: "emerald-modern", name: "Emerald Modern", accent: "#059669", layout: "modern" },
  { id: "emerald-minimal", name: "Emerald Minimal", accent: "#10b981", layout: "minimal" },
  { id: "slate-minimal", name: "Slate Minimal", accent: "#334155", layout: "minimal" },
  { id: "slate-classic", name: "Slate Classic", accent: "#1e293b", layout: "classic" },
  { id: "rose-bold", name: "Rose Bold", accent: "#e11d48", layout: "bold" },
  { id: "rose-sidebar", name: "Rose Sidebar", accent: "#be123c", layout: "sidebar" },
  { id: "amber-modern", name: "Amber Modern", accent: "#d97706", layout: "modern" },
  { id: "amber-classic", name: "Amber Classic", accent: "#b45309", layout: "classic" },
  { id: "violet-bold", name: "Violet Bold", accent: "#7c3aed", layout: "bold" },
  { id: "violet-sidebar", name: "Violet Sidebar", accent: "#6d28d9", layout: "sidebar" },
  { id: "teal-minimal", name: "Teal Minimal", accent: "#0d9488", layout: "minimal" },
  { id: "teal-modern", name: "Teal Modern", accent: "#14b8a6", layout: "modern" },
  { id: "navy-classic", name: "Navy Classic", accent: "#1e3a8a", layout: "classic" },
  { id: "navy-bold", name: "Navy Bold", accent: "#1d4ed8", layout: "bold" },
  { id: "charcoal-sidebar", name: "Charcoal Sidebar", accent: "#111827", layout: "sidebar" },
  { id: "plum-minimal", name: "Plum Minimal", accent: "#9333ea", layout: "minimal" },
];

/* ------------------------------------------------------------------ */
interface BizState {
  kind: DocKind;
  templateId: string;
  number: string;
  date: string;
  dueDate: string;
  currency: string;
  company: Party;
  customer: Party;
  items: LineItem[];
  discount: number;
  shipping: number;
  taxRate: number;
  notes: string;
  terms: string;
  bodyText: string; // letterhead
  logo: string | null;
  signature: string | null;
  stamp: string | null;
  watermark: string;
  showQR: boolean;
  showBarcode: boolean;
}

const emptyParty: Party = { name: "", address: "", email: "", phone: "", gstin: "" };

function autoNumber(prefix: string) {
  const d = new Date();
  return `${prefix}-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

function initial(): BizState {
  return {
    kind: "invoice",
    templateId: "indigo-classic",
    number: autoNumber("INV"),
    date: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 12096e5).toISOString().slice(0, 10),
    currency: "INR",
    company: { ...emptyParty, name: "Your Company" },
    customer: { ...emptyParty },
    items: [{ ...newItem(), description: "Service / product", qty: 1, rate: 1000 }],
    discount: 0,
    shipping: 0,
    taxRate: 18,
    notes: "Thank you for your business!",
    terms: "Payment due within 14 days.",
    bodyText: "Dear Sir/Madam,\n\nWrite your letter content here.\n\nWarm regards,",
    logo: null,
    signature: null,
    stamp: null,
    watermark: "",
    showQR: true,
    showBarcode: false,
  };
}

/* Template-based smart draft (AI generation hook — swap for a real API later). */
const AI_DRAFTS: Record<DocKind, { notes: string; terms: string; items: [string, number, number][] }> = {
  invoice: { notes: "Thank you for choosing us. We appreciate your business.", terms: "Payment due within 14 days via bank transfer. Late payments attract 2% monthly interest.", items: [["Professional services", 1, 15000], ["Support & maintenance", 1, 3000]] },
  quotation: { notes: "This quotation is valid for 30 days from the date of issue.", terms: "50% advance required to commence work. Prices exclusive of applicable taxes unless stated.", items: [["Project scope — Phase 1", 1, 25000], ["Project scope — Phase 2", 1, 20000]] },
  estimate: { notes: "Estimated costs are indicative and may vary with final scope.", terms: "Estimate valid for 15 days. Final invoice may differ based on actuals.", items: [["Estimated labour", 40, 500], ["Estimated materials", 1, 8000]] },
  "purchase-order": { notes: "Please confirm receipt and expected delivery date.", terms: "Goods to be delivered within 7 working days. Inspection on delivery.", items: [["Raw material — Grade A", 100, 120], ["Packaging units", 200, 15]] },
  receipt: { notes: "Payment received with thanks.", terms: "This receipt is computer generated and valid without signature.", items: [["Amount received", 1, 15000]] },
  "delivery-challan": { notes: "Goods dispatched as per order. Please verify on receipt.", terms: "Received goods in good condition.", items: [["Item A — box", 10, 0], ["Item B — carton", 5, 0]] },
  "credit-note": { notes: "Credit issued against returned/adjusted goods.", terms: "Credit adjustable against future invoices within 6 months.", items: [["Returned goods adjustment", 1, 2000]] },
  "debit-note": { notes: "Debit raised for additional charges/short supply.", terms: "Amount payable within 7 days of receipt.", items: [["Additional charges", 1, 1500]] },
  "packing-slip": { notes: "Packed and verified. Handle with care.", terms: "Report discrepancies within 48 hours.", items: [["SKU-001 — units", 24, 0], ["SKU-002 — units", 12, 0]] },
  letterhead: { notes: "", terms: "", items: [] },
};

export default function BusinessStudio() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<BizState>("uh:business-studio", initial());
  const printRef = useRef<HTMLDivElement>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [barUrl, setBarUrl] = useState<string | null>(null);

  const kind = DOC_TYPES.find((d) => d.id === value.kind) ?? DOC_TYPES[0];
  const template = TEMPLATES.find((t) => t.id === value.templateId) ?? TEMPLATES[0];
  const accent = template.accent;
  const sym = value.currency;
  const money = (n: number) => formatCurrency(n, sym);

  const totals = useMemo(() => {
    const sub = subtotal(value.items);
    const discountAmt = (sub * (value.discount || 0)) / 100;
    const taxable = sub - discountAmt;
    const taxAmt = (taxable * (value.taxRate || 0)) / 100;
    const grand = taxable + taxAmt + (value.shipping || 0);
    return { sub, discountAmt, taxable, taxAmt, grand };
  }, [value]);

  // QR encodes a payment/summary payload; barcode encodes the document number.
  useEffect(() => {
    let alive = true;
    (async () => {
      if (value.showQR) {
        const QRCode = (await import("qrcode")).default;
        const payload = `${kind.title || "DOCUMENT"} ${value.number}\n${value.company.name}\nTotal: ${money(totals.grand)}`;
        const url = await QRCode.toDataURL(payload, { width: 256, margin: 1, color: { dark: accent, light: "#ffffff" } });
        if (alive) setQrUrl(url);
      } else setQrUrl(null);
    })();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.showQR, value.number, value.company.name, totals.grand, accent, kind.title, sym]);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (value.showBarcode && value.number) {
        const JsBarcode = (await import("jsbarcode")).default;
        const canvas = document.createElement("canvas");
        try {
          JsBarcode(canvas, value.number, { format: "CODE128", displayValue: false, height: 40, margin: 0, lineColor: "#0f172a" });
          if (alive) setBarUrl(canvas.toDataURL("image/png"));
        } catch { if (alive) setBarUrl(null); }
      } else setBarUrl(null);
    })();
    return () => { alive = false; };
  }, [value.showBarcode, value.number]);

  const patch = (p: Partial<BizState>) => set({ ...value, ...p });
  const patchParty = (key: "company" | "customer", p: Partial<Party>) => set({ ...value, [key]: { ...value[key], ...p } });
  const patchItem = (id: string, p: Partial<LineItem>) => set({ ...value, items: value.items.map((i) => (i.id === id ? { ...i, ...p } : i)) });

  const changeKind = (id: DocKind) => {
    const k = DOC_TYPES.find((d) => d.id === id)!;
    patch({ kind: id, number: autoNumber(k.prefix) });
  };

  const upload = (key: "logo" | "signature" | "stamp", file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => patch({ [key]: reader.result as string } as Partial<BizState>);
    reader.readAsDataURL(file);
  };

  const aiDraft = () => {
    const d = AI_DRAFTS[value.kind];
    if (value.kind === "letterhead") return;
    patch({
      notes: d.notes,
      terms: d.terms,
      items: d.items.map(([desc, qty, rate]) => ({ ...newItem(), description: desc, qty, rate })),
    });
  };

  const duplicate = () => patch({ number: autoNumber(kind.prefix), date: new Date().toISOString().slice(0, 10) });

  /* ---------------- PDF export ---------------- */
  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF();
    const { r, g, b } = hexToRgb(accent);
    const primary: [number, number, number] = [r, g, b];

    if (value.logo) { try { doc.addImage(value.logo, "PNG", 14, 12, 28, 28); } catch {} }
    doc.setFontSize(22);
    doc.setTextColor(...primary);
    doc.text(kind.title || value.company.name || "LETTERHEAD", 196, 22, { align: "right" });
    doc.setFontSize(10);
    doc.setTextColor(90);
    doc.text(`#${value.number}`, 196, 30, { align: "right" });
    doc.text(`Date: ${value.date}`, 196, 36, { align: "right" });
    if (kind.priced) doc.text(`Due: ${value.dueDate}`, 196, 42, { align: "right" });

    if (value.kind === "letterhead") {
      doc.setTextColor(40);
      doc.setFontSize(11);
      doc.text(doc.splitTextToSize(value.bodyText, 180), 14, 70);
    } else {
      doc.setTextColor(20);
      doc.setFontSize(11);
      doc.text("From", 14, 54);
      doc.text(kind.id === "purchase-order" ? "Vendor" : "Bill To", 110, 54);
      doc.setFontSize(9);
      doc.setTextColor(80);
      doc.text(partyLines(value.company), 14, 60);
      doc.text(partyLines(value.customer), 110, 60);

      autoTable(doc, {
        startY: 92,
        head: [kind.priced ? ["#", "Description", "Qty", "Rate", "Amount"] : ["#", "Description", "Qty"]],
        body: value.items.map((it, i) => kind.priced
          ? [String(i + 1), it.description, String(it.qty), money(it.rate), money(it.qty * it.rate)]
          : [String(i + 1), it.description, String(it.qty)]),
        headStyles: { fillColor: primary },
        styles: { fontSize: 9 },
        theme: "striped",
      });

      let y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;
      if (kind.priced) {
        const put = (label: string, val: string, bold = false) => {
          doc.setFont("helvetica", bold ? "bold" : "normal");
          doc.setFontSize(bold ? 12 : 10);
          doc.setTextColor(bold ? 20 : 80);
          doc.text(label, 140, y);
          doc.text(val, 196, y, { align: "right" });
          y += bold ? 8 : 6;
        };
        put("Subtotal", money(totals.sub));
        if (value.discount) put(`Discount (${value.discount}%)`, `- ${money(totals.discountAmt)}`);
        if (value.taxRate) put(`Tax / GST (${value.taxRate}%)`, money(totals.taxAmt));
        if (value.shipping) put("Shipping", money(value.shipping));
        put("Total", money(totals.grand), true);
      }

      y += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(80);
      if (value.notes) { doc.text(`Notes: ${value.notes}`, 14, y); y += 6; }
      if (value.terms) { doc.text(`Terms: ${value.terms}`, 14, y); y += 6; }
      if (value.signature) { try { doc.addImage(value.signature, "PNG", 150, y + 4, 40, 18); doc.text("Authorised signature", 150, y + 28); } catch {} }
      if (value.stamp) { try { doc.addImage(value.stamp, "PNG", 14, y + 2, 26, 26); } catch {} }
      if (qrUrl) { try { doc.addImage(qrUrl, "PNG", 60, y + 2, 24, 24); } catch {} }
    }

    if (value.watermark) {
      doc.setTextColor(230);
      doc.setFontSize(60);
      doc.text(value.watermark, 105, 160, { align: "center", angle: 35 });
    }
    doc.save(`${value.number}.pdf`);
  };

  /* ---------------- PNG export ---------------- */
  const downloadPng = async () => {
    if (!printRef.current) return;
    const { toPng } = await import("html-to-image");
    const url = await toPng(printRef.current, { pixelRatio: 2.5, cacheBust: true, backgroundColor: "#ffffff" });
    const a = document.createElement("a");
    a.href = url;
    a.download = `${value.number}.png`;
    a.click();
  };

  const isSidebar = template.layout === "sidebar";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Editor */}
      <div className="space-y-6 print:hidden">
        <Card>
          <CardHeader><CardTitle>Document</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Type</Label>
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                {DOC_TYPES.map((d) => (
                  <button key={d.id} onClick={() => changeKind(d.id)}
                    className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors ${value.kind === d.id ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Template ({TEMPLATES.length})</Label>
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {TEMPLATES.map((t) => (
                  <button key={t.id} onClick={() => patch({ templateId: t.id })} title={`${t.name} · ${t.layout}`}
                    className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-[11px] transition-colors ${value.templateId === t.id ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>
                    <span className="size-3 shrink-0 rounded-full" style={{ background: t.accent }} />
                    <span className="truncate">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Number" value={value.number} onChange={(v) => patch({ number: v })} />
              <div className="space-y-1.5"><Label>Currency</Label><Input value={value.currency} onChange={(e) => patch({ currency: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Date</Label><Input type="date" value={value.date} onChange={(e) => patch({ date: e.target.value })} /></div>
              {kind.priced && <div className="space-y-1.5"><Label>Due date</Label><Input type="date" value={value.dueDate} onChange={(e) => patch({ dueDate: e.target.value })} /></div>}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <UploadBtn label={value.logo ? "Logo ✓" : "Logo"} onFile={(f) => upload("logo", f)} />
              <UploadBtn label={value.signature ? "Sign ✓" : "Signature"} onFile={(f) => upload("signature", f)} />
              <UploadBtn label={value.stamp ? "Stamp ✓" : "Stamp"} onFile={(f) => upload("stamp", f)} />
            </div>
            <Button variant="secondary" size="sm" className="w-full" onClick={aiDraft} disabled={value.kind === "letterhead"}>
              <Wand2 className="size-4" /> AI smart draft — auto-fill items, notes & terms
            </Button>
          </CardContent>
        </Card>

        <PartyCard title="Your company" party={value.company} onChange={(p) => patchParty("company", p)} />
        {value.kind !== "letterhead" && (
          <PartyCard title={value.kind === "purchase-order" ? "Vendor" : "Customer"} party={value.customer} onChange={(p) => patchParty("customer", p)} />
        )}

        {value.kind === "letterhead" ? (
          <Card>
            <CardHeader><CardTitle>Letter body</CardTitle></CardHeader>
            <CardContent><Textarea rows={8} value={value.bodyText} onChange={(e) => patch({ bodyText: e.target.value })} /></CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader><CardTitle>Items</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {value.items.map((it) => (
                  <div key={it.id} className="grid grid-cols-12 items-center gap-2">
                    <Input className="col-span-5" placeholder="Description" value={it.description} onChange={(e) => patchItem(it.id, { description: e.target.value })} />
                    <Input className="col-span-2" type="number" placeholder="Qty" value={it.qty} onChange={(e) => patchItem(it.id, { qty: Number(e.target.value) })} />
                    {kind.priced && <Input className="col-span-3" type="number" placeholder="Rate" value={it.rate} onChange={(e) => patchItem(it.id, { rate: Number(e.target.value) })} />}
                    <Button variant="ghost" size="icon" className={kind.priced ? "col-span-2" : "col-span-5"} aria-label="Remove item" onClick={() => patch({ items: value.items.filter((x) => x.id !== it.id) })}><Trash2 className="size-4" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => patch({ items: [...value.items, newItem()] })}><Plus /> Add item</Button>
              </CardContent>
            </Card>

            {kind.priced && (
              <Card>
                <CardHeader><CardTitle>Charges</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5"><Label>Discount (%)</Label><Input type="number" value={value.discount} onChange={(e) => patch({ discount: Number(e.target.value) })} /></div>
                  <div className="space-y-1.5"><Label>Tax / GST (%)</Label><Input type="number" value={value.taxRate} onChange={(e) => patch({ taxRate: Number(e.target.value) })} /></div>
                  <div className="space-y-1.5"><Label>Shipping</Label><Input type="number" value={value.shipping} onChange={(e) => patch({ shipping: Number(e.target.value) })} /></div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        <Card>
          <CardHeader><CardTitle>Extras</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {value.kind !== "letterhead" && (
              <>
                <div className="space-y-1.5"><Label>Notes</Label><Textarea value={value.notes} onChange={(e) => patch({ notes: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>Terms</Label><Textarea value={value.terms} onChange={(e) => patch({ terms: e.target.value })} /></div>
              </>
            )}
            <div className="space-y-1.5"><Label>Watermark text (optional)</Label><Input placeholder="e.g. PAID / DRAFT" value={value.watermark} onChange={(e) => patch({ watermark: e.target.value })} /></div>
            <div className="flex flex-wrap gap-4 pt-1">
              <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={value.showQR} onChange={(e) => patch({ showQR: e.target.checked })} className="size-4 accent-[var(--primary)]" /> QR code</label>
              <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={value.showBarcode} onChange={(e) => patch({ showBarcode: e.target.checked })} className="size-4 accent-[var(--primary)]" /> Barcode</label>
            </div>
          </CardContent>
        </Card>

        <ActionBar onUndo={undo} onRedo={redo} onReset={() => reset()} onDuplicate={duplicate} onDownload={downloadPdf} downloadLabel="Download PDF" canUndo={canUndo} canRedo={canRedo} />
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={downloadPng}><ImageDown className="size-4" /> PNG</Button>
          <Button variant="outline" size="sm" onClick={downloadPdf}><FileDown className="size-4" /> PDF</Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}><Printer className="size-4" /> Print</Button>
        </div>
      </div>

      {/* Preview */}
      <div className="lg:sticky lg:top-20 lg:h-fit">
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground print:hidden">
          <Sparkles className="size-4" /> Live preview · {template.name}
        </div>
        <div ref={printRef} id="business-print" className="relative overflow-hidden rounded-2xl border border-border bg-white p-8 text-slate-900 shadow-sm">
          {value.watermark && (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-7xl font-black uppercase tracking-widest opacity-[0.06]" style={{ transform: "rotate(-30deg)" }}>{value.watermark}</span>
          )}

          {/* Header */}
          <div className={`flex items-start justify-between ${isSidebar ? "border-l-8 pl-4" : ""}`} style={isSidebar ? { borderColor: accent } : undefined}>
            <div>
              {value.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={value.logo} alt="Logo" className="mb-2 h-14 w-auto object-contain" />
              ) : (
                <p className="text-lg font-bold">{value.company.name}</p>
              )}
              {value.logo && <p className="text-sm font-semibold">{value.company.name}</p>}
            </div>
            <div className="text-right">
              {kind.title && <p className="text-2xl font-bold" style={{ color: accent }}>{kind.title}</p>}
              <p className="text-xs text-slate-500">#{value.number}</p>
              <p className="text-xs text-slate-500">Date: {value.date}</p>
              {kind.priced && <p className="text-xs text-slate-500">Due: {value.dueDate}</p>}
              {barUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={barUrl} alt="Barcode" className="ml-auto mt-1 h-8 w-auto" />
              )}
            </div>
          </div>

          {value.kind === "letterhead" ? (
            <p className="mt-8 whitespace-pre-line text-sm leading-relaxed text-slate-700">{value.bodyText}</p>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                <div><p className="mb-1 font-semibold text-slate-700">From</p><PartyView party={value.company} /></div>
                <div><p className="mb-1 font-semibold text-slate-700">{value.kind === "purchase-order" ? "Vendor" : "Bill To"}</p><PartyView party={value.customer} /></div>
              </div>

              <table className="mt-6 w-full text-xs">
                <thead>
                  <tr className="text-white" style={{ background: accent }}>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2 text-right">Qty</th>
                    {kind.priced && <th className="p-2 text-right">Rate</th>}
                    {kind.priced && <th className="p-2 text-right">Amount</th>}
                  </tr>
                </thead>
                <tbody>
                  {value.items.map((it, i) => (
                    <tr key={it.id} className={i % 2 ? "bg-slate-50" : ""}>
                      <td className="p-2">{it.description || "—"}</td>
                      <td className="p-2 text-right">{it.qty}</td>
                      {kind.priced && <td className="p-2 text-right">{money(it.rate)}</td>}
                      {kind.priced && <td className="p-2 text-right">{money(it.qty * it.rate)}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>

              {kind.priced && (
                <div className="mt-4 ml-auto w-60 space-y-1 text-xs">
                  <Line label="Subtotal" value={money(totals.sub)} />
                  {value.discount > 0 && <Line label={`Discount (${value.discount}%)`} value={`- ${money(totals.discountAmt)}`} />}
                  {value.taxRate > 0 && <Line label={`Tax / GST (${value.taxRate}%)`} value={money(totals.taxAmt)} />}
                  {value.shipping > 0 && <Line label="Shipping" value={money(value.shipping)} />}
                  <div className="flex justify-between border-t border-slate-200 pt-1 text-sm font-bold">
                    <span>Total</span><span style={{ color: accent }}>{money(totals.grand)}</span>
                  </div>
                </div>
              )}

              {(value.notes || value.terms) && (
                <div className="mt-6 space-y-1 text-[11px] text-slate-500">
                  {value.notes && <p><span className="font-semibold">Notes:</span> {value.notes}</p>}
                  {value.terms && <p><span className="font-semibold">Terms:</span> {value.terms}</p>}
                </div>
              )}

              <div className="mt-8 flex items-end justify-between">
                <div className="flex items-end gap-4">
                  {value.stamp && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={value.stamp} alt="Stamp" className="h-20 w-20 object-contain opacity-90" />
                  )}
                  {qrUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={qrUrl} alt="QR" className="h-20 w-20" />
                  )}
                </div>
                {value.signature && (
                  <div className="text-right">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={value.signature} alt="Signature" className="ml-auto h-12 w-auto object-contain" />
                    <p className="mt-1 text-[11px] text-slate-500">Authorised signature</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */
function hexToRgb(hex: string) {
  const m = hex.replace("#", "");
  const int = parseInt(m.length === 3 ? m.split("").map((c) => c + c).join("") : m, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}
function partyLines(p: Party) {
  return [p.name, p.address, p.email, p.phone, p.gstin ? `GSTIN: ${p.gstin}` : ""].filter(Boolean);
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <div className="space-y-1.5"><Label>{label}</Label><Input value={value} onChange={(e) => onChange(e.target.value)} /></div>;
}
function UploadBtn({ label, onFile }: { label: string; onFile: (f?: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      <Button variant="outline" size="sm" onClick={() => ref.current?.click()} type="button"><Upload /> {label}</Button>
    </>
  );
}
function PartyCard({ title, party, onChange }: { title: string; party: Party; onChange: (p: Partial<Party>) => void }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Input className="col-span-2" placeholder="Name" value={party.name} onChange={(e) => onChange({ name: e.target.value })} />
        <Textarea className="col-span-2" placeholder="Address" value={party.address} onChange={(e) => onChange({ address: e.target.value })} />
        <Input placeholder="Email" value={party.email} onChange={(e) => onChange({ email: e.target.value })} />
        <Input placeholder="Phone" value={party.phone} onChange={(e) => onChange({ phone: e.target.value })} />
        <Input className="col-span-2" placeholder="GSTIN" value={party.gstin} onChange={(e) => onChange({ gstin: e.target.value })} />
      </CardContent>
    </Card>
  );
}
function PartyView({ party }: { party: Party }) {
  return (
    <div className="space-y-0.5 text-slate-600">
      <p className="font-medium text-slate-800">{party.name || "—"}</p>
      {party.address && <p className="whitespace-pre-line">{party.address}</p>}
      {party.email && <p>{party.email}</p>}
      {party.phone && <p>{party.phone}</p>}
      {party.gstin && <p>GSTIN: {party.gstin}</p>}
    </div>
  );
}
function Line({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between text-slate-600"><span>{label}</span><span>{value}</span></div>;
}
