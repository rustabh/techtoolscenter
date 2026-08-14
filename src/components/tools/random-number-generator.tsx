"use client";

import { useCallback, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GenerationHistoryPanel } from "@/components/tools/generation-history-panel";

function rand(min: number, max: number) {
  const range = max - min + 1;
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return min + (arr[0] % range);
}

export default function RandomNumberGenerator() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState(5);
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const { copied, copy } = useCopy();
  const { history, add, remove, clear } = useGenerationHistory("uh:history:random-number-generator");

  const generate = useCallback(() => {
    const lo = parseInt(min) || 0, hi = parseInt(max) || 0;
    const a = Math.min(lo, hi), b = Math.max(lo, hi);
    const n = Math.min(count, unique ? b - a + 1 : count);
    let out: number[];
    if (unique) {
      const set = new Set<number>();
      let guard = 0;
      while (set.size < n && guard++ < 100000) set.add(rand(a, b));
      out = [...set];
    } else {
      out = Array.from({ length: count }, () => rand(a, b));
    }
    setResults(out);
    add(out.join(", "), `${out.length} · ${a}-${b}`);
  }, [min, max, count, unique, add]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Options</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label htmlFor="rng-min">Minimum</Label><Input id="rng-min" type="number" value={min} onChange={(e) => setMin(e.target.value)} /></div>
            <div className="space-y-1.5"><Label htmlFor="rng-max">Maximum</Label><Input id="rng-max" type="number" value={max} onChange={(e) => setMax(e.target.value)} /></div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rng-count">How many: {count}</Label>
            <input id="rng-count" type="range" min={1} max={50} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
            Unique numbers (no repeats)
          </label>
          <Button className="w-full" onClick={generate}>Generate</Button>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Results</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {results.length === 0 ? <p className="text-sm text-muted-foreground">Press generate…</p> :
              results.map((n, i) => <span key={i} className="rounded-lg bg-secondary px-3 py-1.5 font-mono font-semibold">{n}</span>)}
          </div>
          {results.length > 0 && <Button variant="outline" size="sm" onClick={() => copy(results.join(", "))}>{copied ? "Copied!" : "Copy all"}</Button>}
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>History</CardTitle></CardHeader>
        <CardContent>
          <GenerationHistoryPanel history={history} onRemove={remove} onClear={clear} />
        </CardContent>
      </Card>
    </div>
  );
}
