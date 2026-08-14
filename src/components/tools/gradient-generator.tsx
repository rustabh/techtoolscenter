"use client";

import { useMemo, useState } from "react";
import { History } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GenerationHistoryPanel } from "@/components/tools/generation-history-panel";

export default function GradientGenerator() {
  const [c1, setC1] = useState("#6366f1");
  const [c2, setC2] = useState("#22d3ee");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");
  const { copied, copy } = useCopy();
  const { history, add, remove, clear } = useGenerationHistory("uh:history:gradient-generator");

  const css = useMemo(() =>
    type === "linear"
      ? `linear-gradient(${angle}deg, ${c1}, ${c2})`
      : `radial-gradient(circle, ${c1}, ${c2})`,
  [type, angle, c1, c2]);

  const full = `background: ${css};`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Gradient</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Color 1</Label><Input type="color" value={c1} onChange={(e) => setC1(e.target.value)} className="h-10 p-1" /></div>
            <div className="space-y-1.5"><Label>Color 2</Label><Input type="color" value={c2} onChange={(e) => setC2(e.target.value)} className="h-10 p-1" /></div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(["linear", "radial"] as const).map((t) => (
              <Button key={t} variant={type === t ? "default" : "outline"} size="sm" onClick={() => setType(t)} className="capitalize">{t}</Button>
            ))}
          </div>
          {type === "linear" && (
            <div className="space-y-1.5">
              <Label htmlFor="gradient-angle">Angle: {angle}°</Label>
              <input id="gradient-angle" type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
            </div>
          )}
        </CardContent>
      </Card>
      <div className="space-y-4">
        <div className="h-56 rounded-2xl border border-border shadow-sm" style={{ background: css }} />
        <div className="flex items-center gap-2 rounded-xl bg-secondary/50 p-3">
          <code className="flex-1 break-all font-mono text-xs">{full}</code>
          <Button size="sm" onClick={() => copy(full)}>{copied ? "Copied" : "Copy"}</Button>
        </div>
        <Button variant="outline" size="sm" onClick={() => add(full, type)}>
          <History className="size-4" /> Save to history
        </Button>
        <Card>
          <CardHeader><CardTitle>History</CardTitle></CardHeader>
          <CardContent>
            <GenerationHistoryPanel history={history} onRemove={remove} onClear={clear} emptyLabel="No saved gradients yet — click “Save to history” to keep one." />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
