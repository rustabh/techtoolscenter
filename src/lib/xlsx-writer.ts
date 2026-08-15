/**
 * Minimal, dependency-free .xlsx (OOXML SpreadsheetML) writer — builds just
 * enough of the format for a real multi-sheet workbook of text/number cells.
 * No formulas, styles or shared-strings table (cells use inline strings,
 * which the spec allows and which sidesteps shared-string indexing entirely).
 *
 * Uses `jszip` (already a project dependency) to package the parts — OOXML
 * is a plain ZIP container, unlike ODF it needs no special first "mimetype"
 * entry. Written instead of pulling in the `xlsx` (SheetJS) npm package,
 * whose only version published to npm (0.18.5) carries an unpatched
 * critical prototype-pollution advisory and an unpatched high-severity
 * ReDoS advisory in its parsing path — avoidable entirely for a write-only
 * use case like this one.
 */

function colLetter(n: number): string {
  let s = "";
  let num = n;
  while (num > 0) {
    const rem = (num - 1) % 26;
    s = String.fromCharCode(65 + rem) + s;
    num = Math.floor((num - 1) / 26);
  }
  return s;
}

function xmlEscapeText(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ""); // strip control chars invalid in XML 1.0
}

const NUMERIC_CELL = /^-?\d+(\.\d+)?$/;
// Comma-thousands-separated numbers (1,234.56 / 12,34,567.89) — the standard
// format in the bank-statement and invoice PDFs this tool is built for.
// Without this, every amount column imports as text instead of a number,
// which breaks SUM/sort/filter in Excel — the entire point of the export.
const THOUSANDS_NUMERIC_CELL = /^-?\d{1,3}(,\d{2,3})+(\.\d+)?$/;

function cellXml(ref: string, raw: string): string {
  const value = raw.trim();
  if (!value) return "";
  if (NUMERIC_CELL.test(value)) return `<c r="${ref}"><v>${value}</v></c>`;
  if (THOUSANDS_NUMERIC_CELL.test(value)) return `<c r="${ref}"><v>${value.replace(/,/g, "")}</v></c>`;
  return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${xmlEscapeText(raw)}</t></is></c>`;
}

function sheetXml(rows: string[][]): string {
  const rowsXml = rows
    .map((row, ri) => {
      const r = ri + 1;
      const cells = row.map((val, ci) => cellXml(`${colLetter(ci + 1)}${r}`, val ?? "")).join("");
      return `<row r="${r}">${cells}</row>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rowsXml}</sheetData></worksheet>`;
}

/** Excel sheet names: max 31 chars, and a fixed set of characters are disallowed. */
function safeSheetName(name: string, fallback: string): string {
  const cleaned = name.replace(/[\\/?*[\]:]/g, " ").trim().slice(0, 31);
  return cleaned || fallback;
}

export interface XlsxSheet {
  name: string;
  rows: string[][];
}

/** Builds a real, minimal, valid .xlsx workbook (one or more sheets) entirely client-side. */
export async function buildXlsx(sheets: XlsxSheet[]): Promise<Blob> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  const safeSheets = sheets.map((s, i) => ({ ...s, name: safeSheetName(s.name, `Sheet${i + 1}`) }));

  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${safeSheets
      .map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`)
      .join("")}</Types>`
  );

  zip.file(
    "_rels/.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`
  );

  zip.file(
    "xl/workbook.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${safeSheets
      .map((s, i) => `<sheet name="${xmlEscapeText(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`)
      .join("")}</sheets></workbook>`
  );

  zip.file(
    "xl/_rels/workbook.xml.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${safeSheets
      .map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`)
      .join("")}</Relationships>`
  );

  safeSheets.forEach((s, i) => {
    zip.file(`xl/worksheets/sheet${i + 1}.xml`, sheetXml(s.rows));
  });

  return zip.generateAsync({
    type: "blob",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}
