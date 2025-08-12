export type ShopCategory = {
    id: string;
    title: string;
    imageUrl: string;
    href?: string;
};

export const SHOP_CATEGORIES: ShopCategory[] = [
    {
        id: "knee-leg-braces",
        title: "Knee & Leg Braces",
        imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Knee+Brace+Neoprene/img2.jpg",
        href: "/product-list",
    },
    {
        id: "wrist-braces",
        title: "Wrist Braces",
        imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Wrist+Wrap+Support/img6.jpg",
        href: "/product-list",
    },
    {
        id: "shoulder-supports",
        title: "Shoulder Supports",
        imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Shoulder+Support/img3.jpg",
        href: "/product-list",
    },
    {
        id: "calf-supports",
        title: "Calf Supports",
        imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Calf+Muscle+Support/img3.jpg",
        href: "/product-list",
    },
    {
        id: "wrist-wraps",
        title: "Wrist Wraps",
        imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Wrist+Wrap+Support/img7.jpg",
        href: "/product-list",
    },
    {
        id: "hand-wrist-braces",
        title: "Hand & Wrist Braces",
        imageUrl: "https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Wrist+Wrap+Support/img2.jpg",
        href: "/product-list",
    }
];


export const SHOP_CATEGORY_STRINGS = {
    SECTION_TITLE: "Shop by Category",
} as const;

