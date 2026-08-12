"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency } from "@/lib/utils";

interface DiscState { price: string; discount: string; extraDiscount: string; }
const initial: DiscState = { price: "2000", discount: "25", extraDiscount: "0" };

export default function DiscountCalculator() {
  const { value: stored, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<DiscState>("uh:discount", initial);
  // Calculations saved before the stacked-discount field existed won't have it.
  const value = useMemo(() => (stored.extraDiscount !== undefined ? stored : { ...stored, extraDiscount: "0" }), [stored]);

  const r = useMemo(() => {
    const price = parseFloat(value.price) || 0;
    const disc = parseFloat(value.discount) || 0;
    const extraDisc = parseFloat(value.extraDiscount) || 0;
    // Stacked discounts multiply the remaining price, they don't add — "25%
    // off + extra 10% off" is NOT 35% off. A common real-world point of
    // confusion, so the breakdown below is shown step by step.
    const afterFirst = price - (price * disc) / 100;
    const afterSecond = afterFirst - (afterFirst * extraDisc) / 100;
    const saved = price - afterSecond;
    const effectivePct = price > 0 ? (saved / price) * 100 : 0;
    return { saved, final: afterSecond, afterFirst, effectivePct, hasExtra: extraDisc > 0 };
  }, [value]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Enter details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Original price (₹)</Label><Input type="number" value={value.price} onChange={(e) => set({ ...value, price: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Discount (%)</Label><Input type="number" value={value.discount} onChange={(e) => set({ ...value, discount: e.target.value })} /></div>
          <div className="space-y-1.5">
            <Label>Extra stacked discount (%, optional)</Label>
            <Input type="number" value={value.extraDiscount} onChange={(e) => set({ ...value, extraDiscount: e.target.value })} />
            <p className="text-xs text-muted-foreground">Applied on top of the price after the first discount — not simply added to it.</p>
          </div>
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Result</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {r.hasExtra && (
            <div className="space-y-1 rounded-xl bg-secondary/60 p-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-muted-foreground">After {value.discount}% off</span><span className="font-medium">{formatCurrency(r.afterFirst)}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">After extra {value.extraDiscount}% off</span><span className="font-medium">{formatCurrency(r.final)}</span></div>
              <div className="flex items-center justify-between border-t border-border pt-1"><span className="text-muted-foreground">Effective discount</span><span className="font-semibold text-primary">{Math.round(r.effectivePct * 100) / 100}%</span></div>
            </div>
          )}
          <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">You save</span><span className="font-semibold text-emerald-500">{formatCurrency(r.saved)}</span></div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-lg font-semibold">Final price</span>
            <span className="text-3xl font-bold text-primary">{formatCurrency(r.final)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
