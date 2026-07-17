"use client";

import { useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Purpose = "outreach" | "follow-up" | "application" | "apology" | "thank-you" | "meeting";

const templates: Record<Purpose, (d: Data) => { subject: string; body: string }> = {
  outreach: (d) => ({
    subject: `Quick idea for ${d.recipient || "your team"}`,
    body: `Hi ${d.recipient || "there"},\n\nI'm ${d.sender || "[Your name]"} from ${d.company || "[Company]"}. ${d.details || "I'd love to share how we can help."}\n\nWould you be open to a short call this week?\n\nBest regards,\n${d.sender || "[Your name]"}`,
  }),
  "follow-up": (d) => ({
    subject: `Following up${d.recipient ? `, ${d.recipient}` : ""}`,
    body: `Hi ${d.recipient || "there"},\n\nJust following up on my previous message. ${d.details || "I wanted to check if you had any thoughts."}\n\nHappy to answer any questions.\n\nThanks,\n${d.sender || "[Your name]"}`,
  }),
  application: (d) => ({
    subject: `Application — ${d.details || "[Role]"}`,
    body: `Dear ${d.recipient || "Hiring Manager"},\n\nI'm excited to apply for the ${d.details || "[role]"} position at ${d.company || "[Company]"}. ${d.sender ? `My name is ${d.sender}, and ` : ""}I believe my experience is a strong match.\n\nI've attached my resume and would welcome the chance to discuss further.\n\nSincerely,\n${d.sender || "[Your name]"}`,
  }),
  apology: (d) => ({
    subject: `Apologies${d.recipient ? `, ${d.recipient}` : ""}`,
    body: `Hi ${d.recipient || "there"},\n\nI'm sorry for ${d.details || "the inconvenience caused"}. I take full responsibility and am working to put it right.\n\nThank you for your patience and understanding.\n\nBest,\n${d.sender || "[Your name]"}`,
  }),
  "thank-you": (d) => ({
    subject: `Thank you${d.recipient ? `, ${d.recipient}` : ""}`,
    body: `Hi ${d.recipient || "there"},\n\nThank you so much for ${d.details || "your time and support"}. It genuinely means a lot.\n\nLooking forward to staying in touch.\n\nWarm regards,\n${d.sender || "[Your name]"}`,
  }),
  meeting: (d) => ({
    subject: `Meeting request — ${d.details || "quick chat"}`,
    body: `Hi ${d.recipient || "there"},\n\nI'd like to set up a meeting to discuss ${d.details || "our next steps"}. Could you share a couple of times that work for you this week?\n\nThanks,\n${d.sender || "[Your name]"}`,
  }),
};

interface Data { recipient: string; sender: string; company: string; details: string; }

export default function EmailGenerator() {
  const [purpose, setPurpose] = useState<Purpose>("outreach");
  const [data, setData] = useState<Data>({ recipient: "", sender: "", company: "", details: "" });
  const { copied, copy } = useCopy();
  const out = useMemo(() => templates[purpose](data), [purpose, data]);
  const full = `Subject: ${out.subject}\n\n${out.body}`;
  const set = (k: keyof Data, v: string) => setData((d) => ({ ...d, [k]: v }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label>Purpose</Label>
            <Select value={purpose} onChange={(e) => setPurpose(e.target.value as Purpose)}>
              {Object.keys(templates).map((p) => <option key={p} value={p} className="capitalize">{p.replace("-", " ")}</option>)}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Recipient</Label><Input value={data.recipient} onChange={(e) => set("recipient", e.target.value)} placeholder="Name" /></div>
            <div className="space-y-1.5"><Label>Your name</Label><Input value={data.sender} onChange={(e) => set("sender", e.target.value)} /></div>
          </div>
          <div className="space-y-1.5"><Label>Company</Label><Input value={data.company} onChange={(e) => set("company", e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Key details</Label><Textarea value={data.details} onChange={(e) => set("details", e.target.value)} placeholder="What is this email about?" /></div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Your email</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl bg-secondary/50 p-4">
            <p className="text-sm font-semibold">Subject: {out.subject}</p>
            <pre className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{out.body}</pre>
          </div>
          <Button onClick={() => copy(full)}>{copied ? "Copied!" : "Copy email"}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
