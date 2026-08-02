"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { downloadBlob } from "@/lib/utils";

const ALGOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;
type Algo = (typeof ALGOS)[number];

async function hash(algo: Algo, text: string) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGenerator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:hash", "TechToolsCenter");
  const [algo, setAlgo] = useState<Algo>("SHA-256");
  const [digest, setDigest] = useState("");
  const [error, setError] = useState("");
  const { copied, copy } = useCopy();

  useEffect(() => {
    if (!crypto.subtle) {
      setError("Hashing needs a secure context (HTTPS) — this browser can't run it here.");
      return;
    }
    let active = true;
    hash(algo, value)
      .then((h) => { if (active) { setDigest(h); setError(""); } })
      .catch(() => { if (active) setError("Couldn't compute the hash — try again."); });
    return () => { active = false; };
  }, [value, algo]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Textarea aria-label="Text to hash" className="min-h-[200px]" value={value} onChange={(e) => set(e.target.value)} placeholder="Text to hash…" />
          <div className="flex flex-wrap gap-2">
            {ALGOS.map((a) => (
              <Button key={a} size="sm" variant={algo === a ? "default" : "outline"} onClick={() => setAlgo(a)}>{a}</Button>
            ))}
          </div>
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="space-y-4 pt-6">
          <p className="text-xs font-medium text-muted-foreground">{algo} digest</p>
          {error ? (
            <p className="min-h-[200px] rounded-xl bg-destructive/10 p-4 text-sm text-destructive">{error}</p>
          ) : (
            <pre className="min-h-[200px] overflow-auto whitespace-pre-wrap break-all rounded-xl bg-secondary/50 p-4 font-mono text-xs">{digest}</pre>
          )}
          <ActionBar
            onCopy={() => copy(digest)}
            copied={copied}
            onDownload={digest ? () => downloadBlob(new Blob([digest], { type: "text/plain" }), `${algo.toLowerCase()}.txt`) : undefined}
            downloadLabel="Download .txt"
          />
        </CardContent>
      </Card>
    </div>
  );
}
