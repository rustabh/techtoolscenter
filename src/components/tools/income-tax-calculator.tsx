"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency } from "@/lib/utils";

interface IncomeTaxState {
  income: string;
  regime: "new" | "old";
  age: "below60" | "60to80" | "above80";
}

const initial: IncomeTaxState = { income: "1200000", regime: "new", age: "below60" };

const CESS_RATE = 0.04;

interface Slab {
  limit: number;
  rate: number;
}

const NEW_REGIME_SLABS: Slab[] = [
  { limit: 400000, rate: 0 },
  { limit: 800000, rate: 0.05 },
  { limit: 1200000, rate: 0.1 },
  { limit: 1600000, rate: 0.15 },
  { limit: 2000000, rate: 0.2 },
  { limit: 2400000, rate: 0.25 },
  { limit: Infinity, rate: 0.3 },
];

const OLD_REGIME_SLABS: Record<IncomeTaxState["age"], Slab[]> = {
  below60: [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ],
  "60to80": [
    { limit: 300000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ],
  above80: [
    { limit: 500000, rate: 0 },
    { limit: 1000000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ],
};

const NEW_REGIME_STANDARD_DEDUCTION = 75000;
const OLD_REGIME_STANDARD_DEDUCTION = 50000;
const NEW_REGIME_REBATE_LIMIT = 1200000;
const OLD_REGIME_REBATE_LIMIT = 500000;

function slabTax(taxable: number, slabs: Slab[]): number {
  let tax = 0;
  let prev = 0;
  for (const s of slabs) {
    if (taxable <= prev) break;
    const taxableInBand = Math.min(taxable, s.limit) - prev;
    tax += taxableInBand * s.rate;
    prev = s.limit;
  }
  return tax;
}

interface RegimeResult {
  gross: number;
  standardDeduction: number;
  netTaxable: number;
  taxBeforeCess: number;
  cess: number;
  totalTax: number;
  takeHome: number;
}

function computeNewRegime(income: number): RegimeResult {
  const standardDeduction = NEW_REGIME_STANDARD_DEDUCTION;
  const netTaxable = Math.max(income - standardDeduction, 0);
  const taxBeforeCess = netTaxable <= NEW_REGIME_REBATE_LIMIT ? 0 : slabTax(netTaxable, NEW_REGIME_SLABS);
  const cess = taxBeforeCess * CESS_RATE;
  const totalTax = taxBeforeCess + cess;
  return { gross: income, standardDeduction, netTaxable, taxBeforeCess, cess, totalTax, takeHome: income - totalTax };
}

function computeOldRegime(income: number, age: IncomeTaxState["age"]): RegimeResult {
  const standardDeduction = OLD_REGIME_STANDARD_DEDUCTION;
  const netTaxable = Math.max(income - standardDeduction, 0);
  const taxBeforeCess =
    netTaxable <= OLD_REGIME_REBATE_LIMIT ? 0 : slabTax(netTaxable, OLD_REGIME_SLABS[age]);
  const cess = taxBeforeCess * CESS_RATE;
  const totalTax = taxBeforeCess + cess;
  return { gross: income, standardDeduction, netTaxable, taxBeforeCess, cess, totalTax, takeHome: income - totalTax };
}

export default function IncomeTaxCalculator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<IncomeTaxState>(
    "uh:income-tax",
    initial
  );

  const result = useMemo(() => {
    const income = parseFloat(value.income) || 0;
    const newRegime = computeNewRegime(income);
    const oldRegime = computeOldRegime(income, value.age);
    const selected = value.regime === "new" ? newRegime : oldRegime;
    const betterRegime: "new" | "old" = newRegime.totalTax <= oldRegime.totalTax ? "new" : "old";
    const savings = Math.abs(newRegime.totalTax - oldRegime.totalTax);
    return { income, newRegime, oldRegime, selected, betterRegime, savings };
  }, [value]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Enter details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="itc-income">Annual income (₹)</Label>
            <Input
              id="itc-income"
              type="number"
              inputMode="decimal"
              value={value.income}
              onChange={(e) => set({ ...value, income: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Tax regime</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["new", "old"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => set({ ...value, regime: r })}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                    value.regime === r
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {r} regime
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Age band (affects old regime exemption)</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {(
                [
                  { key: "below60", label: "Below 60" },
                  { key: "60to80", label: "60 to 80" },
                  { key: "above80", label: "Above 80" },
                ] as const
              ).map((a) => (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => set({ ...value, age: a.key })}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                    value.age === a.key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle>Result ({value.regime === "new" ? "New" : "Old"} regime)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total tax payable</p>
            <p className="text-4xl font-bold text-primary">{formatCurrency(result.selected.totalTax)}</p>
          </div>

          <Row label="Gross annual income" value={formatCurrency(result.selected.gross)} />
          <Row label="Standard deduction" value={formatCurrency(result.selected.standardDeduction)} />
          <Row label="Net taxable income" value={formatCurrency(result.selected.netTaxable)} />
          <Row label="Tax before cess" value={formatCurrency(result.selected.taxBeforeCess)} />
          <Row label="Health & education cess (4%)" value={formatCurrency(result.selected.cess)} />

          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-lg font-semibold">Annual take-home</span>
            <span className="text-2xl font-bold text-primary">{formatCurrency(result.selected.takeHome)}</span>
          </div>

          <div className="rounded-xl bg-secondary/60 p-3 text-sm">
            <p>
              New regime: <span className="font-semibold">{formatCurrency(result.newRegime.totalTax)}</span> · Old
              regime: <span className="font-semibold">{formatCurrency(result.oldRegime.totalTax)}</span>
            </p>
            <p className="mt-1">
              You save <span className="font-semibold text-primary">{formatCurrency(result.savings)}</span> with the{" "}
              <span className="font-semibold capitalize">{result.betterRegime}</span> regime.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
            Estimates only, based on FY 2025-26 (AY 2026-27) slabs. Tax rules can change in each Union Budget — always
            confirm current rates on the official Income Tax e-filing portal (incometax.gov.in) before filing.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
