"use client";

import { useCallback, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GenerationHistoryPanel } from "@/components/tools/generation-history-panel";

const SAMPLE_NAMES = ["Aarav", "Vivaan", "Ananya", "Diya", "Ishaan", "Kabir", "Myra", "Reyansh", "Saanvi", "Vihaan", "Zara", "Arjun"];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function splitIntoTeams(names: string[], teamCount: number): string[][] {
  const shuffled = shuffle(names);
  const teams: string[][] = Array.from({ length: teamCount }, () => []);
  shuffled.forEach((name, i) => teams[i % teamCount].push(name));
  return teams;
}

function formatTeams(teams: string[][]): string {
  return teams.map((t, i) => `Team ${i + 1}: ${t.join(", ")}`).join("\n");
}

export default function RandomTeamGenerator() {
  const [namesInput, setNamesInput] = useState("");
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][]>([]);
  const { copied, copy } = useCopy();
  const { history, add, remove, clear } = useGenerationHistory("uh:history:random-team-generator");

  const names = namesInput.split("\n").map((n) => n.trim()).filter(Boolean);

  const generate = useCallback(() => {
    if (names.length < 2) return;
    const count = Math.min(teamCount, names.length);
    const result = splitIntoTeams(names, count);
    setTeams(result);
    add(formatTeams(result), `${names.length} people · ${count} teams`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namesInput, teamCount, add]);

  const loadSample = () => setNamesInput(SAMPLE_NAMES.join("\n"));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Names</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="names">One name per line</Label>
            <Textarea
              id="names"
              className="min-h-[220px]"
              value={namesInput}
              onChange={(e) => setNamesInput(e.target.value)}
              placeholder={"Aarav\nDiya\nIshaan\nMyra"}
            />
            <p className="text-xs text-muted-foreground">{names.length} name{names.length === 1 ? "" : "s"} entered</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="team-count">Number of teams</Label>
            <Input id="team-count" type="number" min={2} max={Math.max(2, names.length)} value={teamCount} onChange={(e) => setTeamCount(Math.max(2, parseInt(e.target.value) || 2))} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={generate} disabled={names.length < 2}>Split into teams</Button>
            <Button variant="outline" onClick={loadSample}>Load sample names</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Teams</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {teams.length === 0 ? (
            <p className="text-sm text-muted-foreground">Add at least 2 names and press split…</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {teams.map((team, i) => (
                <div key={i} className="rounded-xl border border-border p-3">
                  <p className="mb-2 text-sm font-semibold">Team {i + 1}</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {team.map((name, j) => <li key={j}>{name}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {teams.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => copy(formatTeams(teams))}>{copied ? "Copied!" : "Copy teams"}</Button>
              <Button variant="outline" size="sm" onClick={generate}>Reshuffle</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>History</CardTitle></CardHeader>
        <CardContent>
          <GenerationHistoryPanel history={history} onRemove={remove} onClear={clear} />
        </CardContent>
      </Card>
    </div>
  );
}
