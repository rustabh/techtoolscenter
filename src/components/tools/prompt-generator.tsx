"use client";

import { useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function PromptGenerator() {
  const [role, setRole] = useState("an expert copywriter");
  const [task, setTask] = useState("write a product launch announcement");
  const [tone, setTone] = useState("professional");
  const [format, setFormat] = useState("Markdown");
  const [audience, setAudience] = useState("startup founders");
  const [constraints, setConstraints] = useState("Keep it under 200 words. Avoid jargon.");
  const { copied, copy } = useCopy();

  const prompt = useMemo(() => {
    return [
      `You are ${role}.`,
      ``,
      `Your task: ${task}.`,
      audience && `Target audience: ${audience}.`,
      `Tone: ${tone}.`,
      `Output format: ${format}.`,
      constraints && ``,
      constraints && `Constraints:\n${constraints.split("\n").map((c) => `- ${c}`).join("\n")}`,
      ``,
      `Think step by step, then produce only the final result.`,
    ].filter((l): l is string => typeof l === "string" && l !== "").join("\n");
  }, [role, task, tone, format, audience, constraints]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Describe your prompt</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Role (act as…)</Label><Input value={role} onChange={(e) => setRole(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Task</Label><Textarea value={task} onChange={(e) => setTask(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Audience</Label><Input value={audience} onChange={(e) => setAudience(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Tone</Label>
              <Select value={tone} onChange={(e) => setTone(e.target.value)}>
                {["professional", "friendly", "persuasive", "casual", "formal", "playful", "authoritative"].map((t) => <option key={t}>{t}</option>)}
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Format</Label>
              <Select value={format} onChange={(e) => setFormat(e.target.value)}>
                {["Markdown", "Plain text", "Bullet list", "JSON", "Table", "Numbered steps"].map((t) => <option key={t}>{t}</option>)}
              </Select>
            </div>
          </div>
          <div className="space-y-1.5"><Label>Constraints (one per line)</Label><Textarea value={constraints} onChange={(e) => setConstraints(e.target.value)} /></div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Generated prompt</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <pre className="min-h-[280px] whitespace-pre-wrap rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed">{prompt}</pre>
          <Button onClick={() => copy(prompt)}>{copied ? "Copied!" : "Copy prompt"}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
