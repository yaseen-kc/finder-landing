export type Category = {
  id: string;
  title: string;
  items: string[];
  image?: string;
};

export type PopularSearch = {
  id: string;
  label: string;
  image: string;
};

export const NAV_CATEGORIES: Category[] = [
  {
    id: "knee-leg-braces",
    title: "Knee & Leg Braces",
    image:
      "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Knee+Brace+Neoprene/img3.jpg",
    items: [
      "Knee Support",
      "Double-Strap Neoprene",
      "Hinged Knee Brace",
      "Sports Knee Brace",
      "Sports Knee Support Brace",
    ],
  },
  {
    id: "wrist-supports",
    title: "Wrist Supports",
    image:
      "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Wrist+Binder/img4.jpg",
    items: [
      "Wrist Binder",
      "Wrist Wrap Support",
      "Wrist Compression Sleeve",
    ],
  },
  {
    id: "shoulder-supports",
    title: "Shoulder Supports",
    image:
      "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Shoulder+Support/img3.jpg",
    items: [
      "Neoprene Shoulder Support L Black",
    ],
  },
  {
    id: "calf-supports",
    title: "Calf Supports",
    image:
      "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Calf+Muscle+Support/img4.jpg",
    items: [
      "Calf Muscle Support",
    ],
  },
];


export const MOBILE_LEFT_RAIL_ITEMS: string[] = [
  "Combos",
  "Bestsellers",
  "New Launches",
  "Shop By Use case",
  "More",
];

// Header navigation labels and copy used by the header component
export const HEADER_NAV_LABELS = {
  CATEGORIES: "Categories",
  COMBOS: "Combos",
  BESTSELLERS: "Bestsellers",
  NEW_LAUNCHES: "New Launches",
  SHOP_BY_USECASE: "Shop By Usecase",
  MORE: "More",
  HELP: "Help",
} as const;

export const HEADER_STRINGS = {
  PLACEHOLDER_PREFIX: "This is a placeholder for the “",
  PLACEHOLDER_SUFFIX: "” menu.",
  LOGO_PRIMARY: "Finder",
  LOGO_SECONDARY: "Sports",
} as const;

export const HEADER_ARIA = {
  OPEN_MENU: "Open menu",
  CLOSE_MENU: "Close menu",
  SEARCH: "Search",
  ACCOUNT: "Account",
  CART: "Cart",
  SCROLL_LEFT: "Scroll left",
  SCROLL_RIGHT: "Scroll right",
} as const;

export const SEARCH_LABELS = {
  PLACEHOLDER: "Search for a product",
  POPULAR_TITLE: "Popular Searches",
} as const;

export const POPULAR_SEARCHES: PopularSearch[] = [
  {
    id: "knee-leg-braces",
    label: "Knee & Leg Braces",
    image: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Knee+Brace+Neoprene/img3.jpg",
  },
  {
    id: "wrist-braces",
    label: "Wrist Braces",
    image: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Wrist+Binder/img4.jpg",
  },
  {
    id: "shoulder-supports",
    label: "Shoulder Supports",
    image: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Shoulder+Support/img3.jpg",
  },
  {
    id: "calf-supports",
    label: "Calf Supports",
    image: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Calf+Muscle+Support/img4.jpg",
  },
  {
    id: "wrist-wraps",
    label: "Wrist Wraps",
    image: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Wrist+Wrap+Support/img8.jpg",
  },
];



