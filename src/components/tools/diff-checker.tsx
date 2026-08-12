"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ActionBar } from "@/components/tools/action-bar";
import { downloadBlob } from "@/lib/utils";

interface Pair { a: string; b: string; }
const initial: Pair = {
  a: "TechToolsCenter\nfree online tools\nversion 1",
  b: "TechToolsCenter\nfree premium tools\nversion 2\nnew line",
};

// Simple LCS-based line diff. Comparison uses `normalize`d lines (so
// whitespace/case can be ignored per the toggles below) but always displays
// the original, unnormalized text — the user's actual content, not a
// lowercased/trimmed version of it.
function diffLines(a: string[], b: string[], normalize: (s: string) => string) {
  const an = a.map(normalize), bn = b.map(normalize);
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = an[i] === bn[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out: { type: "same" | "add" | "del"; text: string }[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (an[i] === bn[j]) { out.push({ type: "same", text: a[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ type: "del", text: a[i] }); i++; }
    else { out.push({ type: "add", text: b[j] }); j++; }
  }
  while (i < n) out.push({ type: "del", text: a[i++] });
  while (j < m) out.push({ type: "add", text: b[j++] });
  return out;
}

export default function DiffChecker() {
  const { value, set } = useLocalStorage<Pair>("uh:diff", initial);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const { copied, copy } = useCopy();

  const normalize = useMemo(() => {
    return (s: string) => {
      let out = s;
      if (ignoreWhitespace) out = out.trim().replace(/\s+/g, " ");
      if (ignoreCase) out = out.toLowerCase();
      return out;
    };
  }, [ignoreWhitespace, ignoreCase]);

  const rows = useMemo(() => diffLines(value.a.split("\n"), value.b.split("\n"), normalize), [value, normalize]);
  const added = rows.filter((r) => r.type === "add").length;
  const removed = rows.filter((r) => r.type === "del").length;
  const diffText = rows.map((r) => `${r.type === "add" ? "+" : r.type === "del" ? "-" : " "} ${r.text}`).join("\n");

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
      <div className="flex flex-wrap gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={ignoreWhitespace} onChange={(e) => setIgnoreWhitespace(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
          Ignore whitespace
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
          Ignore case
        </label>
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
          <div className="mt-4">
            <ActionBar onCopy={() => copy(diffText)} copied={copied} onDownload={() => downloadBlob(new Blob([diffText], { type: "text/plain" }), "diff.txt")} downloadLabel="Download diff .txt" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
