"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { localDatetimeISO } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";

function relativeFromNow(ms: number): string {
  const diff = ms - Date.now();
  const abs = Math.abs(diff);
  const mins = Math.round(abs / 60000);
  const hours = Math.round(abs / 3600000);
  const days = Math.round(abs / 86400000);
  const unit = mins < 1 ? "just now" : mins < 60 ? `${mins}m` : hours < 48 ? `${hours}h` : `${days}d`;
  if (unit === "just now") return unit;
  return diff >= 0 ? `in ${unit}` : `${unit} ago`;
}

function CopyRow({ label, value, valueClassName }: { label?: string; value: string; valueClassName?: string }) {
  const { copied, copy } = useCopy();
  return (
    <div className="flex items-center justify-between gap-2">
      <p className={valueClassName}>{label && <span className="text-muted-foreground">{label}: </span>}{value}</p>
      <button type="button" aria-label={label ? `Copy ${label}` : "Copy"} onClick={() => copy(value)} className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground">
        {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  );
}

export default function TimestampConverter() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [ts, setTs] = useState(String(Math.floor(Date.now() / 1000)));
  const [dt, setDt] = useState(() => localDatetimeISO());

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const parsed = (() => {
    const n = Number(ts);
    if (!isFinite(n) || !ts) return null;
    // Guess seconds vs milliseconds from magnitude, not string length — a
    // leading "-" on a pre-1970 seconds timestamp (e.g. "-1000000000") was
    // pushing the string past the 10-character threshold and getting the
    // value treated as milliseconds, landing the parsed date decades off.
    const ms = Math.abs(n) > 9999999999 ? n : n * 1000;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  })();

  const fromDate = (() => {
    const d = new Date(dt);
    return isNaN(d.getTime()) ? null : Math.floor(d.getTime() / 1000);
  })();

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="flex flex-col items-center gap-1 py-6 text-center">
          <p className="text-xs text-muted-foreground">Current Unix timestamp</p>
          <p className="font-mono text-3xl font-bold text-primary">{now}</p>
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Timestamp → Date</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5"><Label htmlFor="ts-unix">Unix timestamp</Label><Input id="ts-unix" value={ts} onChange={(e) => setTs(e.target.value)} className="font-mono" /></div>
            <Button size="sm" variant="outline" onClick={() => setTs(String(now))}>Use now</Button>
            {parsed && (
              <div className="space-y-2 rounded-xl bg-secondary/50 p-3 text-sm">
                <p className="font-medium text-primary">{relativeFromNow(parsed.getTime())}</p>
                <CopyRow label="Local" value={parsed.toLocaleString()} />
                <CopyRow label="UTC" value={parsed.toUTCString()} />
                <CopyRow label="ISO" value={parsed.toISOString()} />
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Date → Timestamp</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5"><Label htmlFor="ts-datetime">Date &amp; time</Label><Input id="ts-datetime" type="datetime-local" value={dt} onChange={(e) => setDt(e.target.value)} /></div>
            {fromDate !== null && (
              <div className="rounded-xl bg-secondary/50 p-3 text-sm">
                <p className="text-muted-foreground">Unix timestamp (seconds)</p>
                <CopyRow value={String(fromDate)} valueClassName="font-mono text-lg font-semibold" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
