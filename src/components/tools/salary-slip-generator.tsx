"use client";

import { useMemo } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency } from "@/lib/utils";

interface Row { id: string; label: string; amount: number; }
interface SalaryState {
  company: string;
  employee: string;
  designation: string;
  empId: string;
  month: string;
  earnings: Row[];
  deductions: Row[];
}

const row = (label = "", amount = 0): Row => ({ id: Math.random().toString(36).slice(2), label, amount });

function initial(): SalaryState {
  return {
    company: "Your Company Pvt Ltd",
    employee: "Employee Name",
    designation: "Software Engineer",
    empId: "EMP001",
    month: new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
    earnings: [row("Basic", 30000), row("HRA", 12000), row("Special Allowance", 8000)],
    deductions: [row("Provident Fund", 3600), row("Professional Tax", 200)],
  };
}

const sum = (rows: Row[]) => rows.reduce((s, r) => s + (r.amount || 0), 0);

export default function SalarySlipGenerator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<SalaryState>("uh:salary", initial());
  const totals = useMemo(() => {
    const gross = sum(value.earnings);
    const ded = sum(value.deductions);
    return { gross, ded, net: gross - ded };
  }, [value]);

  const patch = (p: Partial<SalaryState>) => set({ ...value, ...p });
  const patchRow = (key: "earnings" | "deductions", id: string, p: Partial<Row>) =>
    set({ ...value, [key]: value[key].map((r) => (r.id === id ? { ...r, ...p } : r)) });

  const downloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF();
    const primary: [number, number, number] = [79, 70, 229];
    doc.setFontSize(16); doc.setTextColor(...primary);
    doc.text(value.company, 105, 20, { align: "center" });
    doc.setFontSize(11); doc.setTextColor(80);
    doc.text(`Salary Slip — ${value.month}`, 105, 28, { align: "center" });
    doc.setFontSize(9); doc.setTextColor(40);
    doc.text(`Employee: ${value.employee}`, 14, 40);
    doc.text(`Designation: ${value.designation}`, 14, 46);
    doc.text(`Employee ID: ${value.empId}`, 140, 40);
    autoTable(doc, {
      startY: 54,
      head: [["Earnings", "Amount", "Deductions", "Amount"]],
      body: Array.from({ length: Math.max(value.earnings.length, value.deductions.length) }).map((_, i) => [
        value.earnings[i]?.label ?? "", value.earnings[i] ? formatCurrency(value.earnings[i].amount) : "",
        value.deductions[i]?.label ?? "", value.deductions[i] ? formatCurrency(value.deductions[i].amount) : "",
      ]),
      foot: [["Gross", formatCurrency(totals.gross), "Total", formatCurrency(totals.ded)]],
      headStyles: { fillColor: primary }, footStyles: { fillColor: [238, 238, 250], textColor: 20 }, styles: { fontSize: 9 },
    });
    const y = (doc as any).lastAutoTable.finalY + 10;
    doc.setFillColor(...primary); doc.roundedRect(14, y, 182, 16, 3, 3, "F");
    doc.setTextColor(255); doc.setFontSize(13);
    doc.text(`Net Pay: ${formatCurrency(totals.net)}`, 105, y + 11, { align: "center" });
    doc.save(`salary-slip-${value.month}.pdf`);
  };

  const RowEditor = ({ title, field: k }: { title: string; field: "earnings" | "deductions" }) => (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {value[k].map((r) => (
          <div key={r.id} className="grid grid-cols-12 items-center gap-2">
            <Input className="col-span-6" value={r.label} onChange={(e) => patchRow(k, r.id, { label: e.target.value })} />
            <Input className="col-span-4" type="number" value={r.amount} onChange={(e) => patchRow(k, r.id, { amount: Number(e.target.value) })} />
            <Button variant="ghost" size="icon" className="col-span-2" aria-label="Remove" onClick={() => patch({ [k]: value[k].filter((x) => x.id !== r.id) })}><Trash2 className="size-4" /></Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => patch({ [k]: [...value[k], row()] })}><Plus /> Add</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Input className="col-span-2" placeholder="Company" value={value.company} onChange={(e) => patch({ company: e.target.value })} />
            <Input placeholder="Employee" value={value.employee} onChange={(e) => patch({ employee: e.target.value })} />
            <Input placeholder="Designation" value={value.designation} onChange={(e) => patch({ designation: e.target.value })} />
            <Input placeholder="Employee ID" value={value.empId} onChange={(e) => patch({ empId: e.target.value })} />
            <Input placeholder="Month" value={value.month} onChange={(e) => patch({ month: e.target.value })} />
          </CardContent>
        </Card>
        {RowEditor({ title: "Earnings", field: "earnings" })}
        {RowEditor({ title: "Deductions", field: "deductions" })}
        <ActionBar onUndo={undo} onRedo={redo} onReset={() => reset()} onDownload={downloadPdf} downloadLabel="Download PDF" canUndo={canUndo} canRedo={canRedo} />
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <div className="rounded-2xl border border-border bg-white p-8 text-slate-900 shadow-sm">
          <h3 className="text-center text-lg font-bold text-indigo-600">{value.company}</h3>
          <p className="text-center text-xs text-slate-500">Salary Slip — {value.month}</p>
          <div className="mt-4 grid grid-cols-2 gap-1 text-xs text-slate-600">
            <p>Employee: <span className="font-medium text-slate-800">{value.employee}</span></p>
            <p>ID: <span className="font-medium text-slate-800">{value.empId}</span></p>
            <p className="col-span-2">Designation: <span className="font-medium text-slate-800">{value.designation}</span></p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="mb-1 font-semibold text-slate-700">Earnings</p>
              {value.earnings.map((r) => <div key={r.id} className="flex justify-between text-slate-600"><span>{r.label}</span><span>{formatCurrency(r.amount)}</span></div>)}
              <div className="mt-1 flex justify-between border-t border-slate-200 pt-1 font-semibold"><span>Gross</span><span>{formatCurrency(totals.gross)}</span></div>
            </div>
            <div>
              <p className="mb-1 font-semibold text-slate-700">Deductions</p>
              {value.deductions.map((r) => <div key={r.id} className="flex justify-between text-slate-600"><span>{r.label}</span><span>{formatCurrency(r.amount)}</span></div>)}
              <div className="mt-1 flex justify-between border-t border-slate-200 pt-1 font-semibold"><span>Total</span><span>{formatCurrency(totals.ded)}</span></div>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-indigo-600 py-3 text-center font-bold text-white">
            Net Pay: {formatCurrency(totals.net)}
          </div>
        </div>
      </div>
    </div>
  );
}
