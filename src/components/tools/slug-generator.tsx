"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { downloadBlob } from "@/lib/utils";

function slugify(s: string, separator: string) {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`^\\${separator}+|\\${separator}+$`, "g"), "");
}

export default function SlugGenerator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:slug", "10 Best Free Online Tools in 2026!");
  const [mode, setMode] = useState<"single" | "batch">("single");
  const [separator, setSeparator] = useState<"-" | "_">("-");
  const [batch, setBatch] = useState("10 Best Free Online Tools in 2026!\nHow to Compress a PDF for Free\nGST Calculator: Complete Guide");
  const slug = useMemo(() => slugify(value, separator), [value, separator]);
  const batchSlugs = useMemo(
    () => batch.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => ({ title: line, slug: slugify(line, separator) })),
    [batch, separator]
  );
  const batchOutput = batchSlugs.map((r) => r.slug).join("\n");
  const { copied, copy } = useCopy();
  const { copied: batchCopied, copy: copyBatch } = useCopy();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          {(["single", "batch"] as const).map((m) => (
            <Button key={m} variant={mode === m ? "default" : "outline"} size="sm" onClick={() => setMode(m)} className="capitalize">{m}</Button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Separator
          <div className="flex gap-1">
            {(["-", "_"] as const).map((sep) => (
              <button
                key={sep}
                onClick={() => setSeparator(sep)}
                className={`rounded-lg border px-3 py-1.5 font-mono text-sm transition-colors ${
                  separator === sep ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                }`}
              >
                {sep}
              </button>
            ))}
          </div>
        </div>
      </div>
      {mode === "single" ? (
        <Card>
          <CardContent className="space-y-5 pt-6">
            <Input aria-label="Title" value={value} onChange={(e) => set(e.target.value)} placeholder="Enter a title…" className="text-base" />
            <div className="rounded-xl bg-secondary/50 p-4">
              <p className="text-xs text-muted-foreground">URL slug</p>
              <p className="mt-1 break-all font-mono text-lg font-medium text-primary">{slug || "—"}</p>
            </div>
            <ActionBar onUndo={undo} onRedo={redo} onReset={reset} onCopy={() => copy(slug)} copied={copied} canUndo={canUndo} canRedo={canRedo} />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="space-y-2 pt-6">
              <Textarea aria-label="Titles, one per line" className="min-h-[240px] font-mono text-sm" value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="One title per line…" />
              <p className="text-xs text-muted-foreground">{batchSlugs.length} titles</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="space-y-4 pt-6">
              <div className="max-h-[240px] space-y-1.5 overflow-auto rounded-xl bg-secondary/50 p-4">
                {batchSlugs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Slugs appear here…</p>
                ) : batchSlugs.map((r, i) => (
                  <p key={i} className="break-all font-mono text-sm text-primary">{r.slug || "—"}</p>
                ))}
              </div>
              <ActionBar
                onCopy={() => copyBatch(batchOutput)}
                copied={batchCopied}
                onDownload={() => downloadBlob(new Blob([batchOutput], { type: "text/plain" }), "slugs.txt")}
                downloadLabel="Download .txt"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
