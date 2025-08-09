import {
  BEST_SELLERS,
  type BestSellerItem,
} from "../../constants/landingPage/bestSellerConstants";

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BestSeller() {
  const items: BestSellerItem[] = BEST_SELLERS;

  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
          Best Sellers
        </h3>
        <a
          href="#"
          className="text-sm md:text-base font-medium text-zinc-900 inline-flex items-center gap-1 hover:opacity-80"
          aria-label="View all best sellers"
        >
          View all
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Grid for mobile; 2-column; Desktop 4-column */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <article
            key={item.id}
            className={
              "rounded-2xl ring-1 ring-zinc-200 bg-white overflow-hidden" +
              (index >= 4 ? " lg:hidden" : "")
            }
          >
            <div className="relative">
              {item.isHotSelling && (
                <span className="absolute left-3 top-3 z-[1] rounded-md bg-black/80 text-white text-xs font-semibold px-2 py-1">
                  Hot selling
                </span>
              )}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-56 sm:h-64 object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="p-4">
              <h4 className="text-base md:text-lg font-medium text-zinc-900">
                {item.title}
              </h4>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-700">
                <svg
                  className="w-4 h-4 text-emerald-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81H6.93a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">{item.rating.toFixed(2)}</span>
                <span className="text-zinc-500">({item.reviewCount}+ Reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="line-through text-zinc-400 text-sm">
                  {formatINR(item.oldPrice)}
                </span>
                <span className="text-lg font-semibold text-zinc-900">
                  {formatINR(item.price)}
                </span>
                {typeof item.discountPercent === "number" && (
                  <span className="text-emerald-600 text-sm font-medium">
                    {item.discountPercent}% Off
                  </span>
                )}
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-xl bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold py-3 transition-colors"
              >
                ADD TO CART
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

