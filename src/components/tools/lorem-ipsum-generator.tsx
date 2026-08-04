"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { GenerationHistoryPanel } from "@/components/tools/generation-history-panel";
import { downloadBlob } from "@/lib/utils";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

function rand(n: number) {
  return Math.floor(Math.random() * n);
}
function sentence() {
  const len = 8 + rand(8);
  const words = Array.from({ length: len }, () => WORDS[rand(WORDS.length)]);
  const s = words.join(" ");
  return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}
function paragraph() {
  return Array.from({ length: 4 + rand(3) }, sentence).join(" ");
}

type Unit = "paragraphs" | "sentences" | "words";

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<Unit>("paragraphs");
  const [startClassic, setStartClassic] = useState(true);
  const [seed, setSeed] = useState(0);
  const { copied, copy } = useCopy();
  const { history, add, remove, clear } = useGenerationHistory("uh:history:lorem-ipsum-generator");

  const text = useMemo(() => {
    void seed;
    let out = "";
    if (unit === "paragraphs") out = Array.from({ length: count }, paragraph).join("\n\n");
    else if (unit === "sentences") out = Array.from({ length: count }, sentence).join(" ");
    else out = Array.from({ length: count }, () => WORDS[rand(WORDS.length)]).join(" ");
    if (startClassic) {
      const opener = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
      out = opener + out.charAt(0).toLowerCase() + out.slice(1);
    }
    return out;
  }, [count, unit, startClassic, seed]);

  const regenerate = useCallback(() => setSeed((s) => s + 1), []);

  // Only an explicit regenerate is worth a history entry — the text that's
  // already on screen from adjusting count/unit isn't something the user
  // asked to save, so this only fires on a real `seed` bump, and skips the
  // very first mount (seed start at 0, no regenerate happened yet).
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    add(text, `${count} ${unit}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  // "R" or Ctrl/Cmd+Enter regenerates without reaching for the mouse.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key.toLowerCase() === "r" || ((e.ctrlKey || e.metaKey) && e.key === "Enter")) {
        e.preventDefault();
        regenerate();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [regenerate]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Options</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Amount: {count}</Label>
            <input type="range" min={1} max={20} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
          </div>
          <div className="flex flex-wrap gap-2">
            {(["paragraphs", "sentences", "words"] as Unit[]).map((u) => (
              <Button key={u} size="sm" variant={unit === u ? "default" : "outline"} onClick={() => setUnit(u)} className="capitalize">{u}</Button>
            ))}
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={startClassic} onChange={(e) => setStartClassic(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
            Start with “Lorem ipsum dolor sit amet”
          </label>
          <Button variant="outline" size="sm" onClick={regenerate} title="Press R to regenerate">
            <RefreshCw className="size-4" /> Regenerate
          </Button>
          <ActionBar
            onCopy={() => copy(text)}
            copied={copied}
            onDownload={() => downloadBlob(new Blob([text], { type: "text/plain" }), "lorem-ipsum.txt")}
            downloadLabel="Download .txt"
          />
        </CardContent>
      </Card>
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div aria-live="polite" className="max-h-96 space-y-3 overflow-auto whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{text}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>History</CardTitle></CardHeader>
          <CardContent>
            <GenerationHistoryPanel history={history} onRemove={remove} onClear={clear} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
