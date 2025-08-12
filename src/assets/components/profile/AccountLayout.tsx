import { NavLink, Outlet } from "react-router-dom";
import HeaderNav from "../navigationBar/headerNav";
import FooterNav from "../navigationBar/footerNav";
import MobileBottomNav from "../navigationBar/mobileBottomNav";
import { ACCOUNT_NAV } from "@profileConstant";

export default function AccountLayout() {
  return (
    <div className="pb-20 lg:pb-0">
      <HeaderNav />
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-36 py-4 lg:py-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <aside className="lg:sticky lg:top-20 self-start">
          <nav className="mt-6 space-y-1">
            {ACCOUNT_NAV.map((item) => (
              <NavLink
                key={item.id}
                to={item.href}
                className={({ isActive }) =>
                  `block rounded-md px-4 py-3 border ${
                    isActive
                      ? "border-zinc-300 bg-zinc-50 text-zinc-900"
                      : "border-transparent hover:border-zinc-200"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
      <FooterNav />
      <MobileBottomNav />
    </div>
  );
}
