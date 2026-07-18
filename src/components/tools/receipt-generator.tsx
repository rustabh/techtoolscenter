"use client";

import BusinessStudio from "./business-studio";

// Dedicated Receipt Maker — same editor, locked to receipts for a simple,
// focused experience with multiple designs.
export default function ReceiptGenerator() {
  return <BusinessStudio lockKind="receipt" />;
}
