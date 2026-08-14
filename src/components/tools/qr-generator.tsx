"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type QRCodeStyling from "qr-code-styling";
import { Upload, Download, Copy, Share2, Check, Star } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { showToast } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { downloadBlob } from "@/lib/utils";
import { cn } from "@/lib/utils";

type QrType =
  | "url" | "text" | "email" | "phone" | "sms" | "whatsapp" | "telegram" | "instagram"
  | "facebook" | "linkedin" | "wifi" | "googlemaps" | "googlereview" | "upi" | "vcard"
  | "event" | "crypto" | "pdf" | "image" | "video" | "playstore" | "appstore";

const TYPES: { id: QrType; label: string }[] = [
  { id: "url", label: "Website" }, { id: "text", label: "Text" }, { id: "email", label: "Email" },
  { id: "phone", label: "Phone" }, { id: "sms", label: "SMS" }, { id: "whatsapp", label: "WhatsApp" },
  { id: "telegram", label: "Telegram" }, { id: "instagram", label: "Instagram" }, { id: "facebook", label: "Facebook" },
  { id: "linkedin", label: "LinkedIn" }, { id: "wifi", label: "WiFi" }, { id: "googlemaps", label: "Google Maps" },
  { id: "googlereview", label: "Google Review" }, { id: "upi", label: "UPI Payment" }, { id: "vcard", label: "Business Card" },
  { id: "event", label: "Event / Calendar" }, { id: "crypto", label: "Crypto Wallet" }, { id: "pdf", label: "PDF Link" },
  { id: "image", label: "Image Link" }, { id: "video", label: "Video Link" }, { id: "playstore", label: "Play Store" },
  { id: "appstore", label: "App Store" },
];

type Fields = Record<string, any>;
// WIFI (MECARD-style) and vCard both use unescaped `;`/`,`/`\` as field
// delimiters — a raw `;` inside e.g. a password truncates the field for any
// spec-compliant scanner, so free-text values must be escaped before joining.
const escWifi = (s: string) => s.replace(/([\\;,:"])/g, "\\$1");
const escVcard = (s: string) => s.replace(/([\\;,])/g, "\\$1");
function buildValue(type: QrType, f: Fields): string {
  const g = (k: string) => (f[k] ?? "").toString().trim();
  switch (type) {
    case "url": case "pdf": case "image": case "video": case "facebook": case "linkedin": case "playstore": case "appstore": return g("url");
    case "text": return g("text");
    case "email": return `mailto:${g("to")}?subject=${encodeURIComponent(g("subject"))}&body=${encodeURIComponent(g("body"))}`;
    case "phone": return `tel:${g("phone")}`;
    case "sms": return `SMSTO:${g("phone")}:${g("message")}`;
    case "whatsapp": return `https://wa.me/${g("phone").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(g("message"))}`;
    case "telegram": return `https://t.me/${g("handle").replace("@", "")}`;
    case "instagram": return `https://instagram.com/${g("handle").replace("@", "")}`;
    case "wifi": return `WIFI:T:${g("encryption") || "WPA"};S:${escWifi(g("ssid"))};P:${escWifi(g("password"))};H:${f.hidden ? "true" : "false"};;`;
    case "googlemaps": return `https://maps.google.com/?q=${encodeURIComponent(g("query"))}`;
    case "googlereview": return g("placeId") ? `https://search.google.com/local/writereview?placeid=${g("placeId")}` : g("url");
    case "upi": return `upi://pay?pa=${g("vpa")}&pn=${encodeURIComponent(g("name"))}${g("amount") ? `&am=${g("amount")}` : ""}&cu=INR`;
    case "vcard":
      return ["BEGIN:VCARD", "VERSION:3.0", `N:${escVcard(g("name"))}`, `FN:${escVcard(g("name"))}`, g("org") && `ORG:${escVcard(g("org"))}`,
        g("title") && `TITLE:${escVcard(g("title"))}`, g("phone") && `TEL:${escVcard(g("phone"))}`, g("email") && `EMAIL:${escVcard(g("email"))}`,
        g("url") && `URL:${escVcard(g("url"))}`, "END:VCARD"].filter(Boolean).join("\n");
    case "event":
      return ["BEGIN:VEVENT", `SUMMARY:${g("title")}`, g("location") && `LOCATION:${g("location")}`,
        g("start") && `DTSTART:${g("start").replace(/[-:]/g, "")}00`, g("end") && `DTEND:${g("end").replace(/[-:]/g, "")}00`,
        "END:VEVENT"].filter(Boolean).join("\n");
    case "crypto": return g("address");
    default: return "";
  }
}
const FORMS: Record<QrType, { key: string; label: string; type?: string; placeholder?: string; area?: boolean }[]> = {
  url: [{ key: "url", label: "URL", placeholder: "https://techtoolscenter.com" }],
  text: [{ key: "text", label: "Text", area: true }],
  email: [{ key: "to", label: "To" }, { key: "subject", label: "Subject" }, { key: "body", label: "Body", area: true }],
  phone: [{ key: "phone", label: "Phone number" }],
  sms: [{ key: "phone", label: "Phone number" }, { key: "message", label: "Message", area: true }],
  whatsapp: [{ key: "phone", label: "Number (with country code)" }, { key: "message", label: "Message", area: true }],
  telegram: [{ key: "handle", label: "Username", placeholder: "@handle" }],
  instagram: [{ key: "handle", label: "Username", placeholder: "@handle" }],
  facebook: [{ key: "url", label: "Facebook URL" }],
  linkedin: [{ key: "url", label: "LinkedIn URL" }],
  wifi: [{ key: "ssid", label: "Network name" }, { key: "password", label: "Password" }, { key: "encryption", label: "Encryption (WPA/WEP/nopass)", placeholder: "WPA" }],
  googlemaps: [{ key: "query", label: "Place or address" }],
  googlereview: [{ key: "placeId", label: "Google Place ID" }, { key: "url", label: "…or review URL" }],
  upi: [{ key: "vpa", label: "UPI ID (VPA)", placeholder: "name@bank" }, { key: "name", label: "Payee name" }, { key: "amount", label: "Amount (optional)", type: "number" }],
  vcard: [{ key: "name", label: "Full name" }, { key: "org", label: "Organisation" }, { key: "title", label: "Job title" }, { key: "phone", label: "Phone" }, { key: "email", label: "Email" }, { key: "url", label: "Website" }],
  event: [{ key: "title", label: "Event title" }, { key: "location", label: "Location" }, { key: "start", label: "Start", type: "datetime-local" }, { key: "end", label: "End", type: "datetime-local" }],
  crypto: [{ key: "address", label: "Wallet address" }],
  pdf: [{ key: "url", label: "PDF link" }],
  image: [{ key: "url", label: "Image link" }],
  video: [{ key: "url", label: "Video link" }],
  playstore: [{ key: "url", label: "Play Store URL" }],
  appstore: [{ key: "url", label: "App Store URL" }],
};

type DotType = "square" | "rounded" | "dots" | "classy" | "classy-rounded" | "extra-rounded";
type CornerType = "square" | "dot" | "extra-rounded";

const TEMPLATES: { name: string; fg: string; fg2?: string; dot: DotType; corner: CornerType }[] = [
  { name: "Classic", fg: "#0b1220", dot: "square", corner: "square" },
  { name: "Rounded", fg: "#4f46e5", dot: "extra-rounded", corner: "extra-rounded" },
  { name: "Dots", fg: "#0ea5e9", dot: "dots", corner: "dot" },
  { name: "Ocean", fg: "#0ea5e9", fg2: "#22d3ee", dot: "rounded", corner: "extra-rounded" },
  { name: "Sunset", fg: "#f43f5e", fg2: "#f59e0b", dot: "classy-rounded", corner: "dot" },
  { name: "Forest", fg: "#10b981", fg2: "#84cc16", dot: "classy", corner: "square" },
  { name: "Royal", fg: "#7c3aed", fg2: "#db2777", dot: "extra-rounded", corner: "extra-rounded" },
  { name: "Mono", fg: "#111827", dot: "classy", corner: "square" },
];

export default function QrGenerator({ preset }: { preset?: Record<string, unknown> }) {
  const [type, setType] = useState<QrType>((preset?.type as QrType) || "url");
  const [fields, setFields] = useState<Fields>({ url: "https://techtoolscenter.com" });
  const [fg, setFg] = useState("#0b1220");
  const [fg2, setFg2] = useState("");
  const [bg, setBg] = useState("#ffffff");
  const [transparent, setTransparent] = useState(false);
  const [size, setSize] = useState(320);
  const [ecc, setEcc] = useState<"L" | "M" | "Q" | "H">("Q");
  const [dot, setDot] = useState<DotType>("square");
  const [corner, setCorner] = useState<CornerType>("square");
  const [logo, setLogo] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);
  const [shared, setShared] = useState(false);
  const holderRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);
  const { copied } = useCopy();
  const { value: history, set: setHistory } = useLocalStorage<string[]>("ttc:qr-history", []);

  const value = useMemo(() => buildValue(type, fields), [type, fields]);

  const options = useMemo(() => ({
    width: size, height: size, data: value || " ", margin: 8,
    qrOptions: { errorCorrectionLevel: logo ? "H" : ecc },
    image: logo || undefined,
    imageOptions: { crossOrigin: "anonymous", margin: 6, imageSize: 0.35 },
    dotsOptions: fg2 ? { type: dot, gradient: { type: "linear" as const, rotation: 0.79, colorStops: [{ offset: 0, color: fg }, { offset: 1, color: fg2 }] } } : { type: dot, color: fg },
    cornersSquareOptions: { type: corner, color: fg2 || fg },
    cornersDotOptions: { type: corner === "extra-rounded" ? "dot" : corner === "square" ? "square" : "dot", color: fg2 || fg },
    backgroundOptions: { color: transparent ? "#00000000" : bg },
  }) as any, [value, size, ecc, logo, fg, fg2, bg, transparent, dot, corner]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const QR = (await import("qr-code-styling")).default;
      if (cancelled) return;
      if (!qrRef.current) {
        qrRef.current = new QR(options);
        if (holderRef.current) { holderRef.current.innerHTML = ""; qrRef.current.append(holderRef.current); }
      } else {
        qrRef.current.update(options);
      }
    })();
    return () => { cancelled = true; };
  }, [options]);

  const applyTemplate = (t: (typeof TEMPLATES)[number]) => {
    setFg(t.fg); setFg2(t.fg2 || ""); setDot(t.dot); setCorner(t.corner);
  };

  const getBlob = async (ext: "png" | "svg"): Promise<Blob | null> => {
    if (!qrRef.current) return null;
    return (await qrRef.current.getRawData(ext)) as Blob;
  };
  const countQr = () => { import("@/lib/stats/stats").then((m) => m.track("qrCodes")).catch(() => {}); };
  const download = async (ext: "png" | "svg") => {
    countQr();
    try {
      const blob = await getBlob(ext);
      if (!blob) { showToast("QR code isn't ready yet — try again in a moment", "error"); return; }
      downloadBlob(blob, `qr-code.${ext}`);
      showToast(`Downloaded qr-code.${ext}`);
    } catch {
      showToast("Couldn't generate the download — try again", "error");
    }
  };
  const downloadPdf = async () => {
    setBusy(true);
    try {
      const blob = await getBlob("png");
      if (!blob) { showToast("QR code isn't ready yet — try again in a moment", "error"); return; }
      const dataUrl = await new Promise<string>((res) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.readAsDataURL(blob); });
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      doc.addImage(dataUrl, "PNG", 65, 40, 80, 80);
      if (caption) { doc.setFontSize(14); doc.text(caption, 105, 130, { align: "center" }); }
      doc.save("qr-code.pdf");
      showToast("Downloaded qr-code.pdf");
    } catch {
      showToast("Couldn't generate the PDF — try again", "error");
    } finally { setBusy(false); }
  };
  const downloadZip = async () => {
    setBusy(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const png = await getBlob("png"); const svg = await getBlob("svg");
      if (png) zip.file("qr-code.png", png);
      if (svg) zip.file("qr-code.svg", svg);
      zip.file("data.txt", value);
      downloadBlob(await zip.generateAsync({ type: "blob" }), "qr-code.zip");
      showToast("Downloaded qr-code.zip");
    } catch {
      showToast("Couldn't build the ZIP — try again", "error");
    } finally { setBusy(false); }
  };
  const copyImage = async () => {
    try {
      const blob = await getBlob("png");
      if (!blob) { showToast("QR code isn't ready yet — try again in a moment", "error"); return; }
      await navigator.clipboard.write([new (window as any).ClipboardItem({ "image/png": blob })]);
      showToast("QR code copied to clipboard");
    } catch {
      showToast("Copying an image isn't supported in this browser — try downloading instead", "error");
    }
  };
  const share = async () => {
    try {
      const blob = await getBlob("png");
      if (!blob) { showToast("QR code isn't ready yet — try again in a moment", "error"); return; }
      const file = new File([blob], "qr-code.png", { type: "image/png" });
      if ((navigator as any).canShare?.({ files: [file] })) {
        await (navigator as any).share({ files: [file], title: "QR Code" });
        setShared(true); setTimeout(() => setShared(false), 2000);
      } else {
        showToast("Sharing isn't supported on this device — try downloading instead", "error");
      }
    } catch { /* user cancelled the native share sheet — not an error */ }
  };
  const saveToHistory = async () => {
    if (value && !history.includes(value)) setHistory([value, ...history].slice(0, 12));
    const { saveItem } = await import("@/lib/saved");
    let thumb: string | undefined;
    try {
      const blob = await getBlob("png");
      if (blob) thumb = await new Promise<string>((res) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.readAsDataURL(blob); });
    } catch { /* ignore */ }
    saveItem({ type: "qr", title: value.slice(0, 48) || "QR code", subtitle: type, thumb, href: "/tools/qr-generator" });
  };

  const onLogo = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Content</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="qr-type">QR type</Label>
              <Select id="qr-type" value={type} onChange={(e) => { setType(e.target.value as QrType); setFields({}); }}>
                {TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </Select>
            </div>
            {FORMS[type].map((field) => (
              <div key={field.key} className="space-y-1.5">
                <Label htmlFor={`qr-field-${field.key}`}>{field.label}</Label>
                {field.area
                  ? <Textarea id={`qr-field-${field.key}`} value={fields[field.key] ?? ""} onChange={(e) => setFields((f) => ({ ...f, [field.key]: e.target.value }))} placeholder={field.placeholder} />
                  : <Input id={`qr-field-${field.key}`} type={field.type ?? "text"} value={fields[field.key] ?? ""} onChange={(e) => setFields((f) => ({ ...f, [field.key]: e.target.value }))} placeholder={field.placeholder} />}
              </div>
            ))}
            {type === "wifi" && (
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={!!fields.hidden} onChange={(e) => setFields((f) => ({ ...f, hidden: e.target.checked }))} className="size-4 accent-[hsl(var(--primary))]" />
                Hidden network
              </label>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Design</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Templates</Label>
              <div className="grid grid-cols-4 gap-2">
                {TEMPLATES.map((t) => (
                  <button key={t.name} onClick={() => applyTemplate(t)} title={t.name}
                    className="rounded-lg border-2 border-transparent p-2 text-[10px] font-medium hover:border-primary/40"
                    style={{ background: t.fg2 ? `linear-gradient(135deg,${t.fg},${t.fg2})` : t.fg, color: "#fff" }}>
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5"><Label htmlFor="qr-fg">Color</Label><Input id="qr-fg" type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 p-1" /></div>
              <div className="space-y-1.5"><Label htmlFor="qr-fg2">Gradient 2</Label><Input id="qr-fg2" type="color" value={fg2 || "#ffffff"} onChange={(e) => setFg2(e.target.value)} className="h-10 p-1" /></div>
              <div className="space-y-1.5"><Label htmlFor="qr-bg">Background</Label><Input id="qr-bg" type="color" value={bg} onChange={(e) => setBg(e.target.value)} disabled={transparent} className="h-10 p-1" /></div>
            </div>
            {fg2 && <Button variant="ghost" size="sm" onClick={() => setFg2("")}>Remove gradient</Button>}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label htmlFor="qr-dot">Dot style</Label>
                <Select id="qr-dot" value={dot} onChange={(e) => setDot(e.target.value as DotType)}>
                  {(["square", "rounded", "dots", "classy", "classy-rounded", "extra-rounded"] as DotType[]).map((x) => <option key={x} value={x}>{x}</option>)}
                </Select>
              </div>
              <div className="space-y-1.5"><Label htmlFor="qr-corner">Corner / eye shape</Label>
                <Select id="qr-corner" value={corner} onChange={(e) => setCorner(e.target.value as CornerType)}>
                  {(["square", "dot", "extra-rounded"] as CornerType[]).map((x) => <option key={x} value={x}>{x}</option>)}
                </Select>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" /> Transparent
              </label>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">ECC</span>
                <Select value={ecc} onChange={(e) => setEcc(e.target.value as typeof ecc)} className="h-8 w-16">
                  {(["L", "M", "Q", "H"] as const).map((l) => <option key={l} value={l}>{l}</option>)}
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qr-size">Size: {size}px</Label>
              <input id="qr-size" type="range" min={200} max={640} step={20} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <LogoInput onFile={onLogo} hasLogo={!!logo} />
                {logo && <Button variant="ghost" size="sm" onClick={() => setLogo(null)}>Remove</Button>}
              </div>
              <div className="space-y-1.5"><Label htmlFor="qr-caption">Frame caption</Label><Input id="qr-caption" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Scan me" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit space-y-4">
        <Card>
          <CardHeader><CardTitle>Live preview</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {!value.trim() && (
              <p className="w-full rounded-lg bg-amber-500/10 px-3 py-2 text-center text-xs font-medium text-amber-600 dark:text-amber-400">
                Fill in the content above — this QR code is a placeholder until then.
              </p>
            )}
            <div className="rounded-2xl border border-border p-3" style={{ background: transparent ? "repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%) 50%/16px 16px" : "#fff" }}>
              <div ref={holderRef} aria-label="Generated QR code" />
              {caption && <p className="mt-1 text-center text-sm font-medium text-slate-700">{caption}</p>}
            </div>
            <div className="grid w-full grid-cols-2 gap-2">
              <Button size="sm" onClick={() => download("png")}><Download /> PNG</Button>
              <Button size="sm" variant="outline" onClick={() => download("svg")}><Download /> SVG</Button>
              <Button size="sm" variant="outline" onClick={downloadPdf} disabled={busy}><Download /> PDF</Button>
              <Button size="sm" variant="outline" onClick={downloadZip} disabled={busy}><Download /> ZIP</Button>
              <Button size="sm" variant="outline" onClick={copyImage}>{copied ? <Check className="text-emerald-500" /> : <Copy />} Copy</Button>
              <Button size="sm" variant="outline" onClick={share}>{shared ? <Check className="text-emerald-500" /> : <Share2 />} Share</Button>
            </div>
            <Button size="sm" variant="ghost" className="w-full" onClick={saveToHistory}><Star className="size-4" /> Save to history</Button>
            <p className="text-center text-xs text-muted-foreground">Exports at high resolution — print ready.</p>
          </CardContent>
        </Card>

        {history.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-sm">History</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              {history.map((h, i) => (
                <button key={i} onClick={() => { setType("text"); setFields({ text: h }); }}
                  className="block w-full truncate rounded-lg px-2 py-1.5 text-left text-xs hover:bg-secondary" title={h}>
                  {h}
                </button>
              ))}
              <Button variant="ghost" size="sm" className="mt-1 w-full" onClick={() => setHistory([])}>Clear history</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function LogoInput({ onFile, hasLogo }: { onFile: (f?: File) => void; hasLogo: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      <Button variant="outline" size="sm" onClick={() => ref.current?.click()} className={cn(hasLogo && "border-primary/40")}>
        <Upload /> {hasLogo ? "Logo ✓" : "Logo"}
      </Button>
    </>
  );
}
