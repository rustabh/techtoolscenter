"use client";

import { useCallback, useEffect, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";

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

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Options</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="count">How many: {count}</Label>
            <input id="count" type="range" min={1} max={50} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
          </div>
          <ActionBar onDownload={generate} downloadLabel="Generate" onCopy={() => copy(list.join("\n"))} copied={copied} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Generated UUIDs</CardTitle></CardHeader>
        <CardContent>
          <div className="max-h-72 space-y-2 overflow-auto">
            {list.map((id, i) => (
              <button key={i} onClick={() => copy(id)} className="block w-full truncate rounded-lg bg-secondary/50 px-3 py-2 text-left font-mono text-xs hover:bg-secondary" title="Click to copy">
                {id}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
