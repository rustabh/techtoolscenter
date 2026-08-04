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
  {
    slug: "how-to-apply-domicile-certificate-online",
    title: "How to Apply for a Domicile Certificate Online (Any State)",
    excerpt: "A domicile certificate proves you're a permanent resident of your state — needed for state quota seats, jobs and scholarships. Here's how to get one online.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-07-19",
    tags: ["domicile certificate", "india services", "certificates", "state services"],
    relatedTools: ["pdf-compress", "image-compressor"],
    content: [
      { type: "p", text: "A **domicile (residence) certificate** proves you are a permanent resident of a particular state. You'll need it for state-quota college seats, state government jobs, scholarships and other state benefits. See the full checklist on our [Domicile Certificate service page](/india-services/certificates/domicile-certificate), and find your state's portal on the [Browse by state](/india-services) section." },
      { type: "h2", text: "Documents you'll usually need" },
      { type: "ul", items: [
        "Proof of continuous residence in the state (as per your state's rule)",
        "Identity proof (Aadhaar / voter ID)",
        "Address proof",
        "Ration card or school records (in some states)",
        "Self-declaration / affidavit where required",
      ] },
      { type: "h2", text: "Step-by-step process" },
      { type: "ol", items: [
        "Open your state's e-District / Revenue portal (find it on our state pages).",
        "Register and select 'Domicile / Residence Certificate'.",
        "Fill the form and upload your residence and identity proofs.",
        "Submit for verification by the Tehsildar / Revenue authority.",
        "Download the digitally-signed certificate once issued.",
      ] },
      { type: "callout", text: "Scanned documents too large to upload? Use our free [Image Compressor](/tools/image-compressor) or [PDF Compressor](/tools/pdf-compress) to fit the portal's size limit in seconds." },
      { type: "h2", text: "How long does it take?" },
      { type: "p", text: "Processing time varies by state — typically a few days to a couple of weeks after verification. Some states treat the certificate as long-term, while others may require periodic renewal, so check your state's rule." },
    ],
    faq: [
      { question: "What is a domicile certificate used for?", answer: "It proves permanent residence in a state and is used for state-quota college seats, state government jobs, scholarships and welfare benefits." },
      { question: "Can I apply for a domicile certificate online?", answer: "Yes — most states let you apply through their e-District/Revenue portal. You upload proofs online and the certificate is issued after verification." },
    ],
  },
  {
    slug: "what-is-ews-certificate-how-to-apply",
    title: "What Is an EWS Certificate and How to Apply for It",
    excerpt: "The EWS certificate lets eligible general-category families claim the 10% reservation. Learn the income limit, documents and how to apply online.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-07-19",
    tags: ["ews certificate", "india services", "reservation", "certificates"],
    relatedTools: ["pdf-compress", "image-compressor"],
    content: [
      { type: "p", text: "An **EWS (Economically Weaker Section) certificate** — also called an Income & Asset certificate — lets eligible general-category applicants claim the **10% EWS reservation** in education and government jobs. Full details are on our [EWS Certificate service page](/india-services/certificates/ews-certificate)." },
      { type: "h2", text: "Who is eligible?" },
      { type: "p", text: "General-category families (not covered by SC/ST/OBC reservation) whose family income and assets are within the notified EWS limits. The certificate confirms you meet those limits." },
      { type: "h2", text: "Documents required" },
      { type: "ul", items: [
        "Identity proof (Aadhaar)",
        "Address proof",
        "Family income proof (within the EWS limit)",
        "Land / asset details or self-declaration",
        "Ration card or other documents as per your state",
      ] },
      { type: "h2", text: "How to apply" },
      { type: "ol", items: [
        "Open your state's e-District / Revenue portal.",
        "Select 'EWS' / 'Income & Asset Certificate'.",
        "Enter your family income and asset details.",
        "Upload the required proofs and submit.",
        "After verification by the Revenue authority (Tehsildar / SDM), download the certificate.",
      ] },
      { type: "callout", text: "The EWS certificate is usually valid for one financial year, so renew it before applying to exams or jobs in a new year." },
    ],
    faq: [
      { question: "What is the income limit for EWS?", answer: "EWS eligibility is based on a notified family income and asset limit. Check the current limit on your state portal, as it is set by the government and can change." },
      { question: "How long is an EWS certificate valid?", answer: "It is generally valid for one financial year and needs to be renewed for continued use in admissions or recruitment." },
    ],
  },
  {
    slug: "how-to-get-fastag-recharge-online",
    title: "How to Get a FASTag and Recharge It Online",
    excerpt: "FASTag is mandatory for highway tolls. Here's how to buy one, complete KYC, and recharge it — plus how to avoid double-toll charges.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-07-19",
    tags: ["fastag", "india services", "vehicles", "toll"],
    relatedTools: ["image-compressor", "pdf-compress"],
    content: [
      { type: "p", text: "**FASTag** is a reloadable tag that pays highway tolls automatically using RFID — and it's mandatory at National Highway toll plazas. Here's how to get one and keep it topped up. See our [FASTag service page](/india-services/vehicles/fastag) for the full document list." },
      { type: "h2", text: "How to buy a FASTag" },
      { type: "ol", items: [
        "Choose an authorised issuing bank or provider.",
        "Buy the tag online or at a bank branch, toll plaza or point of sale.",
        "Submit your vehicle RC and KYC documents.",
        "Affix the tag on your windscreen as instructed.",
        "Recharge the linked wallet/account to start paying tolls automatically.",
      ] },
      { type: "h2", text: "How to recharge FASTag" },
      { type: "p", text: "Recharge through your issuing bank's app or website, via UPI, or through NETC/UMANG channels linked to your FASTag. Keep a healthy balance so you're never stopped in the FASTag lane." },
      { type: "callout", text: "Always buy from an authorised issuer and complete KYC — an unverified tag has limits, and an unofficial seller can leave you with a non-working tag." },
      { type: "h2", text: "Common FASTag problems" },
      { type: "ul", items: [
        "Low balance — set up auto-recharge or UPI top-up.",
        "Incomplete KYC — complete full KYC to lift transaction limits.",
        "Tag not read — ensure it's correctly affixed and not damaged.",
      ] },
    ],
    faq: [
      { question: "Is FASTag mandatory?", answer: "Yes, FASTag is mandatory for toll payment at National Highway plazas; vehicles without a valid FASTag can be charged double the toll." },
      { question: "How do I recharge my FASTag?", answer: "Recharge through your issuing bank's app/website, UPI, or the NETC/UMANG channels linked to your FASTag account." },
    ],
  },
  {
    slug: "aadhaar-vs-pan-card-difference",
    title: "Aadhaar vs PAN Card — What's the Difference?",
    excerpt: "Aadhaar and PAN look similar but do very different jobs. Here's what each is for, when you need which, and why they must be linked.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "comparison",
    publishedOn: "2026-07-19",
    tags: ["aadhaar", "pan card", "india services", "comparison"],
    relatedTools: ["image-compressor", "pdf-compress"],
    content: [
      { type: "p", text: "**Aadhaar** and **PAN** are the two most important Indian IDs — but they aren't interchangeable. This guide clears up what each does and when you need it. For how to apply, see our [Aadhaar guide](/india-services/identity-documents/aadhaar-card) and [PAN guide](/india-services/identity-documents/pan-card)." },
      { type: "h2", text: "What is Aadhaar?" },
      { type: "p", text: "Aadhaar is a 12-digit identity number issued by UIDAI to residents of India. It's primarily proof of **identity and address**, and is used for subsidies, KYC, SIM cards, and many government services." },
      { type: "h2", text: "What is PAN?" },
      { type: "p", text: "PAN (Permanent Account Number) is a 10-character number from the Income Tax Department. It's tied to your **financial and tax** identity — filing returns, high-value transactions, opening certain accounts and investments." },
      { type: "h2", text: "Aadhaar vs PAN at a glance" },
      { type: "ul", items: [
        "**Issued by:** Aadhaar → UIDAI; PAN → Income Tax Department.",
        "**Main purpose:** Aadhaar → identity & address proof; PAN → taxes & finance.",
        "**Format:** Aadhaar → 12 digits; PAN → 10 characters (letters + digits).",
        "**Who needs it:** Aadhaar → all residents; PAN → anyone with taxable income or major financial activity.",
      ] },
      { type: "h2", text: "Do they need to be linked?" },
      { type: "p", text: "Yes. Linking PAN with Aadhaar is mandatory for most taxpayers — an unlinked PAN can become inoperative. See our step-by-step [PAN–Aadhaar link guide](/india-services/identity-documents/pan-aadhaar-link)." },
      { type: "callout", text: "Applying for either? Get your photo and documents to the right size first with our free [Image Compressor](/tools/image-compressor) so uploads aren't rejected." },
    ],
    faq: [
      { question: "Can I use Aadhaar instead of PAN?", answer: "For some purposes you can quote Aadhaar in place of PAN, but they serve different roles — PAN is specifically for tax and financial transactions, so most people need both." },
      { question: "Is it mandatory to link PAN and Aadhaar?", answer: "Yes, for most taxpayers. An unlinked PAN can become inoperative and block ITR filing, refunds and major transactions." },
    ],
  },
  {
    slug: "old-vs-new-tax-regime-which-to-choose",
    title: "Old vs New Tax Regime — Which Should You Choose?",
    excerpt: "The new tax regime has lower rates but fewer deductions; the old one rewards investments and exemptions. Here's how to decide simply.",
    category: "business",
    author: "techtoolscenter-team",
    template: "comparison",
    publishedOn: "2026-07-19",
    tags: ["income tax", "tax regime", "itr", "india services"],
    relatedTools: ["gst-calculator", "percentage-calculator"],
    content: [
      { type: "p", text: "When filing your return you choose between the **old** and **new** tax regimes. They tax the same income differently, so the right pick depends on your deductions. Here's a simple way to decide. For filing itself, see our [ITR guide](/india-services/business-tax/itr-filing)." },
      { type: "h2", text: "The core difference" },
      { type: "ul", items: [
        "**New regime:** lower slab rates, but you give up most deductions and exemptions.",
        "**Old regime:** higher slab rates, but you can claim deductions like 80C, HRA, home-loan interest and more.",
      ] },
      { type: "h2", text: "A simple way to choose" },
      { type: "ol", items: [
        "Add up the deductions you actually claim (80C investments, HRA, home-loan interest, insurance, NPS, etc.).",
        "If your deductions are large, the old regime often wins.",
        "If you claim few or no deductions, the new regime's lower rates usually win.",
        "Use the official Income Tax portal's tax calculator to compare both on your exact numbers before filing.",
      ] },
      { type: "callout", text: "Quick maths helps — use our [Percentage Calculator](/tools/percentage-calculator) to sanity-check deductions and our [GST Calculator](/tools/gst-calculator) for business figures." },
      { type: "h2", text: "Tips" },
      { type: "ul", items: [
        "Salaried people can switch regimes year to year; business income has more restrictions — check current rules.",
        "Don't pick a regime just to invest in 80C — invest only if it fits your goals.",
        "Whichever you choose, file and e-verify on time to avoid issues.",
      ] },
    ],
    faq: [
      { question: "Which tax regime is better?", answer: "It depends on your deductions. Heavy deductions (80C, HRA, home loan) favour the old regime; few deductions favour the new regime's lower rates. Compare both on the official tax calculator." },
      { question: "Can I switch between regimes?", answer: "Salaried taxpayers can generally choose each year; those with business income face more restrictions, so check the current rules before deciding." },
    ],
  },
  {
    slug: "documents-required-for-passport-checklist",
    title: "Documents Required for a Passport in India (Full Checklist)",
    excerpt: "A clear checklist of the documents you need for a fresh passport or reissue — proof of address, date of birth and identity — plus photo tips.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "listicle",
    publishedOn: "2026-07-19",
    tags: ["passport", "documents checklist", "india services", "travel"],
    relatedTools: ["image-compressor-for-passport-photo", "image-compressor", "pdf-compress"],
    content: [
      { type: "p", text: "Getting your documents right the first time is the fastest way to a smooth passport appointment. Here's a simple checklist. For the full process, see our [Passport guide](/india-services/travel-immigration/passport)." },
      { type: "h2", text: "Proof of address (any one)" },
      { type: "ul", items: [
        "Aadhaar card",
        "Utility bill (electricity, water, landline, gas)",
        "Bank account statement / passbook",
        "Rent agreement (registered)",
      ] },
      { type: "h2", text: "Proof of date of birth (any one)" },
      { type: "ul", items: [
        "Birth certificate",
        "PAN card",
        "School leaving / 10th certificate",
      ] },
      { type: "h2", text: "Proof of identity" },
      { type: "ul", items: [
        "Aadhaar / voter ID / PAN",
        "Any other government photo ID as accepted",
      ] },
      { type: "h2", text: "Photographs" },
      { type: "p", text: "Carry recent passport-size photos that meet the exact specification shown on the Passport Seva portal. If you have a photo but it's the wrong size or too large to upload, fix it in seconds with our [Passport Photo tool](/tools/image-compressor-for-passport-photo)." },
      { type: "callout", text: "Always carry ORIGINAL documents to your PSK appointment — photocopies alone aren't accepted for verification." },
      { type: "h2", text: "Before your appointment" },
      { type: "ul", items: [
        "Make sure your name and date of birth match across all documents.",
        "Compress large scans/PDFs so uploads don't fail — use our [PDF Compressor](/tools/pdf-compress).",
        "Reach the Passport Seva Kendra on time with originals + one set of photocopies.",
      ] },
    ],
    faq: [
      { question: "What documents do I need for a passport?", answer: "You need proof of address, proof of date of birth and proof of identity (each satisfied by documents like Aadhaar, PAN, birth certificate or a utility bill), plus compliant passport-size photos. Carry originals to the appointment." },
      { question: "Do I need to carry original documents?", answer: "Yes — original documents are required for verification at the Passport Seva Kendra, along with a set of photocopies." },
    ],
  },

  /* ---------------- New posts (content expansion) ---------------- */
{
    slug: "how-to-compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality",
    excerpt:
      "Learn the real difference between lossy and lossless compression, which format to pick for which job, and how to shrink image files in your browser without wrecking them.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-07-31",
    updatedOn: "2026-07-31",
    tags: ["image compression", "web performance", "jpg", "png"],
    relatedTools: ["image-compressor", "image-resizer"],
    seoTitle: "Compress Images Without Losing Quality (Free, No Upload)",
    seoDescription:
      "A practical guide to lossy vs lossless compression and how to shrink photos, screenshots and graphics in your browser — free, private, no upload needed.",
    content: [
      { type: "p", text: "Big image files slow down your website, bloat your email attachments and eat storage on your phone. The fix isn't to just crank a slider to \"maximum compression\" and hope — it's understanding what compression actually throws away, and picking settings that match the image. A free in-browser **Image Compressor** lets you test this instantly, without uploading anything to a server." },
      { type: "h2", text: "Lossy vs lossless: what's the actual difference?" },
      { type: "p", text: "**Lossless compression** re-packs the file more efficiently but keeps every original pixel — decompress it and you get back the exact same image. PNG works this way. **Lossy compression** throws away detail the eye is less likely to notice — smoothing out subtle colour gradients, simplifying high-frequency texture — to get a much smaller file. JPEG and lossy WebP work this way. The trade-off: lossless is safer for anything with sharp edges or text, lossy is far smaller for photos." },
      { type: "h2", text: "Which format for which job" },
      { type: "ul", items: [
        "**Photos and busy backgrounds** — use JPEG or lossy WebP. The eye barely notices the loss, and files can shrink 70–90%.",
        "**Screenshots, logos, icons, text-heavy graphics** — use PNG or lossless WebP. Lossy compression turns sharp edges into blurry artifacts and text into mush.",
        "**Anything needing transparency** — PNG or WebP. JPEG has no alpha channel at all.",
        "**Web thumbnails and previews** — lossy is almost always fine; nobody is pixel-peeping a 300px thumbnail.",
      ] },
      { type: "h2", text: "Step-by-step: compress an image without losing quality" },
      { type: "ol", items: [
        "Open the Image Compressor — your file loads and processes locally in your browser, it's never sent anywhere.",
        "Drop in your image (JPG, PNG or WebP).",
        "Pick a quality level — start around 80% for photos, higher for anything with text or sharp lines.",
        "Compare the before/after file size and preview.",
        "If edges or text look soft, nudge the quality up a few percent and re-check.",
        "Download the compressed file once you're happy with the size-vs-quality balance.",
      ] },
      { type: "callout", text: "Because everything runs locally in your browser, nothing is uploaded to a server — useful when the images contain private documents, ID scans or unreleased product shots." },
      { type: "h2", text: "Tips for the best results" },
      { type: "ul", items: [
        "Compress from the original file if you have it — recompressing an already-compressed JPEG stacks up artifacts.",
        "Batch similar images together so you can apply one quality setting quickly instead of eyeballing each one.",
        "For product photography, compress after resizing to the final display size, not before — resizing after compression can reintroduce blur.",
        "Keep an uncompressed master copy of anything you might need to re-edit later.",
      ] },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Using JPEG for a logo or screenshot and wondering why the text looks fuzzy — that's a lossless job.",
        "Compressing the same JPEG multiple times across different tools, which compounds quality loss with every pass.",
        "Assuming smaller is always better — a 5KB thumbnail that's supposed to be a print-ready banner will look terrible blown up.",
        "Ignoring the preview and trusting the percentage slider blindly — always check the visual result before downloading.",
      ] },
    ],
    faq: [
      { question: "Does compressing an image always reduce quality?", answer: "Only lossy compression (JPEG, lossy WebP) discards data. Lossless compression (PNG, lossless WebP) reduces file size without touching a single pixel — it just repackages the data more efficiently." },
      { question: "Is it safe to compress images with sensitive content in the browser?", answer: "Yes — a browser-based compressor processes the file locally on your device using your browser's own engine. The image is never uploaded to a server, so nothing leaves your machine." },
      { question: "What quality setting should I use for JPEG?", answer: "80-85% is a good default for photos — it typically cuts file size significantly with no visible difference. Drop lower only for thumbnails or previews where size matters more than fidelity." },
      { question: "Can I compress PNG files too?", answer: "Yes. PNG compression is lossless by nature, but a compressor can still shrink the file meaningfully by optimizing how the pixel data is encoded, without changing a single pixel." },
      { question: "Will compression remove transparency from my image?", answer: "No, as long as you keep the file in PNG or WebP format. Converting a transparent PNG to JPEG, however, will flatten transparency onto a solid background since JPEG doesn't support an alpha channel." },
      { question: "How much smaller can I expect my files to get?", answer: "It depends on the source, but photos compressed from an uncompressed or lightly-compressed original commonly shrink 50-80% with no visible quality loss." },
    ],
  },
  {
    slug: "how-to-create-a-professional-qr-code",
    title: "How to Create a Professional QR Code (Free)",
    excerpt:
      "A complete walkthrough of QR code types, branding one with your colours and logo without breaking scannability, and exporting it in the right format.",
    category: "guides",
    author: "editorial",
    template: "guide",
    publishedOn: "2026-07-31",
    updatedOn: "2026-07-31",
    tags: ["qr code", "branding", "marketing", "design"],
    relatedTools: ["qr-generator", "barcode-generator"],
    seoTitle: "How to Create a Professional QR Code for Free",
    seoDescription:
      "Make a branded, scannable QR code for your website, Wi-Fi, vCard or UPI in minutes — free styling, logo support and PNG/SVG/PDF export.",
    content: [
      { type: "p", text: "A QR code doesn't have to be an ugly black-and-white square slapped on a poster. With a free **QR Generator** you can pick the right data type for the job, style it in your brand colours, drop your logo in the centre, and export it at the right resolution for print or web — all without paying for a design tool." },
      { type: "h2", text: "Pick the right QR code type" },
      { type: "ul", items: [
        "**URL** — the most common type; scanning opens a website or landing page directly.",
        "**vCard** — encodes a full contact card, so scanning it offers to save a name, phone, email and company straight to the phone's contacts.",
        "**Wi-Fi** — encodes network name and password so guests connect with one tap instead of typing a password.",
        "**UPI** — encodes payment details so scanning opens a payment app with the amount and payee pre-filled.",
        "**Plain text or email/phone** — useful for short messages, pre-filled emails or click-to-call numbers.",
      ] },
      { type: "h2", text: "Step-by-step: create a branded QR code" },
      { type: "ol", items: [
        "Open the QR Generator and choose your type — URL, vCard, Wi-Fi, UPI, text, email or phone.",
        "Fill in the details for that type. The preview updates as you type.",
        "Switch to styling — set foreground and background colours that match your brand.",
        "Try different dot and corner shapes (square, rounded, dots) for a less generic look.",
        "Add your logo in the centre if you want one.",
        "Scan the preview with your own phone to confirm it still reads correctly.",
        "Export as PNG for digital use, SVG for anything you'll print or scale up, or a PDF for a print-ready sheet.",
      ] },
      { type: "callout", text: "Always do a real phone scan test after adding a logo or heavy styling — a QR code that looks great but doesn't scan is worse than a plain one." },
      { type: "h2", text: "Keeping a styled code scannable" },
      { type: "p", text: "The two things that break scannability are low contrast and an oversized logo. Keep foreground and background colours clearly distinct — dark on light or light on dark, never two similar mid-tones. Keep a logo small enough to sit inside the code's error-correction margin, and never remove the quiet zone (the blank margin around the code) entirely." },
      { type: "h2", text: "Choosing an export format" },
      { type: "ul", items: [
        "**PNG** — best for websites, social media posts and digital display where you know the final pixel size.",
        "**SVG** — best for print, since it's vector-based and stays crisp at any size, from a business card to a banner.",
        "**PDF** — convenient when you want a print-ready file with the code already placed on a page.",
      ] },
      { type: "h2", text: "Tips" },
      { type: "ul", items: [
        "Test the printed size, not just the on-screen preview — codes smaller than about 2cm can be hard for phone cameras to focus on.",
        "Use a URL shortener or a link you control if you might need to change the destination later — a static QR code always points to the exact data you encoded.",
        "Match your QR code's colours to your brand kit so it doesn't look like an afterthought.",
        "For vCard and Wi-Fi codes, double-check every field before exporting — a typo in a password field means the code simply won't work.",
      ] },
    ],
    faq: [
      { question: "Can I change where a QR code points after printing it?", answer: "Only if you encoded a link you control (like a redirect you manage) rather than the final destination directly. A static QR code encodes the data itself, so pointing it somewhere new means generating and reprinting a new code." },
      { question: "Will adding a logo stop my QR code from scanning?", answer: "Not if you keep the logo reasonably small relative to the code and keep colour contrast high. QR codes have built-in error correction that tolerates some obstruction, but a logo that's too large can still break it — always test with a real phone." },
      { question: "What's the difference between a UPI QR code and a URL QR code?", answer: "A UPI QR code encodes payment details (payee, account, sometimes amount) so scanning it opens a payment app ready to pay. A URL QR code just opens a webpage in the phone's browser." },
      { question: "Which file format should I use for a printed poster?", answer: "SVG. It's vector-based, so it scales up to poster size without going blurry or pixelated the way a small PNG would." },
      { question: "Do I need an account to create a QR code?", answer: "No — you can generate, style and download a QR code without signing up." },
      { question: "What happens when someone scans a vCard QR code?", answer: "Their phone reads the embedded contact details and prompts them to save it — name, phone, email and company — directly into their contacts app, no typing required." },
    ],
  },
  {
    slug: "png-vs-webp-which-format-should-you-use",
    title: "PNG vs WebP: Which Image Format Should You Use?",
    excerpt:
      "An honest, no-hype comparison of PNG and WebP — file size, transparency, compatibility and when each format is genuinely the better choice.",
    category: "design",
    author: "techtoolscenter-team",
    template: "comparison",
    publishedOn: "2026-07-31",
    updatedOn: "2026-07-31",
    tags: ["png", "webp", "image formats", "web performance"],
    relatedTools: ["image-converter", "image-compressor"],
    seoTitle: "PNG vs WebP: Which Format Should You Actually Use?",
    seoDescription:
      "PNG or WebP? A clear, honest breakdown of file size, transparency and compatibility so you can pick the right format for your project every time.",
    content: [
      { type: "p", text: "PNG and WebP both support transparency and both give you lossless quality, so it's easy to assume WebP simply wins on every count. That's not quite true. Here's an honest breakdown of what each format is actually good at, so you can pick the right one for the job rather than following a blanket rule." },
      { type: "h2", text: "PNG: the reliable universal format" },
      { type: "p", text: "PNG is lossless — it never throws away pixel data — and it's supported absolutely everywhere: every browser, every image editor, every operating system, every print workflow going back decades. It handles transparency well and renders sharp text and hard edges perfectly. The cost is file size: PNG files are typically larger than an equivalent WebP, especially for photographic content." },
      { type: "h2", text: "WebP: smaller files, modern support" },
      { type: "p", text: "WebP was built to solve PNG's size problem. It supports both lossless mode (similar quality to PNG, notably smaller files) and lossy mode (much smaller again, ideal for photos), plus full transparency in both modes. Browser support today is excellent — all major modern browsers display WebP natively. The rough edges show up in older or more specialised software: some legacy image editors, certain print pipelines, and older versions of some operating systems don't handle WebP well, or at all." },
      { type: "h2", text: "Head-to-head" },
      { type: "ul", items: [
        "**File size** — WebP wins, often 25-50% smaller than PNG at equivalent visual quality.",
        "**Transparency** — tie. Both support a full alpha channel.",
        "**Universal compatibility** — PNG wins. It works everywhere without exception, including older software and print workflows.",
        "**Browser support (modern web)** — WebP wins comfortably; every current major browser renders it natively.",
        "**Lossless option** — both offer it, but PNG has been the lossless default for longer and is what most editing software exports natively.",
        "**Editing software / print pipelines** — PNG wins for anything going into a design tool, a print shop, or an older workflow that may not recognise WebP.",
      ] },
      { type: "h2", text: "A decision framework, not a rule" },
      { type: "ol", items: [
        "Building a website and want fast page loads? Use WebP for photos and most graphics.",
        "Sending a file to a print shop, or into software you're not sure supports WebP? Use PNG to be safe.",
        "Need the image to work in absolutely any context without testing? Use PNG.",
        "Optimising for page speed and your audience is on modern browsers? Use WebP.",
        "Archiving a master copy you might re-edit for years? PNG's universal support makes it the safer long-term bet.",
      ] },
      { type: "h2", text: "How to convert between them" },
      { type: "p", text: "If you have a PNG and want a smaller WebP for the web, or a WebP that needs to become a PNG for compatibility with an older tool, an **Image Converter** handles this in your browser in a couple of clicks — no need to install anything." },
      { type: "h2", text: "Tips" },
      { type: "ul", items: [
        "When in doubt for the web, serve WebP with a PNG fallback if your platform supports it.",
        "Don't convert a JPEG to PNG expecting quality to improve — you can't recover detail that lossy compression already discarded.",
        "Check where the file is actually going (web, print, another person's editing software) before picking a format, rather than defaulting to one every time.",
      ] },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Assuming WebP is strictly superior and using it for a print job, where an older RIP or print pipeline may not accept it.",
        "Keeping PNG for a photo-heavy web page and wondering why it loads slowly — that's exactly the case WebP's lossy mode was built for.",
        "Not checking transparency after converting — it usually survives, but always verify in the target format.",
      ] },
    ],
    faq: [
      { question: "Is WebP always smaller than PNG?", answer: "Almost always, yes — often by 25-50% at similar visual quality, since WebP's compression algorithms are newer and more efficient. The exception is very simple images (flat colours, few colours) where the gap can be small." },
      { question: "Does WebP support transparency like PNG?", answer: "Yes. WebP supports a full alpha channel in both its lossless and lossy modes, just like PNG." },
      { question: "Will WebP work in all browsers?", answer: "All current major browsers support WebP natively. The compatibility concerns show up mostly in older software outside the browser — some legacy image editors, older OS versions and certain print workflows." },
      { question: "Should I use WebP for print materials?", answer: "Generally no. Print workflows are built around formats like PNG, TIFF or PDF; using WebP for print risks incompatibility with the print shop's software. Stick with PNG for anything headed to print." },
      { question: "Can I convert a PNG to WebP without losing quality?", answer: "Yes — WebP has a lossless mode that preserves every pixel, so converting PNG to lossless WebP keeps identical quality while typically producing a smaller file." },
      { question: "Which format should I use for a logo with transparency?", answer: "Either works for transparency, but PNG is the safer universal default for a logo since it needs to open correctly in every tool a client or partner might use. Use WebP as well if you're specifically optimising a website's load time." },
    ],
  },
  {
    slug: "how-to-merge-pdf-files-online",
    title: "How to Merge PDF Files Online (Free & Private)",
    excerpt:
      "Combine multiple PDFs into one file, reorder pages, and understand why doing it in your browser matters when the documents are sensitive.",
    category: "guides",
    author: "editorial",
    template: "tutorial",
    publishedOn: "2026-07-31",
    updatedOn: "2026-07-31",
    tags: ["pdf", "merge pdf", "document tools", "privacy"],
    relatedTools: ["pdf-merge", "pdf-compress"],
    seoTitle: "How to Merge PDF Files Online for Free (and Privately)",
    seoDescription:
      "Combine multiple PDFs into a single file, reorder the pages exactly how you want, and keep sensitive documents private with a browser-based merge tool.",
    content: [
      { type: "p", text: "Scanned contracts, ID copies, invoices, reports — at some point you need them all as one PDF instead of five separate files. A free **PDF Merge** tool combines them in seconds, and doing it in your browser means the documents never have to leave your device." },
      { type: "h2", text: "Step-by-step: merge your PDFs" },
      { type: "ol", items: [
        "Open the PDF Merge tool.",
        "Add all the PDF files you want to combine — drag them in or select from your device.",
        "Drag the file thumbnails into the order you want the final document to read.",
        "Preview the combined page order before finalising.",
        "Merge, then download the single combined PDF.",
      ] },
      { type: "h2", text: "Reordering and fine-tuning pages" },
      { type: "p", text: "Once your files are loaded, each one shows as a thumbnail (or set of page thumbnails) you can drag into place. This matters for things like a job application — cover letter first, resume second, certificates last — or a contract where exhibits need to follow the main agreement in the right sequence." },
      { type: "h2", text: "Why doing this in-browser matters for privacy" },
      { type: "p", text: "A lot of \"merge PDF\" websites work by uploading your files to their server, processing them, and sending the result back — meaning your contract, ID scan or medical report sits on someone else's server, even if briefly. A tool that merges files **locally in your browser** never uploads them anywhere; the merge happens using your browser's own processing, and the files stay on your device the whole time. For anything containing personal, financial or legal information, that difference actually matters." },
      { type: "callout", text: "Before merging ID scans, bank statements or contracts, check whether the tool processes files locally or uploads them to a server — it's usually stated clearly, and it's worth choosing the local option." },
      { type: "h2", text: "Tips" },
      { type: "ul", items: [
        "Rename your source files before merging (e.g. \"01-cover-letter.pdf\", \"02-resume.pdf\") so the intended order is obvious at a glance.",
        "If the combined file is large after merging, run it through a PDF compressor afterward to shrink it for email attachments.",
        "Keep your original separate files until you've confirmed the merged PDF opens correctly and has every page.",
        "Double check the page order in the final preview — it's much easier to fix before downloading than after.",
      ] },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Uploading sensitive documents to an unfamiliar site without checking how it processes files.",
        "Forgetting to reorder files before merging, then having to redo the whole thing.",
        "Merging low-quality scans without checking that text is still legible in the combined file.",
        "Not compressing a large merged PDF before emailing it, hitting an attachment size limit.",
      ] },
    ],
    faq: [
      { question: "Is it safe to merge PDFs containing personal documents like ID scans?", answer: "It's safe if the tool processes files locally in your browser rather than uploading them to a server. Check that before merging anything sensitive — a local, in-browser tool never sends your files anywhere." },
      { question: "Can I change the order of pages when merging?", answer: "Yes. Once your PDFs are loaded, you can drag the file or page thumbnails into whatever order you want before merging." },
      { question: "Is there a limit to how many PDFs I can combine?", answer: "You can merge multiple files in one go; very large batches may simply take a little longer to process since everything happens in your browser." },
      { question: "Does merging PDFs reduce their quality?", answer: "No. Merging just combines the pages into one file — it doesn't recompress or alter the content of each page." },
      { question: "What if my merged PDF is too large to email?", answer: "Run the merged file through a PDF compressor afterward — it shrinks embedded images and fonts while keeping the document readable." },
      { question: "Do I need to install software to merge PDFs?", answer: "No — a browser-based merge tool needs no installation or sign-up; you open it, add your files and download the result." },
    ],
  },
  {
    slug: "best-free-online-image-compressor",
    title: "Best Free Online Image Compressor in 2026",
    excerpt:
      "What to actually look for in an image compressor — privacy, format support and batch processing — and why a browser-based tool beats uploading to a server.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "listicle",
    publishedOn: "2026-07-31",
    updatedOn: "2026-07-31",
    tags: ["image compressor", "web performance", "privacy", "tools"],
    relatedTools: ["image-compressor", "bulk-image-processor"],
    seoTitle: "Best Free Online Image Compressor in 2026 (No Upload)",
    seoDescription:
      "Skip the fake rankings — here's exactly what makes an image compressor good in 2026, and why a browser-based, no-upload tool wins on speed and privacy.",
    content: [
      { type: "p", text: "Searching \"best image compressor\" mostly turns up listicles ranking tools by how much they paid for placement. Instead, here's what actually separates a good image compressor from a mediocre one — the criteria you should judge any tool by, including the ones on this site." },
      { type: "h2", text: "1. It processes images locally, not on a server" },
      { type: "p", text: "The biggest difference in 2026 is whether a compressor uploads your file to a server or processes it entirely in your browser. A browser-based compressor reads the file, compresses it using your browser's own engine, and gives you the result — your image never leaves your device. That's both faster (no upload/download round trip) and more private, which matters for anything from unreleased product photos to personal documents." },
      { type: "h2", text: "2. It supports the formats you actually use" },
      { type: "ul", items: [
        "**JPEG** for photos, with an adjustable quality slider.",
        "**PNG** for screenshots, logos and anything needing transparency.",
        "**WebP** for smaller web-optimised files with transparency support.",
        "Ideally, the ability to convert between formats too, not just compress within the original one.",
      ] },
      { type: "h2", text: "3. It gives you real control over quality" },
      { type: "p", text: "A single \"compress\" button with no options is a red flag. Look for an adjustable quality/compression level and, ideally, a live before/after preview or file-size readout so you can see the trade-off you're making instead of guessing." },
      { type: "h2", text: "4. It handles batches, not just one file at a time" },
      { type: "p", text: "If you're compressing a folder of product photos or a gallery of screenshots, doing them one by one is a waste of time. Batch or bulk processing — where you drop in multiple files and apply the same settings to all of them — is a genuine time-saver worth checking for." },
      { type: "h2", text: "How to actually test a compressor" },
      { type: "ol", items: [
        "Open the tool and check whether it says images are processed locally in your browser or uploaded to a server.",
        "Upload a test photo and a test screenshot to see how it handles both photographic and sharp-edged content.",
        "Try the quality slider at a few different levels and compare the visual result, not just the percentage.",
        "If you regularly compress many files, test the batch/bulk upload flow.",
        "Check the download — does it keep your original filename and format, or make assumptions you didn't ask for?",
      ] },
      { type: "h2", text: "Why browser-based wins on speed too" },
      { type: "p", text: "Beyond privacy, skipping the upload-to-server-and-download-again round trip is simply faster, especially on a slow connection or with large files. A local compressor starts working the instant you drop the file in." },
      { type: "h2", text: "Tips" },
      { type: "ul", items: [
        "Compress from your original file, not a copy that's already been compressed once.",
        "Match the quality setting to the content — photos tolerate more compression than text-heavy graphics.",
        "Use bulk processing for anything more than a handful of files to save time.",
        "Re-check file size after compression — sometimes a lower quality setting than expected already looks fine.",
      ] },
    ],
    faq: [
      { question: "What's the most important feature in an image compressor?", answer: "Whether it processes files locally in your browser instead of uploading them to a server. That single factor determines both speed and how private your images stay." },
      { question: "Do free image compressors reduce quality too aggressively by default?", answer: "It varies by tool. Look for one with an adjustable quality slider and a preview, rather than one that applies a fixed compression level with no visibility into the trade-off." },
      { question: "Can I compress multiple images at once?", answer: "A good compressor supports batch or bulk processing, letting you drop in several files and apply the same settings to all of them instead of repeating the process one file at a time." },
      { question: "Is a browser-based compressor as effective as server-based ones?", answer: "Yes — modern browsers can run the same compression algorithms as a server, so you get comparable results in file size and quality, without your files leaving your device." },
      { question: "Do I need to install anything to compress images online?", answer: "No. A browser-based compressor runs entirely on the page you open — no installation, plugin or sign-up required." },
      { question: "Will compressing my images affect their format?", answer: "No, compression keeps the same format unless you specifically choose to convert it — a compressed JPEG stays a JPEG, a compressed PNG stays a PNG." },
    ],
  },
  {
    slug: "how-to-convert-jpg-to-png",
    title: "How to Convert JPG to PNG (and Back) for Free",
    excerpt:
      "Step-by-step conversion between JPG and PNG, plus when you actually need each direction — transparency, lossless edits or smaller file size.",
    category: "guides",
    author: "editorial",
    template: "tutorial",
    publishedOn: "2026-07-31",
    updatedOn: "2026-07-31",
    tags: ["jpg", "png", "image converter", "file formats"],
    relatedTools: ["image-converter"],
    seoTitle: "Convert JPG to PNG (or PNG to JPG) Free, In Your Browser",
    seoDescription:
      "Convert JPG to PNG or PNG to JPG in a few clicks, and learn exactly when you actually need each direction — transparency, edits, or smaller files.",
    content: [
      { type: "p", text: "JPG and PNG solve different problems, so \"converting\" between them only helps if you're converting for the right reason. Here's how to do it, and — more importantly — when each direction actually makes sense." },
      { type: "h2", text: "Step-by-step: convert with the Image Converter" },
      { type: "ol", items: [
        "Open the Image Converter.",
        "Upload your JPG or PNG file.",
        "Choose the target format — PNG or JPG.",
        "If converting to JPG, set a quality level for the export.",
        "Download the converted file.",
      ] },
      { type: "h2", text: "When to convert JPG to PNG" },
      { type: "ul", items: [
        "**You need transparency** — JPG has no alpha channel, so if you're about to add transparency (e.g. cutting out a background) you need a PNG first.",
        "**You're about to make lossless edits** — cropping, adding text, or layering in an editor repeatedly on a PNG avoids stacking up JPEG compression artifacts.",
        "**The image has sharp text or hard edges** — like a screenshot or scanned document — where JPEG compression tends to smear fine detail.",
      ] },
      { type: "h2", text: "When to convert PNG to JPG" },
      { type: "ul", items: [
        "**You don't need transparency** — most photos and flattened graphics don't, and JPG will give you a noticeably smaller file.",
        "**File size matters more than pixel-perfect fidelity** — email attachments, web pages, photo galleries.",
        "**You're finished editing** — once an image is final, converting to JPG for delivery avoids carrying around an unnecessarily large PNG.",
      ] },
      { type: "callout", text: "Converting PNG to JPG on an image that has transparency will flatten it onto a solid (usually white) background — check for that before converting." },
      { type: "h2", text: "What actually happens during conversion" },
      { type: "p", text: "PNG to JPG applies lossy compression for the first time, so there is some quality trade-off — controlled by the quality setting you choose. JPG to PNG doesn't add quality back that JPEG already discarded; it just repackages the existing pixels losslessly from that point forward, which is why it's the right move before further edits, not a way to \"undo\" JPEG compression." },
      { type: "h2", text: "Tips" },
      { type: "ul", items: [
        "Convert from the highest-quality source you have — converting a heavily compressed JPG to PNG won't recover lost detail.",
        "If you'll be editing further, convert to PNG first and only export to JPG at the very end.",
        "Set JPG quality around 80-90% for a good balance of size and appearance.",
        "Check for transparency before converting PNG to JPG so you're not surprised by a flattened background.",
      ] },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Converting JPG to PNG expecting the quality to improve — the compression already happened and can't be reversed.",
        "Converting a transparent PNG straight to JPG without noticing the background gets filled in solid.",
        "Repeatedly saving as JPG through multiple edit rounds, compounding artifacts each time.",
      ] },
    ],
    faq: [
      { question: "Does converting JPG to PNG improve image quality?", answer: "No. Whatever detail JPEG compression already discarded is gone — converting to PNG just stops further lossy compression from that point on, it doesn't restore anything." },
      { question: "What happens to transparency when I convert PNG to JPG?", answer: "It gets flattened onto a solid background, usually white, since JPEG has no alpha channel to store transparency." },
      { question: "Why would I convert JPG to PNG if it doesn't add quality back?", answer: "Mainly to add transparency, or before doing several rounds of lossless edits — re-saving as PNG in between edits avoids stacking additional JPEG compression artifacts." },
      { question: "Is PNG always better quality than JPG?", answer: "PNG is lossless so it never adds compression artifacts, but that doesn't mean it's the right choice for everything — a JPEG at a good quality setting is visually indistinguishable from PNG for most photos while being a fraction of the size." },
      { question: "Can I convert multiple images at once?", answer: "Yes, most converters support uploading several files and converting them all to the same target format in one pass." },
      { question: "Is my image uploaded to a server during conversion?", answer: "A browser-based converter processes the file locally on your device, so it isn't uploaded anywhere during the conversion." },
    ],
  },
  {
    slug: "how-to-create-a-digital-business-card",
    title: "How to Create a Digital Business Card with a QR Code",
    excerpt:
      "Turn a vCard QR code into a free digital business card — scan it and your contact details save straight to the other person's phone, styled with your brand.",
    category: "design",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-07-31",
    updatedOn: "2026-07-31",
    tags: ["qr code", "vcard", "business card", "branding"],
    relatedTools: ["qr-generator", "brand-kit-generator"],
    seoTitle: "Make a Free Digital Business Card Using a vCard QR Code",
    seoDescription:
      "Skip printed cards — create a free vCard QR code that saves your contact details straight to someone's phone the moment they scan it, styled with your brand.",
    content: [
      { type: "p", text: "You don't need a dedicated app to hand someone your contact details digitally. A **vCard QR code** — a QR code that encodes your name, phone, email and company as a contact card — does the job for free: someone scans it, their phone offers to save your details straight to contacts, and there's nothing to type." },
      { type: "h2", text: "What a vCard QR code actually is" },
      { type: "p", text: "It's important to be precise here: this is a QR code encoding a vCard (a standard contact-card format), not a standalone \"digital business card app\" with its own profile page or click tracking. When scanned, the phone's camera recognises the vCard data and prompts \"Save Contact\" — that's the entire interaction. It works because vCard is a format every phone's camera app already understands, not because of any special software on your end." },
      { type: "h2", text: "Step-by-step: create your vCard QR code" },
      { type: "ol", items: [
        "Open the QR Generator and choose the vCard type.",
        "Fill in your details — name, job title, company, phone, email, and website if you have one.",
        "Style the code with your brand colours and, optionally, your logo in the centre.",
        "Preview the code and scan it with your own phone to confirm it prompts \"Save Contact\" with the right details.",
        "Export as PNG for digital sharing (email signature, social profile) or SVG/PDF for print — on a physical card, a desk stand or a poster.",
      ] },
      { type: "callout", text: "Test the vCard scan with your own phone before printing or sharing it widely — a typo in a phone number or email is easy to miss until someone actually tries to use it." },
      { type: "h2", text: "Styling it like a real business card" },
      { type: "p", text: "Use your brand kit's exact colours for the QR code's foreground and background, and add your logo to the centre if your brand kit has one. Keep contrast high enough that the code still scans reliably — a stylish code nobody's phone can read isn't a business card, it's decoration." },
      { type: "h2", text: "Where to put it" },
      { type: "ul", items: [
        "Printed on a traditional paper business card, as a faster alternative to reading out your number.",
        "In your email signature, so recipients can save your details in one tap without leaving their inbox.",
        "On a desk stand, laptop sticker, or presentation slide for in-person meetings and conferences.",
        "On event badges or booth signage, so anyone who stops by can grab your contact details instantly.",
      ] },
      { type: "h2", text: "Tips" },
      { type: "ul", items: [
        "Keep the vCard fields to what's genuinely useful — name, title, company, phone, email, website. Too many fields make for a cluttered saved contact.",
        "Update the QR code whenever your phone number or job title changes — since the data is baked into the code, a change means generating a new one.",
        "Export SVG if you're printing it, so it stays sharp at business-card size.",
        "Keep a digital copy (PNG) handy to drop into an email signature or LinkedIn message.",
      ] },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Calling it a \"business card app\" to clients — it's a QR code, so set the right expectation about what happens when it's scanned.",
        "Overloading the vCard with too many fields, making the saved contact messy.",
        "Skipping the phone scan test and finding out later a digit was mistyped.",
        "Printing it too small — a vCard QR code carries more data than a simple URL code, so it needs a bit more size to stay reliably scannable.",
      ] },
    ],
    faq: [
      { question: "What happens when someone scans a vCard QR code?", answer: "Their phone's camera recognises the embedded contact data and prompts them to save it directly to their contacts — name, phone, email and company, with no typing needed." },
      { question: "Is this the same as a dedicated digital business card app?", answer: "No. This is a QR code encoding a standard vCard, not a standalone app with a hosted profile page or analytics — the entire feature is that scanning it offers to save your contact details." },
      { question: "Can I update my details after the QR code is printed?", answer: "Not on the same printed code — the contact data is baked directly into it. If your details change, generate a new QR code with the updated information and reprint or reshare it." },
      { question: "Can I add my logo and brand colours to a vCard QR code?", answer: "Yes — you can style the code with custom colours and add a logo in the centre, the same as any other QR code type, as long as you keep contrast high enough to stay scannable." },
      { question: "Does the vCard QR code work on both iPhone and Android?", answer: "Yes — vCard is a standard contact format that both iOS and Android camera apps recognise natively." },
      { question: "What format should I export for a printed card?", answer: "SVG, since it's vector-based and stays crisp at small business-card sizes, unlike a low-resolution PNG." },
    ],
  },
  {
    slug: "how-to-remove-background-from-images",
    title: "How to Remove a Background from an Image for Free",
    excerpt:
      "How to cleanly remove a solid, plain background from a product photo, ID picture or logo using color-based removal — free, in your browser.",
    category: "design",
    author: "editorial",
    template: "guide",
    publishedOn: "2026-07-31",
    updatedOn: "2026-07-31",
    tags: ["background removal", "product photos", "image editing", "logos"],
    relatedTools: ["image-studio", "image-compressor"],
    seoTitle: "How to Remove a Solid Background from a Photo (Free)",
    seoDescription:
      "Remove a flat, solid-colour background from a product photo, ID picture or logo for free using color-based removal in your browser — no upload needed.",
    content: [
      { type: "p", text: "Not every background removal job needs AI. If your photo was shot on a flat, solid-colour backdrop — a white studio background, a plain-colour ID photo, or a logo on a solid fill — you can strip it out cleanly using **color-based removal** in Image Studio, which detects the background colour and makes it transparent. It's fast, free, and works entirely in your browser." },
      { type: "h2", text: "What this tool actually does (and doesn't)" },
      { type: "p", text: "Image Studio's background removal works by detecting a solid or plain background colour and removing it, leaving the subject on a transparent background. It's built for product photos on a white or solid backdrop, ID-style photos, and logos or graphics with a flat fill — the kind of images where the background is one consistent colour. It is **not** an AI-powered tool that can cut a subject out of a complex, busy or natural background (like a person standing in a park) — for that kind of arbitrary-background cutout, you'd need a different, AI-based tool. Setting the right expectation up front saves you a frustrating result." },
      { type: "h2", text: "Step-by-step: remove a solid background" },
      { type: "ol", items: [
        "Open Image Studio and upload your photo.",
        "Select the background removal tool.",
        "Click or select the background colour you want removed (e.g. the white or plain backdrop behind your product).",
        "Adjust the tolerance/threshold if some background pixels are still showing, or if edges of the subject are being cut into.",
        "Preview the transparent result — zoom into the edges to check for leftover fringe colour.",
        "Export as PNG (or WebP) to keep the transparency.",
      ] },
      { type: "callout", text: "This works best when the background is one consistent, flat colour with good contrast against the subject — think studio white, not a photo taken outdoors." },
      { type: "h2", text: "Good use cases for this tool" },
      { type: "ul", items: [
        "**Product photography** shot against a white or solid-colour studio backdrop, for e-commerce listings.",
        "**ID-style photos** where the subject is against a plain, flat-coloured wall or backdrop.",
        "**Logos and graphics** that have a solid fill you want to strip out to get a transparent version.",
      ] },
      { type: "h2", text: "When this tool isn't the right fit" },
      { type: "p", text: "If your photo has a busy, textured, or natural background — outdoors, a cluttered room, varying lighting — color-based removal will struggle, because there's no single consistent colour to detect and remove. That's a job for AI-based background removal, which this tool does not do." },
      { type: "h2", text: "Tips" },
      { type: "ul", items: [
        "Shoot product photos against the most uniform, evenly-lit backdrop you can — the cleaner the original background, the cleaner the removal.",
        "Zoom in on edges (hair, fine details) after removal — color-based methods can leave a thin fringe of the original background colour.",
        "Export as PNG to preserve transparency; converting to JPG afterward will flatten it onto a solid fill.",
        "If tolerance is too low, some background remains; too high, and it starts eating into the subject — adjust in small steps.",
      ] },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Trying to remove a busy outdoor or textured background and getting a messy result — that's outside what color-based removal can do.",
        "Exporting to JPG and losing the transparency you just created.",
        "Not checking edges closely — a stray colour fringe is easy to miss at normal zoom.",
        "Shooting the original photo with uneven lighting on the backdrop, making one consistent colour harder to detect.",
      ] },
    ],
    faq: [
      { question: "Does this tool use AI to cut out any background?", answer: "No. It uses color-based removal, which detects a solid or plain background colour and removes it. It's built for flat, consistent backgrounds — not AI-powered cutouts of complex or natural scenes." },
      { question: "Can I remove a busy or outdoor background with this?", answer: "Not reliably. Color-based removal needs a single consistent background colour to detect. A busy, textured or outdoor background doesn't have that, so results will be messy." },
      { question: "What kind of photos work best with this tool?", answer: "Product photos shot on a plain white or solid-colour studio backdrop, ID-style photos against a flat wall, and logos or graphics with a solid fill." },
      { question: "What format should I export to keep the transparent background?", answer: "PNG (or WebP) — both support transparency. Exporting to JPG will flatten the transparent area onto a solid background." },
      { question: "Why is there a colour fringe left around my subject after removal?", answer: "This can happen at the edges where the subject and background colours blend slightly, especially around fine details like hair. Try adjusting the tolerance setting, or zoom in and check the edges before exporting." },
      { question: "Is my photo uploaded to a server when I remove the background?", answer: "No — the tool processes your image locally in your browser, so it isn't sent to a server." },
    ],
  },
  {
    slug: "pdf-compression-guide",
    title: "The Complete Guide to Compressing PDF Files",
    excerpt:
      "Why PDFs balloon in size, how compression actually works, and a step-by-step for shrinking a PDF in your browser without making it unreadable.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-07-31",
    updatedOn: "2026-07-31",
    tags: ["pdf", "pdf compression", "document tools", "file size"],
    relatedTools: ["pdf-compress", "pdf-merge"],
    seoTitle: "The Complete Guide to Compressing PDF Files (Free)",
    seoDescription:
      "Learn why PDFs get so large and how to shrink them properly, in your browser, without losing readability — a full walkthrough for reports, scans and forms.",
    content: [
      { type: "p", text: "A 20-page report shouldn't be 40MB. If your PDFs keep hitting email attachment limits or taking forever to upload, the file usually isn't \"just big\" for no reason — it's carrying embedded fonts, uncompressed images or scanned pages at way more resolution than the content needs. A free **PDF Compress** tool fixes this in your browser in seconds." },
      { type: "h2", text: "Why PDFs get so large" },
      { type: "ul", items: [
        "**Embedded fonts** — a PDF often bundles the entire font file so it displays identically everywhere, which adds overhead, especially with multiple fonts or weights.",
        "**Uncompressed or high-resolution images** — a photo or diagram embedded at print resolution (or dropped in without any compression at all) can dwarf the size of all the text combined.",
        "**Scanned pages** — a document scanned as a series of full-resolution images (rather than real text) is usually the single biggest cause of a bloated PDF, since every page is effectively a large photo.",
        "**Unused or duplicated data** — leftover metadata, duplicate embedded resources, or edits stacked on top of each other over multiple saves.",
      ] },
      { type: "h2", text: "How PDF compression actually works" },
      { type: "p", text: "A compressor targets the biggest contributors: it recompresses embedded images at a lower quality or resolution (similar to JPEG compression), can subset fonts (keeping only the characters actually used instead of the whole font file), and strips unnecessary embedded data — all while leaving the text and page structure itself intact so the document still reads normally." },
      { type: "h2", text: "Step-by-step: compress a PDF without losing readability" },
      { type: "ol", items: [
        "Open the PDF Compress tool.",
        "Upload your PDF — it's processed in your browser.",
        "Pick a compression level — start with a moderate setting rather than the most aggressive one.",
        "Preview a few pages, especially any with images or scanned content, to check text and images still look sharp enough.",
        "If a scanned page looks too soft, back off to a lighter compression level and re-check.",
        "Download the compressed file and confirm the new size before sending it on.",
      ] },
      { type: "callout", text: "For scanned documents especially, check a page with small text after compressing — that's where over-compression shows up first." },
      { type: "h2", text: "Choosing the right compression level" },
      { type: "p", text: "For text-heavy reports with a few images, a light-to-moderate setting usually shrinks the file significantly with no visible change. For scanned documents made up mostly of page images, you'll see the biggest size reduction from image compression — but that's also where quality loss becomes visible first, so check small text carefully before settling on a level." },
      { type: "h2", text: "Tips" },
      { type: "ul", items: [
        "Compress from the original file, not a copy that's already been compressed once — recompressing a compressed PDF gives diminishing returns and more visible artifacts.",
        "If you're about to merge several PDFs, compress each one first — or merge, then compress once at the end, rather than doing it twice.",
        "For anything with legal or archival importance, keep the original uncompressed file even after you've made a compressed copy to share.",
        "Check the compressed file opens and displays correctly across the pages that matter most before deleting anything.",
      ] },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Applying the most aggressive compression setting by default and ending up with blurry scanned text.",
        "Compressing a PDF that's already been compressed multiple times, stacking up quality loss.",
        "Not checking image-heavy or scanned pages specifically, since that's where quality issues show up first.",
        "Deleting the original file before confirming the compressed version looks right.",
      ] },
    ],
    faq: [
      { question: "Why is my PDF so much bigger than expected?", answer: "Usually one of three things: embedded fonts, uncompressed or high-resolution images, or scanned pages stored as full-resolution images rather than real text. Scanned documents are typically the biggest culprit." },
      { question: "Will compressing a PDF make the text blurry?", answer: "No, as long as the text is real selectable text (not a scanned image) — compression targets embedded images and font data, leaving actual text sharp. Scanned pages, which are images of text, can lose sharpness at aggressive settings." },
      { question: "What compression level should I use?", answer: "Start with a moderate setting and preview the result, especially any pages with small text or images. Only go more aggressive if the size still isn't small enough and the quality still looks acceptable." },
      { question: "Is it safe to compress a PDF with sensitive information?", answer: "Yes, if the tool processes the file locally in your browser rather than uploading it to a server — check for that, especially with contracts, IDs or financial documents." },
      { question: "Can I compress a PDF that's already scanned images?", answer: "Yes — this is actually where compression tends to help the most, since scanned pages are usually the largest contributor to file size. Just check text legibility at your chosen setting." },
      { question: "Does compressing a PDF change its page count or layout?", answer: "No. Compression only reduces the size of embedded images and font data — the pages, layout and text content stay exactly the same." },
    ],
  },
  {
    slug: "best-free-online-tools-for-students",
    title: "10 Best Free Online Tools for Students",
    excerpt:
      "Practical, specific free tools for essay limits, coursework calculations, unit conversions, study sessions and grade tracking — no sign-up required.",
    category: "productivity",
    author: "editorial",
    template: "listicle",
    publishedOn: "2026-07-31",
    updatedOn: "2026-07-31",
    tags: ["students", "study tools", "productivity", "free tools"],
    relatedTools: ["word-counter", "unit-converter", "scientific-calculator", "pomodoro-timer", "percentage-calculator"],
    seoTitle: "10 Best Free Online Tools for Students in 2026",
    seoDescription:
      "The free tools that actually help with essays, homework, exam prep and grades — word counts, unit conversions, calculators, timers and more.",
    content: [
      { type: "p", text: "Most \"tools for students\" lists are generic filler. Here are specific, practical tools that solve problems you actually run into during a semester — hitting a word count, converting units for a physics problem, tracking your grade percentage, or just getting through a study session without losing focus." },
      { type: "h2", text: "1. Word Counter — for essay and assignment limits" },
      { type: "p", text: "Most essay prompts and assignment briefs come with a word limit — \"1500-2000 words\" or \"no more than 500 words.\" A **Word Counter** gives you a live count as you write or paste in a draft, so you're not manually counting or guessing whether you're over. It's also useful for checking character limits on application essays and scholarship submissions that cap length strictly." },
      { type: "h2", text: "2. Scientific Calculator — for coursework that needs more than basic arithmetic" },
      { type: "p", text: "Basic phone calculators don't handle trigonometric functions, logarithms, exponents or scientific notation cleanly. A **Scientific Calculator** covers the functions actually used in physics, chemistry, engineering and higher-level math coursework, without needing a dedicated calculator app or physical device." },
      { type: "h2", text: "3. Unit Converter — for science and math homework" },
      { type: "p", text: "Converting between metric and imperial, or between units within the metric system (mL to L, grams to kilograms, joules to calories), comes up constantly in chemistry and physics problem sets. A **Unit Converter** handles these conversions instantly and accurately, which matters when a wrong conversion cascades into a wrong final answer." },
      { type: "h2", text: "4. Pomodoro Timer — for actually finishing study sessions" },
      { type: "p", text: "The Pomodoro method — 25 minutes of focused work followed by a 5-minute break — is genuinely effective for long study sessions or essay writing, because it breaks an overwhelming task into manageable chunks with built-in breaks. A **Pomodoro Timer** runs the cycle for you so you're not manually watching the clock." },
      { type: "h2", text: "5. Percentage Calculator — for grades and marks" },
      { type: "p", text: "\"I got 42 out of 60 — what percentage is that, and what do I need on the final to get an 80% overall?\" is a calculation students do constantly. A **Percentage Calculator** handles straightforward percentage conversions and weighted calculations quickly, without you reaching for a notebook to work it out by hand." },
      { type: "h2", text: "How to use these together during a semester" },
      { type: "ol", items: [
        "Start a study or writing session with the Pomodoro Timer running in the background.",
        "Draft your essay or assignment, checking the Word Counter against the assignment's limit as you go.",
        "For problem sets, use the Scientific Calculator and Unit Converter side by side to work through calculations and conversions.",
        "After grades come back, use the Percentage Calculator to check your running average and what you need on remaining assessments.",
      ] },
      { type: "h2", text: "Tips" },
      { type: "ul", items: [
        "Check your assignment's word limit rules (does it include or exclude the bibliography?) before relying on the word counter as your final check.",
        "Keep the Pomodoro Timer's break length short enough that you don't lose momentum, but long enough to actually rest your eyes and mind.",
        "Double-check unit conversions in a science problem before submitting — a decimal or unit mistake often costs more marks than a rounding error.",
        "Use the percentage calculator to figure out what score you need on a final exam or assignment to hit a target overall grade, not just what you already got.",
      ] },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Ignoring whether a word count limit includes footnotes, titles or references, and submitting an essay that's technically over.",
        "Working through unit conversions by hand under time pressure and making an avoidable arithmetic slip.",
        "Skipping breaks during long study sessions, which hurts focus more than it helps productivity.",
        "Not recalculating your grade percentage after each new mark, so a slipping average goes unnoticed until it's hard to fix.",
      ] },
    ],
    faq: [
      { question: "Are these tools free to use?", answer: "Yes — all of them are free, run in your browser and don't require creating an account." },
      { question: "Does the word counter count words the same way as Microsoft Word?", answer: "It counts words based on whitespace-separated tokens the same standard way most word processors do, which should match closely — always check your specific assignment's rules on what counts (e.g. whether references are included)." },
      { question: "Can the scientific calculator handle trigonometry and logarithms?", answer: "Yes — it covers standard scientific functions like trigonometric functions, logarithms and exponents that a basic calculator doesn't offer." },
      { question: "What's the ideal Pomodoro session length for studying?", answer: "The classic pattern is 25 minutes focused, 5 minutes break, with a longer break after four cycles — but you can adjust the timer to whatever focus length works for you." },
      { question: "How does the percentage calculator help with grades?", answer: "It converts raw scores (like 42/60) into a percentage instantly, and can help you work out what score you need on a remaining assessment to hit a target overall grade." },
      { question: "Can I use the unit converter for chemistry problems, not just physics?", answer: "Yes — it covers general metric and imperial conversions (mass, volume, length, energy, etc.) that come up across physics, chemistry and general math coursework." },
    ],
  },
{
  "slug": "chatgpt-vs-claude-vs-gemini-2026",
  "title": "ChatGPT vs Claude vs Gemini: Which AI Chatbot Should You Use in 2026?",
  "excerpt": "A practical, no-hype comparison of the three biggest AI chatbots — what each is actually good at, their free tiers, and which one fits your specific task.",
  "category": "guides",
  "author": "editorial",
  "template": "comparison",
  "publishedOn": "2026-08-01",
  "tags": [
    "ai",
    "chatgpt",
    "claude",
    "gemini",
    "ai chatbots"
  ],
  "content": [
    {
      "type": "p",
      "text": "ChatGPT, Claude and Gemini all do the same basic thing — you type a question, they write an answer — but they're built by different companies with different priorities, and that shows up in daily use. Instead of declaring one \"the best,\" here's what each is genuinely good at, so you can pick based on what you're actually trying to do."
    },
    {
      "type": "h2",
      "text": "ChatGPT (OpenAI)"
    },
    {
      "type": "p",
      "text": "ChatGPT has the largest plugin/app ecosystem and the widest general awareness — it's often the first AI people try. Its free tier gives access to a capable model with usage limits, and paid plans add image generation (via DALL-E), voice conversations, and higher usage caps. It tends to be a strong all-rounder for everyday questions, brainstorming and casual coding help."
    },
    {
      "type": "h2",
      "text": "Claude (Anthropic)"
    },
    {
      "type": "p",
      "text": "Claude is frequently praised for longer, more careful writing and for handling large documents or codebases in one go thanks to a large context window. If your task involves reading through a long PDF, refactoring a sizeable file, or getting a nuanced written response rather than a quick one-liner, Claude tends to hold up well. It also has a free tier with usage limits, and paid tiers for heavier use."
    },
    {
      "type": "h2",
      "text": "Gemini (Google)"
    },
    {
      "type": "p",
      "text": "Gemini's biggest practical advantage is how deeply it's wired into Google's own products — Search, Docs, Gmail and Android. If you're already in the Google ecosystem, Gemini can act on your Drive files or Gmail directly, which the other two can't do natively. It's also generally available for free with a Google account."
    },
    {
      "type": "h2",
      "text": "So which one should you actually use?"
    },
    {
      "type": "ul",
      "items": [
        "General everyday questions, brainstorming, quick drafts — ChatGPT is a safe default.",
        "Long documents, careful writing, coding across many files — try Claude.",
        "You live inside Gmail/Docs/Drive and want AI that can reach into them — Gemini.",
        "You're not sure — most of these have a free tier, so the fastest way to decide is to try the same real task in two of them and compare the output."
      ]
    },
    {
      "type": "callout",
      "text": "There's no single \"best\" chatbot — the right one depends on the task in front of you. Browse [all AI chatbots on AI Hub](/ai-hub/chatbots) to compare pricing and official links side by side."
    },
    {
      "type": "h2",
      "text": "Beyond the big three"
    },
    {
      "type": "p",
      "text": "Microsoft Copilot, DeepSeek, Mistral's Le Chat, Meta AI and Perplexity are all worth knowing about too — each has a different angle, from Office integration to web-search-first answers. You can browse the full, regularly updated list on [AI Hub](/ai-hub)."
    }
  ],
  "faq": [
    {
      "question": "Is ChatGPT, Claude or Gemini completely free?",
      "answer": "All three have a free tier with usage limits, and a paid plan for heavier or more advanced use. Exact limits change over time, so check each provider's own pricing page for the current details."
    },
    {
      "question": "Which one is best for coding?",
      "answer": "All three can help with code, but many developers pair a chatbot with a dedicated AI coding tool like Cursor, GitHub Copilot or Windsurf for actually writing and editing code inside a project — see our roundup of the best free AI tools for coding."
    },
    {
      "question": "Can I use more than one?",
      "answer": "Yes — many people use different chatbots for different tasks. There's no penalty for having a free account with more than one."
    }
  ]
},
{
  "slug": "best-free-ai-tools-for-coding-2026",
  "title": "10 Best Free AI Tools for Coding in 2026",
  "excerpt": "From AI-native editors to terminal-based agents, these are the AI coding tools with a genuinely useful free tier — what each does best, and where to start.",
  "category": "developer",
  "author": "editorial",
  "template": "listicle",
  "publishedOn": "2026-08-01",
  "tags": [
    "ai",
    "coding",
    "developer tools",
    "free ai tools"
  ],
  "content": [
    {
      "type": "p",
      "text": "You don't need a paid subscription to get real value from AI while coding. Here are ten tools with a genuinely usable free tier (or that are fully open source), covering everything from autocomplete to full autonomous coding agents."
    },
    {
      "type": "h2",
      "text": "1. GitHub Copilot"
    },
    {
      "type": "p",
      "text": "GitHub's AI pair-programmer has a free tier for individual developers with monthly usage limits, built directly into VS Code and other major editors."
    },
    {
      "type": "h2",
      "text": "2. Cursor"
    },
    {
      "type": "p",
      "text": "An AI-native fork of VS Code with a free tier for its core chat and autocomplete features — a full editor built around AI from the ground up."
    },
    {
      "type": "h2",
      "text": "3. Windsurf"
    },
    {
      "type": "p",
      "text": "Another full AI-native editor, with a free tier covering its core AI features — worth trying alongside Cursor to see which workflow you prefer."
    },
    {
      "type": "h2",
      "text": "4. Continue.dev"
    },
    {
      "type": "p",
      "text": "A free, open-source AI coding assistant you can plug into VS Code or JetBrains IDEs, and point at the model of your choice."
    },
    {
      "type": "h2",
      "text": "5. Cline"
    },
    {
      "type": "p",
      "text": "An open-source autonomous coding agent that runs as a VS Code extension — free to use, since you're just paying for whatever underlying model you connect it to."
    },
    {
      "type": "h2",
      "text": "6. Aider"
    },
    {
      "type": "p",
      "text": "A free, open-source AI pair-programmer that runs entirely in your terminal and edits real files in your project directly."
    },
    {
      "type": "h2",
      "text": "7. Amazon Q Developer"
    },
    {
      "type": "p",
      "text": "AWS's AI coding assistant has a free tier for individual developers, integrated into popular IDEs."
    },
    {
      "type": "h2",
      "text": "8. Tabnine"
    },
    {
      "type": "p",
      "text": "One of the longer-standing AI autocomplete tools, with a free tier for individual use across most major editors."
    },
    {
      "type": "h2",
      "text": "9. Replit AI"
    },
    {
      "type": "p",
      "text": "If you build in the browser, Replit's AI features are available on its free tier — useful for quick prototypes without any local setup."
    },
    {
      "type": "h2",
      "text": "10. ChatGPT / Claude (free tier)"
    },
    {
      "type": "p",
      "text": "A general chatbot isn't a replacement for an in-editor assistant, but the free tiers of ChatGPT and Claude are still genuinely useful for explaining errors, planning an approach, or reviewing a snippet you paste in."
    },
    {
      "type": "callout",
      "text": "See pricing, official links and full descriptions for all of these — and more — on [AI Hub's Coding category](/ai-hub/coding), or browse component libraries and other build resources on the [Developer Hub](/developer-hub)."
    }
  ],
  "faq": [
    {
      "question": "Are these tools really free, or just a trial?",
      "answer": "Continue.dev, Cline and Aider are fully open source and free. Cursor, Windsurf, GitHub Copilot, Amazon Q Developer, Tabnine and Replit AI all have an ongoing free tier for individual use (not just a time-limited trial), though usage limits and exact terms can change — check each one's current pricing page."
    },
    {
      "question": "Which one should I start with?",
      "answer": "If you want a full AI-native editor, try Cursor or Windsurf. If you want to keep your existing editor and just add AI, GitHub Copilot or Continue.dev are the easiest additions."
    },
    {
      "question": "Do any of these work without an internet connection?",
      "answer": "Most rely on a cloud-hosted model, so no. If fully offline/local model use matters to you, look at pairing an open-source tool like Continue.dev with a locally-hosted model."
    }
  ]
},
{
  "slug": "gst-registration-india-step-by-step-guide",
  "title": "GST Registration in India: Complete Step-by-Step Guide (2026)",
  "excerpt": "Who needs to register for GST, which documents you need, and the exact steps on the official GST portal — plus what changes once you're registered.",
  "category": "business",
  "author": "techtoolscenter-team",
  "template": "guide",
  "publishedOn": "2026-08-01",
  "tags": [
    "gst",
    "business",
    "india",
    "tax registration"
  ],
  "relatedTools": [
    "invoice-maker",
    "gst-calculator"
  ],
  "content": [
    {
      "type": "p",
      "text": "GST (Goods and Services Tax) registration is the process that gives your business a GSTIN — a unique 15-digit number that lets you legally collect GST from customers and claim credit for GST you've paid. Here's who needs it and exactly how to apply."
    },
    {
      "type": "h2",
      "text": "Who needs to register for GST?"
    },
    {
      "type": "ul",
      "items": [
        "Businesses with annual turnover above the threshold set for your state and business type (this varies for goods vs services, and by state — check the current threshold on the [official GST portal](https://www.gst.gov.in) before applying).",
        "Anyone selling goods or services inter-state, regardless of turnover.",
        "E-commerce sellers, in most cases, regardless of turnover.",
        "Businesses that want to voluntarily register to claim input tax credit, even below the threshold."
      ]
    },
    {
      "type": "h2",
      "text": "Documents you'll need"
    },
    {
      "type": "ul",
      "items": [
        "PAN card of the business/proprietor",
        "Aadhaar card",
        "Proof of business address (electricity bill, rent agreement, or property documents)",
        "Bank account details (a cancelled cheque or bank statement)",
        "Passport-size photograph",
        "Business registration proof (partnership deed, incorporation certificate, etc., if applicable)"
      ]
    },
    {
      "type": "h2",
      "text": "Step-by-step registration process"
    },
    {
      "type": "ol",
      "items": [
        "Go to the [official GST portal](https://www.gst.gov.in) and click Register Now under Taxpayers.",
        "Fill Part A with your PAN, mobile number and email — you'll get an OTP on both to verify.",
        "You'll receive a Temporary Reference Number (TRN); use it to log back in and complete Part B.",
        "Fill in business details, promoter/partner details, and upload the documents listed above.",
        "Choose your principal place of business and add any additional places of business.",
        "Submit the application using an OTP, Digital Signature Certificate (DSC), or e-Sign.",
        "You'll receive an Application Reference Number (ARN) to track your application status.",
        "Once approved (typically within a few working days), you'll receive your GSTIN and can download your registration certificate from the portal."
      ]
    },
    {
      "type": "callout",
      "text": "For the full checklist with eligibility details specific to your situation, see the [India Hub GST Registration guide](/india-services/business-tax/gst-registration)."
    },
    {
      "type": "h2",
      "text": "What changes once you're registered"
    },
    {
      "type": "p",
      "text": "Once registered, you must charge GST on your invoices, file regular GST returns (monthly or quarterly depending on your scheme), and maintain proper records. A [GST-compliant Invoice Maker](/tools/invoice-maker) that automatically splits CGST/SGST or IGST makes this much easier to get right from day one."
    }
  ],
  "faq": [
    {
      "question": "How long does GST registration take?",
      "answer": "Once your application and documents are submitted correctly, approval typically takes a few working days. Delays usually come from incomplete or mismatched documents."
    },
    {
      "question": "Is there a fee for GST registration?",
      "answer": "No — GST registration itself is free on the official government portal. Be cautious of third parties charging a fee just to fill the form for you."
    },
    {
      "question": "What happens if I don't register when I'm required to?",
      "answer": "Operating above the threshold (or making inter-state/e-commerce sales) without registering can lead to penalties and interest on unpaid tax. It's best to register as soon as you cross the threshold or start qualifying activity."
    }
  ]
},
{
  "slug": "how-to-check-epf-pf-balance-online",
  "title": "How to Check Your EPF/PF Balance Online (2026 Guide)",
  "excerpt": "Four free ways to check your Provident Fund balance — the EPFO portal, the UMANG app, a missed call, and SMS — with what you need for each.",
  "category": "guides",
  "author": "techtoolscenter-team",
  "template": "tutorial",
  "publishedOn": "2026-08-01",
  "tags": [
    "epf",
    "pf",
    "epfo",
    "india",
    "employment"
  ],
  "content": [
    {
      "type": "p",
      "text": "If you're a salaried employee in India, your Provident Fund (PF) contributions are managed by EPFO (Employees' Provident Fund Organisation). You don't need to visit an office to check your balance — here are four free ways to do it, all using your UAN (Universal Account Number)."
    },
    {
      "type": "h2",
      "text": "What you need first: your UAN"
    },
    {
      "type": "p",
      "text": "Your UAN (Universal Account Number) is a 12-digit number assigned to every EPF member, and it stays the same across job changes. It's usually printed on your payslip, or your employer's HR/payroll team can provide it. You'll also need it activated on the EPFO portal at least once (with an OTP to your registered mobile) before some of these methods work."
    },
    {
      "type": "h2",
      "text": "Method 1: EPFO member portal"
    },
    {
      "type": "ol",
      "items": [
        "Go to the [EPFO member e-Sewa portal](https://www.epfindia.gov.in) and log in with your UAN and password.",
        "Go to the \"View\" menu and select \"Passbook.\"",
        "You'll see your full contribution history and current balance, employer-wise."
      ]
    },
    {
      "type": "h2",
      "text": "Method 2: UMANG app"
    },
    {
      "type": "p",
      "text": "The UMANG app (a government app covering many services) has an EPFO section where you can check your passbook and balance using your UAN, without needing a separate login for EPFO specifically."
    },
    {
      "type": "h2",
      "text": "Method 3: Missed call"
    },
    {
      "type": "p",
      "text": "If your UAN is linked to your Aadhaar, PAN and bank account (KYC-seeded), give a missed call to the EPFO's registered missed-call number from your registered mobile. You'll receive an SMS with your last contribution and balance — no charges, no need to speak to anyone."
    },
    {
      "type": "h2",
      "text": "Method 4: SMS"
    },
    {
      "type": "p",
      "text": "You can also send an SMS in the format specified by EPFO from your registered mobile number to get your balance details by return SMS, available in multiple languages."
    },
    {
      "type": "callout",
      "text": "Exact numbers, SMS formats and portal steps can change — always confirm the current details on the [official EPFO website](https://www.epfindia.gov.in) or the [India Hub EPFO guide](/india-services/employment/epfo)."
    },
    {
      "type": "h2",
      "text": "If your UAN isn't activated yet"
    },
    {
      "type": "p",
      "text": "You'll need to activate it once on the EPFO portal using your UAN, and details like date of birth and mobile number, followed by an OTP. After that, all four methods above will work."
    }
  ],
  "faq": [
    {
      "question": "Is checking my PF balance free?",
      "answer": "Yes, all four methods — portal, UMANG app, missed call and SMS — are completely free."
    },
    {
      "question": "What if I don't know my UAN?",
      "answer": "Check your salary slip, ask your employer's HR/payroll team, or look it up on the EPFO portal using your PF account number and personal details."
    },
    {
      "question": "Why is my balance not updating?",
      "answer": "Employers deposit PF contributions with some processing delay, so very recent salary months may not show immediately. If it's been several months with no update, follow up with your employer's payroll team."
    }
  ]
},
{
  "slug": "best-free-ai-image-generators-2026",
  "title": "Best Free AI Image Generators in 2026 (And How Midjourney Compares)",
  "excerpt": "Midjourney gets the most attention, but it's paid-only. Here are the AI image generators that actually have a usable free tier — and where Midjourney fits in.",
  "category": "design",
  "author": "editorial",
  "template": "comparison",
  "publishedOn": "2026-08-01",
  "tags": [
    "ai",
    "image generation",
    "midjourney",
    "free ai tools",
    "design"
  ],
  "content": [
    {
      "type": "p",
      "text": "Midjourney is often the first name people mention for AI image generation — but it's important to know upfront that it's paid-only, with no ongoing free tier. If you want to try AI image generation without paying, here's what actually has a real free option, plus where Midjourney fits if you decide it's worth paying for."
    },
    {
      "type": "h2",
      "text": "Genuinely free options"
    },
    {
      "type": "h3",
      "text": "Bing Image Creator"
    },
    {
      "type": "p",
      "text": "Microsoft's free AI image generator, powered by DALL-E, built right into Bing. No subscription required."
    },
    {
      "type": "h3",
      "text": "Stable Diffusion"
    },
    {
      "type": "p",
      "text": "An open-weight model you can run yourself, or access through various free community interfaces. More setup involved, but genuinely free and highly customizable."
    },
    {
      "type": "h2",
      "text": "Free tier, paid for more"
    },
    {
      "type": "h3",
      "text": "Adobe Firefly"
    },
    {
      "type": "p",
      "text": "Adobe's generative image models, with a free tier covering a limited number of monthly generations, and deep integration with Photoshop/Illustrator on paid Creative Cloud plans."
    },
    {
      "type": "h3",
      "text": "Playground AI"
    },
    {
      "type": "p",
      "text": "A browser-based canvas for mixing multiple AI models, with a free daily generation allowance."
    },
    {
      "type": "h3",
      "text": "Leonardo AI"
    },
    {
      "type": "p",
      "text": "Popular for game and creative asset generation, with a free tier that includes a daily token allowance."
    },
    {
      "type": "h3",
      "text": "Ideogram"
    },
    {
      "type": "p",
      "text": "Especially strong at rendering legible text inside generated images (something many models struggle with), with a free tier available."
    },
    {
      "type": "h2",
      "text": "Where Midjourney fits"
    },
    {
      "type": "p",
      "text": "Midjourney is known for a distinctive, painterly image style that many artists and designers prefer for certain kinds of work — but it requires a paid subscription with no free trial. If your priority is cost, start with the free options above; if you specifically want Midjourney's look and are willing to pay, it remains one of the most popular choices for that particular aesthetic."
    },
    {
      "type": "callout",
      "text": "Compare pricing, official links and more image-generation tools on [AI Hub's Image Generation category](/ai-hub/image-generation)."
    },
    {
      "type": "h2",
      "text": "Already have an image? You don't need AI for everything"
    },
    {
      "type": "p",
      "text": "If you just need to resize, compress, convert or clean up the background of an existing image, our own free [Image Studio](/tools/image-studio) does all of that privately in your browser — no AI subscription needed."
    }
  ],
  "faq": [
    {
      "question": "Does Midjourney have a free trial?",
      "answer": "No — Midjourney removed its free trial in 2023 due to abuse, and it is currently a paid-only subscription service."
    },
    {
      "question": "Which free AI image generator is best for beginners?",
      "answer": "Bing Image Creator is the simplest to start with — it's free, requires only a Microsoft account, and needs no setup."
    },
    {
      "question": "Can I use AI-generated images commercially?",
      "answer": "This depends entirely on each tool's specific terms of service and your subscription tier — always check the current licensing terms on the provider's own site before commercial use."
    }
  ]
},
  {
    slug: "how-to-get-legal-heir-certificate-india",
    title: "How to Get a Legal Heir Certificate in India (Documents & Process)",
    excerpt:
      "What a legal heir certificate is for, who counts as a legal heir, the exact documents you need, and how it's different from a succession certificate.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-08-01",
    tags: ["legal heir certificate", "india services", "government", "certificates", "inheritance"],
    relatedTools: ["pdf-merge", "image-compressor", "pdf-compress"],
    seoTitle: "Legal Heir Certificate in India: Documents, Process & Fees (2026)",
    seoDescription:
      "Step-by-step guide to getting a legal heir certificate — who qualifies, required documents, how it differs from a succession certificate, and where to apply.",
    content: [
      { type: "p", text: "When someone passes away, their bank account, pension, insurance policy or property doesn't transfer to the family automatically — most institutions ask for a **legal heir certificate** first, to confirm exactly who the rightful heirs are. It's a short document, but getting it wrong (missing a name, applying for the wrong type) can delay a claim by months. Full details and official links are on our [Legal Heir Certificate service page](/india-services/certificates/legal-heir-certificate)." },
      { type: "h2", text: "What is a legal heir certificate actually for?" },
      { type: "p", text: "It's issued by the Tehsildar or Revenue Officer and lists every surviving legal heir of a deceased person — usually the spouse, children and parents. Banks use it to release a deceased account holder's balance, insurers use it to pay out a claim, and pension offices use it to transfer family pension. It's a routine administrative document, not a court order." },
      { type: "h2", text: "Legal heir certificate vs succession certificate" },
      { type: "p", text: "These get confused constantly, and using the wrong one wastes weeks. A **legal heir certificate** (Tehsildar-issued) is enough for straightforward transfers — a bank account, provident fund, salary dues, a small insurance payout. A **succession certificate** (issued only by a civil court) is required for anything more contested or valuable — transferring shares, debentures, debts owed to the deceased, or when heirs disagree on the split. If a bank specifically asks for a succession certificate, a legal heir certificate won't be accepted as a substitute." },
      { type: "h2", text: "Who counts as a legal heir?" },
      { type: "ul", items: [
        "Spouse of the deceased",
        "Children (sons and daughters, including adopted children where recognised)",
        "Parents, if the deceased had no spouse or children",
        "In some cases, siblings — depending on applicable personal law and whether closer heirs exist",
      ] },
      { type: "h2", text: "Documents you'll need" },
      { type: "ul", items: [
        "Death certificate of the deceased",
        "Aadhaar and address proof of all legal heirs",
        "Ration card or family register showing the family structure",
        "A self-declaration affidavit listing every heir and their relationship",
        "Proof of relationship — birth or marriage certificates — if asked",
      ] },
      { type: "h2", text: "Step-by-step: how to apply" },
      { type: "ol", items: [
        "Go to your Tehsildar/Taluk office, or check if your state's e-District portal (Mee Seva, e-Sevai, and similar) allows online filing.",
        "Submit the death certificate, an affidavit naming every legal heir, and supporting ID/address proofs.",
        "A Village Administrative Officer or Revenue Inspector typically verifies the details, sometimes with a local enquiry.",
        "The Tehsildar signs off on the certificate once verification is complete.",
        "Use the certificate with the bank, insurer or registrar that requested it.",
      ] },
      { type: "callout", text: "One heir can file the application, but list every legal heir in the affidavit — leaving someone out is the single most common reason these certificates get challenged later." },
      { type: "h2", text: "How long does it take, and what does it cost?" },
      { type: "p", text: "Processing usually takes 15–30 days after verification, longer if there's a family dispute or the Revenue office needs an additional local enquiry. The fee itself is small — typically ₹20–100 plus affidavit and stamp paper costs — but it varies by state, so check your local Tehsil office or e-District portal for the exact amount." },
    ],
    faq: [
      { question: "How is a legal heir certificate different from a succession certificate?", answer: "A legal heir certificate (from the Tehsildar) covers routine transfers like a bank account or pension. A succession certificate (from a civil court) is needed for contested inheritance, debts, or transferring securities and shares." },
      { question: "Can I apply online?", answer: "Many states now allow this through their e-District portal (for example Telangana's Mee Seva or Tamil Nadu's e-Sevai) — check your specific state's portal, since not all states have digitised the full process yet." },
      { question: "What happens if I leave out a legal heir by mistake?", answer: "The certificate can be challenged or delayed later by the omitted heir. Always list every spouse, child and parent of the deceased in the affidavit, even if they don't plan to claim anything themselves." },
    ],
  },
  {
    slug: "how-to-download-voter-id-e-epic-online",
    title: "How to Download Your Voter ID (e-EPIC) Online",
    excerpt:
      "Skip the wait for a physical replacement — download a QR-coded, print-ready copy of your Voter ID from the Election Commission's own portal in a few minutes.",
    category: "guides",
    author: "editorial",
    template: "tutorial",
    publishedOn: "2026-08-01",
    tags: ["voter id", "e-epic", "india services", "government", "identity documents"],
    relatedTools: ["image-compressor", "pdf-compress", "qr-generator"],
    seoTitle: "Download Voter ID Online: e-EPIC Download Guide (2026)",
    seoDescription:
      "How to download your Voter ID card as a digital e-EPIC — steps, requirements, and what to do if your mobile number isn't linked yet.",
    content: [
      { type: "p", text: "Lost your physical Voter ID, or just need a copy right now instead of waiting for a replacement card? The Election Commission's **e-EPIC** is a free, official digital version of your Voter ID — a QR-coded PDF you can download in minutes and use anywhere the physical card is accepted. Full details are on our [Voter ID download service page](/india-services/identity-documents/download-voter-id-e-epic)." },
      { type: "h2", text: "What exactly is an e-EPIC?" },
      { type: "p", text: "e-EPIC stands for electronic Electoral Photo Identity Card — it's a secure, non-editable PDF of your Voter ID with a QR code that can be scanned to verify authenticity. The Election Commission treats it as equally valid to the physical card, including as ID at polling booths." },
      { type: "h2", text: "Step-by-step: download your e-EPIC" },
      { type: "ol", items: [
        "Open the official Voter Services Portal at voters.eci.gov.in, or use the Voter Helpline app.",
        "Sign in or register with your mobile number and verify the OTP sent to it.",
        "Go to 'e-EPIC Download' and enter your EPIC number.",
        "Verify with a second OTP sent to the mobile number linked to your voter record.",
        "Download the PDF — it's ready to print or keep on your phone.",
      ] },
      { type: "callout", text: "The download only works if your mobile number is already linked to your voter record. If it isn't, update it with Form 8 on the portal first — the e-EPIC download will unlock right after." },
      { type: "h2", text: "Don't know your EPIC number?" },
      { type: "p", text: "Use the 'Search in Electoral Roll' tool on the same portal — enter your name, age/date of birth and constituency, and it will look up your EPIC number for you before you go to the download step." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Trying to download with a mobile number that was never linked to the voter record — the OTP step will simply fail.",
        "Confusing e-EPIC download with new voter registration — download only works if you're already a registered voter; new registrations go through Form 6 instead.",
        "Printing at a very small size — keep it legible enough for the QR code to scan cleanly if it's checked.",
      ] },
    ],
    faq: [
      { question: "Is the e-EPIC accepted as valid ID everywhere the physical Voter ID is?", answer: "Yes, the Election Commission treats it as equally valid, including at polling booths." },
      { question: "Is downloading the e-EPIC free?", answer: "Yes, it's completely free through the official Voter Services Portal or Voter Helpline app." },
      { question: "What if I don't have a registered mobile number?", answer: "You'll need to update your mobile number using Form 8 on the portal first, since the download is OTP-verified against the number linked to your record." },
    ],
  },
  {
    slug: "what-is-encumbrance-certificate-how-to-get",
    title: "What Is an Encumbrance Certificate and How Do You Get One Online?",
    excerpt:
      "Why banks and buyers ask for an Encumbrance Certificate before a property deal, what 'nil encumbrance' means, and how to get one from your state's portal.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-08-01",
    tags: ["encumbrance certificate", "property", "india services", "government", "real estate"],
    relatedTools: ["pdf-compress", "pdf-merge", "emi-calculator"],
    seoTitle: "Encumbrance Certificate (EC): Meaning, Uses & Online Process (2026)",
    seoDescription:
      "What an encumbrance certificate proves, why home loans and property purchases require it, and the exact steps to get one from your state's registration portal.",
    content: [
      { type: "p", text: "If you're buying property or applying for a home loan, you'll hit this requirement almost immediately: an **Encumbrance Certificate**, or EC. It's one of those documents nobody explains well until you actually need it. Here's what it proves, why it matters, and how to get one online. See our [Encumbrance Certificate service page](/india-services/certificates/property-encumbrance-certificate) for official portal links by state." },
      { type: "h2", text: "What does an encumbrance certificate actually show?" },
      { type: "p", text: "An EC is a record of every registered transaction on a specific piece of property over a chosen time period — sales, mortgages, gifts, leases, anything filed at the Sub-Registrar office. If a property has an active home loan against it that hasn't been fully repaid and released, the EC will show that mortgage entry." },
      { type: "h2", text: "What does 'nil encumbrance' mean?" },
      { type: "p", text: "A 'nil encumbrance' result means no loan, mortgage or legal claim is registered against the property for the period you checked. It's the answer buyers and banks want to see — but it only confirms registered transactions, not unregistered disputes or claims that were never filed with the registrar." },
      { type: "h2", text: "Step-by-step: get your EC online" },
      { type: "ol", items: [
        "Open your state's registration department portal — for example Kaveri Online (Karnataka), TNREGINET (Tamil Nadu), or IGRS (Telangana/Maharashtra).",
        "Search using the property's survey number, document/registration number, or the owner's name.",
        "Select the period you need — commonly 13 years (standard bank requirement) or 30 years (full ownership history).",
        "Pay the small online search fee.",
        "Download the digitally signed EC as a PDF once it's generated.",
      ] },
      { type: "callout", text: "Banks typically ask for a 13-year EC for a home loan, but a buyer doing full due diligence before purchase often checks 30 years instead." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Entering the wrong survey or document number, which pulls up an EC for the wrong plot entirely.",
        "Checking too short a period when the bank or buyer specifically expects 13 or 30 years.",
        "Treating 'nil encumbrance' as proof of clear title — it only covers registered transactions, not every possible legal dispute.",
        "Applying in the wrong state's portal — records aren't shared across states, so you need the one where the property is actually registered.",
      ] },
    ],
    faq: [
      { question: "How many years of EC do I need for a home loan?", answer: "Most banks ask for 13 years, though some require longer. Buyers doing full due diligence before a purchase often go back 30 years." },
      { question: "Can I get an EC entirely online?", answer: "Yes, for most states with computerised registration records — Karnataka, Tamil Nadu, Telangana, Maharashtra and others let you search, pay and download the EC PDF online. Older manual records may still need an in-person request." },
      { question: "Does 'nil encumbrance' guarantee the property is legally clean?", answer: "No — it confirms no registered loan or claim exists for the period checked, but it doesn't cover unregistered disputes, so it's one part of due diligence, not the whole picture." },
    ],
  },
  {
    slug: "nps-national-pension-system-how-to-open-account",
    title: "NPS Explained: How to Open a National Pension System Account Online",
    excerpt:
      "How NPS works, the Tier I vs Tier II difference, the extra ₹50,000 tax deduction under 80CCD(1B), and how to open an account through eNPS.",
    category: "business",
    author: "editorial",
    template: "guide",
    publishedOn: "2026-08-01",
    tags: ["nps", "national pension system", "tax planning", "retirement", "india services"],
    relatedTools: ["emi-calculator", "percentage-calculator", "gst-calculator"],
    seoTitle: "NPS (National Pension System): How It Works & How to Open an Account",
    seoDescription:
      "A clear guide to India's National Pension System — Tier I vs Tier II, the extra tax deduction under 80CCD(1B), and step-by-step account opening on eNPS.",
    content: [
      { type: "p", text: "The **National Pension System (NPS)** is one of the few retirement products in India that combines market-linked growth with a genuine, extra tax deduction — but the Tier I/Tier II split and the withdrawal rules confuse a lot of first-time investors. Here's how it actually works. Full eligibility and document details are on our [NPS service page](/india-services/banking/nps-registration)." },
      { type: "h2", text: "What NPS actually is" },
      { type: "p", text: "NPS is a government-regulated, voluntary retirement savings scheme run under PFRDA (Pension Fund Regulatory and Development Authority). You contribute regularly, your money is invested across equity, corporate bonds and government securities based on your chosen allocation, and at retirement you withdraw part of it and use the rest to buy an annuity for a monthly pension." },
      { type: "h2", text: "Tier I vs Tier II — the difference that matters" },
      { type: "ul", items: [
        "**Tier I** — the main retirement account. Tax benefits apply here, but withdrawals are restricted until age 60, aside from specific partial-withdrawal rules (education, medical emergencies, home purchase, after a minimum tenure).",
        "**Tier II** — a voluntary, flexible savings account with no lock-in. You can withdraw anytime, but there's no separate tax deduction for Tier II contributions.",
      ] },
      { type: "h2", text: "The tax benefit most people miss" },
      { type: "p", text: "NPS contributions qualify under Section 80C (up to ₹1.5 lakh, shared with other 80C instruments like PPF or ELSS) — but the part worth paying attention to is Section 80CCD(1B), an **additional ₹50,000 deduction exclusively for NPS**, over and above the 80C limit. That's a real, extra tax-saving lever that PPF, ELSS or insurance premiums don't give you." },
      { type: "h2", text: "Step-by-step: open an NPS account online" },
      { type: "ol", items: [
        "Go to the official eNPS portal (enps.nsdl.com).",
        "Register using Aadhaar-based OTP e-KYC, or your PAN with bank account verification.",
        "Choose Tier I (mandatory to start) and optionally add Tier II.",
        "Select a Pension Fund Manager and your allocation — Active choice (you set the equity/debt split) or Auto choice (age-based, adjusted automatically).",
        "Make your first contribution online and receive your PRAN (Permanent Retirement Account Number).",
      ] },
      { type: "callout", text: "Minimum contribution is ₹500 per transaction in Tier I, with a ₹1,000 minimum total per year — miss the annual minimum and the account can freeze until you pay a small penalty." },
      { type: "h2", text: "What happens at retirement" },
      { type: "p", text: "At age 60, you can withdraw up to 60% of your NPS corpus as a tax-free lump sum. The remaining 40% must go toward buying an annuity, which then pays you a regular pension. This split is fixed by regulation, not optional." },
    ],
    faq: [
      { question: "How much extra tax can I save with NPS?", answer: "Beyond the shared ₹1.5 lakh 80C limit, NPS gives an additional ₹50,000 deduction under Section 80CCD(1B) — money you can't deduct through PPF, ELSS or most other 80C instruments." },
      { question: "Can I withdraw my entire NPS corpus at retirement?", answer: "No — you can withdraw up to 60% tax-free as a lump sum, but the remaining 40% must be used to buy an annuity for a regular pension." },
      { question: "What's the real difference between Tier I and Tier II?", answer: "Tier I is the tax-advantaged retirement account with withdrawal restrictions until 60. Tier II is a flexible, no-lock-in savings account with no separate tax deduction." },
    ],
  },
  {
    slug: "how-to-register-trademark-india",
    title: "How to Register a Trademark in India: Process, Classes & Fees",
    excerpt:
      "A practical walkthrough of trademark registration — the class system, filing on the IP India portal, the opposition period, and what it actually costs.",
    category: "business",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-08-01",
    tags: ["trademark", "small business", "ip india", "india services", "branding"],
    relatedTools: ["invoice-maker", "quotation-generator", "gst-calculator"],
    seoTitle: "Trademark Registration in India: Complete Process & Fees (2026)",
    seoDescription:
      "Step-by-step guide to registering a trademark in India — the NICE class system, IP India e-filing, opposition period, and current government fees.",
    content: [
      { type: "p", text: "If you've built a brand name, logo or slogan worth protecting, registering it as a **trademark** stops anyone else from legally using something confusingly similar — and gives you the right to actually enforce that. The process is more procedural than complicated once you know the steps. Full eligibility and document details are on our [Trademark Registration service page](/india-services/business-tax/trademark-registration)." },
      { type: "h2", text: "™ vs ® — when can you use each?" },
      { type: "p", text: "You can start using ™ the moment you file your application — it signals a claimed trademark, registered or not. The ® symbol is reserved for marks that are actually registered by the Trade Marks Registry; using it before registration is completed is a mistake worth avoiding." },
      { type: "h2", text: "Step 1: search before you file" },
      { type: "p", text: "Search the IP India trademark database first. Filing for a mark that's identical or confusingly similar to an existing one in the same class almost always leads to an objection or opposition later — a five-minute search up front saves months of back-and-forth." },
      { type: "h2", text: "Step 2: pick the right class" },
      { type: "p", text: "Trademarks are registered under one of 45 NICE classification classes, grouped by type of goods or service — for example Class 25 covers clothing, Class 35 covers advertising/business services, Class 42 covers software/technology services. Registering in the wrong class protects the wrong thing, so match it carefully to what you actually sell." },
      { type: "h2", text: "Step-by-step: filing process" },
      { type: "ol", items: [
        "Search the IP India trademark database to confirm your mark is available.",
        "File Form TM-A online with your mark, applicant details and the correct class(es).",
        "The Registry examines the application — respond to any objection within the given deadline.",
        "If cleared, your mark is published in the Trade Marks Journal for a 4-month public opposition period.",
        "If unopposed (or any opposition is resolved in your favour), the trademark is registered and a certificate is issued.",
      ] },
      { type: "callout", text: "The full process typically takes 12–24 months if nobody opposes it — but you can start using the ™ symbol from the day you file, without waiting for registration to complete." },
      { type: "h2", text: "What it costs" },
      { type: "p", text: "Filed online, the government fee is ₹4,500 per class for individuals, startups and MSMEs with a valid Udyam registration certificate, and ₹9,000 per class for other companies. Fees are charged per class, so registering in multiple classes multiplies the cost." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Skipping the prior-search step and filing a mark too close to an existing one.",
        "Choosing the wrong NICE class for the actual goods or services being sold.",
        "Missing the response deadline for an examination objection, which can get the application abandoned.",
        "Forgetting to renew — registration lasts 10 years and needs active renewal, not automatic continuation.",
      ] },
    ],
    faq: [
      { question: "How much does trademark registration cost in India?", answer: "₹4,500 per class for individuals, startups and MSMEs with a valid Udyam certificate, and ₹9,000 per class for other applicants, filed online through IP India." },
      { question: "How long does trademark registration take?", answer: "Typically 12–24 months end-to-end if unopposed. You can use the ™ symbol immediately after filing, well before registration completes." },
      { question: "Do I need a trademark agent to file?", answer: "No, you can file directly on the IP India portal yourself. Many businesses use an agent anyway to handle the class selection, search and any objection responses." },
    ],
  },
  {
    slug: "json-formatter-validate-and-beautify-json-online",
    title: "How to Validate and Beautify JSON Online (and Actually Fix It)",
    excerpt:
      "Why JSON.parse errors are so unhelpful, how a proper JSON formatter pinpoints the exact broken character, and a practical workflow for cleaning up messy API responses.",
    category: "developer",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-08-01",
    tags: ["json", "developer tools", "api", "debugging"],
    relatedTools: ["json-formatter", "csv-json-converter", "base64-encoder"],
    seoTitle: "JSON Formatter & Validator: Fix and Beautify JSON Online (Free)",
    seoDescription:
      "How to validate, beautify and debug broken JSON — trailing commas, unescaped quotes, missing brackets — with a free browser-based JSON formatter.",
    content: [
      { type: "p", text: "\"Unexpected token in JSON at position 847\" is one of the least useful error messages in programming — it tells you almost nothing about what's actually wrong or where to look. A proper **JSON Formatter** turns that into something you can actually act on: pretty-printed structure, syntax highlighting, and a clear pointer to the broken character." },
      { type: "h2", text: "Why JSON breaks so often" },
      { type: "p", text: "JSON looks like JavaScript object syntax, which is exactly why it's easy to get wrong — JavaScript allows things JSON doesn't. The most common breakages:" },
      { type: "ul", items: [
        "A trailing comma after the last item in an array or object (valid in JS, invalid in strict JSON)",
        "Single quotes instead of double quotes around keys or string values",
        "An unescaped double quote inside a string value",
        "A missing closing bracket or brace, often several levels deep in nested data",
        "`undefined` or a JavaScript comment left in by mistake — neither is valid JSON",
      ] },
      { type: "h2", text: "Step-by-step: validate and fix broken JSON" },
      { type: "ol", items: [
        "Paste the raw JSON — from an API response, a config file, or a log — into the JSON Formatter.",
        "Run validation; if it's invalid, the tool highlights the exact line and character where parsing failed.",
        "Fix the flagged issue (usually a stray comma, quote, or bracket) and re-validate.",
        "Once valid, use the beautify option to pretty-print it with consistent indentation for readability.",
        "Copy the cleaned-up JSON back into your code, Postman collection, or config file.",
      ] },
      { type: "callout", text: "When debugging a large nested payload, fix errors from the top down — the first reported error is often the real one, and later errors can just be knock-on effects of the first broken bracket." },
      { type: "h2", text: "Beautify vs minify — when to use each" },
      { type: "p", text: "Beautified (pretty-printed) JSON is for reading and debugging — indented, one key per line. Minified JSON strips all unnecessary whitespace, which matters for production API payloads where every byte over the wire adds up. Keep source config files beautified for your team to read, and let your build or server minify what actually ships." },
    ],
    faq: [
      { question: "Why does my JSON look fine but still fail to parse?", answer: "The most common invisible cause is a trailing comma after the last array/object item, or a smart/curly quote character that looks identical to a straight quote but isn't valid JSON." },
      { question: "Is it safe to paste API keys or tokens into an online JSON formatter?", answer: "Only if the tool processes everything client-side in your browser without uploading data to a server — check that before pasting anything sensitive into any online tool." },
      { question: "Can a JSON formatter convert JSON to CSV or the other way round?", answer: "A formatter itself just validates and pretty-prints JSON — for converting between JSON and CSV, use a dedicated CSV ⇄ JSON converter." },
    ],
  },
  {
    slug: "svg-vs-png-which-should-you-use",
    title: "SVG vs PNG: Which Image Format Should You Actually Use?",
    excerpt:
      "Vector vs raster, explained with real examples — logos, icons and illustrations vs photos and screenshots — plus when to optimise an SVG before shipping it.",
    category: "design",
    author: "editorial",
    template: "comparison",
    publishedOn: "2026-08-01",
    tags: ["svg", "png", "image formats", "web design", "icons"],
    relatedTools: ["svg-optimizer", "image-converter", "svg-blob-generator"],
    seoTitle: "SVG vs PNG: Which Format to Use for Logos, Icons & Photos",
    seoDescription:
      "The real difference between SVG and PNG — when a vector format wins, when raster wins, and how to optimise an SVG before publishing it.",
    content: [
      { type: "p", text: "This isn't actually a close call once you know the underlying difference: **SVG is vector, PNG is raster** — and that single fact decides almost every case. Here's how to pick correctly instead of guessing." },
      { type: "h2", text: "The core difference" },
      { type: "p", text: "A PNG is a fixed grid of pixels — zoom in far enough and you'll see blocky edges, because there's no more detail to reveal. An SVG is a set of mathematical instructions (paths, shapes, curves) that gets redrawn at any size, so it stays perfectly crisp whether it's 16px or 1600px wide." },
      { type: "h2", text: "When SVG wins" },
      { type: "ul", items: [
        "Logos — need to look identical from a favicon to a billboard",
        "Icons — sharp at any size, and easy to recolour with CSS",
        "Simple illustrations and diagrams made of flat shapes and lines",
        "Anything that needs to scale across many screen sizes without shipping multiple image files",
      ] },
      { type: "h2", text: "When PNG (or JPEG/WebP) wins" },
      { type: "ul", items: [
        "Photographs — real-world images with continuous tone and colour gradients that vector shapes can't represent",
        "Screenshots — pixel-accurate captures of an actual screen",
        "Complex textures, gradients or photo-realistic renders",
        "Any image where file size for a *fixed* display size matters more than infinite scalability",
      ] },
      { type: "h2", text: "Why raw SVGs from design tools are often bloated" },
      { type: "p", text: "SVGs exported straight from Figma, Illustrator or Sketch usually carry a lot of dead weight — editor metadata, unused `<defs>`, redundant groups, needlessly long decimal precision on every path point. None of it affects how the image looks, but all of it adds to page weight. Running the export through an **SVG Optimizer** strips this out and can shrink the file significantly with zero visual difference." },
      { type: "callout", text: "Always inspect an optimised SVG at 100% zoom before shipping it — aggressive precision-rounding can occasionally introduce a visible seam in complex paths." },
      { type: "h2", text: "A simple decision rule" },
      { type: "p", text: "Ask one question: does this image need to scale to different sizes, or does it need to represent real-world detail? Scaling need → SVG. Real-world detail → PNG/JPEG/WebP. Almost every edge case resolves cleanly once you frame it that way." },
    ],
    faq: [
      { question: "Can I convert a PNG to SVG?", answer: "Not meaningfully for photos — a photo has continuous detail that vector paths can't reconstruct. Simple flat-colour logos can sometimes be traced into SVG, but the result needs manual cleanup, it isn't a clean automatic conversion." },
      { question: "Are SVGs always smaller than PNGs?", answer: "Not necessarily — a simple icon as SVG is almost always smaller, but a complex illustration with thousands of path points can end up larger than an equivalent optimised PNG. Check the actual file size for your specific image." },
      { question: "Is it safe to use SVGs uploaded by users on a website?", answer: "Be careful — SVG files can contain embedded scripts, so user-uploaded SVGs should be sanitised or rendered as flattened images on any site that accepts them from the public." },
    ],
  },
  {
    slug: "best-free-ai-tools-for-small-business-india",
    title: "Best Free AI Tools for Small Businesses in India (2026)",
    excerpt:
      "Practical AI tools for the jobs small businesses actually need — writing, customer support, invoicing help and marketing — with honest notes on free vs paid tiers.",
    category: "business",
    author: "techtoolscenter-team",
    template: "listicle",
    publishedOn: "2026-08-01",
    tags: ["ai tools", "small business", "productivity", "india"],
    relatedTools: ["invoice-maker", "gst-calculator", "quotation-generator"],
    seoTitle: "Best Free AI Tools for Small Businesses in India (2026 Guide)",
    seoDescription:
      "AI tools that solve real small-business problems — writing, support, marketing — with a clear look at what's actually free versus paid.",
    content: [
      { type: "p", text: "Most \"AI tools for business\" lists just name-drop ChatGPT and stop there. Running a small business in India involves more specific jobs — replying to customers fast, writing product descriptions, drafting marketing copy, keeping invoices and quotations professional. Here's where AI genuinely helps with each, and where a plain tool still does the job better and faster." },
      { type: "h2", text: "Customer support and WhatsApp replies" },
      { type: "p", text: "AI chat assistants are genuinely useful for drafting quick, polite responses to common customer questions — order status, return policy, pricing — especially when you're replying to the same five questions all day. Browse current options with real pricing on [AI Hub's Customer Support category](/ai-hub/customer-support) before picking one; free tiers usually cap monthly messages, so check the limit against your actual volume." },
      { type: "h2", text: "Writing product descriptions and marketing copy" },
      { type: "p", text: "For product listings, social captions and ad copy, an AI writing tool gets you a solid first draft fast — you still need to edit it so it doesn't read like every other AI-generated listing. See [AI Hub's Writing category](/ai-hub/writing) and [Marketing category](/ai-hub/marketing) for current tools and their free-tier limits." },
      { type: "h2", text: "Where AI isn't the right tool" },
      { type: "p", text: "Not everything needs an AI layer. Generating a GST-compliant invoice, calculating tax splits, or creating a professional quotation is a structured, rule-based task — a purpose-built **Invoice Maker**, **GST Calculator** or **Quotation Generator** does it faster and more reliably than prompting a chatbot and hoping the numbers come out right." },
      { type: "h2", text: "A simple way to decide" },
      { type: "ol", items: [
        "If the task is open-ended and language-heavy (a reply, a description, a caption) — an AI tool genuinely saves time.",
        "If the task has a fixed, correct answer (tax calculation, invoice totals, unit conversion) — use a dedicated calculator or generator instead.",
        "Always check the free-tier limits before committing — many 'free' AI tools cap monthly usage tightly once you're using them daily.",
      ] },
      { type: "callout", text: "We list real pricing (free vs paid) and official links for every category on AI Hub — never fabricated ratings, so you can compare tools before signing up anywhere." },
    ],
    faq: [
      { question: "Are these AI tools actually free, or is it a trial?", answer: "It depends entirely on the specific tool — some have a genuinely free tier with usage limits, others only offer a time-limited trial. Always check the current pricing on the tool's own page before relying on it, since free tiers change often." },
      { question: "Should a small business use AI for invoicing?", answer: "Not really — invoicing needs exact, correct totals and tax splits every time. A dedicated Invoice Maker or GST Calculator is faster and more reliable than an AI chatbot for this specific job." },
      { question: "What's the best free AI tool for customer replies?", answer: "This changes often as free tiers shift — check AI Hub's Customer Support category for current options and their actual free-tier limits rather than relying on a fixed 'best' pick." },
    ],
  },
  {
    slug: "jwt-decoder-explained-how-to-inspect-json-web-tokens",
    title: "JWT Decoder Explained: How to Safely Inspect a JSON Web Token",
    excerpt:
      "What's actually inside a JWT, why you can read the payload without a secret key, and why decoding a token is not the same as verifying it.",
    category: "developer",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-08-01",
    tags: ["jwt", "developer tools", "authentication", "security"],
    relatedTools: ["jwt-decoder", "hash-generator", "base64-encoder"],
    seoTitle: "JWT Decoder: How to Read a JSON Web Token's Payload (Free Tool)",
    seoDescription:
      "How JWTs are structured, how to decode the header and payload without any secret key, and why decoding is not the same as verifying a token.",
    content: [
      { type: "p", text: "If you've ever pasted an access token into a debugger just to see what's actually inside it, you've already used the core idea behind a **JWT Decoder**. Here's what's really going on when you decode one, and an important distinction that trips people up: decoding isn't the same as verifying." },
      { type: "h2", text: "What a JWT actually looks like" },
      { type: "p", text: "A JSON Web Token is three Base64URL-encoded parts joined by dots: `header.payload.signature`. The header names the algorithm and token type, the payload holds the actual claims (user ID, expiry, roles, whatever the issuer put in), and the signature proves the token wasn't tampered with — assuming you have the secret or public key to check it." },
      { type: "h2", text: "Why you can read a JWT without any secret key" },
      { type: "p", text: "The header and payload are only **encoded**, not encrypted. Base64URL is a reversible encoding, not a cipher — anyone can decode those two parts and read the claims in plain text, no key required. That's a deliberate design choice, not a security hole: JWTs are meant to be inspectable. The signature is what actually protects the token from being modified, and checking that signature is a separate step from decoding." },
      { type: "h2", text: "Step-by-step: decode a token" },
      { type: "ol", items: [
        "Copy the full JWT string (all three dot-separated parts).",
        "Paste it into a JWT Decoder.",
        "The tool splits it on the dots and Base64URL-decodes the header and payload back into readable JSON.",
        "Check the claims you actually care about — `exp` (expiry), `iat` (issued at), `sub` (subject/user ID), or any custom claims your app added.",
      ] },
      { type: "callout", text: "Decoding shows you what a token *claims* — it does not confirm the token is genuine. Verifying a signature requires the issuer's secret (HMAC) or public key (RSA/ECDSA), which a plain decoder correctly won't ask you for." },
      { type: "h2", text: "Practical uses for developers" },
      { type: "ul", items: [
        "Debugging why a user got logged out early — check the `exp` claim against the current time.",
        "Confirming an API actually issued the roles/permissions your app expects to see in the payload.",
        "Sanity-checking a token during integration work, without needing backend logs.",
      ] },
      { type: "h2", text: "A security note" },
      { type: "p", text: "Never paste a *live, sensitive* production token — especially one tied to a real user session — into any third-party tool you don't fully trust, even a client-side one. For debugging, use a test/staging token wherever possible, since anyone who gets hold of a valid JWT before it expires can potentially use it as-is." },
    ],
    faq: [
      { question: "Can I decode a JWT without knowing the secret key?", answer: "Yes — the header and payload are Base64URL-encoded, not encrypted, so anyone can decode and read them. Only verifying the signature requires the secret or public key." },
      { question: "Is decoding a JWT the same as verifying it's valid?", answer: "No. Decoding just reveals the claims inside the token. Verifying confirms the signature matches, using the issuer's secret or public key — a decoder alone can't do that." },
      { question: "Is it safe to paste a JWT into an online decoder?", answer: "Only paste test or non-sensitive tokens into any third-party tool, and confirm the tool decodes entirely in your browser rather than sending the token to a server, especially for anything resembling a real production session token." },
    ],
  },
  {
    slug: "meta-titles-descriptions-improve-click-through-rate",
    title: "How to Write Meta Titles and Descriptions That Improve Click-Through Rate",
    excerpt:
      "Meta tags don't affect rankings directly, but they decide whether people click your result at all. Here's how to write ones that actually earn the click.",
    category: "seo",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-08-01",
    tags: ["seo", "meta tags", "click-through rate", "on-page seo"],
    relatedTools: ["meta-tags-generator", "word-counter"],
    seoTitle: "Meta Titles & Descriptions: How to Improve Click-Through Rate",
    seoDescription:
      "A practical guide to writing meta titles and descriptions that get clicked — length limits, what Google actually rewrites, and real examples.",
    content: [
      { type: "p", text: "Your meta title and description don't directly move your ranking position — but they're the ad copy for a result Google already decided to show, and a weak pair loses clicks to a competitor sitting right below you at a worse rank. Getting them right is one of the highest-leverage, lowest-effort SEO tasks there is." },
      { type: "h2", text: "What actually goes into a meta title" },
      { type: "p", text: "Keep it under roughly 60 characters (Google truncates around 580px of rendered width, which varies by character). Lead with the specific thing someone searched for — not your brand name first, unless you're a well-known brand people search by name. \"Free EMI Calculator — Monthly Payment & Interest Breakdown\" beats \"TechToolsCenter | EMI Calculator\" for almost every query that isn't branded." },
      { type: "h2", text: "What actually goes into a meta description" },
      { type: "p", text: "Aim for 150–160 characters. A good description answers the searcher's real question in one line, then gives a reason to click over a competing result — free, no sign-up, instant, private, whatever is genuinely true and differentiating. Google frequently rewrites descriptions it decides don't match the query well, so match the description to what the page actually delivers, not to a general pitch for your brand." },
      { type: "h2", text: "Step-by-step: writing a page's meta tags" },
      { type: "ol", items: [
        "Write the title around the exact phrase people would type to find this page, kept under ~60 characters.",
        "Draft the description to answer the query directly in the first half, since it's often what gets shown even when the rest is truncated.",
        "Add one concrete differentiator — free, instant, no watermark, private — only if it's actually true for this specific page.",
        "Check both in a SERP preview tool or the browser tab / social-share preview before publishing.",
        "Avoid repeating the exact same title/description template across many pages — it reads as thin content to both users and Google.",
      ] },
      { type: "callout", text: "Google rewrites titles it judges to be a poor match for the query roughly a third of the time in various studies — an accurate, specific title makes a rewrite less likely, but you can't fully prevent it." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Stuffing keywords unnaturally into the title instead of writing a phrase a human would actually read.",
        "Writing the exact same description for every product/category page, varying only one word — Google often treats this as near-duplicate content.",
        "Front-loading the brand name on pages that aren't ranking for branded search, wasting the first ~20 characters that get the most attention.",
        "Forgetting mobile truncates titles/descriptions shorter than desktop — check both, not just desktop preview.",
      ] },
      { type: "h2", text: "Titles vs descriptions: different jobs" },
      { type: "p", text: "The title is what decides whether your result registers at all when someone is scanning ten blue links quickly. The description is what convinces them to click *your* result specifically once they've noticed it. Write the title for scanability, and the description for persuasion — conflating the two usually makes both weaker." },
    ],
    faq: [
      { question: "Do meta descriptions affect Google rankings directly?", answer: "No — Google has confirmed meta descriptions aren't a ranking factor. They affect click-through rate, which indirectly matters, but they don't move your position in search results." },
      { question: "Why does Google show a different description than the one I wrote?", answer: "Google dynamically rewrites titles and descriptions when it judges the query and the static tag don't match well — write yours as specifically and accurately as possible to reduce how often this happens." },
      { question: "What's the ideal meta title length?", answer: "Roughly 50-60 characters is a safe target — Google truncates by pixel width (about 580px), not a fixed character count, so shorter words fit more characters." },
    ],
  },
  {
    slug: "passport-size-photo-online-free-india",
    title: "How to Take a Passport-Size Photo Online for Free (India Specs)",
    excerpt:
      "The exact size, background and rules Indian passport and PAN photos need — and how to crop your own photo to spec in your browser, no studio visit required.",
    category: "guides",
    author: "editorial",
    template: "tutorial",
    publishedOn: "2026-08-02",
    tags: ["passport photo", "photo id", "india"],
    relatedTools: ["passport-photo-maker", "image-resizer"],
    content: [
      { type: "p", text: "A rejected passport application because of a photo that's the wrong size or has the wrong background is one of the most avoidable delays in the whole process. The good news: you don't need a photo studio to get it right — a phone photo and the correct crop are enough." },
      { type: "h2", text: "The exact specs for an Indian passport photo" },
      { type: "ul", items: [
        "Size: 2×2 inches (51×51 mm), same as the US visa/passport standard.",
        "Background: plain white or light-coloured, no patterns or shadows.",
        "Face coverage: your face and shoulders should fill about 70-80% of the frame.",
        "Expression: neutral, both eyes open, mouth closed, no smiling with teeth.",
        "No glasses glare, no head covering unless worn daily for religious reasons.",
        "Taken within the last 6 months — an old photo can get your form rejected.",
      ] },
      { type: "h2", text: "What about PAN card photos?" },
      { type: "p", text: "PAN card photos use a different size — 25×35 mm, closer to a typical passport-style ID photo than a square. The background and expression rules are the same as above: plain background, neutral expression, no shadows across the face." },
      { type: "h2", text: "Step-by-step: crop your own photo online" },
      { type: "ol", items: [
        "Take a photo facing a plain wall in good, even daylight — avoid backlighting from a window behind you.",
        "Open the Passport Photo Maker and upload the image.",
        "Pick your country/document preset — India Passport/Visa (2×2 in), India PAN Card, US Passport/Visa, Schengen/EU Visa, or UK Passport are all built in with the correct millimetre dimensions.",
        "Drag to position your face inside the guide overlay so it fills the frame correctly.",
        "Download the cropped photo, or the print sheet if your local photo shop needs a 4×6 print with multiple copies.",
      ] },
      { type: "callout", text: "Re-shoot against a plain wall if your background isn't clean — most passport offices are strict about this specific detail, and a cluttered or shadowed background is one of the most common rejection reasons." },
      { type: "h2", text: "Common mistakes that cause rejections" },
      { type: "ul", items: [
        "Wearing glasses that catch a glare or tint the eyes.",
        "A shadow cast on the wall behind you, visible in the frame.",
        "Cropping too tight so the top of the head or chin gets cut off.",
        "Using a photo where you're not facing the camera directly.",
      ] },
      { type: "p", text: "Once your photo matches the spec, attach it to your application exactly as instructed by the passport portal or PAN service — file formats and maximum file sizes vary slightly by service, so check the upload requirements on the official portal before submitting." },
    ],
    faq: [
      { question: "Can I use a phone photo for my passport application?", answer: "Yes, as long as it's cropped to the correct size (2×2 in for Indian passports), has a plain light background, and was taken within the last 6 months in good lighting." },
      { question: "What size is a passport photo in India?", answer: "2×2 inches (51×51 mm) for passports and most visas — the same size the US uses. PAN card photos use a smaller 25×35 mm size." },
      { question: "Can I wear glasses in my passport photo?", answer: "Generally discouraged — glare or tinted lenses are a common rejection reason. If you must wear them, make sure there's no reflection and your eyes are clearly visible." },
    ],
  },
  {
    slug: "how-to-create-strong-password-you-can-remember",
    title: "How to Create a Strong Password You'll Actually Remember",
    excerpt:
      "Why \"P@ssw0rd123\" is weaker than you think, what actually makes a password hard to crack, and a practical system for generating and remembering unique ones.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-08-02",
    tags: ["password", "security", "privacy"],
    relatedTools: ["password-generator", "hash-generator"],
    content: [
      { type: "p", text: "Most password advice focuses on complexity rules — one uppercase, one number, one symbol — but those rules don't actually predict how hard a password is to crack. Length and randomness do far more work than a swapped '3' for an 'e'." },
      { type: "h2", text: "Why length beats complexity" },
      { type: "p", text: "A password's strength against brute-force guessing comes down to how many possible combinations an attacker has to try. Adding characters multiplies that number far faster than adding character *types*. A random 16-character password with only lowercase letters is harder to crack than an 8-character password crammed with symbols — because length grows the search space exponentially, while extra character types only grow it linearly." },
      { type: "h2", text: "What actually makes a password weak" },
      { type: "ul", items: [
        "Reusing the same password across multiple sites — one leaked site compromises all of them.",
        "Predictable substitutions like 'P@ssw0rd' — password-cracking tools already account for these.",
        "Anything based on public information: your name, birth year, pet's name, city.",
        "Short passwords, even with symbols — under 10 characters is crackable quickly with modern hardware.",
      ] },
      { type: "h2", text: "A practical system: generate, don't memorize everything" },
      { type: "ol", items: [
        "Use a random password generator to create a long (16+ character), unique password for every important account — banking, email, and anything tied to password resets for other accounts.",
        "Store them in a password manager rather than memorizing each one — this is the single biggest security upgrade most people can make.",
        "For the handful of passwords you truly must remember (your device lock, your password manager's master password), use a passphrase — four or five random unrelated words are longer and easier to recall than a short scrambled string, and just as strong.",
        "Turn on two-factor authentication wherever it's offered — it protects you even if a password does leak.",
      ] },
      { type: "callout", text: "A password manager plus 2FA protects you far more than any amount of manual password cleverness — most real-world account breaches come from reused or leaked passwords, not brute-force guessing." },
      { type: "h2", text: "Checking and hashing passwords" },
      { type: "p", text: "If you're a developer storing user passwords, never store them in plain text — always hash them with a purpose-built algorithm (bcrypt, Argon2, or scrypt), not a general-purpose hash like plain SHA-256. A general hash generator is useful for checksums and data integrity checks, not for password storage, since it's designed to be fast — the opposite of what you want when hashing passwords." },
    ],
    faq: [
      { question: "Is a longer password always stronger than a more complex one?", answer: "Generally yes. Length increases the number of possible combinations exponentially, while adding character types (symbols, numbers) increases it only linearly. A long, random passphrase usually beats a short, complex password." },
      { question: "Should I use the same strong password everywhere?", answer: "No — reusing any password, no matter how strong, means one leaked site compromises every account using it. Use a unique password per site, ideally stored in a password manager." },
      { question: "Is SHA-256 good enough for storing passwords?", answer: "No. General-purpose hashes like SHA-256 are designed to be fast, which makes them easier to brute-force. Password storage needs a slow, purpose-built algorithm like bcrypt or Argon2." },
    ],
  },
  {
    slug: "social-media-character-limits-2026",
    title: "Word and Character Limits for Every Social Media Platform (2026)",
    excerpt:
      "The exact caption, bio and post limits for Instagram, X, Facebook, LinkedIn, TikTok and Threads — and how much actually gets seen before \"...more\" cuts it off.",
    category: "productivity",
    author: "editorial",
    template: "listicle",
    publishedOn: "2026-08-02",
    tags: ["social media", "content", "marketing"],
    relatedTools: ["word-counter", "hashtag-generator", "social-media-kit"],
    content: [
      { type: "p", text: "Every platform enforces a hard character limit, but the number that actually matters for engagement is usually much smaller — the point where the app truncates your text behind a \"...more\" link. Write past that point and most readers never see the rest." },
      { type: "h2", text: "Caption and post limits by platform" },
      { type: "ul", items: [
        "**Instagram**: 2,200 character hard limit on captions, but only the first ~125 characters show before \"more\" — put your hook there.",
        "**X (Twitter)**: 280 characters for a standard post; longer posts are available to subscribers but still perform best kept short.",
        "**Facebook**: no hard limit on post length, but posts under ~80 characters get noticeably higher engagement than long-form ones.",
        "**LinkedIn**: 3,000 character limit, truncated after roughly the first 210 characters (about 3 lines) before \"see more\".",
        "**TikTok**: 2,200 characters for captions, though most viewers only see the first line or two on the feed.",
        "**Threads**: 500 character limit per post — Threads is intentionally shorter-form than Instagram captions.",
      ] },
      { type: "h2", text: "Bio and name-field limits" },
      { type: "ul", items: [
        "Instagram bio: 150 characters.",
        "X bio: 160 characters.",
        "LinkedIn headline: 220 characters; About section: 2,600 characters.",
        "TikTok bio: 80 characters.",
        "Facebook Page 'About' short description: 255 characters.",
      ] },
      { type: "h2", text: "Why the truncation point matters more than the hard limit" },
      { type: "p", text: "A caption that's technically allowed doesn't mean it gets read. Instagram, LinkedIn and TikTok all fold long text behind a \"more\" tap, and most scrolling users won't tap it. Treat the truncation point — not the platform's maximum — as your real word budget for anything that needs to land without extra effort from the reader." },
      { type: "h2", text: "A quick workflow for staying in range" },
      { type: "ol", items: [
        "Draft your caption, then check its character count with a word/character counter as you write.",
        "Move your key message or call-to-action before the platform's truncation point, not after it.",
        "Add hashtags after the visible cutoff where possible — they don't need to be seen to be indexed.",
        "Keep a resized version of your graphic ready for each platform's dimensions alongside the caption, so the whole post is platform-correct in one pass.",
      ] },
      { type: "callout", text: "Hashtag count matters too: Instagram allows up to 30 per post, but most best-performing accounts use far fewer — quality and relevance over volume." },
    ],
    faq: [
      { question: "What is Instagram's actual caption limit?", answer: "2,200 characters maximum, but only about the first 125 characters show before the caption is truncated behind \"...more\" — write your key point within that range." },
      { question: "How long can an X (Twitter) post be?", answer: "280 characters for most accounts. Some subscription tiers unlock longer posts, but shorter posts still tend to perform better." },
      { question: "Does hashtag count affect reach on Instagram?", answer: "Instagram allows up to 30 hashtags per post, but using a smaller number of genuinely relevant hashtags generally outperforms maxing out the count." },
    ],
  },
  {
    slug: "ayushman-bharat-card-apply-download-correction",
    title: "Ayushman Bharat Card: How to Apply, Download, and Correct It",
    excerpt:
      "Who's actually eligible for PM-JAY, how to check your status and download the e-card for free, and what to do if your name or details on the card are wrong.",
    category: "guides",
    author: "editorial",
    template: "guide",
    publishedOn: "2026-08-02",
    tags: ["ayushman bharat", "pmjay", "health card", "india"],
    relatedTools: ["pdf-compress", "image-compressor"],
    content: [
      { type: "p", text: "Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana) gives eligible families cashless health cover of up to ₹5 lakh per year at government and empanelled private hospitals. A lot of confusion around it comes from one thing: it isn't open enrolment. You can't simply \"apply\" and get a card — eligibility is checked against an official database, and the process for getting your card depends on whether you're already in it." },
      { type: "h2", text: "Who is actually eligible?" },
      { type: "ul", items: [
        "Rural and urban families identified as eligible under the SECC 2011 socio-economic survey.",
        "Households already covered under RSBY (Rashtriya Swasthya Bima Yojana) in states where that scheme merged into PM-JAY.",
        "Since 2024: every senior citizen aged 70 and above qualifies regardless of income, under a separate Ayushman Vay Vandana Card.",
        "Some states have expanded their own version of the scheme with wider eligibility — check your state's health department page if you're unsure.",
      ] },
      { type: "h2", text: "How to check eligibility and download your card" },
      { type: "ol", items: [
        "Go to the official beneficiary portal, mera.pmjay.gov.in, or the PM-JAY mobile app.",
        "Use \"Am I Eligible\" and enter your mobile number, state, and either your ration card, RSBY URN, or Aadhaar.",
        "If you're found eligible, complete e-KYC — Aadhaar OTP works from home; fingerprint verification needs a visit to a CSC (Common Service Centre).",
        "Download your e-card straight from the portal once verified, or collect a printed card at a CSC or an empanelled hospital's Ayushman Mitra desk.",
      ] },
      { type: "callout", text: "Checking eligibility and downloading the e-card is completely free. Never pay anyone who claims they can \"guarantee\" or fast-track a card outside the official portal or a CSC." },
      { type: "h2", text: "Using the card at a hospital" },
      { type: "p", text: "At any empanelled hospital, show your Ayushman card along with Aadhaar. The hospital's Ayushman Mitra desk verifies your eligibility and processes cashless admission directly — there's no separate premium, claim form, or reimbursement process for the patient to handle." },
      { type: "h2", text: "My card has wrong details — what now?" },
      { type: "p", text: "If your name, date of birth, gender, or a family member's details on the card don't match your Aadhaar, you don't need to reapply from scratch. Log in to mera.pmjay.gov.in with your registered mobile and OTP (or visit a CSC), open your beneficiary profile, and use the correction option — the corrected value should match your Aadhaar exactly, since Aadhaar is used as the reference document for verification." },
      { type: "ul", items: [
        "Lost your card? Just log back in and download the e-card again — it's free, no fresh documents needed.",
        "Adding a new family member is handled through the same portal or CSC, cross-checked against your ration card or family ID.",
        "Keep the acknowledgement/reference number from any correction request in case you need to check its status later.",
      ] },
    ],
    faq: [
      { question: "Can anyone apply for an Ayushman Bharat card?", answer: "No — eligibility is based on the SECC 2011 database, prior RSBY coverage, or (since 2024) being 70+ years old. It's not open enrolment; check eligibility first via mera.pmjay.gov.in." },
      { question: "Is there a fee to get the Ayushman card?", answer: "Checking eligibility and downloading the digital e-card is free. A CSC may charge a small, government-notified fee only for printing a physical copy." },
      { question: "How do I fix a spelling mistake on my Ayushman card?", answer: "Log in to mera.pmjay.gov.in or visit a CSC, open your beneficiary profile, and submit a correction using your Aadhaar as the reference — no need to reapply for the scheme." },
      { question: "I'm 70+ but wasn't in the SECC database before — am I still eligible?", answer: "Yes. Since 2024, all citizens aged 70 and above qualify for the Ayushman Vay Vandana Card regardless of income or the SECC database." },
    ],
  },
  {
    slug: "how-to-download-youtube-thumbnail-hd",
    title: "How to Download YouTube Thumbnails in HD (Free, No Sign-Up)",
    excerpt:
      "YouTube quietly generates five thumbnail sizes for every video, up to full 1280×720 HD. Here's how to grab any of them in seconds, and what they're actually useful for.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-08-02",
    tags: ["youtube", "thumbnail", "video marketing", "content creation"],
    relatedTools: ["youtube-thumbnail-downloader", "image-resizer", "image-compressor"],
    seoTitle: "Download YouTube Thumbnail in HD — Free, No Sign-Up",
    seoDescription:
      "Grab any YouTube video's thumbnail in every available resolution, up to 1280×720 HD. Paste a link, pick a size, download — free and private.",
    content: [
      { type: "p", text: "Every YouTube video actually has up to five thumbnail images sitting on YouTube's servers, not just the one shown on the video page. YouTube generates them automatically the moment a video is uploaded, in five fixed sizes, and each one is a plain public image file — no login or API key needed to view or save it." },
      { type: "h2", text: "The five sizes YouTube generates" },
      { type: "ul", items: [
        "**maxresdefault** — 1280×720, the full HD version. Only exists for videos uploaded in HD; older or low-res uploads may not have this one.",
        "**sddefault** — 640×480, a solid mid-size fallback.",
        "**hqdefault** — 480×360, the most reliably-available \"high quality\" size.",
        "**mqdefault** — 320×180, a compact medium size.",
        "**default** — 120×90, the tiny version YouTube always generates, no matter the upload.",
      ] },
      { type: "h2", text: "Step-by-step: download a YouTube thumbnail" },
      { type: "ol", items: [
        "Copy the video's link — a watch link, a youtu.be short link, or a Shorts link all work.",
        "Paste it into the YouTube Thumbnail Downloader.",
        "The tool extracts the video ID and shows every thumbnail size that actually exists for that video.",
        "Click download on whichever resolution you need — it saves directly, no extra steps.",
      ] },
      { type: "callout", text: "Nothing is uploaded to run this — the tool fetches the image directly from YouTube's own image CDN (img.youtube.com), the same place your browser loads it from when you watch the video." },
      { type: "h2", text: "What people actually use this for" },
      { type: "ul", items: [
        "**Competitor research** — studying what thumbnail styles, colours and text placements get clicks in your niche.",
        "**Pre-upload quality checks** — download your own video's thumbnail after uploading to confirm it looks right at full size before you publish or promote it.",
        "**Mood boards and pitch decks** — pulling reference thumbnails together when planning a channel's visual style.",
        "**Archiving your own content** — grabbing your own video's thumbnail for reuse in a blog post or social share.",
      ] },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Assuming every video has a 1280×720 thumbnail — only HD uploads get one; the tool automatically hides sizes that don't exist for a given video.",
        "Reusing someone else's thumbnail artwork commercially without permission — the image itself is still the creator's work, downloading it doesn't transfer any rights.",
        "Confusing the auto-generated thumbnail with a custom thumbnail a creator uploaded separately — both are served from the same URL pattern, so what you download is always whatever is currently live on the video.",
      ] },
    ],
    faq: [
      { question: "Do I need a YouTube API key to download a thumbnail?", answer: "No. Thumbnails are plain public image files served from img.youtube.com — no API key, login, or app registration is needed to fetch one." },
      { question: "Why is the HD (maxresdefault) thumbnail missing for some videos?", answer: "YouTube only generates a 1280×720 thumbnail for videos uploaded in HD resolution. Older uploads, or videos uploaded at a lower resolution, may only have the smaller sizes available." },
      { question: "Can I use a downloaded thumbnail on my own website?", answer: "The image itself is still the original creator's work. Using someone else's thumbnail commercially without permission can raise copyright issues — this tool is best used for research, your own content, or personal reference." },
      { question: "Does this work for YouTube Shorts?", answer: "Yes — Shorts links follow the same video ID pattern, so pasting a Shorts URL works exactly like a regular watch link." },
    ],
  },
  {
    slug: "cgpa-to-percentage-calculator-guide",
    title: "CGPA to Percentage: CBSE, VTU and University Formulas Explained",
    excerpt:
      "CGPA doesn't convert to percentage the same way everywhere — CBSE, VTU and other universities each use a different formula. Here's how to convert correctly, and when a self-calculated number isn't enough.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-08-02",
    tags: ["cgpa", "percentage", "sgpa", "students", "india education"],
    relatedTools: ["cgpa-calculator", "percentage-calculator"],
    seoTitle: "CGPA to Percentage Calculator — CBSE, VTU & More",
    seoDescription:
      "Convert CGPA to percentage using the right formula for your board or university, calculate SGPA/CGPA from subject grades, and see when you need an official conversion certificate.",
    content: [
      { type: "p", text: "CGPA (Cumulative Grade Point Average) is a 10-point average of your grades across semesters, while percentage is the familiar out-of-100 score. The two aren't interchangeable by a single universal formula — different boards and universities define their own conversion, which is exactly why so many students get a slightly different number depending on which formula they use." },
      { type: "h2", text: "CGPA, SGPA and percentage — what's the difference?" },
      { type: "ul", items: [
        "**SGPA (Semester Grade Point Average)** — the credit-weighted average of grade points for one semester only.",
        "**CGPA (Cumulative Grade Point Average)** — the credit-weighted average across all semesters completed so far.",
        "**Percentage** — CGPA converted to a familiar out-of-100 figure, using your board or university's official formula.",
      ] },
      { type: "h2", text: "The formulas that actually differ" },
      { type: "ul", items: [
        "**CBSE**: Percentage = CGPA × 9.5. This is the most widely quoted formula and applies to CBSE school results.",
        "**VTU and several technical universities**: Percentage = (CGPA − 0.75) × 10 — a noticeably different result from the CBSE formula for the same CGPA.",
        "**Other universities**: many publish their own multiplier or offset — always check your institution's official examination cell circular if the two common formulas don't match what your marksheet states.",
      ] },
      { type: "h2", text: "Step-by-step: convert your CGPA" },
      { type: "ol", items: [
        "Open the CGPA to Percentage Calculator.",
        "Pick the formula that matches your board or university — CBSE, VTU, or enter a custom multiplier if yours differs.",
        "Enter your CGPA to get the percentage, or flip it around and enter a percentage to see the equivalent CGPA.",
        "If you need your SGPA or CGPA calculated from scratch, switch to the \"SGPA/CGPA from grades\" tab and enter each subject's credits and grade point — it computes the credit-weighted average automatically.",
      ] },
      { type: "callout", text: "A self-calculated conversion is fine for a quick estimate — job applications, comparing offers, or planning ahead. For anything official (foreign university admissions, some government exams, certain employers), you'll typically need an official conversion certificate issued by your board or university, not a number you worked out yourself." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Using the CBSE formula (×9.5) for a university that actually follows a different one, like VTU's (CGPA − 0.75) × 10 — the gap between the two grows the higher your CGPA is.",
        "Submitting a self-calculated percentage where an official conversion certificate was specifically asked for.",
        "Mixing up SGPA (one semester) with CGPA (cumulative) when reporting your score to someone else.",
        "Forgetting that some universities weight grade points by credit hours differently across years — check your institution's own SGPA/CGPA formula if your calculated number doesn't match your official marksheet.",
      ] },
    ],
    faq: [
      { question: "What is the CGPA to percentage formula for CBSE?", answer: "Percentage = CGPA × 9.5. For example, a CGPA of 9.0 converts to 85.5%." },
      { question: "Is the VTU formula the same as CBSE?", answer: "No. VTU (and several other technical universities) use Percentage = (CGPA − 0.75) × 10, which gives a different result from the CBSE ×9.5 formula for the same CGPA — always check which one your institution actually uses." },
      { question: "How do I calculate my CGPA from individual subject grades?", answer: "Multiply each subject's credits by its grade point, add those up across all subjects, then divide by the total credits — this credit-weighted average is your SGPA (per semester) or CGPA (cumulative)." },
      { question: "Can I use a self-calculated percentage for job applications?", answer: "Usually yes, for a quick reference or an initial application. But some employers, foreign universities, and government exams require an official conversion certificate issued by your board or university rather than a self-calculated figure — check the specific requirement before relying on it." },
    ],
  },
  {
    slug: "free-text-to-speech-online-guide",
    title: "Free Text to Speech Online: Turn Any Text Into Natural Voice",
    excerpt:
      "Proofreading by ear, studying hands-free, or making content more accessible — here's how browser-based text to speech works, and how to get the most natural result.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-08-02",
    tags: ["text to speech", "accessibility", "productivity", "tts"],
    relatedTools: ["text-to-speech", "word-counter"],
    seoTitle: "Free Text to Speech Online — No Sign-Up, No Upload",
    seoDescription:
      "Convert any text to natural-sounding speech for free, right in your browser. Pick a voice, adjust speed and pitch, and listen instantly — nothing is uploaded.",
    content: [
      { type: "p", text: "Text to speech (TTS) turns written text into spoken audio using your device's own speech engine — the same technology behind screen readers and voice assistants. A browser-based TTS tool needs no app install, no account, and no file upload: your text is read aloud entirely on your own device." },
      { type: "h2", text: "What it's actually useful for" },
      { type: "ul", items: [
        "**Proofreading by ear** — hearing your own writing read back out loud catches awkward phrasing and typos your eyes glide past when reading silently.",
        "**Studying hands-free** — have notes, articles or textbook excerpts read aloud while commuting, exercising, or doing something else with your hands.",
        "**Accessibility** — makes written content usable for people with visual impairments, dyslexia, or reading fatigue.",
        "**Language practice** — hearing correct pronunciation of unfamiliar words or phrases in a target language.",
      ] },
      { type: "h2", text: "Step-by-step: convert text to speech" },
      { type: "ol", items: [
        "Open the Text to Speech tool.",
        "Type or paste your text into the box.",
        "Pick a voice from the list your browser and device provide.",
        "Adjust speed, pitch and volume to taste — a slightly slower rate generally helps with retention when studying.",
        "Press play to hear it read aloud, or pause and resume as needed.",
      ] },
      { type: "callout", text: "Available voices depend entirely on your browser and operating system — nothing is sent to a server to generate the audio, so the voice list and quality will differ between a phone, a laptop, Chrome and Safari." },
      { type: "h2", text: "Tips for the most natural result" },
      { type: "ul", items: [
        "Break very long text into shorter chunks — some browsers cut off extremely long single passages.",
        "Slow the rate down for technical or unfamiliar vocabulary; speed it up for content you already know well and just want to skim by ear.",
        "If your device offers multiple English voices (including Indian English), try a few — natural-sounding quality varies noticeably between them.",
        "Punctuate your text properly — commas and full stops directly affect how natural the pacing sounds.",
      ] },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Expecting an audio file to download — browser-based TTS plays live and doesn't expose a saved file; use a screen/audio recorder if you specifically need one.",
        "Assuming every browser has the same voices — voice availability is tied to the operating system and browser, not the website.",
        "Pasting unformatted, run-on text with no punctuation, then wondering why the reading sounds flat or rushed.",
      ] },
    ],
    faq: [
      { question: "Is browser-based text to speech free to use?", answer: "Yes — it uses your browser and operating system's built-in speech engine, which is already installed and free, with no per-use cost or account needed." },
      { question: "Can I download the generated audio as a file?", answer: "Not directly — the Web Speech API that powers browser-based TTS plays audio live and doesn't provide a way to export it as a file. Use your device's screen or audio recorder if you need a saved file." },
      { question: "Why do the available voices look different on my phone vs my laptop?", answer: "Voices come from your device's operating system and browser, not from the website — so the exact list, and how natural each voice sounds, varies across devices and browsers." },
      { question: "Is my text uploaded anywhere?", answer: "No. Conversion happens entirely on-device using your browser's built-in speech synthesis — nothing is sent to a server." },
    ],
  },
  {
    slug: "how-to-convert-pdf-to-jpg-and-back",
    title: "How to Convert PDF to JPG (and Back) — Free, No Watermark",
    excerpt:
      "Whether you need one page as an image or a stack of photos turned into a single PDF, here's the fastest way to do both — free, private, and without a watermark stamped across your file.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-08-03",
    tags: ["pdf", "jpg", "file conversion", "documents"],
    relatedTools: ["pdf-to-jpg", "image-to-pdf", "pdf-compress"],
    seoTitle: "Convert PDF to JPG or JPG to PDF — Free, No Watermark",
    seoDescription:
      "Convert PDF pages to JPG images, or turn photos and scans into a single PDF — free, private, and without a watermark. Works entirely in your browser.",
    content: [
      { type: "p", text: "PDF and JPG solve different problems: PDF keeps a document's layout fixed and portable across devices, while JPG is what you need when something has to display as an image — in an email body, a product listing, a slide, or anywhere a PDF viewer isn't guaranteed. Converting between the two is common, and it should be a 10-second job, not a paid subscription." },
      { type: "h2", text: "PDF to JPG: when you need this" },
      { type: "ul", items: [
        "Pulling a single page out of a multi-page PDF to paste into a document or slide.",
        "Sharing a scanned form or certificate somewhere that only accepts image uploads.",
        "Creating a quick preview thumbnail of a PDF's first page for a listing or gallery.",
      ] },
      { type: "h2", text: "Step-by-step: PDF to JPG" },
      { type: "ol", items: [
        "Open the PDF to JPG tool.",
        "Upload your PDF — multi-page files convert every page into its own image.",
        "Preview each page as a JPG.",
        "Download a single page or all of them together.",
      ] },
      { type: "h2", text: "JPG to PDF: when you need this" },
      { type: "ul", items: [
        "Turning a stack of scanned pages or phone photos of a document into one shareable PDF.",
        "Submitting photo evidence, receipts, or ID scans somewhere that specifically asks for a PDF, not loose images.",
        "Combining multiple images into a single file so nothing gets separated in transit.",
      ] },
      { type: "h2", text: "Step-by-step: JPG to PDF" },
      { type: "ol", items: [
        "Open the Image to PDF tool.",
        "Upload your images in the order you want them to appear.",
        "Reorder pages if needed, then generate the PDF.",
        "Download the finished file — if it's larger than expected, run it through the PDF Compressor next.",
      ] },
      { type: "callout", text: "Both conversions run entirely in your browser using the canvas and PDF-rendering APIs already built into it — nothing is uploaded to a server, which matters if the file contains an ID, a contract, or anything else private." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Converting a photo-heavy multi-page PDF to JPG and being surprised by a large total download — compress the images afterward if file size matters.",
        "Uploading images in the wrong order for a JPG-to-PDF conversion and not checking the page order before downloading.",
        "Using a paid \"PDF converter\" website that stamps a watermark across the free tier's output — a browser-based converter has no reason to add one, since there's no server-side processing to monetize around it.",
      ] },
    ],
    faq: [
      { question: "Does converting PDF to JPG reduce quality?", answer: "Each page is rendered at a resolution good enough for on-screen and most print use. If you need the smallest possible file afterward, run the JPG through an image compressor separately." },
      { question: "Can I convert just one page of a multi-page PDF?", answer: "Yes — every page converts to its own JPG, so you can download only the page you need instead of the whole set." },
      { question: "Will my PDF or images be uploaded anywhere?", answer: "No. Both conversions happen locally in your browser using built-in rendering APIs — files never leave your device." },
      { question: "Is there a watermark on the converted file?", answer: "No. Since there's no server processing the file, there's nothing to attach a watermark to promote — the output is a clean file." },
    ],
  },
  {
    slug: "how-to-build-ats-friendly-resume-free",
    title: "How to Build an ATS-Friendly Resume (Free Template + Tips)",
    excerpt:
      "Most resumes are read by software before a human ever sees them. Here's what an ATS actually checks for, and how to build a resume that gets through it — free, with no design software needed.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-08-03",
    tags: ["resume", "job search", "career", "ats"],
    relatedTools: ["resume-builder", "word-counter"],
    seoTitle: "ATS-Friendly Resume Builder — Free, No Design Software",
    seoDescription:
      "Build a resume that actually gets past Applicant Tracking Systems — what ATS software checks for, common formatting mistakes, and a free builder to fix them.",
    content: [
      { type: "p", text: "An Applicant Tracking System (ATS) is software that scans, parses and ranks resumes before a recruiter ever opens one — used by the large majority of mid-size and large companies. A resume that looks great as a PDF can still fail here if its formatting confuses the parser, which means the actual content never reaches a human at all." },
      { type: "h2", text: "What an ATS actually checks" },
      { type: "ul", items: [
        "**Keyword match** — whether your resume's wording overlaps with the job description's required skills and terms.",
        "**Section structure** — whether it can correctly identify \"Experience,\" \"Education,\" \"Skills\" as distinct sections.",
        "**Parseable text** — whether the actual words can be extracted at all, not locked inside an image, text box, or unusual layout.",
        "**Contact details** — whether your name, phone and email are cleanly extractable, usually from a simple header, not a graphic.",
      ] },
      { type: "h2", text: "Formatting that breaks ATS parsing" },
      { type: "ul", items: [
        "**Multi-column layouts** — many ATS parsers read left-to-right across the whole line, scrambling column-based resumes into nonsense.",
        "**Text inside tables, text boxes, or headers/footers** — some parsers skip these entirely.",
        "**Icons instead of text labels** — a phone icon next to a number is fine for a human, invisible to many parsers.",
        "**Unusual fonts or heavy graphics** — stick to standard fonts; decorative fonts can render as garbled characters after parsing.",
      ] },
      { type: "h2", text: "Step-by-step: build an ATS-safe resume" },
      { type: "ol", items: [
        "Open the Resume Builder and pick a single-column, text-based template.",
        "Use standard section headings — Experience, Education, Skills, Summary — instead of creative labels.",
        "Mirror the exact keywords from the job description wherever they honestly apply to your experience.",
        "Keep contact details as plain text at the top, not inside a graphic or sidebar.",
        "Export as a PDF — modern ATS software parses text-based PDFs fine; avoid exporting as a flattened image.",
      ] },
      { type: "callout", text: "Keyword-matching a job description is about honestly mirroring the terms your real experience already supports — not stuffing in skills you don't have. An ATS getting your resume through is only the first filter; a human still reads it next." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Using a beautifully designed multi-column template that a human loves and an ATS parses into scrambled word order.",
        "Padding the skills section with keywords copy-pasted from a job description that don't reflect any real experience — this often surfaces badly in the interview that follows.",
        "Saving the resume as an image-based PDF (e.g. a scanned print or a flattened design export) that has no extractable text at all.",
        "Writing an unusually long summary paragraph at the top instead of clear, scannable bullet points under each section.",
      ] },
    ],
    faq: [
      { question: "What file format should I submit my resume in?", answer: "A text-based PDF is the safest default — it preserves formatting across devices and modern ATS software parses it correctly, as long as it isn't a flattened image or scanned copy." },
      { question: "Do multi-column resumes always fail ATS parsing?", answer: "Not always, but many parsers read left-to-right across a line rather than column-by-column, which can scramble a multi-column layout's word order. A single-column layout is the safer choice when you don't know which ATS a company uses." },
      { question: "Should I copy keywords directly from the job description?", answer: "Only where they honestly reflect your real experience. Mirroring the job description's wording for skills you genuinely have helps a keyword match; adding ones you can't back up in an interview usually backfires." },
      { question: "Does using icons for contact info hurt my resume?", answer: "It can — some ATS parsers extract text but skip icon-only content, so a phone icon with no adjacent label may mean your number never gets parsed. Pair icons with plain text, or skip them entirely." },
    ],
  },
  {
    slug: "csv-to-json-difference-when-to-convert",
    title: "CSV to JSON: What's the Difference and When to Convert",
    excerpt:
      "Same data, two very different shapes. Here's what actually changes when you convert a spreadsheet's CSV export into JSON, and when you genuinely need to.",
    category: "developer",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-08-03",
    tags: ["csv", "json", "data formats", "developer tools"],
    relatedTools: ["csv-json-converter", "json-formatter"],
    seoTitle: "CSV to JSON Converter — Free, Instant, No Upload",
    seoDescription:
      "Understand the real difference between CSV and JSON, when you actually need to convert between them, and how to do it instantly in your browser.",
    content: [
      { type: "p", text: "CSV (comma-separated values) and JSON (JavaScript Object Notation) both store structured data, but they're shaped for different jobs. CSV is a flat table — rows and columns, nothing nested. JSON is a tree — it can nest objects inside objects, and arrays inside those, which a flat spreadsheet format simply can't represent." },
      { type: "h2", text: "The actual structural difference" },
      { type: "ul", items: [
        "**CSV** is plain text, one row per line, values separated by commas — every row must have the same flat set of columns.",
        "**JSON** is key-value pairs that can nest arbitrarily deep — a single record can contain a list inside it, or an object inside an object, with no flat-column limit.",
        "Converting CSV to JSON is straightforward: each row becomes one flat JSON object. Converting complex, nested JSON back to CSV means flattening it — some structure inevitably gets lost or needs a naming convention to represent nesting in column headers.",
      ] },
      { type: "h2", text: "When you actually need to convert" },
      { type: "ul", items: [
        "**Feeding data into an API** — most REST APIs expect JSON in the request body, but your source data is a spreadsheet export.",
        "**Importing into a NoSQL database or JavaScript app** — these work natively with JSON-shaped documents, not flat rows.",
        "**Sharing data with a developer** — CSV is great for spreadsheets, JSON is the more common exchange format between systems.",
        "**Config or seed data for a JS/TS project** — arrays of JSON objects drop directly into code as usable data structures.",
      ] },
      { type: "h2", text: "Step-by-step: convert CSV to JSON" },
      { type: "ol", items: [
        "Open the CSV to JSON Converter.",
        "Paste or upload your CSV data — the first row is treated as column headers by default.",
        "Preview the converted JSON array of objects.",
        "Copy or download the result — run it through the JSON Formatter afterward if you need it pretty-printed or want to validate it.",
      ] },
      { type: "callout", text: "If your CSV has commas inside a quoted field (like an address: \"Delhi, India\"), make sure the converter respects quoted fields rather than splitting on every comma blindly — otherwise a single address field can silently break into two columns." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Assuming every column will convert to the right data type automatically — numbers and booleans in CSV are just text until something explicitly parses them, so double-check the JSON output's types match what you expect.",
        "Not accounting for a header row — treating the first row as data instead of column names produces JSON with generic or wrong keys.",
        "Trying to convert deeply nested JSON straight back to CSV and being surprised by flattened, hard-to-read column names — this direction always involves some information trade-off.",
      ] },
    ],
    faq: [
      { question: "Does converting CSV to JSON change my data?", answer: "No — the values stay the same, only the structure changes: each row becomes a flat JSON object with the header row's names as keys." },
      { question: "What happens to numbers and dates in the conversion?", answer: "CSV has no native data types — everything is text. A converter may output numbers as JSON numbers automatically, but dates typically stay as strings unless you specifically parse them afterward." },
      { question: "Can I convert JSON back to CSV?", answer: "Yes for flat JSON arrays of objects. Deeply nested JSON needs to be flattened first, which can mean losing some structure or adopting a naming convention for nested fields in the column headers." },
      { question: "Is my data uploaded to a server during conversion?", answer: "No — the conversion runs in your browser using JavaScript's built-in parsing, so nothing is sent anywhere, which matters for spreadsheets containing personal or business data." },
    ],
  },
  {
    slug: "how-to-apply-duplicate-pan-card-lost-damaged",
    title: "How to Apply for a Duplicate PAN Card (Lost or Damaged PAN)",
    excerpt:
      "Lost your PAN card or it's too worn to scan? You don't need to reapply from scratch — here's the actual reprint process, what it costs, and how long it takes.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-08-04",
    tags: ["pan card", "india", "identity documents", "reprint"],
    relatedTools: ["pdf-compress", "image-compressor"],
    seoTitle: "Duplicate PAN Card: How to Reprint a Lost or Damaged PAN",
    seoDescription:
      "Lost or damaged your PAN card? Here's how to apply for a reprint online — no need to reapply for a new PAN number, just a replacement card.",
    content: [
      { type: "p", text: "A lost or damaged PAN card doesn't mean losing your PAN number — that number is permanent and tied to your tax record for life. What you actually need is a reprint (officially called a \"Reprint of PAN Card\") of the same number on a fresh card, which is a much simpler process than a new PAN application." },
      { type: "h2", text: "When you need a reprint vs a correction" },
      { type: "ul", items: [
        "**Reprint** — your PAN number and details are correct, but the physical card is lost, stolen, or damaged.",
        "**Correction** — one or more details (name, date of birth, address, spelling) are actually wrong and need fixing, which uses a separate PAN Correction/Update application instead of a plain reprint.",
      ] },
      { type: "h2", text: "Where to apply" },
      { type: "ul", items: [
        "The NSDL/Protean e-Gov portal or the UTIITSL portal — both are authorised by the Income Tax Department to process PAN reprints.",
        "Use whichever portal originally issued your PAN if you know it; either works if you don't remember.",
      ] },
      { type: "h2", text: "Step-by-step: reprint your PAN card" },
      { type: "ol", items: [
        "Go to the NSDL or UTIITSL PAN reprint page and select \"Reprint of PAN Card.\"",
        "Enter your existing PAN number, Aadhaar number, date of birth and registered mobile/email for OTP verification.",
        "Confirm your details exactly as they appear in the Income Tax database — a reprint does not let you change anything.",
        "Pay the reprint fee online.",
        "Track your application using the acknowledgement number — the physical card is dispatched by post, and an e-PAN PDF is usually available for download sooner.",
      ] },
      { type: "callout", text: "If any of your details (name, date of birth, address) are actually wrong — not just a lost card — you need a PAN Correction application instead of a reprint, since a reprint only reproduces your existing record exactly as it stands." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Applying for a brand-new PAN because the card is lost — this can result in holding two PAN numbers, which is against Income Tax rules and can cause penalties.",
        "Not verifying that your Aadhaar and PAN details match before submitting — mismatches are a common cause of rejected reprint requests.",
        "Forgetting to download the e-PAN once it's ready — it's valid for most purposes immediately, even before the physical card arrives by post.",
      ] },
    ],
    faq: [
      { question: "Do I get a new PAN number with a reprint?", answer: "No — a reprint reproduces your existing PAN number on a new physical card. Your PAN number never changes, even across reprints." },
      { question: "How long does a PAN reprint take?", answer: "The e-PAN PDF is typically available within a few days of successful verification; the physical card is dispatched by post afterward, which can take one to two weeks depending on your location." },
      { question: "Can I use the e-PAN before the physical card arrives?", answer: "Yes — the e-PAN PDF is an officially valid form of your PAN for most purposes, including many KYC checks, while you wait for the physical card." },
      { question: "What if my name or date of birth is wrong on my old PAN?", answer: "That's a correction, not a reprint. Use the PAN Correction/Update application instead, which lets you fix incorrect details before a new card is issued." },
    ],
  },
  {
    slug: "police-clearance-certificate-pcc-india-how-to-apply",
    title: "Police Clearance Certificate (PCC): How to Apply Online in India",
    excerpt:
      "Applying for a job, visa or immigration abroad? Here's what a PCC actually verifies, who issues it, and the real steps to get one without a broker.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-08-04",
    tags: ["pcc", "police clearance certificate", "india", "passport", "immigration"],
    relatedTools: ["pdf-compress", "image-compressor"],
    seoTitle: "Police Clearance Certificate (PCC) — How to Apply Online",
    seoDescription:
      "How to apply for a Police Clearance Certificate (PCC) in India for jobs, visas or immigration — eligibility, documents, and the actual process, step by step.",
    content: [
      { type: "p", text: "A Police Clearance Certificate (PCC) confirms you have no pending criminal cases in India, and is commonly required for overseas jobs, long-term visas, immigration, and citizenship applications in other countries. In India, it's issued through the Passport Seva system, since it relies on your existing passport record." },
      { type: "h2", text: "Who needs a PCC" },
      { type: "ul", items: [
        "People applying for a long-term visa, work permit, or permanent residency abroad — most countries require one as part of background verification.",
        "Indians applying for jobs overseas where the employer or embassy specifically asks for police clearance.",
        "Anyone applying for foreign citizenship who needs to prove a clean record from every country they've lived in, including India.",
      ] },
      { type: "h2", text: "Eligibility and what you need" },
      { type: "ul", items: [
        "A valid Indian passport — PCC applications are processed through the Passport Seva portal, so you must already hold a passport.",
        "Proof of current address, since local police verification is often part of the process.",
        "No pending criminal case at your current address, for a straightforward PCC issuance.",
      ] },
      { type: "h2", text: "Step-by-step: apply for a PCC" },
      { type: "ol", items: [
        "Log in to the Passport Seva portal with your existing registered account (or register if you don't have one).",
        "Select \"Apply for Police Clearance Certificate\" from the services list.",
        "Fill in the application form with your passport and current address details, and specify the purpose (the destination country usually needs to be stated).",
        "Schedule an appointment at your nearest Passport Seva Kendra (PSK) or Regional Passport Office if in-person verification is required.",
        "Carry your original passport and address proof to the appointment; local police verification may follow depending on your case.",
        "Track your application status online and download the PCC once issued.",
      ] },
      { type: "callout", text: "A PCC is issued based on your passport record and current address — if you've moved since your passport was issued, make sure your passport's address is updated first, or be ready to show valid proof of your current address." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Assuming a PCC and a passport are the same document — a PCC is a separate certificate applied for through the same Passport Seva system.",
        "Not checking the destination country's specific PCC format requirements (some want an apostille or embassy attestation on top of the PCC itself).",
        "Using unauthorised agents who claim to \"fast-track\" the process — PCC applications go through the same official verification regardless of who submits them.",
      ] },
    ],
    faq: [
      { question: "Do I need a passport to apply for a PCC?", answer: "Yes — PCC applications in India are processed through the Passport Seva portal and require an existing, valid Indian passport." },
      { question: "How long does it take to get a PCC?", answer: "It varies by case — straightforward applications with no pending police verification can be issued quickly, while cases requiring local police verification take longer, often a few weeks." },
      { question: "Is a PCC the same everywhere I apply for a visa?", answer: "The certificate itself is the same, but some destination countries require additional steps like an apostille or embassy attestation on top of the PCC — check the specific requirement for your destination." },
      { question: "Can I apply for a PCC without an appointment at a Passport Seva Kendra?", answer: "Some cases are processed without an in-person visit, but many require an appointment for verification — the portal will indicate what's needed for your specific application after you submit the form." },
    ],
  },
  {
    slug: "how-to-check-vehicle-rc-details-online",
    title: "How to Check Your Vehicle's RC Details Online (mParivahan Guide)",
    excerpt:
      "Buying a used vehicle or just need to confirm your own RC details? Here's how to look up any vehicle's registration details online, free and instantly.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-08-04",
    tags: ["rc", "vehicle registration", "india", "mparivahan"],
    relatedTools: ["pdf-compress", "image-compressor"],
    seoTitle: "Check Vehicle RC Details Online — Free RC Status Check",
    seoDescription:
      "Look up any vehicle's RC (Registration Certificate) details online using its number plate — owner name status, registration validity, and more. Free, official method.",
    content: [
      { type: "p", text: "The RC (Registration Certificate) is the official proof that a vehicle is registered with the transport department, and its basic details — registration validity, fuel type, insurance status — are publicly checkable online with just the number plate. This is the single most useful check before buying a used vehicle." },
      { type: "h2", text: "Why check RC details online" },
      { type: "ul", items: [
        "**Before buying a used vehicle** — confirm the registration is genuine, current, and not reported stolen or under a loan hypothecation you weren't told about.",
        "**Confirming your own vehicle's records** — checking that your registration, address, or ownership transfer was correctly updated after a recent change.",
        "**Verifying insurance and fitness status** — RC lookups typically show whether insurance and the fitness/PUC certificate are still valid.",
        "**Checking before a loan or resale** — banks and used-vehicle buyers alike want to confirm the RC is clean before financing or purchase.",
      ] },
      { type: "h2", text: "Step-by-step: check RC details" },
      { type: "ol", items: [
        "Go to the official Vahan portal (vahan.parivahan.gov.in) or use the mParivahan app.",
        "Select \"Know Your Vehicle Details\" and enter the vehicle's registration number.",
        "Complete the OTP or captcha verification.",
        "Review the details shown: registered owner's name (partially masked for privacy), registration date, vehicle class, fuel type, insurance validity, and fitness/PUC status.",
        "Note down or screenshot the result if you need it for a records comparison later — before a purchase, keep this alongside the seller's physical RC copy.",
      ] },
      { type: "callout", text: "The public lookup deliberately masks sensitive owner details for privacy — for a full RC verification (e.g. before a major purchase), cross-check the physical RC document and consider verifying at the local RTO if anything looks inconsistent." },
      { type: "h2", text: "If something doesn't match" },
      { type: "p", text: "If the online record's registration date, vehicle class, or fuel type doesn't match what the seller's physical RC shows, treat that as a serious red flag before proceeding — it can indicate an altered document, an unresolved ownership dispute, or a vehicle that hasn't been correctly re-registered after a previous sale. In that case, it's worth visiting the local RTO in person to confirm the record directly rather than relying only on the seller's paperwork." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Relying only on the seller's photocopy of the RC without checking it against the online record — photocopies can be outdated or altered.",
        "Not checking hypothecation status (an active loan against the vehicle) before buying — this can complicate ownership transfer significantly.",
        "Assuming a valid RC lookup means the vehicle has no other issues (e.g. pending traffic challans) — check e-challan status separately.",
      ] },
    ],
    faq: [
      { question: "Can I check any vehicle's RC details, or only my own?", answer: "You can look up basic public details (registration validity, vehicle class, insurance status) for any vehicle using its number plate — sensitive owner details are masked for privacy." },
      { question: "Is checking RC details online free?", answer: "Yes — the official Vahan portal and mParivahan app provide this lookup for free." },
      { question: "What should I check before buying a used vehicle?", answer: "At minimum: RC validity, insurance status, fitness/PUC certificate validity, hypothecation (loan) status, and pending e-challans — all checkable through official government portals." },
      { question: "Does the RC lookup show if there's a loan on the vehicle?", answer: "Yes, hypothecation status (whether the vehicle is financed and under a bank/lender's claim) is typically shown, which matters a lot before completing a purchase." },
    ],
  },
  {
    slug: "robots-txt-explained-how-to-control-search-engine-crawling",
    title: "Robots.txt Explained: How to Control What Search Engines Crawl",
    excerpt:
      "A robots.txt file is a set of instructions, not a lock — here's what it actually does, what it can't do, and how to write one that doesn't accidentally block your whole site.",
    category: "seo",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-08-04",
    tags: ["robots.txt", "seo", "crawling", "technical seo"],
    relatedTools: ["robots-txt-generator", "sitemap-generator"],
    seoTitle: "Robots.txt Generator — Free, Explained Step by Step",
    seoDescription:
      "What robots.txt actually does, what it can't do, and how to write one correctly — plus a free generator so you don't have to write the syntax by hand.",
    content: [
      { type: "p", text: "robots.txt is a plain-text file at your site's root (yoursite.com/robots.txt) that tells well-behaved search engine crawlers which parts of your site they're allowed to crawl. It's a set of polite instructions, not a security mechanism — it doesn't password-protect anything, and a page can still get indexed if something else links to it, even if robots.txt disallows crawling it." },
      { type: "h2", text: "What robots.txt actually controls" },
      { type: "ul", items: [
        "**Crawling**, not indexing — disallowing a URL stops crawlers from fetching its content, but the URL can still appear in search results (usually with no description) if it's linked elsewhere.",
        "**Well-behaved bots only** — legitimate search engines respect it; it does nothing to stop a scraper or bad actor that ignores the file entirely.",
        "**Crawl budget** — for large sites, blocking low-value sections (admin pages, search result pages, duplicate filtered views) helps crawlers spend more time on pages that matter.",
      ] },
      { type: "h2", text: "The basic syntax" },
      { type: "ul", items: [
        "`User-agent: *` — applies the following rules to all crawlers (or name a specific one, like `Googlebot`).",
        "`Disallow: /path/` — blocks crawling of that path and everything under it.",
        "`Allow: /path/exception` — carves out an exception within a disallowed path.",
        "`Sitemap: https://yoursite.com/sitemap.xml` — points crawlers to your sitemap, which genuinely helps discovery.",
      ] },
      { type: "h2", text: "Step-by-step: create a robots.txt" },
      { type: "ol", items: [
        "Open the Robots.txt Generator.",
        "List the paths you want to block (e.g. `/admin/`, `/search?`) — leave public content unblocked by default.",
        "Add your sitemap URL so crawlers can find it easily.",
        "Copy the generated file and upload it as `robots.txt` at your site's root, not in a subfolder.",
      ] },
      { type: "callout", text: "A single misplaced `Disallow: /` blocks your ENTIRE site from being crawled — this is one of the most common accidental SEO disasters, often left over from a staging environment's robots.txt that got deployed to production by mistake." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Using robots.txt to try to keep a page out of Google entirely — if you need that, use a `noindex` meta tag instead; robots.txt only stops crawling, not indexing.",
        "Blocking CSS/JS files that Googlebot needs to render your page properly, which can hurt how well Google understands your page's content and layout.",
        "Forgetting robots.txt must live at the exact root (`/robots.txt`) — a copy in a subdirectory is ignored.",
      ] },
    ],
    faq: [
      { question: "Does robots.txt stop a page from appearing in Google?", answer: "Not reliably — it stops crawling, but a blocked page can still appear in search results (usually without a description) if something else links to it. Use a `noindex` meta tag if you need a page fully out of search results." },
      { question: "Can robots.txt password-protect my pages?", answer: "No. It's a public, plain-text file that's just a polite request to well-behaved crawlers — it provides no actual access control or security." },
      { question: "Where does robots.txt need to be placed?", answer: "At your site's exact root — yoursite.com/robots.txt. A copy anywhere else is ignored by crawlers." },
      { question: "Should I block my sitemap in robots.txt?", answer: "No — the opposite. Explicitly listing your sitemap's URL in robots.txt with a `Sitemap:` line helps crawlers find and use it." },
    ],
  },
  {
    slug: "how-to-generate-sitemap-xml-for-website",
    title: "How to Generate a Sitemap.xml for Your Website (Free)",
    excerpt:
      "A sitemap doesn't guarantee rankings, but it does help search engines find your pages faster — here's what actually belongs in one, and how to build it without writing XML by hand.",
    category: "seo",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-08-04",
    tags: ["sitemap", "seo", "xml sitemap", "technical seo"],
    relatedTools: ["sitemap-generator", "robots-txt-generator"],
    seoTitle: "Sitemap.xml Generator — Free, No Sign-Up",
    seoDescription:
      "Generate a valid sitemap.xml for your website for free — what to include, what to leave out, and how to submit it to search engines correctly.",
    content: [
      { type: "p", text: "A sitemap.xml is a list of your site's URLs that helps search engines discover pages, especially ones that aren't easy to find through normal internal links (like new pages, or pages buried deep in a site's structure). It doesn't directly improve rankings, but it does help pages get crawled and indexed faster." },
      { type: "h2", text: "What belongs in a sitemap" },
      { type: "ul", items: [
        "Every canonical, indexable page you actually want in search results.",
        "A `lastmod` date so crawlers know what's recently changed.",
        "Optionally, `changefreq` and `priority` — these are hints, not guarantees, and search engines are known to largely ignore or deprioritise them, but they don't hurt to include.",
      ] },
      { type: "h2", text: "What to leave out" },
      { type: "ul", items: [
        "Pages blocked by `noindex` or robots.txt — including them in a sitemap while blocking them elsewhere sends mixed signals.",
        "Duplicate or parameterised URLs (like `?sort=price` variants of the same page) — list only the canonical version.",
        "Redirected or broken URLs — a sitemap full of 3xx/4xx responses actively wastes crawl budget.",
      ] },
      { type: "h2", text: "Step-by-step: generate and submit a sitemap" },
      { type: "ol", items: [
        "Open the Sitemap.xml Generator.",
        "Add your site's URLs, along with a change frequency and priority for each if you want to include them.",
        "Copy or download the generated sitemap.xml.",
        "Upload it to your site's root and reference it in your robots.txt with a `Sitemap:` line.",
        "Submit it directly in Google Search Console for faster discovery.",
      ] },
      { type: "callout", text: "For very large sites (tens of thousands of URLs), search engines recommend splitting into multiple sitemap files linked from a single sitemap index file, since a single sitemap has a practical size and URL-count limit." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Auto-generating a sitemap that includes every URL a CMS has ever created, including thin tag pages, empty search results, or old redirected content.",
        "Never updating the sitemap after adding or removing pages — a stale sitemap actively misleads crawlers.",
        "Forgetting to submit the sitemap in Search Console — uploading it to your site alone doesn't guarantee search engines find it quickly on their own.",
      ] },
    ],
    faq: [
      { question: "Does having a sitemap improve my search rankings?", answer: "Not directly — a sitemap helps search engines discover and crawl your pages faster, but ranking depends on content quality, relevance, and many other factors." },
      { question: "Should I include every page on my site in the sitemap?", answer: "No — only canonical, indexable pages you actually want ranked. Leave out noindexed pages, duplicates, and broken or redirected URLs." },
      { question: "Do changefreq and priority actually matter?", answer: "They're treated as hints at best — major search engines have said they largely ignore these fields, but including reasonable values doesn't hurt." },
      { question: "How do I tell Google about my sitemap?", answer: "Submit it directly in Google Search Console, and also reference its URL in your robots.txt file with a `Sitemap:` line." },
    ],
  },
  {
    slug: "json-ld-schema-markup-without-coding",
    title: "JSON-LD Schema Markup: How to Add It Without Coding",
    excerpt:
      "Schema markup is what powers rich results — star ratings, FAQ dropdowns, recipe cards — in Google search. Here's what it actually does and how to generate it without writing JSON by hand.",
    category: "seo",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-08-04",
    tags: ["schema markup", "json-ld", "seo", "structured data"],
    relatedTools: ["schema-generator", "meta-tags-generator"],
    seoTitle: "JSON-LD Schema Generator — Free, No Coding Needed",
    seoDescription:
      "Generate JSON-LD schema markup for FAQs, articles, products and more without writing code — understand what it does and how search engines use it.",
    content: [
      { type: "p", text: "Schema markup (usually written as JSON-LD) is structured data embedded in a page that describes its content in a format search engines can parse precisely — this is what powers rich results like star ratings under a product, an FAQ dropdown directly in search results, or a recipe card with cook time and calories." },
      { type: "h2", text: "What schema markup does — and doesn't do" },
      { type: "ul", items: [
        "**Does**: gives search engines an unambiguous, structured description of your content, which can unlock eligibility for rich results.",
        "**Doesn't**: guarantee a rich result — search engines decide whether and how to display one, even with valid markup present.",
        "**Doesn't**: substitute for actual content quality — marking up a page as an FAQ doesn't help if the answers themselves are thin or unhelpful.",
      ] },
      { type: "h2", text: "Common schema types worth using" },
      { type: "ul", items: [
        "**FAQPage** — for genuine FAQ content, can show an expandable Q&A dropdown directly in search results.",
        "**Article** — for blog posts and news content, helps with author, publish date, and headline display.",
        "**BreadcrumbList** — shows a page's site hierarchy directly in the search result instead of a raw URL.",
        "**Product** — for e-commerce pages, can enable price and availability display.",
      ] },
      { type: "h2", text: "Step-by-step: add schema markup" },
      { type: "ol", items: [
        "Open the Schema Generator.",
        "Pick the schema type that genuinely matches your page's content (don't mark up content as an FAQ if it isn't one).",
        "Fill in the fields — questions and answers, article details, or breadcrumb structure, depending on the type.",
        "Copy the generated JSON-LD `<script>` tag into your page's `<head>` or body.",
        "Validate it with Google's Rich Results Test before publishing to catch any errors.",
      ] },
      { type: "callout", text: "Marking up content that doesn't genuinely match the schema — like adding fake FAQ markup to boost visibility — violates search engines' structured data guidelines and can lead to a manual penalty removing rich results for your whole site, not just the offending page." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Marking up content as something it isn't (e.g. FAQ schema on a page with no real, visible Q&A content) — this is treated as spam by search engines.",
        "Copy-pasting schema from another site without updating the actual values — leftover incorrect data (wrong author, wrong dates) undermines trust.",
        "Not validating the JSON-LD — a single syntax error can make the entire structured data block invalid and ignored.",
      ] },
    ],
    faq: [
      { question: "Will adding schema markup guarantee a rich result in Google?", answer: "No — valid markup makes your page eligible, but search engines decide independently whether and how to display a rich result." },
      { question: "Do I need to know JSON to add schema markup?", answer: "No — a schema generator lets you fill in a form and produces the JSON-LD code for you, ready to paste into your page." },
      { question: "Can adding fake or mismatched schema get my site penalized?", answer: "Yes — search engines' structured data guidelines prohibit marking up content that doesn't genuinely match what's on the page, and violations can result in rich results being disabled for your site." },
      { question: "Where do I put the JSON-LD code on my page?", answer: "Inside a `<script type=\"application/ld+json\">` tag, typically in the page's `<head>`, though it's also valid in the body." },
    ],
  },
  {
    slug: "cron-expressions-explained-beginners-guide",
    title: "Cron Expressions Explained: A Beginner's Guide",
    excerpt:
      "Cron syntax looks cryptic until you know the pattern — here's what each field actually means, with real examples, and a free tool to build one without memorizing the syntax.",
    category: "developer",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-08-04",
    tags: ["cron", "scheduling", "developer tools", "devops"],
    relatedTools: ["cron-expression-helper"],
    seoTitle: "Cron Expression Generator — Free, With Live Explanation",
    seoDescription:
      "Understand cron syntax field by field, see real scheduling examples, and build cron expressions without memorizing the format using a free generator.",
    content: [
      { type: "p", text: "A cron expression is a five-field pattern that tells a scheduler exactly when to run a job — used in Linux cron jobs, CI/CD pipelines, and countless scheduling tools. The syntax looks dense at first, but it's really just five fixed positions, each with its own meaning." },
      { type: "h2", text: "The five fields" },
      { type: "ul", items: [
        "**Minute** (0–59)",
        "**Hour** (0–23)",
        "**Day of month** (1–31)",
        "**Month** (1–12)",
        "**Day of week** (0–6, where 0 is Sunday)",
      ] },
      { type: "p", text: "In order, that's: `minute hour day-of-month month day-of-week`. A `*` in any field means \"every value\" for that position." },
      { type: "h2", text: "Real examples" },
      { type: "ul", items: [
        "`0 * * * *` — every hour, on the hour.",
        "`0 0 * * *` — once a day, at midnight.",
        "`*/15 * * * *` — every 15 minutes.",
        "`0 9 * * 1-5` — 9 AM, Monday through Friday only.",
        "`0 0 1 * *` — midnight on the 1st of every month.",
      ] },
      { type: "h2", text: "Step-by-step: build a cron expression" },
      { type: "ol", items: [
        "Open the Cron Expression Helper.",
        "Pick or type a schedule — the tool explains in plain English what it means as you build it.",
        "Check the next few run times it predicts to confirm it matches what you expect.",
        "Copy the expression into your scheduler, CI config, or cron job.",
      ] },
      { type: "callout", text: "Always double-check timezone assumptions — most schedulers run cron in UTC or the server's local time, not necessarily your own timezone, which is a common source of jobs firing at an unexpected hour." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Confusing day-of-month and day-of-week fields — both can technically constrain the same run, and combining them without understanding the AND/OR interaction (most cron implementations treat them as OR when both are restricted) leads to unexpected extra runs.",
        "Forgetting that `*/15` style step values only start counting from the field's minimum (0), not from whatever time you deployed the job.",
        "Not accounting for server timezone, leading to jobs running at 2 AM local time instead of the intended hour.",
      ] },
    ],
    faq: [
      { question: "What does `*` mean in a cron expression?", answer: "It means \"every value\" for that field — e.g. `*` in the hour field means the job can run at any hour, subject to the other fields." },
      { question: "What timezone does cron use?", answer: "It depends on the system running it — often UTC or the server's local timezone, not necessarily yours. Always verify before relying on an exact run time." },
      { question: "How do I run a job every 15 minutes?", answer: "Use `*/15 * * * *` — the step value in the minute field runs the job at 0, 15, 30 and 45 minutes past each hour." },
      { question: "What happens if I set both day-of-month and day-of-week?", answer: "Most cron implementations treat this as an OR condition — the job runs if either field's condition is met, which can cause more frequent runs than expected if you intended an AND." },
    ],
  },
  {
    slug: "emi-calculator-explained-loan-amortization",
    title: "EMI Calculator Explained: How to Actually Read Your Loan Amortization",
    excerpt:
      "Your EMI stays the same every month, but what it actually pays off — interest vs principal — changes completely over the loan's life. Here's how to read that shift.",
    category: "business",
    author: "techtoolscenter-team",
    template: "guide",
    publishedOn: "2026-08-04",
    tags: ["emi", "loan", "amortization", "personal finance"],
    relatedTools: ["emi-calculator", "calculator-hub"],
    seoTitle: "EMI Calculator — Free, With Amortization Explained",
    seoDescription:
      "Understand how your EMI splits between interest and principal over a loan's life, and calculate your own EMI for free — no sign-up needed.",
    content: [
      { type: "p", text: "Your EMI (Equated Monthly Instalment) is a fixed number, but what it pays for underneath is not fixed at all. Early in a loan, the overwhelming majority of each EMI goes toward interest; only in the later years does most of it start reducing your actual principal. Understanding this shift changes how you think about prepayment and loan tenure." },
      { type: "h2", text: "Why interest dominates early payments" },
      { type: "p", text: "Interest is calculated on your outstanding principal balance, which is largest at the very start of the loan. So the first EMI's interest portion is calculated on close to the full loan amount, while the principal portion is small. As each EMI slightly reduces the outstanding balance, next month's interest is calculated on a slightly smaller number — so the interest portion shrinks and the principal portion grows, month over month, for the entire tenure." },
      { type: "h2", text: "What this means in practice" },
      { type: "ul", items: [
        "**Prepaying early saves far more interest** than prepaying the same amount later — because you're cutting into a larger outstanding balance sooner, which compounds savings over the remaining tenure.",
        "**A longer tenure isn't just \"smaller EMI\"** — it means a larger share of your total payments over the loan's life goes to interest, not principal.",
        "**Refinancing later in a loan's life often has less benefit** than doing it early, since a large share of the interest has already been paid.",
      ] },
      { type: "h2", text: "Step-by-step: calculate and understand your EMI" },
      { type: "ol", items: [
        "Open the EMI Calculator.",
        "Enter your loan amount, interest rate, and tenure.",
        "Check the EMI amount, plus the total interest you'll pay over the full tenure — this total is often larger than people expect.",
        "If available, review the month-by-month or year-by-year breakdown to see how the interest/principal split shifts over time.",
      ] },
      { type: "callout", text: "A useful gut check: for a typical long-tenure loan (20+ years) at a moderate interest rate, total interest paid over the full tenure can approach or exceed the original loan amount — which is exactly why even small prepayments made early save disproportionately more than the same amount paid later." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Choosing the longest tenure purely to minimise the monthly EMI, without accounting for the much higher total interest paid over the loan's life.",
        "Assuming a prepayment made in year 15 of a 20-year loan saves as much interest as one made in year 1 — it doesn't, because most of the interest on the early years has already been paid.",
        "Not checking whether a loan has a prepayment penalty before planning to pay it off early.",
      ] },
    ],
    faq: [
      { question: "Why does most of my EMI go to interest at the start?", answer: "Interest is calculated on your outstanding balance, which is largest early in the loan. As the balance reduces each month, the interest portion shrinks and the principal portion grows — this shift is called amortization." },
      { question: "Does prepaying a loan early save more than prepaying later?", answer: "Yes, generally — an early prepayment reduces the principal while the outstanding balance (and therefore future interest) is still largest, compounding the savings over the rest of the tenure." },
      { question: "Does a longer loan tenure always mean I pay more interest overall?", answer: "Usually yes — a longer tenure lowers the monthly EMI but increases the total interest paid over the full life of the loan, since interest keeps accruing on the outstanding balance for longer." },
      { question: "Is the EMI calculator's total interest figure accurate?", answer: "Yes, assuming the interest rate stays fixed for the full tenure as entered — for floating-rate loans, the actual total will vary if the rate changes over time." },
    ],
  },
  {
    slug: "ai-video-generators-what-they-do-free-options",
    title: "AI Video Generators: What They Actually Do (and Free Options)",
    excerpt:
      "Text-to-video tools have moved fast — here's what they're actually good at today, what still trips them up, and which ones offer a genuine free tier to try first.",
    category: "guides",
    author: "techtoolscenter-team",
    template: "listicle",
    publishedOn: "2026-08-04",
    tags: ["ai video", "text to video", "ai tools", "content creation"],
    relatedTools: ["ai-studio"],
    seoTitle: "Best Free AI Video Generators — What They Actually Do",
    seoDescription:
      "An honest look at what AI video generators can and can't do today, plus which tools (Runway, Pika, Luma AI and more) offer a real free tier to try.",
    content: [
      { type: "p", text: "AI video generators turn a text prompt (or a still image) into a short video clip — a few seconds of motion generated frame-by-frame by a model, rather than filmed or animated by hand. They've improved fast, but it's worth being clear-eyed about what they're actually good at right now versus what's still overhyped." },
      { type: "h2", text: "What they're genuinely good at today" },
      { type: "ul", items: [
        "Short (a few seconds), stylised or atmospheric clips — moody b-roll, abstract motion, simple scene transformations.",
        "Turning a still image into subtle motion (image-to-video) — often more reliable than pure text-to-video for a specific look you already have in mind.",
        "Rapid pre-visualisation — testing a shot concept before committing to real production.",
      ] },
      { type: "h2", text: "What still trips them up" },
      { type: "ul", items: [
        "Consistent characters or objects across multiple shots — most tools still struggle to keep a face or product looking identical clip to clip.",
        "Precise text or on-screen writing within the video — legible, accurate text rendering inside generated video is still unreliable across most tools.",
        "Complex physical interactions — multiple people, detailed hand movements, or physically accurate object interactions often look subtly wrong.",
      ] },
      { type: "h2", text: "Free options worth trying first" },
      { type: "ul", items: [
        "**Runway** — a general-purpose video generation and editing suite (Freemium) spanning text-to-video, image-to-video and video-to-video, aimed at filmmakers and creative teams.",
        "**Pika** — a text-to-video and image-to-video generator (Freemium) focused on quick, stylised short clips with prompt-driven camera and scene controls.",
        "**Luma AI** — another Freemium option worth comparing for image-to-video specifically.",
        "Note that some of the most talked-about models (like OpenAI's Sora) are paid-only, so check the pricing tier before assuming a specific tool is free to try.",
      ] },
      { type: "h2", text: "Step-by-step: try one before committing" },
      { type: "ol", items: [
        "Start with a free tier rather than a paid plan — most tools cap free generations, which is enough to judge quality for your use case.",
        "Test with a simple, realistic prompt close to what you'd actually use it for, not the flashiest demo prompt.",
        "Compare 2-3 tools on the same prompt — quality and style vary meaningfully between them for the same input.",
        "Check the tool's license terms for commercial use before using output in paid work.",
      ] },
      { type: "callout", text: "Pricing and free-tier limits change often in this space — always check a tool's official pricing page directly before assuming a specific free allowance, rather than relying on any single review (including this one) as the final word." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Judging a tool only by cherry-picked demo videos rather than testing it on your own actual use case.",
        "Assuming every AI video tool allows commercial use for free — check licensing terms, since some free tiers restrict output to personal or non-commercial use.",
        "Expecting perfectly consistent characters across a multi-shot sequence — this remains a genuine limitation across most tools today.",
      ] },
    ],
    faq: [
      { question: "Are AI video generators free to use?", answer: "Many offer a free tier with limited generations (Runway, Pika and Luma AI among them), though the most capable models are often paid-only or gate advanced features behind a subscription." },
      { question: "Can AI video generators keep a character consistent across multiple clips?", answer: "This remains one of the harder unsolved problems — most tools still struggle to keep a face, character or product looking identical across separate generated shots." },
      { question: "Can I use AI-generated video commercially?", answer: "It depends on the specific tool's license and pricing tier — some free tiers restrict output to personal use, so check the terms before using generated video in paid or commercial work." },
      { question: "What are AI video generators best used for right now?", answer: "Short, stylised clips, image-to-video motion, and rapid pre-visualisation of a shot concept — rather than long-form, dialogue-heavy, or highly precise commercial video work." },
    ],
  },
  {
    slug: "how-to-convert-currency-quick-manual-calculator",
    title: "How to Convert Currency Quickly Without a Live-Rate App",
    excerpt:
      "Don't need a live-tracking currency app for a one-off conversion? Here's when a simple manual-rate calculator is actually the faster, more private option.",
    category: "productivity",
    author: "techtoolscenter-team",
    template: "tutorial",
    publishedOn: "2026-08-04",
    tags: ["currency converter", "calculator", "travel", "productivity"],
    relatedTools: ["calculator-hub"],
    seoTitle: "Currency Converter Calculator — Free, Quick, No App Needed",
    seoDescription:
      "Convert currency quickly using today's rate — no app install, no account, no live-tracking needed. Free currency calculator for one-off conversions.",
    content: [
      { type: "p", text: "Most \"currency converter\" apps are built to track live, constantly-updating exchange rates — which is genuinely useful if you're actively trading currency, but overkill for a one-off conversion, like figuring out what a price tag actually costs in your home currency while travelling or shopping on a foreign site." },
      { type: "h2", text: "When a manual-rate calculator is actually better" },
      { type: "ul", items: [
        "**One-off conversions** — you just need \"what's ₹8,300 in dollars,\" not a live feed you'll check again in five minutes.",
        "**No app install or account** — a browser calculator works instantly, with nothing to sign up for or keep updated.",
        "**Works offline** — since it doesn't depend on a live rate feed, it works exactly the same with no internet connection, useful while travelling.",
        "**No rate-lookup delay** — if you already know the rate you want (e.g. your bank's specific rate, not the mid-market rate), a manual entry is faster than a live-rate app that only shows its own source.",
      ] },
      { type: "h2", text: "Step-by-step: convert currency manually" },
      { type: "ol", items: [
        "Open the Calculator Hub and switch to the Currency mode.",
        "Look up today's exchange rate from your bank, a card statement, or a quick web search — this calculator uses whatever rate you enter, not a live feed.",
        "Enter the amount and the rate (expressed as \"1 unit = ?\").",
        "Read the converted amount instantly.",
      ] },
      { type: "callout", text: "Because this calculator uses a rate you enter yourself, it's most accurate when you use the specific rate that applies to you — your card network's rate, or your bank's buy/sell rate — rather than the general \"mid-market\" rate quoted by news sites, which usually isn't the rate you'll actually be charged." },
      { type: "h2", text: "Common mistakes" },
      { type: "ul", items: [
        "Using a generic \"Google exchange rate\" when your card or bank applies a different rate plus a markup — check your card issuer's actual rate for an accurate estimate of what you'll be charged.",
        "Forgetting which currency is \"1 unit\" in the rate field — entering the rate backwards silently inverts the whole calculation.",
        "Assuming a manually entered rate stays accurate for future purchases — rates move, sometimes significantly, day to day.",
      ] },
    ],
    faq: [
      { question: "Does this currency calculator use live exchange rates?", answer: "No — it's a manual-rate calculator. You enter today's rate yourself (from your bank, card statement, or a quick search), which makes it fast, works offline, and lets you use the exact rate that applies to you rather than a generic quoted rate." },
      { question: "Why would I use a manual calculator instead of a live currency app?", answer: "For one-off conversions, a manual calculator is faster — no app install, no account, and no dependency on an internet connection. It's also more accurate if you already know your specific bank or card rate, which often differs from the generic mid-market rate." },
      { question: "What does \"1 unit = ?\" mean in the rate field?", answer: "It means how much of your target currency one unit of the source currency is worth — e.g. if 1 USD = 83.5 INR, you'd enter 83.5 to convert US dollars to Indian rupees." },
      { question: "Is my conversion data private?", answer: "Yes — the calculation happens entirely in your browser. Nothing is sent to a server." },
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
