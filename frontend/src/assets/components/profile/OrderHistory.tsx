import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ORDERS, PROFILE_LABELS } from "@profileConstant";

export default function OrderHistory() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-zinc-900">
        {PROFILE_LABELS.ORDER_LIST_TITLE}
      </h1>
      {ORDERS.map((o) => (
        <Link
          key={o.id}
          to={`/profile/orders/${o.id}`}
          className="block rounded-xl border border-zinc-200 overflow-hidden"
        >
          <div className="flex items-center justify-between bg-zinc-100 px-4 py-3 text-sm">
            <div className="font-medium text-zinc-800">{o.status}</div>
            <ChevronRightIcon
              className="h-5 w-5 text-zinc-500"
              aria-hidden="true"
            />
          </div>
          <div className="px-4 py-4 flex items-center gap-4">
            <div className="text-zinc-900 font-semibold">
              ₹{o.items[0]?.price.toLocaleString()}
            </div>
            <div className="text-zinc-400">•</div>
            <div className="text-sm text-zinc-600">
              QTY: {o.items.length} items
            </div>
            <div className="text-zinc-400">•</div>
            <div className="text-sm text-zinc-600">
              {new Date(o.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            <img
              src={o.items[0]?.image}
              alt={o.items[0]?.title}
              className="ml-auto h-14 w-14 rounded-lg object-cover"
              loading="lazy"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
