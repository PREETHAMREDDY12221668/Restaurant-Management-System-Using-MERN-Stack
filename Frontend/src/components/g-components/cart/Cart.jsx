import React, { useEffect, useState } from "react";
import styles from "./cart.module.css";
import { CartCard } from "../cartcard/CartCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RemoveAll, getCartData } from "../../../redux/guddu/cartRedux/CartAction";
import Navbar from "../../p-components/navbar/Navbar";
import logo from "./vecteezy_ai-generated-brown-paper-shopping-bag-png_42654724.png";
import offer from "./pngegg.png"
export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access cart data from Redux state
  const cartData = useSelector((state) => state.cartdata.cartdata);

  // Calculate the total number of items
  const items = cartData.reduce((acc, elem) => acc + elem.qty, 0);

  // Calculate subtotal
  const subtotal = cartData.reduce((acc, elem) => acc + elem.price * elem.qty, 0);
  const GST=(subtotal*18)/100;
  // Load cart data on component mount
  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  // Clear the cart
  const removeAll = () => {
    dispatch(RemoveAll());
  };

  return (
    <>
      <div className={styles.cdTop}>
        <div>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAeCAYAAAB5c901AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABNSURBVHgB7c9BDQAgAMPAgQ4c4F8KDvABFuBHSe+9LGmZ6SsXWkY52b3yW/M5A+kMpDOQzkA6A+kMpDOQzkA6A+kMpDOQzkA6A+kMpNu9MQhKmC+cDgAAAABJRU5ErkJggg=="
            alt="TripleRedLine"
          />
        </div>
        <h1>MY CART</h1>
      </div>

      {/* Conditional rendering for empty cart */}
      {cartData.length === 0 ? (
        <div id={styles.cartdiv1}>
          <div id={styles.cartdiv11}>
            <h1>YOUR CART IS EMPTY. LET'S START AN ORDER!</h1>
            <button onClick={() => navigate("/menu")} id={styles.startbtn}>
              Start Order
            </button>
          </div>
          <div >
            <img
              src={logo}
              alt="dd"
              style={{width:'350px', height:'auto',transform: 'rotate(45deg)',paddingLeft:'60px',marginLeft:'70px'}}
            />
          </div>
        </div>
      ) : (
        <div id={styles.cartdiv2}>
          <div id={styles.items}>
            {cartData.map((elem) => (
              <CartCard key={elem._id} {...elem} />  
            ))}
            <div id={styles.R_all}>
              <div onClick={removeAll}>Remove All</div>
              <div onClick={() => navigate("/menu")}>Add More Menu</div>
            </div>
          </div>
          <div id={styles.subtotal}>
            <h1>{items}- ITEMS</h1>
            <div id={styles.offer}>
              <img className={styles.offerImg} src={offer}/>
              Offer Apply promo code
            </div>
            <div className="">
              <div className={styles.singlediv}>
                <p>Subtotal</p>
                <p>₹ {subtotal}</p>
              </div>
              <div className={styles.singlediv}>
                <p>GST</p>
                <p>₹ {GST}</p>
              </div>
            </div>
            <div className={styles.bag_hope}>
              <input type="checkbox" /> ₹ 6.00 Tick to add a large carry bag.
            </div>
            <div className={styles.bag_hope}>
              <input type="checkbox" /> Donate ₹ 5.00 Tick to Add Hope.
            </div>
            <div id={styles.checkoutbtn} onClick={() => navigate("/checkout")}>
              <p>Check Out</p>
              <p>₹{subtotal + GST}</p>
            </div>
          </div>
        </div>
      )}
      <div id={styles.faqDiv}>
        <div>
          <h2>FAQ</h2>
          <p>How can I change the information for my credit/debit card or select a different default payment method?</p>
          <p>What to expect for delivery?</p>
          <p>How do I change or cancel my pickup order once I’ve placed my order?</p>
        </div>
        <div>
          <h2>STILL HAVE A QUESTION?</h2>
          <div id={styles.haveQ}>
            <div>
              <i className="fa-solid fa-phone"></i> Call Us
            </div>
            <div onClick={() => navigate("/contactsUs")}>
              <i className="fa-solid fa-envelope"></i> Contact Us
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
