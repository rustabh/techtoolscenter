export type ToolCategory =
  | "Business"
  | "Documents"
  | "Generators"
  | "Text"
  | "Calculators"
  | "Image";

export interface FaqItem {
  question: string;
  answer: string;
}

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
];

export const tools: Tool[] = [
  {
    slug: "invoice-maker",
    name: "Invoice Maker",
    description: "Create professional GST invoices with logo, signature and PDF download.",
    longDescription:
      "Build polished, print-ready invoices in seconds. Add your company and customer details, GST number, itemised billing, discounts, taxes, notes and terms. Upload a logo and signature, preview live, then download a PDF or print — all entirely in your browser.",
    category: "Business",
    icon: "ReceiptText",
    keywords: ["invoice", "billing", "gst invoice", "tax invoice", "invoice generator"],
    addedOn: "2026-07-10",
    popular: true,
    faq: [
      { question: "Is my invoice data stored anywhere?", answer: "No. Everything is processed locally in your browser and optionally saved to your device's local storage. Nothing is uploaded to a server." },
      { question: "Can I add my company logo and signature?", answer: "Yes. You can upload both a logo and a signature image, which appear on the generated invoice and PDF." },
      { question: "Does it calculate GST automatically?", answer: "Yes. Enter a tax percentage and UtilityHub calculates the tax amount, discounts and grand total automatically." },
    ],
  },
  {
    slug: "quotation-generator",
    name: "Quotation Generator",
    description: "Generate detailed price quotations for clients with itemised pricing.",
    longDescription:
      "Send professional quotations to your clients. Add line items, quantities, rates, taxes and validity terms, then export a clean PDF. Your last quotation is remembered automatically.",
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
    description: "Create payment receipts instantly and download them as PDF.",
    longDescription:
      "Generate simple, professional payment receipts. Record who paid, how much, the payment method and purpose, then download a PDF receipt for your records.",
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
    description: "Create detailed salary slips with earnings, deductions and net pay.",
    longDescription:
      "Produce professional pay slips for employees. Enter earnings (basic, HRA, allowances), deductions (PF, tax) and employee details to generate a clean, downloadable salary slip PDF.",
    category: "Business",
    icon: "Wallet",
    keywords: ["salary slip", "payslip", "pay slip", "salary", "payroll"],
    addedOn: "2026-07-02",
    faq: [
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
    name: "QR Generator",
    description: "Generate custom QR codes for URLs, text, Wi-Fi and more.",
    longDescription:
      "Create high-resolution QR codes for links, plain text, email, phone numbers and Wi-Fi credentials. Customise the colors and size, then download as PNG or SVG.",
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
];

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
