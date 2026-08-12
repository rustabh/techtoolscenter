"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { GenerationHistoryPanel } from "@/components/tools/generation-history-panel";
import { showToast } from "@/components/ui/toaster";
import { downloadBlob } from "@/lib/utils";

function uuid() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map((x) => x.toString(16).padStart(2, "0"));
  return `${h.slice(0, 4).join("")}-${h.slice(4, 6).join("")}-${h.slice(6, 8).join("")}-${h.slice(8, 10).join("")}-${h.slice(10, 16).join("")}`;
}

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [list, setList] = useState<string[]>([]);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const { copied, copy } = useCopy();
  const { history, add, remove, clear } = useGenerationHistory("uh:history:uuid-generator");

  // list always holds standard lowercase-with-hyphens v4 UUIDs; formatting
  // (case, hyphens) is applied on display/copy/download so history entries
  // stay in a single canonical form regardless of the current toggles.
  const format = useCallback(
    (id: string) => {
      let out = hyphens ? id : id.replace(/-/g, "");
      if (uppercase) out = out.toUpperCase();
      return out;
    },
    [uppercase, hyphens]
  );

  const generateSilently = useCallback(() => {
    const out = Array.from({ length: count }, () => uuid());
    setList(out);
    return out;
  }, [count]);

  // Only an explicit regenerate (button/keyboard shortcut) is worth a history
  // entry — the automatic batch on page load isn't something the user asked
  // to save.
  const generate = useCallback(() => {
    const out = generateSilently();
    add(out.join("\n"), `${out.length} UUID${out.length === 1 ? "" : "s"}`);
  }, [generateSilently, add]);

  useEffect(() => { generateSilently(); }, [generateSilently]);

  // "R" or Ctrl/Cmd+Enter regenerates without needing to reach for the mouse.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key.toLowerCase() === "r" || ((e.ctrlKey || e.metaKey) && e.key === "Enter")) {
        e.preventDefault();
        generate();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [generate]);

  const copyOne = async (id: string) => {
    if (await copy(format(id))) showToast("UUID copied");
  };

  const restore = (value: string) => setList(value.split("\n").filter(Boolean));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Options</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="count">How many: {count}</Label>
            <input id="count" type="range" min={1} max={50} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
          </div>
          <Button size="sm" variant="outline" onClick={generate} title="Press R to regenerate">
            <RefreshCw className="size-4" /> Generate new
          </Button>
          <div className="flex flex-wrap gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
              Uppercase
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
              Include hyphens
            </label>
          </div>
          <ActionBar
            onCopy={() => copy(list.map(format).join("\n"))}
            copied={copied}
            onDownload={() => downloadBlob(new Blob([list.map(format).join("\n")], { type: "text/plain" }), "uuids.txt")}
            downloadLabel="Download .txt"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Generated UUIDs</CardTitle></CardHeader>
        <CardContent>
          {list.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">No UUIDs yet — press &ldquo;Generate new&rdquo; above.</p>
          ) : (
            <div className="max-h-72 space-y-2 overflow-auto">
              {list.map((id, i) => (
                <button key={i} onClick={() => copyOne(id)} aria-label={`Copy UUID ${format(id)}`}
                  className="block w-full truncate rounded-lg bg-secondary/50 px-3 py-2 text-left font-mono text-xs transition-colors hover:bg-secondary" title="Click to copy">
                  {format(id)}
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>History</CardTitle></CardHeader>
        <CardContent>
          <GenerationHistoryPanel history={history} onRemove={remove} onClear={clear} onRestore={restore} emptyLabel="No past batches yet — generate a batch to start building history." />
        </CardContent>
      </Card>
    </div>
  );
}
