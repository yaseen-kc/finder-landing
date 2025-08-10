import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./assets/pages/LandingPage";
import Login from "./assets/pages/authentication/Login";
import ProductDetail from "./assets/pages/ProductDetail";
import ProductList from "./assets/pages/ProductList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/account/login" element={<Login />}></Route>
        <Route path="/product/:id" element={<ProductDetail />}></Route>
        <Route path="/all-product-list" element={<ProductList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
