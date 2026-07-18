"use client";

import BusinessStudio from "./business-studio";

// Dedicated Invoice Maker — same powerful editor, locked to invoices for a
// simple, focused experience (multiple designs, GST/CGST/SGST/IGST breakdown,
// logo, signature, QR, PDF/PNG/print).
export default function InvoiceMaker() {
  return <BusinessStudio lockKind="invoice" />;
}
