export type ProductListItem = {
    id: string;
    title: string;
    image: string;
    price: number;
    compareAtPrice: number;
    discountPercent: number; // e.g. 61 means 61% Off
    rating: number; // 0-5
    reviewCount: number; // total reviews
    hotSelling?: boolean;
};

export type SortOption = {
    id: 'popular' | 'price-asc' | 'price-desc' | 'discount-desc';
    label: string;
};

// Placeholder product images. Replace with your CDN if available.
const images = {
    wedge:
        'https://images.unsplash.com/photo-1555661530-68c8e98db4e6?w=1200&auto=format&fit=crop&q=70',
    carNeck:
        'https://images.unsplash.com/photo-1513617331687-3d06bf2f47d2?w=1200&auto=format&fit=crop&q=70',
    lapDesk:
        'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1200&auto=format&fit=crop&q=70',
    travelNeck:
        'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&auto=format&fit=crop&q=70',
};

export const PRODUCT_LIST: ProductListItem[] = [
    {
        id: 'ultimate-wedge-plus-cushion',
        title: 'Ultimate Wedge Plus Cushion',
        image: images.wedge,
        price: 1899,
        compareAtPrice: 4799,
        discountPercent: 61,
        rating: 4.78,
        reviewCount: 1300,
        hotSelling: true,
    },
    {
        id: 'car-neck-rest-pillow',
        title: 'Ultimate Car Neck Rest Pillow',
        image: images.carNeck,
        price: 1299,
        compareAtPrice: 3500,
        discountPercent: 63,
        rating: 4.87,
        reviewCount: 744,
        hotSelling: true,
    },
    {
        id: 'lap-desk-pillow',
        title: 'Ultimate Lap Desk',
        image: images.lapDesk,
        price: 2999,
        compareAtPrice: 7999,
        discountPercent: 63,
        rating: 4.92,
        reviewCount: 186,
    },
    {
        id: 'travel-neck-pillow',
        title: 'Travel Neck Pillow',
        image: images.travelNeck,
        price: 1699,
        compareAtPrice: 3599,
        discountPercent: 53,
        rating: 4.9,
        reviewCount: 219,
        hotSelling: true,
    },
    {
        id: 'ultimate-wedge-plus-cushion',
        title: 'Ultimate Wedge Plus Cushion',
        image: images.wedge,
        price: 1899,
        compareAtPrice: 4799,
        discountPercent: 61,
        rating: 4.78,
        reviewCount: 1300,
        hotSelling: true,
    },
    {
        id: 'car-neck-rest-pillow',
        title: 'Ultimate Car Neck Rest Pillow',
        image: images.carNeck,
        price: 1299,
        compareAtPrice: 3500,
        discountPercent: 63,
        rating: 4.87,
        reviewCount: 744,
        hotSelling: true,
    },
    {
        id: 'lap-desk-pillow',
        title: 'Ultimate Lap Desk',
        image: images.lapDesk,
        price: 2999,
        compareAtPrice: 7999,
        discountPercent: 63,
        rating: 4.92,
        reviewCount: 186,
    },
    {
        id: 'travel-neck-pillow',
        title: 'Travel Neck Pillow',
        image: images.travelNeck,
        price: 1699,
        compareAtPrice: 3599,
        discountPercent: 53,
        rating: 4.9,
        reviewCount: 219,
        hotSelling: true,
    },
    {
        id: 'car-neck-rest-pillow',
        title: 'Ultimate Car Neck Rest Pillow',
        image: images.carNeck,
        price: 1299,
        compareAtPrice: 3500,
        discountPercent: 63,
        rating: 4.87,
        reviewCount: 744,
        hotSelling: true,
    },
];

export const SORT_OPTIONS: SortOption[] = [
    { id: 'popular', label: 'Popular' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'discount-desc', label: 'Discount: High to Low' },
];


