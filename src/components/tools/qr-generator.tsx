"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { Upload, Download, Copy, Share2, Check } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";

type QrType =
  | "url" | "text" | "email" | "phone" | "sms" | "whatsapp" | "wifi" | "vcard"
  | "location" | "upi" | "event" | "youtube" | "instagram" | "facebook"
  | "linkedin" | "x" | "telegram" | "googlemaps" | "crypto";

const TYPES: { id: QrType; label: string }[] = [
  { id: "url", label: "Website URL" }, { id: "text", label: "Plain Text" },
  { id: "email", label: "Email" }, { id: "phone", label: "Phone" },
  { id: "sms", label: "SMS" }, { id: "whatsapp", label: "WhatsApp" },
  { id: "wifi", label: "WiFi" }, { id: "vcard", label: "Business Card (vCard)" },
  { id: "location", label: "Location (Geo)" }, { id: "googlemaps", label: "Google Maps" },
  { id: "upi", label: "UPI Payment" }, { id: "event", label: "Event" },
  { id: "youtube", label: "YouTube" }, { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" }, { id: "linkedin", label: "LinkedIn" },
  { id: "x", label: "X (Twitter)" }, { id: "telegram", label: "Telegram" },
  { id: "crypto", label: "Crypto Wallet" },
];

type Fields = Record<string, any>;

function buildValue(type: QrType, f: Fields): string {
  const g = (k: string) => (f[k] ?? "").toString().trim();
  switch (type) {
    case "url": return g("url") || "";
    case "text": return g("text");
    case "email": return `mailto:${g("to")}?subject=${encodeURIComponent(g("subject"))}&body=${encodeURIComponent(g("body"))}`;
    case "phone": return `tel:${g("phone")}`;
    case "sms": return `SMSTO:${g("phone")}:${g("message")}`;
    case "whatsapp": return `https://wa.me/${g("phone").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(g("message"))}`;
    case "wifi": return `WIFI:T:${g("encryption") || "WPA"};S:${g("ssid")};P:${g("password")};H:${f.hidden ? "true" : "false"};;`;
    case "vcard":
      return [
        "BEGIN:VCARD", "VERSION:3.0", `N:${g("name")}`, `FN:${g("name")}`,
        g("org") && `ORG:${g("org")}`, g("title") && `TITLE:${g("title")}`,
        g("phone") && `TEL:${g("phone")}`, g("email") && `EMAIL:${g("email")}`,
        g("url") && `URL:${g("url")}`, "END:VCARD",
      ].filter(Boolean).join("\n");
    case "location": return `geo:${g("lat")},${g("lng")}`;
    case "googlemaps": return `https://maps.google.com/?q=${encodeURIComponent(g("query"))}`;
    case "upi": return `upi://pay?pa=${g("vpa")}&pn=${encodeURIComponent(g("name"))}${g("amount") ? `&am=${g("amount")}` : ""}&cu=INR`;
    case "event":
      return [
        "BEGIN:VEVENT", `SUMMARY:${g("title")}`, g("location") && `LOCATION:${g("location")}`,
        g("start") && `DTSTART:${g("start").replace(/[-:]/g, "").replace("T", "T")}00`,
        g("end") && `DTEND:${g("end").replace(/[-:]/g, "").replace("T", "T")}00`, "END:VEVENT",
      ].filter(Boolean).join("\n");
    case "youtube": return g("url");
    case "instagram": return `https://instagram.com/${g("handle").replace("@", "")}`;
    case "facebook": return g("url");
    case "linkedin": return g("url");
    case "x": return `https://x.com/${g("handle").replace("@", "")}`;
    case "telegram": return `https://t.me/${g("handle").replace("@", "")}`;
    case "crypto": return g("address");
    default: return "";
  }
}

const FORMS: Record<QrType, { key: string; label: string; type?: string; placeholder?: string; area?: boolean }[]> = {
  url: [{ key: "url", label: "URL", placeholder: "https://techtoolscenter.com" }],
  text: [{ key: "text", label: "Text", area: true, placeholder: "Any text…" }],
  email: [{ key: "to", label: "To" }, { key: "subject", label: "Subject" }, { key: "body", label: "Body", area: true }],
  phone: [{ key: "phone", label: "Phone number", placeholder: "+1 555 010 0000" }],
  sms: [{ key: "phone", label: "Phone number" }, { key: "message", label: "Message", area: true }],
  whatsapp: [{ key: "phone", label: "Number (with country code)" }, { key: "message", label: "Message", area: true }],
  wifi: [{ key: "ssid", label: "Network name (SSID)" }, { key: "password", label: "Password" }, { key: "encryption", label: "Encryption (WPA/WEP/nopass)", placeholder: "WPA" }],
  vcard: [{ key: "name", label: "Full name" }, { key: "org", label: "Organisation" }, { key: "title", label: "Job title" }, { key: "phone", label: "Phone" }, { key: "email", label: "Email" }, { key: "url", label: "Website" }],
  location: [{ key: "lat", label: "Latitude" }, { key: "lng", label: "Longitude" }],
  googlemaps: [{ key: "query", label: "Place or address" }],
  upi: [{ key: "vpa", label: "UPI ID (VPA)", placeholder: "name@bank" }, { key: "name", label: "Payee name" }, { key: "amount", label: "Amount (optional)", type: "number" }],
  event: [{ key: "title", label: "Event title" }, { key: "location", label: "Location" }, { key: "start", label: "Start", type: "datetime-local" }, { key: "end", label: "End", type: "datetime-local" }],
  youtube: [{ key: "url", label: "YouTube URL", placeholder: "https://youtube.com/watch?v=…" }],
  instagram: [{ key: "handle", label: "Username", placeholder: "@handle" }],
  facebook: [{ key: "url", label: "Facebook page URL" }],
  linkedin: [{ key: "url", label: "LinkedIn URL" }],
  x: [{ key: "handle", label: "Username", placeholder: "@handle" }],
  telegram: [{ key: "handle", label: "Username", placeholder: "@handle" }],
  crypto: [{ key: "address", label: "Wallet address" }],
};

export default function QrGenerator() {
  const [type, setType] = useState<QrType>("url");
  const [fields, setFields] = useState<Fields>({ url: "https://techtoolscenter.com" });
  const [fg, setFg] = useState("#0b1220");
  const [bg, setBg] = useState("#ffffff");
  const [transparent, setTransparent] = useState(false);
  const [size, setSize] = useState(320);
  const [ecc, setEcc] = useState<"L" | "M" | "Q" | "H">("M");
  const [logo, setLogo] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState("");
  const { copied, copy } = useCopy();
  const [shared, setShared] = useState(false);

  const value = useMemo(() => buildValue(type, fields), [type, fields]);

  const render = async (target: HTMLCanvasElement, px: number) => {
    if (!value) return;
    await QRCode.toCanvas(target, value, {
      width: px,
      margin: 2,
      errorCorrectionLevel: logo ? "H" : ecc,
      color: { dark: fg, light: transparent ? "#0000" : bg },
    });
    if (logo) {
      const ctx = target.getContext("2d")!;
      const img = new Image();
      img.src = logo;
      await img.decode().catch(() => {});
      const s = px * 0.22;
      const pos = (px - s) / 2;
      const pad = px * 0.02;
      if (!transparent) {
        ctx.fillStyle = bg;
        ctx.fillRect(pos - pad, pos - pad, s + pad * 2, s + pad * 2);
      }
      ctx.drawImage(img, pos, pos, s, s);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    render(canvasRef.current, size)
      .then(() => setError(""))
      .catch(() => setError("Content is too long for a QR code."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, fg, bg, transparent, size, ecc, logo]);

  const exportCanvas = async (px: number) => {
    const c = document.createElement("canvas");
    await render(c, px);
    return c;
  };

  const downloadPng = async () => {
    const c = await exportCanvas(1024);
    c.toBlob((b) => b && downloadBlob(b, "qr-code.png"));
  };
  const downloadSvg = async () => {
    const svg = await QRCode.toString(value, { type: "svg", margin: 2, color: { dark: fg, light: transparent ? "#0000" : bg } });
    downloadBlob(new Blob([svg], { type: "image/svg+xml" }), "qr-code.svg");
  };
  const copyImage = async () => {
    const c = await exportCanvas(512);
    c.toBlob(async (b) => {
      if (!b) return;
      try {
        await navigator.clipboard.write([new (window as any).ClipboardItem({ "image/png": b })]);
      } catch { /* clipboard image unsupported */ }
    });
  };
  const share = async () => {
    try {
      const c = await exportCanvas(512);
      c.toBlob(async (b) => {
        if (!b) return;
        const file = new File([b], "qr-code.png", { type: "image/png" });
        if ((navigator as any).canShare?.({ files: [file] })) {
          await (navigator as any).share({ files: [file], title: "QR Code" });
          setShared(true);
          setTimeout(() => setShared(false), 2000);
        }
      });
    } catch { /* share cancelled */ }
  };

  const onLogo = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Content</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>QR type</Label>
              <Select value={type} onChange={(e) => { setType(e.target.value as QrType); setFields({}); }}>
                {TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </Select>
            </div>
            {FORMS[type].map((field) => (
              <div key={field.key} className="space-y-1.5">
                <Label>{field.label}</Label>
                {field.area ? (
                  <Textarea value={fields[field.key] ?? ""} onChange={(e) => setFields((f) => ({ ...f, [field.key]: e.target.value }))} placeholder={field.placeholder} />
                ) : (
                  <Input type={field.type ?? "text"} value={fields[field.key] ?? ""} onChange={(e) => setFields((f) => ({ ...f, [field.key]: e.target.value }))} placeholder={field.placeholder} />
                )}
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Foreground</Label><Input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 p-1" /></div>
              <div className="space-y-1.5"><Label>Background</Label><Input type="color" value={bg} onChange={(e) => setBg(e.target.value)} disabled={transparent} className="h-10 p-1" /></div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
                Transparent background
              </label>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Error correction</span>
                <Select value={ecc} onChange={(e) => setEcc(e.target.value as typeof ecc)} className="h-8 w-20">
                  {(["L", "M", "Q", "H"] as const).map((l) => <option key={l} value={l}>{l}</option>)}
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Size: {size}px</Label>
              <input type="range" min={160} max={512} step={16} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
            </div>
            <div className="flex items-center gap-2">
              <LogoInput onFile={onLogo} hasLogo={!!logo} />
              {logo && <Button variant="ghost" size="sm" onClick={() => setLogo(null)}>Remove logo</Button>}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <Card>
          <CardHeader><CardTitle>Live preview</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center gap-5">
            <div className="rounded-2xl border border-border p-4" style={{ background: transparent ? "repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%) 50%/16px 16px" : "#fff" }}>
              <canvas ref={canvasRef} className="max-w-full rounded" aria-label="Generated QR code" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
              <Button size="sm" onClick={downloadPng} disabled={!!error}><Download /> PNG</Button>
              <Button size="sm" variant="outline" onClick={downloadSvg} disabled={!!error}><Download /> SVG</Button>
              <Button size="sm" variant="outline" onClick={copyImage} disabled={!!error}>{copied ? <Check className="text-emerald-500" /> : <Copy />} Copy</Button>
              <Button size="sm" variant="outline" onClick={share} disabled={!!error}>{shared ? <Check className="text-emerald-500" /> : <Share2 />} Share</Button>
            </div>
            <p className="text-center text-xs text-muted-foreground">Exports at 1024px — print & high-resolution ready.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LogoInput({ onFile, hasLogo }: { onFile: (f?: File) => void; hasLogo: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      <Button variant="outline" size="sm" onClick={() => ref.current?.click()}>
        <Upload /> {hasLogo ? "Change logo" : "Upload logo"}
      </Button>
    </>
  );
}
