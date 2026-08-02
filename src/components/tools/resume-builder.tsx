"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { showToast } from "@/components/ui/toaster";

interface Entry { id: string; title: string; subtitle: string; date: string; detail: string; }
interface ResumeState {
  name: string; role: string; email: string; phone: string; location: string; website: string;
  summary: string;
  experience: Entry[];
  education: Entry[];
  skills: string;
}

const entry = (): Entry => ({ id: Math.random().toString(36).slice(2), title: "", subtitle: "", date: "", detail: "" });

function initial(): ResumeState {
  return {
    name: "Alex Doe", role: "Full-Stack Developer",
    email: "alex@email.com", phone: "+1 555 0100", location: "Remote", website: "alexdoe.dev",
    summary: "Product-minded engineer with 5+ years building performant web applications.",
    experience: [{ id: "1", title: "Senior Developer", subtitle: "Acme Inc.", date: "2021 — Present", detail: "Led the migration to Next.js, improving load times by 40%." }],
    education: [{ id: "2", title: "B.Sc. Computer Science", subtitle: "State University", date: "2015 — 2019", detail: "Graduated with honours." }],
    skills: "TypeScript, React, Next.js, Node.js, PostgreSQL, Tailwind CSS",
  };
}

export default function ResumeBuilder() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<ResumeState>("uh:resume", initial());
  const [exporting, setExporting] = useState(false);
  const patch = (p: Partial<ResumeState>) => set({ ...value, ...p });
  const patchEntry = (key: "experience" | "education", id: string, p: Partial<Entry>) =>
    set({ ...value, [key]: value[key].map((e) => (e.id === id ? { ...e, ...p } : e)) });

  const downloadPdf = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      await generatePdf();
      showToast("Resume PDF downloaded");
    } catch {
      showToast("Couldn't generate the PDF — try again", "error");
    } finally {
      setExporting(false);
    }
  };

  const generatePdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(22); doc.setTextColor(20); doc.text(value.name, 14, y); y += 7;
    doc.setFontSize(12); doc.setTextColor(79, 70, 229); doc.text(value.role, 14, y); y += 7;
    doc.setFontSize(9); doc.setTextColor(90);
    doc.text([value.email, value.phone, value.location, value.website].filter(Boolean).join("  ·  "), 14, y); y += 8;
    doc.setDrawColor(220); doc.line(14, y, 196, y); y += 8;

    const section = (title: string) => { doc.setFontSize(12); doc.setTextColor(79, 70, 229); doc.text(title.toUpperCase(), 14, y); y += 6; doc.setTextColor(40); };
    const wrap = (text: string, size = 9) => {
      doc.setFontSize(size);
      const lines = doc.splitTextToSize(text, 182);
      doc.text(lines, 14, y); y += lines.length * 5;
    };

    section("Summary"); wrap(value.summary); y += 4;
    section("Experience");
    value.experience.forEach((e) => {
      doc.setFontSize(10); doc.setTextColor(20); doc.text(`${e.title} — ${e.subtitle}`, 14, y);
      doc.setTextColor(120); doc.text(e.date, 196, y, { align: "right" }); y += 5;
      doc.setTextColor(70); wrap(e.detail); y += 3;
    });
    y += 2; section("Education");
    value.education.forEach((e) => {
      doc.setFontSize(10); doc.setTextColor(20); doc.text(`${e.title} — ${e.subtitle}`, 14, y);
      doc.setTextColor(120); doc.text(e.date, 196, y, { align: "right" }); y += 5;
      doc.setTextColor(70); wrap(e.detail); y += 3;
    });
    y += 2; section("Skills"); wrap(value.skills);
    doc.save(`${(value.name || "resume").replace(/\s+/g, "-")}-resume.pdf`);
  };

  const EntryEditor = ({ title, field }: { title: string; field: "experience" | "education" }) => (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {value[field].map((e) => (
          <div key={e.id} className="space-y-2 rounded-xl border border-border p-3">
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Title" value={e.title} onChange={(ev) => patchEntry(field, e.id, { title: ev.target.value })} />
              <Input placeholder="Organisation" value={e.subtitle} onChange={(ev) => patchEntry(field, e.id, { subtitle: ev.target.value })} />
            </div>
            <Input placeholder="Date range" value={e.date} onChange={(ev) => patchEntry(field, e.id, { date: ev.target.value })} />
            <Textarea placeholder="Details" value={e.detail} onChange={(ev) => patchEntry(field, e.id, { detail: ev.target.value })} />
            <Button variant="ghost" size="sm" aria-label="Remove" onClick={() => patch({ [field]: value[field].filter((x) => x.id !== e.id) })}><Trash2 className="size-4" /> Remove</Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => patch({ [field]: [...value[field], entry()] })}><Plus /> Add</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Personal</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Input placeholder="Name" value={value.name} onChange={(e) => patch({ name: e.target.value })} />
            <Input placeholder="Role" value={value.role} onChange={(e) => patch({ role: e.target.value })} />
            <Input placeholder="Email" value={value.email} onChange={(e) => patch({ email: e.target.value })} />
            <Input placeholder="Phone" value={value.phone} onChange={(e) => patch({ phone: e.target.value })} />
            <Input placeholder="Location" value={value.location} onChange={(e) => patch({ location: e.target.value })} />
            <Input placeholder="Website" value={value.website} onChange={(e) => patch({ website: e.target.value })} />
            <Textarea className="col-span-2" placeholder="Summary" value={value.summary} onChange={(e) => patch({ summary: e.target.value })} />
          </CardContent>
        </Card>
        {EntryEditor({ title: "Experience", field: "experience" })}
        {EntryEditor({ title: "Education", field: "education" })}
        <Card>
          <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
          <CardContent><Textarea value={value.skills} onChange={(e) => patch({ skills: e.target.value })} placeholder="Comma-separated skills" /></CardContent>
        </Card>
        <ActionBar onUndo={undo} onRedo={redo} onReset={() => reset()} onDownload={downloadPdf} downloadLabel={exporting ? "Generating…" : "Download PDF"} canUndo={canUndo} canRedo={canRedo} />
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <div className="rounded-2xl border border-border bg-white p-8 text-slate-900 shadow-sm">
          <h2 className="text-2xl font-bold">{value.name}</h2>
          <p className="font-medium text-indigo-600">{value.role}</p>
          <p className="mt-1 text-xs text-slate-500">{[value.email, value.phone, value.location, value.website].filter(Boolean).join("  ·  ")}</p>
          <div className="my-4 h-px bg-slate-200" />
          <Section title="Summary"><p className="text-xs leading-relaxed text-slate-600">{value.summary}</p></Section>
          <Section title="Experience">
            {value.experience.map((e) => <EntryView key={e.id} e={e} />)}
          </Section>
          <Section title="Education">
            {value.education.map((e) => <EntryView key={e.id} e={e} />)}
          </Section>
          <Section title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {value.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
                <span key={s} className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700">{s}</span>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-600">{title}</h3>
      {children}
    </div>
  );
}
function EntryView({ e }: { e: Entry }) {
  return (
    <div className="mb-2">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold text-slate-800">{e.title} <span className="font-normal text-slate-500">— {e.subtitle}</span></p>
        <p className="text-[11px] text-slate-400">{e.date}</p>
      </div>
      <p className="text-xs text-slate-600">{e.detail}</p>
    </div>
  );
}
