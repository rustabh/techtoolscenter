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
  Server, Blocks, Code, Database, HardDrive, GitBranch, Package, Component,
  Shapes, ChartColumn, FileStack, TestTube, Plug, Cloud, Activity, ShieldAlert,
  Workflow, GraduationCap, ScanLine, Camera, FileCode2, Atom, Layers, Wind,
  Feather, Zap, Boxes, Cpu, Terminal, FileJson, Grid3x3, Table2, Rows3,
  Columns3, Puzzle, LayoutTemplate, SquareCode, Gem, Star, GitFork, Github,
  Gitlab, FolderGit2, Container, Ship, Network, Router, Waypoints, Flame,
  DatabaseZap, HardDriveDownload, Brush, Film, PenTool, Lock, Newspaper,
  BadgeCheck, Video, FlaskConical, Beaker, Microscope, Bug, Webhook, Radar,
  Eye, MessageCircle, BookOpen, Book, Library, School, Compass, Map, Presentation,
  Mic, MicVocal, Users, Building2, HeartPulse, Box, FileSearch, Stethoscope,
  PenLine, MessagesSquare, Chrome, Monitor, Laptop, Handshake, ShoppingBag,
  Sparkle, Music2, Speech, CircleUserRound, UserRound, ClipboardList,
  ExternalLink, Lightbulb, Youtube, Stamp, RotateCw, ListOrdered, Smile, Shuffle,
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
  Server, Blocks, Code, Database, HardDrive, GitBranch, Package, Component,
  Shapes, ChartColumn, FileStack, TestTube, Plug, Cloud, Activity, ShieldAlert,
  Workflow, GraduationCap, ScanLine, Camera, FileCode2, Atom, Layers, Wind,
  Feather, Zap, Boxes, Cpu, Terminal, FileJson, Grid3x3, Table2, Rows3,
  Columns3, Puzzle, LayoutTemplate, SquareCode, Gem, Star, GitFork, Github,
  Gitlab, FolderGit2, Container, Ship, Network, Router, Waypoints, Flame,
  DatabaseZap, HardDriveDownload, Brush, Film, PenTool, Lock, Newspaper,
  BadgeCheck, Video, FlaskConical, Beaker, Microscope, Bug, Webhook, Radar,
  Eye, MessageCircle, BookOpen, Book, Library, School, Compass, Map, Presentation,
  Mic, MicVocal, Users, Building2, HeartPulse, Box, FileSearch, Stethoscope,
  PenLine, MessagesSquare, Chrome, Monitor, Laptop, Handshake, ShoppingBag,
  Sparkle, Music2, Speech, CircleUserRound, UserRound, ClipboardList,
  ExternalLink, Lightbulb, Youtube, Stamp, RotateCw, ListOrdered, Smile, Shuffle,
} as const;

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name as IconName] ?? Sparkles;
  return <Cmp {...props} />;
}
