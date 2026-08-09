"use client";

import { useMemo, useState } from "react";
import { Copy, Check, ArrowLeftRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toaster";

// factor = value in base unit
type Units = Record<string, number>;
const CATS: Record<string, { base: string; units: Units }> = {
  Length: { base: "m", units: { mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.344 } },
  Weight: { base: "kg", units: { mg: 1e-6, g: 0.001, kg: 1, ton: 1000, ounce: 0.0283495, pound: 0.453592 } },
  Area: { base: "m²", units: { "mm²": 1e-6, "cm²": 1e-4, "m²": 1, "km²": 1e6, hectare: 10000, acre: 4046.86, "ft²": 0.092903 } },
  Volume: { base: "L", units: { ml: 0.001, L: 1, "m³": 1000, gallon: 3.78541, quart: 0.946353, pint: 0.473176, cup: 0.24 } },
  Speed: { base: "m/s", units: { "m/s": 1, "km/h": 0.277778, "mph": 0.44704, knot: 0.514444, "ft/s": 0.3048 } },
  Storage: { base: "byte", units: { bit: 0.125, byte: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1.0995e12, PB: 1.1259e15 } },
  "Data rate": { base: "bps", units: { bps: 1, Kbps: 1000, Mbps: 1e6, Gbps: 1e9, "KB/s": 8000, "MB/s": 8e6 } },
  Time: { base: "s", units: { ms: 0.001, s: 1, min: 60, hour: 3600, day: 86400, week: 604800 } },
  Pressure: { base: "Pa", units: { Pa: 1, kPa: 1000, bar: 100000, psi: 6894.76, atm: 101325, mmHg: 133.322, torr: 133.322 } },
  Power: { base: "W", units: { W: 1, kW: 1000, MW: 1e6, hp: 745.7, "BTU/h": 0.293071 } },
  Energy: { base: "J", units: { J: 1, kJ: 1000, cal: 4.184, kcal: 4184, Wh: 3600, kWh: 3.6e6, BTU: 1055.06 } },
  Angle: { base: "deg", units: { deg: 1, rad: 57.2958, grad: 0.9, arcmin: 0.016667, turn: 360 } },
  Typography: { base: "px", units: { px: 1, pt: 1.3333, pc: 16, in: 96, cm: 37.7952, mm: 3.77952, em: 16, rem: 16 } },
  Cooking: { base: "ml", units: { ml: 1, tsp: 4.92892, tbsp: 14.7868, cup: 240, "fl oz": 29.5735, L: 1000 } },
};

export default function UnitConverter() {
  const [cat, setCat] = useState("Length");
  const units = cat === "Temperature" ? [] : Object.keys(CATS[cat].units);
  const [from, setFrom] = useState(units[0]);
  const [to, setTo] = useState(units[2] ?? units[1]);
  const [val, setVal] = useState("1");
  const [copied, setCopied] = useState(false);

  const changeCat = (c: string) => {
    setCat(c);
    const u = Object.keys(CATS[c].units);
    setFrom(u[0]); setTo(u[2] ?? u[1]);
  };

  const result = useMemo(() => {
    if (cat === "Temperature") return "";
    const f = CATS[cat].units[from], t = CATS[cat].units[to];
    const out = (parseFloat(val) || 0) * f / t;
    return String(Math.round(out * 1e6) / 1e6);
  }, [cat, from, to, val]);

  // Temperature handled separately
  const tempResult = useMemo(() => {
    const v = parseFloat(val) || 0;
    let c = v;
    if (from === "°F") c = (v - 32) * 5 / 9; else if (from === "K") c = v - 273.15;
    let out = c;
    if (to === "°F") out = c * 9 / 5 + 32; else if (to === "K") out = c + 273.15;
    return String(Math.round(out * 100) / 100);
  }, [from, to, val]);

  const isTemp = cat === "Temperature";
  const tempUnits = ["°C", "°F", "K"];
  const displayResult = isTemp ? tempResult : result;

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(displayResult);
      setCopied(true);
      showToast("Result copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      showToast("Couldn't copy — try selecting the value manually", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[...Object.keys(CATS), "Temperature"].map((c) => (
          <Button key={c} variant={cat === c ? "default" : "outline"} size="sm"
            onClick={() => { if (c === "Temperature") { setCat(c); setFrom("°C"); setTo("°F"); } else changeCat(c); }}>
            {c}
          </Button>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>{cat}</CardTitle></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <div className="space-y-1.5">
            <Label htmlFor="uc-from-value">From</Label>
            <Input id="uc-from-value" type="number" inputMode="decimal" aria-label="Value to convert" value={val} onChange={(e) => setVal(e.target.value)} />
            <Select aria-label="Convert from unit" value={from} onChange={(e) => setFrom(e.target.value)}>
              {(isTemp ? tempUnits : units).map((u) => <option key={u}>{u}</option>)}
            </Select>
          </div>
          <Button variant="outline" size="icon" className="mb-1 justify-self-center sm:justify-self-auto" aria-label="Swap from and to units"
            onClick={() => { setFrom(to); setTo(from); }}><ArrowLeftRight className="size-4" /></Button>
          <div className="space-y-1.5">
            <Label htmlFor="uc-to-value">To</Label>
            <div className="relative">
              <Input id="uc-to-value" readOnly value={displayResult} aria-label="Converted result" className="pr-9 font-semibold" />
              <button type="button" onClick={copyResult} aria-label="Copy result"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
              </button>
            </div>
            <Select aria-label="Convert to unit" value={to} onChange={(e) => setTo(e.target.value)}>
              {(isTemp ? tempUnits : units).map((u) => <option key={u}>{u}</option>)}
            </Select>
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground">
        {val || 0} {from} = <span className="font-semibold text-foreground">{displayResult} {to}</span>
      </p>
    </div>
  );
}
