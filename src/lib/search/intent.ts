import { tools, getTool, searchText, type Tool } from "../tools";
import { getLanding, landingPages } from "../landing/landing";
import { collectionOf, getCollection } from "../collections";

/**
 * Intent-aware search. Instead of matching exact tool names, it maps natural
 * language — problems, questions, file types and use cases — to the right tool
 * or SEO landing page. Falls back to fuzzy matching for everything else.
 */
export interface SearchResult {
  slug: string;
  name: string;
  icon: string;
  reason?: string; // why it matched ("Reduce PDF size")
}

interface Intent {
  keys: string[]; // trigger phrases (substring match, lowercase)
  targets: string[]; // tool or landing slugs, best first
  reason: string;
}

const INTENTS: Intent[] = [
  // PDF size / compression
  { keys: ["pdf too large", "pdf too big", "reduce pdf", "compress pdf", "shrink pdf", "pdf size", "make pdf smaller", "pdf heavy"], targets: ["pdf-compress"], reason: "Reduce PDF size" },
  { keys: ["compress pdf for email", "pdf for email", "email pdf"], targets: ["compress-pdf-for-email", "pdf-compress"], reason: "PDF for email" },
  { keys: ["pdf under", "pdf 100kb", "pdf 200kb", "pdf 500kb", "pdf 1mb"], targets: ["compress-pdf-under-500kb", "pdf-compress"], reason: "PDF to a target size" },
  { keys: ["merge pdf", "combine pdf", "join pdf"], targets: ["pdf-merge", "pdf-studio"], reason: "Merge PDFs" },
  { keys: ["split pdf", "extract pages", "separate pdf"], targets: ["pdf-split", "pdf-studio"], reason: "Split / extract pages" },
  { keys: ["rotate pdf", "pdf tools", "watermark pdf", "sign pdf", "protect pdf"], targets: ["pdf-studio"], reason: "PDF toolkit" },

  // Image size / compression
  { keys: ["image too large", "image too big", "reduce image", "compress image", "photo too large", "shrink image", "image size", "reduce photo size", "image heavy", "reduce file size"], targets: ["image-compressor"], reason: "Reduce image size" },
  { keys: ["image under 100kb", "under 100kb", "image 100kb"], targets: ["image-compressor-under-100kb", "image-compressor"], reason: "Image under 100KB" },
  { keys: ["image under 50kb", "under 50kb", "20kb", "10kb"], targets: ["image-compressor-under-50kb", "image-compressor"], reason: "Image to a target size" },
  { keys: ["passport photo", "passport size", "passport picture"], targets: ["image-compressor-for-passport-photo", "image-resizer"], reason: "Passport photo" },
  { keys: ["aadhar", "aadhaar", "aadhar card"], targets: ["image-compressor-for-aadhar-card", "image-compressor"], reason: "Aadhaar upload" },
  { keys: ["pan card", "pan photo"], targets: ["image-compressor-for-pan-card", "image-compressor"], reason: "PAN card upload" },
  { keys: ["government form", "govt form", "sarkari form"], targets: ["image-compressor-for-government-forms", "image-compressor"], reason: "Government form upload" },

  // Image resize / enlarge / edit
  { keys: ["resize image", "image dimensions", "change image size", "resize photo"], targets: ["image-resizer"], reason: "Resize image" },
  { keys: ["enlarge image", "make image bigger", "increase image size", "upscale", "upscaler"], targets: ["image-resizer", "image-studio"], reason: "Enlarge image" },
  { keys: ["blurry", "sharpen", "enhance image", "improve photo", "brightness", "contrast"], targets: ["image-studio"], reason: "Adjust / enhance image" },
  { keys: ["instagram size", "resize for instagram", "instagram post"], targets: ["resize-image-for-instagram", "image-resizer"], reason: "Instagram size" },
  { keys: ["crop", "rotate image", "flip image"], targets: ["image-studio"], reason: "Crop & edit" },
  { keys: ["remove background", "background remove", "transparent background", "cut out"], targets: ["image-studio"], reason: "Background tools" },
  { keys: ["bulk image", "many images", "batch image", "hundreds of images", "compress many"], targets: ["bulk-image-processor"], reason: "Bulk image processing" },

  // Image convert
  { keys: ["png to jpg", "png to jpeg", "convert png"], targets: ["png-to-jpg", "image-converter"], reason: "PNG → JPG" },
  { keys: ["jpg to png", "jpeg to png"], targets: ["jpg-to-png", "image-converter"], reason: "JPG → PNG" },
  { keys: ["to webp", "png to webp", "webp"], targets: ["png-to-webp", "image-converter"], reason: "Convert to WebP" },
  { keys: ["convert image", "change format", "image format"], targets: ["image-converter"], reason: "Convert image format" },

  // QR
  { keys: ["qr for wifi", "wifi qr", "qr wifi", "wifi code"], targets: ["qr-code-for-wifi", "qr-generator"], reason: "WiFi QR code" },
  { keys: ["qr for upi", "upi qr", "payment qr", "qr payment"], targets: ["qr-code-for-upi", "qr-generator"], reason: "Payment / UPI QR" },
  { keys: ["qr for menu", "menu qr", "restaurant qr"], targets: ["qr-code-for-menu", "qr-generator"], reason: "Menu QR code" },
  { keys: ["qr for whatsapp", "whatsapp qr"], targets: ["qr-code-for-whatsapp", "qr-generator"], reason: "WhatsApp QR" },
  { keys: ["business card qr", "vcard", "contact qr"], targets: ["qr-code-for-vcard", "qr-generator"], reason: "Business card QR" },
  { keys: ["qr code", "generate qr", "make qr", "qr generator"], targets: ["qr-generator"], reason: "QR generator" },
  { keys: ["barcode"], targets: ["barcode-generator"], reason: "Barcode generator" },

  // Business docs
  { keys: ["invoice", "bill", "billing", "gst invoice", "tax invoice"], targets: ["invoice-maker"], reason: "Create an invoice" },
  { keys: ["quotation", "quote", "estimate for client"], targets: ["quotation-generator"], reason: "Create a quotation" },
  { keys: ["estimate"], targets: ["estimate-maker"], reason: "Create an estimate" },
  { keys: ["purchase order", "p.o.", "po for vendor"], targets: ["purchase-order-generator"], reason: "Purchase order" },
  { keys: ["receipt", "payment receipt", "proof of payment"], targets: ["receipt-generator"], reason: "Create a receipt" },
  { keys: ["delivery challan", "challan"], targets: ["delivery-challan"], reason: "Delivery challan" },
  { keys: ["credit note"], targets: ["credit-note"], reason: "Credit note" },
  { keys: ["debit note"], targets: ["debit-note"], reason: "Debit note" },
  { keys: ["packing slip", "packing list"], targets: ["packing-slip"], reason: "Packing slip" },
  { keys: ["letterhead", "company letter"], targets: ["letterhead-maker"], reason: "Letterhead" },
  { keys: ["salary slip", "payslip", "pay slip"], targets: ["salary-slip-generator"], reason: "Salary slip" },
  { keys: ["resume", "cv", "curriculum"], targets: ["resume-builder"], reason: "Resume builder" },

  // Calculators
  { keys: ["gst", "gst calculator", "tax calculator"], targets: ["gst-calculator", "calculator-hub"], reason: "GST calculator" },
  { keys: ["emi", "loan", "installment"], targets: ["emi-calculator", "calculator-hub"], reason: "EMI calculator" },
  { keys: ["bmi", "body mass"], targets: ["bmi-calculator"], reason: "BMI calculator" },
  { keys: ["percentage", "percent"], targets: ["percentage-calculator"], reason: "Percentage calculator" },
  { keys: ["age", "date of birth", "how old"], targets: ["age-calculator"], reason: "Age calculator" },
  { keys: ["calculator", "calculate", "math"], targets: ["calculator-hub", "scientific-calculator"], reason: "Calculators" },
  { keys: ["convert units", "unit converter", "km to miles", "kg to"], targets: ["unit-converter"], reason: "Unit converter" },

  // Text / dev
  { keys: ["word count", "character count", "count words"], targets: ["word-counter"], reason: "Word counter" },
  { keys: ["fancy font", "stylish text", "cool text", "font generator"], targets: ["font-style-generator"], reason: "Fancy fonts" },
  { keys: ["instagram font", "insta font", "instagram bio font"], targets: ["instagram-font-generator", "font-style-generator"], reason: "Instagram fonts" },
  { keys: ["password", "strong password", "generate password"], targets: ["password-generator"], reason: "Password generator" },
  { keys: ["json", "format json", "beautify json"], targets: ["json-formatter"], reason: "JSON formatter" },
  { keys: ["base64", "encode", "decode"], targets: ["base64-encoder"], reason: "Base64 encoder" },
  { keys: ["uuid", "guid"], targets: ["uuid-generator"], reason: "UUID generator" },
  { keys: ["hash", "md5", "sha"], targets: ["hash-generator"], reason: "Hash generator" },
  { keys: ["case convert", "uppercase", "lowercase", "title case"], targets: ["case-converter"], reason: "Case converter" },
  { keys: ["emoji"], targets: ["emoji-studio"], reason: "Emoji studio" },
  { keys: ["color", "hex", "rgb", "colour"], targets: ["color-converter"], reason: "Colour converter" },

  // Brand / creative
  { keys: ["favicon", "site icon"], targets: ["favicon-generator"], reason: "Favicon generator" },
  { keys: ["brand kit", "brand colors", "brand from url", "logo colors"], targets: ["brand-kit-generator"], reason: "Brand studio" },
  { keys: ["mockup", "device mockup", "screenshot frame"], targets: ["website-mockup-generator"], reason: "Mockup studio" },
  { keys: ["app store screenshot", "play store screenshot", "app screenshot"], targets: ["app-screenshot-generator"], reason: "App store screenshots" },
];

function resolve(slug: string, reason?: string): SearchResult | null {
  const tool = getTool(slug);
  if (tool) return { slug: tool.slug, name: tool.name, icon: tool.icon, reason };
  const landing = getLanding(slug);
  if (landing) {
    const core = getTool(landing.core);
    return { slug: landing.slug, name: landing.h1, icon: core?.icon ?? "Sparkles", reason };
  }
  return null;
}

export function smartSearch(query: string, limit = 10): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const seen = new Set<string>();
  const out: SearchResult[] = [];
  const add = (r: SearchResult | null) => {
    if (r && !seen.has(r.slug)) { seen.add(r.slug); out.push(r); }
  };

  // 1) Intent hits (understanding the problem/use case).
  for (const intent of INTENTS) {
    if (intent.keys.some((k) => q.includes(k) || k.includes(q))) {
      intent.targets.forEach((slug) => add(resolve(slug, intent.reason)));
    }
    if (out.length >= limit) break;
  }

  // 2) Fuzzy tool name/keyword match.
  if (out.length < limit) {
    const tokens = q.split(/\s+/).filter(Boolean);
    const scored = tools
      .map((t) => {
        const text = searchText(t);
        const colName = getCollection(collectionOf(t))?.name.toLowerCase() ?? "";
        const hay = `${text} ${colName}`;
        const score = tokens.reduce((s, tok) => s + (hay.includes(tok) ? 1 : 0), 0);
        return { t, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);
    for (const { t } of scored) {
      add({ slug: t.slug, name: t.name, icon: t.icon });
      if (out.length >= limit) break;
    }
  }

  // 3) Matching landing pages by slug words.
  if (out.length < limit) {
    for (const l of landingPages) {
      if (l.slug.replace(/-/g, " ").includes(q) || l.h1.toLowerCase().includes(q)) add(resolve(l.slug));
      if (out.length >= limit) break;
    }
  }

  return out.slice(0, limit);
}

export type { Tool };
