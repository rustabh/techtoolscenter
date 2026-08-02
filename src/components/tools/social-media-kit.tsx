"use client";

import { useMemo, useRef, useState } from "react";
import { Upload, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";

interface Preset { id: string; label: string; w: number; h: number; }
const PRESETS: Preset[] = [
  { id: "ig-post", label: "Instagram Post", w: 1080, h: 1080 },
  { id: "ig-story", label: "Instagram Story", w: 1080, h: 1920 },
  { id: "ig-carousel", label: "Carousel Cover", w: 1080, h: 1350 },
  { id: "fb-post", label: "Facebook Post", w: 1200, h: 630 },
  { id: "fb-cover", label: "Facebook Cover", w: 1640, h: 924 },
  { id: "li-banner", label: "LinkedIn Banner", w: 1584, h: 396 },
  { id: "x-header", label: "Twitter / X Header", w: 1500, h: 500 },
  { id: "pin", label: "Pinterest Pin", w: 1000, h: 1500 },
  { id: "threads", label: "Threads Post", w: 1080, h: 1350 },
  { id: "tg-banner", label: "Telegram Banner", w: 1280, h: 640 },
  { id: "wa-share", label: "WhatsApp Share", w: 1080, h: 1080 },
  { id: "yt-thumb", label: "YouTube Thumbnail", w: 1280, h: 720 },
  { id: "yt-banner", label: "YouTube Banner", w: 2560, h: 1440 },
  { id: "blog", label: "Blog Cover", w: 1600, h: 900 },
  { id: "og", label: "OpenGraph Image", w: 1200, h: 630 },
];

const GRADIENTS = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#0ea5e9,#22d3ee)",
  "linear-gradient(135deg,#f43f5e,#f59e0b)",
  "linear-gradient(135deg,#10b981,#84cc16)",
  "linear-gradient(135deg,#1e293b,#0f172a)",
  "linear-gradient(135deg,#db2777,#7c3aed)",
];

export default function SocialMediaKit() {
  const [preset, setPreset] = useState(PRESETS[0]);
  const [title, setTitle] = useState("Your headline goes here");
  const [subtitle, setSubtitle] = useState("A short supporting line for your brand.");
  const [bg, setBg] = useState(GRADIENTS[0]);
  const [textColor, setTextColor] = useState("#ffffff");
  const [align, setAlign] = useState<"left" | "center">("center");
  const [logo, setLogo] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const scale = useMemo(() => Math.min(1, 520 / preset.w, 420 / preset.h), [preset]);

  const onLogo = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("That's not an image file — try a JPG or PNG", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.onerror = () => showToast("Couldn't read that file — try again", "error");
    reader.readAsDataURL(file);
  };

  const download = async () => {
    if (!stageRef.current || exporting) return;
    setExporting(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(stageRef.current, { width: preset.w, height: preset.h, cacheBust: true });
      downloadBlob(await (await fetch(dataUrl)).blob(), `${preset.id}-${preset.w}x${preset.h}.png`);
      showToast("Downloaded image");
    } catch {
      showToast("Couldn't generate the image — try a smaller format or a different logo", "error");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Format</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Platform / size</Label>
              <Select value={preset.id} onChange={(e) => setPreset(PRESETS.find((p) => p.id === e.target.value)!)}>
                {PRESETS.map((p) => <option key={p.id} value={p.id}>{p.label} ({p.w}×{p.h})</option>)}
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Title</Label><Textarea value={title} onChange={(e) => setTitle(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Subtitle</Label><Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Style</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Background</Label>
              <div className="flex flex-wrap gap-2">
                {GRADIENTS.map((g) => (
                  <button key={g} onClick={() => setBg(g)} aria-label="Background"
                    className={`size-9 rounded-lg border-2 ${bg === g ? "border-primary" : "border-transparent"}`} style={{ background: g }} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Text colour</Label><Input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-10 p-1" /></div>
              <div className="space-y-1.5">
                <Label>Align</Label>
                <div className="grid grid-cols-2 gap-1">
                  {(["left", "center"] as const).map((a) => (
                    <button key={a} onClick={() => setAlign(a)}
                      className={`rounded-lg border px-2 py-2 text-xs capitalize ${align === a ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}>{a}</button>
                  ))}
                </div>
              </div>
            </div>
            <LogoUpload onFile={onLogo} has={!!logo} />
            <Button className="w-full" onClick={download} disabled={exporting}><Download /> {exporting ? "Generating…" : `Download PNG (${preset.w}×${preset.h})`}</Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col items-center">
        <div className="overflow-hidden rounded-2xl border border-border shadow-lg" style={{ width: preset.w * scale, height: preset.h * scale }}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: preset.w, height: preset.h }}>
          <div
            ref={stageRef}
            style={{
              width: preset.w, height: preset.h, background: bg,
              display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: align === "center" ? "center" : "flex-start",
              textAlign: align, padding: Math.round(preset.w * 0.07), gap: 24,
            }}
          >
            {logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt="Logo" style={{ height: Math.round(preset.h * 0.09), objectFit: "contain" }} />
            )}
            <h2 style={{ color: textColor, fontSize: Math.round(preset.w * 0.07), fontWeight: 800, lineHeight: 1.1, margin: 0 }}>{title}</h2>
            <p style={{ color: textColor, opacity: 0.85, fontSize: Math.round(preset.w * 0.032), margin: 0, maxWidth: "85%" }}>{subtitle}</p>
          </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">Preview scaled to fit · exports at full {preset.w}×{preset.h}px.</p>
      </div>
    </div>
  );
}

function LogoUpload({ onFile, has }: { onFile: (f?: File) => void; has: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      <Button variant="outline" className="w-full" onClick={() => ref.current?.click()}>
        <Upload /> {has ? "Change logo" : "Upload logo (optional)"}
      </Button>
    </>
  );
}
