"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ActionBar } from "@/components/tools/action-bar";

interface BmiState {
  unit: "metric" | "imperial";
  weight: string;
  height: string;
}
const initial: BmiState = { unit: "metric", weight: "70", height: "175" };

function category(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-amber-500" };
  if (bmi < 25) return { label: "Healthy", color: "text-emerald-500" };
  if (bmi < 30) return { label: "Overweight", color: "text-orange-500" };
  return { label: "Obese", color: "text-red-500" };
}

export default function BmiCalculator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<BmiState>("uh:bmi", initial);

  const bmi = useMemo(() => {
    const w = parseFloat(value.weight) || 0;
    const h = parseFloat(value.height) || 0;
    if (value.unit === "metric") {
      const m = h / 100;
      return m > 0 ? w / (m * m) : 0;
    }
    return h > 0 ? (703 * w) / (h * h) : 0;
  }, [value]);

  const cat = category(bmi);
  const pct = Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));

  // Healthy weight range for this height (BMI 18.5–24.9), inverting the same
  // formula used above — the single most actionable number a BMI result can
  // give, and something no BMI-only number tells you on its own.
  const healthyRange = useMemo(() => {
    const h = parseFloat(value.height) || 0;
    const w = parseFloat(value.weight) || 0;
    if (h <= 0) return null;
    const min = value.unit === "metric" ? (18.5 * (h / 100) ** 2) : (18.5 * h * h) / 703;
    const max = value.unit === "metric" ? (24.9 * (h / 100) ** 2) : (24.9 * h * h) / 703;
    const delta = w > 0 ? (w < min ? min - w : w > max ? w - max : 0) : 0;
    return { min, max, delta };
  }, [value.height, value.weight, value.unit]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Your measurements</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {(["metric", "imperial"] as const).map((u) => (
              <button key={u} onClick={() => set({ ...value, unit: u })}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium capitalize transition-colors ${value.unit === u ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}>
                {u}
              </button>
            ))}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bmi-weight">Weight ({value.unit === "metric" ? "kg" : "lb"})</Label>
            <Input id="bmi-weight" type="number" value={value.weight} onChange={(e) => set({ ...value, weight: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bmi-height">Height ({value.unit === "metric" ? "cm" : "in"})</Label>
            <Input id="bmi-height" type="number" value={value.height} onChange={(e) => set({ ...value, height: e.target.value })} />
          </div>
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Result</CardTitle></CardHeader>
        <CardContent className="space-y-5 text-center">
          <div>
            <p className="text-5xl font-bold text-primary">{Math.round(bmi * 10) / 10 || 0}</p>
            <p className={`mt-1 font-semibold ${cat.color}`}>{cat.label}</p>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 to-red-500">
            <div className="h-full w-1 -translate-x-1/2 bg-foreground" style={{ marginLeft: `${pct}%` }} />
          </div>
          <p className="text-xs text-muted-foreground">A healthy BMI ranges from 18.5 to 24.9.</p>
          {healthyRange && (
            <div className="rounded-xl bg-secondary/60 p-3 text-sm">
              <p>
                Healthy weight for your height:{" "}
                <span className="font-semibold">
                  {Math.round(healthyRange.min * 10) / 10}–{Math.round(healthyRange.max * 10) / 10} {value.unit === "metric" ? "kg" : "lb"}
                </span>
              </p>
              {healthyRange.delta > 0.05 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  About {Math.round(healthyRange.delta * 10) / 10} {value.unit === "metric" ? "kg" : "lb"} {parseFloat(value.weight) < healthyRange.min ? "to gain" : "to lose"} to reach that range.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
