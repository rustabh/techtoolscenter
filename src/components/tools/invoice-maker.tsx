"use client";

import { useMemo, useRef } from "react";
import { Plus, Trash2, Upload, Printer } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency } from "@/lib/utils";
import { newItem, subtotal, type LineItem, type Party } from "./doc-types";

interface InvoiceState {
  number: string;
  date: string;
  dueDate: string;
  company: Party;
  customer: Party;
  items: LineItem[];
  discount: number;
  taxRate: number;
  notes: string;
  terms: string;
  logo: string | null;
  signature: string | null;
}

function autoNumber() {
  const d = new Date();
  return `INV-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

const emptyParty: Party = { name: "", address: "", email: "", phone: "", gstin: "" };

function initial(): InvoiceState {
  return {
    number: autoNumber(),
    date: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 12096e5).toISOString().slice(0, 10),
    company: { ...emptyParty, name: "Your Company", gstin: "" },
    customer: { ...emptyParty },
    items: [{ ...newItem(), description: "Service / product", qty: 1, rate: 1000 }],
    discount: 0,
    taxRate: 18,
    notes: "Thank you for your business!",
    terms: "Payment due within 14 days.",
    logo: null,
    signature: null,
  };
}

export default function InvoiceMaker() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<InvoiceState>("uh:invoice", initial());
  const printRef = useRef<HTMLDivElement>(null);

  const totals = useMemo(() => {
    const sub = subtotal(value.items);
    const discountAmt = (sub * (value.discount || 0)) / 100;
    const taxable = sub - discountAmt;
    const taxAmt = (taxable * (value.taxRate || 0)) / 100;
    return { sub, discountAmt, taxable, taxAmt, grand: taxable + taxAmt };
  }, [value]);

  const patch = (p: Partial<InvoiceState>) => set({ ...value, ...p });
  const patchParty = (key: "company" | "customer", p: Partial<Party>) =>
    set({ ...value, [key]: { ...value[key], ...p } });
  const patchItem = (id: string, p: Partial<LineItem>) =>
    set({ ...value, items: value.items.map((i) => (i.id === id ? { ...i, ...p } : i)) });

  const upload = (key: "logo" | "signature", file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => patch({ [key]: reader.result as string } as Partial<InvoiceState>);
    reader.readAsDataURL(file);
  };

  const duplicate = () => patch({ number: autoNumber(), date: new Date().toISOString().slice(0, 10) });

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF();
    const primary: [number, number, number] = [79, 70, 229];

    if (value.logo) {
      try { doc.addImage(value.logo, "PNG", 14, 12, 28, 28); } catch { /* invalid image */ }
    }
    doc.setFontSize(22);
    doc.setTextColor(...primary);
    doc.text("INVOICE", 196, 22, { align: "right" });
    doc.setFontSize(10);
    doc.setTextColor(90);
    doc.text(`#${value.number}`, 196, 30, { align: "right" });
    doc.text(`Date: ${value.date}`, 196, 36, { align: "right" });
    doc.text(`Due: ${value.dueDate}`, 196, 42, { align: "right" });

    doc.setTextColor(20);
    doc.setFontSize(11);
    doc.text("From", 14, 52);
    doc.text("Bill To", 110, 52);
    doc.setFontSize(9);
    doc.setTextColor(80);
    const from = [value.company.name, value.company.address, value.company.email, value.company.phone, value.company.gstin ? `GSTIN: ${value.company.gstin}` : ""].filter(Boolean);
    const to = [value.customer.name, value.customer.address, value.customer.email, value.customer.phone, value.customer.gstin ? `GSTIN: ${value.customer.gstin}` : ""].filter(Boolean);
    doc.text(from, 14, 58);
    doc.text(to, 110, 58);

    autoTable(doc, {
      startY: 90,
      head: [["#", "Description", "Qty", "Rate", "Amount"]],
      body: value.items.map((it, i) => [
        String(i + 1),
        it.description,
        String(it.qty),
        formatCurrency(it.rate),
        formatCurrency(it.qty * it.rate),
      ]),
      headStyles: { fillColor: primary },
      styles: { fontSize: 9 },
      theme: "striped",
    });

    let y = (doc as any).lastAutoTable.finalY + 8;
    const put = (label: string, val: string, bold = false) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(bold ? 12 : 10);
      doc.setTextColor(bold ? 20 : 80);
      doc.text(label, 140, y);
      doc.text(val, 196, y, { align: "right" });
      y += bold ? 8 : 6;
    };
    put("Subtotal", formatCurrency(totals.sub));
    if (value.discount) put(`Discount (${value.discount}%)`, `- ${formatCurrency(totals.discountAmt)}`);
    put(`Tax (${value.taxRate}%)`, formatCurrency(totals.taxAmt));
    put("Total", formatCurrency(totals.grand), true);

    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80);
    if (value.notes) { doc.text(`Notes: ${value.notes}`, 14, y); y += 6; }
    if (value.terms) { doc.text(`Terms: ${value.terms}`, 14, y); y += 6; }

    if (value.signature) {
      try {
        doc.addImage(value.signature, "PNG", 150, y + 4, 40, 18);
        doc.text("Authorised signature", 150, y + 28);
      } catch { /* invalid image */ }
    }

    doc.save(`${value.number}.pdf`);
  };

  const printInvoice = () => window.print();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Editor */}
      <div className="space-y-6 print:hidden">
        <Card>
          <CardHeader><CardTitle>Invoice details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Invoice #" value={value.number} onChange={(v) => patch({ number: v })} />
              <div className="space-y-1.5">
                <Label>Date</Label>
                <Input type="date" value={value.date} onChange={(e) => patch({ date: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Due date</Label>
                <Input type="date" value={value.dueDate} onChange={(e) => patch({ dueDate: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <UploadBtn label={value.logo ? "Logo ✓" : "Upload logo"} onFile={(f) => upload("logo", f)} />
              <UploadBtn label={value.signature ? "Signature ✓" : "Upload signature"} onFile={(f) => upload("signature", f)} />
            </div>
          </CardContent>
        </Card>

        <PartyCard title="Your company" party={value.company} onChange={(p) => patchParty("company", p)} />
        <PartyCard title="Customer" party={value.customer} onChange={(p) => patchParty("customer", p)} />

        <Card>
          <CardHeader><CardTitle>Items</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {value.items.map((it) => (
              <div key={it.id} className="grid grid-cols-12 items-center gap-2">
                <Input className="col-span-5" placeholder="Description" value={it.description}
                  onChange={(e) => patchItem(it.id, { description: e.target.value })} />
                <Input className="col-span-2" type="number" placeholder="Qty" value={it.qty}
                  onChange={(e) => patchItem(it.id, { qty: Number(e.target.value) })} />
                <Input className="col-span-3" type="number" placeholder="Rate" value={it.rate}
                  onChange={(e) => patchItem(it.id, { rate: Number(e.target.value) })} />
                <Button variant="ghost" size="icon" className="col-span-2" aria-label="Remove item"
                  onClick={() => patch({ items: value.items.filter((x) => x.id !== it.id) })}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => patch({ items: [...value.items, newItem()] })}>
              <Plus /> Add item
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Totals & notes</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Discount (%)</Label>
                <Input type="number" value={value.discount} onChange={(e) => patch({ discount: Number(e.target.value) })} />
              </div>
              <div className="space-y-1.5">
                <Label>Tax / GST (%)</Label>
                <Input type="number" value={value.taxRate} onChange={(e) => patch({ taxRate: Number(e.target.value) })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea value={value.notes} onChange={(e) => patch({ notes: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Terms</Label>
              <Textarea value={value.terms} onChange={(e) => patch({ terms: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        <ActionBar
          onUndo={undo} onRedo={redo} onReset={() => reset()} onDuplicate={duplicate}
          onDownload={downloadPdf} downloadLabel="Download PDF"
          canUndo={canUndo} canRedo={canRedo}
        />
      </div>

      {/* Preview */}
      <div className="lg:sticky lg:top-20 lg:h-fit">
        <div className="mb-3 flex items-center justify-between print:hidden">
          <h3 className="text-sm font-medium text-muted-foreground">Live preview</h3>
          <Button variant="outline" size="sm" onClick={printInvoice}><Printer /> Print</Button>
        </div>
        <div ref={printRef} id="invoice-print" className="rounded-2xl border border-border bg-white p-8 text-slate-900 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              {value.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={value.logo} alt="Logo" className="mb-2 h-14 w-auto object-contain" />
              ) : (
                <p className="text-lg font-bold">{value.company.name}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-600">INVOICE</p>
              <p className="text-xs text-slate-500">#{value.number}</p>
              <p className="text-xs text-slate-500">Date: {value.date}</p>
              <p className="text-xs text-slate-500">Due: {value.dueDate}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="mb-1 font-semibold text-slate-700">From</p>
              <PartyView party={value.company} />
            </div>
            <div>
              <p className="mb-1 font-semibold text-slate-700">Bill To</p>
              <PartyView party={value.customer} />
            </div>
          </div>

          <table className="mt-6 w-full text-xs">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-right">Qty</th>
                <th className="p-2 text-right">Rate</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {value.items.map((it, i) => (
                <tr key={it.id} className={i % 2 ? "bg-slate-50" : ""}>
                  <td className="p-2">{it.description || "—"}</td>
                  <td className="p-2 text-right">{it.qty}</td>
                  <td className="p-2 text-right">{formatCurrency(it.rate)}</td>
                  <td className="p-2 text-right">{formatCurrency(it.qty * it.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 ml-auto w-56 space-y-1 text-xs">
            <Line label="Subtotal" value={formatCurrency(totals.sub)} />
            {value.discount > 0 && <Line label={`Discount (${value.discount}%)`} value={`- ${formatCurrency(totals.discountAmt)}`} />}
            <Line label={`Tax (${value.taxRate}%)`} value={formatCurrency(totals.taxAmt)} />
            <div className="flex justify-between border-t border-slate-200 pt-1 text-sm font-bold">
              <span>Total</span><span className="text-indigo-600">{formatCurrency(totals.grand)}</span>
            </div>
          </div>

          {(value.notes || value.terms) && (
            <div className="mt-6 space-y-1 text-[11px] text-slate-500">
              {value.notes && <p><span className="font-semibold">Notes:</span> {value.notes}</p>}
              {value.terms && <p><span className="font-semibold">Terms:</span> {value.terms}</p>}
            </div>
          )}

          {value.signature && (
            <div className="mt-8 text-right">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value.signature} alt="Signature" className="ml-auto h-12 w-auto object-contain" />
              <p className="mt-1 text-[11px] text-slate-500">Authorised signature</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function UploadBtn({ label, onFile }: { label: string; onFile: (f?: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      <Button variant="outline" size="sm" onClick={() => ref.current?.click()} type="button">
        <Upload /> {label}
      </Button>
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
  return (
    <div className="flex justify-between text-slate-600">
      <span>{label}</span><span>{value}</span>
    </div>
  );
}
