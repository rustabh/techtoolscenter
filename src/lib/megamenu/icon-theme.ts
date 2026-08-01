/**
 * Deterministic pastel icon-chip theming for mega menu items — purely
 * cosmetic, keyed by label text so it needs no changes to the menu data.
 */
export interface IconTheme {
  bg: string;
  fg: string;
}

const PALETTE: IconTheme[] = [
  { bg: "bg-violet-500/15", fg: "text-violet-600 dark:text-violet-400" },
  { bg: "bg-rose-500/15", fg: "text-rose-600 dark:text-rose-400" },
  { bg: "bg-blue-500/15", fg: "text-blue-600 dark:text-blue-400" },
  { bg: "bg-orange-500/15", fg: "text-orange-600 dark:text-orange-400" },
  { bg: "bg-pink-500/15", fg: "text-pink-600 dark:text-pink-400" },
  { bg: "bg-cyan-500/15", fg: "text-cyan-600 dark:text-cyan-400" },
  { bg: "bg-emerald-500/15", fg: "text-emerald-600 dark:text-emerald-400" },
  { bg: "bg-amber-500/15", fg: "text-amber-600 dark:text-amber-400" },
  { bg: "bg-indigo-500/15", fg: "text-indigo-600 dark:text-indigo-400" },
  { bg: "bg-teal-500/15", fg: "text-teal-600 dark:text-teal-400" },
];

const NAMED: Record<string, IconTheme> = {
  image: PALETTE[0],
  pdf: PALETTE[1],
  developer: PALETTE[2],
  business: PALETTE[3],
  ai: PALETTE[4],
  security: PALETTE[5],
  qr: PALETTE[0],
  text: PALETTE[6],
  calculators: PALETTE[7],
  creative: PALETTE[4],
  utilities: PALETTE[8],
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function themeFor(label: string): IconTheme {
  const key = label.toLowerCase().trim();
  if (NAMED[key]) return NAMED[key];
  return PALETTE[hash(key) % PALETTE.length];
}

/** Icon names for the Tools menu's "Categories" column — the one place the
 * design spec asked for a named icon per label. */
export const CATEGORY_ICON: Record<string, string> = {
  Image: "Image",
  PDF: "FileText",
  QR: "QrCode",
  Text: "Type",
  Calculators: "Calculator",
  Creative: "Wand2",
  Business: "Briefcase",
  Security: "ShieldCheck",
  Developer: "Code2",
  Utilities: "Wrench",
};
