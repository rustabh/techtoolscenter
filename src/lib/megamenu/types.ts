export interface MegaMenuLink {
  label: string;
  href?: string;
  external?: boolean;
  comingSoon?: boolean;
  badge?: "New" | "Trending";
  description?: string;
  action?: "incinc";
}

export interface MegaMenuGroup {
  title?: string;
  items: MegaMenuLink[];
}

export interface MegaMenuColumn {
  title: string;
  icon: string;
  groups: MegaMenuGroup[];
}

export interface FeaturedCard {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  href?: string;
  action?: "incinc";
}

export interface MegaMenuConfig {
  id: string;
  label: string;
  href: string; // where clicking the nav item itself goes
  columns: MegaMenuColumn[];
  featured: FeaturedCard;
  quickAccess: MegaMenuLink[];
}
