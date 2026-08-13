"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { Type } from "lucide-react";

const UPSIDE: Record<string, string> = { a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z" };

type Mode = "chars" | "words" | "lines" | "upside" | "mirror";
const MODES: { id: Mode; label: string; fn: (t: string) => string }[] = [
  { id: "chars", label: "Reverse characters", fn: (t) => [...t].reverse().join("") },
  { id: "words", label: "Reverse word order", fn: (t) => t.split(/\s+/).reverse().join(" ") },
  { id: "lines", label: "Reverse line order", fn: (t) => t.split("\n").reverse().join("\n") },
  { id: "upside", label: "Upside down", fn: (t) => [...t.toLowerCase()].reverse().map((c) => UPSIDE[c] ?? c).join("") },
  { id: "mirror", label: "Mirror", fn: (t) => [...t].reverse().join("") },
];

export default function ReverseText() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:reverse", "TechToolsCenter");
  const [mode, setMode] = useState<Mode>("chars");
  const { copied, copy } = useCopy();
  const out = useMemo(() => MODES.find((m) => m.id === mode)!.fn(value), [value, mode]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Textarea className="min-h-[200px]" value={value} onChange={(e) => set(e.target.value)} aria-label="Input" />
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <Button key={m.id} size="sm" variant={mode === m.id ? "default" : "outline"} onClick={() => setMode(m.id)}>{m.label}</Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Result</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {out ? (
            <pre className="min-h-[200px] whitespace-pre-wrap break-words rounded-xl bg-secondary/50 p-4 text-sm">{out}</pre>
          ) : (
            <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-xl bg-secondary/50 p-4 text-center text-sm text-muted-foreground">
              <Type className="size-6 opacity-50" />
              <p>Nothing to show — type something above</p>
            </div>
          )}
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} onCopy={() => copy(out)} copied={copied} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>
    </div>
  );
}
