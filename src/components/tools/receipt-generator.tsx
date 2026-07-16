"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency } from "@/lib/utils";

interface ReceiptState {
  number: string;
  date: string;
  receivedFrom: string;
  amount: number;
  method: string;
  purpose: string;
  business: string;
}

function initial(): ReceiptState {
  return {
    number: `RCPT-${Math.floor(Math.random() * 90000) + 10000}`,
    date: new Date().toISOString().slice(0, 10),
    receivedFrom: "",
    amount: 0,
    method: "Cash",
    purpose: "",
    business: "Your Business",
  };
}

export default function ReceiptGenerator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<ReceiptState>("uh:receipt", initial());
  const patch = (p: Partial<ReceiptState>) => set({ ...value, ...p });

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const primary: [number, number, number] = [79, 70, 229];
    doc.setFontSize(20); doc.setTextColor(...primary);
    doc.text("PAYMENT RECEIPT", 105, 24, { align: "center" });
    doc.setDrawColor(...primary); doc.line(14, 30, 196, 30);
    doc.setFontSize(11); doc.setTextColor(40);
    const rows: [string, string][] = [
      ["Receipt No.", value.number],
      ["Date", value.date],
      ["Business", value.business],
      ["Received From", value.receivedFrom],
      ["Payment Method", value.method],
      ["Purpose", value.purpose],
    ];
    let y = 44;
    rows.forEach(([k, v]) => { doc.setTextColor(110); doc.text(k, 14, y); doc.setTextColor(30); doc.text(v || "—", 80, y); y += 10; });
    doc.setFillColor(...primary); doc.roundedRect(14, y, 182, 18, 3, 3, "F");
    doc.setTextColor(255); doc.setFontSize(14);
    doc.text(`Amount Received: ${formatCurrency(value.amount)}`, 105, y + 12, { align: "center" });
    doc.save(`${value.number}.pdf`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Receipt details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Receipt #</Label><Input value={value.number} onChange={(e) => patch({ number: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Date</Label><Input type="date" value={value.date} onChange={(e) => patch({ date: e.target.value })} /></div>
          </div>
          <div className="space-y-1.5"><Label>Business name</Label><Input value={value.business} onChange={(e) => patch({ business: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Received from</Label><Input value={value.receivedFrom} onChange={(e) => patch({ receivedFrom: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Amount (₹)</Label><Input type="number" value={value.amount} onChange={(e) => patch({ amount: Number(e.target.value) })} /></div>
            <div className="space-y-1.5"><Label>Method</Label>
              <Select value={value.method} onChange={(e) => patch({ method: e.target.value })}>
                {["Cash", "Card", "UPI", "Bank Transfer", "Cheque"].map((m) => <option key={m}>{m}</option>)}
              </Select>
            </div>
          </div>
          <div className="space-y-1.5"><Label>Purpose</Label><Textarea value={value.purpose} onChange={(e) => patch({ purpose: e.target.value })} /></div>
          <ActionBar onUndo={undo} onRedo={redo} onReset={() => reset()} onDownload={downloadPdf} downloadLabel="Download PDF" canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <div className="rounded-2xl border border-border bg-white p-8 text-slate-900 shadow-sm">
          <h3 className="text-center text-xl font-bold text-indigo-600">PAYMENT RECEIPT</h3>
          <div className="my-4 h-px bg-slate-200" />
          <dl className="space-y-2 text-sm">
            {[
              ["Receipt No.", value.number], ["Date", value.date], ["Business", value.business],
              ["Received From", value.receivedFrom || "—"], ["Method", value.method], ["Purpose", value.purpose || "—"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-slate-500">{k}</dt><dd className="text-right font-medium text-slate-800">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 rounded-xl bg-indigo-600 py-4 text-center text-lg font-bold text-white">
            {formatCurrency(value.amount)}
          </div>
        </div>
      </div>
    </div>
  );
}
