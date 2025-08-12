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

function buildImages(productFolder: string): ProductImage[] {
    const base = `https://frido-assets.s3.ap-south-1.amazonaws.com/product-images/${productFolder}`;
    const query = '?q=80&w=1200&auto=format&fit=crop';
    return Array.from({ length: 8 }).map((_, idx) => {
        const n = idx + 1;
        return {
            id: `img-${n}`,
            alt: `Image ${n}`,
            src: `${base}/img${n}.jpg${query}`,
        };
    });
}

// Central catalog keyed by product id (must match ProductListItem.id)
export const PRODUCTS: Record<string, ProductDetailConstants> = {
    // Wrist Wrap Support
    'wrist-wrap-support': {
        id: 'wrist-wrap-support',
        title: 'Wrist Wrap Support',
        ratingText: '4.7 (85 Happy customers)',
        price: 999,
        compareAtPrice: 1499,
        discountLabel: '33% OFF',
        colorLabel: 'Color',
        images: buildImages('Finder+Wrist+Wrap+Support'),
        colors: [{ id: 'black', name: 'Black', swatch: '#111827' }],
        packageLabel: 'Package',
        packages: [
            { id: 'p1', label: 'X 1', value: 1, price: 999, compareAtPrice: 1499 },
            { id: 'p2', label: 'X 2', value: 2, price: 1799, compareAtPrice: 2998, savingsLabel: '40% OFF | Save 1199', isRecommended: true },
            { id: 'p4', label: 'X 4', value: 4, price: 3399, compareAtPrice: 5996, savingsLabel: '43% OFF | Save 2597' },
        ],
        features: [
            { id: 'ft1', text: 'Elastic design for adjustable compression' },
            { id: 'ft2', text: 'Ideal for weightlifting and strength training' },
            { id: 'ft3', text: 'Provides wrist joint stability' },
            { id: 'ft4', text: 'Breathable material for all-day comfort' },
        ],
        shippingBadges: [
            { id: 'sb1', label: 'Free Delivery' },
            { id: 'sb2', label: 'COD Available' },
            { id: 'sb3', label: 'Secure Payments' },
        ],
        description: [
            'Elastic wrist wrap designed for weightlifting and strength training.',
            'Provides compression, stability, and heat retention for wrist joints during exercise or recovery.',
        ],
        productDetails: [
            'Durable elastic fabric construction',
            'One-size adjustable fit',
            'Suitable for both left and right wrists',
        ],
        careInstructions: [
            'Hand wash with mild detergent',
            'Air dry; avoid direct sunlight for prolonged periods',
            'Do not bleach or machine dry',
        ],
        returns: [
            '7-day return policy from date of delivery',
            'Refund processed to original payment method',
        ],
    },

    // Knee Support for Men & Women
    'knee-support-men-women': {
        id: 'knee-support-men-women',
        title: 'Knee Support for Men & Women',
        ratingText: '4.8 (120 Happy customers)',
        price: 1475,
        compareAtPrice: 1899,
        discountLabel: '22% OFF',
        colorLabel: 'Color',
        images: buildImages('Finder+Knee+Support+Double+Strap+Protector'),
        colors: [{ id: 'black', name: 'Black', swatch: '#111827' }],
        packageLabel: 'Package',
        packages: [
            { id: 'p1', label: 'Single', value: 1, price: 1475, compareAtPrice: 1899 },
            { id: 'p2', label: 'Pair', value: 2, price: 2799, compareAtPrice: 3798, savingsLabel: '26% OFF | Save 999', isRecommended: true },
        ],
        features: [
            { id: 'ft1', text: 'Dual-strap design for enhanced stability' },
            { id: 'ft2', text: 'Breathable neoprene material' },
            { id: 'ft3', text: 'Ideal for running and daily support' },
            { id: 'ft4', text: 'Universal left/right fit' },
        ],
        shippingBadges: [
            { id: 'sb1', label: 'Free Delivery' },
            { id: 'sb2', label: 'COD Available' },
            { id: 'sb3', label: 'Secure Payments' },
        ],
        description: [
            'Adjustable knee support engineered for comfort during sports and recovery.',
            'Provides targeted compression to reduce strain and improve stability.',
        ],
        productDetails: [
            'Adjustable dual straps',
            'Lightweight, breathable design',
            'Suitable for both knees',
        ],
        careInstructions: ['Hand wash cold', 'Do not bleach', 'Lay flat to dry'],
        returns: ['7-day return policy', 'Hassle-free replacement if defective'],
    },

    // Adjustable Double-Strap Knee Support
    'support-protector-adjustable-neoprene': {
        id: 'support-protector-adjustable-neoprene',
        title: 'Double-Strap Knee Support',
        ratingText: '4.75 (95 Happy customers)',
        price: 1399,
        compareAtPrice: 1799,
        discountLabel: '22% OFF',
        colorLabel: 'Color',
        images: buildImages('Finder+Knee+Support+Double+Strap+Protector'),
        colors: [{ id: 'black', name: 'Black', swatch: '#111827' }],
        packageLabel: 'Package',
        packages: [
            { id: 'p1', label: 'Single', value: 1, price: 1399, compareAtPrice: 1799 },
            { id: 'p2', label: 'Pair', value: 2, price: 2599, compareAtPrice: 3598, savingsLabel: '28% OFF | Save 999', isRecommended: true },
        ],
        features: [
            { id: 'ft1', text: 'Open patella design reduces pressure' },
            { id: 'ft2', text: 'Anti-slip inner lining' },
            { id: 'ft3', text: 'Great for gym and everyday use' },
            { id: 'ft4', text: 'Soft edges prevent chafing' },
        ],
        shippingBadges: [
            { id: 'sb1', label: 'Free Delivery' },
            { id: 'sb2', label: 'COD Available' },
            { id: 'sb3', label: 'Secure Payments' },
        ],
        description: [
            'Supportive neoprene knee brace with adjustable straps for a snug fit.',
            'Helps stabilize the knee joint during workouts and recovery.',
        ],
        productDetails: ['Neoprene blend', 'Hook-and-loop straps', 'Universal size'],
        careInstructions: ['Hand wash', 'Air dry', 'Do not iron'],
        returns: ['7-day return policy', 'Refund to original payment method'],
    },

    // Neoprene Shoulder Support
    'shoulder-support': {
        id: 'shoulder-support',
        title: 'Neoprene Shoulder Support L Black',
        ratingText: '4.6 (60 Happy customers)',
        price: 1899,
        compareAtPrice: 2499,
        discountLabel: '24% OFF',
        colorLabel: 'Color',
        images: buildImages('Finder+Shoulder+Support'),
        colors: [{ id: 'black', name: 'Black', swatch: '#111827' }],
        packageLabel: 'Package',
        packages: [
            { id: 'p1', label: 'Single', value: 1, price: 1899, compareAtPrice: 2499 },
        ],
        features: [
            { id: 'ft1', text: 'Adjustable compression for shoulder stability' },
            { id: 'ft2', text: 'Breathable and lightweight' },
            { id: 'ft3', text: 'Suitable for left or right shoulder' },
        ],
        shippingBadges: [
            { id: 'sb1', label: 'Free Delivery' },
            { id: 'sb2', label: 'COD Available' },
            { id: 'sb3', label: 'Secure Payments' },
        ],
        description: [
            'Targeted support for unstable or sore shoulder joints.',
            'Ideal for sports injuries and posture assistance.',
        ],
        productDetails: ['Neoprene construction', 'Adjustable fit', 'Unisex design'],
        careInstructions: ['Hand wash', 'Air dry', 'Do not bleach'],
        returns: ['7-day return policy', 'Quick replacement support'],
    },

    // Hinged Knee Brace for ACL/ligament
    'knee-brace-ligament-meniscus': {
        id: 'knee-brace-ligament-meniscus',
        title: 'Hinged Knee Brace',
        ratingText: '4.82 (150 Happy customers)',
        price: 2399,
        compareAtPrice: 2999,
        discountLabel: '20% OFF',
        colorLabel: 'Color',
        images: buildImages('Finder+Knee+Brace+Neoprene'),
        colors: [
            { id: 'black', name: 'Black', swatch: '#111827' },
            { id: 'navy', name: 'Navy Blue', swatch: '#1e3a8a' },
        ],
        packageLabel: 'Package',
        packages: [
            { id: 'p1', label: 'Single', value: 1, price: 2399, compareAtPrice: 2999 },
            { id: 'p2', label: 'Pair', value: 2, price: 4599, compareAtPrice: 5998, savingsLabel: '23% OFF | Save 1399', isRecommended: true },
        ],
        features: [
            { id: 'ft1', text: 'Side hinges for extra stability' },
            { id: 'ft2', text: 'Open patella reduces pressure' },
            { id: 'ft3', text: 'Heavy-duty straps keep brace in place' },
        ],
        shippingBadges: [
            { id: 'sb1', label: 'Free Delivery' },
            { id: 'sb2', label: 'COD Available' },
            { id: 'sb3', label: 'Secure Payments' },
        ],
        description: [
            'Premium hinged brace for ligament support during recovery.',
            'Engineered for athletes and active lifestyles.',
        ],
        productDetails: ['Aluminum side hinges', 'Reinforced straps', 'Breathable materials'],
        careInstructions: ['Remove hinges before wash', 'Hand wash', 'Air dry'],
        returns: ['7-day return policy', 'Refund to original payment method'],
    },

    // Calf Muscle Support
    'calf-muscle-support': {
        id: 'calf-muscle-support',
        title: 'Calf Muscle Support',
        ratingText: '4.65 (40 Happy customers)',
        price: 999,
        compareAtPrice: 1499,
        discountLabel: '33% OFF',
        colorLabel: 'Color',
        images: buildImages('Finder+Calf+Muscle+Support'),
        colors: [{ id: 'black', name: 'Black', swatch: '#111827' }],
        packageLabel: 'Package',
        packages: [
            { id: 'p1', label: 'Single', value: 1, price: 999, compareAtPrice: 1499 },
            { id: 'p2', label: 'Pair', value: 2, price: 1799, compareAtPrice: 2998, savingsLabel: '40% OFF | Save 1199', isRecommended: true },
        ],
        features: [
            { id: 'ft1', text: 'Compression supports calf muscles' },
            { id: 'ft2', text: 'Breathable fabric keeps you cool' },
            { id: 'ft3', text: 'Suitable for running and recovery' },
        ],
        shippingBadges: [
            { id: 'sb1', label: 'Free Delivery' },
            { id: 'sb2', label: 'COD Available' },
            { id: 'sb3', label: 'Secure Payments' },
        ],
        description: [
            'Comfortable support to reduce calf strain during activity.',
            'Provides moderate compression to improve circulation.',
        ],
        productDetails: ['Elastic knit', 'Anatomical fit', 'Unisex'],
        careInstructions: ['Hand wash', 'Do not tumble dry', 'Do not iron'],
        returns: ['7-day return policy', 'Easy exchange if size mismatch'],
    },

    // Sports Knee Brace (Navy-Blue, L)
    'sports-knee-brace-navy': {
        id: 'sports-knee-brace-navy',
        title: 'Sports Knee Brace (Navy-Blue, L)',
        ratingText: '4.8 (120 Happy customers)',
        price: 1475,
        compareAtPrice: 1899,
        discountLabel: '22% OFF',
        colorLabel: 'Color',
        images: buildImages('Finder+Knee+Brace+Neoprene'),
        colors: [{ id: 'navy', name: 'Navy Blue', swatch: '#1e3a8a' }],
        packageLabel: 'Package',
        packages: [
            { id: 'p1', label: 'Single', value: 1, price: 1475, compareAtPrice: 1899 },
        ],
        features: [
            { id: 'ft1', text: 'Sport-grade support and breathability' },
            { id: 'ft2', text: 'Reinforced stitching for durability' },
            { id: 'ft3', text: 'Designed for high-mobility activities' },
        ],
        shippingBadges: [
            { id: 'sb1', label: 'Free Delivery' },
            { id: 'sb2', label: 'COD Available' },
            { id: 'sb3', label: 'Secure Payments' },
        ],
        description: [
            'Performance knee brace tailored for sports and training.',
            'Supports the joint while allowing natural movement.',
        ],
        productDetails: ['Flexible neoprene', 'Ergonomic fit', 'Navy Blue colorway'],
        careInstructions: ['Hand wash', 'Air dry', 'Avoid heat'],
        returns: ['7-day return policy', 'Fast refund processing'],
    },

    // Wrist Binder
    'wrist-binder': {
        id: 'wrist-binder',
        title: 'Wrist Binder',
        ratingText: '4.7 (85 Happy customers)',
        price: 1299,
        compareAtPrice: 1599,
        discountLabel: '19% OFF',
        colorLabel: 'Color',
        images: buildImages('Finder+Wrist+Binder'),
        colors: [{ id: 'black', name: 'Black', swatch: '#111827' }],
        packageLabel: 'Package',
        packages: [
            { id: 'p1', label: 'X 1', value: 1, price: 1299, compareAtPrice: 1599 },
            { id: 'p2', label: 'X 2', value: 2, price: 2399, compareAtPrice: 3198, savingsLabel: '25% OFF | Save 799', isRecommended: true },
        ],
        features: [
            { id: 'ft1', text: 'Supports wrist during repetitive tasks' },
            { id: 'ft2', text: 'Adjustable fit with Velcro closure' },
            { id: 'ft3', text: 'Soft, breathable material' },
        ],
        shippingBadges: [
            { id: 'sb1', label: 'Free Delivery' },
            { id: 'sb2', label: 'COD Available' },
            { id: 'sb3', label: 'Secure Payments' },
        ],
        description: [
            'Wrist binder designed to relieve strain during work and workouts.',
            'Comfortable support for long-duration wear.',
        ],
        productDetails: ['Elastic fabric', 'Adjustable strap', 'One-size-fits-most'],
        careInstructions: ['Hand wash', 'Air dry', 'Do not bleach'],
        returns: ['7-day return policy', 'Easy exchange available'],
    },

    // Advanced Sports Knee Support Brace
    'advanced-sports-knee-support': {
        id: 'advanced-sports-knee-support',
        title: 'Advanced Sports Knee Support Brace',
        ratingText: '4.77 (98 Happy customers)',
        price: 1599,
        compareAtPrice: 1999,
        discountLabel: '20% OFF',
        colorLabel: 'Color',
        images: buildImages('Finder+Knee+Support+Double+Strap+Protector'),
        colors: [{ id: 'black', name: 'Black', swatch: '#111827' }],
        packageLabel: 'Package',
        packages: [
            { id: 'p1', label: 'Single', value: 1, price: 1599, compareAtPrice: 1999 },
            { id: 'p2', label: 'Pair', value: 2, price: 2999, compareAtPrice: 3998, savingsLabel: '25% OFF | Save 999', isRecommended: true },
        ],
        features: [
            { id: 'ft1', text: 'Advanced stabilization straps' },
            { id: 'ft2', text: 'Moisture-wicking fabric' },
            { id: 'ft3', text: 'Suitable for high-impact activities' },
        ],
        shippingBadges: [
            { id: 'sb1', label: 'Free Delivery' },
            { id: 'sb2', label: 'COD Available' },
            { id: 'sb3', label: 'Secure Payments' },
        ],
        description: [
            'High-performance knee support for athletes.',
            'Designed to reduce injury risk and provide comfort.',
        ],
        productDetails: ['Reinforced straps', 'Breathable mesh zones', 'Universal fit'],
        careInstructions: ['Hand wash', 'Air dry', 'No ironing'],
        returns: ['7-day return policy', 'Fast replacement support'],
    },
};

// Safe getter with fallback to first product
export function getProductById(id?: string | null): ProductDetailConstants {
    const all = Object.values(PRODUCTS);
    if (!id) return all[0];
    return PRODUCTS[id] ?? all[0];
}




