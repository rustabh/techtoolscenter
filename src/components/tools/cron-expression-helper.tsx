"use client";

import { useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PRESETS: { label: string; expr: string }[] = [
  { label: "Every minute", expr: "* * * * *" },
  { label: "Every 5 minutes", expr: "*/5 * * * *" },
  { label: "Every hour", expr: "0 * * * *" },
  { label: "Every day at midnight", expr: "0 0 * * *" },
  { label: "Every day at 9 AM", expr: "0 9 * * *" },
  { label: "Every Monday 9 AM", expr: "0 9 * * 1" },
  { label: "First of month", expr: "0 0 1 * *" },
  { label: "Every weekday 6 PM", expr: "0 18 * * 1-5" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Cron treats both 0 and 7 as Sunday (a universally-supported alias); DAYS
// only has indices 0-6, so 7 needs folding back to 0 before it's used to index.
const normalizeDow = (n: number): number => (n === 7 ? 0 : n);

function describeDow(dow: string): string {
  const range = dow.match(/^(\d)-(\d)$/);
  if (range) return `${DAYS[normalizeDow(Number(range[1]))]}–${DAYS[normalizeDow(Number(range[2]))]}`;
  if (/^\d$/.test(dow)) return DAYS[normalizeDow(Number(dow))];
  if (/^\d(,\d)+$/.test(dow)) return dow.split(",").map((d) => DAYS[normalizeDow(Number(d))]).join(", ");
  return dow;
}

function parseField(field: string, min: number, max: number): Set<number> {
  const values = new Set<number>();
  for (const part of field.split(",")) {
    const stepMatch = part.match(/^(\*|\d+-\d+|\d+)\/(\d+)$/);
    if (stepMatch) {
      const [, range, stepStr] = stepMatch;
      const step = Number(stepStr);
      let start = min, end = max;
      if (range !== "*") {
        const rangeMatch = range.match(/^(\d+)-(\d+)$/);
        if (rangeMatch) { start = Number(rangeMatch[1]); end = Number(rangeMatch[2]); }
        else start = end = Number(range);
      }
      for (let v = start; v <= end; v += step) values.add(v);
      continue;
    }
    const rangeMatch = part.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      for (let v = Number(rangeMatch[1]); v <= Number(rangeMatch[2]); v++) values.add(v);
      continue;
    }
    if (part === "*") { for (let v = min; v <= max; v++) values.add(v); continue; }
    if (/^\d+$/.test(part)) values.add(Number(part));
  }
  return values;
}

// Standard Vixie-cron semantics: when BOTH day-of-month and day-of-week are
// restricted (neither is "*"), a date matches if EITHER field matches (OR),
// not both (AND) — a common source of "why did my cron fire on the wrong
// day" confusion, so getting this exactly right matters more than the rest.
function nextRuns(expr: string, count: number, from = new Date()): Date[] {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return [];
  const [minF, hourF, domF, monF, dowF] = parts;
  let minutes: Set<number>, hours: Set<number>, doms: Set<number>, months: Set<number>, dows: Set<number>;
  try {
    minutes = parseField(minF, 0, 59);
    hours = parseField(hourF, 0, 23);
    doms = parseField(domF, 1, 31);
    months = parseField(monF, 1, 12);
    dows = parseField(dowF, 0, 6);
    if (dows.has(7)) { dows.delete(7); dows.add(0); } // 7 is a valid alias for Sunday
  } catch {
    return [];
  }
  if (![minutes, hours, doms, months, dows].every((s) => s.size > 0)) return [];
  const domIsWild = domF === "*";
  const dowIsWild = dowF === "*";

  const results: Date[] = [];
  const cursor = new Date(from);
  cursor.setSeconds(0, 0);
  cursor.setMinutes(cursor.getMinutes() + 1);
  let guard = 0;
  const maxIterations = 60 * 24 * 366 * 4; // ~4 years of minute-steps, worst case (e.g. Feb 29)
  while (results.length < count && guard < maxIterations) {
    guard++;
    if (!months.has(cursor.getMonth() + 1)) { cursor.setMonth(cursor.getMonth() + 1, 1); cursor.setHours(0, 0, 0, 0); continue; }
    const domMatch = doms.has(cursor.getDate());
    const dowMatch = dows.has(cursor.getDay());
    const dayMatches = domIsWild && dowIsWild ? true : domIsWild ? dowMatch : dowIsWild ? domMatch : domMatch || dowMatch;
    if (!dayMatches) { cursor.setDate(cursor.getDate() + 1); cursor.setHours(0, 0, 0, 0); continue; }
    if (!hours.has(cursor.getHours())) { cursor.setHours(cursor.getHours() + 1, 0, 0, 0); continue; }
    if (!minutes.has(cursor.getMinutes())) { cursor.setMinutes(cursor.getMinutes() + 1); continue; }
    results.push(new Date(cursor));
    cursor.setMinutes(cursor.getMinutes() + 1);
  }
  return results;
}

function describe(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "Enter a valid 5-field cron expression.";
  const [min, hour, dom, mon, dow] = parts;
  const bits: string[] = [];
  if (min === "*" && hour === "*") bits.push("every minute");
  else if (min.startsWith("*/") && hour === "*") bits.push(`every ${min.slice(2)} minutes`);
  else if (hour === "*") bits.push(`at minute ${min} of every hour`);
  else if (min === "*") bits.push(`every minute during hour ${hour}`);
  else bits.push(`at ${hour.padStart(2, "0")}:${min.padStart(2, "0")}`);
  if (dom !== "*") bits.push(`on day-of-month ${dom}`);
  if (mon !== "*") bits.push(`in month ${mon}`);
  if (dow !== "*") bits.push(`on ${describeDow(dow)}`);
  return "Runs " + bits.join(", ") + ".";
}

export default function CronExpressionHelper() {
  const [expr, setExpr] = useState("0 9 * * 1-5");
  const { copied, copy } = useCopy();
  const desc = useMemo(() => describe(expr), [expr]);
  // Recomputed against "now" on every expr change — a static list would go
  // stale the moment the page has been open a while.
  const upcoming = useMemo(() => nextRuns(expr, 5), [expr]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Presets</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {PRESETS.map((p) => (
            <button key={p.expr} onClick={() => setExpr(p.expr)}
              className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-sm hover:bg-secondary">
              <span>{p.label}</span>
              <code className="font-mono text-xs text-muted-foreground">{p.expr}</code>
            </button>
          ))}
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Expression</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input value={expr} onChange={(e) => setExpr(e.target.value)} className="font-mono" />
          <p className="rounded-xl bg-secondary/50 p-4 text-sm">{desc}</p>
          <p className="text-xs text-muted-foreground">Fields: minute · hour · day-of-month · month · day-of-week</p>
          {upcoming.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">Next {upcoming.length} runs (your local time)</p>
              <ul className="space-y-1 rounded-xl border border-border p-3 text-sm">
                {upcoming.map((d, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span>{d.toLocaleString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button onClick={() => copy(expr)}>{copied ? "Copied!" : "Copy expression"}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
