"use client";

import { useMemo, useState } from "react";
import { History, Plus, Trash2 } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GenerationHistoryPanel } from "@/components/tools/generation-history-panel";

interface Stop { id: string; color: string; }

const rid = () => Math.random().toString(36).slice(2);

export default function GradientGenerator() {
  const [stops, setStops] = useState<Stop[]>([{ id: "1", color: "#6366f1" }, { id: "2", color: "#22d3ee" }]);
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial" | "conic">("linear");
  const { copied, copy } = useCopy();
  const { history, add, remove, clear } = useGenerationHistory("uh:history:gradient-generator");

  const colorList = stops.map((s) => s.color).join(", ");

  const css = useMemo(() => {
    if (type === "linear") return `linear-gradient(${angle}deg, ${colorList})`;
    if (type === "conic") return `conic-gradient(from ${angle}deg, ${colorList})`;
    return `radial-gradient(circle, ${colorList})`;
  }, [type, angle, colorList]);

  const full = `background: ${css};`;

  const addStop = () => setStops((s) => [...s, { id: rid(), color: "#ffffff" }]);
  const removeStop = (id: string) => setStops((s) => (s.length > 2 ? s.filter((x) => x.id !== id) : s));
  const patchStop = (id: string, color: string) => setStops((s) => s.map((x) => (x.id === id ? { ...x, color } : x)));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Gradient</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Colors ({stops.length})</Label>
            <div className="space-y-2">
              {stops.map((s) => (
                <div key={s.id} className="flex items-center gap-2">
                  <Input type="color" aria-label={`Color stop ${s.color}`} value={s.color} onChange={(e) => patchStop(s.id, e.target.value)} className="h-10 w-16 shrink-0 p-1" />
                  <Input value={s.color} onChange={(e) => patchStop(s.id, e.target.value)} className="font-mono text-xs" />
                  <Button variant="ghost" size="icon" aria-label="Remove color stop" onClick={() => removeStop(s.id)} disabled={stops.length <= 2}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={addStop}><Plus className="size-4" /> Add color stop</Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["linear", "radial", "conic"] as const).map((t) => (
              <Button key={t} variant={type === t ? "default" : "outline"} size="sm" onClick={() => setType(t)} className="capitalize">{t}</Button>
            ))}
          </div>
          {type !== "radial" && (
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
