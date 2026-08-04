"use client";

import { useMemo, useState } from "react";
import { Check, Copy, History } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GenerationHistoryPanel } from "@/components/tools/generation-history-panel";

function hexToHsl(hex: string) {
  const m = hex.replace("#", "").padEnd(6, "0").slice(0, 6);
  let r = parseInt(m.slice(0, 2), 16) / 255, g = parseInt(m.slice(2, 4), 16) / 255, b = parseInt(m.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const dd = max - min;
    s = l > 0.5 ? dd / (2 - max - min) : dd / (max + min);
    if (max === r) h = (g - b) / dd + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / dd + 2; else h = (r - g) / dd + 4;
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}
function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const aa = s * Math.min(l, 1 - l);
  const f = (n: number) => l - aa * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return "#" + [f(0), f(8), f(4)].map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
}

type Scheme = "complementary" | "analogous" | "triadic" | "shades";

export default function ColorPaletteGenerator() {
  const [base, setBase] = useState("#4f46e5");
  const [scheme, setScheme] = useState<Scheme>("analogous");
  const { copied, copy } = useCopy();
  const [last, setLast] = useState("");
  const { history, add, remove, clear } = useGenerationHistory("uh:history:color-palette-generator");

  const palette = useMemo(() => {
    const { h, s, l } = hexToHsl(base);
    switch (scheme) {
      case "complementary": return [base, hslToHex((h + 180) % 360, s, l), hslToHex(h, s, Math.min(90, l + 20)), hslToHex((h + 180) % 360, s, Math.max(20, l - 20)), hslToHex(h, Math.max(10, s - 30), l)];
      case "triadic": return [base, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l), hslToHex(h, s, Math.min(90, l + 15)), hslToHex(h, s, Math.max(15, l - 15))];
      case "shades": return [90, 72, 54, 40, 26].map((L) => hslToHex(h, s, L));
      default: return [-40, -20, 0, 20, 40].map((d) => hslToHex((h + d + 360) % 360, s, l));
    }
  }, [base, scheme]);

  const cssText = ":root {\n" + palette.map((c, i) => `  --color-${i + 1}: ${c};`).join("\n") + "\n}";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Base colour</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-1.5"><Label>Colour</Label><Input type="color" value={base} onChange={(e) => setBase(e.target.value)} className="h-10 w-20 p-1" /></div>
            <div className="flex flex-wrap gap-2">
              {(["analogous", "complementary", "triadic", "shades"] as Scheme[]).map((s) => (
                <Button key={s} size="sm" variant={scheme === s ? "default" : "outline"} onClick={() => setScheme(s)} className="capitalize">{s}</Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {palette.map((c, i) => (
          <button key={i} onClick={() => { copy(c); setLast(c + i); }} className="group overflow-hidden rounded-2xl border border-border">
            <span className="block h-28" style={{ background: c }} />
            <span className="flex items-center justify-between px-3 py-2 font-mono text-xs">
              {c.toUpperCase()}
              {copied && last === c + i ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100" />}
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => copy(cssText)}>{copied && last === "" ? "Copied!" : "Copy CSS variables"}</Button>
        <Button variant="outline" onClick={() => add(cssText, scheme)}>
          <History className="size-4" /> Save to history
        </Button>
      </div>
      <Card>
        <CardHeader><CardTitle>History</CardTitle></CardHeader>
        <CardContent>
          <GenerationHistoryPanel history={history} onRemove={remove} onClear={clear} emptyLabel="No saved palettes yet — click “Save to history” to keep one." />
        </CardContent>
      </Card>
    </div>
  );
}
