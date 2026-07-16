"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";

type Mode =
  | "upper" | "lower" | "title" | "sentence"
  | "camel" | "snake" | "kebab" | "inverse";

const transforms: Record<Mode, (s: string) => string> = {
  upper: (s) => s.toUpperCase(),
  lower: (s) => s.toLowerCase(),
  title: (s) => s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
  sentence: (s) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
  camel: (s) =>
    s
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, ""),
  snake: (s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
  kebab: (s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  inverse: (s) =>
    s.split("").map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join(""),
};

const labels: { mode: Mode; label: string }[] = [
  { mode: "upper", label: "UPPERCASE" },
  { mode: "lower", label: "lowercase" },
  { mode: "title", label: "Title Case" },
  { mode: "sentence", label: "Sentence case" },
  { mode: "camel", label: "camelCase" },
  { mode: "snake", label: "snake_case" },
  { mode: "kebab", label: "kebab-case" },
  { mode: "inverse", label: "iNVERSE cASE" },
];

export default function CaseConverter() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:case", "The quick brown fox jumps over the lazy dog.");
  const [mode, setMode] = useState<Mode>("upper");
  const { copied, copy } = useCopy();

  const output = transforms[mode](value);

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Textarea
            aria-label="Input text"
            value={value}
            onChange={(e) => set(e.target.value)}
            className="min-h-[160px]"
            placeholder="Type your text…"
          />
          <div className="flex flex-wrap gap-2">
            {labels.map((l) => (
              <Button
                key={l.mode}
                variant={mode === l.mode ? "default" : "outline"}
                size="sm"
                onClick={() => setMode(l.mode)}
              >
                {l.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="space-y-4 pt-6">
          <p className="whitespace-pre-wrap break-words rounded-xl bg-secondary/50 p-4 text-sm">
            {output || <span className="text-muted-foreground">Result appears here…</span>}
          </p>
          <ActionBar
            onUndo={undo}
            onRedo={redo}
            onReset={reset}
            onCopy={() => copy(output)}
            copied={copied}
            canUndo={canUndo}
            canRedo={canRedo}
          />
        </CardContent>
      </Card>
    </div>
  );
}
