"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default function TipCalculator() {
  const [bill, setBill] = useState("1200");
  const [tip, setTip] = useState(10);
  const [people, setPeople] = useState(2);

  const r = useMemo(() => {
    const b = parseFloat(bill) || 0;
    const tipAmt = (b * tip) / 100;
    const total = b + tipAmt;
    const per = total / Math.max(1, people);
    return { tipAmt, total, per };
  }, [bill, tip, people]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Bill details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Bill amount (₹)</Label><Input type="number" value={bill} onChange={(e) => setBill(e.target.value)} /></div>
          <div className="space-y-2">
            <Label>Tip: {tip}%</Label>
            <div className="flex flex-wrap gap-2">
              {[5, 10, 15, 18, 20, 25].map((t) => (
                <Button key={t} size="sm" variant={tip === t ? "default" : "outline"} onClick={() => setTip(t)}>{t}%</Button>
              ))}
            </div>
            <input type="range" min={0} max={40} value={tip} onChange={(e) => setTip(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
          </div>
          <div className="space-y-1.5">
            <Label>Split between: {people} {people === 1 ? "person" : "people"}</Label>
            <input type="range" min={1} max={20} value={people} onChange={(e) => setPeople(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Row label="Tip amount" value={formatCurrency(r.tipAmt)} />
          <Row label="Total bill" value={formatCurrency(r.total)} />
          <div className="rounded-2xl bg-primary/10 p-5 text-center">
            <p className="text-sm text-muted-foreground">Each person pays</p>
            <p className="text-4xl font-bold text-primary">{formatCurrency(r.per)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">{label}</span><span className="font-semibold">{value}</span></div>;
}
