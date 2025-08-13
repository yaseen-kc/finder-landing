import { Route, Routes, Navigate } from "react-router-dom";
import AccountLayout from "../components/profile/AccountLayout";
import ProfileDetails from "../components/profile/ProfileDetails";
import OrderHistory from "../components/profile/OrderHistory";
import OrderSummary from "../components/profile/OrderSummary";
import Address from "../components/profile/Address";

export default function Profile() {
  return (
    <Routes>
      <Route path="" element={<AccountLayout />}> 
        <Route index element={<Navigate to="/profile/details" replace />} />
        <Route path="details" element={<ProfileDetails />} />
        <Route path="order-history" element={<OrderHistory />} />
        <Route path="orders/:orderId" element={<OrderSummary />} />
        <Route path="address" element={<Address />} />
        <Route path="logout" element={<div className="p-4">Logged out.</div>} />
      </Route>
    </Routes>
  );
}


