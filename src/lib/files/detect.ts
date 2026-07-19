export type FileCategory =
  | "image" | "pdf" | "video" | "audio" | "document" | "spreadsheet" | "archive" | "code" | "unknown";

export interface DetectedAction {
  label: string;
  href: string;
}

export interface Detected {
  category: FileCategory;
  label: string;
  icon: string; // lucide-react icon name
  actions: DetectedAction[];
}

const EXT_MAP: Record<string, FileCategory> = {
  png: "image", jpg: "image", jpeg: "image", webp: "image", gif: "image", bmp: "image", avif: "image", svg: "image", ico: "image", heic: "image",
  pdf: "pdf",
  mp4: "video", webm: "video", mov: "video", avi: "video", mkv: "video",
  mp3: "audio", wav: "audio", ogg: "audio", m4a: "audio", flac: "audio",
  doc: "document", docx: "document", txt: "document", rtf: "document", odt: "document",
  csv: "spreadsheet", xls: "spreadsheet", xlsx: "spreadsheet", ods: "spreadsheet", tsv: "spreadsheet",
  zip: "archive", rar: "archive", "7z": "archive", tar: "archive", gz: "archive",
  js: "code", ts: "code", jsx: "code", tsx: "code", json: "code", html: "code", css: "code", py: "code", java: "code", xml: "code", md: "code", yml: "code", yaml: "code",
};

const CATEGORY_META: Record<FileCategory, { label: string; icon: string; actions: DetectedAction[] }> = {
  image: {
    label: "Image", icon: "Image",
    actions: [
      { label: "Compress", href: "/tools/image-compressor" },
      { label: "Resize", href: "/tools/image-resizer" },
      { label: "Convert to JPG", href: "/tools/png-to-jpg" },
      { label: "Convert to WebP", href: "/tools/png-to-webp" },
      { label: "Crop & edit", href: "/tools/image-studio" },
      { label: "Bulk process", href: "/tools/bulk-image-processor" },
    ],
  },
  pdf: {
    label: "PDF", icon: "FileText",
    actions: [
      { label: "Compress", href: "/tools/pdf-compress" },
      { label: "Merge", href: "/tools/pdf-merge" },
      { label: "Split", href: "/tools/pdf-split" },
      { label: "Rotate & more", href: "/tools/pdf-studio" },
    ],
  },
  video: {
    label: "Video", icon: "Video",
    actions: [{ label: "Make a QR to share it", href: "/tools/qr-code-for-video" }, { label: "Request a video tool", href: "/community?compose=tool" }],
  },
  audio: {
    label: "Audio", icon: "Music",
    actions: [{ label: "Request an audio tool", href: "/community?compose=tool" }],
  },
  document: {
    label: "Document", icon: "FileType",
    actions: [{ label: "Create an invoice", href: "/tools/invoice-maker" }, { label: "Make a letterhead", href: "/tools/letterhead-maker" }, { label: "Word/count tools", href: "/tools/word-counter" }],
  },
  spreadsheet: {
    label: "Spreadsheet", icon: "Table",
    actions: [{ label: "Bulk QR from CSV", href: "/tools/qr-generator" }, { label: "Excel formula helper", href: "/tools/excel-formula-generator" }],
  },
  archive: {
    label: "Archive", icon: "FileArchive",
    actions: [{ label: "Browse tools", href: "/tools" }],
  },
  code: {
    label: "Code / Text", icon: "Code2",
    actions: [{ label: "Format JSON", href: "/tools/json-formatter" }, { label: "Base64 encode", href: "/tools/base64-encoder" }, { label: "Diff checker", href: "/tools/diff-checker" }, { label: "Developer tools", href: "/collections/developer-studio" }],
  },
  unknown: {
    label: "File", icon: "File",
    actions: [{ label: "Browse all tools", href: "/tools" }, { label: "Request a tool", href: "/community?compose=tool" }],
  },
};

export function detectFile(file: File): Detected {
  const ext = file.name.includes(".") ? file.name.split(".").pop()!.toLowerCase() : "";
  let category: FileCategory = EXT_MAP[ext] ?? "unknown";
  if (category === "unknown") {
    if (file.type.startsWith("image/")) category = "image";
    else if (file.type === "application/pdf") category = "pdf";
    else if (file.type.startsWith("video/")) category = "video";
    else if (file.type.startsWith("audio/")) category = "audio";
    else if (file.type.startsWith("text/")) category = "code";
  }
  const meta = CATEGORY_META[category];
  return { category, label: meta.label, icon: meta.icon, actions: meta.actions };
}

export function formatBytes(b: number): string {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}
