"use client";

import { useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, Copy } from "lucide-react";

function hexToRgb(hex: string) {
  const m = hex.replace("#", "");
  const n = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const int = parseInt(n, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
function rgbToCmyk(r: number, g: number, b: number) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);
  return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#4f46e5");
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const { c, m: cmykM, y, k } = rgbToCmyk(r, g, b);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  const hsl = `hsl(${h}, ${s}%, ${l}%)`;
  const cmyk = `cmyk(${c}%, ${cmykM}%, ${y}%, ${k}%)`;
  const { copied, copy } = useCopy();
  const [last, setLast] = useState("");

  const Row = ({ label, val }: { label: string; val: string }) => (
    <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-3">
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-mono text-sm font-medium">{val}</p>
      </div>
      <button aria-label={`Copy ${label}`} onClick={() => { copy(val); setLast(label); }} className="rounded-lg p-2 hover:bg-background">
        {copied && last === label ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
      </button>
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Pick a color</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="h-40 rounded-2xl border border-border" style={{ background: hex }} />
          <div className="grid grid-cols-3 items-end gap-3">
            <div className="space-y-1.5"><Label htmlFor="colorconv-picker">Picker</Label><Input id="colorconv-picker" type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-10 p-1" /></div>
            <div className="col-span-2 space-y-1.5"><Label htmlFor="colorconv-hex">HEX</Label><Input id="colorconv-hex" value={hex} onChange={(e) => setHex(e.target.value)} className="font-mono" /></div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Values</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Row label="HEX" val={hex.toUpperCase()} />
          <Row label="RGB" val={rgb} />
          <Row label="HSL" val={hsl} />
          <Row label="CMYK" val={cmyk} />
        </CardContent>
      </Card>
    </div>
  );
}
