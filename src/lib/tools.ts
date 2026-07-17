export type ToolCategory =
  | "Business"
  | "Documents"
  | "Generators"
  | "Text"
  | "Calculators"
  | "Image"
  | "Developer"
  | "Creative";

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
  { id: "Developer", label: "Developer Tools", description: "Encoders, formatters, hashes and everyday dev utilities.", icon: "Code2" },
  { id: "Creative", label: "Creative Studio", description: "Website mockups, app screenshots and social media kits.", icon: "Wand2" },
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
