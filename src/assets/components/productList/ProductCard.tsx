import { Link } from "react-router-dom";
import type { ProductListItem } from "@productListConstant";

type Props = {
  item: ProductListItem;
};

export default function ProductCard({ item }: Props) {
  const discountLabel = `${item.discountPercent}% Off`;
  return (
    <div className="flex flex-col">
      <div className="relative rounded-2xl overflow-hidden bg-zinc-50 ring-1 ring-zinc-200">
        {item.hotSelling && (
          <div className="absolute left-3 top-3 z-10 inline-flex items-center rounded-md bg-black/80 px-2 py-0.5 text-[11px] font-semibold text-white">
            Hot selling
          </div>
        )}
        <Link to={`/product/${item.id}`}>
          <img
            src={item.image}
            alt={item.title}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
        </Link>
      </div>

      <Link
        to={`/product/${item.id}`}
        className="mt-4 text-sm sm:text-base font-medium text-zinc-900 line-clamp-2"
      >
        {item.title}
      </Link>

      <div className="mt-2 flex items-end gap-2">
        <div className="text-base sm:text-lg font-semibold text-zinc-900">
          ₹{item.price.toLocaleString()}
        </div>
        <div className="text-xs sm:text-sm text-zinc-400 line-through">
          ₹{item.compareAtPrice.toLocaleString()}
        </div>
        <div className="text-xs sm:text-sm font-semibold text-emerald-700">
          {discountLabel}
        </div>
      </div>

      <div className="mt-1 text-xs text-zinc-600">
        ⭐ {item.rating.toFixed(2)} ({item.reviewCount}+ Reviews)
      </div>

      <button className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-yellow-400 py-3 font-semibold text-zinc-900">
        ADD TO CART
      </button>
    </div>
  );
}


