"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { localDatetimeISO, downloadBlob } from "@/lib/utils";
import { Copy, Check, CalendarPlus } from "lucide-react";

function toICSDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function downloadICS(label: string, target: Date) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TechToolsCenter//Countdown Timer//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@techtoolscenter.com`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(target)}`,
    `SUMMARY:${(label || "Countdown").replace(/[\r\n]/g, " ")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  downloadBlob(new Blob([ics], { type: "text/calendar" }), `${(label || "countdown").replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`);
}

interface CountdownState {
  label: string;
  target: string; // ISO datetime-local value
}

function defaultTarget() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return localDatetimeISO(d).slice(0, 16);
}

function diff(target: Date, now: Date) {
  const ms = target.getTime() - now.getTime();
  const past = ms < 0;
  const abs = Math.abs(ms);
  const days = Math.floor(abs / 86400000);
  const hours = Math.floor((abs % 86400000) / 3600000);
  const minutes = Math.floor((abs % 3600000) / 60000);
  const seconds = Math.floor((abs % 60000) / 1000);
  return { past, days, hours, minutes, seconds };
}

export default function CountdownTimer() {
  const { value, set } = useLocalStorage<CountdownState>("uh:countdown", { label: "New Year", target: defaultTarget() });
  const [now, setNow] = useState(new Date());
  const { copied, copy } = useCopy();

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // A shared link's query params take priority over whatever was previously saved locally.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const label = params.get("label");
    const target = params.get("target");
    if (label && target && !isNaN(new Date(target).getTime())) {
      set({ label, target });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const targetDate = new Date(value.target);
  const valid = !isNaN(targetDate.getTime());
  const d = valid ? diff(targetDate, now) : null;

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}?label=${encodeURIComponent(value.label)}&target=${encodeURIComponent(value.target)}` : "";

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Card>
        <CardHeader><CardTitle>Set your countdown</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cd-label">Event name</Label>
            <Input id="cd-label" value={value.label} onChange={(e) => set({ ...value, label: e.target.value })} placeholder="e.g. Exam Day, Diwali, Launch" maxLength={60} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cd-target">Target date & time</Label>
            <Input id="cd-target" type="datetime-local" value={value.target} onChange={(e) => set({ ...value, target: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>{value.label || "Countdown"}</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          {d ? (
            <>
              <div className="grid grid-cols-4 gap-3 text-center">
                <Big value={d.days} label="days" />
                <Big value={d.hours} label="hours" />
                <Big value={d.minutes} label="min" />
                <Big value={d.seconds} label="sec" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                {d.past ? "This event has already passed" : "until this moment arrives"}
              </p>
            </>
          ) : (
            <p className="text-center text-muted-foreground">Pick a valid date and time above.</p>
          )}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => copy(shareUrl)} disabled={!shareUrl}>
              {copied ? <Check className="text-emerald-500" /> : <Copy />} Copy shareable link
            </Button>
            {valid && (
              <Button variant="outline" size="sm" onClick={() => downloadICS(value.label, targetDate)}>
                <CalendarPlus /> Add to calendar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Big({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl bg-secondary/60 p-3">
      <p className="text-3xl font-bold tabular-nums text-primary">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
