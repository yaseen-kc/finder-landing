// Auto-generated helpers to derive app constants from FinderSports.json
// Centralizes normalization so all surfaces read from the same product feed

// NOTE: We avoid importing types from feature constants to prevent circular deps.
// Each consumer file should cast to its local types.

// Import as raw text to bypass Vite's JSON parser (file contains NaN etc.)
// Vite supports ?raw to load file content as string at build-time.
import rawJson from '../../../../FinderSports.json?raw';

function parseUnsafeJsonToObject<T = unknown>(text: string): T | undefined {
  try {
    // Replace unquoted NaN with null to make it JSON-compatible
    const sanitized = text.replace(/\bNaN\b/g, 'null');
    return JSON.parse(sanitized) as T;
  } catch {
    return undefined;
  }
}

const rawData = parseUnsafeJsonToObject<any>(rawJson) || {};

type FinderRow = {
  Handle?: string;
  Title?: string;
  ['Body (HTML)']?: string;
  Vendor?: string;
  ['Product Category']?: string;
  Type?: string;
  Tags?: string;
  Published?: boolean;
  ['Option1 Name']?: string;
  ['Option1 Value']?: string;
  ['Option2 Name']?: string;
  ['Option2 Value']?: string;
  ['Variant SKU']?: string;
  ['Variant Grams']?: string | number;
  ['Variant Inventory Tracker']?: string;
  ['Variant Inventory Qty']?: string;
  ['Variant Inventory Policy']?: string;
  ['Variant Fulfillment Service']?: string;
  ['Variant Price']?: string | number;
  ['Variant Compare At Price']?: string | number;
  ['Image Src']?: string;
  ['Image Alt Text']?: string;
  ['Price / International']?: string;
  ['Compare At Price / International']?: string;
};

const SHEET: FinderRow[] = Array.isArray(rawData?.Sheet1)
  ? rawData.Sheet1
  : [];

const PLACEHOLDER_IMAGES = {
  squareSmall:
    'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=256&h=256&fit=crop&auto=format&q=60',
  wideLarge:
    'https://images.unsplash.com/photo-1555661530-68c8e98db4e6?q=80&w=1200&auto=format&fit=crop',
};

function toSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function lastCategorySegment(category?: string): string | undefined {
  if (!category) return undefined;
  const parts = category.split('>').map((s) => s.trim());
  return parts[parts.length - 1] || undefined;
}

function parseMoney(value?: string | number): number | undefined {
  if (value == null) return undefined;
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  // Extract numeric from strings like "₹1,475.00" or "1475.00"
  const cleaned = value
    .toString()
    .replace(/[^0-9.,]/g, '')
    .replace(/,/g, '');
  const asNumber = parseFloat(cleaned);
  if (!isNaN(asNumber)) {
    // Treat as rupees (no paise handling required)
    return Math.round(asNumber);
  }
  return undefined;
}

function coalescePrice(row: FinderRow): number | undefined {
  return (
    parseMoney(row['Variant Price']) ?? parseMoney(row['Price / International'])
  );
}

function coalesceCompareAt(row: FinderRow): number | undefined {
  return (
    parseMoney(row['Variant Compare At Price']) ??
    parseMoney(row['Compare At Price / International'])
  );
}

// Normalize products from the sheet
type NormalizedProduct = {
  id: string; // slug
  handle: string;
  title: string;
  description?: string;
  category?: string; // last segment
  fullCategory?: string; // full path
  tags: string[];
  color?: string;
  sku?: string;
  price?: number;
  compareAtPrice?: number;
  image?: string;
};

const PRODUCTS: NormalizedProduct[] = SHEET.map((row) => {
  const title = row.Title?.trim() || row.Handle || 'Finder Product';
  const idBase = row.Handle || title;
  const id = toSlug(idBase);
  const catFull = row['Product Category']?.replace(/Product Category:\s*/i, '').trim();
  const category = lastCategorySegment(catFull);
  const price = coalescePrice(row);
  const compareAtPrice = coalesceCompareAt(row);
  const color = row['Option2 Value']?.replace(/^Option2 Value:\s*/i, '').trim();
  const tags = (row.Tags || '')
    .replace(/^Tags:\s*/i, '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const image = row['Image Src'] && !/not available|not listed/i.test(row['Image Src'])
    ? (row['Image Src'] as string)
    : PLACEHOLDER_IMAGES.wideLarge;
  return {
    id,
    handle: row.Handle || id,
    title,
    description: row['Body (HTML)']?.toString(),
    category,
    fullCategory: catFull,
    tags,
    color,
    sku: row['Variant SKU']?.toString(),
    price,
    compareAtPrice,
    image,
  } as NormalizedProduct;
}).filter((p) => !!p.title);

// Deduplicate by id (in case of repeats)
const SEEN = new Set<string>();
const UNIQUE_PRODUCTS: NormalizedProduct[] = [];
for (const p of PRODUCTS) {
  if (SEEN.has(p.id)) continue;
  SEEN.add(p.id);
  UNIQUE_PRODUCTS.push(p);
}

// Categories from products
type NormalizedCategory = { id: string; title: string; imageUrl: string; href?: string };
const CATEGORY_MAP = new Map<string, NormalizedCategory>();
for (const p of UNIQUE_PRODUCTS) {
  if (!p.category) continue;
  const key = p.category;
  if (!CATEGORY_MAP.has(key)) {
    const slug = toSlug(key);
    CATEGORY_MAP.set(key, {
      id: slug,
      title: key,
      imageUrl: `https://picsum.photos/seed/${encodeURIComponent(slug)}/320/240`,
      href: '#',
    });
  }
}
export const GENERATED_SHOP_CATEGORIES = Array.from(CATEGORY_MAP.values());

// Popular searches → top 3 categories
export const GENERATED_POPULAR_SEARCHES = GENERATED_SHOP_CATEGORIES.slice(0, 3).map(
  (c) => ({ id: c.id, label: c.title, image: PLACEHOLDER_IMAGES.squareSmall })
);

// Concerns derived from product titles/tags
function inferConcernsFromProducts(): { id: string; title: string; imageUrl: string; href?: string }[] {
  const concernDefs = [
    { match: /knee/i, id: 'knee-pain', title: 'Knee Pain' },
    { match: /wrist/i, id: 'wrist-pain', title: 'Wrist Pain' },
    { match: /shoulder/i, id: 'shoulder-pain', title: 'Shoulder Pain' },
    { match: /calf/i, id: 'calf-pain', title: 'Calf Pain' },
  ];
  const found = new Map<string, { id: string; title: string; imageUrl: string; href?: string }>();
  for (const p of UNIQUE_PRODUCTS) {
    const hay = `${p.title} ${p.tags.join(' ')}`;
    for (const c of concernDefs) {
      if (c.match.test(hay)) {
        if (!found.has(c.id)) {
          found.set(c.id, {
            id: c.id,
            title: c.title,
            imageUrl: PLACEHOLDER_IMAGES.wideLarge,
            href: '#',
          });
        }
      }
    }
  }
  return Array.from(found.values());
}
export const GENERATED_SHOP_CONCERNS = inferConcernsFromProducts();

// Cart defaults: pick first product with a price
const FIRST_PRICED = UNIQUE_PRODUCTS.find((p) => typeof p.price === 'number');
export const GENERATED_DEFAULT_CART_ITEMS = FIRST_PRICED
  ? [
      {
        id: FIRST_PRICED.id,
        title: FIRST_PRICED.title,
        color: FIRST_PRICED.color || 'Default',
        mrp: FIRST_PRICED.compareAtPrice || FIRST_PRICED.price || 0,
        price: FIRST_PRICED.price || 0,
        image: PLACEHOLDER_IMAGES.squareSmall,
      },
    ]
  : [];

// Best sellers: use available products with price, top 6
export const GENERATED_BEST_SELLERS = UNIQUE_PRODUCTS.filter((p) => p.price)
  .slice(0, 6)
  .map((p, index) => ({
    id: p.id,
    title: p.title,
    imageUrl: p.image || PLACEHOLDER_IMAGES.wideLarge,
    isHotSelling: index < 2,
    rating: 4.8,
    reviewCount: 100 + index * 50,
    oldPrice: p.compareAtPrice || (p.price ? Math.round(p.price * 1.2) : 0),
    price: p.price || 0,
    discountPercent: p.compareAtPrice && p.price
      ? Math.max(0, Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100))
      : undefined,
  }));

// Product list: all products (with price), fall back to 0
export const GENERATED_PRODUCT_LIST = UNIQUE_PRODUCTS.map((p, index) => ({
  id: p.id,
  title: p.title,
  image: p.image || PLACEHOLDER_IMAGES.wideLarge,
  price: p.price || 0,
  compareAtPrice: p.compareAtPrice || (p.price ? Math.round(p.price * 1.2) : 0),
  discountPercent:
    p.compareAtPrice && p.price
      ? Math.max(0, Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100))
      : 0,
  rating: 4.7 + ((index % 4) * 0.05),
  reviewCount: 120 + (index * 37) % 250,
  hotSelling: index % 3 === 0,
}));

// Nav categories: each category with up to 4 product titles
export const GENERATED_NAV_CATEGORIES = Array.from(CATEGORY_MAP.entries()).map(
  ([catTitle, cat]) => {
    const items = UNIQUE_PRODUCTS.filter((p) => p.category === catTitle)
      .slice(0, 4)
      .map((p) => p.title);
    return { id: cat.id, title: cat.title, items };
  }
);

// Footer shop links based on categories
export const GENERATED_FOOTER_SHOP_LINKS = GENERATED_SHOP_CATEGORIES.map((c) => ({
  label: c.title,
  href: '#',
}));

// Product detail default: use first priced item, fill with placeholders where needed
export const GENERATED_PRODUCT_DETAIL = FIRST_PRICED
  ? {
      id: FIRST_PRICED.id,
      title: FIRST_PRICED.title,
      ratingText: '4.8 (250+ reviews)',
      price: FIRST_PRICED.price || 0,
      compareAtPrice: FIRST_PRICED.compareAtPrice || (FIRST_PRICED.price ? Math.round(FIRST_PRICED.price * 1.2) : 0),
      discountLabel:
        FIRST_PRICED.compareAtPrice && FIRST_PRICED.price
          ? `${Math.max(0, Math.round(((FIRST_PRICED.compareAtPrice - FIRST_PRICED.price) / FIRST_PRICED.compareAtPrice) * 100))}% OFF`
          : ' ',
      colorLabel: 'Color',
      images: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
        id: `img-${n}`,
        alt: FIRST_PRICED?.title || 'Product image',
        src: PLACEHOLDER_IMAGES.wideLarge,
      })),
      colors: [
        { id: 'black', name: 'Black', swatch: '#111827' },
        { id: 'blue', name: 'Blue', swatch: '#1E3A8A' },
        { id: 'gray', name: 'Gray', swatch: '#9CA3AF' },
      ],
      packageLabel: 'Package',
      packages: [
        {
          id: 'p1',
          label: 'X 1',
          value: 1,
          price: FIRST_PRICED.price || 0,
          compareAtPrice:
            FIRST_PRICED.compareAtPrice || (FIRST_PRICED.price ? Math.round(FIRST_PRICED.price * 1.2) : 0),
        },
        {
          id: 'p2',
          label: 'X 2',
          value: 2,
          price: FIRST_PRICED.price ? Math.round(FIRST_PRICED.price * 2 * 0.9) : 0,
          compareAtPrice:
            FIRST_PRICED.compareAtPrice ? FIRST_PRICED.compareAtPrice * 2 : (FIRST_PRICED.price ? Math.round(FIRST_PRICED.price * 2 * 1.2) : 0),
          savingsLabel: 'Best Value',
          isRecommended: true,
        },
      ],
      features: [
        { id: 'ft1', text: 'Pain Relief Support' },
        { id: 'ft2', text: 'Breathable & Adjustable' },
        { id: 'ft3', text: 'Durable Construction' },
        { id: 'ft4', text: 'Comfortable Fit' },
      ],
      shippingBadges: [
        { id: 'sb1', label: 'Free Delivery' },
        { id: 'sb2', label: 'COD Available' },
        { id: 'sb3', label: 'Secure Payments' },
      ],
      description: [
        FIRST_PRICED.description || 'Supportive brace engineered for comfort and stability.',
      ],
      productDetails: [
        'Adjustable straps',
        'Ergonomic design',
        'Premium materials',
      ],
      careInstructions: [
        'Hand wash recommended',
        'Air dry only',
      ],
      returns: ['7-day return policy from date of delivery'],
    }
  : undefined;


