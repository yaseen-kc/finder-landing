import { useMemo, useState } from "react";
import FooterNav from "../components/navigationBar/footerNav";
import HeaderNav from "../components/navigationBar/headerNav";
import {
  CHECKOUT_ARIA,
  CHECKOUT_STRINGS,
  COUNTRY_OPTIONS,
  CURRENCY,
  FORM_LABELS,
  PLACEHOLDERS,
  PAYMENT_METHODS,
  PRICE_LABELS,
  SHIPPING_METHODS,
  STATES_BY_COUNTRY,
  TAX_POLICY,
  VALIDATION,
} from "@checkoutConstant";
import { DEFAULT_CART_ITEMS, type CartItem } from "@cartConstants";

type CartLineItem = CartItem & { qty: number };

type CustomerInfo = {
  fullName: string;
  email: string;
  phone: string;
};

type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type PaymentCard = {
  cardNumber: string;
  expiry: string;
  cvv: string;
};

type FormErrors = Partial<Record<
  | keyof CustomerInfo
  | keyof Address
  | `billing.${keyof Address}`
  | keyof PaymentCard,
  string
>>;

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartLineItem[]>(
    DEFAULT_CART_ITEMS.map((i) => ({ ...i, qty: 1 }))
  );
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [shipping, setShipping] = useState<Address>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: COUNTRY_OPTIONS[0]?.code ?? "IN",
  });
  const [billingSameAsShipping, setBillingSameAsShipping] = useState<boolean>(
    true
  );
  const [billing, setBilling] = useState<Address>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: COUNTRY_OPTIONS[0]?.code ?? "IN",
  });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const [card, setCard] = useState<PaymentCard>({ cardNumber: "", expiry: "", cvv: "" });
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    SHIPPING_METHODS[0]?.id ?? "standard"
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, li) => sum + li.price * li.qty, 0),
    [cartItems]
  );
  const selectedShippingCost = useMemo(
    () => SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.cost ?? 0,
    [shippingMethod]
  );
  const estimatedTax = useMemo(
    () => Math.round(subtotal * TAX_POLICY.ESTIMATE_RATE),
    [subtotal]
  );
  // estimated total derived inline where needed

  function updateQty(id: string, delta: number) {
    setCartItems((prev) =>
      prev
        .map((li) => (li.id === id ? { ...li, qty: li.qty + delta } : li))
        .filter((li) => li.qty > 0)
    );
  }
  function removeItem(id: string) {
    setCartItems((prev) => prev.filter((li) => li.id !== id));
  }

  function validateEmail(value: string): boolean {
    return /.+@.+\..+/.test(value.trim());
  }
  function validatePhone(value: string): boolean {
    return /^[0-9\-+()\s]{7,15}$/.test(value.trim());
  }
  function validatePostal(value: string): boolean {
    return /^[A-Za-z0-9\s-]{3,10}$/.test(value.trim());
  }
  function validateCardNumber(value: string): boolean {
    const digits = value.replace(/\s+/g, "");
    return /^[0-9]{13,19}$/.test(digits);
  }
  function validateExpiry(value: string): boolean {
    return /^(0[1-9]|1[0-2])\/(\d{2})$/.test(value.trim());
  }
  function validateCvv(value: string): boolean {
    return /^\d{3,4}$/.test(value.trim());
  }

  // inline setState handlers used directly in JSX

  function validateAll(): boolean {
    const nextErrors: FormErrors = {};
    if (!customer.fullName.trim()) nextErrors.fullName = VALIDATION.REQUIRED;
    if (!validateEmail(customer.email)) nextErrors.email = VALIDATION.EMAIL;
    if (!validatePhone(customer.phone)) nextErrors.phone = VALIDATION.PHONE;
    if (!shipping.street.trim()) nextErrors.street = VALIDATION.REQUIRED;
    if (!shipping.city.trim()) nextErrors.city = VALIDATION.REQUIRED;
    if (!shipping.state.trim()) nextErrors.state = VALIDATION.REQUIRED;
    if (!validatePostal(shipping.postalCode)) nextErrors.postalCode = VALIDATION.POSTAL;
    if (!shipping.country.trim()) nextErrors.country = VALIDATION.REQUIRED;
    if (paymentMethod === "card") {
      if (!validateCardNumber(card.cardNumber)) nextErrors.cardNumber = VALIDATION.CARD_NUMBER;
      if (!validateExpiry(card.expiry)) nextErrors.expiry = VALIDATION.EXPIRY;
      if (!validateCvv(card.cvv)) nextErrors.cvv = VALIDATION.CVV;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handlePlaceOrder() {
    if (cartItems.length === 0) return;
    if (!validateAll()) return;
    setIsPlacingOrder(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsPlacingOrder(false);
    setOrderPlaced(true);
  }

  // derived state calculated inline in JSX

  return (
    <div>
      <HeaderNav />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-6 lg:py-10">
        <h1 className="text-2xl font-semibold text-zinc-900 mb-6">
          {CHECKOUT_STRINGS.PAGE_TITLE}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Summary */}
            <section className="rounded-2xl ring-1 ring-zinc-200 bg-white p-4 sm:p-5">
              <div className="text-base font-semibold text-zinc-900 mb-4">
                {CHECKOUT_STRINGS.CART_SUMMARY}
              </div>
              {cartItems.length === 0 ? (
                <div className="text-sm text-zinc-600">Your cart is empty.</div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((li) => (
                    <div key={li.id} className="flex items-start gap-3 p-3 rounded-xl ring-1 ring-zinc-200">
                      <img src={li.image} alt={li.title} className="h-16 w-16 rounded-lg object-cover" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-zinc-900 line-clamp-1">{li.title}</div>
                        <div className="mt-2 inline-flex items-center gap-2">
                          <div className="inline-flex items-center rounded-full ring-1 ring-zinc-200">
                            <button className="px-3 py-1 text-zinc-700" aria-label={CHECKOUT_ARIA.DECREASE_QTY} onClick={() => updateQty(li.id, -1)}>
                              −
                            </button>
                            <span className="px-3 text-sm select-none">{li.qty}</span>
                            <button className="px-3 py-1 text-zinc-700" aria-label={CHECKOUT_ARIA.INCREASE_QTY} onClick={() => updateQty(li.id, 1)}>
                              +
                            </button>
                          </div>
                          <button className="text-xs text-error-600 hover:underline" aria-label={CHECKOUT_ARIA.REMOVE_ITEM} onClick={() => removeItem(li.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs line-through text-zinc-400">{CURRENCY.SYMBOL}{li.mrp.toLocaleString()}</div>
                        <div className="text-sm font-semibold text-success-700">{CURRENCY.SYMBOL}{(li.price * li.qty).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 border-t border-zinc-100 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600">{PRICE_LABELS.SUBTOTAL}</span>
                      <span className="font-medium">{CURRENCY.SYMBOL}{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600">{PRICE_LABELS.SHIPPING}</span>
                      <span className="font-medium">{selectedShippingCost === 0 ? "Free" : `${CURRENCY.SYMBOL}${selectedShippingCost.toLocaleString()}`}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600">{PRICE_LABELS.TAX}</span>
                      <span className="font-medium">{CURRENCY.SYMBOL}{estimatedTax.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                      <span className="text-zinc-900 font-medium">{PRICE_LABELS.ESTIMATED_TOTAL}</span>
                      <span className="font-semibold">{CURRENCY.SYMBOL}{(subtotal + estimatedTax + selectedShippingCost).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Customer Information */}
            <section className="rounded-2xl ring-1 ring-zinc-200 bg-white p-4 sm:p-5">
              <div className="text-base font-semibold text-zinc-900 mb-4">``
                {CHECKOUT_STRINGS.CUSTOMER_INFO}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.FULL_NAME}</label>
                  <input className="mt-1 w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder={PLACEHOLDERS.FULL_NAME} value={customer.fullName} onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })} />
                  {errors.fullName && <div className="mt-1 text-xs text-error-600">{errors.fullName}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.EMAIL}</label>
                  <input className="mt-1 w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder={PLACEHOLDERS.EMAIL} value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} type="email" />
                  {errors.email && <div className="mt-1 text-xs text-error-600">{errors.email}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.PHONE}</label>
                  <input className="mt-1 w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder={PLACEHOLDERS.PHONE} value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} type="tel" />
                  {errors.phone && <div className="mt-1 text-xs text-error-600">{errors.phone}</div>}
                </div>
              </div>
            </section>

            {/* Shipping Information */}
            <section className="rounded-2xl ring-1 ring-zinc-200 bg-white p-4 sm:p-5">
              <div className="text-base font-semibold text-zinc-900 mb-4">{CHECKOUT_STRINGS.SHIPPING_INFO}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.STREET}</label>
                  <input className="mt-1 w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder={PLACEHOLDERS.STREET} value={shipping.street} onChange={(e) => setShipping({ ...shipping, street: e.target.value })} />
                </div>
                {errors.street && <div className="mt-1 text-xs text-error-600">{errors.street}</div>}
                <div>
                  <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.CITY}</label>
                  <input className="mt-1 w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder={PLACEHOLDERS.CITY} value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                  {errors.city && <div className="mt-1 text-xs text-error-600">{errors.city}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.STATE}</label>
                  <select className="mt-1 w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900" value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })}>
                    <option value="">--</option>
                    {(STATES_BY_COUNTRY[shipping.country] ?? []).map((s) => (
                      <option key={s.code} value={s.code}>{s.label}</option>
                    ))}
                  </select>
                  {errors.state && <div className="mt-1 text-xs text-error-600">{errors.state}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.POSTAL_CODE}</label>
                  <input className="mt-1 w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder={PLACEHOLDERS.POSTAL_CODE} value={shipping.postalCode} onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })} />
                  {errors.postalCode && <div className="mt-1 text-xs text-error-600">{errors.postalCode}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.COUNTRY}</label>
                  <select className="mt-1 w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900" value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })}>
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c.code} value={c.code}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.SHIPPING_METHOD}</label>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SHIPPING_METHODS.map((m) => (
                    <button key={m.id} className={`text-left rounded-xl ring-1 px-4 py-3 ${shippingMethod === m.id ? "ring-zinc-900 bg-zinc-50" : "ring-zinc-200"}`} onClick={() => setShippingMethod(m.id)} type="button">
                      <div className="font-medium">{m.label}</div>
                      <div className="text-xs text-zinc-600">{m.eta}</div>
                      <div className="text-sm font-semibold mt-1">{m.cost === 0 ? "Free" : `${CURRENCY.SYMBOL}${m.cost.toLocaleString()}`}</div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Payment Information */}
            <section className="rounded-2xl ring-1 ring-zinc-200 bg-white p-4 sm:p-5">
              <div className="text-base font-semibold text-zinc-900 mb-4">{CHECKOUT_STRINGS.PAYMENT_INFO}</div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.PAYMENT_METHOD}</label>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((pm) => (
                    <button key={pm.id} className={`text-left rounded-xl ring-1 px-4 py-3 ${paymentMethod === pm.id ? "ring-zinc-900 bg-zinc-50" : "ring-zinc-200"}`} onClick={() => setPaymentMethod(pm.id)} type="button">
                      <div className="font-medium">{pm.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.CARD_NUMBER}</label>
                    <input className="mt-1 w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder={PLACEHOLDERS.CARD_NUMBER} value={card.cardNumber} onChange={(e) => setCard({ ...card, cardNumber: e.target.value })} inputMode="numeric" />
                    {errors.cardNumber && <div className="mt-1 text-xs text-error-600">{errors.cardNumber}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.EXPIRY}</label>
                    <input className="mt-1 w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder={PLACEHOLDERS.EXPIRY} value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />
                    {errors.expiry && <div className="mt-1 text-xs text-error-600">{errors.expiry}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.CVV}</label>
                    <input className="mt-1 w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder={PLACEHOLDERS.CVV} value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} inputMode="numeric" />
                    {errors.cvv && <div className="mt-1 text-xs text-error-600">{errors.cvv}</div>}
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center gap-2">
                <input id="billing-same" type="checkbox" checked={billingSameAsShipping} onChange={(e) => setBillingSameAsShipping(e.target.checked)} />
                <label htmlFor="billing-same" className="text-sm text-zinc-800">{CHECKOUT_STRINGS.BILLING_SAME_AS_SHIPPING}</label>
              </div>

              {!billingSameAsShipping && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700">{FORM_LABELS.BILLING_ADDRESS}</label>
                    <input className="mt-1 w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder={PLACEHOLDERS.STREET} value={billing.street} onChange={(e) => setBilling({ ...billing, street: e.target.value })} />
                  </div>
                  <div>
                    <input className="w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder={PLACEHOLDERS.CITY} value={billing.city} onChange={(e) => setBilling({ ...billing, city: e.target.value })} />
                  </div>
                  <div>
                    <select className="w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900" value={billing.state} onChange={(e) => setBilling({ ...billing, state: e.target.value })}>
                      <option value="">--</option>
                      {(STATES_BY_COUNTRY[billing.country] ?? []).map((s) => (
                        <option key={s.code} value={s.code}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input className="w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder={PLACEHOLDERS.POSTAL_CODE} value={billing.postalCode} onChange={(e) => setBilling({ ...billing, postalCode: e.target.value })} />
                  </div>
                  <div>
                    <select className="w-full rounded-lg ring-1 ring-zinc-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900" value={billing.country} onChange={(e) => setBilling({ ...billing, country: e.target.value })}>
                      {COUNTRY_OPTIONS.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Order Review */}
          <aside className="lg:col-span-1 space-y-6">
            <section className="rounded-2xl ring-1 ring-zinc-200 bg-white p-4 sm:p-5">
              <div className="text-base font-semibold text-zinc-900 mb-2">
                {CHECKOUT_STRINGS.ORDER_REVIEW}
              </div>
              <div className="space-y-2 text-sm">
                {cartItems.map((li) => (
                  <div key={li.id} className="flex items-center justify-between">
                    <div className="min-w-0">
                      <div className="text-zinc-900 line-clamp-1">{li.title}</div>
                    </div>
                    <div className="font-medium">{CURRENCY.SYMBOL}{(li.price * li.qty).toLocaleString()}</div>
                  </div>
                ))}
                <div className="pt-2 border-t border-zinc-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-600">{PRICE_LABELS.SUBTOTAL}</span>
                    <span className="font-medium">{CURRENCY.SYMBOL}{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-600">{PRICE_LABELS.TAX}</span>
                    <span className="font-medium">{CURRENCY.SYMBOL}{estimatedTax.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-600">{PRICE_LABELS.SHIPPING}</span>
                    <span className="font-medium">{selectedShippingCost === 0 ? "Free" : `${CURRENCY.SYMBOL}${selectedShippingCost.toLocaleString()}`}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                    <span className="text-zinc-900 font-medium">{PRICE_LABELS.ESTIMATED_TOTAL}</span>
                    <span className="font-semibold">{CURRENCY.SYMBOL}{(subtotal + estimatedTax + selectedShippingCost).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button className="mt-4 w-full inline-flex items-center justify-center rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3" onClick={handlePlaceOrder} disabled={isPlacingOrder || cartItems.length === 0}>
                {isPlacingOrder && <span className="mr-2 inline-block h-4 w-4 rounded-full border-2 border-white border-r-transparent animate-spin" />}
                {orderPlaced ? "Order Placed" : CHECKOUT_STRINGS.PLACE_ORDER}
              </button>
              {orderPlaced && <div className="mt-2 text-sm text-success-700">Your order has been placed. (demo)</div>}
            </section>
          </aside>
        </div>
      </div>
      <FooterNav />
    </div>
  );
}
