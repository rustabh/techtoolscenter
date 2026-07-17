"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState("300");
  const [mileage, setMileage] = useState("18");
  const [price, setPrice] = useState("100");

  const r = useMemo(() => {
    const d = parseFloat(distance) || 0;
    const m = parseFloat(mileage) || 1;
    const p = parseFloat(price) || 0;
    const fuel = d / m;
    return { fuel, cost: fuel * p };
  }, [distance, mileage, price]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Trip details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Distance (km)</Label><Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Mileage (km per litre)</Label><Input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Fuel price (₹ per litre)</Label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Estimate</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Fuel needed</span><span className="font-semibold">{r.fuel.toFixed(2)} L</span></div>
          <div className="rounded-2xl bg-primary/10 p-5 text-center">
            <p className="text-sm text-muted-foreground">Total trip cost</p>
            <p className="text-4xl font-bold text-primary">{formatCurrency(r.cost)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
