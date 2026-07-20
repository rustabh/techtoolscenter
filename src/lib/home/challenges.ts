/**
 * Daily "Today's Challenge" pool. One is picked per calendar day (see daily.ts)
 * and links straight to the tool that solves it.
 */
export interface Challenge {
  title: string;
  difficulty: "Easy" | "Medium" | "Fun";
  time: string; // estimated time
  toolSlug: string; // links to /tools/<slug>
}

export const challenges: Challenge[] = [
  { title: "Compress an image under 100 KB", difficulty: "Easy", time: "1 min", toolSlug: "image-compressor-under-100kb" },
  { title: "Merge 3 PDFs into one", difficulty: "Easy", time: "1 min", toolSlug: "pdf-merge" },
  { title: "Generate a QR code", difficulty: "Easy", time: "30 sec", toolSlug: "qr-generator" },
  { title: "Create a passport-size photo", difficulty: "Medium", time: "2 min", toolSlug: "image-compressor-for-passport-photo" },
  { title: "Convert a PNG to WebP", difficulty: "Easy", time: "30 sec", toolSlug: "png-to-webp" },
  { title: "Generate a business-card QR (vCard)", difficulty: "Medium", time: "2 min", toolSlug: "qr-code-for-vcard" },
  { title: "Generate a WiFi QR code", difficulty: "Easy", time: "1 min", toolSlug: "qr-code-for-wifi" },
  { title: "Compress a PDF for email", difficulty: "Easy", time: "1 min", toolSlug: "compress-pdf-for-email" },
  { title: "Resize an image for Instagram", difficulty: "Easy", time: "1 min", toolSlug: "resize-image-for-instagram" },
  { title: "Make a GST invoice", difficulty: "Medium", time: "3 min", toolSlug: "invoice-maker" },
  { title: "Create a UPI payment QR", difficulty: "Easy", time: "1 min", toolSlug: "qr-code-for-upi" },
  { title: "Convert a JPG to PNG", difficulty: "Easy", time: "30 sec", toolSlug: "jpg-to-png" },
  { title: "Format messy JSON", difficulty: "Fun", time: "30 sec", toolSlug: "json-formatter" },
  { title: "Generate a strong password", difficulty: "Easy", time: "15 sec", toolSlug: "password-generator" },
  { title: "Count words in your text", difficulty: "Fun", time: "15 sec", toolSlug: "word-counter" },
];
