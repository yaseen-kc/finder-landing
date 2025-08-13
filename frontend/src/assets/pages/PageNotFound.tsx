import { Link } from "react-router-dom";
import HeaderNav from "../components/navigationBar/headerNav";
import FooterNav from "../components/navigationBar/footerNav";
import MobileBottomNav from "../components/navigationBar/mobileBottomNav";

export default function PageNotFound() {
  return (
    <div className="pb-20 lg:pb-0">
      <HeaderNav />
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[60vh] items-center justify-center py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex select-none items-center justify-center rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-700">
              404 ERROR
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-zinc-900 sm:text-4xl">
              Page not found
            </h1>
            <p className="mt-3 text-zinc-600">
              The page you are looking for doesn’t exist or has been moved.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-accent-600 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-700"
              >
                Go to Home
              </Link>
              <Link
                to="/all-product-list"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FooterNav />
      <MobileBottomNav />
    </div>
  );
}
