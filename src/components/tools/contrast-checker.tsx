"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function lum(hex: string) {
  let h = hex.replace("#", "");
  // 3-digit shorthand (e.g. "fff") expands by doubling each digit ("ffffff"),
  // not by padding — padding alone silently drops the blue channel entirely.
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  h = h.padEnd(6, "0").slice(0, 6);
  const rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function contrastRatio(a: string, b: string) {
  const l1 = lum(a), l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function hexToHsl(hex: string) {
  const m = hex.replace("#", "").padEnd(6, "0").slice(0, 6);
  const r = parseInt(m.slice(0, 2), 16) / 255, g = parseInt(m.slice(2, 4), 16) / 255, b = parseInt(m.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2; else h = (r - g) / d + 4;
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}
function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return "#" + [f(0), f(8), f(4)].map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
}

// Darkens or lightens the text color (keeping its hue/saturation) until it
// clears the target ratio against the background — a "pass" badge alone
// doesn't tell anyone what to actually change.
function nearestPassingColor(fg: string, bg: string, target: number): string | null {
  const { h, s, l } = hexToHsl(fg);
  let darker: number | null = null, lighter: number | null = null;
  for (let cand = Math.round(l); cand >= 0; cand--) {
    if (contrastRatio(hslToHex(h, s, cand), bg) >= target) { darker = cand; break; }
  }
  for (let cand = Math.round(l); cand <= 100; cand++) {
    if (contrastRatio(hslToHex(h, s, cand), bg) >= target) { lighter = cand; break; }
  }
  if (darker === null && lighter === null) return null;
  if (darker === null) return hslToHex(h, s, lighter!);
  if (lighter === null) return hslToHex(h, s, darker);
  return Math.abs(darker - l) <= Math.abs(lighter - l) ? hslToHex(h, s, darker) : hslToHex(h, s, lighter);
}

function Badge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <div className={`flex items-center justify-between rounded-xl border p-3 text-sm ${pass ? "border-emerald-500/40 bg-emerald-500/10" : "border-red-500/40 bg-red-500/10"}`}>
      <span>{label}</span>
      <span className={`font-semibold ${pass ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>{pass ? "Pass" : "Fail"}</span>
    </div>
  );
}

export default function ContrastChecker() {
  const [fg, setFg] = useState("#1f2937");
  const [bg, setBg] = useState("#ffffff");

  const ratio = useMemo(() => Math.round(contrastRatio(fg, bg) * 100) / 100, [fg, bg]);
  const suggestion = useMemo(() => (ratio < 4.5 ? nearestPassingColor(fg, bg, 4.5) : null), [fg, bg, ratio]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Colours</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Text</Label><Input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 p-1" /><Input value={fg} onChange={(e) => setFg(e.target.value)} className="font-mono" /></div>
            <div className="space-y-1.5"><Label>Background</Label><Input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 p-1" /><Input value={bg} onChange={(e) => setBg(e.target.value)} className="font-mono" /></div>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setFg(bg); setBg(fg); }}>
            <ArrowLeftRight className="size-4" /> Swap colours
          </Button>
          <div className="rounded-2xl p-6 text-center" style={{ background: bg, color: fg }}>
            <p className="text-lg font-semibold">Large text sample</p>
            <p className="text-sm">Normal text sample for contrast preview.</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Contrast ratio</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-5xl font-bold text-primary">{ratio}:1</p>
          <Badge pass={ratio >= 4.5} label="WCAG AA — normal text (4.5:1)" />
          <Badge pass={ratio >= 3} label="WCAG AA — large text (3:1)" />
          <Badge pass={ratio >= 7} label="WCAG AAA — normal text (7:1)" />
          <Badge pass={ratio >= 4.5} label="WCAG AAA — large text (4.5:1)" />
          {suggestion && (
            <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm">
              <span className="flex items-center gap-2">
                Try <span className="size-4 rounded-full border border-border" style={{ background: suggestion }} /> <code className="font-mono">{suggestion.toUpperCase()}</code> to pass AA
              </span>
              <Button variant="outline" size="sm" onClick={() => setFg(suggestion)}>Use it</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
