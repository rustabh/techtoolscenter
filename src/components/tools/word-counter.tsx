"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ActionBar } from "@/components/tools/action-bar";
import { downloadBlob } from "@/lib/utils";

// Character limits worth checking text against. "hard" limits are enforced
// by the platform (typing further is truncated or rejected); "guideline"
// limits are Google's practical recommendation for how much of a meta
// title/description reliably renders before truncation, not an enforced cap.
// Kept consistent with the numbers already published in our own
// social-media-character-limits and meta-titles-descriptions guides.
const LIMITS: { label: string; limit: number; kind: "hard" | "guideline" }[] = [
  { label: "X (Twitter) post", limit: 280, kind: "hard" },
  { label: "SMS (single segment)", limit: 160, kind: "hard" },
  { label: "Meta title (Google)", limit: 60, kind: "guideline" },
  { label: "Meta description (Google)", limit: 160, kind: "guideline" },
  { label: "Instagram / TikTok caption", limit: 2200, kind: "hard" },
  { label: "LinkedIn post", limit: 3000, kind: "hard" },
];

const STOPWORDS = new Set([
  "the", "and", "for", "are", "but", "not", "you", "your", "with", "this", "that",
  "have", "has", "had", "was", "were", "will", "would", "can", "could", "should",
  "from", "they", "them", "their", "there", "here", "what", "when", "where", "which",
  "who", "why", "how", "all", "any", "each", "few", "more", "most", "other", "some",
  "such", "than", "too", "very", "just", "into", "about", "over", "after", "before",
  "our", "out", "off", "own", "same", "then", "once", "does", "did", "doing", "being",
]);

export default function WordCounter() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:wordcount", "");
  const { copied, copy } = useCopy();

  const stats = useMemo(() => {
    const text = value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    // Array.from splits by Unicode code point, so a 😀-style astral-plane
    // emoji (a UTF-16 surrogate pair) counts as one character, not two.
    const chars = Array.from(text).length;
    const charsNoSpace = Array.from(text.replace(/\s/g, "")).length;
    const sentences = text.trim()
      ? text.trim().split(/[.!?]+(?:\s+|$)/).map((s) => s.trim()).filter(Boolean).length
      : 0;
    const paragraphs = text.trim() ? text.split(/\n+/).filter((p) => p.trim()).length : 0;
    const readingTime = Math.ceil(words / 200);
    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime };
  }, [value]);

  const topWords = useMemo(() => {
    const raw = value.toLowerCase().match(/[a-z0-9'-]+/g) ?? [];
    const counts = new Map<string, number>();
    for (const w of raw) {
      const cleaned = w.replace(/^['-]+|['-]+$/g, "");
      if (cleaned.length < 3 || STOPWORDS.has(cleaned)) continue;
      counts.set(cleaned, (counts.get(cleaned) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 10);
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
      {stats.chars > 0 && (
        <Card>
          <CardContent className="space-y-3 pt-6">
            <p className="text-sm font-medium text-muted-foreground">Check against common limits</p>
            <div className="space-y-2.5">
              {LIMITS.map((l) => {
                const pct = Math.min(100, (stats.chars / l.limit) * 100);
                const over = stats.chars > l.limit;
                const barColor = over ? "bg-red-500" : pct > 90 ? "bg-amber-500" : "bg-emerald-500";
                return (
                  <div key={l.label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{l.label}</span>
                      <span className={over ? "font-medium text-red-500" : "text-muted-foreground"}>
                        {stats.chars.toLocaleString()} / {l.limit.toLocaleString()}
                        {over ? (l.kind === "hard" ? " — over limit" : " — over guideline") : ""}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
      {topWords.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Most frequent words</p>
            <div className="flex flex-wrap gap-2">
              {topWords.map(([word, count]) => (
                <span key={word} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm">
                  {word}
                  <span className="rounded-full bg-background px-1.5 text-xs font-semibold text-primary">{count}</span>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
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
            onDownload={value.trim() ? () => downloadBlob(new Blob([value], { type: "text/plain" }), "text.txt") : undefined}
            downloadLabel="Download .txt"
            canUndo={canUndo}
            canRedo={canRedo}
          />
        </CardContent>
      </Card>
    </div>
  );
}
