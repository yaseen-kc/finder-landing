import { useEffect, useMemo, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import {
  CART_FLOATING_ARIA,
  CART_FLOATING_STRINGS,
} from "../../constants/floatingPanel/cartFloatingPanelConstants";
import { CART_STRINGS, DEFAULT_CART_ITEMS, type CartItem } from "@cartConstants";

type CartLineItem = CartItem & { qty: number };

type Props = {
  open?: boolean;
};

export default function CartFloatingPanel({ open: forcedOpen }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  // Local demo cart state; integrate with real cart/store when available
  const [cartItems, setCartItems] = useState<CartLineItem[]>(
    DEFAULT_CART_ITEMS.map((i) => ({ ...i, qty: 1 }))
  );

  const totalMrp = useMemo(
    () => cartItems.reduce((sum, li) => sum + li.mrp * li.qty, 0),
    [cartItems]
  );
  const totalPrice = useMemo(
    () => cartItems.reduce((sum, li) => sum + li.price * li.qty, 0),
    [cartItems]
  );

  // Qty updates would be handled in DefaultCart; kept minimal here

  // Open the panel whenever items exist; close when none
  useEffect(() => {
    const shouldOpen = (forcedOpen ?? false) || cartItems.length > 0;
    setIsOpen(shouldOpen);
  }, [forcedOpen, cartItems.length]);

  // Hide when cart drawer opens; show when it closes
  useEffect(() => {
    function handleOpenCart(_e: Event) {
      setIsOpen(false);
    }
    function handleCloseCart(_e: Event) {
      // Only show if we actually have items
      setIsOpen(cartItems.length > 0);
    }
    window.addEventListener("open-cart", handleOpenCart as EventListener);
    window.addEventListener("close-cart", handleCloseCart as EventListener);
    return () => {
      window.removeEventListener("open-cart", handleOpenCart as EventListener);
      window.removeEventListener("close-cart", handleCloseCart as EventListener);
    };
  }, [cartItems.length]);

  // Sync items from header cart so floating panel reflects real cart
  useEffect(() => {
    function handleItemsChanged(e: Event) {
      const custom = e as CustomEvent<{ items: CartLineItem[] }>;
      const newItems = custom.detail?.items ?? [];
      setCartItems(newItems);
      // If empty, ensure panel is hidden
      if (newItems.length === 0) {
        setIsOpen(false);
      }
    }
    window.addEventListener("cart-items-changed", handleItemsChanged as EventListener);
    return () => window.removeEventListener("cart-items-changed", handleItemsChanged as EventListener);
  }, []);

  if (!cartItems.length) return null; // keep hidden when empty

  return (
    <div
      className={`fixed inset-x-0 bottom-20 sm:bottom-6 z-[55] flex justify-center transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-3 w-full max-w-3xl rounded-2xl shadow-xl ring-1 ring-zinc-900/5 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
          <div className="text-base font-semibold text-zinc-900">
            {CART_FLOATING_STRINGS.REVIEW_TITLE}
          </div>
          <button
            aria-label={CART_FLOATING_ARIA.CLOSE}
            className="p-2 rounded-full border border-zinc-200"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        {/* <div className="px-4 py-3 space-y-3">
          {cartItems.map((li) => (
            <div
              key={li.id}
              className="flex items-start gap-3 p-3 rounded-xl ring-1 ring-zinc-200 bg-white"
            >
              <img
                alt={li.title}
                src={li.image}
                className="h-12 w-12 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-zinc-900 line-clamp-1">
                  {li.title}
                </div>
                <div className="mt-2 inline-flex items-center rounded-full ring-1 ring-zinc-200">
                  <button
                    className="px-3 py-1 text-zinc-700"
                    aria-label={CART_ARIA.DECREASE_QTY}
                    onClick={() => updateQty(li.id, -1)}
                  >
                    −
                  </button>
                  <span className="px-3 text-sm select-none">{li.qty}</span>
                  <button
                    className="px-3 py-1 text-zinc-700"
                    aria-label={CART_ARIA.INCREASE_QTY}
                    onClick={() => updateQty(li.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] line-through text-zinc-400">
                  ₹{(li.mrp * li.qty).toLocaleString()}
                </div>
                <div className="text-sm font-semibold text-emerald-700">
                  ₹{(li.price * li.qty).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Footer summary row */}
        <div className="flex items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <div className="text-xs text-zinc-500">
              {cartItems.length === 1
                ? CART_FLOATING_STRINGS.ITEM_ADDED_SINGULAR
                : `${cartItems.length} ${CART_FLOATING_STRINGS.ITEMS_ADDED_PREFIX}`}
            </div>
            <div className="text-xs text-zinc-400 line-through">
              ₹{totalMrp.toLocaleString()}
            </div>
            <div className="text-base font-semibold">₹{totalPrice.toLocaleString()}</div>
            <span className="inline-flex items-center rounded-full bg-emerald-200/80 text-emerald-900 px-2 py-0.5 text-[11px] font-medium">
              {CART_STRINGS.DISCOUNT_BADGE}
            </span>
          </div>
          <button
            className="inline-flex items-center justify-center rounded-xl bg-yellow-400 text-zinc-900 font-semibold px-5 py-2"
            onClick={() => {
              // Open the main cart drawer; keep floating panel visible
              window.dispatchEvent(new CustomEvent("open-cart"));
            }}
          >
            {CART_FLOATING_STRINGS.VIEW_CART}
          </button>
        </div>
      </div>
    </div>
  );
}


