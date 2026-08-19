"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ActionBar } from "@/components/tools/action-bar";
import { localDateISO } from "@/lib/utils";

interface AgeState {
  from: string;
  to: string;
}

// `new Date("YYYY-MM-DD")` parses the string as UTC midnight, but every
// getter used below (getFullYear/getMonth/getDate/getDay) reads back in the
// browser's LOCAL time zone — so for anyone in a negative UTC offset (all of
// North & South America), the date silently reads back as the day before,
// throwing off every result: years/months/days, the weekday, and the
// milestone/next-birthday dates. Parsing the y/m/d directly into a local
// Date sidesteps the UTC round-trip entirely.
function parseLocalDate(iso: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return new Date(NaN);
  const [, y, m, d] = match;
  return new Date(Number(y), Number(m) - 1, Number(d));
}

// Calendar-day difference between two local Date objects, anchored to their
// y/m/d via Date.UTC — subtracting .getTime() directly would be off by an
// hour (and therefore a day, once floored/ceiled) for any range that crosses
// a daylight-saving transition, since local midnight isn't always 24h apart.
function daysBetween(a: Date, b: Date): number {
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((ub - ua) / 86400000);
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Ages people commonly track for practical reasons (voting/driving age,
// senior-citizen concessions, etc.) — shown only if still upcoming.
const MILESTONE_AGES = [13, 16, 18, 21, 25, 30, 40, 50, 60, 65, 75, 100];

export default function AgeCalculator() {
  const initial: AgeState = { from: "2000-01-01", to: localDateISO() };
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<AgeState>("uh:age", initial);

  const result = useMemo(() => {
    const from = parseLocalDate(value.from);
    const to = parseLocalDate(value.to);
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

    const totalDays = daysBetween(from, to);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    // next birthday
    const next = new Date(to.getFullYear(), from.getMonth(), from.getDate());
    if (next < to) next.setFullYear(to.getFullYear() + 1);
    const daysToBirthday = daysBetween(to, next);

    const weekday = WEEKDAYS[from.getDay()];

    const milestones = MILESTONE_AGES
      .filter((age) => age > years)
      .slice(0, 3)
      .map((age) => {
        const date = new Date(from.getFullYear() + age, from.getMonth(), from.getDate());
        const daysAway = daysBetween(to, date);
        return { age, date, daysAway };
      });

    return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysToBirthday, weekday, milestones };
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
              <p className="text-center text-sm text-muted-foreground">Born on a <span className="font-medium text-foreground">{result.weekday}</span></p>
              {result.milestones.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">Upcoming milestone birthdays</p>
                  <div className="space-y-1.5">
                    {result.milestones.map((m) => (
                      <div key={m.age} className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2 text-sm">
                        <span>{m.age}th birthday</span>
                        <span className="text-muted-foreground">{m.daysAway === 0 ? "Today!" : `in ${m.daysAway.toLocaleString()} days`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
