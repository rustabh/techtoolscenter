export const siteConfig = {
  name: "TechToolsCenter",
  shortName: "TechToolsCenter",
  tagline: "All Your Essential Tools. One Center.",
  description:
    "TechToolsCenter is a premium collection of free, fast, privacy-first online tools — invoice makers, PDF & image utilities, calculators, generators, developer and text tools. Everything runs in your browser.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://techtoolscenter.com",
  ogImage: "/opengraph-image",
  twitter: "@techtoolscenter",
  keywords: [
    "online tools",
    "free tools",
    "tech tools",
    "invoice maker",
    "gst calculator",
    "emi calculator",
    "pdf tools",
    "qr code generator",
    "developer tools",
    "text tools",
    "resume builder",
  ],
  author: "TechToolsCenter",
  email: "support@techtoolscenter.com",
  developer: {
    name: "Incinc Media",
    url: "https://incincmedia.com",
  },
};

export type SiteConfig = typeof siteConfig;
