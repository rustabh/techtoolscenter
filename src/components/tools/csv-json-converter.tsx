"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { downloadBlob } from "@/lib/utils";

type Mode = "csv-to-json" | "json-to-csv";

type CsvValue = string | number | boolean | null;
type CsvRecord = Record<string, CsvValue>;

const DEFAULT_CSV = `name,age,city
"Smith, John",30,"New York"
Jane Doe,25,Boston`;

/** Parses a single CSV line into fields, respecting double-quoted fields (which may contain commas, quotes, newlines). */
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      fields.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

/** Splits full CSV text into logical rows, treating quoted newlines as part of the same row. */
function splitCsvRows(text: string): string[] {
  const rows: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      current += ch;
    } else if (ch === "\n" && !inQuotes) {
      rows.push(current);
      current = "";
    } else if (ch === "\r") {
      // skip; \n handles the row break
    } else {
      current += ch;
    }
  }
  if (current.length > 0) rows.push(current);
  return rows;
}

function csvToJson(csv: string): string {
  const rows = splitCsvRows(csv.trim()).filter((r) => r.length > 0);
  if (rows.length === 0) {
    return "[]";
  }
  const headers = parseCsvLine(rows[0]).map((h) => h.trim());
  const records: CsvRecord[] = [];

  for (let i = 1; i < rows.length; i++) {
    const fields = parseCsvLine(rows[i]);
    const record: CsvRecord = {};
    headers.forEach((header, idx) => {
      record[header] = fields[idx] ?? "";
    });
    records.push(record);
  }

  return JSON.stringify(records, null, 2);
}

function csvEscapeField(value: CsvValue): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function jsonToCsv(json: string): string {
  const parsed: unknown = JSON.parse(json);

  if (!Array.isArray(parsed)) {
    throw new Error("Input must be a JSON array of flat objects (no nested objects/arrays)");
  }

  const records = parsed as unknown[];
  const flatRecords: CsvRecord[] = records.map((item) => {
    if (typeof item !== "object" || item === null || Array.isArray(item)) {
      throw new Error("Input must be a JSON array of flat objects (no nested objects/arrays)");
    }
    const obj = item as Record<string, unknown>;
    const flat: CsvRecord = {};
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (typeof val === "object" && val !== null) {
        throw new Error("Input must be a JSON array of flat objects (no nested objects/arrays)");
      }
      flat[key] = val as CsvValue;
    }
    return flat;
  });

  const headerSet = new Set<string>();
  flatRecords.forEach((record) => {
    Object.keys(record).forEach((key) => headerSet.add(key));
  });
  const headers = Array.from(headerSet);

  const lines: string[] = [];
  lines.push(headers.map(csvEscapeField).join(","));
  flatRecords.forEach((record) => {
    lines.push(headers.map((header) => csvEscapeField(record[header] ?? "")).join(","));
  });

  return lines.join("\n");
}

export default function CsvJsonConverter() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:csv-json-converter", DEFAULT_CSV);
  const [mode, setMode] = useState<Mode>("csv-to-json");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const { copied, copy } = useCopy();

  const run = () => {
    try {
      const result = mode === "csv-to-json" ? csvToJson(value) : jsonToCsv(value);
      setOutput(result);
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const downloadFilename = mode === "csv-to-json" ? "converted.json" : "converted.csv";
  const downloadMime = mode === "csv-to-json" ? "application/json" : "text/csv";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { key: "csv-to-json", label: "CSV → JSON" },
                { key: "json-to-csv", label: "JSON → CSV" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.key}
                type="button"
                aria-pressed={mode === opt.key}
                onClick={() => setMode(opt.key)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                  mode === opt.key ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <Textarea
            aria-label={mode === "csv-to-json" ? "CSV input" : "JSON input"}
            className="min-h-[320px] font-mono text-xs"
            value={value}
            onChange={(e) => set(e.target.value)}
            placeholder={mode === "csv-to-json" ? "Paste CSV here…" : "Paste JSON array here…"}
          />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={run}>Convert</Button>
            <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
          </div>
        </CardContent>
      </Card>
      <Card className={error ? "border-destructive/50" : ""}>
        <CardContent className="space-y-4 pt-6">
          {error ? (
            <p className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">Conversion failed: {error}</p>
          ) : (
            <pre className="min-h-[320px] overflow-auto rounded-xl bg-secondary/50 p-4 text-xs">
              {output || "Converted output appears here…"}
            </pre>
          )}
          {output && (
            <ActionBar
              onCopy={() => copy(output)}
              copied={copied}
              onDownload={() => downloadBlob(new Blob([output], { type: downloadMime }), downloadFilename)}
              downloadLabel="Download"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
