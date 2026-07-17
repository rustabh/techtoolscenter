"use client";

import { useRef, useState } from "react";
import { Search, Download, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";

type Device = "browser" | "laptop" | "tablet" | "phone";
interface Meta {
  url: string; host: string; title: string; themeColor: string;
  favicon: string | null; preview: string | null;
}

const BACKGROUNDS = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#0ea5e9,#22d3ee)",
  "linear-gradient(135deg,#f43f5e,#f59e0b)",
  "linear-gradient(135deg,#10b981,#84cc16)",
  "linear-gradient(135deg,#1e293b,#0f172a)",
  "#f1f5f9",
];

const FRAME_W: Record<Device, string> = { browser: "100%", laptop: "88%", tablet: "60%", phone: "300px" };

export default function WebsiteMockupGenerator() {
  const [url, setUrl] = useState("https://techtoolscenter.com");
  const [device, setDevice] = useState<Device>("browser");
  const [dark, setDark] = useState(false);
  const [bg, setBg] = useState(BACKGROUNDS[0]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const stageRef = useRef<HTMLDivElement>(null);

  const fetchMeta = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/site-meta?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setMeta(data);
    } catch (e) {
      setError((e as Error).message || "Could not fetch this site.");
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  const download = async () => {
    if (!stageRef.current) return;
    const { toPng } = await import("html-to-image");
    const dataUrl = await toPng(stageRef.current, { pixelRatio: 2, cacheBust: true });
    const blob = await (await fetch(dataUrl)).blob();
    downloadBlob(blob, `${meta?.host || "website"}-mockup.png`);
  };

  const chromeBg = dark ? "#1e293b" : "#e2e8f0";
  const bodyBg = dark ? "#0f172a" : "#ffffff";

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Website</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Website URL</Label>
              <div className="flex gap-2">
                <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="example.com"
                  onKeyDown={(e) => e.key === "Enter" && fetchMeta()} />
                <Button onClick={fetchMeta} disabled={loading} aria-label="Fetch">
                  {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
                </Button>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Device</Label>
              <div className="grid grid-cols-2 gap-2">
                {(["browser", "laptop", "tablet", "phone"] as Device[]).map((d) => (
                  <button key={d} onClick={() => setDevice(d)}
                    className={`rounded-xl border px-3 py-2 text-sm capitalize transition-colors ${device === d ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
              Dark browser theme
            </label>

            <div className="space-y-1.5">
              <Label>Background</Label>
              <div className="flex flex-wrap gap-2">
                {BACKGROUNDS.map((b) => (
                  <button key={b} onClick={() => setBg(b)} aria-label="Background"
                    className={`size-9 rounded-lg border-2 ${bg === b ? "border-primary" : "border-transparent"}`}
                    style={{ background: b }} />
                ))}
              </div>
            </div>

            <Button className="w-full" onClick={download}>
              <Download /> Download PNG
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <div ref={stageRef} className="flex items-center justify-center overflow-hidden rounded-2xl p-8 sm:p-14" style={{ background: bg }}>
          <div className="w-full max-w-3xl overflow-hidden rounded-xl shadow-2xl" style={{ width: FRAME_W[device] }}>
            {/* chrome */}
            <div className="flex items-center gap-2 px-3 py-2" style={{ background: chromeBg }}>
              <span className="flex gap-1.5">
                <span className="size-3 rounded-full bg-red-400" />
                <span className="size-3 rounded-full bg-amber-400" />
                <span className="size-3 rounded-full bg-emerald-400" />
              </span>
              <div className="ml-2 flex flex-1 items-center gap-2 truncate rounded-md px-2 py-1 text-xs" style={{ background: dark ? "#0f172a" : "#fff", color: dark ? "#cbd5e1" : "#475569" }}>
                {meta?.favicon && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={meta.favicon} alt="" className="size-3.5" />
                )}
                <span className="truncate">{meta?.host || new URL(url.startsWith("http") ? url : `https://${url}`).hostname}</span>
              </div>
            </div>
            {/* body */}
            <div className="aspect-[16/10] w-full" style={{ background: bodyBg }}>
              {meta?.preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={meta.preview} alt={meta.title} className="size-full object-cover" />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-3 p-6 text-center">
                  {meta?.favicon && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={meta.favicon} alt="" className="size-12" />
                  )}
                  <p className="text-lg font-semibold" style={{ color: dark ? "#f1f5f9" : "#0f172a" }}>
                    {meta?.title || "Enter a URL and press fetch"}
                  </p>
                  {meta && <span className="rounded-full px-3 py-1 text-xs text-white" style={{ background: meta.themeColor }}>{meta.themeColor}</span>}
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Fetches public site branding (title, favicon, theme colour, preview image). Exports at 2× resolution.
        </p>
      </div>
    </div>
  );
}
