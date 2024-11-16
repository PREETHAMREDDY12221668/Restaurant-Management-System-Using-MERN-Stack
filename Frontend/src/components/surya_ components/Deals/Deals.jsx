import React from "react";
import "./deals.css";
import Navbar from "../../shhivajiscompo/navbar/Navbar";
export const Deals = () => {
  return (
    <>
    <div className="address">
      <div className="banner">
        <div className="deals-image-text">DEALS & OFFERS</div>
      </div>

      <div className="stripes">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAeCAYAAAB5c901AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABNSURBVHgB7c9BDQAgAMPAgQ4c4F8KDvABFuBHSe+9LGmZ6SsXWkY52b3yW/M5A+kMpDOQzkA6A+kMpDOQzkA6A+kMpDOQzkA6A+kMpNu9MQhKmC+cDgAAAABJRU5ErkJggg=="
          alt="" />
      </div>

      <h1 className="offertitle">OFFERS FOR YOU</h1>

      <div className="card">
        <img
          src="   https://images.unsplash.com/photo-1701579231349-d7459c40919d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="offers-menu-product-image"
          alt="offer" />
        <h4 className="offers-deals-product-title">1 Double ka meetha...</h4>
        <h5 className="offers-deals-product-desc">
          1 Pc Double ka meetha on a single peace biryani.
        </h5>
        <div className="hotncrispydiv">
          <button className="view-details-btn">View Details</button>
          <button className="redeem-btn">Redeem</button>
        </div>
      </div>
    </div></>
  );
};
