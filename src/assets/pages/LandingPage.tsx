import HeaderNav from "../components/navigationBar/headerNav";
import MobileBottomNav from "../components/navigationBar/mobileBottomNav";
import HeroSection from "../components/landingPage/heroSection";
import ShopCategory from "../components/landingPage/shopCategory";
import BestSeller from "../components/landingPage/bestSeller";
import ShopConcern from "../components/landingPage/shopConcern";
import UserReview from "../components/landingPage/userReview";
import FooterNav from "../components/navigationBar/footerNav";
// import CartFloatingPanel from "../components/cart/cartFloatingPanel";

export default function LandingPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <HeaderNav />
      <HeroSection />
      <ShopCategory />
      <BestSeller />
      <ShopConcern />
      <UserReview />
      <FooterNav />
      <MobileBottomNav />
      {/* <CartFloatingPanel /> */}
    </div>
  );
}
