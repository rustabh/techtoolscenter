"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
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
  const { copied, copy } = useCopy();

  const generate = useCallback(() => {
    setList(Array.from({ length: count }, () => uuid()));
  }, [count]);

  useEffect(() => generate(), [generate]);

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
    if (await copy(id)) showToast("UUID copied");
  };

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
          <ActionBar
            onCopy={() => copy(list.join("\n"))}
            copied={copied}
            onDownload={() => downloadBlob(new Blob([list.join("\n")], { type: "text/plain" }), "uuids.txt")}
            downloadLabel="Download .txt"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Generated UUIDs</CardTitle></CardHeader>
        <CardContent>
          {list.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">No UUIDs yet — press "Generate new" above.</p>
          ) : (
            <div className="max-h-72 space-y-2 overflow-auto">
              {list.map((id, i) => (
                <button key={i} onClick={() => copyOne(id)} aria-label={`Copy UUID ${id}`}
                  className="block w-full truncate rounded-lg bg-secondary/50 px-3 py-2 text-left font-mono text-xs transition-colors hover:bg-secondary" title="Click to copy">
                  {id}
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
