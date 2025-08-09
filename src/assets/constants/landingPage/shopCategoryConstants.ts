export type ShopCategory = {
    id: string;
    title: string;
    imageUrl: string;
    href?: string;
};

export const SHOP_CATEGORIES: ShopCategory[] = [
    {
        id: "insoles",
        title: "Insoles",
        imageUrl: "https://picsum.photos/seed/insoles/320/240",
        href: "#",
    },
    {
        id: "cushions",
        title: "Cushions",
        imageUrl: "https://picsum.photos/seed/cushions/320/240",
        href: "#",
    },
    {
        id: "car-essentials",
        title: "Car Essentials",
        imageUrl: "https://picsum.photos/seed/car-essentials/320/240",
        href: "#",
    },
    {
        id: "chairs",
        title: "Chairs",
        imageUrl: "https://picsum.photos/seed/chairs/320/240",
        href: "#",
    },
    {
        id: "maternity",
        title: "Maternity",
        imageUrl: "https://picsum.photos/seed/maternity/320/240",
        href: "#",
    },
    {
        id: "pillows",
        title: "Pillows",
        imageUrl: "https://picsum.photos/seed/pillows/320/240",
        href: "#",
    },
    {
        id: "desks",
        title: "Desks",
        imageUrl: "https://picsum.photos/seed/desks/320/240",
        href: "#",
    },
    {
        id: "footwear",
        title: "Footwear",
        imageUrl: "https://picsum.photos/seed/footwear/320/240",
        href: "#",
    },
    // {
    //     id: "desks",
    //     title: "Desks",
    //     imageUrl: "https://picsum.photos/seed/desks/320/240",
    //     href: "#",
    // },
];

export const SHOP_CATEGORY_STRINGS = {
    SECTION_TITLE: "Shop by Category",
} as const;

