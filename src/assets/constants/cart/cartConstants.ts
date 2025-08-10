export type CartItem = {
  id: string;
  title: string;
  color: string;
  mrp: number; // Maximum retail price
  price: number; // Effective selling price
  image: string;
};

// Cart UI labels and copy
export const CART_STRINGS = {
  TITLE: "Your Cart",
  EMPTY_TITLE: "Explore our Bestsellers",
  EMPTY_SUBTITLE: "No items in the cart",
  EXPLORE_NOW: "Explore Now",
  PRICE_BREAKDOWN: "Price Breakdown",
  PROCEED: "Proceed to Checkout",
  DISCOUNT_BADGE: "Applied",
  REMOVE_DIALOG_TITLE: "Remove item from cart ?",
  REMOVE_DIALOG_DESC:
    "Sure you want to Remove, this action can’t be undone. You'll need to add it again",
  CANCEL: "Cancel",
  REMOVE: "Remove",
} as const;

export const CART_ARIA = {
  OPEN_CART: "Open cart",
  CLOSE_CART: "Close cart",
  INCREASE_QTY: "Increase quantity",
  DECREASE_QTY: "Decrease quantity",
  REMOVE_ITEM: "Remove item",
  CLOSE_DIALOG: "Close dialog",
} as const;

export const CART_PRICE_LABELS = {
  MRP: "MRP",
  DELIVERY_FEE: "Delivery Fee",
  DISCOUNT: "Discount",
  TOTAL_PRICE: "Total Price",
} as const;

export const CART_POLICY = {
  TITLE: "Cancellation Policy",
  POINTS: [
    "Orders can be canceled before they are shipped.",
    "Once dispatched, cancellations are not allowed.",
    "You will receive a confirmation email or SMS once your cancellation request is processed.",
    "If your payment was made online, a refund will be processed within 7 working days.",
  ],
  DELIVERY_FEE_MRP: 49,
} as const;

// Default cart seed (used for demo and local state)
export const DEFAULT_CART_ITEMS: CartItem[] = [
  {
    id: "wedge-plus",
    title: "Ultimate Wedge Plus Cushion",
    color: "White",
    mrp: 4799,
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=256&h=256&fit=crop&auto=format&q=60",
  },
];


