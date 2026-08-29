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

export const startBusinessWorkflow: AssistantResponse = {
  summary:
    "Starting a business in India usually follows this order: register the business itself, then register for GST if you're liable, then handle invoicing and compliance from day one.",
  recommendedTools: [
    { label: "Udyam (MSME) Registration", href: "/india-services/business-tax/msme-udyam", kind: "internal", description: "Free government registration that unlocks MSME benefits and easier loans." },
    { label: "GST Registration", href: "/india-services/business-tax/gst-registration", kind: "internal", description: "Required once your turnover crosses the threshold, or if you sell online/inter-state." },
    { label: "Invoice Maker", href: "/tools/invoice-maker", kind: "internal", description: "GST-compliant invoices from day one, with CGST/SGST/IGST breakdown." },
    { label: "GST Return Filing", href: "/india-services/business-tax/gst-return", kind: "internal", description: "Guide for ongoing monthly/quarterly GST compliance once registered." },
  ],
  workflow: [
    { label: "Udyam (MSME) Registration", href: "/india-services/business-tax/msme-udyam", kind: "internal", description: "Register the business (free, ~10 minutes)" },
    { label: "GST Registration", href: "/india-services/business-tax/gst-registration", kind: "internal", description: "If applicable to your turnover/business type" },
    { label: "Invoice Maker", href: "/tools/invoice-maker", kind: "internal", description: "Start invoicing clients correctly" },
    { label: "Explore Business AI tools", href: "/ai-hub/business", kind: "internal", description: "CRM, data enrichment and workflow AI" },
    { label: "GST Return Filing", href: "/india-services/business-tax/gst-return", kind: "internal", description: "Stay compliant going forward" },
  ],
  relatedBlogs: [],
  officialResources: [
    { label: "Udyam Registration Portal", href: "https://udyamregistration.gov.in", kind: "external" },
    { label: "GST Portal", href: "https://www.gst.gov.in", kind: "external" },
  ],
  estimatedTime: "Udyam registration: ~10 minutes. GST: a few days for approval.",
  difficulty: "Intermediate",
  nextStep: "Start with Udyam (MSME) Registration — it's free and unlocks the rest.",
  actions: [
    { label: "Open India Hub: Business & Tax", href: "/india-services/business-tax/gst-registration", kind: "internal" },
    { label: "Open Invoice Maker", href: "/tools/invoice-maker", kind: "internal" },
  ],
};

export const itrFilingWorkflow: AssistantResponse = {
  summary:
    "Filing your Income Tax Return goes smoother in this order: confirm your PAN and Aadhaar are linked, decide your tax regime, estimate what you owe, then file — and know how to track your refund afterward.",
  recommendedTools: [
    { label: "Income Tax Calculator", href: "/tools/income-tax-calculator", kind: "internal", description: "Estimate your tax liability under both the old and new regime before you file." },
    { label: "CTC to In-Hand Salary Calculator", href: "/tools/ctc-calculator", kind: "internal", description: "Work out your actual taxable income from your CTC if you're salaried." },
    { label: "PDF Compress", href: "/tools/pdf-compress", kind: "internal", description: "Shrink Form 16, bank statements and other documents before uploading them." },
  ],
  workflow: [
    { label: "Check PAN–Aadhaar link status", href: "/india-services/identity-documents/pan-aadhaar-link", kind: "internal", description: "Required before you can e-file" },
    { label: "Old vs New Tax Regime", href: "/blog/old-vs-new-tax-regime-which-to-choose", kind: "internal", description: "Decide which regime is cheaper for you" },
    { label: "Income Tax Calculator", href: "/tools/income-tax-calculator", kind: "internal", description: "Estimate your exact liability" },
    { label: "India Hub: ITR Filing Guide", href: "/india-services/business-tax/itr-filing", kind: "internal", description: "Documents, deadlines and the official e-filing steps" },
    { label: "Check ITR Refund Status", href: "/blog/how-to-check-income-tax-refund-status-online", kind: "internal", description: "Once filed, track your refund here" },
  ],
  relatedBlogs: [
    { label: "Old vs New Tax Regime: Which to Choose", href: "/blog/old-vs-new-tax-regime-which-to-choose", kind: "internal" },
    { label: "How to Check Income Tax Refund Status Online", href: "/blog/how-to-check-income-tax-refund-status-online", kind: "internal" },
  ],
  officialResources: [
    { label: "Income Tax e-Filing Portal (official)", href: "https://www.incometax.gov.in", kind: "external" },
  ],
  estimatedTime: "30-60 minutes if your documents are ready",
  difficulty: "Intermediate",
  nextStep: "Start by confirming your PAN and Aadhaar are linked — e-filing is blocked without it.",
  actions: [
    { label: "Open Income Tax Calculator", href: "/tools/income-tax-calculator", kind: "internal" },
    { label: "Read ITR Filing Guide", href: "/india-services/business-tax/itr-filing", kind: "internal" },
  ],
};

export const loanPrepWorkflow: AssistantResponse = {
  summary:
    "Before you apply for a home or personal loan, checking these numbers yourself avoids surprises — your credit score, what the EMI actually costs you, and what you can realistically afford from your take-home pay.",
  recommendedTools: [
    { label: "EMI Calculator", href: "/tools/emi-calculator", kind: "internal", description: "See the monthly EMI, total interest and full amortization schedule for any loan amount, rate and tenure." },
    { label: "CTC to In-Hand Salary Calculator", href: "/tools/ctc-calculator", kind: "internal", description: "Know your real monthly take-home before committing to an EMI." },
    { label: "Number to Words", href: "/tools/number-to-words", kind: "internal", description: "Get the loan amount correctly written out in words for the agreement paperwork." },
    { label: "PDF Compress", href: "/tools/pdf-compress", kind: "internal", description: "Shrink salary slips, bank statements and ID proofs before uploading." },
  ],
  workflow: [
    { label: "Check your credit score", href: "/india-services/banking/cibil-score", kind: "internal", description: "Most lenders check this first — know it before they do" },
    { label: "EMI Calculator", href: "/tools/emi-calculator", kind: "internal", description: "Compare EMI across different amounts, rates and tenures" },
    { label: "CTC to In-Hand Salary Calculator", href: "/tools/ctc-calculator", kind: "internal", description: "Confirm the EMI fits comfortably in your actual take-home pay" },
    { label: "Prepare documents", href: "/tools/pdf-compress", kind: "internal", description: "Compress salary slips, bank statements and ID proofs" },
    { label: "Number to Words", href: "/tools/number-to-words", kind: "internal", description: "Cross-check the amount in words on the loan agreement" },
  ],
  relatedBlogs: [
    { label: "How to Check Your CIBIL Credit Score for Free", href: "/blog/how-to-check-cibil-credit-score-free", kind: "internal" },
    { label: "How to Calculate Your In-Hand Salary From CTC", href: "/blog/how-to-calculate-in-hand-salary-from-ctc", kind: "internal" },
  ],
  officialResources: [],
  estimatedTime: "15-20 minutes to run the numbers before you apply",
  difficulty: "Beginner",
  nextStep: "Start with your credit score — a low score changes the interest rate you'll actually be offered, which changes every other number.",
  actions: [
    { label: "Open EMI Calculator", href: "/tools/emi-calculator", kind: "internal" },
    { label: "Read CIBIL Score Guide", href: "/india-services/banking/cibil-score", kind: "internal" },
  ],
};

export const freelanceWorkflow: AssistantResponse = {
  summary:
    "Freelancing in India doesn't require registering a company — but invoicing correctly, knowing when GST kicks in, and paying tax on time are the three things that actually matter. Here's the order that avoids surprises.",
  recommendedTools: [
    { label: "Invoice Maker", href: "/tools/invoice-maker", kind: "internal", description: "Send professional invoices to clients — GST-compliant if you're registered, plain if you're not." },
    { label: "GST Calculator", href: "/tools/gst-calculator", kind: "internal", description: "Check what GST would add to an invoice once you cross the registration threshold." },
    { label: "Income Tax Calculator", href: "/tools/income-tax-calculator", kind: "internal", description: "Estimate what you'll owe on freelance income under the old vs new regime." },
    { label: "Number to Words", href: "/tools/number-to-words", kind: "internal", description: "Write out an invoice or contract amount correctly in words." },
  ],
  workflow: [
    { label: "Invoice Maker", href: "/tools/invoice-maker", kind: "internal", description: "Start invoicing clients professionally from your first project" },
    { label: "GST Registration", href: "/india-services/business-tax/gst-registration", kind: "internal", description: "Only required once your turnover crosses the threshold — check before assuming you need it" },
    { label: "Income Tax Calculator", href: "/tools/income-tax-calculator", kind: "internal", description: "Estimate quarterly advance tax so you're not caught short at filing time" },
    { label: "India Hub: ITR Filing Guide", href: "/india-services/business-tax/itr-filing", kind: "internal", description: "Freelance income is usually filed as business/professional income — check the right ITR form" },
  ],
  relatedBlogs: [
    { label: "Old vs New Tax Regime: Which to Choose", href: "/blog/old-vs-new-tax-regime-which-to-choose", kind: "internal" },
  ],
  officialResources: [
    { label: "GST Portal", href: "https://www.gst.gov.in", kind: "external" },
    { label: "Income Tax e-Filing Portal", href: "https://www.incometax.gov.in", kind: "external" },
  ],
  estimatedTime: "10 minutes to send your first invoice; ongoing for tax prep",
  difficulty: "Beginner",
  nextStep: "Start by sending a proper invoice — you don't need GST registration or a company to do that.",
  actions: [
    { label: "Open Invoice Maker", href: "/tools/invoice-maker", kind: "internal" },
    { label: "Open Income Tax Calculator", href: "/tools/income-tax-calculator", kind: "internal" },
  ],
};

export const fundraisingWorkflow: AssistantResponse = {
  summary:
    "Raising money follows a natural document order: the business plan is the detailed internal document investors ask for, the pitch deck is the short visual summary you actually present, and a proposal is what you send a specific investor or partner afterward with concrete next steps.",
  recommendedTools: [
    { label: "Business Plan Generator", href: "/tools/business-plan-generator", kind: "internal", description: "The full, detailed document — market, financials, milestones — investors request after an interested first meeting." },
    { label: "Pitch Deck Generator", href: "/tools/pitch-deck-generator", kind: "internal", description: "A short, visual 10-15 slide summary built to be presented live in a pitch meeting." },
    { label: "Proposal Generator", href: "/tools/proposal-generator", kind: "internal", description: "A client/investor-ready proposal with scope, timeline and terms once there's real interest." },
  ],
  workflow: [
    { label: "Business Plan Generator", href: "/tools/business-plan-generator", kind: "internal", description: "Write the detailed plan first — it forces you to think through every section" },
    { label: "How to Structure a Pitch Deck", href: "/blog/how-to-structure-a-pitch-deck-slide-by-slide", kind: "internal", description: "The standard 10-15 slide order investors expect" },
    { label: "Pitch Deck Generator", href: "/tools/pitch-deck-generator", kind: "internal", description: "Condense the plan into a short, visual deck for live pitching" },
    { label: "Proposal Generator", href: "/tools/proposal-generator", kind: "internal", description: "Once an investor or partner is interested, formalize next steps" },
  ],
  relatedBlogs: [
    { label: "How to Structure a Pitch Deck: The Slides Investors Actually Read", href: "/blog/how-to-structure-a-pitch-deck-slide-by-slide", kind: "internal" },
    { label: "How to Write a Business Plan for a Small Business (Free Template)", href: "/blog/how-to-write-a-business-plan-free-template", kind: "internal" },
  ],
  officialResources: [],
  estimatedTime: "A few hours across all three documents, spread over the days before pitching",
  difficulty: "Intermediate",
  nextStep: "Start with the Business Plan — writing the detailed version first makes the pitch deck faster to build, since you're condensing rather than drafting from scratch.",
  actions: [
    { label: "Open Business Plan Generator", href: "/tools/business-plan-generator", kind: "internal" },
    { label: "Open Pitch Deck Generator", href: "/tools/pitch-deck-generator", kind: "internal" },
  ],
};

export const sellOnlineWorkflow: AssistantResponse = {
  summary:
    "Selling products online comes together in this order: clean product photos first (they matter more than almost anything else for conversions), then the business paperwork — Udyam registration, GST if it applies — then start invoicing correctly.",
  recommendedTools: [
    { label: "Background Remover", href: "/tools/background-remover", kind: "internal", description: "Cut products out of ordinary photos with AI and drop them onto a clean white or branded background." },
    { label: "Image Resizer", href: "/tools/image-resizer", kind: "internal", description: "Resize product photos to the exact dimensions your marketplace or store platform requires." },
    { label: "Image Compressor", href: "/tools/image-compressor", kind: "internal", description: "Keep listing photos fast-loading without visibly losing quality." },
    { label: "Invoice Maker", href: "/tools/invoice-maker", kind: "internal", description: "GST-compliant invoices for every sale, from your very first order." },
    { label: "GST Calculator", href: "/tools/gst-calculator", kind: "internal", description: "Work out the GST to add once you're registered and liable to charge it." },
  ],
  workflow: [
    { label: "Background Remover", href: "/tools/background-remover", kind: "internal", description: "Clean up product photos — a consistent, distraction-free background lifts conversion rates on almost every marketplace" },
    { label: "Image Resizer", href: "/tools/image-resizer", kind: "internal", description: "Fit your platform's exact required listing dimensions" },
    { label: "Image Compressor", href: "/tools/image-compressor", kind: "internal", description: "Shrink file size for fast-loading listing pages" },
    { label: "Udyam (MSME) Registration", href: "/india-services/business-tax/msme-udyam", kind: "internal", description: "Free, ~10 minutes — often required by marketplaces and unlocks MSME lending benefits" },
    { label: "GST Registration", href: "/india-services/business-tax/gst-registration", kind: "internal", description: "Required once you cross the turnover threshold, and mandatory to sell on most major marketplaces regardless of turnover" },
    { label: "Invoice Maker", href: "/tools/invoice-maker", kind: "internal", description: "Start issuing proper, GST-compliant invoices for every order" },
  ],
  relatedBlogs: [
    { label: "How to Remove the Background from Any Photo Using AI (Free, No Upload)", href: "/blog/ai-background-remover-free-guide", kind: "internal" },
  ],
  officialResources: [
    { label: "Udyam Registration Portal", href: "https://udyamregistration.gov.in", kind: "external" },
    { label: "GST Portal", href: "https://www.gst.gov.in", kind: "external" },
  ],
  estimatedTime: "30-60 minutes for photos and paperwork combined, before your first listing goes live",
  difficulty: "Beginner",
  nextStep: "Start with your product photos — clean, consistent images affect conversion far more than most sellers expect, and it's the fastest step to knock out first.",
  actions: [
    { label: "Open Background Remover", href: "/tools/background-remover", kind: "internal" },
    { label: "Open Invoice Maker", href: "/tools/invoice-maker", kind: "internal" },
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
