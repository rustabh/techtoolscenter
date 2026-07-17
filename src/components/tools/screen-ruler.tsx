"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Unit = "px" | "cm" | "mm" | "inch";

export default function ScreenRuler() {
  const [unit, setUnit] = useState<Unit>("px");
  const [dpi, setDpi] = useState(96);
  const [length, setLength] = useState(600);

  const perUnit = unit === "px" ? 1 : unit === "inch" ? dpi : unit === "cm" ? dpi / 2.54 : dpi / 25.4;
  const ticks = Math.floor(length / perUnit);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Ruler settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["px", "cm", "mm", "inch"] as Unit[]).map((u) => (
              <Button key={u} size="sm" variant={unit === u ? "default" : "outline"} onClick={() => setUnit(u)}>{u}</Button>
            ))}
          </div>
          <div className="space-y-1.5">
            <Label>Ruler length: {length}px</Label>
            <input type="range" min={200} max={1200} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
          </div>
          <div className="space-y-1.5">
            <Label>Calibrate DPI: {dpi} (adjust so 1 inch matches a real ruler)</Label>
            <input type="range" min={72} max={220} value={dpi} onChange={(e) => setDpi(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
          </div>
        </CardContent>
      </Card>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card p-6">
        <div className="relative h-24" style={{ width: length }}>
          <div className="absolute inset-x-0 top-0 h-px bg-border" />
          {Array.from({ length: ticks + 1 }).map((_, i) => {
            const major = unit === "px" ? i % 5 === 0 : true;
            return (
              <div key={i} className="absolute top-0 flex flex-col items-center" style={{ left: i * perUnit }}>
                <div className={major ? "w-px bg-foreground" : "w-px bg-muted-foreground"} style={{ height: major ? 20 : 10 }} />
                {major && <span className="mt-1 text-[10px] text-muted-foreground">{i}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Screen DPI varies by device — calibrate using a physical ruler for accurate cm/inch measurements.
      </p>
    </div>
  );
}
