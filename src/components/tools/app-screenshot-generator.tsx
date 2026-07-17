"use client";

import { useRef, useState } from "react";
import { Upload, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";

type Device = "iphone" | "android" | "ipad";
type Orient = "portrait" | "landscape";

const TEMPLATES: { name: string; bg: string; text: string }[] = [
  { name: "Minimal", bg: "#f8fafc", text: "#0f172a" },
  { name: "Business", bg: "linear-gradient(135deg,#1e3a8a,#2563eb)", text: "#ffffff" },
  { name: "Gaming", bg: "linear-gradient(135deg,#7c3aed,#db2777)", text: "#ffffff" },
  { name: "Luxury", bg: "linear-gradient(135deg,#0f172a,#334155)", text: "#f5d0a9" },
  { name: "Gradient", bg: "linear-gradient(135deg,#6366f1,#22d3ee)", text: "#ffffff" },
  { name: "Dark", bg: "#0b1020", text: "#e2e8f0" },
  { name: "Startup", bg: "linear-gradient(135deg,#10b981,#3b82f6)", text: "#ffffff" },
  { name: "Finance", bg: "linear-gradient(135deg,#065f46,#059669)", text: "#ffffff" },
];

export default function AppScreenshotGenerator() {
  const [device, setDevice] = useState<Device>("iphone");
  const [orient, setOrient] = useState<Orient>("portrait");
  const [tpl, setTpl] = useState(TEMPLATES[4]);
  const [title, setTitle] = useState("Your app, reimagined");
  const [subtitle, setSubtitle] = useState("Beautiful. Fast. Effortless.");
  const [shot, setShot] = useState<string | null>(null);
  const [frameColor, setFrameColor] = useState("#0f172a");
  const stageRef = useRef<HTMLDivElement>(null);

  const onShot = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setShot(reader.result as string);
    reader.readAsDataURL(file);
  };

  const download = async () => {
    if (!stageRef.current) return;
    const { toPng } = await import("html-to-image");
    const dataUrl = await toPng(stageRef.current, { pixelRatio: 2.5, cacheBust: true });
    downloadBlob(await (await fetch(dataUrl)).blob(), "app-screenshot.png");
  };

  const isPortrait = orient === "portrait";
  const radius = device === "ipad" ? 24 : 40;
  const frameW = device === "ipad" ? 300 : 220;
  const ratio = device === "ipad" ? 4 / 3 : 19.5 / 9;

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Content</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <ShotUpload onFile={onShot} has={!!shot} />
            <div className="space-y-1.5"><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Subtitle</Label><Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Device & template</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {(["iphone", "android", "ipad"] as Device[]).map((d) => (
                <button key={d} onClick={() => setDevice(d)}
                  className={`rounded-xl border px-2 py-2 text-xs font-medium capitalize transition-colors ${device === d ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}>{d}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(["portrait", "landscape"] as Orient[]).map((o) => (
                <button key={o} onClick={() => setOrient(o)}
                  className={`rounded-xl border px-3 py-2 text-sm capitalize transition-colors ${orient === o ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}>{o}</button>
              ))}
            </div>
            <div className="space-y-1.5">
              <Label>Device colour</Label>
              <Input type="color" value={frameColor} onChange={(e) => setFrameColor(e.target.value)} className="h-10 p-1" />
            </div>
            <div className="space-y-1.5">
              <Label>Template</Label>
              <div className="grid grid-cols-4 gap-2">
                {TEMPLATES.map((t) => (
                  <button key={t.name} onClick={() => setTpl(t)} title={t.name}
                    className={`h-9 rounded-lg border-2 ${tpl.name === t.name ? "border-primary" : "border-transparent"}`} style={{ background: t.bg }} />
                ))}
              </div>
            </div>
            <Button className="w-full" onClick={download}><Download /> Download PNG</Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <div ref={stageRef} className="flex items-center justify-center overflow-hidden rounded-2xl p-10" style={{ background: tpl.bg, aspectRatio: isPortrait ? "9 / 16" : "16 / 9" }}>
          <div className={`flex h-full w-full items-center ${isPortrait ? "flex-col justify-start gap-6 pt-4" : "flex-row justify-center gap-8"}`}>
            <div className={isPortrait ? "text-center" : "max-w-[40%] text-left"}>
              <h2 className="text-2xl font-bold leading-tight sm:text-3xl" style={{ color: tpl.text }}>{title}</h2>
              <p className="mt-2 text-sm opacity-80" style={{ color: tpl.text }}>{subtitle}</p>
            </div>
            <div
              className="relative shrink-0 overflow-hidden shadow-2xl"
              style={{
                width: isPortrait ? frameW : frameW * 0.8,
                aspectRatio: String(isPortrait ? 1 / ratio : ratio),
                borderRadius: radius,
                background: frameColor,
                padding: device === "ipad" ? 10 : 8,
                transform: isPortrait ? "none" : "rotate(0deg)",
              }}
            >
              <div className="size-full overflow-hidden bg-white" style={{ borderRadius: radius - 8 }}>
                {shot ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={shot} alt="App screenshot" className="size-full object-cover" />
                ) : (
                  <div className="flex size-full items-center justify-center bg-slate-100 p-4 text-center text-xs text-slate-400">
                    Upload your app screenshot
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">Exports at 2.5× — store-ready resolution.</p>
      </div>
    </div>
  );
}

function ShotUpload({ onFile, has }: { onFile: (f?: File) => void; has: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      <Button variant="outline" className="w-full" onClick={() => ref.current?.click()}>
        <Upload /> {has ? "Change screenshot" : "Upload screenshot"}
      </Button>
    </>
  );
}
