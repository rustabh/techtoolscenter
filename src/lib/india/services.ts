import type { IndiaService } from "./types";

/**
 * India Services registry — an educational, navigation-only directory.
 * TechToolsCenter does NOT provide these services, collect applications or take
 * payments. Every entry links out to the official government website.
 * Fees/timelines are included only where publicly/officially published.
 */
export const indiaServices: IndiaService[] = [
  /* ---------------- Identity Documents ---------------- */
  {
    slug: "aadhaar-card",
    name: "Aadhaar Card",
    category: "identity-documents",
    officialName: "UIDAI (Unique Identification Authority of India)",
    officialUrl: "https://uidai.gov.in",
    overview:
      "Aadhaar is a 12-digit unique identity number issued by UIDAI to residents of India. It is used as proof of identity and address for a wide range of services. New enrolment is done at an Aadhaar centre; most updates (address, mobile, email, name, etc.) can be started online on the official UIDAI portal.",
    documents: ["Proof of identity (e.g. passport, PAN, voter ID)", "Proof of address (e.g. bank statement, utility bill)", "Proof of date of birth (for some updates)", "Existing Aadhaar number (for updates)"],
    eligibility: ["Any resident of India, including infants and children", "NRIs with a valid Indian passport"],
    steps: [
      "Visit the official UIDAI portal (uidai.gov.in).",
      "For new enrolment, locate the nearest Aadhaar Seva Kendra and book an appointment.",
      "For updates, sign in with your Aadhaar number and OTP.",
      "Choose what to update (address, mobile, name, etc.) and upload supporting documents.",
      "Submit and note your Update Request Number (URN) to track status.",
    ],
    fees: "Document update: ₹50 (online/at centre); biometric update: ₹100 (as published by UIDAI). New enrolment is free.",
    processingTime: "Updates are typically processed within about 30 days (per UIDAI).",
    faq: [
      { question: "How do I update my Aadhaar address online?", answer: "Sign in on uidai.gov.in with your Aadhaar and OTP, choose 'Update Address', upload a valid address proof, and submit. You'll get a URN to track it." },
      { question: "I lost my Aadhaar — how do I get it again?", answer: "Use the 'Retrieve Aadhaar/EID' option on uidai.gov.in with your registered mobile, or download your e-Aadhaar after verifying via OTP." },
      { question: "Is Aadhaar enrolment free?", answer: "Yes, first-time enrolment is free. Updates carry a small official fee." },
    ],
    mistakes: ["Uploading blurry or unaccepted documents", "Not keeping the mobile number linked/active for OTP", "Sharing your Aadhaar OTP with anyone"],
    relatedServices: ["pan-card", "voter-id", "digilocker"],
    relatedTools: ["image-compressor-for-aadhar-card", "image-compressor", "image-resizer", "pdf-compress"],
    keywords: ["aadhaar", "aadhar card", "uidai", "aadhaar update", "aadhaar address change", "lost aadhaar", "e-aadhaar"],
    popular: true,
    updatedOn: "2026-07-18",
  },
  {
    slug: "pan-card",
    name: "PAN Card",
    category: "identity-documents",
    officialName: "Income Tax Department (via Protean/UTIITSL)",
    officialUrl: "https://www.incometax.gov.in",
    overview:
      "PAN (Permanent Account Number) is a 10-character alphanumeric identifier issued by the Income Tax Department, required for filing taxes and many financial transactions. You can apply for a new PAN, get an instant e-PAN using Aadhaar, or make corrections online.",
    documents: ["Aadhaar (for instant e-PAN)", "Proof of identity", "Proof of address", "Proof of date of birth", "Passport-size photograph (for physical card)"],
    eligibility: ["Indian citizens and entities", "Foreign citizens/entities with taxable income in India"],
    steps: [
      "Go to the official Income Tax e-filing portal (incometax.gov.in).",
      "For instant e-PAN, choose 'Instant e-PAN' and verify via Aadhaar OTP.",
      "For a new PAN or correction, apply via the authorised agencies (Protean/NSDL or UTIITSL).",
      "Fill in your details, upload documents and pay the fee (if applicable).",
      "Track the application with your acknowledgement number.",
    ],
    fees: "Instant e-PAN via Aadhaar is free. Physical PAN application fees are published by Protean/UTIITSL.",
    processingTime: "Instant e-PAN: within minutes. Physical PAN: usually around 15 working days.",
    faq: [
      { question: "Can I get a PAN card for free?", answer: "Yes — the Instant e-PAN service on the Income Tax portal issues a PDF e-PAN free of cost using your Aadhaar." },
      { question: "How do I correct my name/DOB on PAN?", answer: "Use the 'Changes/Correction in PAN' application via Protean (NSDL) or UTIITSL and upload supporting proof." },
      { question: "Is a photo needed for e-PAN?", answer: "No, the instant e-PAN uses your Aadhaar details. A photo is needed only for a physical card application." },
    ],
    mistakes: ["Applying on unofficial third-party sites that charge extra", "Mismatched name/DOB between PAN and Aadhaar", "Uploading an oversized photo/signature that gets rejected"],
    relatedServices: ["aadhaar-card", "itr-filing", "gst-registration"],
    relatedTools: ["image-compressor-for-pan-card", "image-compressor", "image-resizer", "pdf-compress"],
    keywords: ["pan card", "pan", "instant e-pan", "pan correction", "income tax pan", "apply pan"],
    popular: true,
    updatedOn: "2026-07-18",
  },
  {
    slug: "voter-id",
    name: "Voter ID (EPIC)",
    category: "identity-documents",
    officialName: "Election Commission of India",
    officialUrl: "https://voters.eci.gov.in",
    overview:
      "The Voter ID (EPIC) lets eligible citizens vote and serves as identity/address proof. New registration, corrections and address transfers are handled online through the Election Commission's Voter Services Portal.",
    documents: ["Proof of age", "Proof of address", "Passport-size photograph", "Aadhaar (for linking, optional)"],
    eligibility: ["Indian citizen aged 18 years or above on the qualifying date", "Ordinarily resident of the constituency"],
    steps: [
      "Visit the official Voter Services Portal (voters.eci.gov.in).",
      "Register/sign in with your mobile number.",
      "For new voters, fill Form 6; for corrections, Form 8.",
      "Upload your photo and supporting documents.",
      "Submit and track your application reference number.",
    ],
    faq: [
      { question: "How do I check if my name is on the voter list?", answer: "Use the 'Search in Electoral Roll' option on voters.eci.gov.in with your details or EPIC number." },
      { question: "Can I change my address on Voter ID?", answer: "Yes, use Form 8 on the portal to update address within or across constituencies." },
    ],
    mistakes: ["Submitting a photo that doesn't meet specifications", "Duplicate applications while one is already in process"],
    relatedServices: ["aadhaar-card", "pan-card"],
    relatedTools: ["image-compressor", "image-resizer", "image-converter"],
    keywords: ["voter id", "epic", "voter registration", "electoral roll", "form 6", "election commission"],
    updatedOn: "2026-07-18",
  },
  {
    slug: "passport",
    name: "Passport",
    category: "travel-immigration",
    officialName: "Passport Seva, Ministry of External Affairs",
    officialUrl: "https://www.passportindia.gov.in",
    overview:
      "An Indian passport is issued by the Ministry of External Affairs through Passport Seva. You apply online, book an appointment at a Passport Seva Kendra (PSK) or Post Office PSK, and complete document verification in person.",
    documents: ["Proof of address (e.g. Aadhaar, utility bill)", "Proof of date of birth (e.g. birth certificate, PAN)", "Identity proof", "Recent passport-size photographs (as per specs)"],
    eligibility: ["Indian citizens", "Minors (with parents' documents and consent)"],
    steps: [
      "Register on the official Passport Seva portal (passportindia.gov.in).",
      "Fill the application form for Fresh/Reissue.",
      "Pay the fee online and book a PSK appointment.",
      "Visit the PSK with original documents for verification.",
      "Track your application and police verification status online.",
    ],
    fees: "Fees vary by booklet type and pages and are shown on the Passport Seva portal during payment.",
    processingTime: "Varies; Tatkaal is faster. Timelines and police verification depend on your case.",
    faq: [
      { question: "What photo size is needed for a passport?", answer: "Follow the exact specification shown on the Passport Seva portal. You can prepare a compliant photo before your appointment." },
      { question: "Can I reschedule my PSK appointment?", answer: "Yes, the portal allows a limited number of appointment reschedules." },
    ],
    mistakes: ["Name/DOB mismatch across documents", "Carrying photocopies instead of originals to the PSK", "Uploading a non-compliant photograph"],
    relatedServices: ["aadhaar-card", "pan-card", "birth-certificate"],
    relatedTools: ["image-compressor-for-passport-photo", "resize-image-for-passport", "image-compressor", "pdf-compress"],
    keywords: ["passport", "passport seva", "apply passport", "passport renewal", "psk appointment", "tatkaal passport"],
    popular: true,
    updatedOn: "2026-07-18",
  },

  /* ---------------- Certificates ---------------- */
  {
    slug: "birth-certificate",
    name: "Birth Certificate",
    category: "certificates",
    officialName: "Civil Registration System (crsorgi.gov.in) / State portals",
    officialUrl: "https://crsorgi.gov.in",
    overview:
      "A birth certificate is an essential legal document registering a birth. Registration is done through the Civil Registration System or your State/municipal portal. Recent births can be registered online in many states; older records are obtained from the local registrar.",
    documents: ["Hospital/institution birth proof", "Parents' identity and address proof", "Application form as per state"],
    eligibility: ["Any registered birth in India", "Applications by parents/guardians"],
    steps: [
      "Visit the Civil Registration System portal (crsorgi.gov.in) or your state/municipal portal.",
      "Register and select 'Birth' registration/certificate.",
      "Enter the birth details and upload supporting documents.",
      "Submit to the local registrar for verification.",
      "Download or collect the certificate once approved.",
    ],
    faq: [
      { question: "Where do I apply for a birth certificate?", answer: "Through the Civil Registration System (crsorgi.gov.in) or your state/municipal corporation portal, depending on where the birth occurred." },
      { question: "Can I get an old birth certificate?", answer: "Yes, contact the local registrar/municipal office where the birth was registered; some states offer online records." },
    ],
    mistakes: ["Applying on the wrong state portal", "Spelling mismatches with hospital records"],
    relatedServices: ["income-certificate", "aadhaar-card"],
    relatedTools: ["pdf-compress", "image-compressor", "image-converter"],
    keywords: ["birth certificate", "crs", "birth registration", "municipal certificate"],
    updatedOn: "2026-07-18",
  },
  {
    slug: "income-certificate",
    name: "Income Certificate",
    category: "certificates",
    officialName: "State Government e-District portals",
    officialUrl: "https://services.india.gov.in",
    overview:
      "An income certificate certifies a family's annual income and is issued by the respective State Government (usually via the e-District/Revenue portal). It is commonly required for scholarships, reservations and welfare schemes.",
    documents: ["Identity proof", "Address proof", "Income proof (salary slip / self-declaration as required)", "Ration card (in some states)"],
    eligibility: ["Residents of the issuing state", "As per state-specific rules"],
    steps: [
      "Find your State's e-District/Revenue portal (linked from the National Services directory).",
      "Register and select 'Income Certificate'.",
      "Fill the application and upload supporting documents.",
      "Submit to the Tehsildar/Revenue office for verification.",
      "Download the digitally-signed certificate once issued.",
    ],
    faq: [
      { question: "Which portal issues an income certificate?", answer: "It's issued by your State Government's e-District/Revenue portal — the exact site depends on your state." },
      { question: "How long is an income certificate valid?", answer: "Validity is state-specific, often up to one financial year." },
    ],
    mistakes: ["Using another state's portal", "Declaring inconsistent income figures"],
    relatedServices: ["caste-certificate", "scholarship"],
    relatedTools: ["pdf-compress", "image-compressor"],
    keywords: ["income certificate", "e-district", "revenue certificate", "annual income proof"],
    updatedOn: "2026-07-18",
  },
  {
    slug: "caste-certificate",
    name: "Caste Certificate",
    category: "certificates",
    officialName: "State Government e-District portals",
    officialUrl: "https://services.india.gov.in",
    overview:
      "A caste certificate certifies a person's community (SC/ST/OBC) and is issued by the State Government. It is required for reservations in education, jobs and welfare schemes. Apply through your state's e-District/Revenue portal.",
    documents: ["Identity and address proof", "Proof of caste (family records/parent's certificate)", "Ration card / school records (as required)"],
    eligibility: ["Applicants belonging to a notified community", "As per state rules"],
    steps: [
      "Open your State's e-District/Revenue portal.",
      "Register and select 'Caste Certificate'.",
      "Fill details and upload proof of community.",
      "Submit for verification by the Revenue authority.",
      "Download the issued certificate.",
    ],
    faq: [
      { question: "Is the caste certificate valid across states?", answer: "It is issued by your home state; use in another state may need re-verification per rules." },
    ],
    mistakes: ["Missing parental/ancestral proof", "Applying in the wrong jurisdiction"],
    relatedServices: ["income-certificate", "scholarship"],
    relatedTools: ["pdf-compress", "image-compressor"],
    keywords: ["caste certificate", "sc st obc certificate", "community certificate", "reservation certificate"],
    updatedOn: "2026-07-18",
  },

  /* ---------------- Business & Tax ---------------- */
  {
    slug: "gst-registration",
    name: "GST Registration",
    category: "business-tax",
    officialName: "Goods and Services Tax Network (GSTN)",
    officialUrl: "https://www.gst.gov.in",
    overview:
      "GST registration is required for businesses crossing the prescribed turnover threshold or making inter-state supplies. Registration is done free of cost on the official GST portal and issues a GSTIN.",
    documents: ["PAN of the business/proprietor", "Aadhaar", "Proof of business address", "Bank account details", "Photograph and constitution proof (partnership deed/COI as applicable)"],
    eligibility: ["Businesses above the turnover threshold", "Inter-state suppliers, e-commerce sellers and others as specified"],
    steps: [
      "Go to the official GST portal (gst.gov.in) and start a New Registration.",
      "Complete Part A with PAN, mobile and email (OTP verified).",
      "Fill Part B with business details and upload documents.",
      "Complete Aadhaar authentication.",
      "Track the ARN; on approval, download your GST certificate with GSTIN.",
    ],
    fees: "GST registration on the official portal is free of cost.",
    processingTime: "Usually processed within about 7 working days (subject to verification).",
    faq: [
      { question: "Is GST registration free?", answer: "Yes, registration on the official gst.gov.in portal is free. Third-party agents may charge a service fee." },
      { question: "Do I need GST for a small business?", answer: "Only if you cross the turnover threshold or fall under a category that mandates registration (e.g. inter-state supply, e-commerce)." },
    ],
    mistakes: ["Entering a business name that doesn't match PAN", "Skipping Aadhaar authentication", "Uploading unclear address proof"],
    relatedServices: ["msme-udyam", "itr-filing", "pan-card"],
    relatedTools: ["invoice-maker", "gst-calculator", "pdf-compress"],
    relatedBlog: ["how-to-create-gst-invoice-online-free"],
    keywords: ["gst registration", "gstin", "gst number", "register gst", "gst portal"],
    popular: true,
    updatedOn: "2026-07-18",
  },
  {
    slug: "msme-udyam",
    name: "Udyam (MSME) Registration",
    category: "business-tax",
    officialName: "Ministry of MSME",
    officialUrl: "https://udyamregistration.gov.in",
    overview:
      "Udyam Registration is the official recognition for Micro, Small and Medium Enterprises (MSMEs). It is free, paperless and based on self-declaration using Aadhaar and PAN, and unlocks various government benefits and schemes.",
    documents: ["Aadhaar of the proprietor/authorised signatory", "PAN", "Business/bank details (self-declared)"],
    eligibility: ["Micro, small or medium enterprises as per the official investment/turnover criteria"],
    steps: [
      "Visit the official Udyam portal (udyamregistration.gov.in).",
      "Choose 'New Registration' and verify with Aadhaar OTP.",
      "Enter PAN and validate.",
      "Fill business details (self-declared) and submit.",
      "Download your Udyam Registration Certificate with its unique number.",
    ],
    fees: "Udyam registration is completely free on the official portal.",
    faq: [
      { question: "Is there any fee for Udyam registration?", answer: "No. The official Udyam portal charges nothing. Beware of third-party sites asking for fees." },
      { question: "Do I need documents to upload?", answer: "No uploads are needed — it's based on self-declaration with Aadhaar and PAN." },
    ],
    mistakes: ["Paying a third-party site for a free service", "Aadhaar/PAN mismatch"],
    relatedServices: ["gst-registration", "itr-filing"],
    relatedTools: ["invoice-maker", "quotation-generator", "brand-kit-generator"],
    keywords: ["udyam", "msme registration", "udyam aadhaar", "msme certificate", "small business registration"],
    updatedOn: "2026-07-18",
  },
  {
    slug: "itr-filing",
    name: "Income Tax Return (ITR) Filing",
    category: "business-tax",
    officialName: "Income Tax Department",
    officialUrl: "https://www.incometax.gov.in",
    overview:
      "Filing an Income Tax Return (ITR) reports your income and taxes for a financial year. Individuals and businesses file directly on the official Income Tax e-filing portal, often using pre-filled data.",
    documents: ["PAN and Aadhaar (linked)", "Form 16 / salary details", "Bank interest and investment proofs", "Details of other income and deductions"],
    eligibility: ["Anyone with taxable income or meeting mandatory filing conditions"],
    steps: [
      "Log in to the official e-filing portal (incometax.gov.in).",
      "Select the correct ITR form for your income type.",
      "Review pre-filled data and add income/deduction details.",
      "Verify tax computation and submit.",
      "e-Verify the return (via Aadhaar OTP, net banking, etc.).",
    ],
    faq: [
      { question: "Which ITR form should I use?", answer: "It depends on your income sources; the portal guides you, or consult a tax professional." },
      { question: "Is e-verification mandatory?", answer: "Yes — your return must be verified (ideally e-verified) for it to be processed." },
    ],
    mistakes: ["Missing the filing due date", "Not e-verifying after submission", "PAN–Aadhaar not linked"],
    relatedServices: ["pan-card", "gst-registration"],
    relatedTools: ["gst-calculator", "percentage-calculator", "pdf-compress"],
    keywords: ["itr", "income tax return", "file itr", "e-filing", "tax filing"],
    updatedOn: "2026-07-18",
  },

  /* ---------------- Healthcare ---------------- */
  {
    slug: "abha-health-id",
    name: "ABHA Health ID",
    category: "healthcare",
    officialName: "Ayushman Bharat Digital Mission (ABDM)",
    officialUrl: "https://abha.abdm.gov.in",
    overview:
      "ABHA (Ayushman Bharat Health Account) is a unique health ID under the Ayushman Bharat Digital Mission that lets you link and access your health records digitally. Creating an ABHA number is free using Aadhaar or a mobile number.",
    documents: ["Aadhaar or a driving licence", "Mobile number for OTP"],
    eligibility: ["Any Indian resident"],
    steps: [
      "Visit the official ABHA portal (abha.abdm.gov.in).",
      "Choose to create ABHA using Aadhaar or mobile.",
      "Verify with OTP.",
      "Complete your profile and note your 14-digit ABHA number.",
      "Link your health records via ABDM-enabled facilities.",
    ],
    fees: "Creating an ABHA number is free.",
    faq: [
      { question: "Is ABHA mandatory?", answer: "No, it's voluntary. It simply makes managing your digital health records easier." },
      { question: "Can I create ABHA without Aadhaar?", answer: "Yes, you can create it using your mobile number as well." },
    ],
    mistakes: ["Sharing your ABHA OTP", "Creating multiple ABHA numbers"],
    relatedServices: ["ayushman-bharat", "digilocker"],
    relatedTools: ["image-compressor", "pdf-compress"],
    keywords: ["abha", "health id", "abdm", "ayushman bharat health account", "digital health id"],
    updatedOn: "2026-07-18",
  },
  {
    slug: "ayushman-bharat",
    name: "Ayushman Bharat (PM-JAY)",
    category: "healthcare",
    officialName: "National Health Authority (PM-JAY)",
    officialUrl: "https://pmjay.gov.in",
    overview:
      "Ayushman Bharat PM-JAY provides health cover for eligible families at empanelled hospitals. You can check eligibility and find your Ayushman card details through the official PM-JAY/beneficiary portal.",
    documents: ["Aadhaar / ration card for verification", "Mobile number"],
    eligibility: ["Families identified as eligible per the official beneficiary database (SECC/added categories)"],
    steps: [
      "Visit the official PM-JAY portal (pmjay.gov.in).",
      "Use 'Am I Eligible' to check your status.",
      "Verify identity via OTP.",
      "Locate an empanelled hospital for cashless treatment.",
      "Get your Ayushman card via the official beneficiary portal.",
    ],
    faq: [
      { question: "How do I check Ayushman Bharat eligibility?", answer: "Use the 'Am I Eligible' tool on the official pmjay.gov.in portal with your mobile number." },
      { question: "Is treatment cashless?", answer: "Yes, eligible beneficiaries receive cashless treatment at empanelled hospitals up to the scheme limit." },
    ],
    mistakes: ["Relying on unofficial 'card makers'", "Not verifying the hospital is empanelled"],
    relatedServices: ["abha-health-id"],
    relatedTools: ["image-compressor", "pdf-compress"],
    keywords: ["ayushman bharat", "pmjay", "ayushman card", "health insurance scheme", "golden card"],
    popular: true,
    updatedOn: "2026-07-18",
  },

  /* ---------------- Employment ---------------- */
  {
    slug: "epfo",
    name: "EPFO / Provident Fund (PF)",
    category: "employment",
    officialName: "Employees' Provident Fund Organisation",
    officialUrl: "https://www.epfindia.gov.in",
    overview:
      "EPFO manages the Provident Fund for salaried employees. Using your UAN (Universal Account Number) on the member portal, you can check your PF balance, update KYC, and file transfer or withdrawal claims.",
    documents: ["UAN (Universal Account Number)", "Aadhaar, PAN and bank details linked to UAN"],
    eligibility: ["Salaried employees covered under EPF"],
    steps: [
      "Visit the official EPFO member portal (linked from epfindia.gov.in).",
      "Activate/sign in with your UAN and password.",
      "Complete KYC (Aadhaar, PAN, bank) and get it verified by the employer.",
      "Use online services to view passbook, transfer or claim.",
      "Track your claim status online.",
    ],
    faq: [
      { question: "How do I check my PF balance?", answer: "Sign in to the EPFO member portal with your UAN, or use the official UMANG app / passbook service." },
      { question: "How do I withdraw PF online?", answer: "With a KYC-verified UAN, file a claim (Form 19/10C/31) on the member portal." },
    ],
    mistakes: ["Incomplete/unverified KYC", "Mismatched name across Aadhaar, PAN and bank"],
    relatedServices: ["eshram", "aadhaar-card"],
    relatedTools: ["emi-calculator", "percentage-calculator", "pdf-compress"],
    keywords: ["epfo", "pf", "provident fund", "uan", "pf balance", "pf withdrawal"],
    popular: true,
    updatedOn: "2026-07-18",
  },
  {
    slug: "eshram",
    name: "eShram Card",
    category: "employment",
    officialName: "Ministry of Labour & Employment",
    officialUrl: "https://eshram.gov.in",
    overview:
      "The eShram card registers unorganised-sector workers in a national database, giving them a Universal Account Number (UAN) and access to social-security benefits. Registration is free using Aadhaar.",
    documents: ["Aadhaar", "Mobile number linked to Aadhaar", "Bank account details"],
    eligibility: ["Unorganised-sector workers aged 16–59", "Not a member of EPFO/ESIC or an income-tax payer (as per scheme rules)"],
    steps: [
      "Visit the official eShram portal (eshram.gov.in).",
      "Choose 'Register on eShram' and verify with Aadhaar OTP.",
      "Fill in personal, occupation and bank details.",
      "Submit and download your eShram card with UAN.",
    ],
    fees: "Registration is free.",
    faq: [
      { question: "Who can register on eShram?", answer: "Unorganised workers such as construction workers, street vendors, domestic workers, farmers and more, within the eligible age and criteria." },
      { question: "Is there any fee?", answer: "No, eShram registration is free on the official portal." },
    ],
    mistakes: ["Mobile not linked to Aadhaar (OTP fails)", "Registering while ineligible (EPFO/ESIC member)"],
    relatedServices: ["epfo"],
    relatedTools: ["image-compressor", "pdf-compress"],
    keywords: ["eshram", "e-shram card", "unorganised worker", "labour card", "shram card"],
    updatedOn: "2026-07-18",
  },

  /* ---------------- Education ---------------- */
  {
    slug: "scholarship",
    name: "National Scholarship (NSP)",
    category: "education",
    officialName: "National Scholarship Portal",
    officialUrl: "https://scholarships.gov.in",
    overview:
      "The National Scholarship Portal (NSP) is a single platform for various central and state scholarship schemes for students. Students register, apply and track scholarships in one place.",
    documents: ["Aadhaar / enrolment ID", "Bank account details", "Income and caste certificates (as required)", "Previous marksheet and institution details"],
    eligibility: ["Students meeting the specific scheme criteria (income, category, course, etc.)"],
    steps: [
      "Visit the official National Scholarship Portal (scholarships.gov.in).",
      "Complete fresh registration with your details.",
      "Select the applicable scholarship scheme.",
      "Upload required documents and submit before the deadline.",
      "Track your application status on the portal.",
    ],
    faq: [
      { question: "Can I apply for multiple scholarships?", answer: "You typically apply for the scheme you're eligible for; the portal prevents duplicate/ineligible applications." },
      { question: "What if I miss the deadline?", answer: "Applications close on the published date; watch the NSP portal for each scheme's timeline." },
    ],
    mistakes: ["Wrong bank/IFSC details (payment fails)", "Uploading unclear certificates", "Missing the scheme deadline"],
    relatedServices: ["income-certificate", "caste-certificate"],
    relatedTools: ["image-compressor", "pdf-compress", "image-resizer"],
    keywords: ["scholarship", "nsp", "national scholarship portal", "student scholarship", "scholarships.gov.in"],
    updatedOn: "2026-07-18",
  },

  /* ---------------- Vehicles ---------------- */
  {
    slug: "driving-licence",
    name: "Driving Licence",
    category: "vehicles",
    officialName: "Parivahan Sewa (Ministry of Road Transport & Highways)",
    officialUrl: "https://sarathi.parivahan.gov.in",
    overview:
      "Driving licence services — learner's licence, permanent licence, renewal and address change — are handled on the official Sarathi (Parivahan) portal, along with an RTO test where required.",
    documents: ["Proof of age and address", "Passport-size photographs", "Learner's licence (for permanent DL)", "Medical certificate (where applicable)"],
    eligibility: ["Minimum age as per licence type", "Passing the applicable test"],
    steps: [
      "Visit the official Sarathi portal (sarathi.parivahan.gov.in) and select your state.",
      "Apply for Learner's Licence and take the online test.",
      "After the mandatory period, apply for the Permanent Licence.",
      "Book a slot and pass the driving test at the RTO.",
      "Track and download your licence status online.",
    ],
    fees: "Fees are shown on the Parivahan portal during payment.",
    faq: [
      { question: "How do I get a learner's licence?", answer: "Apply on the Sarathi portal, upload documents, pay the fee and take the online learner's test." },
      { question: "Can I renew my DL online?", answer: "Yes, renewal and address change can be initiated on the Parivahan/Sarathi portal." },
    ],
    mistakes: ["Selecting the wrong state on Parivahan", "Non-compliant photo/signature uploads", "Booking the RTO test before eligibility"],
    relatedServices: ["vehicle-rc", "aadhaar-card"],
    relatedTools: ["image-compressor-for-passport-photo", "image-studio", "pdf-merge", "image-compressor"],
    keywords: ["driving licence", "learner licence", "dl", "sarathi", "parivahan", "dl renewal"],
    popular: true,
    updatedOn: "2026-07-18",
  },
  {
    slug: "vehicle-rc",
    name: "Vehicle RC Services",
    category: "vehicles",
    officialName: "Parivahan Sewa (VAHAN)",
    officialUrl: "https://vahan.parivahan.gov.in",
    overview:
      "Vehicle Registration Certificate (RC) services — new registration, ownership transfer, address change, duplicate RC and more — are available on the official VAHAN (Parivahan) portal.",
    documents: ["Proof of identity and address", "Insurance and PUC (as required)", "Existing RC (for transfers/updates)"],
    eligibility: ["Registered vehicle owners", "As per RTO rules"],
    steps: [
      "Visit the official VAHAN portal (vahan.parivahan.gov.in) and select your state/RTO.",
      "Choose the required RC service.",
      "Fill the form and upload documents.",
      "Pay the applicable fee.",
      "Track your application at the RTO.",
    ],
    faq: [
      { question: "How do I transfer vehicle ownership?", answer: "Use the ownership transfer service on the VAHAN portal with the RC, insurance and required documents." },
    ],
    mistakes: ["Wrong RTO selection", "Expired insurance/PUC at time of service"],
    relatedServices: ["driving-licence"],
    relatedTools: ["pdf-merge", "pdf-compress", "image-compressor"],
    keywords: ["rc", "vehicle registration", "vahan", "rc transfer", "duplicate rc", "parivahan"],
    updatedOn: "2026-07-18",
  },

  /* ---------------- Agriculture ---------------- */
  {
    slug: "pm-kisan",
    name: "PM-KISAN",
    category: "agriculture",
    officialName: "Ministry of Agriculture & Farmers Welfare",
    officialUrl: "https://pmkisan.gov.in",
    overview:
      "PM-KISAN provides income support to eligible landholding farmer families. Farmers can register, complete e-KYC and check beneficiary status on the official PM-KISAN portal.",
    documents: ["Aadhaar", "Land records", "Bank account details"],
    eligibility: ["Landholding farmer families as per scheme rules (with certain exclusions)"],
    steps: [
      "Visit the official PM-KISAN portal (pmkisan.gov.in).",
      "Use 'New Farmer Registration'.",
      "Complete e-KYC (Aadhaar OTP).",
      "Enter land and bank details.",
      "Check 'Beneficiary Status' to track instalments.",
    ],
    faq: [
      { question: "How do I check PM-KISAN status?", answer: "Use 'Beneficiary Status' on the official pmkisan.gov.in portal with your registered number/Aadhaar." },
      { question: "Is e-KYC mandatory?", answer: "Yes, e-KYC is required to receive instalments." },
    ],
    mistakes: ["Skipping e-KYC", "Incorrect bank/Aadhaar linkage"],
    relatedServices: ["aadhaar-card"],
    relatedTools: ["image-compressor", "pdf-compress"],
    keywords: ["pm kisan", "pm-kisan", "kisan samman nidhi", "farmer scheme", "pmkisan status"],
    updatedOn: "2026-07-18",
  },

  /* ---------------- Digital India ---------------- */
  {
    slug: "digilocker",
    name: "DigiLocker",
    category: "digital-india",
    officialName: "Ministry of Electronics & IT (MeitY)",
    officialUrl: "https://www.digilocker.gov.in",
    overview:
      "DigiLocker is a government platform to store and access digital documents (like Aadhaar, driving licence, marksheets and vehicle RC) issued by authorities. DigiLocker documents are legally at par with originals.",
    documents: ["Aadhaar / mobile number to create an account"],
    eligibility: ["Any Indian resident with a mobile number"],
    steps: [
      "Visit the official DigiLocker site (digilocker.gov.in) or app.",
      "Sign up using your mobile number and Aadhaar.",
      "Set a security PIN.",
      "Fetch issued documents from partner departments.",
      "Share or download verified documents when needed.",
    ],
    fees: "DigiLocker is free.",
    faq: [
      { question: "Are DigiLocker documents valid?", answer: "Yes, documents issued to DigiLocker are legally recognised at par with the physical originals." },
      { question: "Which documents can I fetch?", answer: "Aadhaar, PAN (verification), driving licence, RC, marksheets and more, from participating issuers." },
    ],
    mistakes: ["Sharing your DigiLocker PIN/OTP", "Using unofficial look-alike apps"],
    relatedServices: ["aadhaar-card", "driving-licence"],
    relatedTools: ["pdf-compress", "image-compressor", "image-converter"],
    keywords: ["digilocker", "digital documents", "digilocker aadhaar", "document wallet"],
    updatedOn: "2026-07-18",
  },
  {
    slug: "india-gov-portal",
    name: "National Government Services Portal",
    category: "government-portals",
    officialName: "National Portal of India",
    officialUrl: "https://www.india.gov.in",
    overview:
      "The National Portal of India is the official gateway to central and state government information and services. Use it to discover departments, schemes and official service links across India.",
    documents: [],
    eligibility: ["Open to everyone"],
    steps: [
      "Visit the official National Portal of India (india.gov.in).",
      "Browse services by category, ministry or state.",
      "Follow the official links to the relevant department's site.",
    ],
    faq: [
      { question: "What is india.gov.in?", answer: "It's the official National Portal of India — a single directory of government information and service links." },
    ],
    mistakes: ["Following unofficial mirror sites"],
    relatedServices: ["digilocker"],
    relatedTools: ["pdf-compress", "image-compressor"],
    keywords: ["national portal", "india.gov.in", "government services directory", "govt portals"],
    updatedOn: "2026-07-18",
  },
];

/* ---------------- helpers ---------------- */
export function getIndiaService(slug: string): IndiaService | undefined {
  return indiaServices.find((s) => s.slug === slug);
}
export function servicesByCategory(category: string): IndiaService[] {
  return indiaServices.filter((s) => s.category === category);
}
export function popularIndiaServices(): IndiaService[] {
  const p = indiaServices.filter((s) => s.popular);
  return p.length ? p : indiaServices.slice(0, 8);
}
export function relatedIndiaServices(service: IndiaService, limit = 4): IndiaService[] {
  const explicit = (service.relatedServices ?? []).map(getIndiaService).filter((s): s is IndiaService => !!s);
  const sameCat = servicesByCategory(service.category).filter((s) => s.slug !== service.slug);
  const seen = new Set<string>();
  return [...explicit, ...sameCat].filter((s) => (seen.has(s.slug) ? false : (seen.add(s.slug), true))).slice(0, limit);
}

/* Intent-aware search over services (problems, questions, use cases). */
const INDIA_INTENTS: { keys: string[]; slug: string }[] = [
  { keys: ["lost aadhaar", "aadhaar lost", "forgot aadhaar", "aadhaar number", "download aadhaar", "aadhaar address"], slug: "aadhaar-card" },
  { keys: ["need pan", "apply pan", "lost pan", "e-pan", "pan correction"], slug: "pan-card" },
  { keys: ["need passport", "apply passport", "passport renewal", "passport photo"], slug: "passport" },
  { keys: ["driving licence renewal", "learner licence", "apply dl", "driving license"], slug: "driving-licence" },
  { keys: ["rc transfer", "vehicle registration", "duplicate rc", "ownership transfer"], slug: "vehicle-rc" },
  { keys: ["income certificate"], slug: "income-certificate" },
  { keys: ["caste certificate", "community certificate", "obc certificate", "sc st certificate"], slug: "caste-certificate" },
  { keys: ["birth certificate", "birth registration"], slug: "birth-certificate" },
  { keys: ["gst registration", "gst number", "register gst", "gstin"], slug: "gst-registration" },
  { keys: ["msme", "udyam", "small business registration"], slug: "msme-udyam" },
  { keys: ["itr", "income tax return", "file tax"], slug: "itr-filing" },
  { keys: ["abha", "health id", "abdm"], slug: "abha-health-id" },
  { keys: ["ayushman", "pmjay", "health card", "golden card"], slug: "ayushman-bharat" },
  { keys: ["pf", "epfo", "provident fund", "pf balance", "pf withdrawal", "uan"], slug: "epfo" },
  { keys: ["eshram", "e-shram", "labour card", "unorganised worker"], slug: "eshram" },
  { keys: ["scholarship", "nsp", "student scholarship"], slug: "scholarship" },
  { keys: ["pm kisan", "kisan", "farmer scheme"], slug: "pm-kisan" },
  { keys: ["digilocker", "digital documents"], slug: "digilocker" },
  { keys: ["voter id", "voter registration", "epic"], slug: "voter-id" },
];

export interface IndiaSearchResult {
  slug: string;
  name: string;
  category: string;
}

export function searchIndiaServices(query: string, limit = 8): IndiaSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const seen = new Set<string>();
  const out: IndiaSearchResult[] = [];
  const add = (svc?: IndiaService) => {
    if (svc && !seen.has(svc.slug)) { seen.add(svc.slug); out.push({ slug: svc.slug, name: svc.name, category: svc.category }); }
  };
  for (const intent of INDIA_INTENTS) {
    if (intent.keys.some((k) => q.includes(k) || k.includes(q))) add(getIndiaService(intent.slug));
    if (out.length >= limit) break;
  }
  if (out.length < limit) {
    for (const s of indiaServices) {
      const hay = `${s.name} ${s.keywords.join(" ")} ${s.officialName}`.toLowerCase();
      if (hay.includes(q)) add(s);
      if (out.length >= limit) break;
    }
  }
  return out.slice(0, limit);
}
