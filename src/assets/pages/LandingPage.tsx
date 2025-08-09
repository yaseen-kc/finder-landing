import HeaderNav from "../components/navigationBar/headerNav";
import HeroSection from "../components/landingPage/heroSection";
import ShopCategory from "../components/landingPage/shopCategory";
import BestSeller from "../components/landingPage/bestSeller";
import ShopConcern from "../components/landingPage/shopConcern";
import UserReview from "../components/landingPage/userReview";
import FooterNav from "../components/navigationBar/footerNav";

export default function LandingPage() {
  return (
    <div>
      <HeaderNav />
      <HeroSection />
      <ShopCategory />
      <BestSeller />
      <ShopConcern />
      <UserReview />
      <FooterNav />
    </div>
  );
}
