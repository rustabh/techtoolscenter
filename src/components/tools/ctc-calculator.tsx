"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency } from "@/lib/utils";

interface CtcState {
  ctc: string;
  bonus: string;
  pfEmployee: string;
  professionalTax: string;
  basicPct: string; // basic as % of (CTC - bonus) — 50% is the common rule-of-thumb default, but real employer structures vary
  hraPct: string; // HRA as % of basic
}

const initial: CtcState = { ctc: "1200000", bonus: "0", pfEmployee: "12", professionalTax: "200", basicPct: "50", hraPct: "50" };

export default function CtcCalculator() {
  const { value: stored, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<CtcState>("uh:ctc", initial);
  // Calculations saved before the configurable-split option shipped won't have these fields.
  const value = useMemo(() => ({
    ...stored,
    basicPct: stored.basicPct ?? "50",
    hraPct: stored.hraPct ?? "50",
  }), [stored]);
  const { copied, copy } = useCopy();

  const result = useMemo(() => {
    const ctc = parseFloat(value.ctc) || 0;
    const bonus = parseFloat(value.bonus) || 0;
    const pfPct = parseFloat(value.pfEmployee) || 0;
    const ptMonthly = parseFloat(value.professionalTax) || 0;
    const ptAnnual = ptMonthly * 12;
    const basicPct = (parseFloat(value.basicPct) || 0) / 100;
    const hraPct = (parseFloat(value.hraPct) || 0) / 100;

    const basic = Math.max(basicPct * (ctc - bonus), 0);
    const hra = hraPct * basic;
    const employerPf = (pfPct / 100) * basic;
    const employeePf = (pfPct / 100) * basic;
    const otherAllowances = Math.max(ctc - basic - hra - employerPf - bonus, 0);

    const grossAnnual = ctc - employerPf - bonus;
    const netAnnual = grossAnnual - employeePf - ptAnnual;

    return {
      ctc,
      bonus,
      basic,
      hra,
      employerPf,
      employeePf,
      otherAllowances,
      ptAnnual,
      ptMonthly,
      grossAnnual,
      netAnnual,
      netMonthly: netAnnual / 12,
      grossMonthly: grossAnnual / 12,
      basicMonthly: basic / 12,
      hraMonthly: hra / 12,
      employerPfMonthly: employerPf / 12,
      employeePfMonthly: employeePf / 12,
      ctcMonthly: ctc / 12,
    };
  }, [value]);

  const summary = `CTC ${formatCurrency(result.ctc)}/year → Basic ${formatCurrency(result.basic)}, HRA ${formatCurrency(result.hra)}, Employee PF ${formatCurrency(result.employeePf)}, Professional tax ${formatCurrency(result.ptAnnual)} → Net take-home ${formatCurrency(result.netMonthly)}/month (${formatCurrency(result.netAnnual)}/year)`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Enter details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="ctc-ctc">Annual CTC (₹)</Label>
            <Input
              id="ctc-ctc"
              type="number"
              inputMode="decimal"
              value={value.ctc}
              onChange={(e) => set({ ...value, ctc: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ctc-bonus">Annual bonus / variable pay (₹)</Label>
            <Input
              id="ctc-bonus"
              type="number"
              inputMode="decimal"
              value={value.bonus}
              onChange={(e) => set({ ...value, bonus: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="ctc-basic-pct">Basic (% of CTC − bonus)</Label>
              <Input
                id="ctc-basic-pct"
                type="number"
                inputMode="decimal"
                value={value.basicPct}
                onChange={(e) => set({ ...value, basicPct: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ctc-hra-pct">HRA (% of basic)</Label>
              <Input
                id="ctc-hra-pct"
                type="number"
                inputMode="decimal"
                value={value.hraPct}
                onChange={(e) => set({ ...value, hraPct: e.target.value })}
              />
            </div>
          </div>
          <p className="-mt-2 text-xs text-muted-foreground">50%/50% is a common rule-of-thumb default; check your offer letter for your employer&apos;s actual structure.</p>
          <div className="space-y-1.5">
            <Label htmlFor="ctc-pf">Employee PF contribution (% of basic)</Label>
            <Input
              id="ctc-pf"
              type="number"
              inputMode="decimal"
              value={value.pfEmployee}
              onChange={(e) => set({ ...value, pfEmployee: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ctc-pt">Professional tax (₹ / month)</Label>
            <Input
              id="ctc-pt"
              type="number"
              inputMode="decimal"
              value={value.professionalTax}
              onChange={(e) => set({ ...value, professionalTax: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Varies by state; ₹200/month is a common default.</p>
          </div>
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle>Take-home breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Monthly in-hand</p>
            <p className="text-4xl font-bold text-primary">{formatCurrency(result.netMonthly)}</p>
          </div>

          {result.netAnnual < 0 && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
              This combination of PF % and bonus adds up to more than the CTC can actually cover, so the take-home
              above has gone negative — it isn&apos;t a real result. Double-check the PF contribution % (12% is
              standard; it&apos;s only much higher for a deliberate Voluntary PF top-up) and the bonus amount.
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 rounded-xl bg-secondary/60 p-3 text-sm">
            <div className="font-medium text-muted-foreground">Component</div>
            <div className="grid grid-cols-2 gap-2 text-right font-medium text-muted-foreground">
              <span>Monthly</span>
              <span>Annual</span>
            </div>
          </div>

          <BreakdownRow label="CTC" monthly={result.ctcMonthly} annual={result.ctc} />
          <BreakdownRow label="Employer PF (part of CTC)" monthly={result.employerPfMonthly} annual={result.employerPf} />
          <BreakdownRow label="Bonus / variable (lump sum)" monthly={null} annual={result.bonus} />
          <BreakdownRow label="Gross salary" monthly={result.grossMonthly} annual={result.grossAnnual} />
          <BreakdownRow label="Basic" monthly={result.basicMonthly} annual={result.basic} />
          <BreakdownRow label="HRA" monthly={result.hraMonthly} annual={result.hra} />
          <BreakdownRow label="Other allowances" monthly={result.otherAllowances / 12} annual={result.otherAllowances} />
          <BreakdownRow label="Employee PF deduction" monthly={result.employeePfMonthly} annual={result.employeePf} />
          <BreakdownRow label="Professional tax" monthly={result.ptMonthly} annual={result.ptAnnual} />

          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-lg font-semibold">Net take-home (annual)</span>
            <span className="text-2xl font-bold text-primary">{formatCurrency(result.netAnnual)}</span>
          </div>

          <div className="rounded-xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
            <p>
              This doesn&apos;t include income tax —{" "}
              <Link href={`/tools/income-tax-calculator?income=${Math.max(0, Math.round(result.grossAnnual))}`} className="font-medium text-primary hover:underline">
                calculate it on this gross income <ArrowRight className="inline size-3" />
              </Link>
            </p>
            <p className="mt-1">
              A simplified estimate — actual salary structure, PF rules and professional tax vary by company and
              state. Check your official offer letter/payslip for exact figures.
            </p>
          </div>
          <ActionBar onCopy={() => copy(summary)} copied={copied} />
        </CardContent>
      </Card>
    </div>
  );
}

function BreakdownRow({ label, monthly, annual }: { label: string; monthly: number | null; annual: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="grid grid-cols-2 gap-2 text-right font-semibold">
        <span>{monthly === null ? "—" : formatCurrency(monthly)}</span>
        <span>{formatCurrency(annual)}</span>
      </span>
    </div>
  );
}
