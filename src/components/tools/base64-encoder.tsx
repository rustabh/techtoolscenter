"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { downloadBlob } from "@/lib/utils";

function encode(s: string) {
  try {
    return btoa(unescape(encodeURIComponent(s)));
  } catch {
    return "⚠ Couldn't encode this text (it may contain an invalid character)";
  }
}
function decode(s: string) {
  try {
    return decodeURIComponent(escape(atob(s.trim())));
  } catch {
    return "⚠ Invalid Base64 input";
  }
}

export default function Base64Encoder() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:base64", "Hello, TechToolsCenter!");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { copied, copy } = useCopy();

  const output = useMemo(() => (mode === "encode" ? encode(value) : decode(value)), [value, mode]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["encode", "decode"] as const).map((m) => (
          <Button key={m} variant={mode === m ? "default" : "outline"} size="sm" onClick={() => setMode(m)} className="capitalize">{m}</Button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <Textarea aria-label="Input" className="min-h-[220px] font-mono text-sm" value={value} onChange={(e) => set(e.target.value)} placeholder={mode === "encode" ? "Text to encode…" : "Base64 to decode…"} />
            <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="space-y-4 pt-6">
            <pre className="min-h-[220px] overflow-auto whitespace-pre-wrap break-all rounded-xl bg-secondary/50 p-4 font-mono text-sm">{output}</pre>
            <ActionBar
              onCopy={() => copy(output)}
              copied={copied}
              onDownload={() => downloadBlob(new Blob([output], { type: "text/plain" }), mode === "encode" ? "encoded.txt" : "decoded.txt")}
              downloadLabel="Download .txt"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
