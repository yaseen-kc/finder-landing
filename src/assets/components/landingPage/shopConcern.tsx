import { SHOP_CONCERNS, SHOP_CONCERN_STRINGS, type ShopConcern as Concern } from "../../constants/landingPage/shopConcernConstants";

export default function ShopConcern() {
  const concerns: Concern[] = SHOP_CONCERNS;

  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-10">
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
        {SHOP_CONCERN_STRINGS.SECTION_TITLE}
      </h3>

      <div className="mt-6">
        {/* Mobile: stacked rows with image on the right */}
        <div className="md:hidden flex flex-col gap-4">
          {concerns.map((item) => (
            <a
              key={item.id}
              href={item.href ?? "#"}
              className="group relative h-24 sm:h-28 rounded-3xl overflow-hidden text-white ring-1 ring-black/10 bg-black"
              aria-label={item.title}
            >
              {/* Right-side image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute right-0 top-0 h-full w-40 sm:w-48 object-cover object-center group-hover:scale-[1.03] transition-transform"
                loading="lazy"
                decoding="async"
              />
              {/* Left gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
              {/* Text */}
              <div className="relative h-full flex items-center px-6">
                <span className="text-base sm:text-lg font-semibold">{item.title}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Desktop: three column grid cards */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {concerns.map((item) => (
            <a
              key={item.id}
              href={item.href ?? "#"}
              className="group relative h-72 rounded-3xl overflow-hidden text-white ring-1 ring-black/10 bg-neutral-900"
              aria-label={item.title}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.03] transition-transform"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                <div className="text-white text-lg font-semibold drop-shadow">{item.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
