"use client";

import { useCallback, useState } from "react";
import { showToast } from "@/components/ui/toaster";
import { downloadBlob } from "@/lib/utils";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GenerationHistoryPanel } from "@/components/tools/generation-history-panel";

const SAMPLE = ["https://techtoolscenter.com", "UPI-ID: rustabh@upi", "WIFI:T:WPA;S:HomeNet;P:mypassword123;;", "tel:+919999999999"];

interface QrItem {
  id: string;
  label: string;
  dataUrl: string;
}

export default function BulkQrGenerator() {
  const [input, setInput] = useState("");
  const [size, setSize] = useState(300);
  const [margin, setMargin] = useState(2);
  const [items, setItems] = useState<QrItem[]>([]);
  const [busy, setBusy] = useState(false);
  const { history, add, remove, clear } = useGenerationHistory("uh:history:bulk-qr-generator");

  const lines = input.split("\n").map((l) => l.trim()).filter(Boolean);

  const generate = useCallback(async () => {
    if (lines.length === 0) return;
    setBusy(true);
    try {
      const QRCode = (await import("qrcode")).default;
      const results: QrItem[] = [];
      for (let i = 0; i < lines.length; i++) {
        const dataUrl = await QRCode.toDataURL(lines[i], {
          width: size,
          margin,
          color: { dark: "#000000", light: "#ffffff" },
        });
        results.push({ id: `${Date.now()}-${i}`, label: lines[i], dataUrl });
      }
      setItems(results);
      add(lines.join(" | "), `${results.length} QR codes`);
      showToast(`Generated ${results.length} QR codes`);
    } catch {
      showToast("Couldn't generate QR codes — check your input and try again", "error");
    } finally {
      setBusy(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, size, margin, add]);

  const downloadZip = useCallback(async () => {
    if (items.length === 0) return;
    setBusy(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      items.forEach((item, i) => {
        const base64 = item.dataUrl.split(",")[1];
        const safeName = item.label.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 40) || `qr-${i + 1}`;
        zip.file(`${String(i + 1).padStart(2, "0")}-${safeName}.png`, base64, { base64: true });
      });
      const blob = await zip.generateAsync({ type: "blob" });
      downloadBlob(blob, "bulk-qr-codes.zip");
      showToast(`Downloaded ${items.length} QR codes as ZIP`);
    } catch {
      showToast("Couldn't build the ZIP — try again", "error");
    } finally {
      setBusy(false);
    }
  }, [items]);

  const loadSample = () => setInput(SAMPLE.join("\n"));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Values</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="qr-values">One value per line — URLs, text, UPI IDs, phone numbers, Wi-Fi strings, anything</Label>
            <Textarea
              id="qr-values"
              className="min-h-[220px] font-mono text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={"https://example.com\nhello@example.com\ntel:+911234567890"}
            />
            <p className="text-xs text-muted-foreground">{lines.length} value{lines.length === 1 ? "" : "s"} entered</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="qr-size">Size (px)</Label>
              <input
                id="qr-size"
                type="number"
                min={100}
                max={1000}
                step={50}
                value={size}
                onChange={(e) => setSize(Math.min(1000, Math.max(100, parseInt(e.target.value) || 300)))}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qr-margin">Margin</Label>
              <input
                id="qr-margin"
                type="number"
                min={0}
                max={10}
                value={margin}
                onChange={(e) => setMargin(Math.min(10, Math.max(0, parseInt(e.target.value) || 0)))}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={generate} disabled={lines.length === 0 || busy}>{busy ? "Generating…" : `Generate ${lines.length || ""} QR codes`}</Button>
            <Button variant="outline" onClick={loadSample}>Load sample</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Generated codes</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Add values and generate to see your QR codes here…</p>
          ) : (
            <>
              <div className="grid max-h-[420px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
                {items.map((item) => (
                  <div key={item.id} className="rounded-xl border border-border p-2 text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.dataUrl} alt={`QR code for ${item.label}`} className="mx-auto aspect-square w-full rounded-lg bg-white" />
                    <p className="mt-1.5 truncate text-[11px] text-muted-foreground" title={item.label}>{item.label}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={downloadZip} disabled={busy}>Download all as ZIP</Button>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>History</CardTitle></CardHeader>
        <CardContent>
          <GenerationHistoryPanel history={history} onRemove={remove} onClear={clear} />
        </CardContent>
      </Card>
    </div>
  );
}
