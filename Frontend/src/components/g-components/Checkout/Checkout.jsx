import React, { useEffect, useState } from "react";
import { PaymentMethod } from "../paymentMethod/PaymentMethod";
import styles from "./checkout.module.css";
import { Popup } from "../paymentMethod/Popup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RemoveAll } from "../../../redux/guddu/cartRedux/CartAction";
import NotFound from "../../p-components/notfound/notFound.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Checkout = () => {
  const [payMth, setpayMth] = useState(false);
  const [formdata, setformdata] = useState({
    full_name: "",
    email: "",
    phone_no: "",
  });
  const [payType, setpayType] = useState("");
  const [showbtn, setshowbtn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.cartdata.cartdata);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  let subtotal = data.reduce((acc, elem) => acc + elem.price * elem.qty, 0);
  let items = data.reduce((acc, elem) => acc + elem.qty, 0);
  let GST = (subtotal * 18) / 100;

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Enable button only if all required fields and payment method are filled
    const isFormComplete =
      formdata.full_name &&
      formdata.email &&
      formdata.phone_no &&
      payType !== "";
    setshowbtn(isFormComplete);
  }, [formdata, payType]);

  const handleCheckout = () => {
    navigate("/ordered");
    dispatch(RemoveAll());
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || "");
        setUserName(user.displayName || "");
        setformdata((prev) => ({
          ...prev,
          email: user.email || "",
          name: user.displayName || "",

        }));
      } else {
        setUserEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className={styles.headdiv}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAeCAYAAAB5c901AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABNSURBVHgB7c9BDQAgAMPAgQ4c4F8KDvABFuBHSe+9LGmZ6SsXWkY52b3yW/M5A+kMpDOQzkA6A+kMpDOQzkA6A+kMpDOQzkA6A+kMpNu9MQhKmC+cDgAAAABJRU5ErkJggg=="
          alt="TripleRedLine"
        />
        <div id={styles.heading}>
          <h1>CheckOut</h1>
          <div>
            <i className="fa-solid fa-lock"></i> Secure Checkout
          </div>
        </div>
      </div>
      {items > 0 ? (
        <div id={styles.Cmain}>
          <div className={styles.Cleft}>
            <div className={styles.pickupdiv}>
              <h1>Pick Up info</h1>
              <div id={styles.store}>
                <i className="fa-solid fa-location-dot"></i>
                <p>
                  <span>Kanishka Dhaba</span> - Mayuri Garden Lane, Revenue
                  Colony, near R.E.C. Petrol Pump, Hanamkonda, Telangana 506004
                </p>
                <div>
                  <i className="fa-solid fa-clock"></i> ASAP
                </div>
              </div>
            </div>
            <div className={styles.contactinfo}>
              <h1>Contact Info</h1>
              <input
                type="text"
                placeholder="Full Name*"
                name="full_name"
                onChange={handlechange}
                className={styles.inp}
                value={userName}
              />
              <input
                type="tel"
                placeholder="Phone Number*"
                name="phone_no"
                onChange={handlechange}
                className={styles.inp}
              />
              <input
                type="email"
                placeholder="Email*"
                name="email"
                onChange={handlechange}
                className={styles.inp}
                value={userEmail}
              />
            </div>
            <div className={styles.paymentdiv}>
              <h1>Payment</h1>
              {payType ? (
                <p className={styles.selectedPayment}>
                  Selected Payment Method: {payType}
                </p>
              ) : (
                <p className={styles.addpM} onClick={() => setpayMth(true)}>
                  Add payment method
                </p>
              )}
              <Popup trigger={payMth} setpayMth={setpayMth}>
                <PaymentMethod setpayMth={setpayMth} setpayType={setpayType} />
              </Popup>
            </div>

          </div>
          <div className={styles.Cright}>
            <h1>{items} items</h1>
            <p>Subtotal: ₹{subtotal}</p>
            <p>GST: ₹{GST}</p>
            {showbtn ? (
              <div id={styles.paybtn1} onClick={handleCheckout}>
                Pay Now
              </div>
            ) : (
              <div id={styles.paybtn2}>Complete Form to Pay</div>
            )}
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};