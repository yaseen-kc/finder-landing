import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { CART_ARIA, CART_POLICY, CART_PRICE_LABELS, CART_STRINGS, type CartItem } from "@cartConstants";



type CartLineItem = CartItem & { qty: number };

type DefaultCartProps = {
  open: boolean;
  onClose: () => void;
  items: CartLineItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
};

export default function DefaultCart({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
}: DefaultCartProps) {
  const [policyOpen, setPolicyOpen] = useState(true);
  const [removeId, setRemoveId] = useState<string | null>(null);

  const totalMrp = items.reduce((sum, li) => sum + li.mrp * li.qty, 0);
  const totalPrice = items.reduce((sum, li) => sum + li.price * li.qty, 0);
  const totalDiscount = Math.max(totalMrp - totalPrice, 0);

  function requestRemove(id: string) {
    setRemoveId(id);
  }

  function confirmRemove() {
    if (!removeId) return;
    onRemoveItem(removeId);
    setRemoveId(null);
  }

  function cancelRemove() {
    setRemoveId(null);
  }

  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[440px] bg-white shadow-2xl ring-1 ring-zinc-900/5 transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
        role="dialog"
        aria-label={CART_STRINGS.TITLE}
      >
        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b border-zinc-100">
          <button
            className="p-2 rounded-full border border-zinc-200"
            aria-label={CART_ARIA.CLOSE_CART}
            onClick={onClose}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <div className="text-base font-medium">{CART_STRINGS.TITLE}</div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full grid place-items-center">
              <div className="flex flex-col items-center text-center max-w-xs mx-auto">
                <ShoppingBagIcon className="w-16 h-16 text-zinc-300" />
                <div className="mt-4 text-sm font-semibold text-zinc-400">
                  {CART_STRINGS.EMPTY_TITLE}
                </div>
                <div className="mt-1 text-sm text-zinc-800">
                  {CART_STRINGS.EMPTY_SUBTITLE}
                </div>
                <button
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-zinc-900 text-white px-5 py-2 text-sm"
                  onClick={onClose}
                >
                  {CART_STRINGS.EXPLORE_NOW}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Review section */}
              <div>
                <div className="text-sm font-semibold text-zinc-900">
                  Review Your Order
                  <span className="ml-2 text-xs font-normal text-zinc-500">
                    {items.length} Item
                  </span>
                </div>
                <div className="mt-3 space-y-3">
                  {items.map((li) => (
                    <div
                      key={li.id}
                      className="flex items-start gap-3 p-3 rounded-xl ring-1 ring-zinc-200 bg-white"
                    >
                      <img
                        src={li.image}
                        alt={li.title}
                        className="h-16 w-16 rounded-lg object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-zinc-900 line-clamp-1">
                          {li.title}
                        </div>
                        <div className="text-xs text-zinc-500 mt-0.5">
                          Color: {li.color}
                        </div>
                        <div className="mt-2 inline-flex items-center gap-2">
                          <div className="inline-flex items-center rounded-full ring-1 ring-zinc-200">
                            <button
                              className="px-3 py-1 text-zinc-700"
                              aria-label={CART_ARIA.DECREASE_QTY}
                              onClick={() =>
                                li.qty <= 1
                                  ? requestRemove(li.id)
                                  : onUpdateQty(li.id, -1)
                              }
                            >
                              −
                            </button>
                            <span className="px-3 text-sm select-none">{li.qty}</span>
                            <button
                              className="px-3 py-1 text-zinc-700"
                              aria-label={CART_ARIA.INCREASE_QTY}
                              onClick={() => onUpdateQty(li.id, 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="text-xs text-error-600 hover:underline"
                            aria-label={CART_ARIA.REMOVE_ITEM}
                            onClick={() => requestRemove(li.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs line-through text-zinc-400">
                          ₹{li.mrp.toLocaleString()}
                        </div>
                <div className="text-sm font-semibold text-success-700">
                          ₹{li.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price breakdown */}
              <div>
                <div className="text-sm font-semibold text-zinc-900 mb-2">
                  {CART_STRINGS.PRICE_BREAKDOWN}
                </div>
                <div className="rounded-xl ring-1 ring-zinc-200 bg-white p-3 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600">{CART_PRICE_LABELS.MRP}</span>
                    <span className="font-medium">₹{totalMrp.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600">{CART_PRICE_LABELS.DELIVERY_FEE}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-zinc-400 line-through">₹{CART_POLICY.DELIVERY_FEE_MRP}</span>
                      <span className="text-success-600 font-medium">Free</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600">{CART_PRICE_LABELS.DISCOUNT}</span>
                    <span className="text-success-700 font-semibold">₹{totalDiscount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-zinc-100">
                    <span className="text-zinc-900 font-medium">{CART_PRICE_LABELS.TOTAL_PRICE}</span>
                    <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Cancellation policy */}
              <div className="rounded-xl ring-1 ring-zinc-200 bg-white">
                <button
                  className="w-full flex items-center justify-between p-3"
                  onClick={() => setPolicyOpen((v) => !v)}
                >
                  <span className="text-sm font-semibold text-zinc-900">{CART_POLICY.TITLE}</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform ${policyOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
                {policyOpen && (
                  <div className="px-4 pb-3">
                    <ul className="list-disc pl-4 text-sm text-zinc-700 space-y-1">
                      {CART_POLICY.POINTS.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-100 p-3 bg-white">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-zinc-700">
              {CART_PRICE_LABELS.TOTAL_PRICE}
              {totalDiscount > 0 && (
                <span className="ml-2 text-success-700 bg-success-50 rounded-full px-2 py-0.5 text-xs align-middle">
                  ₹ {totalDiscount.toLocaleString()} applied!
                </span>
              )}
            </span>
            <span className="font-semibold">₹{totalPrice.toLocaleString()}</span>
          </div>
          <button
            className="w-full inline-flex items-center justify-center rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3"
            disabled={items.length === 0}
          >
            {CART_STRINGS.PROCEED}
          </button>
          <div className="mt-3 flex items-center justify-center gap-6 text-[11px] text-zinc-500">
            <span>Hassle Free Shipping</span>
            <span>7-Day Easy Returns</span>
          </div>
        </div>

        {/* Remove dialog */}
        {removeId && (
          <div className="absolute inset-0 grid place-items-center bg-black/20">
            <div className="w-[90%] sm:w-[85%] max-w-sm bg-white rounded-2xl shadow-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-base font-semibold text-zinc-900">
                  {CART_STRINGS.REMOVE_DIALOG_TITLE}
                </div>
                <button
                  className="p-1 rounded-full border border-zinc-200"
                  aria-label={CART_ARIA.CLOSE_DIALOG}
                  onClick={cancelRemove}
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 text-sm text-zinc-600">{CART_STRINGS.REMOVE_DIALOG_DESC}</div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <button className="px-4 py-2 rounded-xl ring-1 ring-zinc-200 text-zinc-900 w-full" onClick={cancelRemove}>
                  {CART_STRINGS.CANCEL}
                </button>
                <button className="px-4 py-2 rounded-xl bg-error-600 text-white w-full" onClick={confirmRemove}>
                  {CART_STRINGS.REMOVE}
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
