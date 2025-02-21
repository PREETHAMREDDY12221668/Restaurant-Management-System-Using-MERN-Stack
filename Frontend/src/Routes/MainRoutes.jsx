// MainRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";

import Cart from "../components/g-components/cart/Cart";
import { Checkout } from "../components/g-components/Checkout/Checkout";
import { Final_page } from "../components/g-components/Final_Page/Final_page";
import Homecontaint from "../components/p-components/homecontaint/Homecontaint";
import { About } from "../components/surya_ components/About/About";
import { Deals } from "../components/surya_ components/Deals/Deals";
import GroceryDetails from "../components/menupage";
import PageWrapper from "../animations/PageWrapper";
import { Signin } from "../components/m-components/Signin";
import { Otp } from "../components/m-components/Otp";
import UserProfile from "../components/m-components/account";
import AdminDashboard  from "../components/m-components/admin/adminDashboard";
import NotFound from "../components/p-components/notfound/notFound";
import PaymentMethod from "../components/g-components/paymentMethod/PaymentMethod";

const MainRoutes = () => {
  const ADMIN_EMAIL = "preethamreddyyelamancha@gmail.com"; // Replace with your admin email
  return (
   

    <Routes>
      <Route path="/" element={<Homecontaint />} />
      <Route path="/deals" element={<Deals />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/menu" element={<GroceryDetails />} />
      <Route path="/contactUs" element={<div>Contact Us</div>} />
      <Route path="/about" element={<About />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/ordered" element={<Final_page />} />
      {/* <Route path="/payment" element={<PaymentMethod/>} /> */}
      <Route path="/login" element={<Otp />} />
      <Route path="/register" element={<Signin />} />
      <Route path="/account" element={<UserProfile />} />
      {/* <Route
        path="/admin"
        element={
          <ProtectedRoute allowedEmail={ADMIN_EMAIL}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      /> */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/not" element={<NotFound />} />

    </Routes>
  );
};

export default MainRoutes;
