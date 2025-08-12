import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./assets/pages/LandingPage";
import Login from "./assets/pages/authentication/Login";
import OtpVerification from "./assets/pages/authentication/OtpVerification.tsx";
import ProductDetail from "./assets/pages/ProductDetail";
import ProductList from "./assets/pages/ProductList";
import Profile from "./assets/pages/Profile";
import PageNotFound from "./assets/pages/PageNotFound";
import Checkout from "./assets/pages/Checkout.tsx";
import ScrollToTop from "./assets/components/common/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/account/login" element={<Login />}></Route>
        <Route path="/account/verify" element={<OtpVerification />}></Route>
        <Route path="/profile/*" element={<Profile />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/product-list" element={<ProductList />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
