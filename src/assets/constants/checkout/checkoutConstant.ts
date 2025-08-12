export type CountryOption = {
  code: string; // ISO code
  label: string;
};

export type StateOption = {
  code: string;
  label: string;
};

export type ShippingMethodId = "standard" | "express";

export type ShippingMethod = {
  id: ShippingMethodId;
  label: string;
  eta: string; // e.g. "3-5 business days"
  cost: number; // in smallest currency unit if needed; here plain number in INR
};

export type PaymentMethodId = "card" | "cod";

export const CURRENCY = {
  SYMBOL: "₹",
} as const;

export const CHECKOUT_STRINGS = {
  PAGE_TITLE: "Checkout",
  CART_SUMMARY: "Cart Summary",
  CUSTOMER_INFO: "Customer Information",
  SHIPPING_INFO: "Shipping Information",
  PAYMENT_INFO: "Payment Information",
  ORDER_REVIEW: "Order Review",
  PLACE_ORDER: "Place Order",
  BILLING_SAME_AS_SHIPPING: "Billing address same as shipping",
} as const;

export const CHECKOUT_ARIA = {
  INCREASE_QTY: "Increase quantity",
  DECREASE_QTY: "Decrease quantity",
  REMOVE_ITEM: "Remove item",
  SELECT_COUNTRY: "Select country",
  SELECT_STATE: "Select state or province",
} as const;

export const PRICE_LABELS = {
  PRICE: "Price",
  QTY: "Qty",
  TOTAL: "Total",
  SUBTOTAL: "Subtotal",
  SHIPPING: "Shipping",
  TAX: "Estimated Tax",
  ESTIMATED_TOTAL: "Estimated Total",
} as const;

export const FORM_LABELS = {
  // Customer
  FULL_NAME: "Full Name",
  EMAIL: "Email Address",
  PHONE: "Phone Number",
  // Shipping
  STREET: "Street Address",
  CITY: "City",
  STATE: "State/Province",
  POSTAL_CODE: "Postal/ZIP Code",
  COUNTRY: "Country",
  SHIPPING_METHOD: "Shipping Method",
  // Payment
  PAYMENT_METHOD: "Payment Method",
  CARD_NUMBER: "Card Number",
  EXPIRY: "Expiry (MM/YY)",
  CVV: "CVV",
  BILLING_ADDRESS: "Billing Address",
} as const;

export const PLACEHOLDERS = {
  FULL_NAME: "John Doe",
  EMAIL: "john@example.com",
  PHONE: "9876543210",
  STREET: "123, Main Street",
  CITY: "Mumbai",
  STATE: "Select state",
  POSTAL_CODE: "400001",
  COUNTRY: "Select country",
  CARD_NUMBER: "4242 4242 4242 4242",
  EXPIRY: "MM/YY",
  CVV: "123",
} as const;

export const VALIDATION = {
  REQUIRED: "This field is required",
  EMAIL: "Enter a valid email address",
  PHONE: "Enter a valid phone number",
  POSTAL: "Enter a valid postal/ZIP code",
  CARD_NUMBER: "Enter a valid card number",
  EXPIRY: "Enter a valid expiry in MM/YY",
  CVV: "Enter a valid CVV",
} as const;

export const COUNTRY_OPTIONS: CountryOption[] = [
  { code: "IN", label: "India" },
  { code: "US", label: "United States" },
  { code: "CA", label: "Canada" },
];

export const STATES_BY_COUNTRY: Record<string, StateOption[]> = {
  IN: [
    { code: "MH", label: "Maharashtra" },
    { code: "KA", label: "Karnataka" },
    { code: "DL", label: "Delhi" },
    { code: "GJ", label: "Gujarat" },
    { code: "TN", label: "Tamil Nadu" },
  ],
  US: [
    { code: "CA", label: "California" },
    { code: "NY", label: "New York" },
    { code: "TX", label: "Texas" },
  ],
  CA: [
    { code: "ON", label: "Ontario" },
    { code: "BC", label: "British Columbia" },
    { code: "QC", label: "Quebec" },
  ],
};

export const SHIPPING_METHODS: ShippingMethod[] = [
  { id: "standard", label: "Standard", eta: "3-5 business days", cost: 0 },
  { id: "express", label: "Express", eta: "1-2 business days", cost: 149 },
];

export const PAYMENT_METHODS: { id: PaymentMethodId; label: string }[] = [
  { id: "card", label: "Credit/Debit Card" },
  { id: "cod", label: "Cash on Delivery" },
];

export const TAX_POLICY = {
  ESTIMATE_RATE: 0.18, // 18% placeholder
  NOTE: "Tax is estimated and will be finalized at payment.",
} as const;


