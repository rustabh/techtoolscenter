export interface UsefulWebsite {
  name: string;
  url: string;
  description: string;
  pricing: "Free" | "Freemium";
}

export interface UsefulWebsiteCategory {
  slug: string;
  name: string;
  icon: string;
  description: string;
  sites: UsefulWebsite[];
}

/**
 * A small, hand-picked directory of genuinely useful general-purpose websites
 * that complement TechToolsCenter rather than duplicate it — things we don't
 * build ourselves (file transfer, uptime checks, WHOIS lookups) plus a few
 * well-known free learning resources. Every entry is a real, verified,
 * independently-operated site — never a fabricated rating or price.
 */
export const usefulWebsiteCategories: UsefulWebsiteCategory[] = [
  {
    slug: "reference-verification",
    name: "Reference & Verification",
    icon: "FileSearch",
    description: "Check facts, trace an image's origin, or see what a webpage looked like in the past.",
    sites: [
      {
        name: "Wayback Machine",
        url: "https://web.archive.org",
        description: "The Internet Archive's tool for viewing historical snapshots of almost any webpage — free, no account needed.",
        pricing: "Free",
      },
      {
        name: "Snopes",
        url: "https://www.snopes.com",
        description: "One of the longest-running fact-checking sites — investigates viral claims, rumors and misinformation.",
        pricing: "Free",
      },
      {
        name: "TinEye",
        url: "https://tineye.com",
        description: "Reverse image search — upload or paste an image URL to trace where it appears online or find the original source.",
        pricing: "Free",
      },
    ],
  },
  {
    slug: "file-transfer-sharing",
    name: "File Transfer & Sharing",
    icon: "Share2",
    description: "Send large files to someone without needing a shared drive or an account on both ends.",
    sites: [
      {
        name: "WeTransfer",
        url: "https://wetransfer.com",
        description: "Send files up to 2GB free with no account — the recipient gets a download link by email.",
        pricing: "Freemium",
      },
      {
        name: "Send Anywhere",
        url: "https://send-anywhere.com",
        description: "Free peer-to-peer file transfer using a 6-digit key — no account, no fixed size limit for direct transfers.",
        pricing: "Freemium",
      },
    ],
  },
  {
    slug: "site-domain-diagnostics",
    name: "Site & Domain Diagnostics",
    icon: "Activity",
    description: "Check whether a website is actually down, test your connection, or look up who owns a domain.",
    sites: [
      {
        name: "Down For Everyone Or Just Me",
        url: "https://downforeveryoneorjustme.com",
        description: "Paste a URL and it checks the site from an outside server — tells you if it's down for everyone or just you.",
        pricing: "Free",
      },
      {
        name: "Speedtest by Ookla",
        url: "https://www.speedtest.net",
        description: "The standard free internet speed test — download, upload and ping, run from servers near you.",
        pricing: "Free",
      },
      {
        name: "ICANN Lookup",
        url: "https://lookup.icann.org",
        description: "ICANN's own free WHOIS lookup tool — official registration data for any domain name, straight from the source.",
        pricing: "Free",
      },
    ],
  },
  {
    slug: "free-learning",
    name: "Free Learning",
    icon: "GraduationCap",
    description: "Structured, genuinely free courses outside of coding — for that, see our Developer Hub's Learning section instead.",
    sites: [
      {
        name: "Khan Academy",
        url: "https://www.khanacademy.org",
        description: "Free courses and practice exercises spanning math, science, economics and more, for all ages.",
        pricing: "Free",
      },
      {
        name: "MIT OpenCourseWare",
        url: "https://ocw.mit.edu",
        description: "Free lecture notes, exams and video lectures from real MIT courses, published openly since 2001.",
        pricing: "Free",
      },
      {
        name: "Duolingo",
        url: "https://www.duolingo.com",
        description: "Free, gamified language-learning app covering 40+ languages, with an optional paid ad-free tier.",
        pricing: "Freemium",
      },
    ],
  },
  {
    slug: "notes-task-management",
    name: "Notes & Task Management",
    icon: "ClipboardList",
    description: "Lightweight, genuinely free-to-start places to jot notes or track tasks when you don't need a full app.",
    sites: [
      {
        name: "Google Keep",
        url: "https://keep.google.com",
        description: "Free, fast note-taking tied to your Google account — syncs across devices instantly.",
        pricing: "Free",
      },
      {
        name: "Trello",
        url: "https://trello.com",
        description: "Drag-and-drop Kanban boards for personal or small-team task tracking — generous free tier.",
        pricing: "Freemium",
      },
    ],
  },
];

export function totalUsefulWebsites(): number {
  return usefulWebsiteCategories.reduce((n, c) => n + c.sites.length, 0);
}
