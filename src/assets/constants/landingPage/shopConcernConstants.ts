export type ShopConcern = {
  id: string;
  title: string;
  imageUrl: string;
  href?: string;
};

export const SHOP_CONCERNS: ShopConcern[] = [
  {
    id: "knee-pain",
    title: "Knee Pain",
    imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Knee+Support+Double+Strap+Protector/img1.jpg",
    href: "#",
  },
  {
    id: "wrist-pain",
    title: "Wrist Pain",
    imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Wrist+Binder/img1.jpg",
    href: "#",
  },
  {
    id: "shoulder-pain",
    title: "Shoulder Pain",
    imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Shoulder+Support/img1.jpg",
    href: "#",
  },
];

export const SHOP_CONCERN_STRINGS = {
  SECTION_TITLE: "Shop By Concern",
} as const;

