import {
  HomeIcon,
  Squares2X2Icon,
  UserIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import {
  MOBILE_BOTTOM_NAV_ARIA,
  MOBILE_BOTTOM_NAV_ITEMS,
  type MobileBottomNavItem,
} from "../../constants/navigationBar/mobileBottomNavConstants";

function getIconByKey(key: MobileBottomNavItem["key"]) {
  switch (key) {
    case "home":
      return HomeIcon;
    case "categories":
      return Squares2X2Icon;
    case "account":
      return UserIcon;
    case "cart":
      return ShoppingBagIcon;
    default:
      return HomeIcon;
  }
}

export default function MobileBottomNav() {
  const items = MOBILE_BOTTOM_NAV_ITEMS;

  return (
    <nav
      aria-label={MOBILE_BOTTOM_NAV_ARIA.NAV}
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-zinc-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80"
    >
      <ul className="mx-auto max-w-screen-md px-6 py-2 grid grid-cols-4 gap-2">
        {items.map((item) => {
          const Icon = getIconByKey(item.key);
          const isRoute = item.href.startsWith("/");

          return (
            <li key={item.key} className="text-center">
              {isRoute ? (
                <NavLink
                  to={item.href}
                  className={() => `block py-1`}
                >
                  {({ isActive }) => (
                    <div className="flex flex-col items-center justify-center gap-1">
                      <Icon
                        className={`w-6 h-6 ${
                          isActive ? "text-zinc-900" : "text-zinc-400"
                        }`}
                      />
                      <span
                        className={`text-[11px] font-medium ${
                          isActive ? "text-zinc-900" : "text-zinc-400"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  )}
                </NavLink>
              ) : (
                <a href={item.href} className="block py-1">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Icon className="w-6 h-6 text-zinc-400" />
                    <span className="text-[11px] font-medium text-zinc-400">
                      {item.label}
                    </span>
                  </div>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

