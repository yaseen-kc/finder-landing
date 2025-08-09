import { useEffect, useRef, useState } from "react";
import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  NAV_CATEGORIES,
  MOBILE_LEFT_RAIL_ITEMS,
  type Category,
} from "../../constants/navigationBar/headerConstants";

// Logo component for the navigation bar
function Logo() {
  return (
    <div className="font-semibold text-2xl tracking-tight select-none">
      <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
        Finder
      </span>{" "}
      <span className="text-zinc-900">Sports</span>
    </div>
  );
}

// Custom hook to detect clicks outside a referenced element
function useOutsideClick<T extends HTMLElement>(handler: () => void) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [handler]);
  return ref;
}

// Main header navigation component
export default function HeaderNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // Tracks which dropdown is open
  const [mobileOpen, setMobileOpen] = useState(false); // Tracks mobile drawer state

  const categories: Category[] = NAV_CATEGORIES;

  const dropdownRef = useOutsideClick<HTMLDivElement>(() =>
    setActiveMenu(null)
  );
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveMenu(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Toggle dropdown menus
  function toggleMenu(key: string) {
    setActiveMenu((prev) => (prev === key ? null : key));
  }

  // Scrolls the categories in the mega menu
  function scrollCategories(direction: "left" | "right") {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(480, el.clientWidth * 0.9);
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  // Base styles for nav links
  const navLinkBase =
    "px-3 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 rounded-md transition-colors inline-flex items-center gap-1 data-[active=true]:text-zinc-900";

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-screen-2xl px-4">
        {/* Top navigation row */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile menu button (hamburger) */}
            <button
              aria-label="Open menu"
              className="lg:hidden p-2.5 rounded-full border border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <Logo />
          </div>

          {/* Desktop navigation links */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Categories dropdown */}
            <button
              className={`${navLinkBase} relative group`}
              data-active={activeMenu === "categories"}
              onClick={() => toggleMenu("categories")}
            >
              <span>Categories</span>
              <ChevronDownIcon className="w-4 h-4" />
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/70 to-indigo-500/0 opacity-0 transition-opacity group-hover:opacity-100 data-[active=true]:opacity-100"
              />
            </button>
            {/* Combos link */}
            <a className={`${navLinkBase} relative group`} href="#">
              Combos
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/70 to-indigo-500/0 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </a>
            {/* Bestsellers dropdown */}
            <button
              className={`${navLinkBase} relative group`}
              data-active={activeMenu === "bestsellers"}
              onClick={() => toggleMenu("bestsellers")}
            >
              <span>Bestsellers</span>
              <ChevronDownIcon className="w-4 h-4" />
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/70 to-indigo-500/0 opacity-0 transition-opacity group-hover:opacity-100 data-[active=true]:opacity-100"
              />
            </button>
            {/* New Launches link */}
            <a className={`${navLinkBase} relative group`} href="#">
              New Launches
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/70 to-indigo-500/0 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </a>
            {/* Shop By Usecase dropdown */}
            <button
              className={`${navLinkBase} relative group`}
              data-active={activeMenu === "usecase"}
              onClick={() => toggleMenu("usecase")}
            >
              <span>Shop By Usecase</span>
              <ChevronDownIcon className="w-4 h-4" />
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/70 to-indigo-500/0 opacity-0 transition-opacity group-hover:opacity-100 data-[active=true]:opacity-100"
              />
            </button>
            {/* More dropdown */}
            <button
              className={`${navLinkBase} relative group`}
              data-active={activeMenu === "more"}
              onClick={() => toggleMenu("more")}
            >
              <span>More</span>
              <ChevronDownIcon className="w-4 h-4" />
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/70 to-indigo-500/0 opacity-0 transition-opacity group-hover:opacity-100 data-[active=true]:opacity-100"
              />
            </button>
            {/* Help dropdown */}
            <button
              className={`${navLinkBase} relative group`}
              data-active={activeMenu === "help"}
              onClick={() => toggleMenu("help")}
            >
              <span>Help</span>
              <ChevronDownIcon className="w-4 h-4" />
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/70 to-indigo-500/0 opacity-0 transition-opacity group-hover:opacity-100 data-[active=true]:opacity-100"
              />
            </button>
          </nav>

          {/* Action icons: search, account, cart */}
          <div className="flex items-center gap-3">
            <button
              className="p-2.5 rounded-full border border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
            <button
              className="p-2.5 rounded-full border border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
              aria-label="Account"
            >
              <UserIcon className="w-6 h-6" />
            </button>
            <button
              className="p-2.5 rounded-full border border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBagIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop dropdown for categories */}
      {activeMenu === "categories" && (
        <div
          ref={dropdownRef}
          className="hidden lg:block absolute inset-x-0 top-full z-40 border-t border-zinc-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm"
        >
          <div className="mx-auto max-w-screen-2xl px-4 py-6 relative">
            {/* Left scroll button */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <button
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white/90 backdrop-blur shadow-sm h-10 w-10 hover:bg-zinc-50"
                onClick={() => scrollCategories("left")}
                aria-label="Scroll left"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            </div>
            {/* Right scroll button */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white/90 backdrop-blur shadow-sm h-10 w-10 hover:bg-zinc-50"
                onClick={() => scrollCategories("right")}
                aria-label="Scroll right"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Categories scroller */}
            <div
              ref={scrollerRef}
              className="flex gap-10 overflow-x-auto no-scrollbar scroll-smooth px-12 py-1"
            >
              {categories.map((category) => (
                <div key={category.id} className="min-w-[220px]">
                  <div className="h-40 w-40 rounded-2xl bg-zinc-50 ring-1 ring-zinc-200 flex items-center justify-center text-zinc-500 text-sm shadow-inner">
                    {category.title}
                  </div>
                  <h4 className="mt-4 font-semibold text-zinc-900">
                    {category.title}
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-zinc-600">
                    {category.items.map((label) => (
                      <li
                        key={label}
                        className="hover:text-zinc-900 cursor-pointer"
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Placeholder dropdown for other menus */}
      {activeMenu && activeMenu !== "categories" && (
        <div
          ref={dropdownRef}
          className="hidden lg:block absolute inset-x-0 top-full z-40 border-t border-zinc-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm"
        >
          <div className="mx-auto max-w-screen-2xl px-4 py-6">
            <div className="text-sm text-zinc-600">
              This is a placeholder for the “{activeMenu}” menu.
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer navigation */}
      <div
        className={`lg:hidden fixed inset-0 z-50 ${
          mobileOpen ? "" : "pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer panel */}
        <div
          className={`absolute inset-y-0 left-0 w-[88%] max-w-sm bg-white/95 backdrop-blur rounded-r-2xl shadow-2xl ring-1 ring-zinc-900/5 transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-zinc-100">
            <Logo />
            {/* Close drawer button */}
            <button
              className="p-2.5 rounded-full border border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile categories grid with left rail */}
          <div className="flex">
            {/* Left rail navigation */}
            <div className="w-24 border-r border-zinc-200 py-3">
              {MOBILE_LEFT_RAIL_ITEMS.map((label) => (
                <div
                  key={label}
                  className="px-3 py-4 text-xs text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-md"
                >
                  {label}
                </div>
              ))}
            </div>
            {/* Categories grid */}
            <div className="flex-1 p-3">
              <div className="text-sm font-semibold mb-3">Categories</div>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="h-16 w-16 rounded-xl bg-zinc-50 ring-1 ring-zinc-200 text-[10px] text-zinc-500 flex items-center justify-center">
                      {c.title}
                    </div>
                    <div className="mt-2 text-[11px] text-zinc-700 line-clamp-2">
                      {c.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Utility to hide scrollbars on mega menu scroller
declare global {
  interface HTMLElementTagNameMap {
    div: HTMLDivElement;
  }
}
