"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function lum(hex: string) {
  let h = hex.replace("#", "");
  // 3-digit shorthand (e.g. "fff") expands by doubling each digit ("ffffff"),
  // not by padding — padding alone silently drops the blue channel entirely.
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  h = h.padEnd(6, "0").slice(0, 6);
  const rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
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

  const ratio = useMemo(() => {
    const l1 = lum(fg), l2 = lum(bg);
    const r = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return Math.round(r * 100) / 100;
  }, [fg, bg]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Colours</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Text</Label><Input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 p-1" /><Input value={fg} onChange={(e) => setFg(e.target.value)} className="font-mono" /></div>
            <div className="space-y-1.5"><Label>Background</Label><Input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 p-1" /><Input value={bg} onChange={(e) => setBg(e.target.value)} className="font-mono" /></div>
          </div>
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
        </CardContent>
      </Card>
    </div>
  );
}
