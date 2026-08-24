export type ToolCategory =
  | "Business"
  | "Documents"
  | "Generators"
  | "Text"
  | "Calculators"
  | "Image"
  | "Developer"
  | "Creative"
  | "AI"
  | "SEO"
  | "Everyday";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ToolExample {
  title: string;
  input: string;
  output: string;
}

export interface ToolHowTo {
  steps?: string[];
  tips?: string[];
  mistakes?: string[];
  bestPractices?: string[];
}

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Tool {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: ToolCategory;
  icon: string; // lucide-react icon name
  keywords: string[];
  addedOn: string; // ISO date, drives "Recently Added"
  popular?: boolean;
  faq: FaqItem[];
  // Optional registry metadata (derived by the SEO engine when omitted).
  seoTitle?: string;
  seoDescription?: string;
  status?: "stable" | "beta" | "new";
  version?: string;
  // --- Structured SEO fields (all optional; the SEO engine fills the gaps) ---
  tags?: string[];
  difficulty?: Difficulty;
  useCases?: string[];
  supportedFormats?: string[];
  inputTypes?: string[];
  outputTypes?: string[];
  relatedSlugs?: string[]; // explicit related tools; auto-derived otherwise
  ogImage?: string; // absolute or root-relative; defaults to dynamic OG image
  examples?: ToolExample[];
  howTo?: ToolHowTo;
}

/** Stable identifier — the slug is the tool ID. */
export function toolId(tool: Tool): string {
  return tool.slug;
}

/** SEO title, from override or derived from the name. */
export function seoTitle(tool: Tool): string {
  return tool.seoTitle ?? `${tool.name} — Free Online ${tool.name}`;
}

/** SEO description, from override or the short description. */
export function seoDescription(tool: Tool): string {
  return tool.seoDescription ?? tool.description;
}

export function toolStatus(tool: Tool): "stable" | "beta" | "new" {
  return tool.status ?? (isNewTool(tool) ? "new" : "stable");
}

export function toolVersion(tool: Tool): string {
  return tool.version ?? "1.0.0";
}

/** All searchable text for a tool: name, description, category, tags/keywords. */
export function searchText(tool: Tool): string {
  return [tool.name, tool.description, tool.category, ...tool.keywords].join(" ").toLowerCase();
}

export const categories: {
  id: ToolCategory;
  label: string;
  description: string;
  icon: string;
}[] = [
  { id: "Business", label: "Business & Finance", description: "Invoices, quotations, receipts and salary documents.", icon: "Briefcase" },
  { id: "Documents", label: "PDF & Documents", description: "Merge, split, compress and manage PDF files.", icon: "FileText" },
  { id: "Generators", label: "Generators", description: "QR codes, barcodes, passwords and more.", icon: "Sparkles" },
  { id: "Text", label: "Text Tools", description: "Count words, convert case and manipulate text.", icon: "Type" },
  { id: "Calculators", label: "Calculators", description: "GST, EMI, age and everyday calculations.", icon: "Calculator" },
  { id: "Image", label: "Image Tools", description: "Compress and optimize your images in-browser.", icon: "Image" },
  { id: "Developer", label: "Developer Tools", description: "Encoders, formatters, hashes and everyday dev utilities.", icon: "Code2" },
  { id: "Creative", label: "Creative Studio", description: "Website mockups, app screenshots and social media kits.", icon: "Wand2" },
  { id: "AI", label: "AI Studio", description: "Smart generators for prompts, emails, hashtags and more.", icon: "Bot" },
  { id: "SEO", label: "SEO Studio", description: "Meta tags, schema, SERP previews and on-page SEO helpers.", icon: "Rocket" },
  { id: "Everyday", label: "Everyday Tools", description: "Timers, notes, rulers and small tools you use every day.", icon: "LayoutGrid" },
];

export const tools: Tool[] = [
  {
    slug: "ai-studio",
    name: "AI Studio",
    description: "Ten AI generators in one hub — prompts, meta, email, regex, SQL, hashtags & more.",
    longDescription:
      "One workspace for ten smart generators: Prompt, Meta, Email, Regex, SQL, Hashtag, Caption, Blog Outline, Slug and Excel Formula. Pick a generator, fill a few fields and get instant, structured output you can copy. Everything runs on a fast, private built-in engine right in your browser — no API keys, no sign-up, and your input never leaves your device.",
    category: "AI",
    icon: "Sparkles",
    keywords: ["ai studio", "ai tools", "prompt generator", "meta generator", "email generator", "regex generator", "sql generator", "hashtag generator", "caption generator", "blog outline", "slug generator", "excel formula"],
    addedOn: "2026-07-17",
    popular: true,
    faq: [
      { question: "Which generators are included?", answer: "Prompt, Meta, Email, Regex, SQL, Hashtag, Caption, Blog Outline, Slug and Excel Formula — all in one interface with a shared engine selector." },
      { question: "How does the engine work?", answer: "AI Studio runs on a fast, private built-in engine that generates output entirely in your browser using smart templates and rules — no API key, no sign-up, and none of your input ever leaves your device." },
    ],
  },
  {
    slug: "estimate-maker",
    name: "Estimate Maker",
    description: "Create professional cost estimates in 20 designs with tax breakdown & PDF.",
    longDescription:
      "Send clear, professional cost estimates to your clients. Choose from 20 designs, add line items, quantities and rates, a CGST/SGST/IGST or single tax breakdown, discounts and validity notes, then export a PDF or PNG or print. Add your logo, signature and a QR code — everything runs privately in your browser.",
    category: "Business",
    icon: "Calculator",
    keywords: ["estimate maker", "cost estimate", "estimate generator", "price estimate", "estimate template", "gst estimate"],
    addedOn: "2026-07-18",
    popular: true,
    faq: [
      { question: "How is an estimate different from a quotation?", answer: "An estimate is an approximate cost you expect a job to reach, while a quotation is a fixed price offer. Both can be created here — pick the tool that matches what you're sending." },
      { question: "Can I add tax to an estimate?", answer: "Yes. Choose CGST + SGST, IGST, a single VAT/tax line, or no tax, and each component is shown separately on the estimate and PDF." },
    ],
  },
  {
    slug: "purchase-order-generator",
    name: "Purchase Order Maker",
    description: "Create purchase orders for vendors in 20 designs with tax breakdown & PDF.",
    longDescription:
      "Raise professional purchase orders for your vendors. Choose from 20 designs, add vendor and delivery details, line items, quantities, rates, a CGST/SGST/IGST or single tax breakdown and terms, then export a PDF or PNG or print. Add your logo, signature and a QR code — all in your browser.",
    category: "Business",
    icon: "ClipboardList",
    keywords: ["purchase order", "purchase order maker", "PO generator", "po template", "vendor order", "gst purchase order"],
    addedOn: "2026-07-18",
    popular: true,
    faq: [
      { question: "What is a purchase order?", answer: "A purchase order (PO) is a document a buyer sends to a vendor to confirm an order — the items, quantities and agreed prices. It becomes a binding contract once the vendor accepts it." },
      { question: "Can I add my company logo and GSTIN?", answer: "Yes. Add your logo, both parties' GSTIN, a tax breakdown, signature and a QR code, then download a print-ready PDF or PNG." },
    ],
  },
  {
    slug: "delivery-challan",
    name: "Delivery Challan Maker",
    description: "Create GST delivery challans in 20 designs — items, quantities, PDF & print.",
    longDescription:
      "Generate professional delivery challans for goods dispatched without an immediate invoice. Choose from 20 designs, add consignor and consignee details, GSTIN, items and quantities, then export a PDF or PNG or print. Add your logo, signature, stamp and a QR code — everything runs privately in your browser.",
    category: "Business",
    icon: "Truck",
    keywords: ["delivery challan", "delivery challan maker", "gst challan", "dispatch note", "goods delivery", "challan format"],
    addedOn: "2026-07-18",
    popular: true,
    faq: [
      { question: "What is a delivery challan?", answer: "A delivery challan is a document that accompanies goods being transported when a tax invoice isn't issued at that moment — for example on job work, stock transfer or goods sent on approval." },
      { question: "Does it show prices?", answer: "A delivery challan focuses on items and quantities rather than pricing, so the layout keeps the goods list clear. You can still add all party and GSTIN details." },
    ],
  },
  {
    slug: "credit-note",
    name: "Credit Note Maker",
    description: "Create GST credit notes in 20 designs with tax breakdown, PDF & print.",
    longDescription:
      "Issue professional credit notes against returned goods, overcharges or post-sale adjustments. Choose from 20 designs, add party and GSTIN details, adjustment items and a CGST/SGST/IGST or single tax breakdown, then export a PDF or PNG or print. Add your logo, signature and a QR code — all in your browser.",
    category: "Business",
    icon: "FileMinus",
    keywords: ["credit note", "credit note maker", "gst credit note", "credit memo", "sales return", "credit note format"],
    addedOn: "2026-07-18",
    faq: [
      { question: "When do I issue a credit note?", answer: "You issue a credit note when you need to reduce the amount a customer owes — for returned goods, a price adjustment, or an overcharge on an earlier invoice." },
      { question: "Can I add a tax breakdown?", answer: "Yes. Choose CGST + SGST, IGST or a single tax line and each component is shown separately on the credit note and PDF." },
    ],
  },
  {
    slug: "debit-note",
    name: "Debit Note Maker",
    description: "Create GST debit notes in 20 designs with tax breakdown, PDF & print.",
    longDescription:
      "Raise professional debit notes for additional charges, short supply or upward price revisions. Choose from 20 designs, add party and GSTIN details, adjustment items and a CGST/SGST/IGST or single tax breakdown, then export a PDF or PNG or print. Add your logo, signature and a QR code — all in your browser.",
    category: "Business",
    icon: "FilePlus",
    keywords: ["debit note", "debit note maker", "gst debit note", "debit memo", "supplementary invoice", "debit note format"],
    addedOn: "2026-07-18",
    faq: [
      { question: "When do I issue a debit note?", answer: "You issue a debit note when you need to increase the amount owed — for extra charges, under-billing on an earlier invoice, or an upward price revision." },
      { question: "Can I add GST to a debit note?", answer: "Yes. Add both parties' GSTIN and choose CGST + SGST, IGST or a single tax line — each component appears separately on the document and PDF." },
    ],
  },
  {
    slug: "packing-slip",
    name: "Packing Slip Maker",
    description: "Create packing slips in 20 designs — items, quantities, PDF & print.",
    longDescription:
      "Generate clear packing slips to include with shipments. Choose from 20 designs, add sender and recipient details, SKUs, items and quantities, then export a PDF or PNG or print. Add your logo and a QR code — everything runs privately in your browser.",
    category: "Business",
    icon: "Package",
    keywords: ["packing slip", "packing slip maker", "packing list", "shipping slip", "dispatch list", "packing slip template"],
    addedOn: "2026-07-18",
    faq: [
      { question: "What is a packing slip?", answer: "A packing slip is a document included with a shipment that lists the items and quantities inside, so the recipient can verify the contents against their order." },
      { question: "Does it include prices?", answer: "A packing slip lists items and quantities rather than prices, keeping the focus on what's in the box. You can still add sender, recipient and SKU details." },
    ],
  },
  {
    slug: "letterhead-maker",
    name: "Letterhead Maker",
    description: "Create branded company letterheads in 20 designs — PDF, PNG & print.",
    longDescription:
      "Design a professional company letterhead in seconds. Choose from 20 designs, add your logo, company name and address, and write your letter body, then export a PDF or PNG or print. A clean, branded header for quotes, letters and official communication — all in your browser.",
    category: "Business",
    icon: "FileText",
    keywords: ["letterhead", "letterhead maker", "company letterhead", "letterhead design", "business letterhead", "letterhead template"],
    addedOn: "2026-07-18",
    faq: [
      { question: "Can I use my own logo?", answer: "Yes. Upload your logo and add your company name and address — the letterhead applies your chosen design and colour around them." },
      { question: "What can I use the letterhead for?", answer: "Official letters, quotations, notices and any branded company communication. Export a print-ready PDF or a PNG to reuse in other documents." },
    ],
  },
  {
    slug: "invoice-maker",
    name: "Invoice Maker",
    description: "Create GST invoices in 20 designs with CGST/SGST/IGST breakdown, logo & PDF.",
    longDescription:
      "Build polished, print-ready invoices in seconds. Choose from 20 professional designs, add your company and customer details, GSTIN, itemised billing, discounts and shipping, and a proper tax breakdown — CGST + SGST, IGST or a single VAT/tax line. Upload a logo, signature and stamp, add a QR code, preview live, then download a PDF or PNG, or print — all entirely in your browser.",
    category: "Business",
    icon: "ReceiptText",
    keywords: ["invoice", "billing", "gst invoice", "tax invoice", "invoice generator"],
    addedOn: "2026-07-10",
    popular: true,
    faq: [
      { question: "Is my invoice data stored anywhere?", answer: "No. Everything is processed locally in your browser and optionally saved to your device's local storage. Nothing is uploaded to a server." },
      { question: "Can I add my company logo and signature?", answer: "Yes. You can upload both a logo and a signature image, which appear on the generated invoice and PDF." },
      { question: "Does it calculate GST automatically?", answer: "Yes. Enter a tax percentage and TechToolsCenter calculates the tax amount, discounts and grand total automatically." },
    ],
  },
  {
    slug: "quotation-generator",
    name: "Quotation Generator",
    description: "Send professional quotations in 20 designs with itemised pricing & tax.",
    longDescription:
      "Send professional quotations to your clients. Pick from 20 designs, add line items, quantities, rates, discounts, a CGST/SGST/IGST or single tax breakdown, and validity terms, then export a clean PDF or PNG. Add your logo, signature and a QR code, and your last quotation is remembered automatically.",
    category: "Business",
    icon: "FileSpreadsheet",
    keywords: ["quotation", "quote", "estimate", "proposal", "pricing"],
    addedOn: "2026-07-08",
    popular: true,
    faq: [
      { question: "How is a quotation different from an invoice?", answer: "A quotation is an estimate offered before work begins, while an invoice is a request for payment after goods or services are delivered." },
      { question: "Can I set a validity date?", answer: "Yes, you can add validity terms and notes that appear on the exported quotation." },
    ],
  },
  {
    slug: "receipt-generator",
    name: "Receipt Generator",
    description: "Create payment receipts in 20 designs and download as PDF or PNG.",
    longDescription:
      "Generate simple, professional payment receipts. Record who paid, how much and for what, pick from 20 designs, add your logo and a QR code, then download a PDF or PNG receipt — or print it — for your records.",
    category: "Business",
    icon: "Receipt",
    keywords: ["receipt", "payment receipt", "cash receipt", "proof of payment"],
    addedOn: "2026-07-06",
    faq: [
      { question: "Can I use this for cash payments?", answer: "Yes. You can record any payment method including cash, card, UPI or bank transfer." },
      { question: "Is the receipt legally valid?", answer: "It serves as a proof-of-payment document. For legal or tax requirements, consult your local regulations." },
    ],
  },
  {
    slug: "proposal-generator",
    name: "Proposal Generator",
    description: "Write a client proposal — overview, scope, timeline & pricing — with your logo, and export a PDF.",
    longDescription:
      "Put together a professional client proposal: an overview of what you're offering, a scope-of-work list, a project timeline, itemised pricing with an automatic total, and your terms — all in one editable document. Add your company logo, align it left, center or right, and adjust its size to match your brand. Unlike an invoice or quotation, a proposal is meant to persuade before work is agreed, not just itemise a price. Pick an accent color, preview it live, and export a clean PDF.",
    category: "Business",
    icon: "Handshake",
    keywords: ["proposal", "proposal generator", "client proposal", "business proposal", "project proposal", "scope of work", "proposal with logo"],
    addedOn: "2026-08-16",
    faq: [
      { question: "How is this different from a quotation?", answer: "A quotation is a fixed price offer for defined items. A proposal is a persuasive document — it explains the approach, scope of work and timeline before pricing is even discussed, which matters for services and projects where the client needs to understand what they're agreeing to, not just the price." },
      { question: "Can I add my company logo?", answer: "Yes — upload a logo, choose left, center or right alignment, and drag the size slider to adjust how large it appears in both the preview and the exported PDF." },
      { question: "Is my proposal data saved?", answer: "Yes — it's saved to your browser's local storage automatically, so you can come back and keep editing. Nothing is uploaded anywhere." },
      { question: "Can I remove sections I don't need?", answer: "Yes. Scope, timeline and pricing are all optional lists — leave them empty and that section is skipped entirely in the exported PDF." },
    ],
  },
  {
    slug: "gst-calculator",
    name: "GST Calculator",
    description: "Calculate GST inclusive and exclusive amounts for any rate.",
    longDescription:
      "Quickly work out GST for any amount. Choose whether your figure is GST-inclusive or exclusive, pick a rate (3%, 5%, 12%, 18%, 28% or custom), and instantly see the net amount, tax and total with CGST/SGST split.",
    category: "Calculators",
    icon: "Percent",
    keywords: ["gst", "gst calculator", "tax calculator", "cgst", "sgst", "india tax"],
    addedOn: "2026-07-04",
    popular: true,
    faq: [
      { question: "What is GST inclusive vs exclusive?", answer: "Inclusive means the amount already contains GST, so we work backwards to find the tax. Exclusive means GST is added on top of the amount." },
      { question: "What is the CGST/SGST split?", answer: "For intra-state transactions, GST is split equally into CGST (central) and SGST (state). This tool shows both halves automatically." },
    ],
  },
  {
    slug: "salary-slip-generator",
    name: "Salary Slip Generator",
    description: "Create detailed salary slips with your company logo, earnings, deductions and net pay.",
    longDescription:
      "Produce professional pay slips for employees. Add your company logo (aligned left, center or right, with an adjustable size), enter earnings (basic, HRA, allowances), deductions (PF, tax) and employee details to generate a clean, downloadable salary slip PDF.",
    category: "Business",
    icon: "Wallet",
    keywords: ["salary slip", "payslip", "pay slip", "salary", "payroll", "salary slip with logo"],
    addedOn: "2026-07-02",
    faq: [
      { question: "Can I add my company logo?", answer: "Yes — upload a logo, choose left, center or right alignment, and drag the size slider to adjust how large it appears in both the preview and the exported PDF." },
      { question: "Can I add custom earnings and deductions?", answer: "Yes, you can add any number of earning and deduction line items with custom labels and amounts." },
      { question: "Does it calculate net pay?", answer: "Yes. Net pay is calculated automatically as total earnings minus total deductions." },
    ],
  },
  {
    slug: "resume-builder",
    name: "Resume Builder",
    description: "Build a clean, ATS-friendly resume and export it to PDF.",
    longDescription:
      "Create a modern, ATS-friendly resume. Fill in your contact details, summary, experience, education and skills, preview it live, and download a polished PDF — no sign-up required.",
    category: "Business",
    icon: "FileUser",
    keywords: ["resume", "cv", "resume builder", "curriculum vitae", "job"],
    addedOn: "2026-06-30",
    popular: true,
    faq: [
      { question: "Is the resume ATS-friendly?", answer: "Yes. The layout uses a clean, single-column structure that applicant tracking systems can parse reliably." },
      { question: "Will my data be saved?", answer: "Your resume is saved to your browser's local storage so you can return and edit it later. Nothing is uploaded." },
    ],
  },
  {
    slug: "qr-generator",
    name: "QR Studio",
    description: "Design premium QR codes — 22 types, shapes, gradients, logo, PDF/ZIP.",
    longDescription:
      "A complete QR Studio. Create QR codes for 22 content types — website, text, email, phone, SMS, WhatsApp, Telegram, Instagram, Facebook, LinkedIn, WiFi, Google Maps, Google review, UPI, vCard, event, crypto, PDF/image/video links, and Play/App Store. Customise dot styles, eye/corner shapes, gradient colours, transparent background, logo and frame caption. Live preview, templates, history, and export as PNG, SVG, PDF or ZIP in high resolution.",
    category: "Generators",
    icon: "QrCode",
    keywords: ["qr", "qr code", "qr generator", "barcode", "scan"],
    addedOn: "2026-06-28",
    popular: true,
    faq: [
      { question: "Are the QR codes free to use commercially?", answer: "Yes. Generated QR codes are static and free to use anywhere, including commercial projects." },
      { question: "Do the QR codes expire?", answer: "No. These are static QR codes that encode your data directly, so they never expire." },
    ],
  },
  {
    slug: "barcode-generator",
    name: "Barcode Generator",
    description: "Create CODE128, EAN, UPC and other barcodes instantly.",
    longDescription:
      "Generate standards-compliant barcodes in multiple formats including CODE128, EAN-13, UPC and CODE39. Adjust dimensions and download as PNG for labels and inventory.",
    category: "Generators",
    icon: "Barcode",
    keywords: ["barcode", "code128", "ean", "upc", "inventory"],
    addedOn: "2026-06-26",
    faq: [
      { question: "Which barcode formats are supported?", answer: "CODE128, CODE39, EAN-13, EAN-8, UPC and more are supported out of the box." },
      { question: "Can I print these barcodes?", answer: "Yes. Download the barcode as a PNG and print it on labels or packaging." },
    ],
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Calculate exact age in years, months, days, and more.",
    longDescription:
      "Find out an exact age from any birth date. See the result in years, months and days, along with total months, weeks, days and the next birthday countdown.",
    category: "Calculators",
    icon: "Cake",
    keywords: ["age", "age calculator", "birthday", "date difference", "how old"],
    addedOn: "2026-06-24",
    faq: [
      { question: "Can I calculate the difference between two dates?", answer: "Yes. Set both the start and end dates to measure the exact duration between them." },
      { question: "Does it account for leap years?", answer: "Yes. The calculation uses real calendar math, correctly handling leap years and varying month lengths." },
    ],
  },
  {
    slug: "emi-calculator",
    name: "EMI Calculator",
    description: "Calculate loan EMIs with a full amortization breakdown.",
    longDescription:
      "Plan any loan with confidence. Enter the principal, interest rate and tenure to see your monthly EMI, total interest and total payment, plus a year-by-year amortization schedule.",
    category: "Calculators",
    icon: "Landmark",
    keywords: ["emi", "loan", "emi calculator", "mortgage", "interest"],
    addedOn: "2026-06-22",
    popular: true,
    faq: [
      { question: "How is EMI calculated?", answer: "EMI uses the standard reducing-balance formula: P × r × (1+r)^n / ((1+r)^n − 1), where r is the monthly interest rate and n is the number of months." },
      { question: "Can I see a repayment schedule?", answer: "Yes. The tool shows a full amortization breakdown of principal and interest over the loan tenure." },
    ],
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences and estimate reading time.",
    longDescription:
      "Analyse any text in real time. See word count, character count (with and without spaces), sentences, paragraphs, reading time and keyword density as you type.",
    category: "Text",
    icon: "Type",
    keywords: ["word count", "character count", "word counter", "reading time", "text"],
    addedOn: "2026-06-20",
    popular: true,
    faq: [
      { question: "Does it count characters with and without spaces?", answer: "Yes. Both totals are shown separately so you can meet strict character limits." },
      { question: "How is reading time estimated?", answer: "Reading time is estimated at an average of 200 words per minute." },
    ],
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    description: "Convert text to UPPERCASE, lowercase, Title Case and more.",
    longDescription:
      "Instantly transform text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case and more. Copy the result with one click.",
    category: "Text",
    icon: "CaseSensitive",
    keywords: ["case converter", "uppercase", "lowercase", "title case", "text case"],
    addedOn: "2026-06-18",
    faq: [
      { question: "Which case styles are supported?", answer: "UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, kebab-case and inVERSE case." },
      { question: "Can I copy the converted text?", answer: "Yes. Each result has a copy button that places the text on your clipboard." },
    ],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure, random passwords with custom rules.",
    longDescription:
      "Create strong, unpredictable passwords using a cryptographically secure random generator. Choose length and character sets, view a live strength meter, and copy instantly.",
    category: "Generators",
    icon: "KeyRound",
    keywords: ["password", "password generator", "secure password", "random", "strong password"],
    addedOn: "2026-06-16",
    popular: true,
    faq: [
      { question: "Are the passwords generated securely?", answer: "Yes. We use the browser's cryptographically secure Web Crypto API, and passwords are never sent anywhere." },
      { question: "How strong should my password be?", answer: "For most accounts, use at least 16 characters mixing uppercase, lowercase, numbers and symbols." },
    ],
  },
  {
    slug: "image-studio",
    name: "Image Studio",
    description: "All-in-one image editor — compress, resize, crop, convert, filters & more.",
    longDescription:
      "A complete image workspace in your browser. Compress, resize, upscale, rotate, flip, crop, convert (JPG/PNG/WebP), add a watermark, and adjust brightness, contrast, blur and sharpness — all with a live preview. Plus extract a colour palette, pick colours from the image, view metadata, remove a solid background and batch-process multiple images. Nothing is uploaded — everything runs on your device.",
    category: "Image",
    icon: "Image",
    keywords: ["image editor", "image studio", "compress", "resize", "crop", "convert", "watermark", "image tools"],
    addedOn: "2026-07-17",
    popular: true,
    faq: [
      { question: "Are my images uploaded anywhere?", answer: "No. Every operation — compression, resizing, filters, conversion — runs locally in your browser using the Canvas API. Your images never leave your device." },
      { question: "Which formats can I convert between?", answer: "JPG, PNG and WebP, with an adjustable quality setting for compression." },
    ],
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Compress JPG and PNG images in your browser without quality loss.",
    longDescription:
      "Reduce image file sizes right in your browser. Adjust the quality and maximum dimensions, compare original vs compressed size, and download the optimised image — your files never leave your device.",
    category: "Image",
    icon: "ImageDown",
    keywords: ["image compressor", "compress image", "reduce size", "optimize image", "jpg png"],
    addedOn: "2026-06-14",
    faq: [
      { question: "Are my images uploaded to a server?", answer: "No. Compression happens entirely in your browser using the canvas API. Your images never leave your device." },
      { question: "Which formats are supported?", answer: "JPG, PNG and WebP images can be compressed and exported." },
    ],
  },
  {
    slug: "image-converter",
    name: "Image Converter",
    description: "Convert images (including HEIC/HEIF from iPhone) to PNG, JPG or WEBP — single or bulk, free and private.",
    longDescription:
      "Convert your images between PNG, JPG and WEBP right in your browser — including HEIC/HEIF photos from an iPhone, decoded with a real in-browser decoder rather than being rejected. Upload one image or a whole batch, pick your output format and quality, and download individually or as a single .zip. Nothing is uploaded — the whole conversion happens on your device.",
    category: "Image",
    icon: "Replace",
    keywords: ["image converter", "heic to jpg", "heic to jpg converter", "convert heic to jpg", "png to jpg", "jpg to png", "png to webp", "webp to png", "avif to png", "bulk image converter", "convert image"],
    addedOn: "2026-07-18",
    popular: true,
    faq: [
      { question: "Which image formats can I convert?", answer: "You can convert PNG, JPG, WEBP, AVIF and HEIC/HEIF (the format iPhones save photos in) to PNG, JPG or WEBP. HEIC is decoded with a real in-browser decoder, not just rejected." },
      { question: "Can I convert multiple images at once?", answer: "Yes — drop in as many images as you like, they queue up, and one click converts all of them. Download each individually or grab everything at once as a .zip." },
      { question: "Is my image uploaded anywhere?", answer: "No. The conversion — including HEIC decoding — runs entirely in your browser; your images never leave your device." },
    ],
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to any size or social preset online — free and private.",
    longDescription:
      "Resize any image to exact pixel dimensions or a ready-made social preset — Instagram, Facebook, LinkedIn, YouTube and more. Lock the aspect ratio, preview the result, and download — all privately in your browser with nothing uploaded.",
    category: "Image",
    icon: "Scaling",
    keywords: ["image resizer", "resize image", "resize photo", "image dimensions", "instagram size", "social media image size"],
    addedOn: "2026-07-18",
    popular: true,
    faq: [
      { question: "Can I resize to exact pixel dimensions?", answer: "Yes. Enter any width and height, optionally lock the aspect ratio, or pick a social/document preset for one-click sizing." },
      { question: "Are my images uploaded?", answer: "No. Resizing happens entirely in your browser — your images never leave your device." },
    ],
  },
  {
    slug: "bulk-image-processor",
    name: "Bulk Image Processor",
    description: "Compress, resize, convert & rotate hundreds of images at once — with a ZIP download.",
    longDescription:
      "Process hundreds of images in one go — compress, convert to WebP, resize or rotate them in a single batch. Drag in files or a whole folder, set your options and auto-naming rules (prefix, suffix, counter, timestamp), then run the queue with pause, resume, cancel and retry. Watch live progress with an estimated time remaining, and download everything as a ZIP. Everything runs privately in your browser.",
    category: "Image",
    icon: "Layers",
    keywords: ["bulk image", "batch image", "compress multiple images", "bulk resize", "batch convert webp", "mass image processing", "zip images"],
    addedOn: "2026-07-18",
    popular: true,
    faq: [
      { question: "How many images can I process at once?", answer: "As many as your device can handle — the queue processes files one by one with pause, resume, cancel and retry, so hundreds of images work fine." },
      { question: "Are my images uploaded?", answer: "No. Every image is processed entirely in your browser — nothing is uploaded, and you download the results as a ZIP." },
      { question: "Can I keep my folder structure?", answer: "Yes. Upload a folder and the ZIP preserves the original folder structure, with your auto-naming rules applied." },
    ],
  },
  {
    slug: "pdf-studio",
    name: "PDF Studio",
    description: "All-in-one PDF workspace — merge, split, rotate, watermark, sign & more.",
    longDescription:
      "A complete PDF workspace in your browser. Merge, split, compress and rotate PDFs, delete or reorder pages, add watermarks, page numbers, headers and footers, stamp a signature, and convert images to PDF — plus batch compression. Everything is processed locally with pdf-lib; your files never leave your device.",
    category: "Documents",
    icon: "FileText",
    keywords: ["pdf studio", "pdf editor", "merge pdf", "split pdf", "compress pdf", "watermark pdf", "sign pdf"],
    addedOn: "2026-07-17",
    popular: true,
    faq: [
      { question: "Are my PDFs uploaded?", answer: "No. All operations run locally in your browser using pdf-lib. Your documents never leave your device." },
      { question: "Can I sign a PDF?", answer: "Yes. Upload a signature image and place it on the page — great for quick approvals. For legally binding e-signatures use a certified service." },
    ],
  },
  {
    slug: "pdf-merge",
    name: "PDF Merge",
    description: "Combine multiple PDF files into one document, in any order.",
    longDescription:
      "Merge several PDFs into a single file. Add your documents, reorder them, and download the combined PDF — processed locally with no uploads.",
    category: "Documents",
    icon: "FilePlus2",
    keywords: ["pdf merge", "combine pdf", "join pdf", "merge pdf files"],
    addedOn: "2026-06-12",
    faq: [
      { question: "Is there a limit on the number of files?", answer: "There is no hard limit, though very large documents depend on your device's available memory since processing is local." },
      { question: "Can I reorder the files before merging?", answer: "Yes. You can move each file up or down to set the final order." },
    ],
  },
  {
    slug: "pdf-split",
    name: "PDF Split",
    description: "Extract specific pages or split a PDF into separate files.",
    longDescription:
      "Split a PDF by selecting a page range or extracting individual pages into a new document. Everything runs locally in your browser for full privacy.",
    category: "Documents",
    icon: "Scissors",
    keywords: ["pdf split", "split pdf", "extract pages", "separate pdf"],
    addedOn: "2026-06-10",
    faq: [
      { question: "Can I extract just one page?", answer: "Yes. Enter a single page number or a range like 2-5 to extract exactly the pages you need." },
      { question: "Is the original PDF modified?", answer: "No. The original file stays untouched; the split produces a brand-new PDF for download." },
    ],
  },
  {
    slug: "pdf-compress",
    name: "PDF Compress",
    description: "Reduce PDF file size while keeping it readable and shareable.",
    longDescription:
      "Shrink large PDFs so they are easier to email and upload. The tool optimises and re-saves your document locally, reducing file size without sending data to any server.",
    category: "Documents",
    icon: "FileArchive",
    keywords: ["pdf compress", "compress pdf", "reduce pdf size", "shrink pdf"],
    addedOn: "2026-06-08",
    faq: [
      { question: "Will compression reduce quality?", answer: "The tool optimises document structure and image streams. Text stays crisp; heavily image-based PDFs see the largest savings." },
      { question: "Are my PDFs uploaded anywhere?", answer: "No. Compression is performed entirely within your browser." },
    ],
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Work out percentages, increases, decreases and ratios instantly.",
    longDescription:
      "A fast, flexible percentage calculator. Find what percent one number is of another, calculate percentage increase or decrease, and apply a percentage to any value — with live results.",
    category: "Calculators",
    icon: "Percent",
    keywords: ["percentage", "percent calculator", "percent change", "increase", "decrease"],
    addedOn: "2026-07-12",
    faq: [
      { question: "Can it calculate percentage change?", answer: "Yes. Enter an original and new value to see the exact percentage increase or decrease." },
      { question: "Is it free?", answer: "Completely free, with no limits and nothing uploaded." },
    ],
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index in metric or imperial units.",
    longDescription:
      "Check your Body Mass Index and see which healthy-weight category it falls in. Supports both metric (kg/cm) and imperial (lb/in) units with an instant, colour-coded result.",
    category: "Calculators",
    icon: "Scale",
    keywords: ["bmi", "body mass index", "health calculator", "weight", "fitness"],
    addedOn: "2026-07-11",
    faq: [
      { question: "What is a healthy BMI?", answer: "A BMI between 18.5 and 24.9 is generally considered healthy, though BMI is only one of many health indicators." },
      { question: "Does it support imperial units?", answer: "Yes. Switch between metric (kg/cm) and imperial (lb/in) at any time." },
    ],
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    description: "Calculate final price after discount and total savings.",
    longDescription:
      "Instantly see the sale price and how much you save. Enter the original price and discount percentage to get the discounted amount and final price — great for shopping and pricing.",
    category: "Calculators",
    icon: "Tag",
    keywords: ["discount", "sale price", "savings", "percent off", "shopping"],
    addedOn: "2026-07-11",
    faq: [
      { question: "Can I stack multiple discounts?", answer: "Enter your combined effective percentage to see the final result. Sequential discounts should be applied one at a time." },
      { question: "Does it show savings?", answer: "Yes. It displays both the final price and the total amount you save." },
    ],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Beautify, minify and validate JSON with error messages.",
    longDescription:
      "Format messy JSON into clean, indented output — or minify it to a single line. Instantly validates your input and shows a clear error message with position if anything is wrong.",
    category: "Developer",
    icon: "Braces",
    keywords: ["json", "json formatter", "json validator", "beautify", "minify"],
    addedOn: "2026-07-13",
    popular: true,
    faq: [
      { question: "Does it validate JSON?", answer: "Yes. Invalid JSON shows a clear error message so you can find and fix the problem quickly." },
      { question: "Can it minify JSON?", answer: "Yes. Switch to minify mode to compress your JSON into a compact single line." },
    ],
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    description: "Encode text to Base64 or decode Base64 back to text.",
    longDescription:
      "Convert any text to and from Base64 with full Unicode support, including a URL-safe variant (-/_ instead of +//, no padding) for JWTs and URL parameters. Encode data for transport or decode Base64 strings back to readable text — entirely in your browser.",
    category: "Developer",
    icon: "Binary",
    keywords: ["base64", "encode", "decode", "base64 encoder", "base64 decoder", "url safe base64", "jwt base64"],
    addedOn: "2026-07-13",
    faq: [
      { question: "Does it support Unicode?", answer: "Yes. Emoji and non-Latin characters are handled correctly during both encoding and decoding." },
      { question: "What's the URL-safe option for?", answer: "Standard Base64 uses + and / and pads with =, all of which need escaping inside a URL. The URL-safe variant swaps those for - and _ and drops padding — used by JWTs, URL query parameters and filesystem-safe names." },
      { question: "Is my data uploaded?", answer: "No. All encoding and decoding happens locally in your browser." },
    ],
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    description: "Percent-encode or decode URLs and query parameters.",
    longDescription:
      "Safely encode text for use in URLs, or decode percent-encoded strings back to readable text. Handles spaces, special characters and query parameters correctly.",
    category: "Developer",
    icon: "Link2",
    keywords: ["url encode", "url decode", "percent encoding", "uri", "query string"],
    addedOn: "2026-07-13",
    faq: [
      { question: "What's the difference from Base64?", answer: "URL encoding escapes characters that aren't safe in URLs using percent-encoding, while Base64 converts binary data to ASCII text." },
      { question: "Does it decode too?", answer: "Yes. Switch modes to decode any percent-encoded string." },
    ],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate secure random UUID v4 identifiers in bulk.",
    longDescription:
      "Generate cryptographically random UUID (v4) values one at a time or in bulk. Copy a single ID or the whole list with one click — perfect for keys, records and test data.",
    category: "Developer",
    icon: "Fingerprint",
    keywords: ["uuid", "guid", "uuid generator", "unique id", "v4"],
    addedOn: "2026-07-14",
    popular: true,
    faq: [
      { question: "Are these UUIDs random?", answer: "Yes. They are generated using the browser's cryptographically secure random API following the UUID v4 standard." },
      { question: "Can I generate many at once?", answer: "Yes. Choose how many you need and generate them all in one click." },
    ],
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Generate SHA-1, SHA-256, SHA-384 and SHA-512 hashes.",
    longDescription:
      "Compute cryptographic hashes of any text using the Web Crypto API. Supports SHA-1, SHA-256, SHA-384 and SHA-512, with instant results you can copy.",
    category: "Developer",
    icon: "Hash",
    keywords: ["hash", "sha256", "sha512", "checksum", "hash generator"],
    addedOn: "2026-07-14",
    faq: [
      { question: "Which algorithms are supported?", answer: "SHA-1, SHA-256, SHA-384 and SHA-512, all computed locally via the Web Crypto API." },
      { question: "Is my input sent anywhere?", answer: "No. Hashing happens entirely in your browser." },
    ],
  },
  {
    slug: "color-converter",
    name: "Color Picker & Converter",
    description: "Pick a color and convert between HEX, RGB, HSL and CMYK.",
    longDescription:
      "Pick any color and instantly see its HEX, RGB, HSL and CMYK values. Copy any format with one click — ideal for design, CSS/theming work and print (CMYK).",
    category: "Developer",
    icon: "Palette",
    keywords: ["color picker", "hex to rgb", "hsl", "cmyk", "color converter", "css color", "rgb to cmyk"],
    addedOn: "2026-07-14",
    faq: [
      { question: "Which formats are supported?", answer: "HEX, RGB, HSL and CMYK, all kept in sync as you pick or type." },
      { question: "Can I copy the values?", answer: "Yes. Each format has a copy button for quick use in your CSS." },
    ],
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert Unix timestamps to human dates and back.",
    longDescription:
      "Convert between Unix timestamps (seconds or milliseconds) and human-readable dates in your local time and UTC. Includes a live current timestamp.",
    category: "Developer",
    icon: "Clock",
    keywords: ["unix timestamp", "epoch", "timestamp converter", "date to timestamp"],
    addedOn: "2026-07-14",
    faq: [
      { question: "Does it support milliseconds?", answer: "Yes. It auto-detects seconds vs milliseconds and shows both local and UTC dates." },
      { question: "What is a Unix timestamp?", answer: "It's the number of seconds elapsed since 1 January 1970 (UTC), widely used in programming." },
    ],
  },
  {
    slug: "slug-generator",
    name: "Slug Generator",
    description: "Turn any title into a clean, SEO-friendly URL slug.",
    longDescription:
      "Convert titles and headings into clean, lowercase, hyphenated URL slugs. Strips accents and special characters to produce SEO-friendly slugs ready for your CMS.",
    category: "Text",
    icon: "Link",
    keywords: ["slug", "url slug", "seo slug", "permalink", "slugify"],
    addedOn: "2026-07-15",
    faq: [
      { question: "What is a URL slug?", answer: "A slug is the readable part of a URL that identifies a page, usually lowercase words separated by hyphens." },
      { question: "Does it remove accents?", answer: "Yes. Accented characters are transliterated so the slug stays clean and URL-safe." },
    ],
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder paragraphs, sentences or words.",
    longDescription:
      "Create classic Lorem Ipsum placeholder text for mockups and designs. Choose how many paragraphs, sentences or words you need and copy the result instantly.",
    category: "Text",
    icon: "Pilcrow",
    keywords: ["lorem ipsum", "placeholder text", "dummy text", "filler text"],
    addedOn: "2026-07-15",
    faq: [
      { question: "Can I choose the amount?", answer: "Yes. Generate a specific number of paragraphs, sentences or words." },
      { question: "Does it start with ‘Lorem ipsum’?", answer: "You can optionally begin with the classic ‘Lorem ipsum dolor sit amet’ opening." },
    ],
  },
  {
    slug: "website-mockup-generator",
    name: "Mockup Studio",
    description: "Wrap any screenshot or website in a premium device & scene mockup.",
    longDescription:
      "Upload a screenshot, paste an image from your clipboard, or drop in any website URL, then wrap it inside a photoreal device frame — iPhone, Samsung, Pixel, Nothing, OnePlus, iPad, MacBook, Laptop, Desktop or a browser window. Style the scene with glass, gradient, office, minimal, luxury, floating, clay or transparent backgrounds and export a crisp PNG, vector SVG, print-ready PDF or a bundled ZIP for decks, portfolios, App Store listings and social posts.",
    category: "Creative",
    icon: "MonitorSmartphone",
    keywords: ["mockup studio", "device mockup", "iphone mockup", "browser mockup", "screenshot frame", "macbook mockup", "app mockup", "url preview"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "How does it fetch the website details?", answer: "TechToolsCenter reads the page's public metadata (title, favicon, theme colour and OpenGraph image) and renders it inside a device frame. Nothing about your visit is stored." },
      { question: "Why can't it capture a full live screenshot?", answer: "For privacy and speed we use each site's official preview image and branding rather than rendering the full page. You can also drop in your own screenshot." },
    ],
  },
  {
    slug: "app-screenshot-generator",
    name: "App Store Studio",
    description: "Generate exact App Store Connect & Google Play screenshots that pass upload.",
    longDescription:
      "Create store-ready marketing screenshots at the exact pixel dimensions Apple and Google accept — Apple 6.9″, 6.7″, 6.5″, 5.5″ and iPad, plus Google Play phone, 7″ tablet, 10″ tablet, feature graphic and TV banner. Upload your app screenshot, add a headline and subtitle, pick from Business, Gaming, Finance, Travel, Education, Health, AI, Minimal, Luxury or Gradient templates, and every asset auto-scales inside safe areas with a live preview. Export a single PNG or a ZIP of all sizes ready to drop straight into App Store Connect and Google Play Console.",
    category: "Creative",
    icon: "Smartphone",
    keywords: ["app store screenshot", "play store screenshot", "app store connect", "google play console", "exact dimensions", "feature graphic", "tv banner", "app marketing"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "Are the exports the exact sizes the stores accept?", answer: "Yes. Every image is rendered on a canvas at the precise pixel dimensions Apple App Store Connect and Google Play Console require, so uploads aren't rejected for wrong size or oversized screenshots." },
      { question: "Which sizes are supported?", answer: "Apple 6.9″ (1320×2868), 6.7″ (1290×2796), 6.5″ (1242×2688), 5.5″ (1242×2208) and iPad (2048×2732); Google Play phone (1080×1920), 7″ tablet (1200×1920), 10″ tablet (1600×2560), feature graphic (1024×500) and TV banner (1280×720)." },
      { question: "What do the safe-area guides do?", answer: "They show the recommended margin so titles and devices never get clipped by rounded corners or store UI. Guides appear only in the preview and are never baked into the exported image." },
    ],
  },
  {
    slug: "social-media-kit",
    name: "Social Media Kit Generator",
    description: "Create perfectly-sized graphics for every social platform.",
    longDescription:
      "Design on-brand graphics for every platform from one place — Instagram posts & stories, Facebook covers, LinkedIn banners, Twitter/X headers, YouTube thumbnails & banners, Pinterest pins, blog covers and OpenGraph images. Edit the text, colours, gradient and logo, then export a pixel-perfect PNG at the exact size each platform needs.",
    category: "Creative",
    icon: "Share2",
    keywords: ["social media kit", "instagram post", "youtube thumbnail", "og image", "banner maker", "social graphics"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "Are the sizes correct for each platform?", answer: "Yes. Every preset uses the current recommended dimensions — e.g. 1080×1080 for Instagram posts, 1280×720 for YouTube thumbnails and 1200×630 for OpenGraph images." },
      { question: "Can I add my own logo?", answer: "Yes. Upload a logo and it's placed on the graphic; you can also edit all text, colours and the background gradient." },
    ],
  },
  {
    slug: "favicon-generator",
    name: "Favicon Generator",
    description: "Create favicons from text, emoji or an image — all sizes + ZIP.",
    longDescription:
      "Generate a complete favicon set from text, an emoji or an uploaded image. Customise the background, colour and shape, then download every size (16 to 512px), favicon.ico, Apple & Android/PWA icons, a web manifest and the ready-to-paste HTML — all in a single ZIP, generated in your browser.",
    category: "Generators",
    icon: "AppWindow",
    keywords: ["favicon", "favicon generator", "favicon.ico", "app icon", "pwa icon", "apple touch icon"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "Which files does it generate?", answer: "PNG icons from 16×16 up to 512×512, a favicon.ico, Apple touch icon, Android/PWA icons, a site.webmanifest and the HTML snippet — bundled in one ZIP." },
      { question: "Can I use an emoji as a favicon?", answer: "Yes. Pick the emoji mode and type any emoji — it's rendered crisply at every size." },
      { question: "Is my image uploaded anywhere?", answer: "No. Everything is generated locally in your browser using the canvas API." },
    ],
  },
  {
    slug: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    description: "Clean text by removing duplicate and empty lines.",
    longDescription:
      "Tidy up any list or block of text. Remove duplicate lines, strip empty lines, trim whitespace and optionally sort the result alphabetically.",
    category: "Text",
    icon: "AlignLeft",
    keywords: ["remove duplicates", "dedupe lines", "unique lines", "clean text", "sort lines"],
    addedOn: "2026-07-15",
    faq: [
      { question: "Can it sort the lines too?", answer: "Yes. There's an option to sort the cleaned lines alphabetically." },
      { question: "Is it case-sensitive?", answer: "You can toggle case sensitivity when detecting duplicate lines." },
    ],
  },
  {
    slug: "calculator-hub",
    name: "Calculator Hub",
    description: "Every calculator in one workspace — 20+ modes with tabs.",
    longDescription:
      "One unified calculator workspace with 20+ modes — basic, scientific and programmer calculators, plus GST, EMI, loan, SIP, compound & simple interest, BMI, BMR, body fat, age, date difference, working days, tip, fuel, electricity, Roman numerals and more. Switch modes instantly; your last-used mode is remembered.",
    category: "Calculators",
    icon: "Calculator",
    keywords: ["calculator", "calculator hub", "scientific calculator", "programmer calculator", "financial calculator", "all calculators"],
    addedOn: "2026-07-17",
    popular: true,
    faq: [
      { question: "What calculators are included?", answer: "Basic, scientific and programmer calculators, plus finance (GST, EMI, loan, SIP, compound/simple interest), health (BMI, BMR, body fat), date & time, and utility calculators — all in one place." },
      { question: "Does it remember my last mode?", answer: "Yes. The hub remembers the last calculator you used so you can pick up right where you left off." },
    ],
  },
  {
    slug: "scientific-calculator",
    name: "Scientific Calculator",
    description: "A full scientific calculator with trig, logs, powers and memory.",
    longDescription:
      "A complete online scientific calculator. Do everyday arithmetic plus trigonometry, logarithms, powers, roots, factorials and constants like π and e — with a live expression display and keyboard support.",
    category: "Calculators",
    icon: "Calculator",
    keywords: ["scientific calculator", "calculator", "trigonometry", "logarithm", "math calculator"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "Does it support trigonometry?", answer: "Yes — sin, cos, tan and their inverses (in degrees), plus logs, powers, roots, factorials and constants." },
      { question: "Can I use my keyboard?", answer: "Yes. Type digits and operators directly, press Enter to evaluate and Backspace to delete." },
    ],
  },
  {
    slug: "unit-converter",
    name: "Unit Converter Hub",
    description: "Convert length, weight, temperature, pressure, power, energy & more.",
    longDescription:
      "A powerful unified converter hub. Instantly convert between units of length, weight, temperature, area, volume, speed, storage, data rate, time, pressure, power, energy, angle, typography and cooking measures — with live two-way conversion.",
    category: "Calculators",
    icon: "ArrowLeftRight",
    keywords: ["unit converter", "length converter", "weight converter", "temperature converter", "metric imperial"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "Which categories are supported?", answer: "Length, weight, temperature, area, volume, speed, data storage, time and cooking units." },
      { question: "Is it accurate?", answer: "Yes. Conversions use precise standard factors and update instantly as you type." },
    ],
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    description: "Split the bill and calculate tips per person in seconds.",
    longDescription:
      "Work out the tip and total for any bill, then split it evenly between any number of people. Choose a tip percentage or enter your own and see the per-person amount instantly.",
    category: "Calculators",
    icon: "Coins",
    keywords: ["tip calculator", "bill split", "gratuity", "split bill", "restaurant tip"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Can I split between people?", answer: "Yes. Enter the number of people and see the exact amount each person owes, tip included." },
      { question: "Can I set a custom tip?", answer: "Yes. Pick a preset percentage or type your own." },
    ],
  },
  {
    slug: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    description: "Estimate trip fuel cost from distance, mileage and fuel price.",
    longDescription:
      "Plan any journey's fuel cost. Enter the distance, your vehicle's mileage and the fuel price to see how much fuel you'll use and what the trip will cost.",
    category: "Calculators",
    icon: "Fuel",
    keywords: ["fuel cost", "trip cost", "mileage calculator", "petrol cost", "fuel calculator"],
    addedOn: "2026-07-16",
    faq: [
      { question: "What units does it use?", answer: "Enter distance, mileage (distance per unit of fuel) and price per unit — the tool handles the maths." },
      { question: "Can I plan a round trip?", answer: "Yes. Just enter the total round-trip distance." },
    ],
  },
  {
    slug: "font-style-generator",
    name: "Text Studio — Fancy Fonts",
    description: "40+ stylish Unicode fonts with search & platform filters.",
    longDescription:
      "Type anything and instantly get 40+ stylish Unicode font versions — bold, italic, script, bubble, squared, small caps, Fraktur, double-struck, Cyrillic, Greek, glitch, upside-down and more. Search styles and filter by platform (Instagram, WhatsApp, Discord, TikTok, gaming, luxury). One-click copy for every style.",
    category: "Text",
    icon: "Type",
    keywords: ["font generator", "fancy text", "stylish fonts", "instagram fonts", "cool text", "unicode fonts"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "Will these fonts work everywhere?", answer: "They use Unicode characters, so they work in most apps and social platforms that support Unicode — Instagram, TikTok, Discord, X and more." },
      { question: "How do I use a style?", answer: "Type your text, then click any style to copy it instantly." },
    ],
  },
  {
    slug: "text-decorator",
    name: "Text Decorator",
    description: "Wrap your text in symbols, borders and aesthetic decorations.",
    longDescription:
      "Decorate any text with hearts, stars, sparkles, arrows, borders and aesthetic symbols — great for social media bios, usernames and channel names. Pick a style and copy the result.",
    category: "Text",
    icon: "Sparkles",
    keywords: ["text decorator", "bio decoration", "aesthetic text", "symbols text", "username decorator"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Where can I use decorated text?", answer: "Anywhere that accepts Unicode — Instagram and Discord bios, usernames, YouTube channel names and more." },
      { question: "Can I edit the result?", answer: "Yes. Pick a decoration style, then copy and tweak it as you like." },
    ],
  },
  {
    slug: "symbol-library",
    name: "Symbol Studio",
    description: "Searchable symbol database — 15 categories, one-click copy.",
    longDescription:
      "A searchable symbol database with 15 categories — hearts, arrows, stars, currency, math, music, phone, weather, gaming, chess, bullets, box-drawing, dividers, kaomoji and more. Search by name and copy any symbol instantly.",
    category: "Text",
    icon: "Asterisk",
    keywords: ["symbols", "special characters", "copy symbols", "emoji", "unicode symbols", "star symbol"],
    addedOn: "2026-07-16",
    faq: [
      { question: "How do I copy a symbol?", answer: "Just click any symbol and it's copied to your clipboard, ready to paste." },
      { question: "Can I search?", answer: "Yes. Type a name like 'heart', 'arrow' or 'star' to filter the library." },
    ],
  },
  {
    slug: "emoji-studio",
    name: "Emoji Studio",
    description: "Search, copy, combine and translate emoji — with favorites.",
    longDescription:
      "A complete emoji workspace — search hundreds of emoji by name, browse by category, save favorites and see your recently used. Combine emoji, copy with one click, and translate text into emoji. Everything works in your browser.",
    category: "Text",
    icon: "Sparkles",
    keywords: ["emoji", "emoji search", "emoji copy", "emoji translator", "emoji combiner", "copy emoji"],
    addedOn: "2026-07-17",
    popular: true,
    faq: [
      { question: "How do I copy an emoji?", answer: "Just click any emoji and it's copied to your clipboard, ready to paste anywhere." },
      { question: "Can I save favorite emoji?", answer: "Yes. Star any emoji to keep it in your favorites, and your recently used emoji appear automatically." },
    ],
  },
  {
    slug: "reverse-text",
    name: "Reverse Text Generator",
    description: "Reverse text, flip words, mirror or make upside-down text.",
    longDescription:
      "Transform text in fun ways — reverse the whole string, reverse word order, create upside-down text or mirrored text. Great for social posts and puzzles. Copy any result instantly.",
    category: "Text",
    icon: "FlipHorizontal",
    keywords: ["reverse text", "upside down text", "mirror text", "flip text", "backwards text"],
    addedOn: "2026-07-16",
    faq: [
      { question: "What transformations are available?", answer: "Reverse characters, reverse word order, upside-down text and mirrored text." },
      { question: "Does upside-down text work on social media?", answer: "Yes. It uses Unicode characters supported by most platforms." },
    ],
  },
  {
    slug: "find-and-replace",
    name: "Find & Replace",
    description: "Find and replace text in bulk, with case and regex options.",
    longDescription:
      "Quickly find and replace text across a whole document. Toggle case sensitivity, match whole words, or use regular expressions for advanced replacements — with a live match count.",
    category: "Text",
    icon: "Replace",
    keywords: ["find and replace", "replace text", "bulk replace", "regex replace", "text replace"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Does it support regex?", answer: "Yes. Enable regex mode for pattern-based find and replace." },
      { question: "Is it case sensitive?", answer: "You choose — toggle case sensitivity on or off." },
    ],
  },
  {
    slug: "text-cleaner",
    name: "Text Cleaner",
    description: "Remove extra spaces, line breaks and formatting from text.",
    longDescription:
      "Clean up messy text in one click — trim extra spaces, collapse blank lines, remove line breaks, strip special characters and fix spacing. Perfect for tidying pasted content.",
    category: "Text",
    icon: "Eraser",
    keywords: ["text cleaner", "remove spaces", "clean text", "strip formatting", "trim whitespace"],
    addedOn: "2026-07-16",
    faq: [
      { question: "What can it remove?", answer: "Extra spaces, tabs, blank lines, line breaks and optionally special characters." },
      { question: "Is my text kept private?", answer: "Yes. Cleaning happens entirely in your browser." },
    ],
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    description: "Generate random numbers in any range, unique or repeating.",
    longDescription:
      "Generate one or many random numbers within any minimum and maximum range. Choose whether numbers can repeat, and copy the results — great for draws, testing and games.",
    category: "Generators",
    icon: "Dices",
    keywords: ["random number", "number generator", "random picker", "raffle", "rng"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Are the numbers truly random?", answer: "They use the browser's secure random API, which is suitable for draws and everyday use." },
      { question: "Can I get unique numbers?", answer: "Yes. Enable 'unique' so no number repeats within a batch." },
    ],
  },
  {
    slug: "pomodoro-timer",
    name: "Pomodoro Timer",
    description: "Focus timer with work/break cycles, stopwatch and countdown.",
    longDescription:
      "Stay focused with a Pomodoro timer — 25-minute work sessions and short breaks, with session tracking. Includes a stopwatch and custom countdown, plus a sound alert when time's up.",
    category: "Everyday",
    icon: "Timer",
    keywords: ["pomodoro", "focus timer", "countdown", "stopwatch", "productivity timer"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "What is the Pomodoro technique?", answer: "Work in focused 25-minute sprints separated by short breaks to boost concentration and avoid burnout." },
      { question: "Does it alert me?", answer: "Yes. A sound plays when a session ends, and the tab title updates with the remaining time." },
    ],
  },
  {
    slug: "quick-notes",
    name: "Quick Notes",
    description: "A fast scratchpad that saves your notes in your browser.",
    longDescription:
      "A distraction-free notepad that automatically saves to your browser as you type. Keep multiple notes, with word and character counts and a one-click .txt download — perfect for quick thoughts, to-dos and drafts.",
    category: "Everyday",
    icon: "StickyNote",
    keywords: ["notes", "notepad", "scratchpad", "quick notes", "online notepad"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Are my notes saved?", answer: "Yes. Notes are stored in your browser's local storage and remain after you close the tab. They never leave your device." },
      { question: "Can I keep multiple notes?", answer: "Yes. Create, rename and switch between several notes." },
      { question: "Can I get a note out as a file?", answer: "Yes — the Download button next to the title saves the current note as a plain .txt file." },
    ],
  },
  {
    slug: "screen-ruler",
    name: "Online Screen Ruler",
    description: "Measure anything on screen in pixels, cm, mm or inches.",
    longDescription:
      "A responsive on-screen ruler for measuring elements and images. Switch between pixels, centimetres, millimetres and inches, and calibrate for your display.",
    category: "Everyday",
    icon: "Ruler",
    keywords: ["screen ruler", "online ruler", "pixel ruler", "measure screen", "cm ruler"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Which units are supported?", answer: "Pixels, centimetres, millimetres and inches, with a calibration option for accuracy." },
      { question: "Is it accurate for physical measurements?", answer: "Screen DPI varies by device, so calibrate using a known object (like a card) for physical accuracy." },
    ],
  },
  {
    slug: "contrast-checker",
    name: "Color Contrast Checker",
    description: "Check text/background contrast against WCAG accessibility levels.",
    longDescription:
      "Test the contrast ratio between a text and background colour and see whether it passes WCAG AA and AAA accessibility standards for normal and large text — with a live preview.",
    category: "Developer",
    icon: "Contrast",
    keywords: ["contrast checker", "wcag contrast", "accessibility", "color contrast", "a11y"],
    addedOn: "2026-07-16",
    faq: [
      { question: "What contrast ratio do I need?", answer: "WCAG AA requires 4.5:1 for normal text and 3:1 for large text; AAA requires 7:1 and 4.5:1 respectively." },
      { question: "Does it preview the result?", answer: "Yes. You see your colours applied to sample text with pass/fail badges." },
    ],
  },
  {
    slug: "color-palette-generator",
    name: "Color Palette Generator",
    description: "Generate harmonious colour palettes from a base colour.",
    longDescription:
      "Create beautiful colour palettes from any base colour — complementary, analogous, triadic and shades. Copy individual colours or the whole palette as CSS variables.",
    category: "Developer",
    icon: "Palette",
    keywords: ["color palette", "palette generator", "color scheme", "complementary colors", "css palette"],
    addedOn: "2026-07-16",
    faq: [
      { question: "What palette types are supported?", answer: "Complementary, analogous, triadic and a tint/shade scale from your base colour." },
      { question: "Can I copy the palette?", answer: "Yes. Copy any single colour or export the whole palette as CSS custom properties." },
    ],
  },
  {
    slug: "brand-kit-generator",
    name: "Brand Studio",
    description: "Detect a brand from any URL and generate a full enterprise brand kit.",
    longDescription:
      "Enter a website URL, upload a logo or type a business name and TechToolsCenter detects the logo, colours, fonts and favicons, then generates a complete brand system in one download — a Brand Book PDF, a logo pack (PNG, SVG and transparent), favicon and app-icon packs with maskable variants, branded business card, letterhead, invoice, quotation, receipt and email signature, a social kit, a website QR code and a web manifest, all wrapped in a single ZIP alongside colour tokens (CSS + JSON).",
    category: "Creative",
    icon: "Palette",
    keywords: ["brand studio", "brand kit", "brand book", "logo pack", "favicon generator", "app icons", "brand guidelines", "color palette", "style guide"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "What does Brand Studio detect from a URL?", answer: "It reads the site's logo (apple-touch-icon / favicon), theme and inline colours, Google Fonts and font-family declarations, and favicons — then builds a balanced palette and font pairing you can refine." },
      { question: "What's inside the ZIP?", answer: "A Brand Book PDF, logo pack (PNG/SVG/transparent), favicon pack, app icons with a maskable variant, business card, letterhead, invoice, quotation, receipt and email-signature templates, social banners, a website QR code, a web manifest and colour tokens (CSS + JSON)." },
      { question: "Do I need a logo file?", answer: "No. If no logo is detected or uploaded, Brand Studio generates a clean monogram from your business name and uses it across every asset." },
    ],
  },
  {
    slug: "prompt-generator",
    name: "AI Prompt Generator",
    description: "Build clear, structured AI prompts from role, task and tone.",
    longDescription:
      "Craft high-quality prompts for any AI model. Pick a role, describe the task, choose tone, format and constraints, and get a well-structured prompt you can paste into Claude, ChatGPT or any assistant.",
    category: "AI",
    icon: "Sparkles",
    keywords: ["prompt generator", "ai prompt", "chatgpt prompt", "prompt engineering"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "Does this call an AI model?", answer: "No. It assembles a clear, structured prompt from your inputs using proven prompt-engineering patterns — you then paste it into your AI of choice." },
      { question: "Which assistants does it work with?", answer: "Any — Claude, ChatGPT, Gemini and others all benefit from well-structured prompts." },
    ],
  },
  {
    slug: "email-generator",
    name: "Email Generator",
    description: "Generate professional emails for any purpose in seconds.",
    longDescription:
      "Write polished emails fast. Choose a purpose (outreach, follow-up, apology, application and more), add the details and tone, and get a ready-to-send draft with subject line — copy and personalise.",
    category: "AI",
    icon: "Mail",
    keywords: ["email generator", "email template", "professional email", "email writer"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Are the emails customisable?", answer: "Yes. The generator fills a proven template from your inputs; edit any part before sending." },
      { question: "Is my data stored?", answer: "No. Everything is generated locally in your browser." },
    ],
  },
  {
    slug: "hashtag-generator",
    name: "Hashtag Generator",
    description: "Generate relevant hashtags for social media posts.",
    longDescription:
      "Turn a topic or keywords into a set of relevant, well-formatted hashtags for Instagram, X, LinkedIn and TikTok — mixing broad and niche tags to maximise reach.",
    category: "AI",
    icon: "Hash",
    keywords: ["hashtag generator", "instagram hashtags", "social media", "hashtags"],
    addedOn: "2026-07-16",
    faq: [
      { question: "How many hashtags should I use?", answer: "It varies by platform — around 3-5 on X, up to 30 on Instagram. The tool lets you copy exactly what you need." },
      { question: "Are the hashtags trending?", answer: "They're generated from your topic and common variations; always review for current relevance." },
    ],
  },
  {
    slug: "blog-outline-generator",
    name: "Blog Outline Generator",
    description: "Create a structured, SEO-friendly blog post outline.",
    longDescription:
      "Turn a title or topic into a complete blog outline — intro, H2/H3 headings, key points, FAQ and a conclusion — a solid, SEO-friendly skeleton you can flesh out.",
    category: "AI",
    icon: "ListTree",
    keywords: ["blog outline", "content outline", "article structure", "blog planner"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Is the outline SEO-friendly?", answer: "Yes. It uses a clear heading hierarchy and includes an FAQ section, which helps with search visibility." },
      { question: "Can I use it for any niche?", answer: "Yes. The structure adapts to your topic across any subject." },
    ],
  },
  {
    slug: "excel-formula-generator",
    name: "Excel Formula Generator",
    description: "Generate Excel & Google Sheets formulas from plain English.",
    longDescription:
      "Describe what you want to calculate and get the matching Excel / Google Sheets formula — SUM, VLOOKUP, IF, SUMIF, COUNTIF, concatenation and more — with a short explanation.",
    category: "AI",
    icon: "Sigma",
    keywords: ["excel formula", "google sheets formula", "vlookup", "sumif", "formula generator"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Does it work with Google Sheets?", answer: "Yes. The generated formulas work in both Microsoft Excel and Google Sheets." },
      { question: "Can it explain the formula?", answer: "Yes. Each result includes a short explanation of how the formula works." },
    ],
  },
  {
    slug: "meta-tags-generator",
    name: "Meta Tags Generator",
    description: "Generate SEO meta, OpenGraph and Twitter Card tags.",
    longDescription:
      "Produce a complete set of SEO tags for any page — title, description, canonical, robots, viewport, an optional theme-color, OpenGraph and Twitter Card — from a simple form, with a live character-count check and copy-ready HTML.",
    category: "SEO",
    icon: "Tags",
    keywords: ["meta tags", "og tags", "twitter card", "seo tags", "meta generator", "robots meta tag", "noindex"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "What tags are generated?", answer: "Meta title & description, canonical, robots, viewport, an optional theme-color, OpenGraph (title, description, image, url, type) and Twitter Card tags." },
      { question: "How do I stop a page from being indexed?", answer: "Uncheck \"Allow this page to be indexed\" — the generated robots tag switches to \"noindex, nofollow\"." },
      { question: "How long should title & description be?", answer: "Aim for ~60 characters for titles and ~155 for descriptions — the tool shows live counts." },
    ],
  },
  {
    slug: "schema-generator",
    name: "Schema Markup Generator",
    description: "Generate Schema.org JSON-LD structured data.",
    longDescription:
      "Create valid Schema.org JSON-LD for common types — Organization, Website, Article, Product, FAQPage, HowTo, BreadcrumbList and LocalBusiness — from a simple form, ready to paste into your page head.",
    category: "SEO",
    icon: "Braces",
    keywords: ["schema generator", "json-ld", "structured data", "rich results", "schema.org", "howto schema", "breadcrumb schema"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Which schema types are supported?", answer: "Organization, Website, Article, Product, FAQPage, HowTo, BreadcrumbList and LocalBusiness." },
      { question: "Is the output valid?", answer: "Yes. It produces well-formed JSON-LD following Schema.org; test it in Google's Rich Results tool." },
    ],
  },
  {
    slug: "robots-txt-generator",
    name: "Robots.txt Generator",
    description: "Create a robots.txt file with rules and sitemap.",
    longDescription:
      "Build a robots.txt for your site — allow or disallow paths, target specific bots, set a crawl delay and add your sitemap URL — then copy or download the file.",
    category: "SEO",
    icon: "Bot",
    keywords: ["robots.txt", "robots generator", "crawl rules", "seo", "disallow"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Where do I put robots.txt?", answer: "At the root of your domain, e.g. techtoolscenter.com/robots.txt." },
      { question: "Can I block specific bots?", answer: "Yes. Add rules targeting a specific user-agent, or apply rules to all bots at once." },
    ],
  },
  {
    slug: "serp-preview",
    name: "Google SERP Preview",
    description: "Preview how your page looks in Google search results.",
    longDescription:
      "See a live preview of your title, URL and meta description exactly as they'd appear in Google search — on desktop and mobile — with pixel-width warnings so nothing gets truncated.",
    category: "SEO",
    icon: "Search",
    keywords: ["serp preview", "google preview", "snippet preview", "seo preview", "meta preview"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Why do results get truncated?", answer: "Google truncates by pixel width, not character count. This tool warns you before your title or description is cut off." },
      { question: "Does it show mobile too?", answer: "Yes, switch between desktop and mobile previews." },
    ],
  },
  {
    slug: "keyword-density-checker",
    name: "Keyword Density Checker",
    description: "Analyse keyword frequency and density in your text.",
    longDescription:
      "Paste your content to see word counts, one/two/three-word phrase frequencies and keyword density percentages — helping you optimise without keyword stuffing.",
    category: "SEO",
    icon: "Gauge",
    keywords: ["keyword density", "keyword checker", "seo analysis", "word frequency"],
    addedOn: "2026-07-16",
    faq: [
      { question: "What's a good keyword density?", answer: "Generally 1-2% for a primary keyword. Much higher can look like keyword stuffing to search engines." },
      { question: "Does it count phrases?", answer: "Yes. It shows single words plus two- and three-word phrase frequencies." },
    ],
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and inspect JSON Web Token header and payload.",
    longDescription:
      "Paste a JWT to instantly decode its header and payload, see the algorithm and readable expiry/issued-at times. Decoding happens entirely in your browser — tokens are never sent anywhere.",
    category: "Developer",
    icon: "KeyRound",
    keywords: ["jwt", "jwt decoder", "json web token", "token decoder", "auth"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Is my token sent to a server?", answer: "No. Decoding is 100% local in your browser. Never paste production secrets into any online tool, though." },
      { question: "Does it verify the signature?", answer: "It decodes and displays the token contents; signature verification requires the secret key and is out of scope." },
    ],
  },
  {
    slug: "gradient-generator",
    name: "CSS Gradient Generator",
    description: "Design CSS gradients visually and copy the code.",
    longDescription:
      "Create beautiful linear, radial and conic CSS gradients with any number of colour stops. Pick colours and angle, preview live, and copy production-ready CSS — perfect for backgrounds, buttons and hero sections.",
    category: "Developer",
    icon: "Blend",
    keywords: ["css gradient", "gradient generator", "linear gradient", "radial gradient", "conic gradient", "background", "multi-stop gradient"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Which gradient types are supported?", answer: "Linear, radial and conic gradients, each with adjustable colours and angle (except radial, which has no angle) and any number of colour stops." },
      { question: "Is the CSS ready to use?", answer: "Yes. Copy the generated background property straight into your stylesheet." },
    ],
  },
  {
    slug: "cron-expression-helper",
    name: "Cron Expression Helper",
    description: "Build and understand cron schedules in plain English.",
    longDescription:
      "Create cron expressions from common presets or fields, and see a plain-English description plus the next run times — no more guessing at cron syntax.",
    category: "Developer",
    icon: "CalendarClock",
    keywords: ["cron", "cron expression", "crontab", "schedule", "cron generator"],
    addedOn: "2026-07-16",
    faq: [
      { question: "What cron format is used?", answer: "Standard 5-field cron (minute, hour, day-of-month, month, day-of-week)." },
      { question: "Does it show the next run times?", answer: "Yes. It lists the upcoming scheduled times so you can confirm the schedule." },
    ],
  },
  {
    slug: "diff-checker",
    name: "Diff Checker",
    description: "Compare two texts and highlight the differences line by line.",
    longDescription:
      "Paste two versions of any text or code and see a clear, line-by-line diff with additions and removals highlighted — great for spotting changes quickly.",
    category: "Developer",
    icon: "GitCompare",
    keywords: ["diff checker", "text compare", "compare text", "diff tool", "code diff"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Does it work for code?", answer: "Yes. It compares any plain text including code, config and prose, line by line." },
      { question: "Is my text uploaded?", answer: "No. The comparison runs entirely in your browser." },
    ],
  },
  {
    slug: "qr-scanner",
    name: "QR Code Scanner",
    description: "Scan a QR code with your camera or an uploaded image — instantly.",
    longDescription:
      "Point your camera at a QR code or upload a photo of one to decode it instantly. Copy the result or open it directly if it's a link. Camera video and images are processed locally in your browser — nothing is recorded or uploaded to a server.",
    category: "Everyday",
    icon: "ScanLine",
    keywords: ["qr code scanner", "scan qr code", "read qr code", "qr decoder", "qr reader online"],
    addedOn: "2026-07-31",
    popular: true,
    faq: [
      { question: "Do I need to allow camera access?", answer: "Yes, to scan live you'll need to grant camera permission. If you'd rather not, upload a photo of the QR code instead — no camera needed." },
      { question: "Is the camera feed uploaded anywhere?", answer: "No. Every frame is decoded locally in your browser. Nothing is recorded, stored or sent to a server." },
      { question: "What happens if the QR code links to a website?", answer: "The decoded result shows the link text, plus an \"Open link\" button so you can visit it directly." },
    ],
  },
  {
    slug: "income-tax-calculator",
    name: "Income Tax Calculator",
    description: "Compare old vs new tax regime and estimate your tax for FY 2026-27.",
    longDescription:
      "Enter your annual income to see your estimated tax under both the new and old regimes for FY 2026-27 (AY 2027-28) — including standard deduction, Section 87A rebate and cess — with a clear comparison of which regime saves you more.",
    category: "Calculators",
    icon: "IndianRupee",
    keywords: ["income tax calculator", "old vs new tax regime", "tax calculator india", "87a rebate", "income tax slab 2026-27"],
    addedOn: "2026-07-31",
    popular: true,
    faq: [
      { question: "Which tax year does this use?", answer: "FY 2026-27 (AY 2027-28) slabs. Tax rules can change with each Union Budget — always confirm current rates on the official Income Tax e-filing portal before filing." },
      { question: "Which regime should I choose?", answer: "The calculator shows both results side by side and tells you which one saves more for the income you entered — there's no single right answer, it depends on your income and deductions." },
      { question: "Does this account for deductions like 80C or HRA?", answer: "No, this is a simplified estimate using the standard deduction only. Detailed deductions (80C, HRA, home loan interest, etc.) mainly apply under the old regime and aren't factored in here." },
    ],
  },
  {
    slug: "ctc-calculator",
    name: "CTC to In-Hand Salary Calculator",
    description: "Estimate your monthly take-home salary from your annual CTC.",
    longDescription:
      "Enter your CTC (Cost to Company), bonus, PF percentage and professional tax to get an estimated monthly and annual take-home salary breakdown — including basic, HRA, employer/employee PF and deductions.",
    category: "Calculators",
    icon: "Banknote",
    keywords: ["ctc calculator", "in hand salary calculator", "take home salary", "ctc to net salary", "salary breakup calculator"],
    addedOn: "2026-07-31",
    popular: true,
    faq: [
      { question: "Does this include income tax?", answer: "No. This calculator focuses on the CTC-to-gross-to-net salary structure. Use the Income Tax Calculator separately to estimate tax on top of this." },
      { question: "Why is my actual salary slip different from this estimate?", answer: "Actual salary structures, PF rules and professional tax vary by company and state. This is a simplified, commonly-used estimate — check your offer letter or payslip for exact figures." },
      { question: "What's a typical Basic and HRA split?", answer: "This calculator assumes Basic is about 50% of CTC (minus bonus) and HRA is about 50% of Basic — common assumptions, though your actual company structure may differ." },
    ],
  },
  {
    slug: "rent-receipt-generator",
    name: "Rent Receipt Generator",
    description: "Create a rent receipt for HRA tax exemption claims, with an optional logo — free PDF download.",
    longDescription:
      "Generate a clean rent receipt with landlord and tenant details, rent period and payment mode — exactly what's needed to claim HRA (House Rent Allowance) tax exemption from your employer or in your ITR. Optionally add a logo (aligned left, center or right, with an adjustable size) for a property management company or landlord brand — it carries through to both the single receipt and the 12-month bulk download.",
    category: "Business",
    icon: "House",
    keywords: ["rent receipt generator", "hra rent receipt", "rent receipt for hra exemption", "rent receipt format", "rent receipt pdf"],
    addedOn: "2026-07-31",
    popular: true,
    faq: [
      { question: "Can I add a logo to the receipt?", answer: "Yes — upload a logo, choose left, center or right alignment, and adjust its size. It appears on both the single receipt download and every receipt in the 12-month bulk ZIP." },
      { question: "Do I need my landlord's PAN?", answer: "It's required by most employers if your annual rent exceeds ₹1,00,000 — ask your landlord for it if that applies to you. It's optional on the receipt otherwise." },
      { question: "Do I need a revenue stamp?", answer: "As a general practice under the Indian Stamp Act, a ₹1 revenue stamp is affixed and signed across when rent is paid in cash and the receipt amount exceeds ₹5,000. Print the receipt and add one if that applies to you." },
      { question: "How many receipts do I need for the year?", answer: "Most employers ask for one receipt per month, or a quarterly set — check what your employer's HR/payroll process requires." },
    ],
  },
  {
    slug: "passport-photo-maker",
    name: "Passport Photo Maker",
    description: "Crop a photo to passport size and print multiple copies on one sheet.",
    longDescription:
      "Upload a photo and crop it to the exact passport, visa or PAN photo size you need — India, US, UK, Schengen and more — then download a single photo or a ready-to-print sheet with multiple copies for your local print shop.",
    category: "Image",
    icon: "IdCard",
    keywords: ["passport photo maker", "passport size photo online", "passport photo print sheet", "pan card photo size", "visa photo maker"],
    addedOn: "2026-07-31",
    popular: true,
    faq: [
      { question: "Which sizes are supported?", answer: "India passport/visa (51×51mm), India PAN card (25×35mm), US passport/visa (51×51mm), Schengen/EU visa (35×45mm) and UK passport (35×45mm)." },
      { question: "Will this photo definitely be accepted?", answer: "Requirements can vary slightly by country and portal — always confirm the exact size and background requirements on the official passport/visa portal before submitting." },
      { question: "Can I print multiple copies on one sheet?", answer: "Yes. Download the print sheet option, which tiles as many copies as fit on a standard 4×6 inch photo print at 300 DPI." },
    ],
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    description: "Combine one or more images into a single PDF document.",
    longDescription:
      "Convert JPG or PNG images into a PDF — each image becomes its own page. Reorder images before converting, then download the combined PDF, processed entirely in your browser.",
    category: "Documents",
    icon: "FileImage",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf", "convert images to pdf", "combine images into pdf"],
    addedOn: "2026-07-31",
    faq: [
      { question: "Which image formats are supported?", answer: "JPG and PNG. WebP isn't supported directly — convert it to JPG or PNG first using the Image Converter." },
      { question: "Can I reorder the images before converting?", answer: "Yes, use the up/down arrows to set the page order before generating the PDF." },
    ],
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    description: "Convert every page of a PDF into separate JPG images.",
    longDescription:
      "Turn each page of a PDF into a high-quality JPG image. Single-page PDFs download instantly; multi-page PDFs give you a thumbnail grid with per-page downloads or a single ZIP of everything.",
    category: "Documents",
    icon: "Image",
    keywords: ["pdf to jpg", "pdf to image", "convert pdf to jpg", "extract images from pdf", "pdf page to jpg"],
    addedOn: "2026-07-31",
    faq: [
      { question: "What if my PDF has many pages?", answer: "You'll get a thumbnail grid with a download button per page, plus a \"Download all as .zip\" option for everything at once." },
      { question: "Is the PDF uploaded anywhere?", answer: "No. Pages are rendered and converted entirely in your browser." },
    ],
  },
  {
    slug: "pdf-to-excel",
    name: "PDF to Excel Converter",
    description: "Convert a PDF's tables into a real, downloadable Excel (.xlsx) file.",
    longDescription:
      "Reads the text layer of your PDF and detects table columns from spacing — great for bank statements, invoices and structured reports. If the PDF is password-protected (common for Indian bank statements), you'll be prompted to unlock it, checked entirely in your browser. Preview the detected rows per page, then download a real .xlsx workbook (one sheet per page) or a .csv for a single page. Scanned/image-only PDFs aren't supported (that needs OCR).",
    category: "Documents",
    icon: "FileSpreadsheet",
    keywords: ["pdf to excel", "pdf to xlsx", "convert pdf to excel online", "bank statement pdf to excel", "password protected pdf to excel", "pdf table to excel", "extract table from pdf"],
    addedOn: "2026-08-10",
    faq: [
      { question: "Does this work on scanned PDFs or photos of documents?", answer: "No — it reads the PDF's real text layer, so it only works on text-based PDFs. Scanned or image-only PDFs need OCR, which isn't supported client-side yet." },
      { question: "My bank statement PDF is password-protected — will this work?", answer: "Yes — if the PDF needs a password, you'll be prompted to enter it right in the tool. The password is checked entirely in your browser and is never uploaded anywhere." },
      { question: "Will my bank statement's columns line up correctly?", answer: "For most bank statements and invoices with clear column spacing, yes — always check the preview table before downloading, since very irregular layouts may not align perfectly." },
      { question: "Is my PDF uploaded anywhere?", answer: "No. It's read and converted entirely in your browser — nothing is ever uploaded to a server." },
      { question: "Can I get a plain CSV instead of .xlsx?", answer: "Yes — use \"Download this page as .csv\" for the currently previewed page." },
    ],
  },
  {
    slug: "markdown-converter",
    name: "Markdown Converter",
    description: "Convert Markdown to HTML or HTML back to Markdown, instantly.",
    longDescription:
      "Paste Markdown to get clean HTML — headings, bold/italic, links, lists, code blocks, blockquotes and more — or convert simple HTML back to Markdown. Runs entirely in your browser.",
    category: "Developer",
    icon: "FileCode",
    keywords: ["markdown to html", "html to markdown", "markdown converter", "md to html online", "markdown parser"],
    addedOn: "2026-07-31",
    faq: [
      { question: "Does it support full CommonMark syntax?", answer: "It covers the most common Markdown elements — headings, bold/italic, links, lists, code blocks and blockquotes — but isn't a full CommonMark-spec parser for edge cases." },
      { question: "Is my content uploaded anywhere?", answer: "No, conversion happens entirely in your browser." },
    ],
  },
  {
    slug: "csv-json-converter",
    name: "CSV to JSON Converter",
    description: "Convert CSV to JSON or JSON back to CSV, with quoted-field support.",
    longDescription:
      "Paste CSV to get a clean JSON array, or paste a JSON array of objects to get CSV — handles quoted fields containing commas correctly in both directions, and automatically flattens nested objects into dot-notation columns (address.city, address.zip) rather than failing on them.",
    category: "Developer",
    icon: "FileSpreadsheet",
    keywords: ["csv to json", "json to csv", "csv converter", "csv json online converter", "convert spreadsheet to json"],
    addedOn: "2026-07-31",
    faq: [
      { question: "What if my JSON has nested objects?", answer: "Nested objects are automatically flattened into dot-notation columns — {\"address\":{\"city\":\"Pune\"}} becomes a column named address.city. Arrays are kept as a single JSON-string cell, since expanding them into indexed columns would give each record a different column count." },
      { question: "Does it handle commas inside a CSV field?", answer: "Yes, as long as the field is wrapped in double quotes, e.g. \"Smith, John\" is parsed as one field." },
    ],
  },
  {
    slug: "flexbox-generator",
    name: "Flexbox Generator",
    description: "Design a CSS Flexbox layout visually and copy the code.",
    longDescription:
      "Set flex-direction, justify-content, align-items, wrap and gap with live controls, see the layout update instantly on sample items, and copy production-ready CSS.",
    category: "Developer",
    icon: "Columns3",
    keywords: ["flexbox generator", "css flexbox", "flex layout generator", "justify-content", "align-items"],
    addedOn: "2026-07-31",
    faq: [
      { question: "Does this generate the container or item styles?", answer: "The container's flex properties — direction, wrap, justify-content, align-items and gap — copy-ready as CSS." },
      { question: "Can I use this for a real project?", answer: "Yes, the generated CSS is standard and works anywhere Flexbox is supported." },
    ],
  },
  {
    slug: "grid-generator",
    name: "CSS Grid Generator",
    description: "Design a CSS Grid layout visually and copy the code.",
    longDescription:
      "Set columns, rows, gap and alignment with live controls, preview the grid instantly, and copy production-ready CSS Grid code.",
    category: "Developer",
    icon: "Grid3x3",
    keywords: ["css grid generator", "grid layout generator", "grid-template-columns", "css grid tool"],
    addedOn: "2026-07-31",
    faq: [
      { question: "How many columns and rows can I set?", answer: "Up to 12 columns and 6 rows, with an adjustable gap and item alignment." },
      { question: "Is the output real CSS Grid?", answer: "Yes — standard grid-template-columns/rows, gap and alignment properties." },
    ],
  },
  {
    slug: "border-radius-generator",
    name: "Border Radius Generator",
    description: "Design rounded corners visually — per corner or all at once.",
    longDescription:
      "Adjust each corner's radius independently, or link them together, with a live preview and copy-ready border-radius CSS.",
    category: "Developer",
    icon: "Ruler",
    keywords: ["border radius generator", "css rounded corners", "border-radius css", "rounded corner generator"],
    addedOn: "2026-07-31",
    faq: [
      { question: "Can I set each corner differently?", answer: "Yes — unlink the corners to control top-left, top-right, bottom-right and bottom-left independently." },
    ],
  },
  {
    slug: "box-shadow-generator",
    name: "Box Shadow Generator",
    description: "Design single or layered CSS box-shadows visually.",
    longDescription:
      "Adjust offset, blur, spread, colour and opacity, stack multiple shadow layers for depth, preview live, and copy the combined box-shadow CSS.",
    category: "Developer",
    icon: "Layers",
    keywords: ["box shadow generator", "css box-shadow", "shadow generator", "css shadow tool"],
    addedOn: "2026-07-31",
    faq: [
      { question: "Can I add more than one shadow?", answer: "Yes — add multiple shadow layers and they'll be combined into one comma-separated box-shadow value." },
      { question: "Does it support inset shadows?", answer: "Yes, each layer has an inset toggle." },
    ],
  },
  {
    slug: "glassmorphism-generator",
    name: "Glassmorphism Generator",
    description: "Design a frosted-glass CSS effect visually and copy the code.",
    longDescription:
      "Adjust background colour, opacity, blur, border and radius to create a glassmorphism card, previewed live over a colourful background, with copy-ready CSS including the Safari-compatible prefix.",
    category: "Developer",
    icon: "Contrast",
    keywords: ["glassmorphism generator", "glassmorphism css", "backdrop-filter generator", "frosted glass css"],
    addedOn: "2026-07-31",
    faq: [
      { question: "Why does the effect need a colourful background to preview?", answer: "Glassmorphism relies on blurring what's behind it — on a plain background the effect isn't visible, so the preview sits over a gradient." },
      { question: "Does this work in Safari?", answer: "The generated CSS includes both backdrop-filter and the -webkit-backdrop-filter prefix for Safari support." },
    ],
  },
  {
    slug: "svg-blob-generator",
    name: "SVG Blob Generator",
    description: "Generate random organic blob shapes as SVG.",
    longDescription:
      "Create smooth, randomised organic blob shapes for backgrounds and decoration — adjust complexity and points, pick a colour, and copy or download the SVG.",
    category: "Developer",
    icon: "Shapes",
    keywords: ["svg blob generator", "blob maker", "organic shape generator", "svg background shape"],
    addedOn: "2026-07-31",
    faq: [
      { question: "Can I regenerate a new shape?", answer: "Yes — click generate again for a new random blob at the same settings." },
      { question: "What format can I export?", answer: "Copy the raw SVG markup or download it as an .svg file." },
    ],
  },
  {
    slug: "svg-optimizer",
    name: "SVG Optimizer",
    description: "Shrink SVG file size by removing unnecessary markup.",
    longDescription:
      "Paste or upload an SVG to strip comments, metadata and redundant whitespace, and round coordinate precision — see the before/after size and a live preview of both.",
    category: "Developer",
    icon: "FileCode2",
    keywords: ["svg optimizer", "svg minifier", "optimize svg online", "reduce svg file size"],
    addedOn: "2026-07-31",
    faq: [
      { question: "Will optimizing change how my SVG looks?", answer: "No — only markup that doesn't affect rendering is removed or simplified. Compare the before/after preview to confirm." },
      { question: "Is my SVG uploaded anywhere?", answer: "No, everything runs in your browser." },
    ],
  },
  {
    slug: "code-playground",
    name: "Code Playground",
    description: "Write HTML, CSS and JS and see the result live — like a mini CodePen.",
    longDescription:
      "A live HTML + CSS + JS editor with an instant sandboxed preview — write and test snippets without leaving your browser or setting up a project.",
    category: "Developer",
    icon: "Code2",
    keywords: ["html css js playground", "online code editor", "live code preview", "codepen alternative"],
    addedOn: "2026-07-31",
    popular: true,
    faq: [
      { question: "Is my code sent to a server?", answer: "No. It runs entirely in a sandboxed preview frame in your own browser." },
      { question: "Can I use external libraries?", answer: "Not directly — this is for quick self-contained HTML/CSS/JS snippets, not full projects with dependencies." },
    ],
  },
  {
    slug: "tailwind-playground",
    name: "Tailwind Playground",
    description: "Try Tailwind CSS utility classes live, powered by the official Play CDN.",
    longDescription:
      "Write HTML with Tailwind utility classes and see the result instantly, using the official Tailwind Play CDN — great for prototyping, not a replacement for a proper production build.",
    category: "Developer",
    icon: "Wind",
    keywords: ["tailwind playground", "tailwind css online", "tailwind cdn", "try tailwind css"],
    addedOn: "2026-07-31",
    popular: true,
    faq: [
      { question: "Is this safe to use for production?", answer: "No — it uses the Tailwind Play CDN, which the Tailwind team recommends only for prototyping. Install Tailwind properly for a real project." },
      { question: "Do I need an internet connection?", answer: "Yes, it loads the Tailwind Play CDN script live." },
    ],
  },
  {
    slug: "sitemap-generator",
    name: "Sitemap.xml Generator",
    description: "Build a sitemap.xml file from a list of URLs.",
    longDescription:
      "Add your site's URLs with a change frequency and priority for each — one at a time or pasted in bulk, one per line — then copy or download a valid sitemap.xml ready to submit to search engines.",
    category: "Developer",
    icon: "ListTree",
    keywords: ["sitemap generator", "sitemap.xml generator", "create sitemap", "xml sitemap tool"],
    addedOn: "2026-07-31",
    faq: [
      { question: "What is changefreq/priority for?", answer: "Hints to search engines about how often a page changes and its relative importance — they're advisory, not guarantees of crawl behaviour." },
      { question: "Can I generate a sitemap for a large site?", answer: "Yes — paste a full list of URLs (one per line) into the bulk-add box to add them all at once, rather than one at a time. For very large sites, search engines recommend splitting into multiple sitemap files linked from a sitemap index." },
    ],
  },
  {
    slug: "ui-snippets",
    name: "UI Snippets",
    description: "Ready-made buttons, toggles, sliders, cards and more — live preview, copy the code.",
    longDescription:
      "A library of ready-made UI components — buttons, toggle switches, range sliders, cards, badges, avatars, loaders and alerts — each with a live preview and copy-ready HTML + CSS. No sign-up, nothing sent to a server.",
    category: "Developer",
    icon: "LayoutTemplate",
    keywords: ["ui snippets", "css component library", "button code snippets", "css toggle switch", "copy paste ui components"],
    addedOn: "2026-07-31",
    popular: true,
    faq: [
      { question: "What kind of components are included?", answer: "Buttons, toggle switches, range sliders, cards, badges & tags, avatars, loaders & spinners, and alerts & toasts — with several style variants each." },
      { question: "Is the code ready to paste into my project?", answer: "Yes — copy includes the CSS and HTML together, ready to drop into a page as-is." },
      { question: "Do these snippets need JavaScript?", answer: "No — every snippet is pure HTML and CSS, including the toggle switches (checkbox + label CSS trick) and animated loaders (CSS keyframes)." },
    ],
  },
  {
    slug: "youtube-thumbnail-downloader",
    name: "YouTube Thumbnail Downloader",
    description: "Download any YouTube video's thumbnail in every available resolution.",
    longDescription:
      "Paste any YouTube video, Shorts or embed link and get every thumbnail size YouTube generates — from the 120×90 default up to the full 1280×720 HD version — with one-click downloads. Nothing is uploaded; thumbnails are fetched straight from YouTube's own image servers.",
    category: "Everyday",
    icon: "Youtube",
    keywords: ["youtube thumbnail downloader", "download youtube thumbnail", "youtube thumbnail grabber", "hd youtube thumbnail", "youtube preview image download"],
    addedOn: "2026-08-02",
    popular: true,
    faq: [
      { question: "Which YouTube links work?", answer: "Standard watch links (youtube.com/watch?v=...), short links (youtu.be/...), Shorts, and embed/live links — just paste the URL or the 11-character video ID." },
      { question: "Why is the max-resolution thumbnail sometimes missing?", answer: "YouTube only generates a 1280×720 (maxresdefault) thumbnail for videos uploaded in HD. Older or lower-resolution videos may only have the smaller sizes available, and this tool automatically hides sizes that don't exist for a given video." },
      { question: "Is this legal to use?", answer: "You're downloading a publicly served preview image directly from YouTube's own CDN — the same image already visible on the video page. Respect the original creator's rights when reusing it." },
    ],
  },
  {
    slug: "cgpa-calculator",
    name: "CGPA to Percentage Calculator",
    description: "Convert CGPA to percentage (or back), plus calculate SGPA/CGPA from subject grades.",
    longDescription:
      "Convert your CGPA to a percentage using the CBSE (×9.5), VTU ((CGPA−0.75)×10), or a custom multiplier formula — or go the other way, from percentage back to CGPA. Also includes a credit-weighted SGPA/CGPA calculator: add each subject's credits and grade point and get your semester or cumulative GPA instantly.",
    category: "Calculators",
    icon: "GraduationCap",
    keywords: ["cgpa to percentage calculator", "cgpa calculator", "percentage to cgpa", "sgpa calculator", "cgpa converter", "gpa calculator india"],
    addedOn: "2026-08-02",
    popular: true,
    faq: [
      { question: "What formula converts CGPA to percentage?", answer: "CBSE uses Percentage = CGPA × 9.5. Many state and technical universities (like VTU) use Percentage = (CGPA − 0.75) × 10. Check your institution's official conversion formula if it differs, and use the custom multiplier option here to match it." },
      { question: "How is SGPA/CGPA calculated from subject grades?", answer: "It's the credit-weighted average of grade points: multiply each subject's credits by its grade point, add them up, then divide by the total credits." },
      { question: "Is this an official conversion?", answer: "No — universities set their own official conversion formula. Use this for a quick estimate and always confirm with your institution's marksheet or examination cell for anything official (admissions, job applications, etc.)." },
    ],
  },
  {
    slug: "text-to-speech",
    name: "Text to Speech",
    description: "Convert text to natural-sounding speech, free, right in your browser.",
    longDescription:
      "Type or paste any text and have it read aloud in your browser's own voices — pick from every voice your device offers, and adjust speed, pitch and volume. Nothing is uploaded or sent to a server; conversion runs entirely on-device using your browser's built-in speech engine.",
    category: "Everyday",
    icon: "Speech",
    keywords: ["text to speech", "tts online free", "text to voice", "read aloud tool", "text to speech converter"],
    addedOn: "2026-08-02",
    faq: [
      { question: "Which voices are available?", answer: "Whatever voices your browser and operating system provide — this varies by device, but most systems include several English voices and often other languages too." },
      { question: "Can I download the audio?", answer: "Not yet — this tool plays speech live in your browser using the Web Speech API, which doesn't expose an audio file to save. Use your OS's screen/audio recorder if you need a file." },
      { question: "Does this work on all browsers?", answer: "It works in Chrome, Edge, and Safari. Some browsers or older devices may have limited or no voices installed." },
    ],
  },
  {
    slug: "pdf-watermark",
    name: "PDF Watermark",
    description: "Add a text watermark to every page of a PDF, free, right in your browser.",
    longDescription:
      "Stamp any PDF with a custom text watermark — set the wording, color, opacity, size and rotation angle, then download the watermarked file instantly. Useful for marking drafts, confidential documents or proofs before sharing. Your file never leaves your device.",
    category: "Documents",
    icon: "Stamp",
    keywords: ["pdf watermark", "add watermark to pdf", "watermark pdf online free", "stamp pdf", "confidential pdf watermark"],
    addedOn: "2026-08-06",
    faq: [
      { question: "Is my PDF uploaded to a server?", answer: "No — the watermark is applied entirely in your browser using JavaScript. Your file is never uploaded anywhere." },
      { question: "Can I remove the watermark later?", answer: "The watermark is drawn directly onto each page, so it becomes a permanent part of the PDF content, similar to printing on paper." },
      { question: "Can I watermark a password-protected PDF?", answer: "Not directly — remove the password first (e.g. with a PDF unlock tool) before adding a watermark here." },
    ],
  },
  {
    slug: "pdf-page-rotator",
    name: "PDF Page Rotator",
    description: "Rotate all or specific pages of a PDF by 90°, 180° or 270°, free and instant.",
    longDescription:
      "Fix sideways or upside-down scans by rotating any PDF's pages — apply the rotation to the whole document or just a chosen range (e.g. 2-4, 7). Runs entirely in your browser, no upload required.",
    category: "Documents",
    icon: "RotateCw",
    keywords: ["rotate pdf", "rotate pdf pages online", "fix sideways pdf", "rotate pdf 90 degrees", "pdf page rotator free"],
    addedOn: "2026-08-06",
    faq: [
      { question: "Can I rotate just one page?", answer: "Yes — switch to \"Specific pages\" and enter the page number, or a range like 1-3, to rotate only those pages." },
      { question: "Does rotating affect file quality?", answer: "No — rotation only changes the page's orientation metadata, so there's no quality loss or re-compression." },
      { question: "Is my file uploaded anywhere?", answer: "No, everything happens locally in your browser using JavaScript — your PDF is never sent to a server." },
    ],
  },
  {
    slug: "pdf-page-numbers",
    name: "PDF Page Numbers",
    description: "Add page numbers to a PDF with your choice of position, format and starting number.",
    longDescription:
      "Insert page numbers into any PDF — pick the corner or center, choose a format like \"1 of 10\" or \"Page 1\", set a custom starting number, and download. Ideal for reports, ebooks and printed handouts. Processing happens entirely in your browser.",
    category: "Documents",
    icon: "ListOrdered",
    keywords: ["add page numbers to pdf", "pdf page numbering", "number pdf pages online free", "insert page numbers pdf"],
    addedOn: "2026-08-06",
    faq: [
      { question: "Can I start numbering from a page other than 1?", answer: "Yes — set \"Start at\" to any number, useful when a cover page shouldn't count as page 1." },
      { question: "What formats are supported?", answer: "Plain numbers (1, 2, 3…), \"Page 1\" style, or \"1 of 10\" style showing the total page count." },
      { question: "Will this work on scanned PDFs?", answer: "Yes — page numbers are added as a new text layer on top of each page, regardless of what's already on it." },
    ],
  },
  {
    slug: "meme-generator",
    name: "Meme Generator",
    description: "Add classic top and bottom Impact-style captions to any image, free and instant.",
    longDescription:
      "Upload any image and add bold, white-with-black-outline top and bottom text in the classic meme style. Adjust text size live, preview instantly, and download as a PNG — all rendered locally in your browser with nothing uploaded.",
    category: "Creative",
    icon: "Smile",
    keywords: ["meme generator", "meme maker free", "make a meme online", "caption generator", "impact font meme maker"],
    addedOn: "2026-08-06",
    faq: [
      { question: "Is my image uploaded to a server?", answer: "No — the meme is rendered entirely in your browser using the HTML canvas. Your image never leaves your device." },
      { question: "What image formats can I use?", answer: "Any common image format your browser can display, including JPG, PNG and WebP." },
      { question: "Can I use only top text or only bottom text?", answer: "Yes — leave either field blank and only the filled-in caption will be drawn." },
    ],
  },
  {
    slug: "random-team-generator",
    name: "Random Team Generator",
    description: "Split a list of names into balanced random teams, free and instant.",
    longDescription:
      "Paste a list of names — one per line — set how many teams you need, and get a fair, shuffled split instantly. Great for classrooms, office games, sports days or group projects. Reshuffle anytime, copy the results, or revisit past splits in history.",
    category: "Everyday",
    icon: "Shuffle",
    keywords: ["random team generator", "split into teams", "random group generator", "team randomizer online free", "group generator from list"],
    addedOn: "2026-08-06",
    faq: [
      { question: "How are teams balanced?", answer: "Names are shuffled randomly, then dealt out one by one across the teams round-robin style, so team sizes differ by at most one person." },
      { question: "Is there a limit on how many names I can enter?", answer: "No hard limit — paste as many names as you need, one per line." },
      { question: "Are my names saved anywhere?", answer: "Only in your own browser's local storage (for the history panel) — nothing is sent to a server." },
    ],
  },
  {
    slug: "image-watermark",
    name: "Image Watermark",
    description: "Add a text watermark to any image — tiled, centered, or in a corner — free and instant.",
    longDescription:
      "Protect your photos and graphics with a custom text watermark. Choose the position (tiled, centered, or any corner), set opacity, size, rotation and color, then download instantly — all rendered in your browser.",
    category: "Image",
    icon: "Layers",
    keywords: ["image watermark", "add watermark to photo", "watermark maker free", "protect photos online", "watermark image online"],
    addedOn: "2026-08-07",
    faq: [
      { question: "Is my image uploaded anywhere?", answer: "No — the watermark is drawn entirely in your browser using the HTML canvas. Your image never leaves your device." },
      { question: "Can I tile the watermark across the whole image?", answer: "Yes — choose \"Tiled\" as the position to repeat the watermark text across the entire image, which is harder to crop out than a single corner mark." },
      { question: "Does the watermark reduce image quality?", answer: "No — the original image is drawn at full resolution; only the watermark text is added on top." },
    ],
  },
  {
    slug: "signature-maker",
    name: "Signature Maker",
    description: "Draw or type a signature and download it as a transparent PNG, free and instant.",
    longDescription:
      "Create a signature by drawing with your mouse or finger, or by typing your name in a cursive style. Download as a transparent PNG, ready to drop into a document, contract, or email signature.",
    category: "Creative",
    icon: "PenTool",
    keywords: ["signature maker", "online signature generator", "draw signature free", "e-signature creator", "digital signature maker"],
    addedOn: "2026-08-07",
    faq: [
      { question: "Is this a legally binding e-signature?", answer: "No — this creates a signature image you can place on documents yourself. For legally binding e-signatures with an audit trail, use a certified e-signature provider." },
      { question: "Can I use this on a phone?", answer: "Yes — the drawing canvas supports touch, so you can sign with your finger on a phone or tablet." },
      { question: "Does the download have a background?", answer: "No — it downloads as a transparent PNG so it drops cleanly onto any document without a white box around it." },
    ],
  },
  {
    slug: "speech-to-text",
    name: "Speech to Text",
    description: "Dictate and get a live text transcript, free, right in your browser.",
    longDescription:
      "Speak into your microphone and watch your words appear as text in real time. Supports English (India, US, UK) and Hindi. Copy the transcript or download it as a .txt file — nothing is uploaded to a server.",
    category: "AI",
    icon: "Mic",
    keywords: ["speech to text", "voice to text online free", "dictation tool", "voice typing", "speech recognition online"],
    addedOn: "2026-08-07",
    faq: [
      { question: "Which browsers support this?", answer: "Chrome and Edge on desktop and Android have the best support for the Web Speech API. Safari and Firefox have limited or no support." },
      { question: "Is my voice uploaded anywhere?", answer: "Audio is processed by your browser's built-in speech engine — TechToolsCenter never receives or stores your audio." },
      { question: "Can I edit the transcript after dictating?", answer: "Yes — the transcript box is a normal editable text area, so you can correct any misheard words directly." },
    ],
  },
  {
    slug: "voice-recorder",
    name: "Voice Recorder",
    description: "Record audio from your microphone and download it, free and instant.",
    longDescription:
      "Record a voice memo, quick note, or clip directly in your browser — no app or account needed. Play it back, then download the audio file. Recording happens entirely on your device.",
    category: "Everyday",
    icon: "MicVocal",
    keywords: ["voice recorder online", "record audio free", "online audio recorder", "browser voice recorder", "microphone recorder"],
    addedOn: "2026-08-07",
    faq: [
      { question: "Is my recording uploaded anywhere?", answer: "No — recording, playback and download all happen locally in your browser. Nothing is sent to a server." },
      { question: "What file format does it download as?", answer: "Usually .webm (Chrome, Edge, Firefox) or .m4a (Safari), depending on what your browser's recorder supports." },
      { question: "Is there a recording time limit?", answer: "No built-in limit — you can record for as long as you like, though very long recordings use more memory in your browser tab." },
    ],
  },
  {
    slug: "color-blindness-simulator",
    name: "Color Blindness Simulator",
    description: "See how an image looks with protanopia, deuteranopia, tritanopia or achromatopsia.",
    longDescription:
      "Upload an image and preview it as someone with a color vision deficiency might see it. Compare original vs. simulated side-by-side with a drag slider — useful for checking that your designs remain accessible.",
    category: "Image",
    icon: "Eye",
    keywords: ["color blindness simulator", "color blind test image", "deuteranopia simulator", "accessibility color checker", "protanopia simulator"],
    addedOn: "2026-08-07",
    faq: [
      { question: "How accurate is this simulation?", answer: "It uses well-established approximation matrices common to open-source color-blindness simulators — a useful design/accessibility check, but not a clinically precise model of any individual's vision." },
      { question: "Is my image uploaded anywhere?", answer: "No — the simulation runs entirely in your browser using the HTML canvas." },
      { question: "Which type of color blindness is most common?", answer: "Deuteranopia (reduced sensitivity to green) is the most common form, affecting roughly 6% of men." },
    ],
  },
  {
    slug: "typing-speed-test",
    name: "Typing Speed Test",
    description: "Test your typing speed in words per minute, free and instant.",
    longDescription:
      "Type a random passage as fast and accurately as you can. See your live words-per-minute (WPM), accuracy percentage, and time — with character-by-character highlighting as you type.",
    category: "Everyday",
    icon: "Keyboard",
    keywords: ["typing speed test", "wpm test free", "typing test online", "words per minute test", "type speed checker"],
    addedOn: "2026-08-07",
    faq: [
      { question: "How is WPM calculated?", answer: "Words per minute is calculated as (characters typed ÷ 5) ÷ minutes elapsed — the standard formula used by most typing tests, where 5 characters counts as one \"word\"." },
      { question: "Does a typo end the test?", answer: "No — incorrect characters are highlighted but you can keep typing; your final accuracy reflects how many characters matched the passage." },
      { question: "Can I get a new passage?", answer: "Yes — click \"New passage\" anytime to restart with a different one." },
    ],
  },
  {
    slug: "countdown-timer",
    name: "Countdown Timer",
    description: "Count down to any date and time — exams, events, launches — free and live.",
    longDescription:
      "Set a target date and time, name your event, and watch a live countdown in days, hours, minutes and seconds. Your countdown is saved in your browser, and you can copy a shareable link that pre-fills it for anyone you send it to.",
    category: "Everyday",
    icon: "Hourglass",
    keywords: ["countdown timer online", "event countdown free", "exam countdown timer", "days until countdown", "online countdown clock"],
    addedOn: "2026-08-07",
    faq: [
      { question: "Does the countdown keep running if I close the tab?", answer: "Your target date and event name are saved in your browser, so reopening the page picks up right where it should — the countdown itself just recalculates live from the current time." },
      { question: "Can I share my countdown with someone else?", answer: "Yes — use \"Copy shareable link\" to get a URL that pre-fills your event name and target date/time for whoever opens it." },
      { question: "What happens after the target time passes?", answer: "The timer switches to showing how much time has passed since that moment instead of counting down to it." },
    ],
  },
  {
    slug: "number-to-words",
    name: "Number to Words",
    description: "Convert a number into words using the Indian numbering system (Lakh, Crore) — great for cheques.",
    longDescription:
      "Convert any number into words — as Rupees and Paise for cheques and legal documents, or as a plain number in words. Uses the Indian numbering system (Thousand, Lakh, Crore) throughout.",
    category: "Business",
    icon: "Sigma",
    keywords: ["number to words", "amount in words converter", "cheque amount in words", "rupees in words", "lakh crore converter"],
    addedOn: "2026-08-07",
    faq: [
      { question: "Does this support decimals for Paise?", answer: "Yes — enter a number like 1234567.50 and it converts the decimal part to Paise automatically." },
      { question: "What's the largest number it supports?", answer: "Numbers up to just under one lakh crore (10^12) — more than enough for cheques and most legal documents." },
      { question: "Does it use the Indian or international numbering system?", answer: "Indian — Thousand, Lakh, Crore — which is what Indian cheques and legal documents expect." },
    ],
  },
  {
    slug: "image-to-ascii-art",
    name: "Image to ASCII Art",
    description: "Turn any image into text-character art, free and instant.",
    longDescription:
      "Upload an image and convert it into ASCII art — adjustable width, three character sets (detailed, simple, block), and an invert option for dark backgrounds. Copy the text or download it as a .txt file.",
    category: "Creative",
    icon: "Binary",
    keywords: ["image to ascii art", "ascii art generator free", "photo to text art", "ascii converter online", "text art from image"],
    addedOn: "2026-08-07",
    faq: [
      { question: "Is my image uploaded anywhere?", answer: "No — the conversion happens entirely in your browser using the HTML canvas." },
      { question: "Why does my ASCII art look stretched?", answer: "Try adjusting the width — character cells in a monospace font are taller than they are wide, and the tool compensates for this automatically, but very small or very large widths can still look off." },
      { question: "Can I use this in code comments or a README?", answer: "Yes — copy the text output and paste it anywhere plain text or monospace formatting is supported." },
    ],
  },
  {
    slug: "markdown-to-pdf",
    name: "Markdown to PDF",
    description: "Convert Markdown notes into a clean, paginated PDF, free and instant.",
    longDescription:
      "Paste or write Markdown — headings, lists, code blocks and horizontal rules — and get a clean, paginated A4 PDF back. Great for turning notes, READMEs or docs into something shareable and printable.",
    category: "Documents",
    icon: "FileText",
    keywords: ["markdown to pdf", "convert markdown to pdf free", "md to pdf online", "markdown pdf converter", "notes to pdf"],
    addedOn: "2026-08-07",
    faq: [
      { question: "Does it support inline bold and italic text?", answer: "Bold, italic and inline code markers are recognised and stripped to plain text rather than rendered as rich formatting — headings, lists, code blocks and horizontal rules render fully, but inline emphasis is simplified." },
      { question: "Is my content uploaded anywhere?", answer: "No — the PDF is generated entirely in your browser using pdf-lib. Your Markdown never leaves your device." },
      { question: "Does it handle long documents with multiple pages?", answer: "Yes — the PDF automatically paginates onto additional A4 pages as your content grows." },
    ],
  },
  {
    slug: "business-plan-generator",
    name: "Business Plan Generator",
    description: "Write a structured business plan — summary, market, financials, milestones — with your logo, and export a PDF.",
    longDescription:
      "Build a complete business plan: executive summary, problem/solution, market and competition analysis, business model, marketing plan, operations, team, milestones with target dates, and a financial summary — all in one editable document with a live preview. Add your company logo, align it left, center or right, and adjust its size to match your brand. Pick an accent color and export a clean, investor-ready PDF. Everything is saved to your browser automatically as you type.",
    category: "Business",
    icon: "Briefcase",
    keywords: ["business plan generator", "business plan template", "startup business plan", "free business plan maker", "business plan pdf", "business plan with logo"],
    addedOn: "2026-08-16",
    faq: [
      { question: "Is this a real business plan or just a template?", answer: "It's a structured editor covering every section investors and lenders expect — executive summary, market, financials, milestones — that you fill in with your own numbers and research. It won't write your strategy for you, but it keeps the structure consistent and exports a polished PDF." },
      { question: "Can I add my company logo?", answer: "Yes — upload a logo, choose left, center or right alignment, and drag the size slider to adjust how large it appears in both the preview and the exported PDF." },
      { question: "Is my business plan data saved?", answer: "Yes — it's saved to your browser's local storage automatically. Nothing is uploaded anywhere." },
      { question: "Can I use this for a bank loan or investor pitch?", answer: "Yes — the exported PDF follows the standard business plan structure (summary, market, model, financials, milestones) that banks and investors expect to see, including for Mudra loan and other funding applications." },
    ],
  },
  {
    slug: "pitch-deck-generator",
    name: "Pitch Deck Generator",
    description: "Build an investor pitch deck — cover, problem, solution, market, ask — with images, and export a landscape PDF.",
    longDescription:
      "Put together a complete pitch deck using the standard structure investors expect: a cover slide, problem, solution, market size, product, business model, traction, competition, team and the ask — each as its own slide with a title and bullet points. Add an image to any slide and position it left, right, top or as a full-bleed background, with a size slider to adjust how much space it takes up. Reorder slides, pick an accent color, preview every slide as you build, and export a clean landscape PDF ready to present or send. Everything is saved to your browser automatically as you type.",
    category: "Business",
    icon: "Presentation",
    keywords: ["pitch deck generator", "pitch deck template", "investor pitch deck", "startup pitch deck maker", "pitch deck pdf", "pitch deck with images"],
    addedOn: "2026-08-18",
    faq: [
      { question: "How is this different from the Business Plan Generator?", answer: "A business plan is the full, detailed internal document. A pitch deck is a short, visual summary of it, built to be presented live in 10–15 minutes — this tool follows the standard slide-by-slide pitch deck structure, not the longer business-plan format." },
      { question: "How many slides should a pitch deck have?", answer: "Most investor decks run 10–15 slides. The default template here covers the 10 sections investors most commonly expect — you can add, remove or reorder slides to fit your story." },
      { question: "Can I add images to slides?", answer: "Yes — click \"Add image\" on any slide, then choose where it sits (left, right, top, or full-bleed background) and drag the size slider to adjust how much of the slide it takes up. The cover slide always uses its image as a full background behind the title." },
      { question: "Is my pitch deck data saved?", answer: "Yes — it's saved to your browser's local storage automatically as you go, images included. Nothing is uploaded anywhere." },
      { question: "Can I reorder slides?", answer: "Yes — use the up/down arrows on each slide to move it, or add and remove slides freely." },
    ],
  },
  {
    slug: "bulk-qr-generator",
    name: "Bulk QR Code Generator",
    description: "Turn a list of URLs, text or contact details into dozens of QR codes at once, then download them all as a ZIP.",
    longDescription:
      "Paste a list of values — one per line: URLs, UPI IDs, Wi-Fi credentials, phone numbers, plain text, anything — and generate a QR code for every line in one go. Set the image size and margin, preview every code in a grid, and download all of them together as a single ZIP file, each named after its value. Ideal for event badges, product labels, table QR menus, or any batch where making codes one at a time would be too slow.",
    category: "Generators",
    icon: "QrCode",
    keywords: ["bulk qr code generator", "batch qr code maker", "generate multiple qr codes", "qr code generator csv", "qr codes from list free"],
    addedOn: "2026-08-24",
    faq: [
      { question: "How many QR codes can I generate at once?", answer: "There's no hard limit — paste as many lines as you need. Very large batches (100+) may take a few seconds since each code is rendered in your browser." },
      { question: "What can I put in a value?", answer: "Anything a QR scanner can read: URLs, plain text, UPI payment strings, phone numbers (tel:), emails (mailto:), or Wi-Fi network strings (WIFI:T:WPA;S:name;P:password;;)." },
      { question: "How are the downloaded files named?", answer: "Each PNG in the ZIP is numbered and named after its value (e.g. 01-https-example-com.png), so it's easy to match codes back to what they encode." },
      { question: "Is my data uploaded anywhere?", answer: "No — every QR code is generated entirely in your browser. Nothing you type is sent to a server." },
    ],
  },
];

// Tools added on or after this date show a "New" badge. Fixed for deterministic SSR.
export const NEW_SINCE = "2026-07-11";

export function isNewTool(tool: Tool): boolean {
  return tool.addedOn >= NEW_SINCE;
}

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getPopularTools(): Tool[] {
  return tools.filter((t) => t.popular);
}

export function getRecentTools(limit = 6): Tool[] {
  return [...tools]
    .sort((a, b) => new Date(b.addedOn).getTime() - new Date(a.addedOn).getTime())
    .slice(0, limit);
}

export function getCategoryMeta(id: ToolCategory) {
  return categories.find((c) => c.id === id)!;
}
