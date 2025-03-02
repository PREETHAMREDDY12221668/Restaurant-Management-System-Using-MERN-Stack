// MainRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";

import Cart from "../components/g-components/cart/Cart.jsx";
import { Checkout } from "../components/g-components/Checkout/Checkout.jsx";
import { Final_page } from "../components/g-components/Final_Page/Final_page.jsx";
import Homecontaint from "../components/p-components/homecontaint/Homecontaint.jsx";
import { About } from "../components/surya_ components/About/About.jsx";
import { Deals } from "../components/surya_ components/Deals/Deals.jsx";
import GroceryDetails from "../components/menupage.jsx";
import PageWrapper from "../animations/PageWrapper.js";
import { Signin } from "../components/m-components/Signin.jsx";
import { Otp } from "../components/m-components/Otp.jsx";
import UserProfile from "../components/m-components/account.jsx";
import AdminDashboard  from "../components/m-components/admin/adminDashboard.jsx";
import NotFound from "../components/p-components/notfound/notFound.jsx";
import PaymentMethod from "../components/g-components/paymentMethod/PaymentMethod.jsx";
import Trail from "../components/p-components/for trial/Menu.jsx";

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
      <Route path="/login" element={<Otp />} />
      <Route path="/register" element={<Signin />} />
      <Route path="/account" element={<UserProfile />} />
      {/* <Route path="/payment" element={<PaymentMethod/>} /> */}
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
      <Route path="/trail" element={<Trail />} />

    </Routes>
  );
};

export default MainRoutes;
