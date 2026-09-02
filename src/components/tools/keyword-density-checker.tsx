"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STOP = new Set("the a an and or but of to in on for with is are be this that it as at by from your you we our".split(" "));

function phrases(words: string[], n: number) {
  const map = new Map<string, number>();
  for (let i = 0; i <= words.length - n; i++) {
    const p = words.slice(i, i + n).join(" ");
    if (n === 1 && STOP.has(p)) continue;
    map.set(p, (map.get(p) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
}

// An n-word phrase can only start at one of (total - n + 1) positions in the
// text, not at any of the `total` word positions — dividing by the raw word
// count instead understates every multi-word phrase's density (a bigram that
// occupies both of its only 2 possible slots would read as sub-100%).
function ngramWindowCount(total: number, n: number): number {
  return Math.max(total - n + 1, 0);
}

// Counts every overlapping occurrence of `target` inside `words` — a plain
// global regex match on the raw text (the previous approach) advances past
// the whole match it just found, so "seo seo" inside "seo seo seo" only
// finds 1 occurrence instead of the 2 overlapping ones, undercounting any
// repeating phrase relative to the phrase tables below (which do count
// overlaps via a sliding window).
function countOverlapping(words: string[], target: string[]): number {
  if (target.length === 0 || target.length > words.length) return 0;
  let count = 0;
  for (let i = 0; i <= words.length - target.length; i++) {
    if (target.every((w, j) => words[i + j] === w)) count++;
  }
  return count;
}

// Common SEO guidance: under ~0.5% and the keyword barely appears; over
// ~2.5-3% starts reading as keyword stuffing to both readers and search
// engines. This mirrors the density formula the existing tables below
// already use (occurrences ÷ total words), so a target phrase like "best
// pdf compressor" is judged the same way as the generic phrase lists.
function densityStatus(pct: number): { label: string; color: string } {
  if (pct === 0) return { label: "Not found in your content", color: "text-muted-foreground" };
  if (pct < 0.5) return { label: "Low — consider using it a bit more", color: "text-amber-500" };
  if (pct <= 2.5) return { label: "Healthy range", color: "text-emerald-600 dark:text-emerald-400" };
  return { label: "High — risk of keyword stuffing", color: "text-red-500" };
}

export default function KeywordDensityChecker() {
  const { value, set } = useLocalStorage<string>("uh:kwd", "Paste your content here to analyse keyword density and frequency.");
  const [target, setTarget] = useState("");

  const data = useMemo(() => {
    const words = value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
    return { total: words.length, one: phrases(words, 1), two: phrases(words, 2), three: phrases(words, 3) };
  }, [value]);

  const targetStats = useMemo(() => {
    const kw = target.trim().toLowerCase();
    if (!kw) return null;
    const targetWords = kw.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
    if (targetWords.length === 0) return null;
    const words = value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
    const count = countOverlapping(words, targetWords);
    const windowCount = ngramWindowCount(words.length, targetWords.length);
    const pct = windowCount > 0 ? (count / windowCount) * 100 : 0;
    return { count, pct };
  }, [target, value]);

  const Table = ({ title, n, rows }: { title: string; n: number; rows: [string, number][] }) => {
    const windowCount = ngramWindowCount(data.total, n) || 1;
    return (
      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-3 text-sm font-semibold">{title}</h3>
          <div className="space-y-1.5">
            {rows.length === 0 ? <p className="text-sm text-muted-foreground">—</p> : rows.map(([w, c]) => (
              <div key={w} className="flex items-center justify-between text-sm">
                <span className="truncate">{w}</span>
                <span className="ml-2 shrink-0 text-muted-foreground">{c} · {((c / windowCount) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Textarea aria-label="Content" className="min-h-[200px]" value={value} onChange={(e) => set(e.target.value)} placeholder="Paste your content…" />
          <p className="text-sm text-muted-foreground">{data.total} words analysed</p>
          <div className="space-y-1.5">
            <Label htmlFor="target-kw">Target keyword or phrase (optional)</Label>
            <Input id="target-kw" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="e.g. best pdf compressor" />
          </div>
          {targetStats && (
            <div className="rounded-xl bg-secondary/60 p-3 text-sm">
              <div className="flex items-center justify-between">
                <span>&ldquo;{target}&rdquo; appears <span className="font-semibold">{targetStats.count}</span> times</span>
                <span className="font-semibold">{targetStats.pct.toFixed(2)}%</span>
              </div>
              <p className={`mt-1 text-xs font-medium ${densityStatus(targetStats.pct).color}`}>{densityStatus(targetStats.pct).label}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Table title="Single words" n={1} rows={data.one} />
        <Table title="Two-word phrases" n={2} rows={data.two} />
        <Table title="Three-word phrases" n={3} rows={data.three} />
      </div>
    </div>
  );
}
