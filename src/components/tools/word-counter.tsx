"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ActionBar } from "@/components/tools/action-bar";

export default function WordCounter() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:wordcount", "");
  const { copied, copy } = useCopy();

  const stats = useMemo(() => {
    const text = value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences = text.trim() ? (text.match(/[.!?]+(\s|$)/g) || []).length || (text.trim() ? 1 : 0) : 0;
    const paragraphs = text.trim() ? text.split(/\n+/).filter((p) => p.trim()).length : 0;
    const readingTime = Math.ceil(words / 200);
    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime };
  }, [value]);

  const items = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.chars },
    { label: "No spaces", value: stats.charsNoSpace },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Read time", value: `${stats.readingTime} min` },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((i) => (
          <div key={i.label} className="glass rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">{i.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{i.label}</p>
          </div>
        ))}
      </div>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Textarea
            aria-label="Text to analyse"
            placeholder="Start typing or paste your text here…"
            className="min-h-[280px] text-base"
            value={value}
            onChange={(e) => set(e.target.value)}
          />
          <ActionBar
            onUndo={undo}
            onRedo={redo}
            onReset={reset}
            onCopy={() => copy(value)}
            copied={copied}
            canUndo={canUndo}
            canRedo={canRedo}
          />
        </CardContent>
      </Card>
    </div>
  );
}
