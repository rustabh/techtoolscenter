"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Settings2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { showToast } from "@/components/ui/toaster";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { localDateISO } from "@/lib/utils";

type Mode = "focus" | "short" | "long";
const DEFAULT_DURATIONS: Record<Mode, number> = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };
const LABELS: Record<Mode, string> = { focus: "Focus", short: "Short break", long: "Long break" };
const MIN_MINUTES = 1;
const MAX_MINUTES = 180;

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
  const [left, setLeft] = useState(DEFAULT_DURATIONS.focus);
  const [running, setRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  // Custom durations per mode, in seconds — falls back to the classic 25/5/15 split.
  const { value: durations, set: setDurations } = useLocalStorage<Record<Mode, number>>("uh:pomodoro-durations", DEFAULT_DURATIONS);
  // Keyed by local date (YYYY-MM-DD) -> completed focus-session count that day.
  // Plain component state would lose the count on every page reload/tab close,
  // which defeats the point of tracking sessions at all.
  const { value: history, set: setHistory } = useLocalStorage<Record<string, number>>("uh:pomodoro-history", {});
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const runningRef = useRef(running);
  runningRef.current = running;

  // Keeps the visible countdown in sync with duration edits (including the
  // one-time sync when a saved custom duration hydrates from localStorage) —
  // but only while idle, so it never yanks time off a running session. Reads
  // `running` via a ref rather than as a dep, so pausing (running: true →
  // false) doesn't itself re-trigger this and wipe the paused progress.
  useEffect(() => {
    if (!runningRef.current) setLeft(durations[mode]);
  }, [durations, mode]);

  const today = localDateISO();
  const sessions = history[today] ?? 0;
  const totalSessions = Object.values(history).reduce((sum, n) => sum + n, 0);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setLeft((l) => {
          if (l <= 1) {
            beep();
            setRunning(false);
            if (mode === "focus") {
              setHistory((prev) => ({ ...prev, [today]: (prev[today] ?? 0) + 1 }));
            }
            showToast(mode === "focus" ? "Focus session complete — take a break!" : "Break's over — back to focus.", "info");
            return 0;
          }
          return l - 1;
        });
      }, 1000);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running, mode, setHistory, today]);

  useEffect(() => {
    const m = Math.floor(left / 60), s = left % 60;
    document.title = running ? `${m}:${String(s).padStart(2, "0")} — ${LABELS[mode]}` : "Pomodoro Timer | TechToolsCenter";
    return () => { document.title = "Pomodoro Timer | TechToolsCenter"; };
  }, [left, running, mode]);

  const switchMode = (m: Mode) => { setMode(m); setLeft(durations[m]); setRunning(false); };

  // Guards against re-triggering the completion beep/toast/session-count when
  // Start is pressed again after a phase already finished at 0:00.
  const toggleRunning = useCallback(() => {
    setRunning((r) => {
      if (!r && left <= 0) { setLeft(durations[mode]); return true; }
      return !r;
    });
  }, [left, mode, durations]);

  // Spacebar starts/pauses — the standard shortcut for timer apps.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") return;
      if (e.code === "Space") {
        e.preventDefault();
        toggleRunning();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleRunning]);
  const mins = Math.floor(left / 60), secs = left % 60;
  const pct = 1 - left / durations[mode];

  const setDurationMinutes = (m: Mode, minutes: number) => {
    const clamped = Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, minutes || MIN_MINUTES));
    setDurations((prev) => ({ ...prev, [m]: clamped * 60 }));
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardContent className="space-y-6 pt-6 text-center">
        <div className="flex items-center justify-center gap-2">
          {(["focus", "short", "long"] as Mode[]).map((m) => (
            <Button key={m} size="sm" variant={mode === m ? "default" : "outline"} onClick={() => switchMode(m)}>{LABELS[m]}</Button>
          ))}
          <Button size="sm" variant="ghost" aria-label="Duration settings" title="Customize durations" onClick={() => setShowSettings((s) => !s)}>
            <Settings2 className="size-4" />
          </Button>
        </div>
        {showSettings && (
          <div className="grid grid-cols-3 gap-3 rounded-xl border border-border p-3 text-left">
            {(["focus", "short", "long"] as Mode[]).map((m) => (
              <div key={m} className="space-y-1">
                <Label htmlFor={`pomo-dur-${m}`} className="text-xs">{LABELS[m]} (min)</Label>
                <input
                  id={`pomo-dur-${m}`}
                  type="number"
                  min={MIN_MINUTES}
                  max={MAX_MINUTES}
                  value={Math.round(durations[m] / 60)}
                  onChange={(e) => setDurationMinutes(m, Number(e.target.value))}
                  className="h-9 w-full rounded-lg border border-input bg-background px-2 text-center text-sm"
                />
              </div>
            ))}
          </div>
        )}
        <div className="relative mx-auto grid size-56 place-items-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" className="fill-none stroke-secondary" strokeWidth="6" />
            <circle cx="50" cy="50" r="45" className="fill-none stroke-[hsl(var(--primary))]" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 45} strokeDashoffset={2 * Math.PI * 45 * (1 - pct)} style={{ transition: "stroke-dashoffset 1s linear" }} />
          </svg>
          <span className="font-mono text-5xl font-bold tabular-nums">{mins}:{String(secs).padStart(2, "0")}</span>
        </div>
        <div className="flex justify-center gap-2">
          <Button size="lg" onClick={toggleRunning} title="Press Space to start/pause">
            {running ? <><Pause /> Pause</> : <><Play /> Start</>}
          </Button>
          <Button size="lg" variant="outline" onClick={() => { setLeft(durations[mode]); setRunning(false); }} aria-label="Reset"><RotateCcw /></Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Focus sessions today: <span className="font-semibold text-foreground">{sessions}</span>
          {totalSessions > sessions && (
            <> · All-time: <span className="font-semibold text-foreground">{totalSessions}</span></>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
