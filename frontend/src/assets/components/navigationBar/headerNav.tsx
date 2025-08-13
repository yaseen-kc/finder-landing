import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowTrendingUpIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  NAV_CATEGORIES,
  MOBILE_LEFT_RAIL_ITEMS,
  HEADER_NAV_LABELS,
  HEADER_STRINGS,
  HEADER_ARIA,
  type Category,
  SEARCH_LABELS,
  POPULAR_SEARCHES,
  type PopularSearch,
} from "../../constants/navigationBar/headerConstants";
import { BRAND_LOGO_SRC } from "../../constants/navigationBar/brandConstants";
import DefaultCart from "../cart/defaultCart";
import { DEFAULT_CART_ITEMS, type CartItem } from "@cartConstants";


// Logo component for the navigation bar
function Logo() {
  return (
    <Link
      to="/"
      aria-label="Go to home"
      className="select-none inline-flex items-center"
    >
      <img
        src={BRAND_LOGO_SRC}
        alt="Brand logo"
        className="h-8 w-auto"
        loading="eager"
        decoding="async"
      />
    </Link>
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
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // Tracks which dropdown is open
  const [mobileOpen, setMobileOpen] = useState(false); // Tracks mobile drawer state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  type CartLineItem = CartItem & { qty: number };
  const [cartItems, setCartItems] = useState<CartLineItem[]>(
    DEFAULT_CART_ITEMS.map((i) => ({ ...i, qty: 1 }))
  );

  const categories: Category[] = NAV_CATEGORIES;

  const dropdownRef = useOutsideClick<HTMLDivElement>(() =>
    setActiveMenu(null)
  );
  const searchDropdownRef = useOutsideClick<HTMLDivElement>(() =>
    setSearchOpen(false)
  );
  const accountDropdownRef = useOutsideClick<HTMLDivElement>(() =>
    setAccountOpen(false)
  );
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Close dropdown/search on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setSearchOpen(false);
        setAccountOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus input when opening search
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [searchOpen]);

  // Listen for global request to open cart (from floating panel's View Cart)
  useEffect(() => {
    function handleOpenCart() {
      setCartOpen(true);
    }
    window.addEventListener("open-cart", handleOpenCart as EventListener);
    return () => window.removeEventListener("open-cart", handleOpenCart as EventListener);
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

  // Cart helpers
  function updateQty(id: string, delta: number) {
    setCartItems((prev) =>
      prev
        .map((li) =>
          li.id === id ? { ...li, qty: Math.max(0, li.qty + delta) } : li
        )
        .filter((li) => li.qty > 0)
    );
  }

  // Announce open/close of cart so floating panel can react
  useEffect(() => {
    if (cartOpen) {
      window.dispatchEvent(new CustomEvent("open-cart"));
    } else {
      window.dispatchEvent(new CustomEvent("close-cart"));
    }
  }, [cartOpen]);

  // Broadcast cart items whenever they change so floating panel can sync
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("cart-items-changed", {
        detail: { items: cartItems },
      })
    );
  }, [cartItems]);

  // Base styles for nav links
  const navLinkBase =
    "px-3 py-2 text-sm font-medium text-zinc-700 hover:text-primary-700 rounded-md transition-colors inline-flex items-center gap-1 data-[active=true]:text-primary-700";

  const totalCartQty = cartItems.reduce((sum, li) => sum + li.qty, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white supports-[backdrop-filter]:bg-white">
      <div className="mx-auto max-w-screen-2xl px-4">
        {/* Top navigation row */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile menu button (hamburger) */}
            <button
              aria-label={HEADER_ARIA.OPEN_MENU}
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
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => toggleMenu("categories")}
            >
              <span>{HEADER_NAV_LABELS.CATEGORIES}</span>
              {activeMenu === "categories" ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-primary-600/0 via-primary-600/70 to-primary-600/0 opacity-0 transition-opacity group-hover:opacity-100 data-[active=true]:opacity-100"
              />
            </button>
            {/* Combos link */}
            <a className={`${navLinkBase} relative group`} href="#">
              {HEADER_NAV_LABELS.COMBOS}
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-primary-600/0 via-primary-600/70 to-primary-600/0 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </a>
            {/* Bestsellers dropdown */}
            <button
              className={`${navLinkBase} relative group`}
              data-active={activeMenu === "bestsellers"}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => toggleMenu("bestsellers")}
            >
              <span>{HEADER_NAV_LABELS.BESTSELLERS}</span>
              {activeMenu === "bestsellers" ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-primary-600/0 via-primary-600/70 to-primary-600/0 opacity-0 transition-opacity group-hover:opacity-100 data-[active=true]:opacity-100"
              />
            </button>
            {/* New Launches link */}
            <a className={`${navLinkBase} relative group`} href="#">
              {HEADER_NAV_LABELS.NEW_LAUNCHES}
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-primary-600/0 via-primary-600/70 to-primary-600/0 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </a>
            {/* Shop By Usecase dropdown */}
            <button
              className={`${navLinkBase} relative group`}
              data-active={activeMenu === "usecase"}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => toggleMenu("usecase")}
            >
              <span>{HEADER_NAV_LABELS.SHOP_BY_USECASE}</span>
              {activeMenu === "usecase" ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-primary-600/0 via-primary-600/70 to-primary-600/0 opacity-0 transition-opacity group-hover:opacity-100 data-[active=true]:opacity-100"
              />
            </button>
            {/* More dropdown */}
            <button
              className={`${navLinkBase} relative group`}
              data-active={activeMenu === "more"}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => toggleMenu("more")}
            >
              <span>{HEADER_NAV_LABELS.MORE}</span>
              {activeMenu === "more" ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-primary-600/0 via-primary-600/70 to-primary-600/0 opacity-0 transition-opacity group-hover:opacity-100 data-[active=true]:opacity-100"
              />
            </button>
            {/* Help dropdown */}
            <button
              className={`${navLinkBase} relative group`}
              data-active={activeMenu === "help"}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => toggleMenu("help")}
            >
              <span>{HEADER_NAV_LABELS.HELP}</span>
              {activeMenu === "help" ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-primary-600/0 via-primary-600/70 to-primary-600/0 opacity-0 transition-opacity group-hover:opacity-100 data-[active=true]:opacity-100"
              />
            </button>
          </nav>

          {/* Action icons: search, account, cart */}
          <div className="flex items-center gap-3">
            <button
              className="p-2.5 rounded-full border border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
              aria-label={HEADER_ARIA.SEARCH}
              onClick={() => setSearchOpen(true)}
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
            {/* Account dropdown */}
            <div className="relative" ref={accountDropdownRef}>
              <button
                type="button"
                className="p-2.5 rounded-full border border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                aria-label={HEADER_ARIA.ACCOUNT}
                onClick={() => {
                  setAccountOpen((prev) => !prev);
                  setActiveMenu(null);
                  setSearchOpen(false);
                }}
              >
                <UserIcon className="w-6 h-6" />
              </button>
              {accountOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-40 rounded-md border border-zinc-200 bg-white shadow-md z-50 py-1"
                >
                  <Link
                    to="/profile"
                    role="menuitem"
                    className="block w-full text-left px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                    onClick={() => setAccountOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    className="block w-full text-left px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                    onClick={() => {
                      setAccountOpen(false);
                      navigate("/account/login");
                    }}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
            <button
              className="relative p-2.5 rounded-full border border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
              aria-label={HEADER_ARIA.CART}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBagIcon className="w-6 h-6" />
              {totalCartQty > 0 && (
                <span
                  aria-live="polite"
                  className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-zinc-900 text-white text-[10px] min-w-[18px] h-[18px] px-1 leading-none"
                >
                  {totalCartQty}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop search overlay */}
      {searchOpen && (
        <div
          ref={searchDropdownRef}
          className="hidden lg:block absolute inset-x-0 top-full z-40 border-t border-zinc-100 bg-white backdrop-blur supports-[backdrop-filter]:bg-white shadow-sm rounded-b-md"
        >
          <div className="mx-auto max-w-screen-2xl px-4 py-6">
            <div className="rounded-md bg-zinc-100/80 ring-1 ring-zinc-200 px-4 py-3">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={SEARCH_LABELS.PLACEHOLDER}
                className="w-full bg-transparent outline-none text-zinc-700 placeholder:text-zinc-400"
              />
            </div>
            <div className="mt-6">
              <div className="text-sm font-medium text-zinc-800">
                {SEARCH_LABELS.POPULAR_TITLE}
              </div>
              <div className="mt-3 flex items-stretch gap-6">
                {POPULAR_SEARCHES.map((item: PopularSearch) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSearchQuery(item.label)}
                    className="group inline-flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2 shadow-sm hover:bg-zinc-50"
                  >
                   <ArrowTrendingUpIcon className="h-4 w-4 text-primary-600/60" />
                    <img
                      src={item.image}
                      alt={item.label}
                      className="h-8 w-8 rounded-xl object-cover"
                      loading="lazy"
                    />
                    <span className="text-sm text-zinc-700 group-hover:text-primary-700">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop dropdown for categories */}
      {activeMenu === "categories" && (
        <div
          ref={dropdownRef}
          className="hidden lg:block absolute inset-x-0 top-full z-40 border-t border-zinc-100 bg-white backdrop-blur supports-[backdrop-filter]:bg-white shadow-sm rounded-b-md"
        >
          <div className="mx-auto max-w-screen-2xl px-4 py-6 relative">
            {/* Left scroll button */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <button
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white/90 backdrop-blur shadow-sm h-10 w-10 hover:bg-zinc-50"
                onClick={() => scrollCategories("left")}
                aria-label={HEADER_ARIA.SCROLL_LEFT}
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            </div>
            {/* Right scroll button */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white/90 backdrop-blur shadow-sm h-10 w-10 hover:bg-zinc-50"
                onClick={() => scrollCategories("right")}
                aria-label={HEADER_ARIA.SCROLL_RIGHT}
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
          className="hidden lg:block absolute inset-x-0 top-full z-40 border-t border-zinc-100 bg-white backdrop-blur supports-[backdrop-filter]:bg-white shadow-sm rounded-b-md"
        >
          <div className="mx-auto max-w-screen-2xl px-4 py-6">
            <div className="text-sm text-zinc-600">
              {HEADER_STRINGS.PLACEHOLDER_PREFIX}
              {activeMenu}
              {HEADER_STRINGS.PLACEHOLDER_SUFFIX}
            </div>
          </div>
        </div>
      )}

      {/* Mobile full-screen search */}
      {searchOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          <div className="p-3 flex items-center gap-2">
            <button
              className="p-2 rounded-full border border-zinc-200"
              aria-label="Back"
              onClick={() => setSearchOpen(false)}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <div className="flex-1 rounded-md bg-zinc-100/80 ring-1 ring-zinc-200 px-3 py-2">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={SEARCH_LABELS.PLACEHOLDER}
                className="w-full bg-transparent outline-none text-sm text-zinc-700 placeholder:text-zinc-400"
              />
            </div>
          </div>
          <div className="px-4 bg-white pb-3 rounded-b-lg">
            <div className="text-sm font-medium text-zinc-800">
              {SEARCH_LABELS.POPULAR_TITLE}
            </div>
            <div className="mt-4 space-y-5">
              {POPULAR_SEARCHES.map((item: PopularSearch) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSearchQuery(item.label)}
                  className="w-full flex items-center gap-4"
                >
                  <ArrowTrendingUpIcon className="h-4 w-4 text-zinc-400" />
                  <img
                    src={item.image}
                    alt={item.label}
                    className="h-10 w-10 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <span className="text-sm text-zinc-700">{item.label}</span>
                </button>
              ))}
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
          className={`absolute inset-y-0 left-0 w-[88%] max-w-sm bg-white rounded-r-2xl shadow-2xl ring-1 ring-zinc-900/5 transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b bg-white border-zinc-100">
            <Logo />
            {/* Close drawer button */}
            <button
              className="p-2.5 rounded-full border border-zinc-200/70 hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
              aria-label={HEADER_ARIA.CLOSE_MENU}
              onClick={() => setMobileOpen(false)}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile categories grid with left rail */}
          <div className="flex bg-white rounded-b-md">
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
      {/* Cart drawer */}
      <DefaultCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={updateQty}
        onRemoveItem={(id: string) =>
          setCartItems((prev) => prev.filter((li) => li.id !== id))
        }
      />
    </header>
  );
}

// Utility to hide scrollbars on mega menu scroller
declare global {
  interface HTMLElementTagNameMap {
    div: HTMLDivElement;
  }
}
