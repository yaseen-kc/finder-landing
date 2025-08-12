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
    kneeSupport:
        'https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Knee+Support+Double+Strap+Protector/img3.jpg',
    wristBinder:
        'https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Wrist+Binder/img7.jpg',
    neopreneKnee:
        'https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Knee+Support+Double+Strap+Protector/img5.jpg',
    shoulderSupport:
        'https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Shoulder+Support/img3.jpg',
    hingedKnee:
        'https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Knee+Brace+Neoprene/img4.jpg',
    calfSupport:
        'https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Calf+Muscle+Support/img3.jpg',
    wristWrap:
        'https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Wrist+Wrap+Support/img7.jpg',
    navyKneeBrace:
        'https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Knee+Brace+Neoprene/img3.jpg',
    advancedKnee:
        'https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/Finder+Knee+Support+Double+Strap+Protector/img8.jpg',
};


export const PRODUCT_LIST: ProductListItem[] = [
    {
        id: 'knee-support-men-women',
        title: 'Knee Support for Men & Women',
        image: images.kneeSupport,
        price: 1475,
        compareAtPrice: 1899,
        discountPercent: 22,
        rating: 4.8,
        reviewCount: 120,
        hotSelling: true,
    },
    {
        id: 'wrist-binder',
        title: 'Wrist Binder',
        image: images.wristBinder,
        price: 1299,
        compareAtPrice: 1599,
        discountPercent: 19,
        rating: 4.7,
        reviewCount: 85,
    },
    {
        id: 'support-protector-adjustable-neoprene',
        title: 'Double-Strap Knee Support',
        image: images.neopreneKnee,
        price: 1399,
        compareAtPrice: 1799,
        discountPercent: 22,
        rating: 4.75,
        reviewCount: 95,
    },
    {
        id: 'shoulder-support',
        title: 'Neoprene Shoulder Support L Black',
        image: images.shoulderSupport,
        price: 1899,
        compareAtPrice: 2499,
        discountPercent: 24,
        rating: 4.6,
        reviewCount: 60,
        hotSelling: true,
    },
    {
        id: 'knee-brace-ligament-meniscus',
        title: 'Hinged Knee Brace',
        image: images.hingedKnee,
        price: 2399,
        compareAtPrice: 2999,
        discountPercent: 20,
        rating: 4.82,
        reviewCount: 150,
    },
    {
        id: 'calf-muscle-support',
        title: 'Calf Muscle Support',
        image: images.calfSupport,
        price: 999,
        compareAtPrice: 1499,
        discountPercent: 33,
        rating: 4.65,
        reviewCount: 40,
    },
    {
        id: 'wrist-wrap-support',
        title: 'Wrist Wrap Support',
        image: images.wristWrap,
        price: 999,
        compareAtPrice: 1499,
        discountPercent: 33,
        rating: 4.7,
        reviewCount: 85,
    },
    {
        id: 'sports-knee-brace-navy',
        title: 'Sports Knee Brace (Navy-Blue, L)',
        image: images.navyKneeBrace,
        price: 1475,
        compareAtPrice: 1899,
        discountPercent: 22,
        rating: 4.8,
        reviewCount: 120,
    },
    {
        id: 'advanced-sports-knee-support',
        title: 'Advanced Sports Knee Support Brace',
        image: images.advancedKnee,
        price: 1599,
        compareAtPrice: 1999,
        discountPercent: 20,
        rating: 4.77,
        reviewCount: 98,
    },
];


export const SORT_OPTIONS: SortOption[] = [
    { id: 'popular', label: 'Popular' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'discount-desc', label: 'Discount: High to Low' },
];


