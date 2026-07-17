import { tools, type Tool, type ToolCategory } from "./tools";

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const collections: Collection[] = [
  { id: "everyday-essentials", slug: "everyday-essentials", name: "Everyday Essentials", description: "Timers, notes, random pickers and small tools you reach for daily.", icon: "LayoutGrid" },
  { id: "calculator-hub", slug: "calculator-hub", name: "Calculator Hub", description: "Every calculator in one place — from GST and EMI to BMI and tips.", icon: "Calculator" },
  { id: "converter-hub", slug: "converter-hub", name: "Converter Hub", description: "Convert units, measurements and colours instantly.", icon: "ArrowLeftRight" },
  { id: "text-studio", slug: "text-studio", name: "Text Studio", description: "Fancy fonts, symbols, counters and text transformers.", icon: "Type" },
  { id: "business-toolkit", slug: "business-toolkit", name: "Business Toolkit", description: "Invoices, quotations, receipts, salary slips and resumes.", icon: "Briefcase" },
  { id: "pdf-toolkit", slug: "pdf-toolkit", name: "PDF Toolkit", description: "Merge, split and compress PDF files — privately in your browser.", icon: "FileText" },
  { id: "image-studio", slug: "image-studio", name: "Image Studio", description: "Compress and optimise images without uploading them.", icon: "Image" },
  { id: "qr-studio", slug: "qr-studio", name: "QR Studio", description: "Premium QR codes and barcodes for any purpose.", icon: "QrCode" },
  { id: "brand-studio", slug: "brand-studio", name: "Brand Studio", description: "Brand kits, favicons and brand assets from any URL.", icon: "Palette" },
  { id: "social-media-studio", slug: "social-media-studio", name: "Social Media Studio", description: "Social graphics, hashtags and everything for your feed.", icon: "Share2" },
  { id: "creative-studio", slug: "creative-studio", name: "Creative Studio", description: "Website mockups and app store screenshots.", icon: "Wand2" },
  { id: "developer-studio", slug: "developer-studio", name: "Developer Studio", description: "Encoders, formatters, generators and everyday dev utilities.", icon: "Code2" },
  { id: "ai-studio", slug: "ai-studio", name: "AI Studio", description: "Smart generators for prompts, emails, content and more.", icon: "Bot" },
  { id: "seo-studio", slug: "seo-studio", name: "SEO Studio", description: "Meta tags, schema, SERP previews and on-page SEO helpers.", icon: "Rocket" },
];

const CATEGORY_COLLECTION: Record<ToolCategory, string> = {
  Business: "business-toolkit",
  Documents: "pdf-toolkit",
  Text: "text-studio",
  Calculators: "calculator-hub",
  Image: "image-studio",
  Developer: "developer-studio",
  AI: "ai-studio",
  SEO: "seo-studio",
  Everyday: "everyday-essentials",
  Generators: "developer-studio",
  Creative: "creative-studio",
};

// Explicit overrides where a tool belongs to a more specific collection than its category.
const OVERRIDES: Record<string, string> = {
  "qr-generator": "qr-studio",
  "barcode-generator": "qr-studio",
  "favicon-generator": "brand-studio",
  "brand-kit-generator": "brand-studio",
  "social-media-kit": "social-media-studio",
  "hashtag-generator": "social-media-studio",
  "unit-converter": "converter-hub",
  "color-converter": "converter-hub",
  "random-number-generator": "everyday-essentials",
  "password-generator": "everyday-essentials",
};

export function collectionOf(tool: Tool): string {
  return OVERRIDES[tool.slug] ?? CATEGORY_COLLECTION[tool.category];
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getToolsByCollection(slug: string): Tool[] {
  return tools.filter((t) => collectionOf(t) === slug);
}

export function collectionForTool(tool: Tool): Collection {
  return getCollection(collectionOf(tool))!;
}

export function collectionsWithCounts() {
  return collections
    .map((c) => ({ ...c, count: getToolsByCollection(c.slug).length }))
    .filter((c) => c.count > 0);
}
