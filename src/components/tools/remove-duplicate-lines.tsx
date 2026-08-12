"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ActionBar } from "@/components/tools/action-bar";

export default function RemoveDuplicateLines() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:dedupe", "apple\nbanana\napple\n\ncherry\nBanana\ncherry");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [sort, setSort] = useState(false);
  const { copied, copy } = useCopy();

  const { output, removed } = useMemo(() => {
    const rawLines = value.split("\n").map((l) => l.replace(/\s+$/, ""));
    let lines = rawLines;
    if (removeEmpty) lines = lines.filter((l) => l.trim() !== "");
    const seen = new Set<string>();
    const result: string[] = [];
    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(line);
      }
    }
    if (sort) result.sort((a, b) => a.localeCompare(b));
    return { output: result.join("\n"), removed: rawLines.length - result.length };
  }, [value, caseSensitive, removeEmpty, sort]);

  const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) => (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
      {label}
    </label>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Textarea aria-label="Input text" className="min-h-[260px] font-mono text-sm" value={value} onChange={(e) => set(e.target.value)} />
          <div className="flex flex-wrap gap-4">
            <Toggle checked={caseSensitive} onChange={setCaseSensitive} label="Case sensitive" />
            <Toggle checked={removeEmpty} onChange={setRemoveEmpty} label="Remove empty lines" />
            <Toggle checked={sort} onChange={setSort} label="Sort A→Z" />
          </div>
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="space-y-4 pt-6">
          <p className="text-xs text-muted-foreground">Removed {removed} duplicate/empty line{removed === 1 ? "" : "s"}</p>
          <pre className="min-h-[260px] overflow-auto whitespace-pre-wrap rounded-xl bg-secondary/50 p-4 font-mono text-sm">{output}</pre>
          <ActionBar onCopy={() => copy(output)} copied={copied} />
        </CardContent>
      </Card>
    </div>
  );
}
