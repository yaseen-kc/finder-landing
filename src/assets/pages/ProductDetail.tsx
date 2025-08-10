import { useState } from "react";
import { PRODUCT } from "@productDetailConstant";
import Gallery from "@productDetail/Gallery";
import FeatureGrid from "@productDetail/FeatureGrid";
import ColorSelector from "@productDetail/ColorSelector";
import PackageSelector from "@productDetail/PackageSelector";
import ShippingBadges from "@productDetail/ShippingBadges";
import DetailsAccordions from "@productDetail/DetailsAccordions";
import HeaderNav from "../components/navigationBar/headerNav";
import MobileBottomNav from "../components/navigationBar/mobileBottomNav";
import FooterNav from "../components/navigationBar/footerNav";
import CartFloatingPanel from "../components/cart/cartFloatingPanel";

export default function ProductDetail() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    PRODUCT.packages.find((p) => p.isRecommended)?.id || PRODUCT.packages[0]?.id
  );

  return (
    <div className="pb-20 lg:pb-0">
      <HeaderNav />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pt-6 sm:px-6 lg:grid-cols-2 lg:pt-10 lg:px-8">
        {/* Left: Gallery */}
        <Gallery images={PRODUCT.images} />

        {/* Right: Details */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
              Hot Selling
            </div>
            <h1 className="text-2xl font-semibold leading-snug text-gray-900 sm:text-3xl">
              {PRODUCT.title}
            </h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <span>⭐</span>
              <span>{PRODUCT.ratingText}</span>
            </div>
            <div className="mt-3 flex items-end gap-3">
              <span className="text-2xl font-bold">
                ₹{PRODUCT.price.toLocaleString()}
              </span>
              <span className="text-gray-400 line-through">
                ₹{PRODUCT.compareAtPrice.toLocaleString()}
              </span>
              <span className="text-green-600 text-sm font-semibold">
                {PRODUCT.discountLabel}
              </span>
            </div>
          </div>

          {/* Features */}
          <FeatureGrid features={PRODUCT.features} />

          {/* Color selector (visual only for now) */}
          <ColorSelector
            colors={PRODUCT.colors}
            activeName={PRODUCT.colors[0]?.name}
          />

          {/* Packages */}
          <PackageSelector
            options={PRODUCT.packages}
            defaultId={selectedPackageId}
            onChange={setSelectedPackageId}
            thumbnailSrc={PRODUCT.images[0]?.thumb ?? PRODUCT.images[0]?.src}
          />

          {/* CTA */}
          <button className="w-full rounded-full bg-yellow-400 py-3 font-semibold text-gray-900 hover:bg-yellow-500">
            ADD TO CART
          </button>

          {/* Badges */}
          <ShippingBadges badges={PRODUCT.shippingBadges} />

          {/* Accordions (simple static expand/collapse replaced by open details) */}
          <DetailsAccordions
            description={PRODUCT.description}
            productDetails={PRODUCT.productDetails}
            careInstructions={PRODUCT.careInstructions}
            returns={PRODUCT.returns}
          />
        </div>
      </div>
      <FooterNav />
      <MobileBottomNav />
      <CartFloatingPanel />
    </div>
  );
}
