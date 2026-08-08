"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { localDatetimeISO } from "@/lib/utils";

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
    const ms = ts.trim().length > 10 ? n : n * 1000;
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
            <div className="space-y-1.5"><Label>Unix timestamp</Label><Input value={ts} onChange={(e) => setTs(e.target.value)} className="font-mono" /></div>
            <Button size="sm" variant="outline" onClick={() => setTs(String(now))}>Use now</Button>
            {parsed && (
              <div className="space-y-2 rounded-xl bg-secondary/50 p-3 text-sm">
                <p><span className="text-muted-foreground">Local: </span>{parsed.toLocaleString()}</p>
                <p><span className="text-muted-foreground">UTC: </span>{parsed.toUTCString()}</p>
                <p><span className="text-muted-foreground">ISO: </span>{parsed.toISOString()}</p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Date → Timestamp</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5"><Label>Date &amp; time</Label><Input type="datetime-local" value={dt} onChange={(e) => setDt(e.target.value)} /></div>
            {fromDate !== null && (
              <div className="rounded-xl bg-secondary/50 p-3 text-sm">
                <p className="text-muted-foreground">Unix timestamp (seconds)</p>
                <p className="font-mono text-lg font-semibold">{fromDate}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
