"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const STYLES: { name: string; fn: (t: string) => string }[] = [
  { name: "Hearts", fn: (t) => `♡ ${t} ♡` },
  { name: "Stars", fn: (t) => `★彡 ${t} 彡★` },
  { name: "Sparkles", fn: (t) => `✧･ﾟ: ${t} :･ﾟ✧` },
  { name: "Flowers", fn: (t) => `❀ ${t} ❀` },
  { name: "Arrows", fn: (t) => `➤ ${t} ➤` },
  { name: "Wavy", fn: (t) => `≋ ${t} ≋` },
  { name: "Box", fn: (t) => `【 ${t} 】` },
  { name: "Corners", fn: (t) => `┏━ ${t} ━┓` },
  { name: "Dots", fn: (t) => `•°• ${t} •°•` },
  { name: "Fire", fn: (t) => `🔥 ${t} 🔥` },
  { name: "Royal", fn: (t) => `♛ ${t} ♛` },
  { name: "Cute", fn: (t) => `♡◡̈ ${t} ◡̈♡` },
  { name: "Gaming", fn: (t) => `▄︻┻═┳ ${t} ┳═┻︻▄` },
  { name: "Spaced", fn: (t) => [...t].join(" ") },
  { name: "Dark", fn: (t) => `༺ ${t} ༻` },
  { name: "Wings", fn: (t) => `᯽ ${t} ᯽` },
];

export default function TextDecorator() {
  const { value, set } = useLocalStorage<string>("uh:decor", "your name");
  const { copied, copy } = useCopy();
  const [last, setLast] = useState("");
  const results = useMemo(() => STYLES.map((s) => ({ name: s.name, text: s.fn(value || "") })), [value]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <Input aria-label="Your text" className="text-lg" value={value} onChange={(e) => set(e.target.value)} placeholder="Type your text…" />
        </CardContent>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        {results.map((r) => (
          <button key={r.name} onClick={() => { copy(r.text); setLast(r.name); }}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{r.name}</p>
              <p className="mt-0.5 truncate">{r.text}</p>
            </div>
            {copied && last === r.name ? <Check className="size-4 shrink-0 text-emerald-500" /> : <Copy className="size-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />}
          </button>
        ))}
      </div>
    </div>
  );
}
