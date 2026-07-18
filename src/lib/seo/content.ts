import type { Tool, ToolCategory, FaqItem, ToolExample, Difficulty } from "../tools";

/**
 * Content engine — turns a tool's registry data into rich, category-aware page
 * content (how-to, FAQs, examples, features, benefits, use cases). Every field
 * is derived automatically so a tool only needs its core registry entry to
 * become fully SEO-ready; anything provided explicitly on the tool overrides
 * the generated defaults.
 */

export interface Step {
  name: string;
  text: string;
}

/* ------------------------------------------------------------------ *
 * How-to steps per category                                          *
 * ------------------------------------------------------------------ */
const HOW_TO: Record<ToolCategory, Step[]> = {
  Business: [
    { name: "Open the tool and pick your document", text: "Choose the document or format you need. Everything loads instantly in your browser — no account, no install." },
    { name: "Fill in your business details", text: "Add your company, client, line items and totals. The live preview updates as you type so numbers are always accurate." },
    { name: "Add branding & tax", text: "Upload a logo, set your tax or GST, add a signature or stamp, and pick a design that matches your brand." },
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

const TIPS: Record<ToolCategory, string[]> = {
  Business: ["Save a design as a template to reuse it for every client.", "Add your GSTIN and tax type once — it carries into the PDF automatically.", "Use the QR code so clients can verify the document at a glance."],
  Documents: ["Work with smaller files first to preview the result quickly.", "Keep an original copy before applying irreversible changes.", "Combine steps in one session — nothing is uploaded, so it's fast."],
  Generators: ["Tweak one field at a time to see exactly what changes.", "Copy the output straight into your project to save time.", "Bookmark the tool for repeat use — your last inputs are remembered."],
  Text: ["Paste plain text for the cleanest results.", "Use the live preview to compare before and after.", "Combine multiple text tools for a full clean-up workflow."],
  Calculators: ["Double-check units before reading the result.", "Change one value to compare scenarios instantly.", "Use the breakdown to understand the maths, not just the answer."],
  Image: ["Start from the highest-quality source image you have.", "Preview at full size before downloading.", "Pick the right format — PNG for graphics, JPG for photos."],
  Developer: ["Validate input early to catch errors before shipping.", "Copy formatted output straight into your editor.", "Keep sensitive data local — nothing here is uploaded."],
  Creative: ["Match colours to your brand for a consistent look.", "Export at the highest resolution for crisp results.", "Try a few templates before settling on one."],
  AI: ["Be specific in your inputs for sharper output.", "Refine and regenerate until the result fits.", "Copy the result and edit it to add your personal touch."],
  SEO: ["Keep titles under ~60 characters and descriptions under ~160.", "Include your primary keyword naturally.", "Preview how it appears before publishing."],
  Everyday: ["Bookmark the tools you use most.", "Your recent work is saved locally for next time.", "Everything works offline-style, right in your browser."],
};

const MISTAKES: Record<ToolCategory, string[]> = {
  Business: ["Forgetting to set the correct tax type (CGST+SGST vs IGST).", "Leaving the client's details or GSTIN blank.", "Not previewing the PDF before sending it."],
  Documents: ["Not keeping a backup of the original file.", "Choosing the wrong output format for your needs.", "Skipping the preview before downloading."],
  Generators: ["Copying output without reviewing it first.", "Leaving required fields empty.", "Ignoring the options that fine-tune the result."],
  Text: ["Pasting formatted text when plain text is expected.", "Overwriting the original before checking the output.", "Missing an option that would clean the text further."],
  Calculators: ["Mixing up units of measurement.", "Entering rates as whole numbers when a percentage is expected.", "Reading the total without checking the breakdown."],
  Image: ["Starting from a low-resolution image.", "Exporting in the wrong format.", "Not previewing at full size first."],
  Developer: ["Not validating input before using the output.", "Assuming the output is escaped when it isn't.", "Pasting secrets you don't want in your clipboard history."],
  Creative: ["Using off-brand colours.", "Exporting at too low a resolution.", "Cluttering the design with too much text."],
  AI: ["Giving vague inputs and expecting precise output.", "Using the result without editing it.", "Not trying a second generation for a better option."],
  SEO: ["Writing titles that are too long and get truncated.", "Stuffing keywords unnaturally.", "Forgetting the canonical URL or description."],
  Everyday: ["Overlooking the settings that customise the result.", "Not saving or copying before leaving the page.", "Expecting data to sync across devices — it stays on this one."],
};

const BENEFITS: Record<ToolCategory, string[]> = {
  Business: ["Create professional, print-ready documents in minutes", "Add your logo, tax/GST, signature and stamp", "Choose from multiple designer templates", "Export polished PDF, image or print output"],
  Documents: ["Process files privately — nothing is uploaded", "No watermarks and no page or size limits", "Fast, on-device handling even for large files", "Works on any device, right in the browser"],
  Generators: ["Instant results as you type", "Copy or download with one click", "No sign-up, no limits, no watermarks", "Runs entirely in your browser for full privacy"],
  Text: ["Transform text instantly, with no character limits", "Everything is processed privately on your device", "One-click copy for fast workflows", "Great on mobile and desktop alike"],
  Calculators: ["Accurate results with a clear breakdown", "Recalculates live as you change any value", "No sign-up and no usage limits", "All maths happens on your device — nothing is tracked"],
  Image: ["Edit images locally — they never leave your device", "Export in popular formats with no watermark", "High-quality, full-resolution output", "Fast browser-based processing on any device"],
  Developer: ["Validate and format instantly as you type", "Nothing you paste is sent to a server", "Copy clean output straight into your code", "Handy for quick checks without leaving the browser"],
  Creative: ["Studio-quality output with zero design skills", "Templates, devices and backgrounds built in", "Export crisp images, PDFs or bundles", "Everything renders privately on your device"],
  AI: ["Instant, structured results from a private engine", "No API keys, no sign-up and no cost", "Your input never leaves your browser", "Copy output straight into your workflow"],
  SEO: ["Generate clean, standards-compliant markup", "Preview exactly how search engines will read it", "Copy-paste ready output, no sign-up needed", "Runs fully client-side for privacy"],
  Everyday: ["Simple, fast and free to use", "Saves your recent work in your browser", "No account or installation required", "Private by design — data stays on your device"],
};

const IO_DEFAULTS: Record<ToolCategory, { formats: string[]; inputs: string[]; outputs: string[] }> = {
  Business: { formats: ["PDF", "PNG"], inputs: ["Form fields", "Logo image"], outputs: ["PDF", "PNG", "Print"] },
  Documents: { formats: ["PDF"], inputs: ["File upload"], outputs: ["PDF"] },
  Generators: { formats: ["Text"], inputs: ["Form fields"], outputs: ["Text", "Copy"] },
  Text: { formats: ["Text"], inputs: ["Text"], outputs: ["Text", "Copy"] },
  Calculators: { formats: ["Number"], inputs: ["Numbers"], outputs: ["Result", "Breakdown"] },
  Image: { formats: ["PNG", "JPG", "WEBP"], inputs: ["Image upload"], outputs: ["Image download"] },
  Developer: { formats: ["Text", "JSON"], inputs: ["Text", "Code"], outputs: ["Text", "Copy"] },
  Creative: { formats: ["PNG", "SVG", "PDF"], inputs: ["Image", "URL"], outputs: ["Image", "PDF", "ZIP"] },
  AI: { formats: ["Text"], inputs: ["Prompt fields"], outputs: ["Text", "Copy"] },
  SEO: { formats: ["HTML", "Text"], inputs: ["Page details"], outputs: ["Markup", "Copy"] },
  Everyday: { formats: ["Text"], inputs: ["Form fields"], outputs: ["Result"] },
};

/* ------------------------------------------------------------------ */
function titleCase(s: string) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function toolHowToSteps(tool: Tool): Step[] {
  if (tool.howTo?.steps?.length) {
    return tool.howTo.steps.map((text, i) => ({ name: `Step ${i + 1}`, text }));
  }
  const steps = HOW_TO[tool.category] ?? HOW_TO.Everyday;
  return steps.map((s, i) => (i === 0 ? { ...s, name: `Open the ${tool.name}` } : s));
}

export function toolTips(tool: Tool): string[] {
  return tool.howTo?.tips ?? TIPS[tool.category] ?? TIPS.Everyday;
}
export function toolMistakes(tool: Tool): string[] {
  return tool.howTo?.mistakes ?? MISTAKES[tool.category] ?? MISTAKES.Everyday;
}
export function toolBestPractices(tool: Tool): string[] {
  if (tool.howTo?.bestPractices) return tool.howTo.bestPractices;
  // Derive from tips framed as practices.
  return toolTips(tool).map((t) => t);
}

export function toolBenefits(tool: Tool): string[] {
  return BENEFITS[tool.category] ?? BENEFITS.Everyday;
}

export function toolFeatures(tool: Tool): string[] {
  const src = tool.tags?.length ? tool.tags : tool.keywords;
  return src.slice(0, 6).map(titleCase);
}

export function toolUseCases(tool: Tool): string[] {
  if (tool.useCases?.length) return tool.useCases;
  // Derive lightweight, unique use cases from keywords.
  return tool.keywords.slice(0, 4).map((k) => `Quickly ${tool.category === "Calculators" ? "calculate" : "handle"} ${k} without any software.`);
}

export function toolFormats(tool: Tool) {
  const d = IO_DEFAULTS[tool.category] ?? IO_DEFAULTS.Everyday;
  return {
    formats: tool.supportedFormats ?? d.formats,
    inputs: tool.inputTypes ?? d.inputs,
    outputs: tool.outputTypes ?? d.outputs,
  };
}

export function toolDifficulty(tool: Tool): Difficulty {
  if (tool.difficulty) return tool.difficulty;
  return tool.category === "Developer" || tool.category === "SEO" ? "Intermediate" : "Beginner";
}

export function toolExamples(tool: Tool): ToolExample[] {
  if (tool.examples?.length) return tool.examples;
  const { inputs, outputs } = toolFormats(tool);
  // Generic but non-duplicate example derived from the tool's own metadata.
  return [
    {
      title: `Using the ${tool.name}`,
      input: `${inputs[0] ?? "Your input"} — e.g. ${tool.keywords[0] ?? tool.name.toLowerCase()}`,
      output: `${outputs[0] ?? "A ready-to-use result"}, generated instantly in your browser`,
    },
  ];
}

/* --------- FAQ engine: guarantees ≥8 unique FAQs --------- */
function genericFaqs(tool: Tool): FaqItem[] {
  const { formats, inputs, outputs } = toolFormats(tool);
  return [
    { question: `Is the ${tool.name} free to use?`, answer: `Yes. The ${tool.name} is 100% free with no sign-up, no watermark and no limit on how many times you can use it.` },
    { question: "Is my data private?", answer: `Absolutely. The ${tool.name} runs entirely in your browser — your input is never uploaded to any server, so your data stays completely private.` },
    { question: `Does the ${tool.name} work on mobile?`, answer: `Yes. The ${tool.name} is fully responsive and works on phones, tablets and desktops in any modern browser.` },
    { question: "Do I need to install anything?", answer: `No installation is needed. The ${tool.name} is a web tool — just open the page and start using it instantly.` },
    { question: `What can I do with the ${tool.name}?`, answer: `${tool.longDescription}` },
    { question: "What formats are supported?", answer: `It accepts ${inputs.join(", ")} and produces ${outputs.join(", ")} (${formats.join(", ")}).` },
    { question: "Is there a usage limit?", answer: `There are no limits. Use the ${tool.name} as many times as you like — it's completely free and unlimited.` },
    { question: "Do you store or track my content?", answer: "No. Nothing you enter is stored or tracked on a server. Optional convenience data is kept only in your own browser's local storage." },
  ];
}

export function toolFaqs(tool: Tool): FaqItem[] {
  const seen = new Set<string>();
  const out: FaqItem[] = [];
  const push = (f: FaqItem) => {
    const key = f.question.trim().toLowerCase();
    if (!seen.has(key) && f.question && f.answer) {
      seen.add(key);
      out.push(f);
    }
  };
  tool.faq.forEach(push); // curated first
  genericFaqs(tool).forEach(push); // top up to the minimum, de-duplicated
  return out;
}

export function toolIntro(tool: Tool): string {
  const cat = tool.category.toLowerCase();
  return `Whether you're a professional or just need a quick result, the ${tool.name} gives you a fast, reliable ${cat} tool that works instantly in your browser. There's no software to install and nothing to sign up for — open the page, get your result and move on. Because everything runs on your own device, it's private by default and available whenever you need it.`;
}

/** Deterministic, descriptive alt text for a tool's imagery. */
export function toolImageAlt(tool: Tool): string {
  return `${tool.name} — free online ${tool.category.toLowerCase()} tool on TechToolsCenter`;
}
