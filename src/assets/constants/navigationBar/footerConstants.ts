export type FooterLink = {
  label: string;
  href: string;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export const COMPANY_NAME = "Finder Sports";
export const COMPANY_TAGLINE =
  "Comfort engineered for everyday performance.";

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Shop",
    links: [
      { label: "Knee & Leg Braces", href: "#" },
      { label: "Wrist Braces", href: "#" },
      { label: "Shoulder Supports", href: "#" },
      { label: "Calf Supports", href: "#" },
      { label: "Wrist Wraps", href: "#" },
      { label: "Hand & Wrist Braces", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Track Order", href: "#" },
      { label: "Warranty", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  },
];

export const FOOTER_BOTTOM_LINKS: FooterLink[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Sitemap", href: "#" },
];

export const COPYRIGHT_YEAR = new Date().getFullYear();

