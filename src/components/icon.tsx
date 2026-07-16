import {
  Briefcase, FileText, Sparkles, Type, Calculator, Image as ImageIcon,
  ReceiptText, FileSpreadsheet, Receipt, Percent, Wallet, FileUser,
  QrCode, Barcode, Cake, Landmark, CaseSensitive, KeyRound, ImageDown,
  FilePlus2, Scissors, FileArchive, type LucideProps,
} from "lucide-react";

const map = {
  Briefcase, FileText, Sparkles, Type, Calculator, Image: ImageIcon,
  ReceiptText, FileSpreadsheet, Receipt, Percent, Wallet, FileUser,
  QrCode, Barcode, Cake, Landmark, CaseSensitive, KeyRound, ImageDown,
  FilePlus2, Scissors, FileArchive,
} as const;

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name as IconName] ?? Sparkles;
  return <Cmp {...props} />;
}
