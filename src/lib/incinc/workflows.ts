import type { AssistantResponse } from "./types";

export const passportWorkflow: AssistantResponse = {
  summary:
    "Here's the full path from photo to paperwork for an Indian passport — do it in this order and you won't have to redo any step.",
  recommendedTools: [
    { label: "Passport Photo Maker", href: "/tools/passport-photo-maker", kind: "internal", description: "Crop your photo to the exact passport size and print multiple copies on one sheet." },
    { label: "Image Studio", href: "/tools/image-studio", kind: "internal", description: "Compress or clean up the photo first if it's too large or the background isn't plain." },
    { label: "PDF Compress", href: "/tools/pdf-compress", kind: "internal", description: "Shrink any scanned documents before you upload them to the passport portal." },
  ],
  workflow: [
    { label: "Take or upload your photo", kind: "internal" },
    { label: "Passport Photo Maker", href: "/tools/passport-photo-maker", kind: "internal", description: "Crop to official passport size" },
    { label: "Image Studio", href: "/tools/image-studio", kind: "internal", description: "Compress / clean background if needed" },
    { label: "PDF Compress", href: "/tools/pdf-compress", kind: "internal", description: "Shrink scanned ID documents" },
    { label: "India Hub: Passport Guide", href: "/india-services/travel-immigration/passport", kind: "internal", description: "Documents, fees and application steps" },
    { label: "Official Passport Seva Portal", href: "https://www.passportindia.gov.in", kind: "external", description: "Submit your application" },
  ],
  relatedBlogs: [],
  officialResources: [
    { label: "Passport Seva (official)", href: "https://www.passportindia.gov.in", kind: "external" },
  ],
  estimatedTime: "15-20 minutes to prepare documents",
  difficulty: "Beginner",
  nextStep: "Start with the Passport Photo Maker, then follow the India Hub guide for the full document checklist.",
  actions: [
    { label: "Open Passport Photo Maker", href: "/tools/passport-photo-maker", kind: "internal" },
    { label: "Read Passport Guide", href: "/india-services/travel-immigration/passport", kind: "internal" },
    { label: "Visit Official Portal", href: "https://www.passportindia.gov.in", kind: "external" },
  ],
};

export const instagramWorkflow: AssistantResponse = {
  summary:
    "A quick pipeline to go from a raw photo to a ready-to-post Instagram graphic with hashtags and a shareable QR code.",
  recommendedTools: [
    { label: "Image Resizer", href: "/tools/image-resizer", kind: "internal", description: "Resize to Instagram's post, story or profile-picture dimensions." },
    { label: "Image Compressor", href: "/tools/image-compressor", kind: "internal", description: "Keep quality high while keeping the file small." },
    { label: "Hashtag Generator", href: "/tools/hashtag-generator", kind: "internal", description: "Get relevant hashtags for more reach." },
    { label: "QR Studio", href: "/tools/qr-generator", kind: "internal", description: "Turn a link (shop, profile, offer) into a scannable QR code for your post or story." },
  ],
  workflow: [
    { label: "Image Resizer", href: "/tools/image-resizer", kind: "internal", description: "Fit the exact Instagram size" },
    { label: "Image Compressor", href: "/tools/image-compressor", kind: "internal", description: "Reduce file size without losing quality" },
    { label: "Hashtag Generator", href: "/tools/hashtag-generator", kind: "internal", description: "Add relevant hashtags" },
    { label: "QR Studio", href: "/tools/qr-generator", kind: "internal", description: "Add a scannable link to your post" },
  ],
  relatedBlogs: [],
  officialResources: [],
  estimatedTime: "5-10 minutes",
  difficulty: "Beginner",
  nextStep: "Start by resizing your image to the right Instagram dimensions.",
  actions: [
    { label: "Open Image Resizer", href: "/tools/image-resizer", kind: "internal" },
    { label: "Open Hashtag Generator", href: "/tools/hashtag-generator", kind: "internal" },
  ],
};

export const saasStackWorkflow: AssistantResponse = {
  summary:
    "For a modern SaaS built fast by a small team, this stack covers the frontend, database/auth, hosting, payments and an AI coding workflow.",
  recommendedTools: [
    { label: "Next.js", href: "https://nextjs.org", kind: "external", description: "React framework for the app itself.", meta: "Framework" },
    { label: "Supabase", href: "https://supabase.com", kind: "external", description: "Postgres database, auth and storage, hosted.", meta: "Backend" },
    { label: "Vercel", href: "https://vercel.com", kind: "external", description: "Deploy and host the app with zero config.", meta: "Hosting" },
    { label: "Stripe", href: "https://stripe.com", kind: "external", description: "Handle subscriptions and payments.", meta: "Payments" },
    { label: "Clerk", href: "https://clerk.com", kind: "external", description: "Drop-in user authentication and accounts.", meta: "Auth" },
    { label: "Shadcn UI", href: "https://ui.shadcn.com", kind: "external", description: "Accessible, unstyled-by-default UI components.", meta: "UI" },
    { label: "Claude", href: "https://claude.ai", kind: "external", description: "Plan features, write docs, reason about architecture.", meta: "AI" },
    { label: "Cursor", href: "https://cursor.com", kind: "external", description: "AI-native code editor for actually shipping the code.", meta: "AI coding" },
  ],
  workflow: [
    { label: "Scaffold the app in Next.js", kind: "external", href: "https://nextjs.org" },
    { label: "Add auth with Clerk", kind: "external", href: "https://clerk.com" },
    { label: "Set up Supabase for data", kind: "external", href: "https://supabase.com" },
    { label: "Wire up billing with Stripe", kind: "external", href: "https://stripe.com" },
    { label: "Build the UI with Shadcn UI", kind: "external", href: "https://ui.shadcn.com" },
    { label: "Ship it on Vercel", kind: "external", href: "https://vercel.com" },
  ],
  relatedBlogs: [],
  officialResources: [
    { label: "Next.js docs", href: "https://nextjs.org/docs", kind: "external" },
    { label: "Supabase docs", href: "https://supabase.com/docs", kind: "external" },
  ],
  estimatedTime: "Varies — a working MVP is realistic in days, not months",
  difficulty: "Intermediate",
  nextStep: "Start by scaffolding the Next.js app, then add auth before anything else.",
  actions: [
    { label: "Compare Coding AI", href: "/ai-hub/coding", kind: "internal" },
    { label: "Browse Developer Hub", href: "/developer-hub", kind: "internal" },
  ],
};
