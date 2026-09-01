"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ActionBar } from "@/components/tools/action-bar";
import { Type } from "lucide-react";
import { downloadBlob } from "@/lib/utils";

export default function FindAndReplace() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:findreplace", "The quick brown fox. The lazy dog.");
  const [find, setFind] = useState("The");
  const [replace, setReplace] = useState("A");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [useRegex, setUseRegex] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const { copied, copy } = useCopy();

  const { output, count, error } = useMemo(() => {
    if (!find) return { output: value, count: 0, error: "" };
    try {
      let pattern = useRegex ? find : find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (wholeWord && !useRegex) pattern = `\\b${pattern}\\b`;
      const re = new RegExp(pattern, caseSensitive ? "g" : "gi");
      const matches = value.match(re);
      // In plain (non-regex) mode the replacement text should be inserted
      // exactly as typed — but String.replace() always treats "$&", "$$",
      // "$1" etc. as special substitution tokens, regex mode or not. Without
      // escaping, replacing with literal text like "$&" silently duplicates
      // the matched text instead. Only regex mode should get real $-substitution.
      const safeReplace = useRegex ? replace : replace.replace(/\$/g, "$$$$");
      return { output: value.replace(re, safeReplace), count: matches?.length ?? 0, error: "" };
    } catch (e) {
      return { output: value, count: 0, error: (e as Error).message };
    }
  }, [value, find, replace, caseSensitive, useRegex, wholeWord]);

  const Toggle = ({ c, on, label, disabled, title }: { c: boolean; on: (v: boolean) => void; label: string; disabled?: boolean; title?: string }) => (
    <label className={`flex items-center gap-2 text-sm ${disabled ? "cursor-not-allowed text-muted-foreground" : "cursor-pointer"}`} title={title}>
      <input type="checkbox" checked={c} disabled={disabled} onChange={(e) => on(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />{label}
    </label>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5"><Label htmlFor="findreplace-find">Find</Label><Input id="findreplace-find" value={find} onChange={(e) => setFind(e.target.value)} /></div>
            <div className="space-y-1.5"><Label htmlFor="findreplace-with">Replace with</Label><Input id="findreplace-with" value={replace} onChange={(e) => setReplace(e.target.value)} /></div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Toggle c={caseSensitive} on={setCaseSensitive} label="Case sensitive" />
            <Toggle
              c={wholeWord}
              on={setWholeWord}
              label="Whole word"
              disabled={useRegex}
              title={useRegex ? "Doesn't combine with a custom regex — wrap your own pattern in \\b if you need word boundaries" : undefined}
            />
            <Toggle c={useRegex} on={setUseRegex} label="Regex" />
          </div>
          {error && <p className="text-sm text-destructive">Regex error: {error}</p>}
          <p className="text-sm text-muted-foreground">{count} match{count === 1 ? "" : "es"} replaced</p>
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-2 pt-6">
            <Label htmlFor="findreplace-original">Original</Label>
            <Textarea id="findreplace-original" className="min-h-[200px]" value={value} onChange={(e) => set(e.target.value)} />
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader><CardTitle>Result</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {output ? (
              <pre className="min-h-[200px] whitespace-pre-wrap rounded-xl bg-secondary/50 p-4 text-sm">{output}</pre>
            ) : (
              <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-xl bg-secondary/50 p-4 text-center text-sm text-muted-foreground">
                <Type className="size-6 opacity-50" />
                <p>Nothing to show — type something above</p>
              </div>
            )}
            <ActionBar onUndo={undo} onRedo={redo} onReset={reset} onCopy={() => copy(output)} copied={copied} onDownload={() => downloadBlob(new Blob([output], { type: "text/plain" }), "replaced.txt")} downloadLabel="Download .txt" canUndo={canUndo} canRedo={canRedo} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
