import { SHOP_CATEGORIES, SHOP_CATEGORY_STRINGS, type ShopCategory } from "../../constants/landingPage/shopCategoryConstants";

export default function ShopCategory() {
  const categories: ShopCategory[] = SHOP_CATEGORIES;

  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-10">
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">{SHOP_CATEGORY_STRINGS.SECTION_TITLE}</h3>

      {/* Mobile: horizontal scroller with snap; Desktop: wider scroller */}
      <div className="mt-6">
        {/* Mobile */}
        <div className="md:hidden">
          <div className="-mx-4 px-4 flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2">
            {categories.map((cat) => (
              <div key={cat.id} className="shrink-0 snap-start">
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <div className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth py-2">
            {categories.map((cat) => (
              <div key={cat.id} className="shrink-0">
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: ShopCategory }) {
  return (
    <a
      href={category.href ?? "#"}
      className="group inline-flex flex-col items-center text-center"
      aria-label={category.title}
    >
      <div className="h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 rounded-2xl bg-zinc-50 ring-1 ring-zinc-200 overflow-hidden shadow-inner flex items-center justify-center">
        <img
          src={category.imageUrl}
          alt={category.title}
          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="mt-3 text-sm sm:text-base font-medium text-zinc-800">
        {category.title}
      </div>
    </a>
  );
}
