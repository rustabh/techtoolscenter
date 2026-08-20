"use client";

import { useMemo, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { showToast } from "@/components/ui/toaster";
import { formatCurrency } from "@/lib/utils";
import { LogoEditor, readLogoFile, type LogoAlign } from "@/components/tools/logo-editor";

interface Row { id: string; label: string; amount: number; }
interface SalaryState {
  company: string;
  employee: string;
  designation: string;
  empId: string;
  month: string;
  earnings: Row[];
  deductions: Row[];
  logo?: string;
  logoW?: number;
  logoH?: number;
  logoAlign: LogoAlign;
  logoSize: number; // 30-70, % of the logo's max box width
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
    logoAlign: "center",
    logoSize: 45,
  };
}

const sum = (rows: Row[]) => rows.reduce((s, r) => s + (r.amount || 0), 0);

export default function SalarySlipGenerator() {
  const { value: stored, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<SalaryState>("uh:salary", initial());
  const value: SalaryState = {
    ...stored,
    logoAlign: stored.logoAlign ?? "center",
    logoSize: stored.logoSize ?? 45,
  };
  const [exporting, setExporting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  const totals = useMemo(() => {
    const gross = sum(value.earnings);
    const ded = sum(value.deductions);
    return { gross, ded, net: gross - ded };
  }, [value.earnings, value.deductions]);

  const patch = (p: Partial<SalaryState>) => set({ ...value, ...p });
  const patchRow = (key: "earnings" | "deductions", id: string, p: Partial<Row>) =>
    set({ ...value, [key]: value[key].map((r) => (r.id === id ? { ...r, ...p } : r)) });

  const onLogoUpload = (file: File) =>
    readLogoFile(
      file,
      (dataUrl, w, h) => patch({ logo: dataUrl, logoW: w, logoH: h }),
      (message) => showToast(message, "error"),
    );
  const removeLogo = () => patch({ logo: undefined, logoW: undefined, logoH: undefined });

  // Captures the live preview itself rather than redrawing the slip a
  // second time with hand-placed jsPDF/autotable coordinates, so the
  // download always matches whatever's actually on screen.
  const downloadPdf = async () => {
    if (exporting) return;
    if (!printRef.current) {
      showToast("Nothing to export yet", "error");
      return;
    }
    setExporting(true);
    try {
      const { exportNodeToPdf } = await import("@/lib/pdf/capture-to-pdf");
      await exportNodeToPdf(printRef.current, {
        filename: `salary-slip-${value.month}.pdf`,
        captureStyle: { border: "none", boxShadow: "none", borderRadius: "0" },
      });
      showToast("Salary slip PDF downloaded");
    } catch {
      showToast("Couldn't generate the PDF — try again", "error");
    } finally {
      setExporting(false);
    }
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
            <div className="col-span-2">
              <LogoEditor logo={value.logo} align={value.logoAlign} size={value.logoSize} onUpload={onLogoUpload} onRemove={removeLogo}
                onAlign={(a) => patch({ logoAlign: a })} onSize={(n) => patch({ logoSize: n })} />
            </div>
          </CardContent>
        </Card>
        {RowEditor({ title: "Earnings", field: "earnings" })}
        {RowEditor({ title: "Deductions", field: "deductions" })}
        <ActionBar onUndo={undo} onRedo={redo} onReset={() => reset()} onDownload={downloadPdf} downloadLabel={exporting ? "Generating…" : "Download PDF"} canUndo={canUndo} canRedo={canRedo} />
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <div ref={printRef} className="rounded-2xl border border-border bg-white p-8 text-slate-900 shadow-sm">
          {value.logo && (
            <div className={`mb-4 flex ${value.logoAlign === "left" ? "justify-start" : value.logoAlign === "right" ? "justify-end" : "justify-center"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value.logo} alt="" className="max-h-16 object-contain" style={{ maxWidth: `${value.logoSize}%` }} />
            </div>
          )}
          <h3 className="text-center text-lg font-bold text-indigo-600">{value.company}</h3>
          <p className="text-center text-xs text-slate-500">Salary Slip — {value.month}</p>
          <div data-pdf-block className="mt-4 grid grid-cols-2 gap-1 text-xs text-slate-600">
            <p>Employee: <span className="font-medium text-slate-800">{value.employee}</span></p>
            <p>ID: <span className="font-medium text-slate-800">{value.empId}</span></p>
            <p className="col-span-2">Designation: <span className="font-medium text-slate-800">{value.designation}</span></p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
            <div data-pdf-block>
              <p className="mb-1 font-semibold text-slate-700">Earnings</p>
              {value.earnings.map((r) => <div key={r.id} className="flex justify-between text-slate-600"><span>{r.label}</span><span>{formatCurrency(r.amount)}</span></div>)}
              <div className="mt-1 flex justify-between border-t border-slate-200 pt-1 font-semibold"><span>Gross</span><span>{formatCurrency(totals.gross)}</span></div>
            </div>
            <div data-pdf-block>
              <p className="mb-1 font-semibold text-slate-700">Deductions</p>
              {value.deductions.map((r) => <div key={r.id} className="flex justify-between text-slate-600"><span>{r.label}</span><span>{formatCurrency(r.amount)}</span></div>)}
              <div className="mt-1 flex justify-between border-t border-slate-200 pt-1 font-semibold"><span>Total</span><span>{formatCurrency(totals.ded)}</span></div>
            </div>
          </div>
          <div data-pdf-block className="mt-4 rounded-xl bg-indigo-600 py-3 text-center font-bold text-white">
            Net Pay: {formatCurrency(totals.net)}
          </div>
        </div>
      </div>
    </div>
  );
}
