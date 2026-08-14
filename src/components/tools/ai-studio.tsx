"use client";

import { useMemo, useState } from "react";
import * as Icons from "lucide-react";
import { Loader2, Wand2, Copy, Check, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { GENERATORS, defaultInputs } from "@/lib/ai/generators";
import { PROVIDERS, getProvider } from "@/lib/ai/providers";
import type { Inputs } from "@/lib/ai/types";
import { showToast } from "@/components/ui/toaster";
import { downloadBlob, slugify } from "@/lib/utils";

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ?? Icons.Sparkles;
  return <Cmp className={className} />;
}

export default function AIStudio() {
  const [activeId, setActiveId] = useState(GENERATORS[0].id);
  const [providerId, setProviderId] = useState("local");
  const [inputsById, setInputsById] = useState<Record<string, Inputs>>(
    () => Object.fromEntries(GENERATORS.map((g) => [g.id, defaultInputs(g)])),
  );
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const { copied, copy } = useCopy();

  const active = useMemo(() => GENERATORS.find((g) => g.id === activeId)!, [activeId]);
  const inputs = inputsById[activeId];

  const setField = (name: string, val: string) =>
    setInputsById((prev) => ({ ...prev, [activeId]: { ...prev[activeId], [name]: val } }));

  const run = async () => {
    setRunning(true);
    try {
      const provider = getProvider(providerId);
      const result = await provider.run(active, inputs);
      setOutput(result);
    } catch {
      showToast("Couldn't generate this — try again", "error");
    } finally {
      setRunning(false);
    }
  };

  const selectGenerator = (id: string) => {
    setActiveId(id);
    setOutput("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      {/* Generator picker */}
      <aside className="space-y-1.5 lg:sticky lg:top-20 lg:h-fit">
        {GENERATORS.map((g) => (
          <button key={g.id} onClick={() => selectGenerator(g.id)}
            className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-sm transition-colors ${activeId === g.id ? "border-primary bg-primary/10 font-medium" : "border-border hover:bg-secondary"}`}>
            <Icon name={g.icon} className="size-4 shrink-0 text-primary" />
            <span className="truncate">{g.name.replace(" Generator", "")}</span>
          </button>
        ))}
      </aside>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Icon name={active.icon} className="size-4 text-primary" /> {active.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{active.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {PROVIDERS.length > 1 && (
              <div className="space-y-1.5">
                <Label htmlFor="ai-engine">Engine</Label>
                <Select id="ai-engine" value={providerId} onChange={(e) => setProviderId(e.target.value)}>
                  {PROVIDERS.map((p) => (
                    <option key={p.id} value={p.id} disabled={!p.available}>{p.label}</option>
                  ))}
                </Select>
              </div>
            )}
            {active.fields.map((f) => (
              <div key={f.name} className="space-y-1.5">
                <Label htmlFor={`ai-field-${f.name}`}>{f.label}</Label>
                {f.type === "textarea" ? (
                  <Textarea id={`ai-field-${f.name}`} value={inputs[f.name] ?? ""} placeholder={f.placeholder} onChange={(e) => setField(f.name, e.target.value)} />
                ) : f.type === "select" ? (
                  <Select id={`ai-field-${f.name}`} value={inputs[f.name] ?? ""} onChange={(e) => setField(f.name, e.target.value)}>
                    {f.options?.map((o) => <option key={o}>{o}</option>)}
                  </Select>
                ) : (
                  <Input id={`ai-field-${f.name}`} value={inputs[f.name] ?? ""} placeholder={f.placeholder} onChange={(e) => setField(f.name, e.target.value)} />
                )}
              </div>
            ))}
            <Button className="w-full" onClick={run} disabled={running}>
              {running ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />} Generate
            </Button>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader><CardTitle>Output</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {output ? (
              <pre className={`min-h-[280px] whitespace-pre-wrap rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed ${active.output === "code" ? "font-mono" : ""}`}>{output}</pre>
            ) : (
              <div className="grid min-h-[280px] place-items-center rounded-xl border border-dashed border-border text-center text-sm text-muted-foreground">
                Fill the fields and hit <span className="mx-1 font-medium">Generate</span>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => copy(output)} disabled={!output}>
                {copied ? <><Check className="size-4" /> Copied</> : <><Copy className="size-4" /> Copy</>}
              </Button>
              <Button
                variant="outline"
                disabled={!output}
                onClick={() => downloadBlob(new Blob([output], { type: "text/plain" }), `${slugify(active.name)}.txt`)}
              >
                <Download className="size-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
