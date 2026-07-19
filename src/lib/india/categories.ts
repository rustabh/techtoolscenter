import type { IndiaCategory } from "./types";

export const indiaCategories: IndiaCategory[] = [
  { slug: "identity-documents", name: "Identity Documents", description: "Aadhaar, PAN, Voter ID, Passport and other official IDs.", icon: "IdCard" },
  { slug: "certificates", name: "Certificates", description: "Birth, income, caste, domicile and marriage certificates.", icon: "ScrollText" },
  { slug: "business-tax", name: "Business & Tax", description: "GST, Udyam/MSME, company and income-tax services.", icon: "Briefcase" },
  { slug: "healthcare", name: "Healthcare", description: "ABHA health ID, Ayushman Bharat and health schemes.", icon: "HeartPulse" },
  { slug: "employment", name: "Employment", description: "EPFO/PF, eShram and labour registrations.", icon: "Users" },
  { slug: "education", name: "Education", description: "Scholarships and student services.", icon: "GraduationCap" },
  { slug: "vehicles", name: "Vehicles", description: "Driving licence, RC and transport services.", icon: "Car" },
  { slug: "banking", name: "Banking", description: "Jan Dhan, DBT and financial inclusion schemes.", icon: "Landmark" },
  { slug: "utilities", name: "Utilities", description: "Ration card, electricity and civic services.", icon: "Zap" },
  { slug: "agriculture", name: "Agriculture", description: "PM-Kisan and farmer welfare schemes.", icon: "Sprout" },
  { slug: "digital-india", name: "Digital India", description: "DigiLocker, UMANG and digital identity services.", icon: "Smartphone" },
  { slug: "state-services", name: "State Government Services", description: "State portals for certificates and welfare services.", icon: "MapPin" },
  { slug: "travel-immigration", name: "Travel & Immigration", description: "Passport, visa and travel documents.", icon: "Plane" },
  { slug: "government-portals", name: "Important Government Portals", description: "Key national portals and directories.", icon: "Building2" },
];

export function getIndiaCategory(slug: string): IndiaCategory | undefined {
  return indiaCategories.find((c) => c.slug === slug);
}
