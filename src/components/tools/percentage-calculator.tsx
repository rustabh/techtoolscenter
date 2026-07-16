"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function fmt(n: number) {
  return isFinite(n) ? Math.round(n * 100) / 100 : 0;
}

export default function PercentageCalculator() {
  const [a1, setA1] = useState("15");
  const [b1, setB1] = useState("200");
  const [a2, setA2] = useState("50");
  const [b2, setB2] = useState("80");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>What is X% of Y?</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Percentage (%)</Label><Input type="number" value={a1} onChange={(e) => setA1(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Of value</Label><Input type="number" value={b1} onChange={(e) => setB1(e.target.value)} /></div>
          </div>
          <div className="rounded-xl bg-primary/10 p-4 text-center">
            <p className="text-sm text-muted-foreground">{a1}% of {b1} is</p>
            <p className="text-3xl font-bold text-primary">{fmt((Number(a1) / 100) * Number(b1))}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>X is what % of Y?</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Value</Label><Input type="number" value={a2} onChange={(e) => setA2(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Total</Label><Input type="number" value={b2} onChange={(e) => setB2(e.target.value)} /></div>
          </div>
          <div className="rounded-xl bg-primary/10 p-4 text-center">
            <p className="text-sm text-muted-foreground">{a2} is this % of {b2}</p>
            <p className="text-3xl font-bold text-primary">{fmt((Number(a2) / Number(b2)) * 100)}%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
