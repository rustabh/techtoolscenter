"use client";

import { useMemo, useState } from "react";
import { Search, Check } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Sym { c: string; name: string; cat: string; }
const CATS = ["Hearts", "Stars", "Arrows", "Currency", "Math", "Music", "Weather", "Symbols"];

const SYMBOLS: Sym[] = [
  ..."♡♥❤❣❥❦❧♁💗💓💕💖".split("").map((c) => ({ c, name: "heart", cat: "Hearts" })),
  ..."★☆✦✧✩✪✫✬✭✮✯⭐🌟".split("").map((c) => ({ c, name: "star", cat: "Stars" })),
  ..."←→↑↓↔↕⇐⇒⇑⇓➤➜➔➙➛➝➞".split("").map((c) => ({ c, name: "arrow", cat: "Arrows" })),
  ..."$€£¥₹₽¢₩₪₫₭₦₱".split("").map((c) => ({ c, name: "currency", cat: "Currency" })),
  ..."±×÷≠≈≤≥∞∑∏√∫∆πΩµ°∂∇".split("").map((c) => ({ c, name: "math", cat: "Math" })),
  ..."♪♫♬♩♭♮♯🎵🎶".split("").map((c) => ({ c, name: "music", cat: "Music" })),
  ..."☀☁☂☃☄★☾☽❄⛄⚡🌈".split("").map((c) => ({ c, name: "weather", cat: "Weather" })),
  ..."©®™✓✔✗✘☑☒☯☮✎✉✈☎✂✦❖⚜".split("").map((c) => ({ c, name: "symbol", cat: "Symbols" })),
];

export default function SymbolLibrary() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const { copied, copy } = useCopy();
  const [last, setLast] = useState("");

  const filtered = useMemo(() => SYMBOLS.filter((s) => {
    const inCat = cat === "All" || s.cat === cat;
    const inQ = !q || s.name.includes(q.toLowerCase()) || s.cat.toLowerCase().includes(q.toLowerCase());
    return inCat && inQ;
  }), [q, cat]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3">
            <Search className="size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search symbols…" className="h-10 flex-1 bg-transparent text-sm outline-none" aria-label="Search symbols" />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...CATS].map((c) => (
              <Button key={c} size="sm" variant={cat === c ? "default" : "outline"} onClick={() => setCat(c)}>{c}</Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
        {filtered.map((s, i) => (
          <button key={i} onClick={() => { copy(s.c); setLast(s.c + i); }} title={s.name}
            className="grid aspect-square place-items-center rounded-xl border border-border bg-card text-2xl transition-colors hover:border-primary/40 hover:bg-secondary">
            {copied && last === s.c + i ? <Check className="size-4 text-emerald-500" /> : s.c}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">Click any symbol to copy it.</p>
    </div>
  );
}
