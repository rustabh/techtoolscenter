"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PASSAGES = [
  "The quick brown fox jumps over the lazy dog while the sun sets behind the distant mountains.",
  "Typing quickly and accurately is a skill that improves with regular practice and focused attention.",
  "A good password is long, unique for every account, and never reused across different websites.",
  "India's railway network is one of the largest in the world, connecting thousands of towns and cities.",
  "Great design is not just what it looks like — great design is how it works for the people who use it.",
  "The best way to predict the future is to build it, one small and deliberate step at a time.",
  "Reading a little every day compounds into real knowledge over months and years of consistent effort.",
  "Free tools should respect your privacy, work quickly, and never hold your own data hostage.",
];

function pickPassage(exclude?: string) {
  const pool = exclude ? PASSAGES.filter((p) => p !== exclude) : PASSAGES;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function TypingSpeedTest() {
  const [passage, setPassage] = useState(() => pickPassage());
  const [input, setInput] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!startedAt || finishedAt) return;
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, [startedAt, finishedAt]);

  const restart = () => {
    setPassage(pickPassage(passage));
    setInput("");
    setStartedAt(null);
    setFinishedAt(null);
    inputRef.current?.focus();
  };

  const onChange = (value: string) => {
    if (finishedAt) return;
    if (!startedAt && value.length > 0) setStartedAt(Date.now());
    const clamped = value.slice(0, passage.length);
    setInput(clamped);
    if (clamped.length === passage.length) setFinishedAt(Date.now());
  };

  const elapsedMs = (finishedAt ?? now) - (startedAt ?? now);
  const elapsedMin = Math.max(elapsedMs / 60000, 1 / 60000);

  const stats = useMemo(() => {
    let correct = 0;
    for (let i = 0; i < input.length; i++) if (input[i] === passage[i]) correct++;
    const wpm = startedAt ? Math.round((correct / 5) / elapsedMin) : 0;
    const accuracy = input.length > 0 ? Math.round((correct / input.length) * 100) : 100;
    return { wpm, accuracy, correct };
  }, [input, passage, startedAt, elapsedMin]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <CardHeader><CardTitle>Type this passage</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="select-none rounded-xl border border-border bg-secondary/30 p-4 font-mono text-lg leading-relaxed">
            {passage.split("").map((ch, i) => {
              const typed = input[i];
              const cls =
                typed === undefined ? "text-muted-foreground"
                : typed === ch ? "text-emerald-500"
                : "bg-destructive/20 text-destructive";
              return <span key={i} className={cls}>{ch}</span>;
            })}
          </p>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => onChange(e.target.value)}
            disabled={!!finishedAt}
            aria-label="Type the passage above"
            placeholder="Start typing here…"
            className="min-h-[100px] w-full rounded-xl border border-input bg-background p-3.5 font-mono text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          />
          <div className="grid grid-cols-3 gap-3 text-center">
            <Stat label="WPM" value={stats.wpm} />
            <Stat label="Accuracy" value={`${stats.accuracy}%`} />
            <Stat label="Time" value={`${(elapsedMs / 1000).toFixed(1)}s`} />
          </div>
          {finishedAt && (
            <div className="rounded-xl bg-primary/10 p-4 text-center text-sm font-medium text-primary">
              🎉 Done — {stats.wpm} WPM at {stats.accuracy}% accuracy
            </div>
          )}
          <Button variant="outline" onClick={restart}><RotateCcw /> New passage</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-secondary/60 p-3">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
