"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Trash2, Upload, Printer, FileDown, ImageDown, Sparkles, Wand2, Loader2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { showToast } from "@/components/ui/toaster";
import { formatCurrency, localDateISO } from "@/lib/utils";
import { saveItem } from "@/lib/saved";
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

/* Each document type has its own dedicated, searchable tool page. */
const KIND_SLUG: Record<DocKind, string> = {
  invoice: "invoice-maker",
  quotation: "quotation-generator",
  estimate: "estimate-maker",
  "purchase-order": "purchase-order-generator",
  receipt: "receipt-generator",
  "delivery-challan": "delivery-challan",
  "credit-note": "credit-note",
  "debit-note": "debit-note",
  "packing-slip": "packing-slip",
  letterhead: "letterhead-maker",
};

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

/* Tax modes — Indian GST splits into CGST+SGST for intra-state and IGST for
   inter-state; "single" is a plain sales/VAT tax; "none" disables tax. */
type TaxMode = "gst-split" | "igst" | "single" | "none";
const TAX_MODES: { id: TaxMode; label: string }[] = [
  { id: "gst-split", label: "GST — CGST + SGST" },
  { id: "igst", label: "GST — IGST" },
  { id: "single", label: "Single tax / VAT" },
  { id: "none", label: "No tax" },
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
  taxType: TaxMode;
  notes: string;
  terms: string;
  bankDetails: string;
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

function initial(kind: DocKind = "invoice"): BizState {
  const prefix = DOC_TYPES.find((d) => d.id === kind)?.prefix ?? "INV";
  return {
    kind,
    templateId: "indigo-classic",
    number: autoNumber(prefix),
    date: localDateISO(),
    dueDate: localDateISO(new Date(Date.now() + 12096e5)),
    currency: "INR",
    company: { ...emptyParty, name: "Your Company" },
    customer: { ...emptyParty },
    items: [{ ...newItem(), description: "Service / product", qty: 1, rate: 1000 }],
    discount: 0,
    shipping: 0,
    taxRate: 18,
    taxType: "gst-split",
    notes: "Thank you for your business!",
    terms: "Payment due within 14 days.",
    bankDetails: "",
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

export default function BusinessStudio({ lockKind }: { lockKind?: DocKind }) {
  const storageKey = lockKind ? `uh:doc-${lockKind}` : "uh:business-studio";
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<BizState>(storageKey, initial(lockKind));
  const printRef = useRef<HTMLDivElement>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [barUrl, setBarUrl] = useState<string | null>(null);
  const [exporting, setExporting] = useState<"pdf" | "png" | null>(null);

  const kind = DOC_TYPES.find((d) => d.id === value.kind) ?? DOC_TYPES[0];
  const template = TEMPLATES.find((t) => t.id === value.templateId) ?? TEMPLATES[0];
  const accent = template.accent;
  const sym = value.currency;
  const money = (n: number) => formatCurrency(n, sym);

  const totals = useMemo(() => {
    const sub = subtotal(value.items);
    // Clamp to 0 so a negative Discount/Shipping (invalid input) can't inflate
    // the total or desync the preview's `> 0` line-item guard from the PDF's.
    const discountPct = Math.max(0, value.discount || 0);
    const shipping = Math.max(0, value.shipping || 0);
    const discountAmt = (sub * discountPct) / 100;
    const taxable = sub - discountAmt;
    const rate = value.taxType === "none" ? 0 : value.taxRate || 0;
    const taxAmt = (taxable * rate) / 100;
    const grand = taxable + taxAmt + shipping;
    return { sub, discountAmt, taxable, taxAmt, grand, rate, shipping };
  }, [value]);

  // Individual tax lines to render (label + amount) based on the chosen mode.
  const taxLines = useMemo((): { label: string; amt: number }[] => {
    const { taxAmt, rate } = totals;
    if (!rate || value.taxType === "none") return [];
    if (value.taxType === "gst-split") {
      return [
        { label: `CGST (${(rate / 2).toFixed(rate % 2 ? 1 : 0)}%)`, amt: taxAmt / 2 },
        { label: `SGST (${(rate / 2).toFixed(rate % 2 ? 1 : 0)}%)`, amt: taxAmt / 2 },
      ];
    }
    if (value.taxType === "igst") return [{ label: `IGST (${rate}%)`, amt: taxAmt }];
    return [{ label: `Tax / VAT (${rate}%)`, amt: taxAmt }];
  }, [totals, value.taxType]);

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

  const duplicate = () => patch({ number: autoNumber(kind.prefix), date: localDateISO() });

  /* ---------------- PDF export ---------------- */
  const downloadPdf = async () => {
    if (exporting) return;
    setExporting("pdf");
    try {
      await generatePdf();
      showToast(`${kind.label} PDF downloaded`);
    } catch {
      showToast("Couldn't generate the PDF — try again", "error");
    } finally {
      setExporting(null);
    }
  };

  const generatePdf = async () => {
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
      const bodyLines = doc.splitTextToSize(value.bodyText, 180);
      doc.text(bodyLines, 14, 70);
      const signY = 70 + bodyLines.length * 6 + 20;
      if (value.stamp) { try { doc.addImage(value.stamp, "PNG", 14, signY, 26, 26); } catch {} }
      if (qrUrl) { try { doc.addImage(qrUrl, "PNG", 60, signY + 2, 24, 24); } catch {} }
      if (value.signature) { try { doc.addImage(value.signature, "PNG", 150, signY + 2, 40, 18); doc.text("Authorised signature", 150, signY + 26); } catch {} }
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
        if (totals.discountAmt > 0) put(`Discount (${value.discount}%)`, `- ${money(totals.discountAmt)}`);
        taxLines.forEach((t) => put(t.label, money(t.amt)));
        if (totals.shipping > 0) put("Shipping", money(totals.shipping));
        put("Total", money(totals.grand), true);
      }

      y += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(80);
      if (value.notes) { const lines = doc.splitTextToSize(`Notes: ${value.notes}`, 180); doc.text(lines, 14, y); y += lines.length * 5 + 1; }
      if (value.terms) { const lines = doc.splitTextToSize(`Terms: ${value.terms}`, 180); doc.text(lines, 14, y); y += lines.length * 5 + 1; }
      if (value.bankDetails) { const lines = doc.splitTextToSize(`Bank details: ${value.bankDetails}`, 180); doc.text(lines, 14, y); y += lines.length * 5 + 1; }
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
    if (!printRef.current || exporting) return;
    setExporting("png");
    try {
      const { toPng } = await import("html-to-image");
      const url = await toPng(printRef.current, { pixelRatio: 2.5, cacheBust: true, backgroundColor: "#ffffff" });
      const a = document.createElement("a");
      a.href = url;
      a.download = `${value.number}.png`;
      a.click();
      showToast(`${kind.label} PNG downloaded`);
    } catch {
      showToast("Couldn't generate the PNG — try again", "error");
    } finally {
      setExporting(null);
    }
  };

  // Ctrl/Cmd+S saves the PDF instead of triggering the browser's save dialog.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        downloadPdf();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, exporting]);

  const layout = template.layout;
  // Minimal is deliberately monochrome; every other layout uses the accent.
  const headBg = layout === "minimal" ? "#0f172a" : accent;
  const titleColor = layout === "minimal" ? "#0f172a" : accent;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Editor */}
      <div className="space-y-6 print:hidden">
        <Card>
          <CardHeader><CardTitle>{lockKind ? kind.label : "Document"}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {!lockKind && (
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
            )}
            <div className="space-y-1.5">
              <Label>Design ({TEMPLATES.length})</Label>
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
                {value.items.length === 0 && (
                  <p className="rounded-lg border border-dashed border-border py-4 text-center text-sm text-muted-foreground">No items yet — add your first line item below.</p>
                )}
                {value.items.map((it) => (
                  <div key={it.id} className="grid grid-cols-2 items-center gap-2 sm:grid-cols-12">
                    <Input className="col-span-2 sm:col-span-5" placeholder="Description" aria-label="Item description" value={it.description} onChange={(e) => patchItem(it.id, { description: e.target.value })} />
                    <Input className="sm:col-span-2" type="number" placeholder="Qty" aria-label="Quantity" value={it.qty} onChange={(e) => patchItem(it.id, { qty: Number(e.target.value) })} />
                    {kind.priced && <Input className="sm:col-span-3" type="number" placeholder="Rate" aria-label="Rate" value={it.rate} onChange={(e) => patchItem(it.id, { rate: Number(e.target.value) })} />}
                    <Button variant="ghost" size="icon" className={kind.priced ? "sm:col-span-2" : "sm:col-span-5"} aria-label={`Remove ${it.description || "item"}`} onClick={() => patch({ items: value.items.filter((x) => x.id !== it.id) })}><Trash2 className="size-4" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => patch({ items: [...value.items, newItem()] })}><Plus /> Add item</Button>
              </CardContent>
            </Card>

            {kind.priced && (
              <Card>
                <CardHeader><CardTitle>Charges</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5"><Label>Discount (%)</Label><Input type="number" min={0} value={value.discount} onChange={(e) => patch({ discount: Number(e.target.value) })} /></div>
                  <div className="space-y-1.5"><Label>Shipping</Label><Input type="number" min={0} value={value.shipping} onChange={(e) => patch({ shipping: Number(e.target.value) })} /></div>
                  <div className="space-y-1.5"><Label>Tax type</Label>
                    <Select value={value.taxType} onChange={(e) => patch({ taxType: e.target.value as TaxMode })}>
                      {TAX_MODES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                    </Select>
                  </div>
                  <div className="space-y-1.5"><Label>Total tax rate (%)</Label><Input type="number" value={value.taxRate} disabled={value.taxType === "none"} onChange={(e) => patch({ taxRate: Number(e.target.value) })} /></div>
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
            {kind.priced && (
              <div className="space-y-1.5">
                <Label htmlFor="business-bank-details">Bank / payment details (optional)</Label>
                <Textarea id="business-bank-details" placeholder="Account name, number, IFSC, UPI ID…" value={value.bankDetails} onChange={(e) => patch({ bankDetails: e.target.value })} />
              </div>
            )}
            <div className="space-y-1.5"><Label>Watermark text (optional)</Label><Input placeholder="e.g. PAID / DRAFT" value={value.watermark} onChange={(e) => patch({ watermark: e.target.value })} /></div>
            <div className="flex flex-wrap gap-4 pt-1">
              <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={value.showQR} onChange={(e) => patch({ showQR: e.target.checked })} className="size-4 accent-[var(--primary)]" /> QR code</label>
              <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={value.showBarcode} onChange={(e) => patch({ showBarcode: e.target.checked })} className="size-4 accent-[var(--primary)]" /> Barcode</label>
            </div>
          </CardContent>
        </Card>

        <ActionBar onUndo={undo} onRedo={redo} onReset={() => reset()} onDuplicate={duplicate} onDownload={downloadPdf} downloadLabel={exporting === "pdf" ? "Generating…" : "Download PDF"} canUndo={canUndo} canRedo={canRedo} />
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={downloadPng} disabled={!!exporting} aria-label="Download as PNG image">
            {exporting === "png" ? <Loader2 className="size-4 animate-spin" /> : <ImageDown className="size-4" />} {exporting === "png" ? "Generating…" : "PNG"}
          </Button>
          <Button variant="outline" size="sm" onClick={downloadPdf} disabled={!!exporting} aria-label="Download as PDF">
            {exporting === "pdf" ? <Loader2 className="size-4 animate-spin" /> : <FileDown className="size-4" />} {exporting === "pdf" ? "Generating…" : "PDF"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()} aria-label="Print document"><Printer className="size-4" /> Print</Button>
          <Button variant="outline" size="sm" onClick={() => saveItem({ type: "project", title: `${kind.label} ${value.number}`, subtitle: value.customer.name || value.company.name, href: `/tools/${KIND_SLUG[value.kind]}` })}>Save project</Button>
          <Button variant="outline" size="sm" onClick={() => saveItem({ type: "template", title: `${kind.label} · ${template.name}`, subtitle: "Template", href: `/tools/${KIND_SLUG[value.kind]}` })}>Save template</Button>
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

          <DocHeader layout={layout} value={value} kind={kind} accent={accent} titleColor={titleColor} barUrl={barUrl} />

          {value.kind === "letterhead" ? (
            <>
              <p className="mt-8 whitespace-pre-line text-sm leading-relaxed text-slate-700">{value.bodyText}</p>
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
          ) : (
            <div className={layout === "sidebar" ? "pl-4" : ""}>
              <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                <div><p className="mb-1 font-semibold" style={{ color: titleColor }}>From</p><PartyView party={value.company} /></div>
                <div><p className="mb-1 font-semibold" style={{ color: titleColor }}>{value.kind === "purchase-order" ? "Vendor" : "Bill To"}</p><PartyView party={value.customer} /></div>
              </div>

              <table className="mt-6 w-full text-xs">
                <thead>
                  {layout === "minimal" ? (
                    <tr className="border-b-2 border-slate-800 text-left text-slate-800">
                      <th className="py-2 pr-2 font-semibold uppercase tracking-wide">Description</th>
                      <th className="py-2 px-2 text-right font-semibold uppercase tracking-wide">Qty</th>
                      {kind.priced && <th className="py-2 px-2 text-right font-semibold uppercase tracking-wide">Rate</th>}
                      {kind.priced && <th className="py-2 pl-2 text-right font-semibold uppercase tracking-wide">Amount</th>}
                    </tr>
                  ) : (
                    <tr className="text-white" style={{ background: headBg }}>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-right">Qty</th>
                      {kind.priced && <th className="p-2 text-right">Rate</th>}
                      {kind.priced && <th className="p-2 text-right">Amount</th>}
                    </tr>
                  )}
                </thead>
                <tbody>
                  {value.items.length === 0 && (
                    <tr><td colSpan={kind.priced ? 4 : 2} className="py-4 text-center text-slate-400">No items added yet</td></tr>
                  )}
                  {value.items.map((it, i) => (
                    <tr key={it.id} className={layout === "minimal" ? "border-b border-slate-100" : i % 2 ? "bg-slate-50" : ""}>
                      <td className={layout === "minimal" ? "py-2 pr-2" : "p-2"}>{it.description || "—"}</td>
                      <td className={`text-right ${layout === "minimal" ? "py-2 px-2" : "p-2"}`}>{it.qty}</td>
                      {kind.priced && <td className={`text-right ${layout === "minimal" ? "py-2 px-2" : "p-2"}`}>{money(it.rate)}</td>}
                      {kind.priced && <td className={`text-right ${layout === "minimal" ? "py-2 pl-2" : "p-2"}`}>{money(it.qty * it.rate)}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>

              {kind.priced && (
                <div className={`mt-4 w-64 space-y-1 text-xs ${layout === "bold" ? "" : "ml-auto"}`}>
                  <Line label="Subtotal" value={money(totals.sub)} />
                  {totals.discountAmt > 0 && <Line label={`Discount (${value.discount}%)`} value={`- ${money(totals.discountAmt)}`} />}
                  {taxLines.map((t) => <Line key={t.label} label={t.label} value={money(t.amt)} />)}
                  {totals.shipping > 0 && <Line label="Shipping" value={money(totals.shipping)} />}
                  <div className={`flex justify-between border-t border-slate-200 pt-1.5 text-sm font-bold ${layout === "modern" || layout === "bold" ? "rounded-md px-2 py-1.5 text-white" : ""}`} style={layout === "modern" || layout === "bold" ? { background: accent } : undefined}>
                    <span>Total</span><span style={layout === "modern" || layout === "bold" ? undefined : { color: titleColor }}>{money(totals.grand)}</span>
                  </div>
                </div>
              )}

              {(value.notes || value.terms || value.bankDetails) && (
                <div className="mt-6 space-y-1 text-[11px] text-slate-500">
                  {value.notes && <p><span className="font-semibold">Notes:</span> {value.notes}</p>}
                  {value.terms && <p><span className="font-semibold">Terms:</span> {value.terms}</p>}
                  {value.bankDetails && <p><span className="font-semibold">Bank details:</span> {value.bankDetails}</p>}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- document headers — one genuinely different design per layout ---------- */
type HeaderProps = {
  layout: Layout;
  value: BizState;
  kind: (typeof DOC_TYPES)[number];
  accent: string;
  titleColor: string;
  barUrl: string | null;
};

function Logo({ src, name, className = "h-12" }: { src: string | null; name: string; className?: string }) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Logo" className={`${className} w-auto object-contain`} />
  ) : (
    <p className="text-lg font-bold">{name}</p>
  );
}

function Meta({ value, kind, muted }: { value: BizState; kind: HeaderProps["kind"]; muted?: string }) {
  const c = muted ?? "text-slate-500";
  return (
    <div className={`text-right text-xs ${c}`}>
      <p>#{value.number}</p>
      <p>Date: {value.date}</p>
      {kind.priced && <p>Due: {value.dueDate}</p>}
    </div>
  );
}

function Barcode({ url, className = "ml-auto mt-1 h-8" }: { url: string | null; className?: string }) {
  if (!url) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt="Barcode" className={`${className} w-auto`} />;
}

function DocHeader({ layout, value, kind, accent, titleColor, barUrl }: HeaderProps) {
  const title = kind.title || value.company.name;

  if (layout === "modern") {
    return (
      <div>
        <div className="-mx-8 -mt-8 mb-6 flex items-center justify-between px-8 py-6 text-white" style={{ background: accent }}>
          <div>
            <p className="text-2xl font-bold tracking-tight">{title}</p>
            <p className="text-xs opacity-90">{value.company.name}</p>
          </div>
          <div className="text-right text-xs opacity-95">
            <p>#{value.number}</p>
            <p>Date: {value.date}</p>
            {kind.priced && <p>Due: {value.dueDate}</p>}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Logo src={value.logo} name={value.company.name} />
          <Barcode url={barUrl} />
        </div>
      </div>
    );
  }

  if (layout === "bold") {
    return (
      <div className="flex items-start justify-between gap-4">
        <div className="-ml-8 -mt-8 mb-2 rounded-br-3xl px-8 py-6 text-white" style={{ background: accent }}>
          <p className="text-3xl font-black uppercase leading-none tracking-tight">{title}</p>
          <p className="mt-1 text-xs opacity-90">#{value.number}</p>
        </div>
        <div className="text-right">
          <Logo src={value.logo} name={value.company.name} className="ml-auto h-12" />
          <p className="mt-1 text-sm font-semibold">{value.company.name}</p>
          <p className="text-xs text-slate-500">Date: {value.date}</p>
          {kind.priced && <p className="text-xs text-slate-500">Due: {value.dueDate}</p>}
          <Barcode url={barUrl} />
        </div>
      </div>
    );
  }

  if (layout === "minimal") {
    return (
      <div className="flex items-end justify-between border-b border-slate-300 pb-4">
        <div>
          <Logo src={value.logo} name={value.company.name} className="h-10" />
          <p className="mt-1 text-sm font-medium text-slate-700">{value.company.name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-800">{title}</p>
          <Meta value={value} kind={kind} />
          <Barcode url={barUrl} />
        </div>
      </div>
    );
  }

  if (layout === "sidebar") {
    return (
      <div className="flex items-stretch gap-4">
        <div className="-ml-8 -mt-8 mb-2 flex flex-col justify-center px-4 py-6 text-white" style={{ background: accent }}>
          <p className="text-sm font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">{title}</p>
        </div>
        <div className="flex flex-1 items-start justify-between pt-1">
          <div>
            <Logo src={value.logo} name={value.company.name} />
            {value.logo && <p className="mt-1 text-sm font-semibold">{value.company.name}</p>}
          </div>
          <div>
            <Meta value={value} kind={kind} />
            <Barcode url={barUrl} />
          </div>
        </div>
      </div>
    );
  }

  // classic
  return (
    <div className="flex items-start justify-between border-b-2 pb-4" style={{ borderColor: accent }}>
      <div>
        <Logo src={value.logo} name={value.company.name} className="mb-2 h-14" />
        {value.logo && <p className="text-sm font-semibold">{value.company.name}</p>}
      </div>
      <div className="text-right">
        {kind.title && <p className="text-2xl font-bold" style={{ color: titleColor }}>{kind.title}</p>}
        <Meta value={value} kind={kind} />
        <Barcode url={barUrl} />
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
