export type BestSellerItem = {
  id: string;
  title: string;
  imageUrl: string;
  isHotSelling?: boolean;
  rating: number; // e.g., 4.78
  reviewCount: number; // total reviews count
  oldPrice: number; // in INR paise not required; store as whole rupees
  price: number; // current price
  discountPercent?: number; // if omitted, will be computed from prices
};

export const BEST_SELLERS: BestSellerItem[] = [
  {
    id: "finder-knee-support-men-women",
    title: "Knee Support for Men & Women",
    imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Knee+Support+Double+Strap+Protector/img2.jpg",
    isHotSelling: true,
    rating: 4.8,
    reviewCount: 120,
    oldPrice: 1899,
    price: 1475,
    discountPercent: 22,
  },
  {
    id: "finder-wrist-binder-men-women",
    title: "Wrist Binder for Men & Women",
    imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder%20Wrist%20Binder/img1.jpg",
    rating: 4.7,
    reviewCount: 85,
    oldPrice: 1599,
    price: 1299,
    discountPercent: 19,
  },
  {
    id: "finder-support-protector-adjustable-neoprene",
    title: "Adjustable Double-Strap Neoprene Knee Support",
    imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Knee+Support+Double+Strap+Protector/img2.jpg",
    rating: 4.75,
    reviewCount: 95,
    oldPrice: 1799,
    price: 1399,
    discountPercent: 22,
  },
  {
    id: "finder-shoulder-support",
    title: "Neoprene Shoulder Support L Black",
    imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Shoulder+Support/img1.jpg",
    isHotSelling: true,
    rating: 4.6,
    reviewCount: 60,
    oldPrice: 2499,
    price: 1899,
    discountPercent: 24,
  },
  {
    id: "finder-knee-brace-ligament-meniscus",
    title: "Hinged Knee Brace",
    imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Shoulder+Support/img3.jpg",
    rating: 4.82,
    reviewCount: 150,
    oldPrice: 2999,
    price: 2399,
    discountPercent: 20,
  },
  {
    id: "finder-calf-muscle-support",
    title: "Calf Muscle Support",
    imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Calf+Muscle+Support/img1.jpg",
    rating: 4.65,
    reviewCount: 40,
    oldPrice: 1499,
    price: 999,
    discountPercent: 33,
  },
];


export const BEST_SELLER_STRINGS = {
  SECTION_TITLE: "Best Sellers",
  VIEW_ALL: "View all",
  VIEW_ALL_ARIA_LABEL: "View all best sellers",
  HOT_SELLING_BADGE: "Hot selling",
  REVIEWS_SUFFIX: "+ Reviews",
  ADD_TO_CART: "ADD TO CART"
} as const;

