"use client";

import { useMemo } from "react";
import { Check, Copy, Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { useCopy } from "@/hooks/use-copy";

const REFERENCE_CGPAS = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

type Mode = "cgpaToPercent" | "percentToCgpa" | "sgpa";
type Formula = "cbse" | "vtu" | "custom";

interface Subject {
  id: string;
  name: string;
  credits: string;
  grade: string;
}

interface State {
  mode: Mode;
  formula: Formula;
  multiplier: string;
  cgpa: string;
  percent: string;
  subjects: Subject[];
}

const initial: State = {
  mode: "cgpaToPercent",
  formula: "cbse",
  multiplier: "9.5",
  cgpa: "8.5",
  percent: "80.75",
  subjects: [
    { id: "1", name: "Subject 1", credits: "4", grade: "8" },
    { id: "2", name: "Subject 2", credits: "3", grade: "9" },
    { id: "3", name: "Subject 3", credits: "4", grade: "7" },
  ],
};

const MODES = [
  { id: "cgpaToPercent", label: "CGPA → %" },
  { id: "percentToCgpa", label: "% → CGPA" },
  { id: "sgpa", label: "SGPA/CGPA from grades" },
] as const;

const FORMULAS = [
  { id: "cbse", label: "CBSE (×9.5)" },
  { id: "vtu", label: "VTU ((CGPA−0.75)×10)" },
  { id: "custom", label: "Custom multiplier" },
] as const;

function formulaLabel(f: Formula) {
  return f === "cbse" ? "CBSE" : f === "vtu" ? "VTU" : "custom";
}

export default function CgpaCalculator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<State>("uh:cgpa", initial);
  const { copied, copy } = useCopy();

  const multiplier = value.formula === "custom" ? parseFloat(value.multiplier) || 9.5 : 9.5;

  const cgpaResult = useMemo(() => {
    const cgpa = parseFloat(value.cgpa) || 0;
    if (value.formula === "vtu") return (cgpa - 0.75) * 10;
    return cgpa * multiplier;
  }, [value.cgpa, value.formula, multiplier]);

  const percentResult = useMemo(() => {
    const pct = parseFloat(value.percent) || 0;
    if (value.formula === "vtu") return pct / 10 + 0.75;
    return pct / multiplier;
  }, [value.percent, value.formula, multiplier]);

  const sgpaResult = useMemo(() => {
    let totalCredits = 0;
    let totalPoints = 0;
    for (const s of value.subjects) {
      const c = parseFloat(s.credits) || 0;
      const g = parseFloat(s.grade) || 0;
      totalCredits += c;
      totalPoints += c * g;
    }
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }, [value.subjects]);

  const addSubject = () =>
    set({ ...value, subjects: [...value.subjects, { id: crypto.randomUUID(), name: `Subject ${value.subjects.length + 1}`, credits: "4", grade: "8" }] });
  const removeSubject = (id: string) => set({ ...value, subjects: value.subjects.filter((s) => s.id !== id) });
  const updateSubject = (id: string, patch: Partial<Subject>) =>
    set({ ...value, subjects: value.subjects.map((s) => (s.id === id ? { ...s, ...patch } : s)) });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => set({ ...value, mode: m.id })}
            className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors sm:text-sm ${value.mode === m.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {value.mode !== "sgpa" && (
        <Card>
          <CardHeader><CardTitle>Formula</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {FORMULAS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => set({ ...value, formula: f.id })}
                  className={`rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${value.formula === f.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {value.formula === "custom" && (
              <div className="max-w-[160px] space-y-1.5">
                <Label>Multiplier</Label>
                <Input type="number" step="0.1" value={value.multiplier} onChange={(e) => set({ ...value, multiplier: e.target.value })} />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {value.mode === "cgpaToPercent" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Enter your CGPA</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>CGPA (out of 10)</Label>
                <Input type="number" step="0.01" min="0" max="10" value={value.cgpa} onChange={(e) => set({ ...value, cgpa: e.target.value })} />
              </div>
              <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader><CardTitle>Percentage</CardTitle></CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold text-primary">{Math.min(100, Math.max(0, cgpaResult)).toFixed(2)}%</p>
              <p className="mt-2 text-xs text-muted-foreground">Based on the {formulaLabel(value.formula)} formula.</p>
              <Button variant="ghost" size="sm" className="mt-3" onClick={() => copy(Math.min(100, Math.max(0, cgpaResult)).toFixed(2))}>
                {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />} Copy result
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {value.mode === "percentToCgpa" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Enter your percentage</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Percentage</Label>
                <Input type="number" step="0.01" min="0" max="100" value={value.percent} onChange={(e) => set({ ...value, percent: e.target.value })} />
              </div>
              <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader><CardTitle>CGPA</CardTitle></CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold text-primary">{Math.min(10, Math.max(0, percentResult)).toFixed(2)}</p>
              <p className="mt-2 text-xs text-muted-foreground">Out of 10, using the {formulaLabel(value.formula)} formula.</p>
              <Button variant="ghost" size="sm" className="mt-3" onClick={() => copy(Math.min(10, Math.max(0, percentResult)).toFixed(2))}>
                {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />} Copy result
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {value.mode === "sgpa" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Subjects</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {value.subjects.map((s) => (
                <div key={s.id} className="grid grid-cols-[1fr_64px_64px_auto] items-center gap-2">
                  <Input value={s.name} onChange={(e) => updateSubject(s.id, { name: e.target.value })} placeholder="Subject" />
                  <Input type="number" value={s.credits} onChange={(e) => updateSubject(s.id, { credits: e.target.value })} placeholder="Credits" />
                  <Input type="number" min="0" max="10" value={s.grade} onChange={(e) => updateSubject(s.id, { grade: e.target.value })} placeholder="Grade pt" />
                  <Button variant="ghost" size="icon" onClick={() => removeSubject(s.id)} aria-label="Remove subject">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addSubject}>
                <Plus className="size-4" /> Add subject
              </Button>
              <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader><CardTitle>SGPA / CGPA</CardTitle></CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold text-primary">{sgpaResult.toFixed(2)}</p>
              <p className="mt-2 text-xs text-muted-foreground">Credit-weighted average across {value.subjects.length} subjects.</p>
              <Button variant="ghost" size="sm" className="mt-3" onClick={() => copy(sgpaResult.toFixed(2))}>
                {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />} Copy result
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {value.mode !== "sgpa" && (
        <Card>
          <CardHeader><CardTitle>Quick reference: CGPA to percentage</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="py-2 pr-4 font-medium">CGPA</th>
                    <th className="py-2 pr-4 font-medium">CBSE (×9.5)</th>
                    <th className="py-2 font-medium">VTU ((CGPA−0.75)×10)</th>
                  </tr>
                </thead>
                <tbody>
                  {REFERENCE_CGPAS.map((c) => (
                    <tr key={c} className="border-b border-border/50 last:border-0">
                      <td className="py-2 pr-4 font-medium">{c.toFixed(1)}</td>
                      <td className="py-2 pr-4 text-muted-foreground">{(c * 9.5).toFixed(2)}%</td>
                      <td className="py-2 text-muted-foreground">{((c - 0.75) * 10).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">A quick lookup for common CGPA values — enter your exact CGPA above for a precise conversion.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
