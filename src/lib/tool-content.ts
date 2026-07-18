import type { Tool, ToolCategory, FaqItem } from "./tools";

/**
 * Generates richer, category-aware page content so every tool page reads
 * differently (better for SEO and reader value) instead of sharing one
 * boilerplate block. Everything is derived from the tool's own metadata.
 */

export interface Step {
  name: string;
  text: string;
}

const HOW_TO: Record<ToolCategory, Step[]> = {
  Business: [
    { name: "Open the tool and pick your document", text: "Choose the document or format you need. Everything loads instantly in your browser — no account, no install." },
    { name: "Fill in your business details", text: "Add your company, client, line items and totals. The live preview updates as you type so numbers are always accurate." },
    { name: "Add branding & tax", text: "Upload a logo, set your tax or GST, add a signature or stamp, and pick a template that matches your brand." },
    { name: "Download or print", text: "Export a print-ready PDF or image, or print directly. Your data stays on your device the whole time." },
  ],
  Documents: [
    { name: "Add your file or content", text: "Upload a file or paste your text. Processing happens locally in your browser, so nothing is uploaded to a server." },
    { name: "Choose your options", text: "Set the options for your task — pages, order, format or quality — and watch the preview react in real time." },
    { name: "Run the action", text: "Apply the change. Large files are handled entirely on your device for speed and privacy." },
    { name: "Download the result", text: "Save the finished file. There are no watermarks and no limits on how often you can use it." },
  ],
  Generators: [
    { name: "Describe what you need", text: "Enter your inputs — a value, text or a few options. The generator responds instantly as you change them." },
    { name: "Fine-tune the output", text: "Adjust the settings until the result matches exactly what you want. Everything is computed live in your browser." },
    { name: "Preview the result", text: "Review the generated output in the preview. Undo, redo or reset any time — recent work is saved locally." },
    { name: "Copy or download", text: "Copy the result to your clipboard or download it. Nothing is ever sent to a server." },
  ],
  Text: [
    { name: "Paste your text", text: "Drop in the text you want to work with. It's processed instantly and privately in your browser." },
    { name: "Choose the transformation", text: "Pick the operation or style you need. The output updates the moment you make a change." },
    { name: "Review the output", text: "Check the transformed text in the preview and tweak options until it's right." },
    { name: "Copy the result", text: "Copy the finished text with one click — no sign-up, no character limits." },
  ],
  Calculators: [
    { name: "Enter your values", text: "Type in the numbers for your calculation. Results are computed instantly, right in your browser." },
    { name: "Set the parameters", text: "Adjust rates, units or options as needed. Every field recalculates the answer live." },
    { name: "Read the breakdown", text: "See the full result with a clear breakdown so you understand exactly how it was worked out." },
    { name: "Copy or reuse", text: "Copy the result or change the inputs to run another scenario. Your device does all the maths — nothing leaves it." },
  ],
  Image: [
    { name: "Upload your image", text: "Add an image from your device. It's processed locally using your browser's canvas — never uploaded." },
    { name: "Apply your edits", text: "Crop, resize, convert or adjust with the controls. The preview updates in real time." },
    { name: "Check the preview", text: "Inspect the result at full quality and fine-tune the settings until you're happy." },
    { name: "Download the image", text: "Export the finished image in your chosen format. No watermarks, no limits, fully private." },
  ],
  Developer: [
    { name: "Paste your input", text: "Add your code, data or string. It's parsed and processed entirely in your browser." },
    { name: "Configure options", text: "Set the format, encoding or rules for the task. Output updates instantly as you change them." },
    { name: "Validate the output", text: "Review the result, catch errors early, and copy exactly what you need." },
    { name: "Copy or export", text: "Copy the output or download it. Nothing you paste ever touches a server." },
  ],
  Creative: [
    { name: "Add your content", text: "Upload an asset or enter your details. Everything renders live in your browser." },
    { name: "Style it", text: "Pick a template, colours, device or background and see the design update instantly." },
    { name: "Preview the design", text: "Review the result at export quality and adjust until it looks exactly right." },
    { name: "Export your file", text: "Download a crisp image, PDF or bundle. All rendering happens on your device." },
  ],
  AI: [
    { name: "Choose a generator", text: "Pick the generator you need and describe your goal in a few fields." },
    { name: "Enter your details", text: "Add the topic, tone or parameters. The built-in engine responds instantly and privately." },
    { name: "Review the output", text: "Read the generated result and refine your inputs to shape it further." },
    { name: "Copy and use", text: "Copy the output straight into your work. No API keys, no sign-up, nothing leaves your device." },
  ],
  SEO: [
    { name: "Enter your page details", text: "Add your title, description, URL or keywords. Output is generated live in your browser." },
    { name: "Optimise the settings", text: "Tune the fields to match search best-practices — length, keywords and formatting update instantly." },
    { name: "Preview the result", text: "See how it will appear or validate the generated markup before you ship it." },
    { name: "Copy the code", text: "Copy the ready-to-paste output into your site. Everything runs client-side." },
  ],
  Everyday: [
    { name: "Open the tool", text: "It loads instantly and works entirely in your browser — no sign-up, no install." },
    { name: "Enter your details", text: "Add your input or start the task. Everything updates live as you go." },
    { name: "Use it your way", text: "Adjust the settings to fit what you need. Your work is saved locally in your browser." },
    { name: "Copy, download or share", text: "Save or share the result. Nothing is ever uploaded to a server." },
  ],
};

const BENEFITS: Record<ToolCategory, string[]> = {
  Business: [
    "Create professional, print-ready documents in minutes",
    "Add your logo, tax/GST, signature and stamp",
    "Choose from multiple designer templates",
    "Export polished PDF, image or print output",
  ],
  Documents: [
    "Process files privately — nothing is uploaded",
    "No watermarks and no page or size limits",
    "Fast, on-device handling even for large files",
    "Works on any device, right in the browser",
  ],
  Generators: [
    "Instant results as you type",
    "Copy or download with one click",
    "No sign-up, no limits, no watermarks",
    "Runs entirely in your browser for full privacy",
  ],
  Text: [
    "Transform text instantly, with no character limits",
    "Everything is processed privately on your device",
    "One-click copy for fast workflows",
    "Great on mobile and desktop alike",
  ],
  Calculators: [
    "Accurate results with a clear breakdown",
    "Recalculates live as you change any value",
    "No sign-up and no usage limits",
    "All maths happens on your device — nothing is tracked",
  ],
  Image: [
    "Edit images locally — they never leave your device",
    "Export in popular formats with no watermark",
    "High-quality, full-resolution output",
    "Fast browser-based processing on any device",
  ],
  Developer: [
    "Validate and format instantly as you type",
    "Nothing you paste is sent to a server",
    "Copy clean output straight into your code",
    "Handy for quick checks without leaving the browser",
  ],
  Creative: [
    "Studio-quality output with zero design skills",
    "Templates, devices and backgrounds built in",
    "Export crisp images, PDFs or bundles",
    "Everything renders privately on your device",
  ],
  AI: [
    "Instant, structured results from a private engine",
    "No API keys, no sign-up and no cost",
    "Your input never leaves your browser",
    "Copy output straight into your workflow",
  ],
  SEO: [
    "Generate clean, standards-compliant markup",
    "Preview exactly how search engines will read it",
    "Copy-paste ready output, no sign-up needed",
    "Runs fully client-side for privacy",
  ],
  Everyday: [
    "Simple, fast and free to use",
    "Saves your recent work in your browser",
    "No account or installation required",
    "Private by design — data stays on your device",
  ],
};

function extraFaqs(tool: Tool): FaqItem[] {
  const isPrivate = "Yes. This tool runs entirely in your browser — your input is never uploaded to any server, so your data stays completely private.";
  const isFree = `Completely. The ${tool.name} is 100% free with no sign-up, no watermark and no limit on how many times you can use it.`;
  const onMobile = `Yes. The ${tool.name} is fully responsive and works on phones, tablets and desktops in any modern browser.`;
  return [
    { question: `Is the ${tool.name} free to use?`, answer: isFree },
    { question: "Is my data private?", answer: isPrivate },
    { question: `Does the ${tool.name} work on mobile?`, answer: onMobile },
  ];
}

export function toolFeatures(tool: Tool): string[] {
  // Prefer curated keywords, capitalised, as feature chips.
  return tool.keywords.slice(0, 6).map((k) => k.replace(/\b\w/g, (c) => c.toUpperCase()));
}

export function toolHowTo(tool: Tool): Step[] {
  const steps = HOW_TO[tool.category] ?? HOW_TO.Everyday;
  // Personalise the first step with the tool's name.
  return steps.map((s, i) => (i === 0 ? { ...s, name: `Open the ${tool.name}` } : s));
}

export function toolBenefits(tool: Tool): string[] {
  return BENEFITS[tool.category] ?? BENEFITS.Everyday;
}

export function toolFaqs(tool: Tool): FaqItem[] {
  // Curated FAQ first, then category/name-aware extras (de-duplicated).
  const seen = new Set(tool.faq.map((f) => f.question.toLowerCase()));
  const extra = extraFaqs(tool).filter((f) => !seen.has(f.question.toLowerCase()));
  return [...tool.faq, ...extra];
}

export function toolIntro(tool: Tool): string {
  const cat = tool.category.toLowerCase();
  return `Whether you're a professional or just need a quick result, the ${tool.name} gives you a fast, reliable ${cat} tool that works instantly in your browser. There's no software to install and nothing to sign up for — open the page, get your result and move on. Because everything runs on your own device, it's private by default and available whenever you need it.`;
}
