"use client";

import BusinessStudio from "./business-studio";

// Dedicated Quotation Maker — same editor, locked to quotations for a simple,
// focused experience with multiple designs and full tax breakdown.
export default function QuotationGenerator() {
  return <BusinessStudio lockKind="quotation" />;
}
