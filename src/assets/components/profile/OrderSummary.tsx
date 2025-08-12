import { useParams } from "react-router-dom";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, ClockIcon, TruckIcon, CubeIcon, HomeIcon } from "@heroicons/react/24/outline";
import { ORDERS, PROFILE_LABELS, ORDER_TRACKING_STAGES } from "@profileConstant";

export default function OrderSummary() {
  const params = useParams();
  const order = ORDERS.find((o) => o.id === params.orderId) ?? ORDERS[0];
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [showTracking, setShowTracking] = useState(false);

  const stageToIcon = {
    "Order Placed": <ClockIcon className="w-5 h-5" />,
    "Order Confirmed": <CheckCircleIcon className="w-5 h-5" />,
    "Shipped": <TruckIcon className="w-5 h-5" />,
    "Out for Delivery": <CubeIcon className="w-5 h-5" />,
    "Delivered": <HomeIcon className="w-5 h-5" />,
  } as const;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-zinc-500">
            QTY: {order.items.length} item
          </div>
          <h1 className="text-xl font-semibold text-zinc-900">#{order.id}</h1>
        </div>
        <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm">
          ⬇ {PROFILE_LABELS.DOWNLOAD_INVOICE}
        </button>
      </div>

      <section className="rounded-xl border border-zinc-200 overflow-hidden">
        <div className="bg-zinc-100 px-4 py-2 text-sm">Delivery #1</div>
        <div className="p-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
            {order.status}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <img
              src={order.items[0]?.image}
              alt={order.items[0]?.title}
              className="h-14 w-14 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="text-sm text-zinc-800 line-clamp-1">
                {order.items[0]?.title}
              </div>
            </div>
            <div className="text-sm font-medium text-zinc-900">
              ₹{order.items[0]?.price.toLocaleString()}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button className="text-sm text-zinc-700 underline">
              {PROFILE_LABELS.CANCEL}
            </button>
            {/* Removed Track Order button as per request */}
          </div>
        </div>
      </section>

      {/* Tracking dropdown */}
      <section className="rounded-xl border border-zinc-200">
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-3"
          aria-expanded={showTracking}
          onClick={() => setShowTracking((prev) => !prev)}
        >
          <div className="font-semibold">{PROFILE_LABELS.TRACKING}</div>
          {showTracking ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </button>
        {showTracking && (
          <div className="px-4 pb-4 space-y-3">
            <div className="text-xs text-zinc-600">
              <span className="font-medium">{PROFILE_LABELS.TRACKING_ID}:</span> {order.trackingId}
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:overflow-x-auto no-scrollbar py-1">
              {ORDER_TRACKING_STAGES.map((stage, index) => {
                const currentIndex = ORDER_TRACKING_STAGES.indexOf(order.status as typeof ORDER_TRACKING_STAGES[number]);
                const isCompleted = index <= currentIndex;
                return (
                  <div key={stage} className="flex flex-col md:flex-row md:items-center">
                    <div className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs border ${
                      isCompleted ? "bg-zinc-900 text-white border-zinc-900" : "bg-zinc-100 text-zinc-700 border-zinc-200"
                    }`}>
                      <span>{stageToIcon[stage] ?? <ClockIcon className="w-5 h-5" />}</span>
                      <span className="whitespace-nowrap">{stage}</span>
                    </div>
                    {index < ORDER_TRACKING_STAGES.length - 1 && (
                      <>
                        <div className="hidden md:block w-6 h-px bg-zinc-200 mx-2" />
                        <div className="md:hidden h-4 w-px bg-zinc-200 my-2 ml-4" />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-zinc-200">
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-3"
          aria-expanded={showOrderDetails}
          onClick={() => setShowOrderDetails((prev) => !prev)}
        >
          <div className="font-semibold">{PROFILE_LABELS.ORDER_DETAILS}</div>
          {showOrderDetails ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </button>
        {showOrderDetails && (
          <div className="px-4 pb-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-zinc-500">{PROFILE_LABELS.ORDER_ID}</div>
            <div className="text-zinc-900">#{order.id}</div>
            <div className="text-zinc-500">{PROFILE_LABELS.PAYMENT}</div>
            <div className="text-zinc-900">{order.paymentMethod}</div>
            <div className="text-zinc-500">{PROFILE_LABELS.DELIVER_TO}</div>
            <div className="text-zinc-900">{order.shippingAddress}</div>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-zinc-200">
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-3"
          aria-expanded={showPriceBreakdown}
          onClick={() => setShowPriceBreakdown((prev) => !prev)}
        >
          <div className="font-semibold">{PROFILE_LABELS.PRICE_BREAKDOWN}</div>
          {showPriceBreakdown ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </button>
        {showPriceBreakdown && (
          <div className="px-4 pb-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-zinc-500">{PROFILE_LABELS.SELLING_PRICE}</div>
            <div className="text-zinc-900">
              ₹{order.totals.sellingPrice.toLocaleString()}
            </div>
            <div className="text-zinc-500">{PROFILE_LABELS.DELIVERY_FEE}</div>
            <div className="text-zinc-900">
              ₹{order.totals.deliveryFee.toLocaleString()}
            </div>
            <div className="text-zinc-500">{PROFILE_LABELS.TAXES}</div>
            <div className="text-zinc-900">
              ₹{order.totals.taxes.toLocaleString()}
            </div>
            <div className="text-zinc-500">{PROFILE_LABELS.TOTAL_PRICE}</div>
            <div className="text-zinc-900 font-semibold">
              ₹{order.totals.totalPrice.toLocaleString()}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
