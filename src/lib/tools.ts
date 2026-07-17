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
  // Optional registry metadata (derived when omitted).
  seoTitle?: string;
  seoDescription?: string;
  status?: "stable" | "beta" | "new";
  version?: string;
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
      { question: "Does it calculate GST automatically?", answer: "Yes. Enter a tax percentage and TechToolsCenter calculates the tax amount, discounts and grand total automatically." },
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
      "Convert any text to and from Base64 with full Unicode support. Encode data for transport or decode Base64 strings back to readable text — entirely in your browser.",
    category: "Developer",
    icon: "Binary",
    keywords: ["base64", "encode", "decode", "base64 encoder", "base64 decoder"],
    addedOn: "2026-07-13",
    faq: [
      { question: "Does it support Unicode?", answer: "Yes. Emoji and non-Latin characters are handled correctly during both encoding and decoding." },
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
    description: "Pick a color and convert between HEX, RGB and HSL.",
    longDescription:
      "Pick any color and instantly see its HEX, RGB and HSL values. Copy any format with one click — ideal for design, CSS and theming work.",
    category: "Developer",
    icon: "Palette",
    keywords: ["color picker", "hex to rgb", "hsl", "color converter", "css color"],
    addedOn: "2026-07-14",
    faq: [
      { question: "Which formats are supported?", answer: "HEX, RGB and HSL, all kept in sync as you pick or type." },
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
    name: "Website Mockup Generator",
    description: "Turn any URL into a clean browser & device mockup image.",
    longDescription:
      "Enter any website URL and TechToolsCenter automatically fetches its title, favicon, theme colour and preview image, then wraps it in a beautiful browser window or device frame — desktop, laptop, tablet or phone. Toggle dark mode, pick a background and download a crisp PNG for decks, portfolios and social posts.",
    category: "Creative",
    icon: "MonitorSmartphone",
    keywords: ["website mockup", "browser mockup", "device mockup", "screenshot frame", "url preview"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "How does it fetch the website details?", answer: "TechToolsCenter reads the page's public metadata (title, favicon, theme colour and OpenGraph image) and renders it inside a device frame. Nothing about your visit is stored." },
      { question: "Why can't it capture a full live screenshot?", answer: "For privacy and speed we use each site's official preview image and branding rather than rendering the full page. You can also drop in your own screenshot." },
    ],
  },
  {
    slug: "app-screenshot-generator",
    name: "App Store Screenshot Generator",
    description: "Design polished App Store & Play Store screenshots in device frames.",
    longDescription:
      "Create professional app store screenshots in minutes. Upload your app screenshot, add a title and subtitle, choose a device frame (iPhone, Android, iPad) and a gradient template, then export a store-ready image in portrait or landscape — all in your browser.",
    category: "Creative",
    icon: "Smartphone",
    keywords: ["app store screenshot", "play store screenshot", "app mockup", "device frame", "app marketing"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Which devices are supported?", answer: "iPhone, Android phones and tablets (iPad / Android tablet) in both portrait and landscape, with several gradient templates." },
      { question: "What size are the exports?", answer: "Screenshots export at high resolution suitable for App Store and Google Play listings." },
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
      "A distraction-free notepad that automatically saves to your browser as you type. Keep multiple notes, with word and character counts — perfect for quick thoughts, to-dos and drafts.",
    category: "Everyday",
    icon: "StickyNote",
    keywords: ["notes", "notepad", "scratchpad", "quick notes", "online notepad"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Are my notes saved?", answer: "Yes. Notes are stored in your browser's local storage and remain after you close the tab. They never leave your device." },
      { question: "Can I keep multiple notes?", answer: "Yes. Create, rename and switch between several notes." },
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
    name: "Brand Kit Generator",
    description: "Build a brand kit from any URL — colours, fonts, favicons & ZIP.",
    longDescription:
      "Enter a website URL and TechToolsCenter builds a starter brand kit — extracting the brand colour and generating a full tint/shade palette, a suggested font pairing, favicon set and mini brand guidelines. Preview everything, then download a ZIP with the colour tokens (CSS + JSON), guidelines, favicons and manifest.",
    category: "Creative",
    icon: "Palette",
    keywords: ["brand kit", "brand guidelines", "color palette", "brand colors", "style guide"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "How are the brand colours chosen?", answer: "We read the site's theme colour and generate a balanced palette of tints and shades, plus neutral and accent suggestions." },
      { question: "What's in the ZIP?", answer: "A colours.css and colours.json, a brand-guidelines.txt, favicons, and a web manifest — a ready starting point for your brand." },
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
      "Produce a complete set of SEO tags for any page — title, description, canonical, OpenGraph and Twitter Card — from a simple form, with a live character-count check and copy-ready HTML.",
    category: "SEO",
    icon: "Tags",
    keywords: ["meta tags", "og tags", "twitter card", "seo tags", "meta generator"],
    addedOn: "2026-07-16",
    popular: true,
    faq: [
      { question: "What tags are generated?", answer: "Meta title & description, canonical, OpenGraph (title, description, image, url, type) and Twitter Card tags." },
      { question: "How long should title & description be?", answer: "Aim for ~60 characters for titles and ~155 for descriptions — the tool shows live counts." },
    ],
  },
  {
    slug: "schema-generator",
    name: "Schema Markup Generator",
    description: "Generate Schema.org JSON-LD structured data.",
    longDescription:
      "Create valid Schema.org JSON-LD for common types — Organization, Website, Article, Product, FAQ, Breadcrumb and LocalBusiness — from a simple form, ready to paste into your page head.",
    category: "SEO",
    icon: "Braces",
    keywords: ["schema generator", "json-ld", "structured data", "rich results", "schema.org"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Which schema types are supported?", answer: "Organization, Website, Article, Product, FAQPage, BreadcrumbList and LocalBusiness." },
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
      "Create beautiful linear and radial CSS gradients. Pick colours and angle, preview live, and copy production-ready CSS — perfect for backgrounds, buttons and hero sections.",
    category: "Developer",
    icon: "Blend",
    keywords: ["css gradient", "gradient generator", "linear gradient", "radial gradient", "background"],
    addedOn: "2026-07-16",
    faq: [
      { question: "Which gradient types are supported?", answer: "Linear and radial gradients with adjustable colours and angle." },
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
