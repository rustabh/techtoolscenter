"use client";

import { useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BlogOutlineGenerator() {
  const [topic, setTopic] = useState("How to start a podcast");
  const { copied, copy } = useCopy();

  const outline = useMemo(() => {
    const t = topic.trim() || "Your topic";
    const lines = [
      `# ${t}`,
      ``,
      `## Introduction`,
      `- Hook: why ${t.toLowerCase()} matters right now`,
      `- What the reader will learn`,
      `- Quick overview of the steps`,
      ``,
      `## Background / What you need to know`,
      `- Key concepts and terminology`,
      `- Common mistakes to avoid`,
      ``,
      `## Step-by-step: ${t}`,
      `### Step 1 — Getting started`,
      `### Step 2 — Core setup`,
      `### Step 3 — Refining and improving`,
      `### Step 4 — Going live / launching`,
      ``,
      `## Tools & resources`,
      `- Recommended tools`,
      `- Helpful templates and checklists`,
      ``,
      `## Tips for success`,
      `- Best practices`,
      `- How to measure results`,
      ``,
      `## Frequently asked questions`,
      `- What is the biggest challenge with ${t.toLowerCase()}?`,
      `- How long does it take?`,
      `- How much does it cost?`,
      ``,
      `## Conclusion`,
      `- Recap of the main points`,
      `- Call to action / next steps`,
    ];
    return lines.join("\n");
  }, [topic]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Topic</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label htmlFor="blogoutline-topic">Blog title or topic</Label><Input id="blogoutline-topic" value={topic} onChange={(e) => setTopic(e.target.value)} /></div>
          <p className="text-sm text-muted-foreground">A complete, SEO-friendly outline is generated automatically as you type.</p>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Outline</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed">{outline}</pre>
          <Button onClick={() => copy(outline)}>{copied ? "Copied!" : "Copy outline"}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
