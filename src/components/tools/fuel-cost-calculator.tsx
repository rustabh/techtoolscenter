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
  const [roundTrip, setRoundTrip] = useState(false);
  const [people, setPeople] = useState("1");

  const r = useMemo(() => {
    const d = (parseFloat(distance) || 0) * (roundTrip ? 2 : 1);
    const m = parseFloat(mileage) || 1;
    const p = parseFloat(price) || 0;
    const n = Math.max(1, parseInt(people, 10) || 1);
    const fuel = d / m;
    const cost = fuel * p;
    return { distance: d, fuel, cost, perPerson: cost / n };
  }, [distance, mileage, price, roundTrip, people]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Trip details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label htmlFor="fuel-distance">Distance (km)</Label><Input id="fuel-distance" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} /></div>
          <div className="space-y-1.5"><Label htmlFor="fuel-mileage">Mileage (km per litre)</Label><Input id="fuel-mileage" type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} /></div>
          <div className="space-y-1.5"><Label htmlFor="fuel-price">Fuel price (₹ per litre)</Label><Input id="fuel-price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={roundTrip} onChange={(e) => setRoundTrip(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
            Round trip (there and back)
          </label>
          <div className="space-y-1.5"><Label htmlFor="fuel-people">Split between people</Label><Input id="fuel-people" type="number" min={1} value={people} onChange={(e) => setPeople(e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Estimate</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Total distance</span><span className="font-semibold">{r.distance.toFixed(0)} km{roundTrip ? " (round trip)" : ""}</span></div>
          <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Fuel needed</span><span className="font-semibold">{r.fuel.toFixed(2)} L</span></div>
          <div className="rounded-2xl bg-primary/10 p-5 text-center">
            <p className="text-sm text-muted-foreground">Total trip cost</p>
            <p className="text-4xl font-bold text-primary">{formatCurrency(r.cost)}</p>
            {Math.max(1, parseInt(people, 10) || 1) > 1 && (
              <p className="mt-1 text-xs text-muted-foreground">{formatCurrency(r.perPerson)} per person ({people} people)</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
