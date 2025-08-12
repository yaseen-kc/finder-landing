import { DEFAULT_PAGINATION_CONFIG, LABELS } from "@paginationConstant";

type Props = {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
};

export default function Pagination({
  totalItems,
  currentPage,
  onPageChange,
  pageSize = DEFAULT_PAGINATION_CONFIG.pageSize,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalItems <= pageSize || totalPages <= 1) return null;

  const maxButtons = DEFAULT_PAGINATION_CONFIG.maxButtons;
  const halfWindow = Math.floor(maxButtons / 2);

  let startPage = Math.max(1, currentPage - halfWindow);
  let endPage = startPage + maxButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pages: number[] = [];
  for (let p = startPage; p <= endPage; p += 1) pages.push(p);

  const handlePrev = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

  return (
    <nav className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-36">
      <div className="mt-8 mb-14 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 1}
          aria-label={LABELS.previous}
          className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
            currentPage === 1
              ? "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400"
              : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
          }`}
        >
          {LABELS.previous}
        </button>

        <div className="flex items-center gap-2">
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              aria-current={pageNumber === currentPage ? "page" : undefined}
              aria-label={LABELS.page(pageNumber)}
              className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm font-medium transition-colors ${
                pageNumber === currentPage
                  ? "border-zinc-800 bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label={LABELS.next}
          className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
            currentPage === totalPages
              ? "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400"
              : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
          }`}
        >
          {LABELS.next}
        </button>
      </div>
    </nav>
  );
}

