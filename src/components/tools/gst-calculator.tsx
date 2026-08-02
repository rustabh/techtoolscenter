"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency } from "@/lib/utils";

interface GstState {
  amount: string;
  rate: string;
  mode: "exclusive" | "inclusive";
}

const initial: GstState = { amount: "1000", rate: "18", mode: "exclusive" };

export default function GstCalculator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<GstState>("uh:gst", initial);
  const { copied, copy } = useCopy();

  const result = useMemo(() => {
    const amount = parseFloat(value.amount) || 0;
    const rate = parseFloat(value.rate) || 0;
    let net: number, tax: number, gross: number;
    if (value.mode === "exclusive") {
      net = amount;
      tax = (amount * rate) / 100;
      gross = amount + tax;
    } else {
      gross = amount;
      net = amount / (1 + rate / 100);
      tax = gross - net;
    }
    return { net, tax, gross, half: tax / 2 };
  }, [value]);

  const summary = `GST (${value.rate}%, ${value.mode}): Net ${formatCurrency(result.net)} + GST ${formatCurrency(result.tax)} (CGST ${formatCurrency(result.half)} + SGST ${formatCurrency(result.half)}) = Total ${formatCurrency(result.gross)}`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Enter details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="gst-amount">Amount (₹)</Label>
            <Input
              id="gst-amount"
              type="number"
              inputMode="decimal"
              value={value.amount}
              onChange={(e) => set({ ...value, amount: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="gst-rate">GST rate (%)</Label>
            <Select id="gst-rate" value={value.rate} onChange={(e) => set({ ...value, rate: e.target.value })}>
              {["3", "5", "12", "18", "28"].map((r) => (
                <option key={r} value={r}>{r}%</option>
              ))}
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["exclusive", "inclusive"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => set({ ...value, mode: m })}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                    value.mode === m ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Row label="Net amount" value={formatCurrency(result.net)} />
          <Row label={`Total GST (${value.rate}%)`} value={formatCurrency(result.tax)} />
          <div className="grid grid-cols-2 gap-3 rounded-xl bg-secondary/60 p-3 text-sm">
            <div>
              <p className="text-muted-foreground">CGST</p>
              <p className="font-semibold">{formatCurrency(result.half)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">SGST</p>
              <p className="font-semibold">{formatCurrency(result.half)}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-lg font-semibold">Gross total</span>
            <span className="text-2xl font-bold text-primary">{formatCurrency(result.gross)}</span>
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
