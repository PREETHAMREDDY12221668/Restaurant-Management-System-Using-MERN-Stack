// MainRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";

import Cart from "../components/g-components/cart/Cart";
import { Checkout } from "../components/g-components/Checkout/Checkout";
import { Final_page } from "../components/g-components/Final_Page/Final_page";
import Homecontaint from "../components/shhivajiscompo/homecontaint/Homecontaint";
import { About } from "../components/surya_ components/About/About";
import { Deals } from "../components/surya_ components/Deals/Deals";
import GroceryDetails from "../components/menupage";
import PageWrapper from "../animations/PageWrapper";
import IndexPage from "../animations/intro";
import { Signin } from "../components/m-components/Signin";
import { Otp } from "../components/m-components/Otp";

const MainRoutes = () => {
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
      <Route path="/fake" element={<IndexPage />} />
      <Route path="/login" element={<Otp />} />
      <Route path="/register" element={<Signin />} />
      

    </Routes>
  );
};

export default MainRoutes;
