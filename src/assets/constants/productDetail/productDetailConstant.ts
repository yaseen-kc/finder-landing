export type ProductImage = {
    id: string;
    alt: string;
    src: string;
    thumb?: string;
};

export type ProductVariantOption = {
    id: string;
    label: string;
    value: string | number;
    price?: number;
    compareAtPrice?: number;
    savingsLabel?: string;
    isRecommended?: boolean;
};

export type ProductFeature = {
    id: string;
    icon?: string; // could be name of an icon or path to asset
    text: string;
};

export type ProductDetailConstants = {
    id: string;
    title: string;
    ratingText: string;
    price: number;
    compareAtPrice: number;
    discountLabel: string;
    colorLabel: string;
    images: ProductImage[];
    colors: { id: string; name: string; swatch: string }[];
    packageLabel: string;
    packages: ProductVariantOption[];
    features: ProductFeature[];
    shippingBadges: { id: string; label: string }[];
    description: string[];
    productDetails: string[];
    careInstructions: string[];
    returns: string[];
};

// Mock assets (using placeholder pics). Replace with real CDN/image paths.
const placeholders: string[] = [
  'https://images.unsplash.com/photo-1555661530-68c8e98db4e6?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513617331687-3d06bf2f47d2?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop',
];

export const PRODUCT: ProductDetailConstants = {
    id: 'ultimate-wedge-plus-cushion',
    title: 'Ultimate Wedge Plus Cushion',
    ratingText: '4.8 (1303 Happy customers)',
    price: 1899,
    compareAtPrice: 4799,
    discountLabel: '61% OFF',
    colorLabel: 'Color',
    images: [
        { id: 'img-1', alt: 'Main product', src: placeholders[0] },
        { id: 'img-2', alt: 'Angle view', src: placeholders[1] },
        { id: 'img-3', alt: 'Detail view', src: placeholders[2] },
        { id: 'img-4', alt: 'Usage', src: placeholders[3] },
        { id: 'img-5', alt: 'Texture', src: placeholders[4] },
        { id: 'img-6', alt: 'Back view with anti-slip base', src: placeholders[5] },
        { id: 'img-7', alt: 'Packaging and accessories', src: placeholders[6] },
        { id: 'img-8', alt: 'Bedroom setup', src: placeholders[7] },
    ],
    colors: [
        { id: 'white', name: 'White', swatch: '#F5F5F5' },
        { id: 'gray', name: 'Gray', swatch: '#9CA3AF' },
        { id: 'black', name: 'Black', swatch: '#111827' },
        { id: 'blue', name: 'Blue', swatch: '#1E3A8A' },
        { id: 'pink', name: 'Pink', swatch: '#F59EBC' },
        { id: 'charcoal', name: 'Charcoal', swatch: '#4B5563' },
    ],
    packageLabel: 'Package',
    packages: [
        {
            id: 'p1',
            label: 'X 1',
            value: 1,
            price: 1899,
            compareAtPrice: 4799,
        },
        {
            id: 'p2',
            label: 'X 2',
            value: 2,
            price: 3399,
            compareAtPrice: 9598,
            savingsLabel: '64% OFF | Save 6199',
            isRecommended: true,
        },
        {
            id: 'p4',
            label: 'X 4',
            value: 4,
            price: 6199,
            compareAtPrice: 19196,
            savingsLabel: '67% OFF | Save 12997',
        },
    ],
    features: [
        { id: 'ft1', text: 'Helps Reduce Acid Reflux/GERD' },
        { id: 'ft2', text: 'Back/Neck Support' },
        { id: 'ft3', text: 'Pre/Post Pregnancy Support' },
        { id: 'ft4', text: 'Helps During Surgery Recovery' },
    ],
    shippingBadges: [
        { id: 'sb1', label: 'Free Delivery' },
        { id: 'sb2', label: 'COD Available' },
        { id: 'sb3', label: 'Secure Payments' },
    ],
    description: [
        'A Comfort Support Cushion that contours to your body\'s natural curves.',
        'Its adjustable design allows you to elevate your head, neck, or legs to the desired angle, promoting better circulation and relieving discomfort.',
    ],
    productDetails: [
        'High-density foam with breathable cover',
        'Anti-slip base for stability',
        'Cover is removable and washable',
    ],
    careInstructions: [
        'Spot clean the foam; do not soak',
        'Machine wash the cover on gentle cycle',
        'Air dry; avoid direct sunlight for extended periods',
    ],
    returns: [
        '7-day return policy from date of delivery',
        'Refund processed to original payment method',
    ],
};


