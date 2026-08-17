"use client";

import { useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { ActionBar } from "@/components/tools/action-bar";
import { formatCurrency, slugify, localDateISO, downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { LogoEditor, fitContain, readLogoFile, type LogoAlign } from "@/components/tools/logo-editor";

type PaymentMode = "Cash" | "Cheque" | "Bank Transfer" | "UPI";

interface RentReceiptState {
  landlordName: string;
  landlordAddress: string;
  landlordPan: string;
  tenantName: string;
  tenantAddress: string;
  rentAmount: number;
  rentPeriodFrom: string;
  rentPeriodTo: string;
  paymentMode: PaymentMode;
  city: string;
  receiptDate: string;
  logo?: string;
  logoW?: number;
  logoH?: number;
  logoAlign: LogoAlign;
  logoSize: number; // 30-70, % of the logo's max box width
}

const PAYMENT_MODES: PaymentMode[] = ["Cash", "Cheque", "Bank Transfer", "UPI"];

function todayIso(): string {
  return localDateISO();
}

function monthStartIso(): string {
  const d = new Date();
  return localDateISO(new Date(d.getFullYear(), d.getMonth(), 1));
}

function monthEndIso(): string {
  const d = new Date();
  return localDateISO(new Date(d.getFullYear(), d.getMonth() + 1, 0));
}

function initial(): RentReceiptState {
  return {
    landlordName: "Landlord Name",
    landlordAddress: "",
    landlordPan: "",
    tenantName: "Tenant Name",
    tenantAddress: "",
    rentAmount: 15000,
    rentPeriodFrom: monthStartIso(),
    rentPeriodTo: monthEndIso(),
    paymentMode: "Bank Transfer",
    city: "",
    receiptDate: todayIso(),
    logoAlign: "center",
    logoSize: 45,
  };
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return `${TENS[tens]}${ones ? " " + ONES[ones] : ""}`;
}

function threeDigits(n: number): string {
  const hundred = Math.floor(n / 100);
  const rest = n % 100;
  const parts: string[] = [];
  if (hundred) parts.push(`${ONES[hundred]} Hundred`);
  if (rest) parts.push(twoDigits(rest));
  return parts.join(" ");
}

// Converts a non-negative integer to words using the Indian numbering system (Lakh/Crore).
function numberToWordsIndian(value: number): string {
  const n = Math.floor(Math.abs(value));
  if (n === 0) return "Zero";
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const hundred = n % 1000;
  const parts: string[] = [];
  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${threeDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${threeDigits(thousand)} Thousand`);
  if (hundred) parts.push(threeDigits(hundred));
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function amountInWords(amount: number): string {
  if (!isFinite(amount) || amount <= 0) return "";
  return `Rupees ${numberToWordsIndian(amount)} Only`;
}

export default function RentReceiptGenerator() {
  const { value: stored, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<RentReceiptState>(
    "uh:rent-receipt",
    initial()
  );
  const value: RentReceiptState = {
    ...stored,
    logoAlign: stored.logoAlign ?? "center",
    logoSize: stored.logoSize ?? 45,
  };

  const patch = (p: Partial<RentReceiptState>) => set({ ...value, ...p });
  const [exporting, setExporting] = useState(false);
  const [bulkYear, setBulkYear] = useState(String(new Date().getFullYear()));
  const [bulkBusy, setBulkBusy] = useState(false);

  const onLogoUpload = (file: File) =>
    readLogoFile(
      file,
      (dataUrl, w, h) => patch({ logo: dataUrl, logoW: w, logoH: h }),
      (message) => showToast(message, "error"),
    );
  const removeLogo = () => patch({ logo: undefined, logoW: undefined, logoH: undefined });

  const words = useMemo(() => amountInWords(value.rentAmount), [value.rentAmount]);

  // Builds one receipt PDF as a jsPDF doc for an arbitrary period, reused by
  // both the single-month download and the bulk 12-month generator below —
  // the layout logic only needs to exist once.
  const buildReceiptDoc = async (period: { from: string; to: string; date: string }) => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const margin = 14;
    let y = 20;

    if (value.logo && value.logoW && value.logoH) {
      const boxW = 18 + (value.logoSize / 100) * 24;
      const fit = fitContain(value.logoW, value.logoH, boxW, 22);
      const x = value.logoAlign === "left" ? margin : value.logoAlign === "right" ? 196 - fit.w : 105 - fit.w / 2;
      doc.addImage(value.logo, "PNG", x, 14, fit.w, fit.h);
      y += fit.h + 6;
    }

    doc.setFontSize(16);
    doc.setTextColor(20, 20, 20);
    doc.text("RENT RECEIPT", 105, y, { align: "center" });
    y += 12;

    doc.setFontSize(11);
    doc.setTextColor(40);

    const bodyLine = `Received a sum of ${formatCurrency(value.rentAmount)}${
      words ? ` (${words})` : ""
    } from ${value.tenantName} towards rent of the premises situated at ${value.tenantAddress || "-"} for the period from ${formatDate(period.from)} to ${formatDate(period.to)}, paid via ${value.paymentMode}.`;
    const bodyLines = doc.splitTextToSize(bodyLine, 182);
    doc.text(bodyLines, margin, y);
    y += bodyLines.length * 6 + 8;

    doc.setFontSize(10);
    doc.text(`Landlord Name: ${value.landlordName}`, margin, y);
    y += 6;
    if (value.landlordAddress) {
      const addrLines = doc.splitTextToSize(`Landlord Address: ${value.landlordAddress}`, 182);
      doc.text(addrLines, margin, y);
      y += addrLines.length * 6;
    }
    if (value.landlordPan) {
      doc.text(`Landlord PAN: ${value.landlordPan}`, margin, y);
      y += 6;
    }
    y += 4;

    doc.text(`Place: ${value.city || "-"}`, margin, y);
    doc.text(`Date: ${formatDate(period.date)}`, 140, y);
    y += 24;

    doc.line(140, y, 196, y);
    y += 5;
    doc.setFontSize(9);
    doc.text("Landlord's Signature", 140, y);

    y += 14;
    doc.setFontSize(8);
    doc.setTextColor(110);
    const stampNote =
      "Note: A ₹1 revenue stamp is required if rent is paid in cash and the receipt amount exceeds ₹5,000 (as per Indian Stamp Act practice) — affix and sign across it physically after printing.";
    const stampLines = doc.splitTextToSize(stampNote, 182);
    doc.text(stampLines, margin, y);

    return doc;
  };

  const downloadPdf = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const doc = await buildReceiptDoc({ from: value.rentPeriodFrom, to: value.rentPeriodTo, date: value.receiptDate });
      const month = value.rentPeriodFrom ? value.rentPeriodFrom.slice(0, 7) : todayIso().slice(0, 7);
      doc.save(`rent-receipt-${slugify(value.tenantName || "tenant")}-${month}.pdf`);
      showToast("Downloaded rent receipt PDF");
    } catch {
      showToast("Couldn't generate the PDF — try again", "error");
    } finally {
      setExporting(false);
    }
  };

  // Most people reach for this tool once a year for HRA proof, which needs
  // one receipt per month, not one — building all 12 by hand (change dates,
  // download, repeat) is the actual friction this tool should remove.
  const downloadAllMonths = async () => {
    const year = parseInt(bulkYear, 10);
    if (!Number.isInteger(year) || year < 2000 || year > 2100) {
      showToast("Enter a valid 4-digit year", "error");
      return;
    }
    setBulkBusy(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (let month = 0; month < 12; month++) {
        const from = localDateISO(new Date(year, month, 1));
        const to = localDateISO(new Date(year, month + 1, 0));
        const doc = await buildReceiptDoc({ from, to, date: to });
        const monthTag = from.slice(0, 7);
        zip.file(`rent-receipt-${slugify(value.tenantName || "tenant")}-${monthTag}.pdf`, doc.output("blob"));
      }
      const out = await zip.generateAsync({ type: "blob" });
      downloadBlob(out, `rent-receipts-${slugify(value.tenantName || "tenant")}-${year}.zip`);
      showToast(`Downloaded all 12 months for ${year}`);
    } catch {
      showToast("Couldn't generate the ZIP — try again", "error");
    } finally {
      setBulkBusy(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Landlord details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="rr-landlord-name">Landlord name</Label>
              <Input
                id="rr-landlord-name"
                value={value.landlordName}
                onChange={(e) => patch({ landlordName: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rr-landlord-address">Landlord address</Label>
              <Textarea
                id="rr-landlord-address"
                value={value.landlordAddress}
                onChange={(e) => patch({ landlordAddress: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rr-landlord-pan">Landlord PAN (optional)</Label>
              <Input
                id="rr-landlord-pan"
                value={value.landlordPan}
                onChange={(e) => patch({ landlordPan: e.target.value.toUpperCase() })}
                placeholder="ABCDE1234F"
              />
              <p className="text-xs text-muted-foreground">
                Required if annual rent exceeds ₹1,00,000 — ask your employer.
              </p>
            </div>
            <LogoEditor logo={value.logo} align={value.logoAlign} size={value.logoSize} onUpload={onLogoUpload} onRemove={removeLogo}
              onAlign={(a) => patch({ logoAlign: a })} onSize={(n) => patch({ logoSize: n })} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tenant &amp; rent details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="rr-tenant-name">Tenant name</Label>
              <Input
                id="rr-tenant-name"
                value={value.tenantName}
                onChange={(e) => patch({ tenantName: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rr-tenant-address">Rented property address</Label>
              <Textarea
                id="rr-tenant-address"
                value={value.tenantAddress}
                onChange={(e) => patch({ tenantAddress: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rr-rent-amount">Monthly rent (₹)</Label>
              <Input
                id="rr-rent-amount"
                type="number"
                inputMode="decimal"
                value={value.rentAmount}
                onChange={(e) => patch({ rentAmount: Number(e.target.value) })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="rr-period-from">Rent period from</Label>
                <Input
                  id="rr-period-from"
                  type="date"
                  value={value.rentPeriodFrom}
                  onChange={(e) => patch({ rentPeriodFrom: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="rr-period-to">Rent period to</Label>
                <Input
                  id="rr-period-to"
                  type="date"
                  value={value.rentPeriodTo}
                  onChange={(e) => patch({ rentPeriodTo: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rr-payment-mode">Payment mode</Label>
              <Select
                id="rr-payment-mode"
                value={value.paymentMode}
                onChange={(e) => patch({ paymentMode: e.target.value as PaymentMode })}
              >
                {PAYMENT_MODES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receipt details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="rr-city">City (place of signing)</Label>
              <Input id="rr-city" value={value.city} onChange={(e) => patch({ city: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rr-receipt-date">Receipt date</Label>
              <Input
                id="rr-receipt-date"
                type="date"
                value={value.receiptDate}
                onChange={(e) => patch({ receiptDate: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <ActionBar
          onUndo={undo}
          onRedo={redo}
          onReset={() => reset()}
          onDownload={downloadPdf}
          downloadLabel={exporting ? "Generating…" : "Download PDF"}
          canUndo={canUndo}
          canRedo={canRedo}
        />

        <Card>
          <CardHeader>
            <CardTitle>Generate a full year (all 12 months)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Most employers ask for one rent receipt per month as HRA proof — generate all 12 for a year as a
              ZIP instead of downloading them one at a time.
            </p>
            <div className="flex items-end gap-2">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="rr-bulk-year">Year</Label>
                <Input
                  id="rr-bulk-year"
                  type="number"
                  value={bulkYear}
                  onChange={(e) => setBulkYear(e.target.value)}
                  placeholder="2026"
                />
              </div>
              <button
                type="button"
                onClick={downloadAllMonths}
                disabled={bulkBusy}
                className="h-10 shrink-0 rounded-xl border border-primary bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {bulkBusy ? "Generating 12 receipts…" : "Download all 12 (ZIP)"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <div className="rounded-2xl border border-border bg-white p-8 text-slate-900 shadow-sm">
          {value.logo && (
            <div className={`mb-4 flex ${value.logoAlign === "left" ? "justify-start" : value.logoAlign === "right" ? "justify-end" : "justify-center"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value.logo} alt="" className="max-h-16 object-contain" style={{ maxWidth: `${value.logoSize}%` }} />
            </div>
          )}
          <h3 className="text-center text-lg font-bold text-indigo-600">RENT RECEIPT</h3>

          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            Received a sum of{" "}
            <span className="font-semibold text-slate-900">{formatCurrency(value.rentAmount)}</span>
            {words && <span className="text-slate-600"> ({words})</span>} from{" "}
            <span className="font-semibold text-slate-900">{value.tenantName || "-"}</span> towards rent of
            the premises situated at{" "}
            <span className="font-semibold text-slate-900">{value.tenantAddress || "-"}</span> for the
            period from <span className="font-semibold text-slate-900">{formatDate(value.rentPeriodFrom)}</span>{" "}
            to <span className="font-semibold text-slate-900">{formatDate(value.rentPeriodTo)}</span>, paid
            via <span className="font-semibold text-slate-900">{value.paymentMode}</span>.
          </p>

          <div className="mt-5 space-y-1 text-xs text-slate-600">
            <p>
              Landlord Name: <span className="font-medium text-slate-800">{value.landlordName || "-"}</span>
            </p>
            {value.landlordAddress && (
              <p>
                Landlord Address:{" "}
                <span className="font-medium text-slate-800">{value.landlordAddress}</span>
              </p>
            )}
            {value.landlordPan && (
              <p>
                Landlord PAN: <span className="font-medium text-slate-800">{value.landlordPan}</span>
              </p>
            )}
          </div>

          <div className="mt-6 flex items-end justify-between text-xs text-slate-600">
            <p>Place: {value.city || "-"}</p>
            <p>Date: {formatDate(value.receiptDate)}</p>
          </div>

          <div className="mt-10 flex justify-end">
            <div className="w-40 border-t border-slate-400 pt-1 text-center text-xs text-slate-600">
              Landlord&apos;s Signature
            </div>
          </div>

          <p className="mt-8 text-[10px] leading-relaxed text-slate-400">
            Note: A ₹1 revenue stamp is required if rent is paid in cash and the receipt amount exceeds
            ₹5,000 (as per Indian Stamp Act practice) — affix and sign across it physically after printing.
          </p>
        </div>
      </div>
    </div>
  );
}
