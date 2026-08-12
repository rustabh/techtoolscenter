"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";

export default function UrlEncoder() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:url", "https://techtoolscenter.com/search?q=free tools & pdf");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  // encodeURIComponent percent-encodes ":", "/", "?", "&", "=" too — correct
  // for a single query-param VALUE, but wrong for a whole URL (it mangles
  // the scheme and structure). encodeURI leaves those structural characters
  // alone. The default sample text here is a full URL, so this distinction
  // is the difference between a working example and a broken one.
  const [scope, setScope] = useState<"component" | "uri">("uri");
  const { copied, copy } = useCopy();

  const output = useMemo(() => {
    try {
      if (mode === "encode") return scope === "uri" ? encodeURI(value) : encodeURIComponent(value);
      return scope === "uri" ? decodeURI(value) : decodeURIComponent(value);
    } catch {
      return "⚠ Invalid input";
    }
  }, [value, mode, scope]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["encode", "decode"] as const).map((m) => (
          <Button key={m} variant={mode === m ? "default" : "outline"} size="sm" onClick={() => setMode(m)} className="capitalize">{m}</Button>
        ))}
        <span className="mx-1 self-center text-muted-foreground">·</span>
        {([
          { id: "uri", label: "Whole URL" },
          { id: "component", label: "Single value / query param" },
        ] as const).map((s) => (
          <Button key={s.id} variant={scope === s.id ? "default" : "outline"} size="sm" onClick={() => setScope(s.id)}>{s.label}</Button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <Textarea aria-label="Input" className="min-h-[200px] font-mono text-sm" value={value} onChange={(e) => set(e.target.value)} />
            <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="space-y-4 pt-6">
            <pre className="min-h-[200px] overflow-auto whitespace-pre-wrap break-all rounded-xl bg-secondary/50 p-4 font-mono text-sm">{output}</pre>
            <ActionBar onCopy={() => copy(output)} copied={copied} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
