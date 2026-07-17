"use client";

import { useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MODIFIERS = ["", "tips", "life", "daily", "community", "love", "ideas", "trends", "2026", "official", "world", "pro", "inspo", "goals"];
const PREFIX = ["", "best", "my", "the", "insta", "top"];

function toTag(s: string) {
  return "#" + s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

export default function HashtagGenerator() {
  const [topic, setTopic] = useState("digital marketing");
  const { copied, copy } = useCopy();

  const tags = useMemo(() => {
    const words = topic.split(/[,\s]+/).map((w) => w.trim()).filter(Boolean);
    const set = new Set<string>();
    words.forEach((w) => set.add(toTag(w)));
    if (words.length > 1) set.add(toTag(words.join("")));
    words.forEach((w) => {
      MODIFIERS.forEach((m) => m && set.add(toTag(w + m)));
      PREFIX.forEach((p) => p && set.add(toTag(p + w)));
    });
    return [...set].filter((t) => t.length > 2).slice(0, 30);
  }, [topic]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-1.5">
            <Label>Topic or keywords</Label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. travel photography" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>{tags.length} hashtags</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button key={t} onClick={() => copy(t)} className="rounded-full bg-secondary px-3 py-1 text-sm hover:bg-primary hover:text-primary-foreground">{t}</button>
            ))}
          </div>
          <Button onClick={() => copy(tags.join(" "))}>{copied ? "Copied!" : "Copy all"}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
