"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Pair { a: string; b: string; }
const initial: Pair = {
  a: "TechToolsCenter\nfree online tools\nversion 1",
  b: "TechToolsCenter\nfree premium tools\nversion 2\nnew line",
};

// Simple LCS-based line diff.
function diffLines(a: string[], b: string[]) {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out: { type: "same" | "add" | "del"; text: string }[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { out.push({ type: "same", text: a[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ type: "del", text: a[i] }); i++; }
    else { out.push({ type: "add", text: b[j] }); j++; }
  }
  while (i < n) out.push({ type: "del", text: a[i++] });
  while (j < m) out.push({ type: "add", text: b[j++] });
  return out;
}

export default function DiffChecker() {
  const { value, set } = useLocalStorage<Pair>("uh:diff", initial);
  const rows = useMemo(() => diffLines(value.a.split("\n"), value.b.split("\n")), [value]);
  const added = rows.filter((r) => r.type === "add").length;
  const removed = rows.filter((r) => r.type === "del").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5"><Label>Original</Label>
          <Textarea className="min-h-[180px] font-mono text-sm" value={value.a} onChange={(e) => set({ ...value, a: e.target.value })} />
        </div>
        <div className="space-y-1.5"><Label>Changed</Label>
          <Textarea className="min-h-[180px] font-mono text-sm" value={value.b} onChange={(e) => set({ ...value, b: e.target.value })} />
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="mb-3 text-sm text-muted-foreground">
            <span className="text-emerald-600">+{added} added</span> · <span className="text-red-500">-{removed} removed</span>
          </p>
          <div className="overflow-auto rounded-xl border border-border font-mono text-xs">
            {rows.map((r, i) => (
              <div key={i} className={
                r.type === "add" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" :
                r.type === "del" ? "bg-red-500/10 text-red-600 dark:text-red-400" : ""
              }>
                <span className="inline-block w-6 select-none px-1 text-center text-muted-foreground">
                  {r.type === "add" ? "+" : r.type === "del" ? "-" : " "}
                </span>
                <span className="whitespace-pre-wrap">{r.text || " "}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
