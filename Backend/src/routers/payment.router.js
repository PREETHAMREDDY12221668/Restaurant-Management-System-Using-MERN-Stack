const Razorpay = require("razorpay");
const express = require("express");


const router = express.Router();


// Razorpay Instance
const razorpay = new Razorpay({
  key_id: "your_key_id", // Replace with your Key ID
  key_secret: "your_key_secret", // Replace with your Key Secret
});

router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: 50000, // Amount in paise (₹500)
      currency: "INR",
      receipt: "receipt_id_123",
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;