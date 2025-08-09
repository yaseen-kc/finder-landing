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
    id: "wedge-plus-cushion",
    title: "Ultimate Wedge Plus Cushion",
    imageUrl: "https://images.unsplash.com/photo-1582582429416-2f6bbad6b9d0?q=80&w=1200&auto=format&fit=crop",
    isHotSelling: true,
    rating: 4.78,
    reviewCount: 1300,
    oldPrice: 4799,
    price: 1899,
    discountPercent: 61,
  },
  {
    id: "car-comfort-bundle",
    title: "Ultimate Car Comfort Bundle",
    imageUrl: "https://images.unsplash.com/photo-1583229931284-4e1b2a5bd6f8?q=80&w=1200&auto=format&fit=crop",
    rating: 4.89,
    reviewCount: 166,
    oldPrice: 10698,
    price: 3299,
    discountPercent: 70,
  },
  {
    id: "lap-desk-pillow",
    title: "Ultimate Lap Desk Pillow",
    imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
    rating: 4.92,
    reviewCount: 186,
    oldPrice: 7999,
    price: 2999,
    discountPercent: 63,
  },
  {
    id: "car-neck-rest",
    title: "Ultimate Car Neck Rest Pillow",
    imageUrl: "https://images.unsplash.com/photo-1583265151193-1a8e26740019?q=80&w=1200&auto=format&fit=crop",
    isHotSelling: true,
    rating: 4.87,
    reviewCount: 744,
    oldPrice: 3500,
    price: 1299,
    discountPercent: 63,
  },
  {
    id: "travel-neck-pillow",
    title: "Travel Neck Pillow",
    imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop",
    isHotSelling: true,
    rating: 4.84,
    reviewCount: 512,
    oldPrice: 3599,
    price: 1699,
    discountPercent: 53,
  },
  {
    id: "pro-seating-combo",
    title: "Ultimate Pro Seating Combo",
    imageUrl: "https://images.unsplash.com/photo-1598300183368-22968b37a5cd?q=80&w=1200&auto=format&fit=crop",
    rating: 4.88,
    reviewCount: 203,
    oldPrice: 8199,
    price: 2799,
    discountPercent: 66,
  },
];

