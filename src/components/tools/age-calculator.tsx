"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ActionBar } from "@/components/tools/action-bar";

interface AgeState {
  from: string;
  to: string;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function AgeCalculator() {
  const initial: AgeState = { from: "2000-01-01", to: todayISO() };
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<AgeState>("uh:age", initial);

  const result = useMemo(() => {
    const from = new Date(value.from);
    const to = new Date(value.to);
    if (isNaN(from.getTime()) || isNaN(to.getTime()) || to < from) return null;

    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();
    if (days < 0) {
      months -= 1;
      days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((to.getTime() - from.getTime()) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    // next birthday
    const next = new Date(to.getFullYear(), from.getMonth(), from.getDate());
    if (next < to) next.setFullYear(to.getFullYear() + 1);
    const daysToBirthday = Math.ceil((next.getTime() - to.getTime()) / 86400000);

    return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysToBirthday };
  }, [value]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Dates</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="age-from">Date of birth / start</Label>
            <Input id="age-from" type="date" value={value.from} onChange={(e) => set({ ...value, from: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="age-to">Age at / end date</Label>
            <Input id="age-to" type="date" value={value.to} onChange={(e) => set({ ...value, to: e.target.value })} />
          </div>
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Age</CardTitle></CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-5">
              <div className="flex items-end gap-3">
                <Big value={result.years} label="years" />
                <Big value={result.months} label="months" />
                <Big value={result.days} label="days" />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Stat label="Total months" value={result.totalMonths.toLocaleString()} />
                <Stat label="Total weeks" value={result.totalWeeks.toLocaleString()} />
                <Stat label="Total days" value={result.totalDays.toLocaleString()} />
                <Stat label="Total hours" value={result.totalHours.toLocaleString()} />
              </div>
              <div className="rounded-xl bg-primary/10 p-4 text-center text-sm font-medium text-primary">
                🎂 {result.daysToBirthday} days until the next birthday
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Please enter a valid date range.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Big({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="text-4xl font-bold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/60 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-semibold">{value}</p>
    </div>
  );
}
