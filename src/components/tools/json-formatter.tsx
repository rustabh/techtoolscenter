"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { downloadBlob } from "@/lib/utils";

export default function JsonFormatter() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:json", '{"name":"TechToolsCenter","tools":31,"free":true}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const { copied, copy } = useCopy();

  const run = (mode: "beautify" | "minify") => {
    try {
      const parsed = JSON.parse(value);
      setOutput(JSON.stringify(parsed, null, mode === "beautify" ? 2 : 0));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Textarea aria-label="JSON input" className="min-h-[320px] font-mono text-xs" value={value} onChange={(e) => set(e.target.value)} placeholder="Paste JSON here…" />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => run("beautify")}>Beautify</Button>
            <Button size="sm" variant="outline" onClick={() => run("minify")}>Minify</Button>
            <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
          </div>
        </CardContent>
      </Card>
      <Card className={error ? "border-destructive/50" : ""}>
        <CardContent className="space-y-4 pt-6">
          {error ? (
            <p className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">Invalid JSON: {error}</p>
          ) : (
            <pre className="min-h-[320px] overflow-auto rounded-xl bg-secondary/50 p-4 text-xs">{output || "Formatted output appears here…"}</pre>
          )}
          {output && (
            <ActionBar
              onCopy={() => copy(output)}
              copied={copied}
              onDownload={() => downloadBlob(new Blob([output], { type: "application/json" }), "formatted.json")}
              downloadLabel="Download"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
