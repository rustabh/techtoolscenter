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

/** Parses a single CSV line into fields, respecting double-quoted fields (which may contain the delimiter, quotes, newlines). */
function parseCsvLine(line: string, delimiter: string): string[] {
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
    } else if (ch === delimiter) {
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

// CSV has no data types — every field is text. To produce genuinely useful
// JSON (numbers as numbers, not "30" as a string), infer a type using JSON's
// own number grammar, which conveniently also protects values that only
// look numeric — a leading zero (zip codes, some phone numbers like
// "0712345678") never matches, so those correctly stay strings.
const JSON_NUMBER = /^-?(0|[1-9]\d*)(\.\d+)?$/;
function inferValue(raw: string): CsvValue {
  if (raw === "") return "";
  if (raw === "true") return true;
  if (raw === "false") return false;
  if (JSON_NUMBER.test(raw)) return Number(raw);
  return raw;
}

function csvToJson(csv: string, delimiter: string): string {
  const rows = splitCsvRows(csv.trim()).filter((r) => r.length > 0);
  if (rows.length === 0) {
    return "[]";
  }
  const headers = parseCsvLine(rows[0], delimiter).map((h) => h.trim());
  const records: CsvRecord[] = [];

  for (let i = 1; i < rows.length; i++) {
    const fields = parseCsvLine(rows[i], delimiter);
    const record: CsvRecord = {};
    headers.forEach((header, idx) => {
      record[header] = inferValue(fields[idx] ?? "");
    });
    records.push(record);
  }

  return JSON.stringify(records, null, 2);
}

function csvEscapeField(value: CsvValue, delimiter: string): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (str.includes('"') || str.includes(delimiter) || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Flattens a nested value into `out` under `prefix`, using dot-notation for
// nested objects (address.city, address.zip). Arrays are kept as a single
// JSON-string cell rather than expanded into indexed columns — indexing
// would make each record produce a different column set depending on its
// array length, which breaks CSV's fixed-column shape far worse than a
// compact JSON string in one cell does.
function flattenValue(value: unknown, prefix: string, out: CsvRecord) {
  if (value === null) { out[prefix] = null; return; }
  if (Array.isArray(value)) { out[prefix] = JSON.stringify(value); return; }
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);
    if (keys.length === 0) { out[prefix] = "{}"; return; }
    for (const key of keys) flattenValue(obj[key], `${prefix}.${key}`, out);
    return;
  }
  out[prefix] = value as CsvValue;
}

function jsonToCsv(json: string, delimiter: string): string {
  const parsed: unknown = JSON.parse(json);

  if (!Array.isArray(parsed)) {
    throw new Error("Input must be a JSON array of objects");
  }

  const records = parsed as unknown[];
  const flatRecords: CsvRecord[] = records.map((item) => {
    if (typeof item !== "object" || item === null || Array.isArray(item)) {
      throw new Error("Input must be a JSON array of objects (each item must be an object, not a primitive or array)");
    }
    const obj = item as Record<string, unknown>;
    const flat: CsvRecord = {};
    for (const key of Object.keys(obj)) flattenValue(obj[key], key, flat);
    return flat;
  });

  const headerSet = new Set<string>();
  flatRecords.forEach((record) => {
    Object.keys(record).forEach((key) => headerSet.add(key));
  });
  const headers = Array.from(headerSet);

  const lines: string[] = [];
  lines.push(headers.map((h) => csvEscapeField(h, delimiter)).join(delimiter));
  flatRecords.forEach((record) => {
    lines.push(headers.map((header) => csvEscapeField(record[header] ?? "", delimiter)).join(delimiter));
  });

  return lines.join("\n");
}

const DELIMITERS = [
  { id: "comma", label: "Comma (,)", char: "," },
  { id: "semicolon", label: "Semicolon (;)", char: ";" },
  { id: "tab", label: "Tab", char: "\t" },
  { id: "pipe", label: "Pipe (|)", char: "|" },
] as const;

export default function CsvJsonConverter() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:csv-json-converter", DEFAULT_CSV);
  const [mode, setMode] = useState<Mode>("csv-to-json");
  const [delimiter, setDelimiter] = useState<string>(",");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const { copied, copy } = useCopy();

  const run = () => {
    try {
      const result = mode === "csv-to-json" ? csvToJson(value, delimiter) : jsonToCsv(value, delimiter);
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
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">CSV delimiter</label>
            <div className="flex flex-wrap gap-1.5">
              {DELIMITERS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDelimiter(d.char)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                    delimiter === d.char ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
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
