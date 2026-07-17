"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const STOP = new Set("the a an and or but of to in on for with is are be this that it as at by from your you we our".split(" "));

function phrases(words: string[], n: number) {
  const map = new Map<string, number>();
  for (let i = 0; i <= words.length - n; i++) {
    const p = words.slice(i, i + n).join(" ");
    if (n === 1 && STOP.has(p)) continue;
    map.set(p, (map.get(p) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
}

export default function KeywordDensityChecker() {
  const { value, set } = useLocalStorage<string>("uh:kwd", "Paste your content here to analyse keyword density and frequency.");

  const data = useMemo(() => {
    const words = value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
    return { total: words.length, one: phrases(words, 1), two: phrases(words, 2), three: phrases(words, 3) };
  }, [value]);

  const Table = ({ title, rows }: { title: string; rows: [string, number][] }) => (
    <Card>
      <CardContent className="pt-6">
        <h3 className="mb-3 text-sm font-semibold">{title}</h3>
        <div className="space-y-1.5">
          {rows.length === 0 ? <p className="text-sm text-muted-foreground">—</p> : rows.map(([w, c]) => (
            <div key={w} className="flex items-center justify-between text-sm">
              <span className="truncate">{w}</span>
              <span className="ml-2 shrink-0 text-muted-foreground">{c} · {((c / (data.total || 1)) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-2 pt-6">
          <Textarea aria-label="Content" className="min-h-[200px]" value={value} onChange={(e) => set(e.target.value)} placeholder="Paste your content…" />
          <p className="text-sm text-muted-foreground">{data.total} words analysed</p>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Table title="Single words" rows={data.one} />
        <Table title="Two-word phrases" rows={data.two} />
        <Table title="Three-word phrases" rows={data.three} />
      </div>
    </div>
  );
}
