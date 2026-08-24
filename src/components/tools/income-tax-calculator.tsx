"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency } from "@/lib/utils";

interface IncomeTaxState {
  income: string;
  regime: "new" | "old";
  age: "below60" | "60to80" | "above80";
  deductions: string;
}

const initial: IncomeTaxState = { income: "1200000", regime: "new", age: "below60", deductions: "0" };

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

// Section 87A rebate zeroes out tax entirely up to the limit. Under the new
// regime, the Finance Act also grants marginal relief just above that limit:
// without it, ₹1 more income than the limit could jump tax from ₹0 to tens
// of thousands, so the relief caps the tax at the amount of income exceeding
// the limit, and a taxpayer never takes home less than someone just under
// the limit. This self-limits correctly: near the cliff, full slab tax
// exceeds the excess income and gets capped; well above the limit, the
// excess overtakes the slab tax and the cap has no effect.
function taxWithRebateAndMarginalRelief(taxable: number, limit: number, slabs: Slab[]): number {
  if (taxable <= limit) return 0;
  const fullTax = slabTax(taxable, slabs);
  const excessOverLimit = taxable - limit;
  return Math.min(fullTax, excessOverLimit);
}

// The old regime's Section 87A rebate has never had a marginal relief
// clause — that protection was introduced only for the new regime (first at
// its ₹7L threshold, now ₹12L). Under the old regime, ₹1 of income over the
// ₹5L limit loses the rebate entirely and owes full, uncapped slab tax —
// a real, well-known cliff in the law, not a smoothing bug to fix here.
function taxWithHardCliffRebate(taxable: number, limit: number, slabs: Slab[]): number {
  if (taxable <= limit) return 0;
  return slabTax(taxable, slabs);
}

interface RegimeResult {
  gross: number;
  standardDeduction: number;
  itemizedDeductions: number;
  netTaxable: number;
  taxBeforeCess: number;
  cess: number;
  totalTax: number;
  takeHome: number;
}

function computeNewRegime(income: number): RegimeResult {
  const standardDeduction = NEW_REGIME_STANDARD_DEDUCTION;
  const netTaxable = Math.max(income - standardDeduction, 0);
  const taxBeforeCess = taxWithRebateAndMarginalRelief(netTaxable, NEW_REGIME_REBATE_LIMIT, NEW_REGIME_SLABS);
  const cess = taxBeforeCess * CESS_RATE;
  const totalTax = taxBeforeCess + cess;
  return { gross: income, standardDeduction, itemizedDeductions: 0, netTaxable, taxBeforeCess, cess, totalTax, takeHome: income - totalTax };
}

// Unlike the new regime, the old regime's main advantage is itemized
// deductions (80C, 80D, HRA, home-loan interest, NPS 80CCD(1B), etc.) on top
// of the standard deduction — omitting them makes "which regime saves more"
// misleading for anyone who actually claims them. Section-wise caps (80C's
// ₹1.5L limit, etc.) aren't individually enforced here — the field is a
// single "how much will you actually claim in total" input.
function computeOldRegime(income: number, age: IncomeTaxState["age"], itemizedDeductions: number): RegimeResult {
  const standardDeduction = OLD_REGIME_STANDARD_DEDUCTION;
  const netTaxable = Math.max(income - standardDeduction - Math.max(itemizedDeductions, 0), 0);
  const taxBeforeCess = taxWithHardCliffRebate(netTaxable, OLD_REGIME_REBATE_LIMIT, OLD_REGIME_SLABS[age]);
  const cess = taxBeforeCess * CESS_RATE;
  const totalTax = taxBeforeCess + cess;
  return { gross: income, standardDeduction, itemizedDeductions: Math.max(itemizedDeductions, 0), netTaxable, taxBeforeCess, cess, totalTax, takeHome: income - totalTax };
}

export default function IncomeTaxCalculator() {
  const { value: stored, set, undo, redo, reset, canUndo, canRedo, hydrated } = useLocalStorage<IncomeTaxState>(
    "uh:income-tax",
    initial
  );
  // Calculations saved before the deductions field existed won't have it.
  const value = useMemo(() => (stored.deductions !== undefined ? stored : { ...stored, deductions: "0" }), [stored]);
  const { copied, copy } = useCopy();

  // Lets other tools (e.g. CTC Calculator's "gross income → tax" link) hand
  // off a computed income directly instead of the user re-typing it. Waits
  // for localStorage hydration to finish first — applying against the
  // pre-hydration default would clobber a returning user's saved
  // regime/age/deductions back to their initial values, not just set income.
  const searchParams = useSearchParams();
  const appliedParam = useRef(false);
  useEffect(() => {
    if (!hydrated || appliedParam.current) return;
    appliedParam.current = true;
    const income = searchParams.get("income");
    if (income && /^\d+$/.test(income)) set({ ...value, income });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, searchParams]);

  const result = useMemo(() => {
    const income = parseFloat(value.income) || 0;
    const deductions = parseFloat(value.deductions) || 0;
    const newRegime = computeNewRegime(income);
    const oldRegime = computeOldRegime(income, value.age, deductions);
    const selected = value.regime === "new" ? newRegime : oldRegime;
    const betterRegime: "new" | "old" = newRegime.totalTax <= oldRegime.totalTax ? "new" : "old";
    const savings = Math.abs(newRegime.totalTax - oldRegime.totalTax);
    return { income, newRegime, oldRegime, selected, betterRegime, savings };
  }, [value]);

  const summary = `Income Tax (${value.regime} regime, FY 2026-27): Gross ${formatCurrency(result.selected.gross)}, Net taxable ${formatCurrency(result.selected.netTaxable)}, Tax ${formatCurrency(result.selected.totalTax)} (incl. 4% cess), Take-home ${formatCurrency(result.selected.takeHome)}/year`;

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
          <div className="space-y-1.5">
            <Label htmlFor="itc-deductions">Deductions under old regime (₹) — 80C, 80D, HRA, home loan interest, NPS, etc.</Label>
            <Input
              id="itc-deductions"
              type="number"
              inputMode="decimal"
              value={value.deductions}
              onChange={(e) => set({ ...value, deductions: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Only applies to the old regime — the new regime doesn&apos;t allow most of these deductions. Section-wise caps aren&apos;t checked; enter what you&apos;ll actually claim.</p>
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
          {result.selected.itemizedDeductions > 0 && (
            <Row label="Other deductions (80C, 80D, HRA, etc.)" value={formatCurrency(result.selected.itemizedDeductions)} />
          )}
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
            Estimates only, based on FY 2026-27 (AY 2027-28) slabs. Tax rules can change in each Union Budget — always
            confirm current rates on the official Income Tax e-filing portal (incometax.gov.in) before filing.
          </div>
          <ActionBar onCopy={() => copy(summary)} copied={copied} />
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
