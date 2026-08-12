"use client";

import { useMemo } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Note { id: string; title: string; body: string; }
interface State { notes: Note[]; active: string; }

function seed(): State {
  const id = "n1";
  return { notes: [{ id, title: "My first note", body: "Start typing… your notes save automatically." }], active: id };
}

export default function QuickNotes() {
  const { value, set, saveError } = useLocalStorage<State>("uh:notes", seed());
  const active = value.notes.find((n) => n.id === value.active) ?? value.notes[0];

  const stats = useMemo(() => {
    const words = active?.body.trim() ? active.body.trim().split(/\s+/).length : 0;
    return { words, chars: active?.body.length ?? 0 };
  }, [active]);

  const add = () => {
    const id = Math.random().toString(36).slice(2);
    set({ notes: [{ id, title: "Untitled", body: "" }, ...value.notes], active: id });
  };
  const update = (patch: Partial<Note>) =>
    set({ ...value, notes: value.notes.map((n) => (n.id === active.id ? { ...n, ...patch } : n)) });
  const remove = (id: string) => {
    const notes = value.notes.filter((n) => n.id !== id);
    set({ notes: notes.length ? notes : seed().notes, active: notes[0]?.id ?? seed().active });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <Card>
        <CardContent className="space-y-2 pt-6">
          <Button className="w-full" onClick={add}><Plus /> New note</Button>
          <div className="space-y-1">
            {value.notes.map((n) => (
              <button key={n.id} onClick={() => set({ ...value, active: n.id })}
                className={cn("flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm", n.id === active?.id ? "bg-secondary" : "hover:bg-secondary/60")}>
                <span className="truncate">{n.title || "Untitled"}</span>
                <Trash2 className="size-3.5 shrink-0 text-muted-foreground hover:text-destructive" onClick={(e) => { e.stopPropagation(); remove(n.id); }} />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-3 pt-6">
          <Input value={active?.title ?? ""} onChange={(e) => update({ title: e.target.value })} placeholder="Note title" className="text-lg font-semibold" />
          <Textarea value={active?.body ?? ""} onChange={(e) => update({ body: e.target.value })} placeholder="Start writing…" className="min-h-[340px]" />
          <p className={cn("text-xs", saveError ? "font-medium text-destructive" : "text-muted-foreground")}>
            {stats.words} words · {stats.chars} characters ·{" "}
            {saveError ? "couldn't save — browser storage is full" : "saved locally"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
