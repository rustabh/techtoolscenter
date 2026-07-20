import {
  Briefcase, FileText, Sparkles, Type, Calculator, Image as ImageIcon,
  ReceiptText, FileSpreadsheet, Receipt, Percent, Wallet, FileUser,
  QrCode, Barcode, Cake, Landmark, CaseSensitive, KeyRound, ImageDown,
  FilePlus2, Scissors, FileArchive, Code2, Braces, Binary, Link2, AlignLeft,
  Pilcrow, Link as LinkIcon, Fingerprint, Hash, Palette, Clock, Scale, Tag,
  AppWindow, Wand2, MonitorSmartphone, Smartphone, Share2,
  Mail, ListTree, Sigma, Tags, Bot, Search, Gauge, Blend, CalendarClock, GitCompare, Rocket,
  ArrowLeftRight, Coins, Fuel, Asterisk, FlipHorizontal, Replace, Eraser, Dices, Timer,
  StickyNote, Contrast, Ruler, LayoutGrid,
  Globe, Wrench, Megaphone, ShieldCheck, Settings, Languages, Award, FolderCheck,
  type LucideProps,
} from "lucide-react";

const map = {
  Briefcase, FileText, Sparkles, Type, Calculator, Image: ImageIcon,
  ReceiptText, FileSpreadsheet, Receipt, Percent, Wallet, FileUser,
  QrCode, Barcode, Cake, Landmark, CaseSensitive, KeyRound, ImageDown,
  FilePlus2, Scissors, FileArchive, Code2, Braces, Binary, Link2, AlignLeft,
  Pilcrow, Link: LinkIcon, Fingerprint, Hash, Palette, Clock, Scale, Tag,
  AppWindow, Wand2, MonitorSmartphone, Smartphone, Share2,
  Mail, ListTree, Sigma, Tags, Bot, Search, Gauge, Blend, CalendarClock, GitCompare, Rocket,
  ArrowLeftRight, Coins, Fuel, Asterisk, FlipHorizontal, Replace, Eraser, Dices, Timer,
  StickyNote, Contrast, Ruler, LayoutGrid,
  Globe, Wrench, Megaphone, ShieldCheck, Settings, Languages, Award, FolderCheck,
} as const;

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name as IconName] ?? Sparkles;
  return <Cmp {...props} />;
}
