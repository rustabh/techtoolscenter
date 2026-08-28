import type { CommunityPost } from "./types";

/**
 * Seed community posts — everyone sees these. User submissions and votes are
 * layered on top from localStorage. Seeds give the portal real content: a
 * public roadmap, announcements of released tools, and popular requests.
 */
export const seedPosts: CommunityPost[] = [
  // Announcements / recently released
  { id: "seed-rel-converter", type: "announcement", title: "Released: Image Converter & Image Resizer", description: "You can now convert between PNG, JPG and WEBP and resize images to any size or social preset — both free and private.", status: "released", votes: 64, createdAt: "2026-07-18", author: "TechToolsCenter", seeded: true },
  { id: "seed-rel-pdf", type: "announcement", title: "Released: Real PDF compression with target size", description: "The PDF Compressor now truly shrinks files — pick a compression level or a target size and it compresses until it fits.", status: "released", votes: 71, createdAt: "2026-07-18", author: "TechToolsCenter", seeded: true },
  { id: "seed-rel-blog", type: "announcement", title: "Released: The TechToolsCenter Blog", description: "Guides, tutorials and tips — with a fresh batch of articles published every day.", status: "released", votes: 42, createdAt: "2026-07-16", author: "TechToolsCenter", seeded: true },

  // Roadmap (planned / in-progress)
  { id: "seed-road-cloud", type: "roadmap", title: "Cloud sync for your workspace", description: "Optionally sync your saved projects, templates and history across devices with an account.", status: "planned", votes: 88, createdAt: "2026-07-15", author: "TechToolsCenter", seeded: true },
  { id: "seed-road-ai", type: "roadmap", title: "Live AI models in AI Studio", description: "Connect real AI models to AI Studio for even smarter generation, on top of the built-in engine.", status: "in-progress", votes: 96, createdAt: "2026-07-14", author: "TechToolsCenter", seeded: true },
  { id: "seed-road-ocr", type: "announcement", title: "Released: OCR — extract text from scanned PDFs", description: "The OCR Text Extractor turns scanned PDFs and images into searchable, copyable text right in your browser.", status: "released", votes: 73, createdAt: "2026-07-13", author: "TechToolsCenter", seeded: true },

  // Popular tool requests
  { id: "seed-req-bg", type: "tool-request", title: "AI background remover", description: "Shipped — the Background Remover uses a real on-device AI model to remove the background from any photo automatically, no upload required.", category: "Image", useCase: "Product photos and profile pictures", priority: "high", status: "released", votes: 112, createdAt: "2026-07-12", author: "Community", seeded: true },
  { id: "seed-req-merge-img", type: "tool-request", title: "Combine images into one PDF", description: "Shipped — the Image to PDF tool (and PDF Studio) let you select multiple images and export them as a single PDF.", category: "Documents", useCase: "Submitting scanned documents", priority: "medium", status: "released", votes: 57, createdAt: "2026-07-11", author: "Community", seeded: true },
  { id: "seed-req-sign", type: "tool-request", title: "Draw & sign a PDF", description: "Shipped — the PDF Sign tool lets you draw, type or upload a signature and place it on any PDF, no printing needed.", category: "Documents", useCase: "Signing contracts", priority: "high", status: "released", votes: 69, createdAt: "2026-07-10", author: "Community", seeded: true },

  // Feature requests
  { id: "seed-feat-dark", type: "feature", title: "Remember my favourite tools order", description: "Shipped — use the arrow buttons on each favorited tool card (on the Tools page) to reorder your favorites; the order is saved and remembered.", status: "released", votes: 24, createdAt: "2026-07-09", author: "Community", seeded: true },
  { id: "seed-feat-batch-qr", type: "feature", title: "Bulk QR code generation", description: "Shipped — the Bulk QR Code Generator creates many QR codes at once from a pasted list or CSV.", status: "released", votes: 48, createdAt: "2026-07-08", author: "Community", seeded: true },

  // Ideas
  { id: "seed-idea-templates", type: "idea", title: "Community template gallery", description: "Share and reuse invoice and brand templates made by other users.", status: "open", votes: 33, createdAt: "2026-07-07", author: "Community", seeded: true },

  // Bugs
  { id: "seed-bug-sample", type: "bug", title: "Example: report anything that looks off", description: "Found something not working as expected? Post it here with the tool name and what happened — we read every report.", status: "open", votes: 5, createdAt: "2026-07-06", author: "TechToolsCenter", seeded: true },
];
