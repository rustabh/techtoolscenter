"use client";

import { useMemo, useState } from "react";
import { History } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GenerationHistoryPanel } from "@/components/tools/generation-history-panel";
import { downloadBlob } from "@/lib/utils";

export default function PromptGenerator() {
  const [role, setRole] = useState("an expert copywriter");
  const [task, setTask] = useState("write a product launch announcement");
  const [tone, setTone] = useState("professional");
  const [format, setFormat] = useState("Markdown");
  const [audience, setAudience] = useState("startup founders");
  const [constraints, setConstraints] = useState("Keep it under 200 words. Avoid jargon.");
  const { copied, copy } = useCopy();
  const { history, add, remove, clear } = useGenerationHistory("uh:history:prompt-generator");

  const prompt = useMemo(() => {
    // `null` means "omit this line entirely"; `""` means "keep this blank
    // line as a section separator" — they must stay distinguishable, unlike
    // a plain `condition && line` which collapses both cases to "".
    return [
      `You are ${role}.`,
      ``,
      `Your task: ${task}.`,
      audience ? `Target audience: ${audience}.` : null,
      `Tone: ${tone}.`,
      `Output format: ${format}.`,
      constraints ? `` : null,
      constraints ? `Constraints:\n${constraints.split("\n").map((c) => `- ${c}`).join("\n")}` : null,
      ``,
      `Think step by step, then produce only the final result.`,
    ].filter((l): l is string => l !== null).join("\n");
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
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => copy(prompt)}>{copied ? "Copied!" : "Copy prompt"}</Button>
            <Button variant="outline" onClick={() => downloadBlob(new Blob([prompt], { type: "text/plain" }), "prompt.txt")}>Download .txt</Button>
            <Button variant="outline" onClick={() => add(prompt, role)}>
              <History className="size-4" /> Save to history
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>History</CardTitle></CardHeader>
        <CardContent>
          <GenerationHistoryPanel history={history} onRemove={remove} onClear={clear} emptyLabel="No saved prompts yet — click “Save to history” to keep one." />
        </CardContent>
      </Card>
    </div>
  );
}
