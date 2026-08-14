"use client";

import { useMemo, useState } from "react";
import { History } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GenerationHistoryPanel } from "@/components/tools/generation-history-panel";

const MODIFIERS = ["", "tips", "life", "daily", "community", "love", "ideas", "trends", "2026", "official", "world", "pro", "inspo", "goals"];
const PREFIX = ["", "best", "my", "the", "insta", "top"];

function toTag(s: string) {
  return "#" + s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

export default function HashtagGenerator() {
  const [topic, setTopic] = useState("digital marketing");
  const { copied, copy } = useCopy();
  const { history, add, remove, clear } = useGenerationHistory("uh:history:hashtag-generator");

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
            <Label htmlFor="hashtag-topic">Topic or keywords</Label>
            <Input id="hashtag-topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. travel photography" />
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
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => copy(tags.join(" "))}>{copied ? "Copied!" : "Copy all"}</Button>
            <Button variant="outline" onClick={() => add(tags.join(" "), topic)}>
              <History className="size-4" /> Save to history
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>History</CardTitle></CardHeader>
        <CardContent>
          <GenerationHistoryPanel history={history} onRemove={remove} onClear={clear} emptyLabel="No saved hashtag sets yet — click “Save to history” to keep one." />
        </CardContent>
      </Card>
    </div>
  );
}
