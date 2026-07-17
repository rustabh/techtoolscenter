"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Mode = "focus" | "short" | "long";
const DURATIONS: Record<Mode, number> = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };
const LABELS: Record<Mode, string> = { focus: "Focus", short: "Short break", long: "Long break" };

function beep() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 880; gain.gain.setValueAtTime(0.2, ctx.currentTime);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    osc.stop(ctx.currentTime + 0.6);
  } catch { /* audio unavailable */ }
}

export default function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>("focus");
  const [left, setLeft] = useState(DURATIONS.focus);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setLeft((l) => {
          if (l <= 1) {
            beep();
            setRunning(false);
            if (mode === "focus") setSessions((s) => s + 1);
            return 0;
          }
          return l - 1;
        });
      }, 1000);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running, mode]);

  useEffect(() => {
    const m = Math.floor(left / 60), s = left % 60;
    document.title = running ? `${m}:${String(s).padStart(2, "0")} — ${LABELS[mode]}` : "Pomodoro Timer | TechToolsCenter";
    return () => { document.title = "Pomodoro Timer | TechToolsCenter"; };
  }, [left, running, mode]);

  const switchMode = (m: Mode) => { setMode(m); setLeft(DURATIONS[m]); setRunning(false); };
  const mins = Math.floor(left / 60), secs = left % 60;
  const pct = 1 - left / DURATIONS[mode];

  return (
    <Card className="mx-auto max-w-md">
      <CardContent className="space-y-6 pt-6 text-center">
        <div className="flex justify-center gap-2">
          {(["focus", "short", "long"] as Mode[]).map((m) => (
            <Button key={m} size="sm" variant={mode === m ? "default" : "outline"} onClick={() => switchMode(m)}>{LABELS[m]}</Button>
          ))}
        </div>
        <div className="relative mx-auto grid size-56 place-items-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" className="fill-none stroke-secondary" strokeWidth="6" />
            <circle cx="50" cy="50" r="45" className="fill-none stroke-[hsl(var(--primary))]" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 45} strokeDashoffset={2 * Math.PI * 45 * (1 - pct)} style={{ transition: "stroke-dashoffset 1s linear" }} />
          </svg>
          <span className="font-mono text-5xl font-bold tabular-nums">{mins}:{String(secs).padStart(2, "0")}</span>
        </div>
        <div className="flex justify-center gap-2">
          <Button size="lg" onClick={() => setRunning((r) => !r)}>
            {running ? <><Pause /> Pause</> : <><Play /> Start</>}
          </Button>
          <Button size="lg" variant="outline" onClick={() => { setLeft(DURATIONS[mode]); setRunning(false); }} aria-label="Reset"><RotateCcw /></Button>
        </div>
        <p className="text-sm text-muted-foreground">Completed focus sessions: <span className="font-semibold text-foreground">{sessions}</span></p>
      </CardContent>
    </Card>
  );
}
