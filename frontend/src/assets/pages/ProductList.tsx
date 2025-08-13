import HeaderNav from "../components/navigationBar/headerNav";
import FooterNav from "../components/navigationBar/footerNav";
import MobileBottomNav from "../components/navigationBar/mobileBottomNav";
import ProductCard from "@productList/ProductCard";
import SortDropdown from "@productList/SortDropdown";
import {
  PRODUCT_LIST,
  SORT_OPTIONS,
  type ProductListItem,
} from "@productListConstant";
import { useEffect, useMemo, useState } from "react";
import CartFloatingPanel from "../components/cart/cartFloatingPanel";
import Pagination from "@productList/pagination";
import { DEFAULT_PAGINATION_CONFIG } from "@paginationConstant";

export default function ProductList() {
  const [sortId, setSortId] = useState<(typeof SORT_OPTIONS)[number]["id"]>(
    SORT_OPTIONS[0].id
  );

  const sorted: ProductListItem[] = useMemo(() => {
    const items = [...PRODUCT_LIST];
    switch (sortId) {
      case "price-asc":
        return items.sort((a, b) => a.price - b.price);
      case "price-desc":
        return items.sort((a, b) => b.price - a.price);
      case "discount-desc":
        return items.sort((a, b) => b.discountPercent - a.discountPercent);
      default:
        return items; // popular (as-is)
    }
  }, [sortId]);

  const [page, setPage] = useState(1);
  const pageSize = DEFAULT_PAGINATION_CONFIG.pageSize;
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    // Reset to first page when sort option changes
    setPage(1);
  }, [sortId]);

  // Clamp page in case list size changed
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return sorted.slice(start, end);
  }, [sorted, page, pageSize]);

  return (
    <div className="pb-20 lg:pb-0">
      <HeaderNav />
      <div className="mx-auto max-w-screen-2xl px-4 p-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900">Products</h1>
          <SortDropdown
            options={SORT_OPTIONS}
            value={sortId}
            onChange={setSortId}
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginated.map((item, idx) => (
            <ProductCard
              key={`${item.id}-${(page - 1) * pageSize + idx}`}
              item={item}
            />
          ))}
        </div>
      </div>
      <Pagination
        totalItems={total}
        currentPage={page}
        onPageChange={setPage}
        pageSize={pageSize}
      />
      <FooterNav />
      <MobileBottomNav />
      <CartFloatingPanel />
    </div>
  );
}
