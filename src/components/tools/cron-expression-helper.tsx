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

function describeDow(dow: string): string {
  const range = dow.match(/^(\d)-(\d)$/);
  if (range) return `${DAYS[Number(range[1])]}–${DAYS[Number(range[2])]}`;
  if (/^\d$/.test(dow)) return DAYS[Number(dow)];
  if (/^\d(,\d)+$/.test(dow)) return dow.split(",").map((d) => DAYS[Number(d)]).join(", ");
  return dow;
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
          <Button onClick={() => copy(expr)}>{copied ? "Copied!" : "Copy expression"}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
