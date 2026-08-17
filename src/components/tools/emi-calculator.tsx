"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency, downloadBlob } from "@/lib/utils";

interface EmiState {
  principal: string;
  rate: string;
  years: string;
  extraMonthly: string;
}
const initial: EmiState = { principal: "500000", rate: "9.5", years: "5", extraMonthly: "0" };

interface PrepaymentResult {
  monthsSaved: number;
  interestSaved: number;
  newTenureMonths: number;
}

// Simulates paying `extra` on top of the regular EMI every month — the loan
// closes the moment the balance hits 0, which is usually months (sometimes
// years) before the original tenure, and the interest never accrued on that
// skipped balance is the actual saving.
function simulatePrepayment(P: number, r: number, emi: number, n: number, extra: number): PrepaymentResult | null {
  if (extra <= 0 || P <= 0) return null;
  let balance = P;
  let month = 0;
  let interestPaid = 0;
  const payment = emi + extra;
  while (balance > 0 && month < n) {
    const interestPart = balance * r;
    const principalPart = Math.min(payment - interestPart, balance);
    interestPaid += interestPart;
    balance -= principalPart;
    month++;
  }
  const originalInterest = emi * n - P;
  return { monthsSaved: n - month, interestSaved: Math.max(originalInterest - interestPaid, 0), newTenureMonths: month };
}

export default function EmiCalculator() {
  const { value: stored, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<EmiState>("uh:emi", initial);
  // Calculations saved before the prepayment field existed won't have it.
  const value = useMemo(() => (stored.extraMonthly !== undefined ? stored : { ...stored, extraMonthly: "0" }), [stored]);
  const { copied, copy } = useCopy();

  const data = useMemo(() => {
    const P = parseFloat(value.principal) || 0;
    const annual = parseFloat(value.rate) || 0;
    const n = (parseFloat(value.years) || 0) * 12;
    if (P <= 0 || n <= 0) return { emi: 0, total: 0, interest: 0, principal: P, schedule: [] as { year: number; principal: number; interest: number; balance: number }[], prepayment: null as PrepaymentResult | null };
    const r = annual / 12 / 100;
    const emi = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - P;
    const prepayment = simulatePrepayment(P, r, emi, n, parseFloat(value.extraMonthly) || 0);

    // Yearly amortization — iterate by actual month count (n), not the raw
    // "years" input rounded down. A fractional tenure like 4.5 years gives
    // n = 54 months; looping `y <= years` only ever runs 4 full 12-month
    // blocks and silently drops the last 6 months (and the balance never
    // reaching 0) from the table, even though the summary above is computed
    // correctly from n. Grouping by however many months remain in the final
    // block keeps integer-year tenures identical to before while fixing the
    // fractional case.
    let balance = P;
    const schedule: { year: number; principal: number; interest: number; balance: number }[] = [];
    let month = 0;
    let yearIndex = 0;
    while (month < n) {
      yearIndex++;
      let yearInterest = 0;
      let yearPrincipal = 0;
      const monthsInBlock = Math.min(12, n - month);
      for (let m = 0; m < monthsInBlock; m++) {
        const interestPart = balance * r;
        const principalPart = emi - interestPart;
        yearInterest += interestPart;
        yearPrincipal += principalPart;
        balance -= principalPart;
        month++;
      }
      schedule.push({ year: yearIndex, principal: yearPrincipal, interest: yearInterest, balance: Math.max(balance, 0) });
    }
    return { emi, total, interest, principal: P, schedule, prepayment };
  }, [value]);

  const pct = data.total > 0 ? (data.principal / data.total) * 100 : 0;
  const hasResult = data.total > 0;
  const summary = `EMI: ${formatCurrency(data.emi)}/month on ${formatCurrency(data.principal)} at ${value.rate}% for ${value.years} years — Interest ${formatCurrency(data.interest)}, Total payable ${formatCurrency(data.total)}`;

  const downloadCsv = () => {
    const rows = ["Year,Principal,Interest,Balance", ...data.schedule.map((s) => `${s.year},${s.principal.toFixed(2)},${s.interest.toFixed(2)},${s.balance.toFixed(2)}`)];
    downloadBlob(new Blob([rows.join("\n")], { type: "text/csv" }), "emi-amortization-schedule.csv");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Loan details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "principal", label: "Loan amount (₹)", key: "principal" as const },
              { id: "rate", label: "Interest rate (% p.a.)", key: "rate" as const },
              { id: "years", label: "Tenure (years)", key: "years" as const },
            ].map((f) => (
              <div key={f.id} className="space-y-1.5">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input
                  id={f.id}
                  type="number"
                  inputMode="decimal"
                  value={value[f.key]}
                  onChange={(e) => set({ ...value, [f.key]: e.target.value })}
                />
              </div>
            ))}
            <div className="space-y-1.5">
              <Label htmlFor="extraMonthly">Extra monthly payment (₹, optional)</Label>
              <Input
                id="extraMonthly"
                type="number"
                inputMode="decimal"
                value={value.extraMonthly}
                onChange={(e) => set({ ...value, extraMonthly: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Paying more than the EMI every month shortens the loan and cuts total interest — see the impact below.</p>
            </div>
            <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            {!hasResult ? (
              <p className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">Enter a loan amount and tenure to see your EMI.</p>
            ) : (
              <>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Monthly EMI</p>
                  <p className="text-4xl font-bold text-primary">{formatCurrency(data.emi)}</p>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                  <Stat label="Principal" value={formatCurrency(data.principal)} />
                  <Stat label="Interest" value={formatCurrency(data.interest)} />
                  <Stat label="Total payable" value={formatCurrency(data.total)} />
                </div>
                {data.prepayment && (
                  <div className="rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-400">
                    <p className="font-semibold">With this extra payment, you&apos;d be debt-free {Math.floor(data.prepayment.monthsSaved / 12)}y {data.prepayment.monthsSaved % 12}m sooner</p>
                    <p className="mt-1">Saving {formatCurrency(data.prepayment.interestSaved)} in interest — new tenure ≈ {(data.prepayment.newTenureMonths / 12).toFixed(1)} years.</p>
                  </div>
                )}
                <ActionBar onCopy={() => copy(summary)} copied={copied} onDownload={downloadCsv} downloadLabel="Download schedule .csv" />
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {data.schedule.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Amortization schedule</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="py-2 pr-4 font-medium">Year</th>
                    <th className="py-2 pr-4 font-medium">Principal</th>
                    <th className="py-2 pr-4 font-medium">Interest</th>
                    <th className="py-2 font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {data.schedule.map((s) => (
                    <tr key={s.year} className="border-b border-border/60">
                      <td className="py-2 pr-4">{s.year}</td>
                      <td className="py-2 pr-4">{formatCurrency(s.principal)}</td>
                      <td className="py-2 pr-4">{formatCurrency(s.interest)}</td>
                      <td className="py-2">{formatCurrency(s.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/60 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-semibold">{value}</p>
    </div>
  );
}
