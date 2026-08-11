import type { FaqItem } from "../tools";

/**
 * SEO Landing Page Engine — configuration only.
 * Each landing page reuses an existing core tool component (via its `core`
 * slug) with a `preset`, but ships its own unique title, metadata, intro,
 * benefits, how-to, examples and FAQ. No duplicate components, no duplicate
 * business logic — add a page by adding an object here.
 */
export interface LandingExample {
  title: string;
  input: string;
  output: string;
}

export interface LandingPage {
  slug: string;
  core: string; // existing tool slug whose component is reused
  h1: string;
  title: string; // SEO <title>
  description: string; // meta description
  intro: string;
  benefits: string[];
  howTo: string[];
  examples: LandingExample[];
  faq: FaqItem[];
  relatedTools: string[];
  relatedBlog?: string[]; // blog post slugs
  preset?: Record<string, unknown>;
  tags: string[];
}

const commonFaq = (name: string): FaqItem[] => [
  { question: `Is the ${name} free?`, answer: `Yes — it's 100% free with no sign-up, no watermark and no limits.` },
  { question: "Is my data private?", answer: "Everything runs in your browser. Your files and content are never uploaded to any server." },
];

/* ================================================================== *
 * IMAGE COMPRESSOR landing pages (core: image-compressor)            *
 * ================================================================== */
type ImgVariant = { slug: string; label: string; blurb: string; quality: number; maxWidth: number; sizeNote: string };
const imgPlatforms: ImgVariant[] = [
  { slug: "image-compressor-for-instagram", label: "Instagram", blurb: "crisp posts, stories and reels covers that upload fast", quality: 0.75, maxWidth: 1080, sizeNote: "ideal for the 1080px Instagram feed" },
  { slug: "image-compressor-for-whatsapp", label: "WhatsApp", blurb: "photos that send instantly without losing clarity", quality: 0.72, maxWidth: 1600, sizeNote: "small enough to share on any connection" },
  { slug: "image-compressor-for-linkedin", label: "LinkedIn", blurb: "professional posts and banners that load quickly", quality: 0.78, maxWidth: 1200, sizeNote: "tuned for LinkedIn feed and article images" },
  { slug: "image-compressor-for-facebook", label: "Facebook", blurb: "posts and cover photos that stay sharp after upload", quality: 0.76, maxWidth: 1200, sizeNote: "matches Facebook's recommended widths" },
  { slug: "image-compressor-for-twitter", label: "Twitter / X", blurb: "in-feed images that keep detail at small file sizes", quality: 0.75, maxWidth: 1600, sizeNote: "great for the X timeline" },
  { slug: "image-compressor-for-discord", label: "Discord", blurb: "images that fit under upload limits on any server", quality: 0.72, maxWidth: 1280, sizeNote: "stays under Discord's free upload cap" },
  { slug: "image-compressor-for-email", label: "email", blurb: "attachments light enough for any inbox", quality: 0.7, maxWidth: 1024, sizeNote: "friendly to strict email size limits" },
];
const imgSizes: { slug: string; kb: number; quality: number; maxWidth: number }[] = [
  { slug: "image-compressor-under-100kb", kb: 100, quality: 0.6, maxWidth: 1280 },
  { slug: "image-compressor-under-50kb", kb: 50, quality: 0.5, maxWidth: 1024 },
  { slug: "image-compressor-under-20kb", kb: 20, quality: 0.42, maxWidth: 800 },
  { slug: "image-compressor-under-10kb", kb: 10, quality: 0.35, maxWidth: 600 },
];
const imgDocs: { slug: string; label: string; blurb: string; quality: number; maxWidth: number }[] = [
  { slug: "image-compressor-for-passport-photo", label: "passport photo", blurb: "meet strict passport photo upload limits", quality: 0.7, maxWidth: 600 },
  { slug: "image-compressor-for-aadhar-card", label: "Aadhaar card", blurb: "shrink an Aadhaar card scan for online forms", quality: 0.6, maxWidth: 1000 },
  { slug: "image-compressor-for-pan-card", label: "PAN card", blurb: "compress a PAN card image for KYC uploads", quality: 0.6, maxWidth: 1000 },
  { slug: "image-compressor-for-government-forms", label: "government forms", blurb: "fit photos under government portal size limits", quality: 0.55, maxWidth: 1000 },
];

const imageRelated = ["image-compressor", "image-studio", "favicon-generator"];

const imageLandings: LandingPage[] = [
  ...imgPlatforms.map<LandingPage>((v) => ({
    slug: v.slug,
    core: "image-compressor",
    h1: `Image Compressor for ${v.label}`,
    title: `${v.label} Image Compressor — Compress Photos for ${v.label} Free`,
    description: `Compress images for ${v.label} online for free. Get ${v.blurb} — ${v.sizeNote}. No sign-up, private, works in your browser.`,
    intro: `Large images upload slowly and can look blurry once ${v.label} re-compresses them. This ${v.label} image compressor shrinks your photo before you upload so you get ${v.blurb}. It's pre-set to the right quality and width for ${v.label}, so you just drop your image and download — no guessing, no extra clicks.`,
    benefits: [
      `Pre-tuned for ${v.label} — ${v.sizeNote}`,
      "Massive size reduction while keeping your photo sharp",
      "Runs entirely in your browser — your image never leaves your device",
      "Free and unlimited, on mobile and desktop",
    ],
    howTo: [
      `Open this ${v.label} image compressor — the ${v.label} preset is already applied.`,
      "Upload or drag in your image.",
      "Adjust the quality slider if you want a smaller or sharper result.",
      "Download the compressed image and upload it to " + v.label + ".",
    ],
    examples: [{ title: `Compress a photo for ${v.label}`, input: "A 4 MB phone photo", output: `A light, sharp image ${v.sizeNote}` }],
    faq: [
      { question: `Will my image lose quality on ${v.label}?`, answer: `No. By compressing to ${v.label}'s recommended size first, your image looks better after upload because ${v.label} re-compresses it less.` },
      { question: `What size should images be for ${v.label}?`, answer: `This tool uses a width of about ${v.maxWidth}px, which ${v.sizeNote}.` },
      ...commonFaq("compressor"),
    ],
    relatedTools: imageRelated,
    relatedBlog: ["app-store-screenshots-that-convert"],
    preset: { quality: v.quality, maxWidth: v.maxWidth, label: v.label },
    tags: ["image compressor", v.label.toLowerCase(), "compress image"],
  })),
  ...imgSizes.map<LandingPage>((v) => ({
    slug: v.slug,
    core: "image-compressor",
    h1: `Compress Image to Under ${v.kb}KB`,
    title: `Compress Image Under ${v.kb}KB — Free Online Image Compressor`,
    description: `Compress any image to under ${v.kb}KB online for free. Reduce photo size for forms, uploads and email without losing clarity. Private, no sign-up.`,
    intro: `Need an image under ${v.kb}KB for an online form or upload limit? This compressor is pre-set to aim for very small files while keeping your photo readable. Drop in your image and download a version that comfortably fits under ${v.kb}KB — all in your browser.`,
    benefits: [
      `Targets tiny files — aims to get your image under ${v.kb}KB`,
      "Keeps text and faces readable even at small sizes",
      "No upload — your image is processed privately on your device",
      "Free, unlimited and works on any device",
    ],
    howTo: [
      `Open the under-${v.kb}KB compressor — the low-size preset is ready.`,
      "Upload your image.",
      `Lower the quality slider until the result is under ${v.kb}KB.`,
      "Download your compressed image.",
    ],
    examples: [{ title: `Get an image under ${v.kb}KB`, input: "A 3 MB scan or photo", output: `A compressed image under ${v.kb}KB` }],
    faq: [
      { question: `How do I compress an image to under ${v.kb}KB?`, answer: `Upload your image and lower the quality slider — this page starts at a low-size preset, so most images drop under ${v.kb}KB in one step.` },
      { question: "Will the image still be usable?", answer: "Yes. The compressor prioritises keeping faces and text legible, which is what most forms require." },
      ...commonFaq("compressor"),
    ],
    relatedTools: imageRelated,
    preset: { quality: v.quality, maxWidth: v.maxWidth, targetKB: v.kb, label: `under ${v.kb}KB` },
    tags: ["image compressor", `under ${v.kb}kb`, "reduce image size"],
  })),
  ...imgDocs.map<LandingPage>((v) => ({
    slug: v.slug,
    core: "image-compressor",
    h1: `Image Compressor for ${v.label}`,
    title: `Compress ${v.label} Image Online — Free ${v.label} Photo Compressor`,
    description: `Compress a ${v.label} image online for free to ${v.blurb}. Reduce the file size for uploads without losing readability. Private and no sign-up.`,
    intro: `Uploading a ${v.label} often means hitting a strict size limit. This compressor is pre-set to ${v.blurb} while keeping every detail readable. Drop your scan or photo in and download a form-ready image — nothing is uploaded to a server.`,
    benefits: [
      `Pre-set to ${v.blurb}`,
      "Keeps names, numbers and photos clearly legible",
      "100% private — your document image never leaves your browser",
      "Free and unlimited",
    ],
    howTo: [
      `Open the ${v.label} compressor — the preset is applied.`,
      "Upload your scan or photo.",
      "Check the preview and adjust quality if the portal needs a smaller file.",
      "Download and upload it to the form.",
    ],
    examples: [{ title: `Compress a ${v.label}`, input: "A high-resolution scan", output: "A small, clearly readable image for the upload" }],
    faq: [
      { question: `How do I reduce a ${v.label} image size for uploads?`, answer: `Upload it here — the page is pre-set to ${v.blurb}. Adjust the quality slider if the portal needs it even smaller.` },
      { question: "Is it safe to compress ID documents here?", answer: "Yes. The image is processed entirely in your browser and never uploaded, so your document stays private." },
      ...commonFaq("compressor"),
    ],
    relatedTools: imageRelated,
    preset: { quality: v.quality, maxWidth: v.maxWidth, label: v.label },
    tags: ["image compressor", v.label.toLowerCase(), "document upload"],
  })),
];

/* ================================================================== *
 * QR CODE landing pages (core: qr-generator)                         *
 * ================================================================== */
type QrVariant = { slug: string; type: string; label: string; use: string };
const qrVariants: QrVariant[] = [
  { slug: "qr-code-for-wifi", type: "wifi", label: "WiFi", use: "let guests join your WiFi with one scan — no typing passwords" },
  { slug: "qr-code-for-restaurant", type: "url", label: "restaurant", use: "link diners straight to your digital menu or ordering page" },
  { slug: "qr-code-for-google-review", type: "googlereview", label: "Google review", use: "send customers directly to your Google review form" },
  { slug: "qr-code-for-business-card", type: "vcard", label: "business card", use: "share your contact details as a scannable digital card" },
  { slug: "qr-code-for-payment", type: "upi", label: "payment", use: "accept payments instantly with a scannable code" },
  { slug: "qr-code-for-upi", type: "upi", label: "UPI", use: "accept UPI payments to your VPA with a scan" },
  { slug: "qr-code-for-whatsapp", type: "whatsapp", label: "WhatsApp", use: "start a WhatsApp chat with a prefilled message in one scan" },
  { slug: "qr-code-for-instagram", type: "instagram", label: "Instagram", use: "grow followers by linking straight to your Instagram profile" },
  { slug: "qr-code-for-facebook", type: "facebook", label: "Facebook", use: "send people to your Facebook page or post" },
  { slug: "qr-code-for-linkedin", type: "linkedin", label: "LinkedIn", use: "connect professionally by linking to your LinkedIn profile" },
  { slug: "qr-code-for-youtube", type: "video", label: "YouTube", use: "drive views by linking to your channel or video" },
  { slug: "qr-code-for-menu", type: "pdf", label: "menu", use: "show a contactless PDF menu with a single scan" },
  { slug: "qr-code-for-event", type: "event", label: "event", use: "add your event to anyone's calendar with a scan" },
  { slug: "qr-code-for-vcard", type: "vcard", label: "vCard", use: "share a full digital contact card people can save instantly" },
  { slug: "qr-code-for-location", type: "googlemaps", label: "location", use: "guide people to your exact spot on Google Maps" },
  { slug: "qr-code-for-pdf", type: "pdf", label: "PDF", use: "link to a brochure, menu or document PDF" },
  { slug: "qr-code-for-image", type: "image", label: "image", use: "share a photo or gallery via a scannable link" },
  { slug: "qr-code-for-video", type: "video", label: "video", use: "play a video the moment someone scans" },
  { slug: "qr-code-for-app-download", type: "url", label: "app download", use: "send users to your app's download page" },
  { slug: "qr-code-for-google-play", type: "playstore", label: "Google Play", use: "link Android users straight to your Play Store listing" },
  { slug: "qr-code-for-app-store", type: "appstore", label: "App Store", use: "link iOS users straight to your App Store listing" },
];
const qrRelated = ["qr-generator", "barcode-generator", "brand-kit-generator"];

const qrLandings: LandingPage[] = qrVariants.map((v) => ({
  slug: v.slug,
  core: "qr-generator",
  h1: `${v.label[0].toUpperCase() + v.label.slice(1)} QR Code Generator`,
  title: `${v.label[0].toUpperCase() + v.label.slice(1)} QR Code Generator — Free & Custom`,
  description: `Create a free ${v.label} QR code online. ${v.use[0].toUpperCase() + v.use.slice(1)}. Add your colours and logo, export PNG, SVG or PDF.`,
  intro: `Make a ${v.label} QR code in seconds — this page opens QR Studio with the ${v.label} form already selected, so you just fill in your details. ${v.use[0].toUpperCase() + v.use.slice(1)}. Style it with your brand colours and logo, then download a high-resolution PNG, SVG or PDF ready for print or screen.`,
  benefits: [
    `Ready to go — the ${v.label} form is pre-selected`,
    "Add your logo and brand colours for a custom code",
    "Export PNG, SVG, PDF or a ZIP bundle",
    "Free, unlimited and private — generated in your browser",
  ],
  howTo: [
    `Open this ${v.label} QR generator — the ${v.label} type is already selected.`,
    "Fill in your details in the form.",
    "Style the code with your colours, shape and logo.",
    "Download it as PNG, SVG or PDF and start sharing.",
  ],
  examples: [{ title: `A ${v.label} QR code`, input: `Your ${v.label} details`, output: "A branded, scannable QR code ready to print or post" }],
  faq: [
    { question: `How do I make a ${v.label} QR code?`, answer: `Open this page — the ${v.label} form is already selected. Enter your details, style it, and download. It takes under a minute.` },
    { question: "Can I add my logo and colours?", answer: "Yes. You can set custom colours, dot shapes and drop your logo into the centre while keeping it scannable." },
    ...commonFaq("QR generator"),
  ],
  relatedTools: qrRelated,
  relatedBlog: ["how-to-make-qr-code-for-business"],
  preset: { type: v.type },
  tags: ["qr code", v.label.toLowerCase(), "qr generator"],
}));

/* ================================================================== *
 * PDF COMPRESS landing pages (core: pdf-compress)                    *
 * ================================================================== */
const pdfVariants: { slug: string; h1: string; goal: string; kw: string }[] = [
  { slug: "compress-pdf-under-1mb", h1: "Compress PDF to Under 1MB", goal: "get your PDF under 1 MB", kw: "under 1mb" },
  { slug: "compress-pdf-under-500kb", h1: "Compress PDF to Under 500KB", goal: "shrink your PDF below 500 KB", kw: "under 500kb" },
  { slug: "compress-pdf-under-200kb", h1: "Compress PDF to Under 200KB", goal: "reduce your PDF under 200 KB", kw: "under 200kb" },
  { slug: "compress-pdf-for-email", h1: "Compress PDF for Email", goal: "make your PDF light enough to email", kw: "for email" },
  { slug: "compress-pdf-for-whatsapp", h1: "Compress PDF for WhatsApp", goal: "shrink your PDF to share on WhatsApp", kw: "for whatsapp" },
  { slug: "compress-pdf-for-government-upload", h1: "Compress PDF for Government Upload", goal: "fit your PDF under government portal limits", kw: "for government upload" },
  { slug: "compress-pdf-for-passport", h1: "Compress PDF for Passport Application", goal: "meet passport application file-size limits", kw: "for passport" },
  { slug: "compress-pdf-for-job-application", h1: "Compress PDF for Job Application", goal: "make your resume PDF small enough to upload anywhere", kw: "for job application" },
];
const pdfRelated = ["pdf-compress", "pdf-merge", "pdf-split", "pdf-studio"];

const pdfLandings: LandingPage[] = pdfVariants.map((v) => ({
  slug: v.slug,
  core: "pdf-compress",
  h1: v.h1,
  title: `${v.h1} — Free Online PDF Compressor`,
  description: `${v.h1} online for free. Quickly ${v.goal} without losing readability. Private, no sign-up — your file never leaves your browser.`,
  intro: `Struggling with an oversized PDF? This page helps you ${v.goal} in one step. Drop your PDF in and the compressor reduces its size while keeping the text sharp and readable — all processed privately in your browser, with nothing uploaded to a server.`,
  benefits: [
    `Purpose-built to ${v.goal}`,
    "Keeps text crisp and documents readable",
    "100% private — your PDF is never uploaded",
    "Free, unlimited and works on any device",
  ],
  howTo: [
    "Open this PDF compressor.",
    "Upload or drag in your PDF.",
    "Let it compress — the smaller file is generated instantly.",
    "Download your compressed PDF.",
  ],
  examples: [{ title: v.h1, input: "A large PDF (several MB)", output: "A compressed PDF ready for upload or sending" }],
  faq: [
    { question: `How do I ${v.goal}?`, answer: `Upload your PDF here and the compressor reduces it automatically. Most documents shrink significantly in a single pass.` },
    { question: "Will the text stay readable?", answer: "Yes. The compressor focuses on reducing size while keeping text sharp and legible." },
    ...commonFaq("PDF compressor"),
  ],
  relatedTools: pdfRelated,
  relatedBlog: ["how-to-create-gst-invoice-online-free"],
  preset: { label: v.kw },
  tags: ["compress pdf", v.kw, "pdf compressor"],
}));

/* ================================================================== *
 * FONT (Text Studio) landing pages (core: font-style-generator)      *
 * ================================================================== */
const fontVariants: { slug: string; label: string; use: string }[] = [
  { slug: "instagram-font-generator", label: "Instagram", use: "bios, captions and story text that stands out" },
  { slug: "whatsapp-font-generator", label: "WhatsApp", use: "status updates and messages with a personal touch" },
  { slug: "facebook-font-generator", label: "Facebook", use: "posts and comments that catch the eye" },
  { slug: "discord-font-generator", label: "Discord", use: "usernames, channel names and messages" },
  { slug: "twitter-font-generator", label: "Twitter / X", use: "tweets and bios that stand apart in the feed" },
  { slug: "tiktok-font-generator", label: "TikTok", use: "captions and profile text with style" },
];
const fontRelated = ["font-style-generator", "symbol-library", "emoji-studio"];

const fontLandings: LandingPage[] = fontVariants.map((v) => ({
  slug: v.slug,
  core: "font-style-generator",
  h1: `${v.label} Font Generator`,
  title: `${v.label} Font Generator — Copy & Paste Fancy Fonts`,
  description: `Free ${v.label} font generator. Turn plain text into fancy fonts you can copy and paste for ${v.use}. Works instantly, no sign-up.`,
  intro: `Make your ${v.label} text pop with this free ${v.label} font generator. Type any text and instantly get dozens of fancy Unicode font styles you can copy and paste for ${v.use}. It works because these are real Unicode characters — so they display anywhere, including ${v.label}.`,
  benefits: [
    `Dozens of styles perfect for ${v.label}`,
    "One-tap copy — paste straight into " + v.label,
    "Real Unicode fonts that display everywhere",
    "Free, unlimited and works on mobile",
  ],
  howTo: [
    `Open the ${v.label} font generator.`,
    "Type or paste your text.",
    "Browse the generated font styles.",
    `Tap to copy your favourite and paste it into ${v.label}.`,
  ],
  examples: [{ title: `Style text for ${v.label}`, input: "hello world", output: "𝓱𝓮𝓵𝓵𝓸 𝔀𝓸𝓻𝓵𝓭, 𝕙𝕖𝕝𝕝𝕠 𝕨𝕠𝕣𝕝𝕕 and many more" }],
  faq: [
    { question: `Do these fonts work on ${v.label}?`, answer: `Yes. They're real Unicode characters, so they display correctly on ${v.label} and almost everywhere else — just copy and paste.` },
    { question: "Is it free to use?", answer: "Completely free with no sign-up and no limit on how much text you style." },
    ...commonFaq("font generator"),
  ],
  relatedTools: fontRelated,
  tags: ["font generator", v.label.toLowerCase(), "fancy text"],
}));

/* ================================================================== *
 * FAVICON landing pages (core: favicon-generator)                    *
 * ================================================================== */
const faviconVariants: { slug: string; label: string; note: string }[] = [
  { slug: "favicon-generator-for-wordpress", label: "WordPress", note: "upload it as your Site Icon under Appearance → Customize" },
  { slug: "favicon-generator-for-shopify", label: "Shopify", note: "add it under Online Store → Themes → Customize → Favicon" },
  { slug: "favicon-generator-for-react", label: "React", note: "drop the files into your public folder and link them in index.html" },
  { slug: "favicon-generator-for-nextjs", label: "Next.js", note: "place the icons in your app directory or public folder" },
  { slug: "favicon-generator-for-html", label: "HTML", note: "add the generated <link> tags to your <head>" },
];
const faviconRelated = ["favicon-generator", "brand-kit-generator", "image-compressor"];

const faviconLandings: LandingPage[] = faviconVariants.map((v) => ({
  slug: v.slug,
  core: "favicon-generator",
  h1: `Favicon Generator for ${v.label}`,
  title: `Favicon Generator for ${v.label} — Free Favicon Maker`,
  description: `Create a favicon for ${v.label} online for free. Generate all the icon sizes you need and ${v.note}. Private, no sign-up.`,
  intro: `Add a professional favicon to your ${v.label} site in minutes. This favicon generator creates every size you need from a single image or emoji. Once generated, ${v.note}. Everything runs in your browser, so your image is never uploaded.`,
  benefits: [
    `Generates all sizes ${v.label} needs`,
    "Start from an image, logo or emoji",
    "Clear instructions for " + v.label,
    "Free, private and unlimited",
  ],
  howTo: [
    `Open the ${v.label} favicon generator.`,
    "Upload your logo or pick an emoji.",
    "Preview and download the favicon pack.",
    `Install it on ${v.label} — ${v.note}.`,
  ],
  examples: [{ title: `Favicon for ${v.label}`, input: "A square logo or emoji", output: "A full favicon pack with every required size" }],
  faq: [
    { question: `How do I add a favicon to ${v.label}?`, answer: `Generate the favicon here, then ${v.note}.` },
    { question: "What size should a favicon be?", answer: "Start from a square image at least 512×512px — the generator produces every smaller size automatically." },
    ...commonFaq("favicon generator"),
  ],
  relatedTools: faviconRelated,
  tags: ["favicon generator", v.label.toLowerCase(), "favicon"],
}));

/* ================================================================== *
 * IMAGE CONVERTER landing pages (core: image-converter)              *
 * ================================================================== */
const convVariants: { slug: string; from: string; to: string; toFmt: string }[] = [
  { slug: "png-to-jpg", from: "PNG", to: "JPG", toFmt: "jpeg" },
  { slug: "jpg-to-png", from: "JPG", to: "PNG", toFmt: "png" },
  { slug: "png-to-webp", from: "PNG", to: "WEBP", toFmt: "webp" },
  { slug: "webp-to-png", from: "WEBP", to: "PNG", toFmt: "png" },
  { slug: "avif-to-png", from: "AVIF", to: "PNG", toFmt: "png" },
];
const convRelated = ["image-converter", "image-compressor", "image-resizer"];

const converterLandings: LandingPage[] = convVariants.map((v) => ({
  slug: v.slug,
  core: "image-converter",
  h1: `${v.from} to ${v.to} Converter`,
  title: `${v.from} to ${v.to} — Free Online ${v.from} to ${v.to} Converter`,
  description: `Convert ${v.from} to ${v.to} online for free. Fast, private ${v.from} to ${v.to} conversion in your browser — no upload, no watermark, no sign-up.`,
  intro: `Convert ${v.from} images to ${v.to} in seconds. This page opens the converter with ${v.to} already selected — just drop your ${v.from} file in and download the ${v.to}. Everything happens in your browser, so your image is never uploaded to a server.`,
  benefits: [
    `Output is pre-set to ${v.to} — one click and done`,
    `Keeps your image crisp while converting ${v.from} → ${v.to}`,
    "100% private — nothing is uploaded",
    "Free, unlimited and works on any device",
  ],
  howTo: [
    `Open this ${v.from} to ${v.to} converter — ${v.to} output is already selected.`,
    `Upload your ${v.from} image.`,
    v.toFmt === "png" ? "Click convert." : "Set the quality if you want, then click convert.",
    `Download your ${v.to} file.`,
  ],
  examples: [{ title: `Convert ${v.from} to ${v.to}`, input: `A ${v.from} image`, output: `The same image saved as ${v.to}` }],
  faq: [
    { question: `How do I convert ${v.from} to ${v.to}?`, answer: `Upload your ${v.from} here — ${v.to} is already selected as the output. Click convert and download. It's instant and free.` },
    { question: `Will ${v.to} lose quality?`, answer: v.toFmt === "png" ? "No — PNG is lossless, so your image keeps full quality." : `You control the quality with a slider, so you can balance size and sharpness.` },
    ...commonFaq("converter"),
  ],
  relatedTools: convRelated,
  preset: { to: v.toFmt },
  tags: ["image converter", v.slug.replace(/-/g, " "), `${v.from.toLowerCase()} to ${v.to.toLowerCase()}`],
}));

/* ================================================================== *
 * IMAGE RESIZER landing pages (core: image-resizer)                  *
 * ================================================================== */
const resizeVariants: { slug: string; label: string; w: number; h: number; use: string }[] = [
  { slug: "resize-image-for-instagram", label: "Instagram", w: 1080, h: 1080, use: "the perfect square for Instagram posts" },
  { slug: "resize-image-for-facebook", label: "Facebook", w: 1200, h: 630, use: "the ideal Facebook post and link size" },
  { slug: "resize-image-for-linkedin", label: "LinkedIn", w: 1200, h: 627, use: "the recommended LinkedIn post size" },
  { slug: "resize-image-for-twitter", label: "Twitter / X", w: 1600, h: 900, use: "the 16:9 size that looks best on X" },
  { slug: "resize-image-for-youtube", label: "YouTube", w: 1280, h: 720, use: "the exact YouTube thumbnail size" },
  { slug: "resize-image-for-whatsapp", label: "WhatsApp", w: 640, h: 640, use: "a crisp square for your WhatsApp display picture" },
  { slug: "resize-image-for-passport", label: "passport photo", w: 600, h: 600, use: "a square passport-style photo size" },
  { slug: "resize-image-for-aadhar", label: "Aadhaar", w: 400, h: 400, use: "a small square suited to Aadhaar-style forms" },
];
const resizeRelated = ["image-resizer", "image-compressor", "image-converter"];

const resizerLandings: LandingPage[] = resizeVariants.map((v) => ({
  slug: v.slug,
  core: "image-resizer",
  h1: `Resize Image for ${v.label[0].toUpperCase() + v.label.slice(1)}`,
  title: `Resize Image for ${v.label} — Free ${v.w}×${v.h} Image Resizer`,
  description: `Resize any image for ${v.label} to ${v.w}×${v.h} online for free. Get ${v.use} in one click — private, no upload, no sign-up.`,
  intro: `Get ${v.use}. This ${v.label} image resizer opens pre-set to ${v.w}×${v.h}, so you just upload your photo and download the perfectly sized result. It all happens in your browser — nothing is uploaded.`,
  benefits: [
    `Pre-set to ${v.w}×${v.h} — ${v.use}`,
    "Lock the aspect ratio or set exact dimensions",
    "100% private — your image never leaves your device",
    "Free, unlimited and works on mobile",
  ],
  howTo: [
    `Open this ${v.label} resizer — the ${v.w}×${v.h} size is already set.`,
    "Upload your image.",
    "Adjust the size if you need something custom.",
    "Click resize and download.",
  ],
  examples: [{ title: `Resize for ${v.label}`, input: "Any photo", output: `A ${v.w}×${v.h} image ready for ${v.label}` }],
  faq: [
    { question: `What size should an image be for ${v.label}?`, answer: `${v.w}×${v.h} pixels — which is why this page is pre-set to it. You can still enter a custom size if you need one.` },
    { question: "Will my image be stretched?", answer: "No. The resizer fills the target size without distorting your image, so it always looks natural." },
    ...commonFaq("resizer"),
  ],
  relatedTools: resizeRelated,
  preset: { width: v.w, height: v.h, label: v.label },
  tags: ["image resizer", v.label.toLowerCase(), `${v.w}x${v.h}`],
}));

/* ================================================================== *
 * RESUME BUILDER landing pages (core: resume-builder)                *
 * ================================================================== */
const resumeVariants: { slug: string; label: string; use: string; skillsNote: string; example: string }[] = [
  { slug: "resume-builder-for-freshers", label: "Freshers", use: "lead with your projects, internships and academic achievements when you don't have work experience yet", skillsNote: "List technical skills, tools and certifications prominently since you may not have a long work history to lean on", example: "A final-year CS student with 2 internships and 3 college projects" },
  { slug: "resume-builder-for-software-engineers", label: "Software Engineers", use: "showcase your tech stack, shipped projects and measurable impact the way recruiters actually scan for", skillsNote: "Group languages, frameworks and tools clearly, and quantify impact wherever you can (latency reduced, users served, bugs cut)", example: "A backend engineer highlighting a migration that cut API response time by 40%" },
  { slug: "resume-builder-for-mba-graduates", label: "MBA Graduates", use: "lead with leadership roles, case competitions and quantifiable business outcomes", skillsNote: "Emphasise strategic and analytical skills — market sizing, financial modelling, stakeholder management", example: "An MBA grad listing a consulting project that identified a 15% cost-saving opportunity" },
  { slug: "resume-builder-for-teachers", label: "Teachers", use: "highlight your certifications, subjects taught and measurable classroom outcomes", skillsNote: "List teaching certifications, grade levels, subjects and any curriculum or extracurricular programs you led", example: "A teacher noting a reading program that raised average test scores by 12%" },
  { slug: "resume-builder-for-nurses", label: "Nurses", use: "highlight your clinical certifications, specialisations and patient-care experience", skillsNote: "List licences (RN, BLS, ACLS), specialisations and patient-load or unit details employers screen for first", example: "An ICU nurse listing ACLS certification and a 1:2 patient-care ratio" },
  { slug: "resume-builder-for-sales", label: "Sales Professionals", use: "lead with quota attainment, revenue numbers and client wins", skillsNote: "Quantify everything — quota percentage, deal size, pipeline generated, retention rate", example: "An account executive noting 128% of annual quota and a $500K deal closed" },
  { slug: "resume-builder-for-graphic-designers", label: "Graphic Designers", use: "showcase your portfolio, design tools and measurable creative impact", skillsNote: "List design tools (Figma, Adobe Creative Suite) and link directly to your portfolio site or Behance/Dribbble profile", example: "A graphic designer noting a rebrand that increased social engagement by 30%" },
  { slug: "resume-builder-for-accountants", label: "Accountants", use: "highlight your certifications, audit experience and the accounting systems you're fluent in", skillsNote: "List certifications (CA, CPA, CMA), software (Tally, QuickBooks, SAP) and specific compliance areas you've handled", example: "An accountant listing GST filing experience for 40+ SME clients" },
  { slug: "resume-builder-for-data-analysts", label: "Data Analysts", use: "lead with the tools, datasets and business impact of your analysis, not just job duties", skillsNote: "List tools (SQL, Python, Excel, Power BI/Tableau) and quantify impact — decisions influenced, revenue identified, time saved", example: "A data analyst noting a dashboard that cut reporting time from 3 days to 2 hours" },
  { slug: "resume-builder-for-marketing-professionals", label: "Marketing Professionals", use: "lead with campaign results, channels you've run and measurable growth metrics", skillsNote: "List channels (SEO, paid ads, email, social) and quantify outcomes — traffic growth, CAC reduction, conversion lift", example: "A marketer noting a campaign that grew organic traffic 65% in 6 months" },
  { slug: "resume-builder-for-civil-engineers", label: "Civil Engineers", use: "highlight the projects you've delivered, technical certifications and software you use", skillsNote: "List software (AutoCAD, Revit, STAAD Pro), licences and the project scale (budget, size) you've handled", example: "A civil engineer listing a ₹2 crore residential project delivered on schedule" },
];
const resumeRelated = ["resume-builder", "word-counter", "pdf-compress"];

const resumeLandings: LandingPage[] = resumeVariants.map((v) => ({
  slug: v.slug,
  core: "resume-builder",
  h1: `Resume Builder for ${v.label}`,
  title: `Resume Builder for ${v.label} — Free ATS-Friendly Template`,
  description: `Build a free, ATS-friendly resume for ${v.label}. ${v.use[0].toUpperCase() + v.use.slice(1)}. No sign-up, export to PDF instantly.`,
  intro: `Generic resume advice doesn't account for what ${v.label} actually need to highlight. This resume builder gives you a clean, single-column, ATS-safe layout, so you can focus on the part that matters: content. ${v.use[0].toUpperCase() + v.use.slice(1)}.`,
  benefits: [
    `Single-column, ATS-safe layout — no tables or graphics that confuse parsers`,
    v.skillsNote,
    "Undo/redo and autosave — nothing is lost while you edit",
    "Export straight to PDF, free and unlimited",
  ],
  howTo: [
    "Open the resume builder — it starts with an editable example already filled in.",
    "Replace the summary, experience and education sections with your own details.",
    `List your skills — ${v.skillsNote.charAt(0).toLowerCase() + v.skillsNote.slice(1)}.`,
    "Export to PDF and check it renders cleanly before you send it.",
  ],
  examples: [{ title: `Resume for ${v.label}`, input: v.example, output: "A clean, single-page, ATS-friendly PDF resume" }],
  faq: [
    { question: `What should a ${v.label.toLowerCase()} resume focus on?`, answer: `${v.use[0].toUpperCase() + v.use.slice(1)}. ${v.skillsNote}.` },
    { question: "Will this resume pass an ATS (Applicant Tracking System)?", answer: "Yes — it uses a single-column, text-based layout with standard section headings, which is what most ATS software parses correctly. Avoid switching to a multi-column design if you need ATS compatibility." },
    ...commonFaq("resume builder"),
  ],
  relatedTools: resumeRelated,
  relatedBlog: ["how-to-build-ats-friendly-resume-free"],
  tags: ["resume builder", v.label.toLowerCase(), "resume template", "ats resume"],
}));

/* ================================================================== *
 * INVOICE MAKER landing pages (core: invoice-maker)                  *
 * ================================================================== */
const invoiceVariants: { slug: string; label: string; use: string; note: string; example: string }[] = [
  { slug: "invoice-template-for-freelancers", label: "Freelancers", use: "bill clients professionally with your logo, payment terms and a clean itemised breakdown", note: "add your payment terms (e.g. due in 15 days) and accepted payment methods clearly at the bottom", example: "A freelance designer billing for a 3-week landing page project" },
  { slug: "invoice-template-for-consultants", label: "Consultants", use: "bill for hourly or project-based work with a clear scope and payment terms", note: "itemise by deliverable or by hour so the client can see exactly what they're paying for", example: "A marketing consultant invoicing for 20 hours of strategy work" },
  { slug: "invoice-template-for-contractors", label: "Contractors", use: "itemise labour, materials and taxes for construction and trade work", note: "separate labour and materials into distinct line items — clients and accountants both expect this breakdown", example: "An electrician invoicing for a rewiring job with separate labour and parts costs" },
  { slug: "invoice-template-for-photographers", label: "Photographers", use: "bill for shoots, packages and licensing with a polished, branded invoice", note: "list the package or shoot type as one line item and any add-ons (extra edits, prints, usage rights) as separate ones", example: "A wedding photographer invoicing a full-day package plus an album add-on" },
  { slug: "invoice-template-for-web-developers", label: "Web Developers", use: "bill for project milestones, hourly work or retainers with a clear scope", note: "break the invoice into project phases or milestones (design, development, deployment) so clients see exactly what each payment covers", example: "A freelance developer invoicing the second of three milestone payments for a website build" },
  { slug: "invoice-template-for-interior-designers", label: "Interior Designers", use: "bill for design fees, sourced materials and project management separately", note: "separate your design/consultation fee from materials and vendor costs — clients expect to see labour and markup itemised distinctly", example: "An interior designer invoicing a consultation fee plus furniture sourced for a living room project" },
  { slug: "invoice-template-for-event-planners", label: "Event Planners", use: "itemise vendor costs, planning fees and day-of coordination clearly", note: "list each vendor or service (catering, venue, decor) as its own line item alongside your planning fee, so clients see exactly where the budget went", example: "An event planner invoicing a wedding package covering venue coordination and three vendors" },
  { slug: "invoice-template-for-tutors", label: "Tutors", use: "bill for individual or package sessions with a clean, simple breakdown parents and students trust", note: "itemise by session date or as a package (e.g. a 10-session bundle) so it's clear exactly what was delivered", example: "A private tutor invoicing a monthly package of 8 one-hour sessions" },
  { slug: "invoice-template-for-cleaning-services", label: "Cleaning Services", use: "bill for recurring or one-time jobs with the service type and any add-ons clearly listed", note: "list the service type (standard, deep clean, move-out) and any add-ons (windows, carpets) as separate line items", example: "A cleaning service invoicing a monthly recurring client plus a one-time deep-clean add-on" },
];
const invoiceRelated = ["invoice-maker", "quotation-generator", "gst-calculator"];

const invoiceLandings: LandingPage[] = invoiceVariants.map((v) => ({
  slug: v.slug,
  core: "invoice-maker",
  h1: `Invoice Template for ${v.label}`,
  title: `Invoice Template for ${v.label} — Free Online Invoice Maker`,
  description: `Create a free invoice for ${v.label.toLowerCase()}. ${v.use[0].toUpperCase() + v.use.slice(1)}. GST breakdown, logo, signature, export to PDF.`,
  intro: `${v.label} need an invoice that looks professional and gets paid faster. This invoice maker opens ready to ${v.use}, with your logo, signature, and a proper GST/tax breakdown if you need one — no accounting software required.`,
  benefits: [
    `Built to ${v.use}`,
    (v.note.charAt(0).toUpperCase() + v.note.slice(1)),
    "Add your logo, signature and a payment QR code",
    "Export to PDF, PNG or print directly — free and unlimited",
  ],
  howTo: [
    "Open the invoice maker — a sample invoice loads so you can see the layout.",
    "Add your business details, logo and the client's details.",
    `List your line items — ${v.note}.`,
    "Add GST/tax if applicable, then export to PDF or print.",
  ],
  examples: [{ title: `Invoice for ${v.label.toLowerCase()}`, input: v.example, output: "A polished, itemised PDF invoice ready to send" }],
  faq: [
    { question: `What should a ${v.label.toLowerCase()} invoice include?`, answer: `Your business details, the client's details, itemised charges, and payment terms. ${(v.note.charAt(0).toUpperCase() + v.note.slice(1))}.` },
    { question: "Can I add GST or tax to the invoice?", answer: "Yes — the invoice maker supports GST/CGST/SGST/IGST breakdowns for Indian businesses, or you can leave tax fields blank if they don't apply." },
    ...commonFaq("invoice maker"),
  ],
  relatedTools: invoiceRelated,
  relatedBlog: ["how-to-create-gst-invoice-online-free"],
  tags: ["invoice template", v.label.toLowerCase(), "invoice maker", "billing"],
}));

/* ================================================================== */
export const landingPages: LandingPage[] = [
  ...imageLandings,
  ...qrLandings,
  ...pdfLandings,
  ...fontLandings,
  ...faviconLandings,
  ...converterLandings,
  ...resizerLandings,
  ...resumeLandings,
  ...invoiceLandings,
];

export function getLanding(slug: string): LandingPage | undefined {
  return landingPages.find((l) => l.slug === slug);
}
export function landingsForCore(core: string, exceptSlug?: string): LandingPage[] {
  return landingPages.filter((l) => l.core === core && l.slug !== exceptSlug);
}
export function landingSlugs(): string[] {
  return landingPages.map((l) => l.slug);
}
