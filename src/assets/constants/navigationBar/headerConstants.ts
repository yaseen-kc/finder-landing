export type Category = {
  id: string;
  title: string;
  items: string[];
  image?: string;
};

export const NAV_CATEGORIES: Category[] = [
  {
    id: "cushions",
    title: "Cushions",
    items: [
      "Wedge Plus Cushion",
      "Lap Desk Pillow",
      "Travel Neck Pillow",
      "Car Neck Rest Pillow",
    ],
  },
  {
    id: "pillows",
    title: "Pillows",
    items: [
      "Cuddle Sleep Pillow",
      "Cervical Butterfly Pillow",
      "Ultimate Deep Sleep Pillow",
      "Ultimate Cozy Pillow",
    ],
  },
  {
    id: "topper",
    title: "Mattress Topper",
    items: ["Topper Type A", "Topper Type B"],
  },
  {
    id: "insoles",
    title: "Shoe Insoles",
    items: [
      "Arch Sports",
      "Dual Gel Pro",
      "Dual Gel",
      "Arch Support",
    ],
  },
  {
    id: "footwear",
    title: "Footwear",
    items: ["School Shoes", "Cloud Comfort Sandal", "Baby Shoes"],
  },
  {
    id: "barefoot",
    title: "Barefoot Shoes",
    items: [
      "Barefoot Sock Shoe",
      "Barefoot Sock Shoe Classic",
    ],
  },
  {
    id: "socks",
    title: "Socks",
    items: ["Active Socks"],
  },
  {
    id: "chairs",
    title: "Chairs",
    items: [
      "Aeroluxe Massage Chair",
      "3D Posture Plus Ergonomic Chair",
      "AeroMesh Ergo Chair",
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

