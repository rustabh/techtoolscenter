"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency } from "@/lib/utils";

interface EmiState {
  principal: string;
  rate: string;
  years: string;
}
const initial: EmiState = { principal: "500000", rate: "9.5", years: "5" };

export default function EmiCalculator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<EmiState>("uh:emi", initial);

  const data = useMemo(() => {
    const P = parseFloat(value.principal) || 0;
    const annual = parseFloat(value.rate) || 0;
    const n = (parseFloat(value.years) || 0) * 12;
    const r = annual / 12 / 100;
    const emi = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - P;

    // Yearly amortization
    let balance = P;
    const schedule: { year: number; principal: number; interest: number; balance: number }[] = [];
    const years = parseFloat(value.years) || 0;
    for (let y = 1; y <= years; y++) {
      let yearInterest = 0;
      let yearPrincipal = 0;
      for (let m = 0; m < 12; m++) {
        const interestPart = balance * r;
        const principalPart = emi - interestPart;
        yearInterest += interestPart;
        yearPrincipal += principalPart;
        balance -= principalPart;
      }
      schedule.push({ year: y, principal: yearPrincipal, interest: yearInterest, balance: Math.max(balance, 0) });
    }
    return { emi, total, interest, principal: P, schedule };
  }, [value]);

  const pct = data.total > 0 ? (data.principal / data.total) * 100 : 0;

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
            <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
          <CardContent className="space-y-5">
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
