"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ActionBar } from "@/components/tools/action-bar";

function slugify(s: string) {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function SlugGenerator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:slug", "10 Best Free Online Tools in 2026!");
  const slug = useMemo(() => slugify(value), [value]);
  const { copied, copy } = useCopy();

  return (
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
  );
}
