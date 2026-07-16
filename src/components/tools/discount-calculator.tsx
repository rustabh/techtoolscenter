"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency } from "@/lib/utils";

interface DiscState { price: string; discount: string; }
const initial: DiscState = { price: "2000", discount: "25" };

export default function DiscountCalculator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<DiscState>("uh:discount", initial);

  const r = useMemo(() => {
    const price = parseFloat(value.price) || 0;
    const disc = parseFloat(value.discount) || 0;
    const saved = (price * disc) / 100;
    return { saved, final: price - saved };
  }, [value]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Enter details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Original price (₹)</Label><Input type="number" value={value.price} onChange={(e) => set({ ...value, price: e.target.value })} /></div>
          <div className="space-y-1.5"><Label>Discount (%)</Label><Input type="number" value={value.discount} onChange={(e) => set({ ...value, discount: e.target.value })} /></div>
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Result</CardTitle></CardHeader>
        <CardContent className="space-y-4">
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
