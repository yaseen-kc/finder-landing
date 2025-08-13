export type AccountNavItem = {
    id: string;
    label: string;
    href: string;
};

export type OrderItem = {
    id: string;
    title: string;
    price: number;
    image: string;
    qty: number;
};

export type Order = {
    id: string;
    status: "Order Placed" | "Order Confirmed" | "Shipped" | "Out for Delivery" | "Delivered" | "Cancelled";
    createdAt: string; // ISO date
    items: OrderItem[];
    paymentMethod: "COD" | "Prepaid";
    shippingAddress: string;
    trackingId: string;
    totals: {
        sellingPrice: number;
        deliveryFee: number;
        taxes: number;
        totalPrice: number;
    };
};

export type Profile = {
    name: string;
    email: string;
    mobile?: string;
    gender?: "Male" | "Female" | "Other";
    dob?: string; // ISO date (YYYY-MM-DD)
};

export type SavedAddress = {
    id: string;
    fullName: string;
    mobileNumber: string;
    pincode: string;
    locality: string;
    addressLine: string;
    cityDistrictTown: string;
    stateTerritoryRegion: string;
    landmark?: string;
};

export const PROFILE_LABELS = {
    PAGE_TITLE: "My Account",
    NAV_PROFILE_DETAILS: "Profile Details",
    NAV_ORDER_HISTORY: "Order History",
    NAV_ADDRESS: "Addresses",
    NAV_LOGOUT: "Log Out",
    PROFILE_DETAILS_TITLE: "Profile Details",
    PERSONAL_INFO: "Personal Info",
    NAME_LABEL: "Name",
    EMAIL_LABEL: "Email",
    MOBILE_LABEL: "Mobile",
    GENDER_LABEL: "Gender",
    DOB_LABEL: "Date of Birth",
    EDIT: "Edit",
    SAVE: "Save",
    ORDER_LIST_TITLE: "Order List",
    ORDER_SUMMARY_TITLE: "Order Summary",
    DOWNLOAD_INVOICE: "Download Invoice",
    TRACK_ORDER: "Track Order",
    TRACKING: "Tracking",
    TRACKING_ID: "Tracking ID",
    CANCEL: "Cancel",
    ORDER_DETAILS: "Order Details",
    PRICE_BREAKDOWN: "Price Breakdown",
    ORDER_ID: "Order Id",
    PAYMENT: "Payment",
    DELIVER_TO: "Deliver To",
    SELLING_PRICE: "Selling Price",
    DELIVERY_FEE: "Delivery Fee",
    TAXES: "Taxes",
    TOTAL_PRICE: "Total Price",
    ADDRESS_TITLE: "Addresses",
    ADD_NEW_ADDRESS: "Add New Address",
    EDIT_ADDRESS: "Edit Address",
    FULL_NAME: "Full Name",
    MOBILE_NUMBER: "Mobile Number",
    PINCODE: "Pincode",
    LOCALITY: "Locality",
    ADDRESS: "Address",
    CITY_DISTRICT_TOWN: "City/District/Town",
    STATE_TERRITORY_REGION: "State/Territory/Region",
    LANDMARK_OPTIONAL: "Landmark (Optional)",
};

// Mock user and orders to drive the UI
export const MOCK_PROFILE: Profile = {
    name: "Yaseen K C",
    email: "ymkcmpd@gmail.com",
    mobile: "9645028240",
    gender: "Male",
    dob: "05-08-2003"
};

const placeholderImage =
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=640&auto=format&fit=crop";

export const ORDERS: Order[] = [
    {
        id: "MF0221647650",
        status: "Order Placed",
        createdAt: new Date().toISOString(),
        items: [
            {
                id: "itm1",
                title: "Ultimate Wedge Plus Cushion",
                price: 1899,
                image: placeholderImage,
                qty: 1,
            },
        ],
        paymentMethod: "COD",
        shippingAddress:
            "Yaseen K C 558/13 Kappachali House, Pallikkunnu 676542 MALAPPURAMKL",
        trackingId: "TRK123456789",
        totals: {
            sellingPrice: 1899,
            deliveryFee: 49,
            taxes: 292.01,
            totalPrice: 1948,
        },
    },
];

export const ACCOUNT_NAV: AccountNavItem[] = [
    { id: "details", label: PROFILE_LABELS.NAV_PROFILE_DETAILS, href: "/profile/details" },
    { id: "order-history", label: PROFILE_LABELS.NAV_ORDER_HISTORY, href: "/profile/order-history" },
    { id: "address", label: PROFILE_LABELS.NAV_ADDRESS, href: "/profile/address" },
    { id: "logout", label: PROFILE_LABELS.NAV_LOGOUT, href: "/profile/logout" },
];


// Order tracking stages shown in the tracking dropdown
export const ORDER_TRACKING_STAGES = [
    "Order Placed",
    "Order Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
] as const;

export const MOCK_ADDRESSES: SavedAddress[] = [
    {
        id: "addr1",
        fullName: "Yaseen K C",
        mobileNumber: "9645028240",
        pincode: "676542",
        locality: "Pallikkunnu",
        addressLine: "558/13 Kappachali House",
        cityDistrictTown: "Malappuram",
        stateTerritoryRegion: "Kerala",
        landmark: "Near Mosque",
    },
    {
        id: "addr2",
        fullName: "Yaseen K C",
        mobileNumber: "9645028240",
        pincode: "676505",
        locality: "Kottakkal",
        addressLine: "Market Road",
        cityDistrictTown: "Malappuram",
        stateTerritoryRegion: "Kerala",
    },
];

