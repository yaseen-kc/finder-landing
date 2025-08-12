export type MobileBottomNavKey = "home" | "categories" | "profile" | "cart";

export type MobileBottomNavItem = {
  key: MobileBottomNavKey;
  label: string;
  href: string;
};

export const MOBILE_BOTTOM_NAV_ITEMS: MobileBottomNavItem[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "categories", label: "Categories", href: "/product-list" },
  { key: "profile", label: "profile", href: "/profile" },
  { key: "cart", label: "Cart", href: "#cart" },
];

export const MOBILE_BOTTOM_NAV_ARIA = {
  NAV: "Mobile bottom navigation",
} as const;

