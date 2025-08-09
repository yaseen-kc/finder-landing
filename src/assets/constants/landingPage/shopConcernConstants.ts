export type ShopConcern = {
  id: string;
  title: string;
  imageUrl: string;
  href?: string;
};

export const SHOP_CONCERNS: ShopConcern[] = [
  {
    id: "neck-pain",
    title: "Neck Pain",
    imageUrl:
      "https://images.unsplash.com/photo-1604882357868-189f28f983a2?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "foot-pain",
    title: "Foot Pain",
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "back-pain",
    title: "Back Pain",
    imageUrl:
      "https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
];

