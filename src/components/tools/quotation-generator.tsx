"use client";

import { useMemo } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency } from "@/lib/utils";
import { newItem, subtotal, type LineItem } from "./doc-types";

interface QuoteState {
  number: string;
  date: string;
  validUntil: string;
  from: string;
  to: string;
  items: LineItem[];
  taxRate: number;
  notes: string;
}

function initial(): QuoteState {
  return {
    number: `QT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
    date: new Date().toISOString().slice(0, 10),
    validUntil: new Date(Date.now() + 12096e5).toISOString().slice(0, 10),
    from: "Your Company\nhello@company.com",
    to: "Client name\nclient@email.com",
    items: [{ ...newItem(), description: "Consulting", qty: 10, rate: 1500 }],
    taxRate: 18,
    notes: "This quotation is valid for 14 days.",
  };
}

export default function QuotationGenerator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<QuoteState>("uh:quote", initial());

  const totals = useMemo(() => {
    const sub = subtotal(value.items);
    const tax = (sub * (value.taxRate || 0)) / 100;
    return { sub, tax, grand: sub + tax };
  }, [value]);

  const patch = (p: Partial<QuoteState>) => set({ ...value, ...p });
  const patchItem = (id: string, p: Partial<LineItem>) =>
    set({ ...value, items: value.items.map((i) => (i.id === id ? { ...i, ...p } : i)) });

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF();
    const primary: [number, number, number] = [79, 70, 229];
    doc.setFontSize(22); doc.setTextColor(...primary);
    doc.text("QUOTATION", 14, 22);
    doc.setFontSize(10); doc.setTextColor(90);
    doc.text(`#${value.number}`, 196, 18, { align: "right" });
    doc.text(`Date: ${value.date}`, 196, 24, { align: "right" });
    doc.text(`Valid until: ${value.validUntil}`, 196, 30, { align: "right" });
    doc.setTextColor(20); doc.setFontSize(9);
    doc.text("From:", 14, 40); doc.text(value.from.split("\n"), 14, 45);
    doc.text("To:", 110, 40); doc.text(value.to.split("\n"), 110, 45);
    autoTable(doc, {
      startY: 70,
      head: [["#", "Description", "Qty", "Rate", "Amount"]],
      body: value.items.map((it, i) => [String(i + 1), it.description, String(it.qty), formatCurrency(it.rate), formatCurrency(it.qty * it.rate)]),
      headStyles: { fillColor: primary }, styles: { fontSize: 9 }, theme: "striped",
    });
    let y = (doc as any).lastAutoTable.finalY + 8;
    doc.setFontSize(10); doc.setTextColor(80);
    doc.text(`Subtotal: ${formatCurrency(totals.sub)}`, 196, y, { align: "right" }); y += 6;
    doc.text(`Tax (${value.taxRate}%): ${formatCurrency(totals.tax)}`, 196, y, { align: "right" }); y += 8;
    doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor(20);
    doc.text(`Total: ${formatCurrency(totals.grand)}`, 196, y, { align: "right" }); y += 10;
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(80);
    if (value.notes) doc.text(value.notes, 14, y);
    doc.save(`${value.number}.pdf`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Quotation details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Number</Label><Input value={value.number} onChange={(e) => patch({ number: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Tax (%)</Label><Input type="number" value={value.taxRate} onChange={(e) => patch({ taxRate: Number(e.target.value) })} /></div>
              <div className="space-y-1.5"><Label>Date</Label><Input type="date" value={value.date} onChange={(e) => patch({ date: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>Valid until</Label><Input type="date" value={value.validUntil} onChange={(e) => patch({ validUntil: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>From</Label><Textarea value={value.from} onChange={(e) => patch({ from: e.target.value })} /></div>
              <div className="space-y-1.5"><Label>To</Label><Textarea value={value.to} onChange={(e) => patch({ to: e.target.value })} /></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Items</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {value.items.map((it) => (
              <div key={it.id} className="grid grid-cols-12 items-center gap-2">
                <Input className="col-span-5" placeholder="Description" value={it.description} onChange={(e) => patchItem(it.id, { description: e.target.value })} />
                <Input className="col-span-2" type="number" value={it.qty} onChange={(e) => patchItem(it.id, { qty: Number(e.target.value) })} />
                <Input className="col-span-3" type="number" value={it.rate} onChange={(e) => patchItem(it.id, { rate: Number(e.target.value) })} />
                <Button variant="ghost" size="icon" className="col-span-2" aria-label="Remove" onClick={() => patch({ items: value.items.filter((x) => x.id !== it.id) })}><Trash2 className="size-4" /></Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => patch({ items: [...value.items, newItem()] })}><Plus /> Add item</Button>
            <div className="space-y-1.5"><Label>Notes</Label><Textarea value={value.notes} onChange={(e) => patch({ notes: e.target.value })} /></div>
          </CardContent>
        </Card>
        <ActionBar onUndo={undo} onRedo={redo} onReset={() => reset()} onDownload={downloadPdf} downloadLabel="Download PDF" canUndo={canUndo} canRedo={canRedo} />
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <div className="rounded-2xl border border-border bg-white p-8 text-slate-900 shadow-sm">
          <div className="flex items-start justify-between">
            <p className="text-2xl font-bold text-indigo-600">QUOTATION</p>
            <div className="text-right text-xs text-slate-500">
              <p>#{value.number}</p><p>Date: {value.date}</p><p>Valid until: {value.validUntil}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-slate-600">
            <div><p className="font-semibold text-slate-700">From</p><p className="whitespace-pre-line">{value.from}</p></div>
            <div><p className="font-semibold text-slate-700">To</p><p className="whitespace-pre-line">{value.to}</p></div>
          </div>
          <table className="mt-6 w-full text-xs">
            <thead><tr className="bg-indigo-600 text-white"><th className="p-2 text-left">Description</th><th className="p-2 text-right">Qty</th><th className="p-2 text-right">Rate</th><th className="p-2 text-right">Amount</th></tr></thead>
            <tbody>
              {value.items.map((it, i) => (
                <tr key={it.id} className={i % 2 ? "bg-slate-50" : ""}>
                  <td className="p-2">{it.description || "—"}</td><td className="p-2 text-right">{it.qty}</td>
                  <td className="p-2 text-right">{formatCurrency(it.rate)}</td><td className="p-2 text-right">{formatCurrency(it.qty * it.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 ml-auto w-52 space-y-1 text-xs text-slate-600">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(totals.sub)}</span></div>
            <div className="flex justify-between"><span>Tax ({value.taxRate}%)</span><span>{formatCurrency(totals.tax)}</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-1 text-sm font-bold"><span>Total</span><span className="text-indigo-600">{formatCurrency(totals.grand)}</span></div>
          </div>
          {value.notes && <p className="mt-6 text-[11px] text-slate-500">{value.notes}</p>}
        </div>
      </div>
    </div>
  );
}
