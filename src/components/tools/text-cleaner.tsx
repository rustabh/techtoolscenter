"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ActionBar } from "@/components/tools/action-bar";
import { Type } from "lucide-react";

export default function TextCleaner() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:cleaner", "  This   text\n\n\nhas    messy   spacing\n\n  and lines.  ");
  const [opts, setOpts] = useState({ spaces: true, blank: true, trim: true, breaks: false, special: false });
  const { copied, copy } = useCopy();

  const output = useMemo(() => {
    let t = value;
    if (opts.breaks) t = t.replace(/\n+/g, " ");
    if (opts.spaces) t = t.replace(/[ \t]+/g, " ");
    if (opts.blank) t = t.replace(/\n\s*\n+/g, "\n");
    if (opts.special) t = t.replace(/[^\w\s.,!?'"-]/g, "");
    if (opts.trim) t = t.split("\n").map((l) => l.trim()).join("\n").trim();
    return t;
  }, [value, opts]);

  const Toggle = ({ k, label }: { k: keyof typeof opts; label: string }) => (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <input type="checkbox" checked={opts[k]} onChange={(e) => setOpts((o) => ({ ...o, [k]: e.target.checked }))} className="size-4 accent-[hsl(var(--primary))]" />{label}
    </label>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Textarea className="min-h-[220px]" value={value} onChange={(e) => set(e.target.value)} aria-label="Input" />
          <div className="grid grid-cols-2 gap-3">
            <Toggle k="spaces" label="Collapse spaces" />
            <Toggle k="blank" label="Remove blank lines" />
            <Toggle k="trim" label="Trim each line" />
            <Toggle k="breaks" label="Remove line breaks" />
            <Toggle k="special" label="Remove special chars" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Result</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {output ? (
            <pre className="min-h-[220px] whitespace-pre-wrap rounded-xl bg-secondary/50 p-4 text-sm">{output}</pre>
          ) : (
            <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-xl bg-secondary/50 p-4 text-center text-sm text-muted-foreground">
              <Type className="size-6 opacity-50" />
              <p>Nothing to show — type something above</p>
            </div>
          )}
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} onCopy={() => copy(output)} copied={copied} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>
    </div>
  );
}
