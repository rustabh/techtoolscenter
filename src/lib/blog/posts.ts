import type { BlogPost, Block } from "./types";

export const posts: BlogPost[] = [
  {
    slug: "how-to-create-gst-invoice-online-free",
    title: "How to Create a GST Invoice Online for Free (No Sign-up)",
    excerpt:
      "A step-by-step guide to making a professional, GST-compliant invoice in minutes — with CGST/SGST/IGST, your logo and a downloadable PDF, all in your browser.",
    category: "business",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-07-12",
    tags: ["invoice", "gst", "billing", "small business"],
    featured: true,
    relatedTools: ["invoice-maker", "gst-calculator", "quotation-generator"],
    content: [
      { type: "p", text: "Sending a clean, professional invoice is one of the fastest ways to get paid on time. But you don't need expensive accounting software to do it. With a free online **Invoice Maker**, you can create a fully GST-compliant invoice in a couple of minutes — add your logo, split the tax into CGST and SGST (or IGST), and download a print-ready PDF." },
      { type: "h2", text: "What is a GST invoice?" },
      { type: "p", text: "A GST invoice is a document a registered business issues for the sale of goods or services. It must show the seller and buyer details, GSTIN, a unique invoice number, the items with their taxable value, and the tax charged — broken into CGST + SGST for sales within a state, or IGST for inter-state sales." },
      { type: "h2", text: "Step-by-step: create your invoice" },
      { type: "ol", items: [
        "Open the Invoice Maker — it loads instantly, no sign-up needed.",
        "Add your company details and GSTIN, then your customer's details.",
        "Enter each line item with quantity and rate. The totals update live.",
        "Choose your tax type — CGST + SGST for intra-state or IGST for inter-state — and set the rate.",
        "Upload your logo and signature, pick a design, then download the PDF or print it.",
      ] },
      { type: "callout", text: "Everything runs in your browser — your invoice data is never uploaded to any server, so it stays completely private." },
      { type: "h2", text: "How the tax breakdown works" },
      { type: "p", text: "For a sale within your state, GST is split equally into CGST (Central) and SGST (State). For example, 18% GST becomes 9% CGST + 9% SGST. For a sale to another state, the same 18% is charged as a single IGST line. A good invoice tool shows each component separately so your buyer can claim input credit correctly." },
      { type: "h2", text: "Tips for professional invoices" },
      { type: "ul", items: [
        "Use a sequential invoice number so records stay organised.",
        "Always include your GSTIN and the customer's GSTIN.",
        "Add clear payment terms and a due date to get paid faster.",
        "Save a design as a template so every invoice looks consistent.",
      ] },
      { type: "p", text: "Once you're happy, download the PDF and email it — or print it. You can create as many invoices as you like, completely free." },
    ],
    faq: [
      { question: "Is this invoice maker really free?", answer: "Yes. It's 100% free with no sign-up, no watermark and no limit on how many invoices you create." },
      { question: "Does it calculate CGST, SGST and IGST?", answer: "Yes. Pick your tax type and rate, and the tool shows CGST + SGST (intra-state) or IGST (inter-state) as separate lines on the invoice and PDF." },
      { question: "Is my invoice data safe?", answer: "Completely. Everything is processed in your browser and never uploaded, so your business and customer data stay private." },
    ],
  },
  {
    slug: "how-to-make-qr-code-for-business",
    title: "How to Make a QR Code for Your Business (Free & Customisable)",
    excerpt:
      "Create branded QR codes for your website, menu, UPI payments or Wi-Fi in seconds — with your colours and logo, exported as PNG, SVG or PDF.",
    category: "guides",
    author: "editorial",
    template: "guide",
    publishedOn: "2026-07-14",
    tags: ["qr code", "marketing", "small business"],
    featured: true,
    relatedTools: ["qr-generator", "barcode-generator"],
    content: [
      { type: "p", text: "QR codes are everywhere — on menus, posters, business cards and payment counters. The good news is you can make your own **QR code** for free, style it with your brand colours and logo, and download it in high resolution for print or web." },
      { type: "h2", text: "What can a QR code link to?" },
      { type: "ul", items: [
        "Your website or a specific landing page",
        "A restaurant or product menu (PDF or page)",
        "UPI / payment details for quick checkout",
        "Wi-Fi credentials so guests connect in one tap",
        "Your contact card, social profiles or WhatsApp",
      ] },
      { type: "h2", text: "Step-by-step: create your QR code" },
      { type: "ol", items: [
        "Open the QR Studio and choose the type — website, text, email, phone, UPI and more.",
        "Enter your link or details. The preview updates instantly.",
        "Style it — pick your colours, dot shape and add your logo in the centre.",
        "Download as PNG for web, SVG for print, or a PDF/ZIP bundle.",
      ] },
      { type: "callout", text: "Always test your QR code with a phone camera before printing it at large size." },
      { type: "h2", text: "Design tips for scannable codes" },
      { type: "p", text: "Keep a strong contrast between the code and its background, don't shrink it below about 2 cm for print, and leave a small quiet zone (margin) around it. Adding a logo is fine as long as you keep the error-correction level high enough to stay scannable." },
    ],
    faq: [
      { question: "Do QR codes expire?", answer: "A static QR code — like the ones this tool makes — never expires. It encodes your data directly, so it works forever as long as the destination (your link) is live." },
      { question: "Can I add my logo?", answer: "Yes. You can drop your logo into the centre of the QR code and choose custom colours to match your brand." },
      { question: "Which format should I download?", answer: "Use PNG for websites and social media, and SVG for print so the code stays crisp at any size." },
    ],
  },
  {
    slug: "app-store-screenshots-that-convert",
    title: "How to Design App Store Screenshots That Convert",
    excerpt:
      "Learn the exact sizes Apple and Google accept and how to design device-framed screenshots that turn browsers into downloads.",
    category: "design",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-07-16",
    tags: ["app store", "design", "mockups", "marketing"],
    relatedTools: ["app-screenshot-generator", "website-mockup-generator", "brand-kit-generator"],
    content: [
      { type: "p", text: "Your app's screenshots are the single biggest driver of downloads on the App Store and Google Play. Great screenshots tell a story, highlight one benefit each, and use the exact pixel sizes the stores accept — no oversized uploads, no rejections." },
      { type: "h2", text: "The exact sizes you need" },
      { type: "p", text: "Apple requires specific screenshot dimensions per device — 6.9″, 6.7″, 6.5″, 5.5″ and iPad. Google Play accepts phone, 7″ and 10″ tablet screenshots, plus a 1024×500 feature graphic and a 1280×720 TV banner. Using an **App Store Studio** that renders at these exact sizes means your uploads are always accepted." },
      { type: "h2", text: "What makes a screenshot convert" },
      { type: "ol", items: [
        "Lead with your strongest feature on the first screenshot.",
        "Add a short, benefit-led headline above each device frame.",
        "Use one idea per screenshot — don't crowd the frame.",
        "Keep colours and fonts consistent with your brand.",
        "Show the app inside a realistic device frame for context.",
      ] },
      { type: "callout", text: "Respect the safe area — keep text and key UI away from the edges so nothing gets clipped by rounded corners." },
      { type: "h2", text: "A simple workflow" },
      { type: "p", text: "Capture clean in-app screenshots, drop them into a device frame, add a headline and a branded background, then export every required size at once. Pair it with a consistent brand kit so your colours and logo carry across the whole listing." },
    ],
    faq: [
      { question: "What size should App Store screenshots be?", answer: "Apple accepts 6.9″ (1320×2868), 6.7″ (1290×2796), 6.5″ (1242×2688), 5.5″ (1242×2208) and iPad (2048×2732). Rendering at these exact sizes avoids upload rejections." },
      { question: "How many screenshots should I upload?", answer: "Both stores allow up to 8–10. Aim for at least 4–5, each highlighting a single key benefit." },
    ],
  },

  /* ---------------- India Services guides ---------------- */
  {
    slug: "how-to-apply-marriage-certificate-india",
    title: "How to Apply for a Marriage Certificate in India (2026 Guide)",
    excerpt: "A step-by-step guide to registering your marriage and getting a marriage certificate in India — documents, fees, witnesses and the online process.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-07-19",
    tags: ["marriage certificate", "india services", "government", "certificates"],
    featured: true,
    relatedTools: ["image-compressor", "pdf-merge", "image-resizer"],
    content: [
      { type: "p", text: "A **marriage certificate** is the legal proof of your marriage in India, and you'll need it for passports, visas, joint bank accounts, insurance and name changes. This guide walks you through the whole process. For the full checklist and official links, see our [Marriage Certificate service page](/india-services/certificates/marriage-certificate)." },
      { type: "h2", text: "Which law will your marriage be registered under?" },
      { type: "ul", items: [
        "**Hindu Marriage Act, 1955** — for marriages between Hindus, Buddhists, Jains and Sikhs already solemnised by custom.",
        "**Special Marriage Act, 1954** — for civil and inter-faith marriages; this involves a 30-day public notice period.",
      ] },
      { type: "h2", text: "Documents you'll need" },
      { type: "ul", items: [
        "Age proof of both spouses (birth certificate, PAN or 10th marksheet)",
        "Address proof of both spouses (Aadhaar, voter ID)",
        "Passport-size photographs and a marriage photograph together",
        "Two witnesses with their ID and address proof",
        "Marriage invitation card and, in some states, an affidavit",
      ] },
      { type: "h2", text: "Step-by-step process" },
      { type: "ol", items: [
        "Open your State/Municipal marriage-registration or e-District portal.",
        "Choose the applicable Act and fill in both spouses' and witnesses' details.",
        "Upload the documents and photographs (compress large scans first).",
        "Book an appointment at the Sub-Registrar / Marriage Officer's office.",
        "Visit with both spouses and witnesses for verification.",
        "Collect or download the certificate once approved.",
      ] },
      { type: "callout", text: "Tip: scanned documents are often too large to upload. Use our free [Image Compressor](/tools/image-compressor) or [merge multiple pages into one PDF](/tools/pdf-merge) before uploading." },
      { type: "h2", text: "Fees and timeline" },
      { type: "p", text: "A nominal registration fee (usually ₹100–₹500) applies and varies by state. Under the Hindu Marriage Act, registration can be quick; under the Special Marriage Act, expect a 30-day notice period before the certificate is issued." },
      { type: "p", text: "Always complete the process on the official government portal — never pay a third-party site extra for a service you can do yourself." },
    ],
    faq: [
      { question: "Is marriage registration mandatory in India?", answer: "Most states have made it compulsory, and a certificate is essential for passports, visas and legal matters — so you should always register." },
      { question: "How many witnesses are required?", answer: "Usually two witnesses, each with valid ID and address proof; some states may ask for three." },
      { question: "Can I apply online?", answer: "Many states let you start online via their e-District/marriage portal, but you may still need to visit the registrar in person for verification." },
    ],
  },
  {
    slug: "how-to-apply-pan-card-online-free",
    title: "How to Apply for a PAN Card Online for Free (Instant e-PAN)",
    excerpt: "Get a free instant e-PAN using your Aadhaar in minutes, or apply for a physical PAN card. Documents, steps and common mistakes explained.",
    category: "business",
    author: "editorial",
    template: "tutorial",
    publishedOn: "2026-07-19",
    tags: ["pan card", "india services", "tax", "identity"],
    featured: true,
    relatedTools: ["image-compressor-for-pan-card", "image-compressor", "pdf-compress"],
    content: [
      { type: "p", text: "You can get a **PAN card completely free** using the Instant e-PAN service on the Income Tax portal — no fees, no agents. This guide shows you how. See the full checklist on our [PAN Card service page](/india-services/identity-documents/pan-card)." },
      { type: "h2", text: "Free instant e-PAN (using Aadhaar)" },
      { type: "ol", items: [
        "Go to the official Income Tax e-filing portal (incometax.gov.in).",
        "Choose 'Instant e-PAN'.",
        "Enter your Aadhaar number and verify with the OTP sent to your Aadhaar-linked mobile.",
        "Confirm your details and submit.",
        "Download your e-PAN PDF — it's issued within minutes, free of cost.",
      ] },
      { type: "callout", text: "The instant e-PAN needs no photo — it uses your Aadhaar. A photo/signature is only needed for a physical PAN card." },
      { type: "h2", text: "Applying for a physical PAN card" },
      { type: "p", text: "For a physical card or corrections, apply through the authorised agencies (Protean/NSDL or UTIITSL), upload your documents, photo and signature, and pay the small fee. If your photo or signature is rejected for size, compress it first with our [PAN photo compressor](/tools/image-compressor-for-pan-card)." },
      { type: "h2", text: "Common mistakes to avoid" },
      { type: "ul", items: [
        "Applying on unofficial third-party sites that charge extra",
        "Name or date-of-birth mismatch between PAN and Aadhaar",
        "Uploading an oversized photo/signature that gets rejected",
      ] },
    ],
    faq: [
      { question: "Is the instant e-PAN really free?", answer: "Yes — the Instant e-PAN service on the official Income Tax portal issues a PDF e-PAN free of cost using your Aadhaar." },
      { question: "How long does a physical PAN take?", answer: "Usually around 15 working days after a successful application, while instant e-PAN takes only minutes." },
    ],
  },
  {
    slug: "how-to-update-aadhaar-address-online",
    title: "How to Update Your Aadhaar Address Online (Step by Step)",
    excerpt: "Change your Aadhaar address from home in a few minutes — accepted documents, the online process, fees and how to track your update.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-07-19",
    tags: ["aadhaar", "india services", "identity", "uidai"],
    relatedTools: ["image-compressor-for-aadhar-card", "image-compressor", "pdf-compress"],
    content: [
      { type: "p", text: "Moved to a new place? You can **update your Aadhaar address online** on the official UIDAI portal without visiting a centre. Here's how. Full details are on our [Aadhaar Card service page](/india-services/identity-documents/aadhaar-card)." },
      { type: "h2", text: "Documents accepted as address proof" },
      { type: "p", text: "Common proofs include a bank statement/passbook, electricity or water bill, passport, voter ID or a rent agreement. Check the accepted list on the UIDAI portal before you start." },
      { type: "h2", text: "Step-by-step" },
      { type: "ol", items: [
        "Visit the official UIDAI portal (uidai.gov.in) and sign in with your Aadhaar number and OTP.",
        "Select 'Update Address'.",
        "Enter your new address exactly as it appears on your proof document.",
        "Upload a clear scan of the address proof.",
        "Submit and note your Update Request Number (URN) to track the status.",
      ] },
      { type: "callout", text: "Blurry or oversized scans are the #1 reason updates get rejected. Compress and clean up your document with our free [Aadhaar image compressor](/tools/image-compressor-for-aadhar-card) first." },
      { type: "h2", text: "Fee and processing time" },
      { type: "p", text: "An online document update carries a small official fee (₹50 as published by UIDAI), and updates are typically processed within about 30 days." },
    ],
    faq: [
      { question: "Can I change my Aadhaar address without a document?", answer: "For most cases you need a valid proof of address. UIDAI also offers an address-validation-letter route in specific situations." },
      { question: "How do I track my Aadhaar update?", answer: "Use the Update Request Number (URN) you receive after submitting, on the UIDAI portal." },
    ],
  },
  {
    slug: "how-to-get-new-ration-card-online",
    title: "How to Apply for a New Ration Card Online in India",
    excerpt: "Apply for a new ration card, add family members or make corrections online through your state's food & civil supplies portal — documents and steps.",
    category: "guides",
    author: "editorial",
    template: "guide",
    publishedOn: "2026-07-19",
    tags: ["ration card", "india services", "nfsa"],
    relatedTools: ["image-compressor", "pdf-compress", "image-resizer"],
    content: [
      { type: "p", text: "A **ration card** gives eligible families subsidised food grains and doubles as identity/address proof. Ration cards are issued by your state's Food & Civil Supplies Department. Here's how to apply. See our [Ration Card service page](/india-services/utilities/ration-card) for the full checklist." },
      { type: "h2", text: "Documents required" },
      { type: "ul", items: [
        "Identity proof of the head of family (Aadhaar)",
        "Address proof",
        "Passport-size photograph of the head of family",
        "Aadhaar of all family members",
        "Income proof (for category, where required)",
      ] },
      { type: "h2", text: "How to apply" },
      { type: "ol", items: [
        "Find your state's Food & Civil Supplies / PDS portal (the NFSA site links to state portals).",
        "Register and select 'New Ration Card'.",
        "Fill in family and address details.",
        "Upload identity, address and member documents.",
        "Submit for verification and track the status; download or collect once approved.",
      ] },
      { type: "callout", text: "Keep document scans small and clear — use our free [Image Compressor](/tools/image-compressor) so uploads don't fail." },
      { type: "p", text: "A nominal fee (often ₹5–₹45) applies depending on the state. Always apply on the official state portal." },
    ],
    faq: [
      { question: "Can I have more than one ration card?", answer: "No — a family should hold only one ration card. Duplicate cards can be cancelled." },
      { question: "How do I add a family member?", answer: "Use the 'add member' option on your state's ration portal with the new member's Aadhaar and proof." },
    ],
  },
  {
    slug: "document-photo-size-government-forms",
    title: "Passport & Document Photo Size for Government Forms (Easy Fix)",
    excerpt: "Government portals often reject photos and documents for being too large or the wrong size. Here's how to get them right in seconds — free.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-07-19",
    tags: ["passport photo", "india services", "image compress", "government forms"],
    relatedTools: ["image-compressor-for-passport-photo", "image-resizer", "image-compressor", "pdf-compress"],
    content: [
      { type: "p", text: "One of the most common reasons government applications fail is a **photo or document that's too large or the wrong size**. Whether it's a passport photo, an Aadhaar scan or a PDF upload, here's how to fix it in seconds — for free, right in your browser." },
      { type: "h2", text: "Photos: get under the size limit" },
      { type: "p", text: "Most portals want photos under a specific KB limit (often 20–100 KB) at set dimensions. Use our [passport photo compressor](/tools/image-compressor-for-passport-photo) or the [Image Resizer](/tools/image-resizer) to hit the exact size without losing clarity." },
      { type: "h2", text: "Documents: compress PDFs for upload" },
      { type: "p", text: "Scanned documents are often several MB — too big for government portals. Our [PDF Compressor](/tools/pdf-compress) lets you pick a target size (like under 200 KB) so your upload goes through." },
      { type: "h2", text: "Quick checklist before you upload" },
      { type: "ul", items: [
        "Check the portal's exact size (KB) and dimension (px) limits",
        "Compress the image/PDF to just under that limit",
        "Keep faces and text clearly readable",
        "Use JPG for photos and keep PDFs to the required page size",
      ] },
      { type: "callout", text: "Everything runs in your browser — your documents are never uploaded to us. Browse all our [India Services guides](/india-services) for the exact requirements per service." },
    ],
    faq: [
      { question: "What photo size do government forms need?", answer: "It varies by portal, but many require photos under 20–100 KB at fixed dimensions. Always check the specific portal's requirement, then compress to just under it." },
      { question: "How do I reduce a PDF below 200 KB?", answer: "Use our PDF Compressor's 'target size' mode — set 200 KB and it compresses until the file fits." },
    ],
  },
  {
    slug: "how-to-link-pan-with-aadhaar-check-status",
    title: "How to Link PAN with Aadhaar & Check the Status (2026)",
    excerpt: "Link your PAN with Aadhaar on the official Income Tax portal, pay any late fee, and check whether they're already linked — step by step.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-07-19",
    tags: ["pan aadhaar link", "india services", "income tax", "aadhaar"],
    featured: true,
    relatedTools: ["pdf-compress", "image-compressor"],
    content: [
      { type: "p", text: "Linking your **PAN with Aadhaar** is mandatory for most taxpayers. If they aren't linked, your PAN can become *inoperative* — which blocks ITR filing, refunds and many financial transactions. Here's how to link them and check the status on the official portal. See the full checklist on our [PAN–Aadhaar Link service page](/india-services/identity-documents/pan-aadhaar-link)." },
      { type: "h2", text: "Before you start" },
      { type: "ul", items: [
        "Keep your **PAN** and **Aadhaar** numbers handy.",
        "Make sure your **name and date of birth match** on both — a mismatch is the most common reason linking fails.",
        "Have your mobile number ready for OTP.",
      ] },
      { type: "h2", text: "Step-by-step: link PAN with Aadhaar" },
      { type: "ol", items: [
        "Go to the official Income Tax e-filing portal (incometax.gov.in).",
        "Open 'Link Aadhaar' under Quick Links on the home page.",
        "Enter your PAN and Aadhaar number.",
        "If a late fee applies, pay it first via 'e-Pay Tax', then come back and submit the link request.",
        "Submit and note the confirmation.",
      ] },
      { type: "h2", text: "How to check PAN–Aadhaar link status" },
      { type: "p", text: "On the same portal, open 'Link Aadhaar Status', enter your PAN and Aadhaar, and it will tell you whether they're already linked or the request is still being processed." },
      { type: "callout", text: "Only use the official incometax.gov.in portal. Never pay a third-party 'linking' site — the government portal does it directly." },
      { type: "h2", text: "What if my PAN is already inoperative?" },
      { type: "p", text: "You can still link it by paying the applicable late fee; the PAN generally becomes operative again within a few days of a successful request. Fix any name/DOB mismatch first, then retry." },
    ],
    faq: [
      { question: "How do I know if my PAN and Aadhaar are already linked?", answer: "Use 'Link Aadhaar Status' on incometax.gov.in and enter both numbers — it shows the current linking status instantly." },
      { question: "Is there a fee to link PAN with Aadhaar?", answer: "A late fee applies for linking after the notified deadline. Pay it through 'e-Pay Tax' on the portal before submitting the link request." },
      { question: "What happens if I don't link them?", answer: "Your PAN can become inoperative, stopping ITR filing, refunds and several high-value transactions until you link them." },
    ],
  },
  {
    slug: "how-to-check-and-pay-traffic-e-challan-online",
    title: "How to Check & Pay a Traffic e-Challan Online in India",
    excerpt: "Find pending traffic challans against your vehicle or licence and pay them online on the official eChallan (Parivahan) portal — safely.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-07-19",
    tags: ["e challan", "india services", "traffic", "vehicles"],
    relatedTools: ["pdf-compress", "image-compressor"],
    content: [
      { type: "p", text: "A traffic **e-challan** is a digital fine issued for a traffic violation. You can check and pay it online in a couple of minutes on the official eChallan portal. Full details are on our [Traffic e-Challan service page](/india-services/vehicles/e-challan)." },
      { type: "h2", text: "What you'll need" },
      { type: "ul", items: [
        "Your **vehicle registration (RC) number**, or the **challan number**, or your **driving licence number**.",
        "Your mobile number for OTP verification.",
      ] },
      { type: "h2", text: "Step-by-step: check your challan" },
      { type: "ol", items: [
        "Visit the official eChallan portal (echallan.parivahan.gov.in).",
        "Choose 'Check Challan Status'.",
        "Enter your vehicle / challan / DL number and verify with OTP.",
        "Review the list of pending challans and their details.",
      ] },
      { type: "h2", text: "Paying your challan" },
      { type: "p", text: "Select the pending challan and pay online through the portal's payment options. Save the digital receipt as proof of payment. Many states also let you pay via their traffic police portal." },
      { type: "callout", text: "Beware of look-alike 'challan payment' sites and SMS links. Always start from echallan.parivahan.gov.in or your state traffic police's official portal." },
      { type: "h2", text: "Don't ignore pending challans" },
      { type: "p", text: "Unpaid challans can escalate to a virtual court and may affect vehicle services like transfer or fitness. It's best to clear them promptly." },
    ],
    faq: [
      { question: "How can I check my traffic challan online?", answer: "Go to echallan.parivahan.gov.in, choose 'Check Challan Status' and enter your vehicle number, challan number or driving licence number." },
      { question: "Can I pay a traffic challan online?", answer: "Yes — pending challans can be paid on the eChallan portal or your state traffic police portal, and you get a digital receipt." },
    ],
  },
  {
    slug: "how-to-check-cibil-credit-score-free",
    title: "How to Check Your CIBIL / Credit Score for Free",
    excerpt: "Every credit bureau must give you one free full report a year. Here's how to check your credit score safely without paying any third-party app.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-07-19",
    tags: ["cibil score", "credit score", "india services", "banking"],
    relatedTools: ["emi-calculator", "percentage-calculator"],
    content: [
      { type: "p", text: "Your **credit score** (often called a CIBIL score) reflects how reliably you repay loans and credit cards. Under RBI rules, each licensed credit bureau must give you **one free full credit report a year** — so you never need to pay a random 'score checker' app. See our [Credit Score service page](/india-services/banking/cibil-score) for the official sources." },
      { type: "h2", text: "Where to check your score" },
      { type: "p", text: "Check directly on the official website of an RBI-licensed Credit Information Company — CIBIL, Experian, Equifax or CRIF High Mark. Each maintains its own score, so they can differ slightly." },
      { type: "h2", text: "Step-by-step" },
      { type: "ol", items: [
        "Open the official website of a licensed credit bureau.",
        "Register with your PAN and basic personal details.",
        "Verify your identity via OTP.",
        "View your credit score and full credit report.",
        "Review the report for any errors and raise a dispute if something is wrong.",
      ] },
      { type: "h2", text: "What is a good score?" },
      { type: "p", text: "Scores usually range from 300 to 900. A higher score — commonly 750 and above — improves your chances of loan and credit-card approval, often at better interest rates. Use our [EMI Calculator](/tools/emi-calculator) to plan repayments once you're approved." },
      { type: "callout", text: "Never share your card or bank OTP with a 'free score' app. The official bureau sites only need your PAN and identity verification." },
      { type: "h2", text: "How to improve your score" },
      { type: "ul", items: [
        "Pay every EMI and credit-card bill on time.",
        "Keep your credit-card usage well below the limit.",
        "Avoid applying for many loans/cards in a short span.",
        "Check your report yearly and fix any errors.",
      ] },
    ],
    faq: [
      { question: "Is it really free to check my CIBIL score?", answer: "Yes — every RBI-licensed bureau must provide one free full credit report per year. Register on the official bureau site with your PAN to view it." },
      { question: "Why do different apps show different scores?", answer: "There are four licensed bureaus, each with its own score based on the data reported to them, so small differences are normal." },
    ],
  },
];

/* ---------------- helpers ---------------- */
export function estimateReadingMinutes(post: BlogPost): number {
  if (post.readingMinutes) return post.readingMinutes;
  const words = post.content.reduce((n, b) => {
    if (b.type === "ul" || b.type === "ol") return n + b.items.join(" ").split(/\s+/).length;
    if ("text" in b) return n + b.text.split(/\s+/).length;
    return n;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}

function byNewest(a: BlogPost, b: BlogPost) {
  return new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime();
}

export function allPosts(): BlogPost[] {
  return [...posts].sort(byNewest);
}
export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
export function postsByCategory(category: string): BlogPost[] {
  return allPosts().filter((p) => p.category === category);
}
export function postsByAuthor(author: string): BlogPost[] {
  return allPosts().filter((p) => p.author === author);
}
export function featuredPosts(): BlogPost[] {
  const f = allPosts().filter((p) => p.featured);
  return f.length ? f : allPosts().slice(0, 2);
}
export function relatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const scored = allPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = p.category === post.category ? 2 : 0;
      score += p.tags.filter((t) => post.tags.includes(t)).length;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || byNewest(a.p, b.p));
  return scored.slice(0, limit).map((s) => s.p);
}

export const POSTS_PER_PAGE = 6;
export function paginate(list: BlogPost[], page: number, perPage = POSTS_PER_PAGE) {
  const total = Math.max(1, Math.ceil(list.length / perPage));
  const current = Math.min(Math.max(1, page), total);
  const start = (current - 1) * perPage;
  return { items: list.slice(start, start + perPage), current, total };
}

/* ---------------- Table of Contents ---------------- */
export function headingSlug(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
export function tableOfContents(post: BlogPost): { id: string; text: string; level: 2 | 3 }[] {
  return post.content
    .filter((b): b is { type: "h2" | "h3"; text: string } => b.type === "h2" || b.type === "h3")
    .map((b) => ({ id: headingSlug(b.text), text: b.text, level: b.type === "h2" ? 2 : 3 }));
}
