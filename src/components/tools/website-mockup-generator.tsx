"use client";

import { useEffect, useRef, useState } from "react";
import { UploadCloud, Search, Download, Loader2, Clipboard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";

type Device = "iphone" | "samsung" | "pixel" | "nothing" | "oneplus" | "ipad" | "macbook" | "laptop" | "desktop" | "browser";
const DEVICES: { id: Device; label: string; group: string }[] = [
  { id: "iphone", label: "iPhone", group: "Phone" }, { id: "samsung", label: "Samsung", group: "Phone" },
  { id: "pixel", label: "Pixel", group: "Phone" }, { id: "nothing", label: "Nothing", group: "Phone" },
  { id: "oneplus", label: "OnePlus", group: "Phone" }, { id: "ipad", label: "iPad", group: "Tablet" },
  { id: "macbook", label: "MacBook", group: "Computer" }, { id: "laptop", label: "Laptop", group: "Computer" },
  { id: "desktop", label: "Desktop", group: "Computer" }, { id: "browser", label: "Browser", group: "Computer" },
];

const BACKGROUNDS: { id: string; label: string; css: string }[] = [
  { id: "gradient", label: "Gradient", css: "linear-gradient(135deg,#6366f1,#8b5cf6)" },
  { id: "glass", label: "Glass", css: "linear-gradient(135deg,#a5b4fc55,#f0abfc55),radial-gradient(circle at 30% 20%,#c7d2fe,#e0e7ff)" },
  { id: "office", label: "Office", css: "linear-gradient(135deg,#334155,#0f172a)" },
  { id: "minimal", label: "Minimal", css: "#f1f5f9" },
  { id: "luxury", label: "Luxury", css: "linear-gradient(135deg,#0f172a,#1e1b4b,#4c1d95)" },
  { id: "floating", label: "Floating", css: "#e2e8f0" },
  { id: "clay", label: "Clay", css: "linear-gradient(135deg,#fecdd3,#fed7aa,#fde68a)" },
  { id: "transparent", label: "Transparent", css: "transparent" },
];

const isPhone = (d: Device) => ["iphone", "samsung", "pixel", "nothing", "oneplus"].includes(d);

export default function WebsiteMockupGenerator() {
  const [device, setDevice] = useState<Device>("iphone");
  const [bgId, setBgId] = useState("gradient");
  const [img, setImg] = useState<string | null>(null);
  const [url, setUrl] = useState("https://techtoolscenter.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const bg = BACKGROUNDS.find((b) => b.id === bgId)!;

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith("image"));
      if (item) { const f = item.getAsFile(); if (f) readFile(f); }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, []);

  const readFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("That's not an image file — try a JPG, PNG, or WebP", "error");
      return;
    }
    const r = new FileReader();
    r.onload = () => setImg(r.result as string);
    r.onerror = () => showToast("Couldn't read that file — try again", "error");
    r.readAsDataURL(file);
  };

  const fetchUrl = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch(`/api/site-meta?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      if (data.preview) setImg(data.preview);
      else throw new Error("No preview image found for this site — upload a screenshot instead.");
    } catch (e) { setError((e as Error).message); } finally { setLoading(false); }
  };

  const exportAs = async (kind: "png" | "svg" | "pdf" | "zip") => {
    if (!stageRef.current) return;
    setBusy(true);
    try {
      const htmlToImage = await import("html-to-image");
      const opts = { pixelRatio: 2, cacheBust: true, backgroundColor: bgId === "transparent" ? undefined : undefined };
      if (kind === "svg") {
        const svg = await htmlToImage.toSvg(stageRef.current, opts);
        downloadBlob(new Blob([decodeURIComponent(svg.split(",")[1])], { type: "image/svg+xml" }), "mockup.svg");
        showToast("Downloaded mockup.svg");
        return;
      }
      const dataUrl = await htmlToImage.toPng(stageRef.current, opts);
      const blob = await (await fetch(dataUrl)).blob();
      if (kind === "png") { downloadBlob(blob, "mockup.png"); showToast("Downloaded mockup.png"); return; }
      if (kind === "pdf") {
        const { jsPDF } = await import("jspdf");
        const im = new Image(); im.src = dataUrl; await im.decode();
        const doc = new jsPDF({ orientation: im.width > im.height ? "landscape" : "portrait", unit: "px", format: [im.width, im.height] });
        doc.addImage(dataUrl, "PNG", 0, 0, im.width, im.height); doc.save("mockup.pdf");
        showToast("Downloaded mockup.pdf");
        return;
      }
      if (kind === "zip") {
        const JSZip = (await import("jszip")).default; const zip = new JSZip();
        zip.file("mockup.png", blob);
        const svg = await htmlToImage.toSvg(stageRef.current, opts);
        zip.file("mockup.svg", new Blob([decodeURIComponent(svg.split(",")[1])], { type: "image/svg+xml" }));
        downloadBlob(await zip.generateAsync({ type: "blob" }), "mockup.zip");
        showToast("Downloaded mockup.zip");
      }
    } catch {
      showToast("Couldn't export the mockup — try again", "error");
    } finally { setBusy(false); }
  };

  const saveMockup = async () => {
    const { saveItem } = await import("@/lib/saved");
    let thumb: string | undefined;
    try {
      if (stageRef.current) {
        const htmlToImage = await import("html-to-image");
        thumb = await htmlToImage.toPng(stageRef.current, { pixelRatio: 0.5, cacheBust: true });
      }
    } catch { /* ignore */ }
    saveItem({ type: "mockup", title: `${device} mockup`, subtitle: bg.label ?? bgId, thumb, href: "/tools/website-mockup-generator" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Content</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && readFile(e.target.files[0])} />
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => fileRef.current?.click()}><UploadCloud /> Upload</Button>
              <Button variant="outline" onClick={() => navigator.clipboard?.read?.().then(async (items) => {
                for (const it of items) { const t = it.types.find((x) => x.startsWith("image")); if (t) { const b = await it.getType(t); readFile(new File([b], "p.png")); return; } }
                showToast("No image found on the clipboard", "error");
              }).catch(() => showToast("Couldn't access the clipboard — try Ctrl/Cmd+V instead", "error"))}><Clipboard /> Paste</Button>
            </div>
            <div className="space-y-1.5">
              <Label>Website URL</Label>
              <div className="flex gap-2">
                <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="example.com" onKeyDown={(e) => e.key === "Enter" && fetchUrl()} />
                <Button onClick={fetchUrl} disabled={loading} aria-label="Fetch">{loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}</Button>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <p className="text-xs text-muted-foreground">Tip: you can also paste an image with Ctrl/Cmd+V anywhere.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Device</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {["Phone", "Tablet", "Computer"].map((g) => (
              <div key={g}>
                <p className="mb-1 text-[11px] font-semibold uppercase text-muted-foreground">{g}</p>
                <div className="flex flex-wrap gap-2">
                  {DEVICES.filter((d) => d.group === g).map((d) => (
                    <Button key={d.id} size="sm" variant={device === d.id ? "default" : "outline"} onClick={() => setDevice(d.id)}>{d.label}</Button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Background</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {BACKGROUNDS.map((b) => (
                <button key={b.id} onClick={() => setBgId(b.id)} title={b.label}
                  className={`h-12 rounded-lg border-2 text-[10px] ${bgId === b.id ? "border-primary" : "border-transparent"}`}
                  style={{ background: b.id === "transparent" ? "repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%) 50%/10px 10px" : b.css }}>
                  {b.id === "transparent" ? "None" : ""}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 pt-6">
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => exportAs("png")} disabled={busy}><Download /> PNG</Button>
              <Button variant="outline" onClick={() => exportAs("svg")} disabled={busy}><Download /> SVG</Button>
              <Button variant="outline" onClick={() => exportAs("pdf")} disabled={busy}><Download /> PDF</Button>
              <Button variant="outline" onClick={() => exportAs("zip")} disabled={busy}><Download /> ZIP</Button>
            </div>
            <Button variant="ghost" size="sm" className="w-full" onClick={saveMockup}>Save</Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <div ref={stageRef} className="flex items-center justify-center overflow-hidden rounded-2xl p-10 sm:p-16" style={{ background: bg.id === "transparent" ? "transparent" : bg.css }}>
          <DeviceFrame device={device} img={img} />
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">Exports at 2× resolution. Phones {isPhone(device) ? "shown" : "available"} with realistic frames.</p>
      </div>
    </div>
  );
}

function Placeholder() {
  return <div className="flex size-full items-center justify-center bg-slate-100 text-xs text-slate-400">Upload / paste a screenshot or fetch a URL</div>;
}
function Screen({ img, radius = 0 }: { img: string | null; radius?: number }) {
  return (
    <div className="size-full overflow-hidden bg-white" style={{ borderRadius: radius }}>
      {img
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={img} alt="Screenshot" className="size-full object-cover" />
        : <Placeholder />}
    </div>
  );
}

function DeviceFrame({ device, img }: { device: Device; img: string | null }) {
  if (device === "browser") {
    return (
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-slate-300 shadow-2xl">
        <div className="flex items-center gap-2 bg-slate-200 px-3 py-2">
          <span className="flex gap-1.5"><span className="size-3 rounded-full bg-red-400" /><span className="size-3 rounded-full bg-amber-400" /><span className="size-3 rounded-full bg-emerald-400" /></span>
          <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 text-xs text-slate-400">techtoolscenter.com</div>
        </div>
        <div className="aspect-[16/10]"><Screen img={img} /></div>
      </div>
    );
  }
  if (device === "macbook" || device === "laptop") {
    const mac = device === "macbook";
    return (
      <div className="w-full max-w-2xl">
        <div className="rounded-t-xl bg-slate-800 p-2.5 shadow-2xl"><div className="aspect-[16/10] overflow-hidden rounded-md bg-black"><Screen img={img} /></div></div>
        <div className="mx-auto h-3 w-[112%] -translate-x-[5%] rounded-b-xl bg-slate-300" style={{ background: mac ? "linear-gradient(#cbd5e1,#94a3b8)" : "linear-gradient(#94a3b8,#64748b)" }} />
        {mac && <div className="mx-auto h-1 w-16 rounded-b-md bg-slate-400" />}
      </div>
    );
  }
  if (device === "desktop") {
    return (
      <div className="w-full max-w-2xl">
        <div className="rounded-xl bg-slate-800 p-3 shadow-2xl"><div className="aspect-[16/9] overflow-hidden rounded-md bg-black"><Screen img={img} /></div></div>
        <div className="mx-auto mt-1 h-10 w-4 bg-slate-400" />
        <div className="mx-auto h-2 w-32 rounded-full bg-slate-400" />
      </div>
    );
  }
  if (device === "ipad") {
    return (
      <div className="rounded-[28px] bg-slate-900 p-3 shadow-2xl" style={{ width: 380 }}>
        <div className="aspect-[3/4] overflow-hidden rounded-[14px]"><Screen img={img} radius={14} /></div>
      </div>
    );
  }
  // phones
  const notch = () => {
    switch (device) {
      case "iphone": return <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />;
      case "samsung": return <div className="absolute left-1/2 top-2.5 z-10 size-2.5 -translate-x-1/2 rounded-full bg-black" />;
      case "pixel": return <div className="absolute left-1/2 top-2.5 z-10 size-2.5 -translate-x-1/2 rounded-full bg-black" />;
      case "nothing": return <div className="absolute right-6 top-2.5 z-10 size-2.5 rounded-full bg-black" />;
      case "oneplus": return <div className="absolute left-6 top-2.5 z-10 size-2.5 rounded-full bg-black" />;
      default: return null;
    }
  };
  const bezel = device === "nothing" ? 8 : 10;
  const radius = device === "samsung" || device === "oneplus" ? 42 : 46;
  return (
    <div className="relative shadow-2xl" style={{ width: 260, background: "#0b0b0f", borderRadius: radius, padding: bezel }}>
      {notch()}
      <div className="relative overflow-hidden" style={{ aspectRatio: "9 / 19.5", borderRadius: radius - bezel }}>
        <Screen img={img} radius={radius - bezel} />
      </div>
    </div>
  );
}
