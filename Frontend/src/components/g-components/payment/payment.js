import Razorpay from "razorpay";

const initiatePayment = async () => {
  try {
    // Call backend API to create an order
    const response = await fetch("http://localhost:5000/api/create-order", {
      method: "POST",
    });
    const orderData = await response.json();

    // Initialize Razorpay Payment
    const options = {
      key: "your_key_id", // Replace with your Key ID
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Your App Name",
      description: "Test Transaction",
      image: "/logo.png", // Optional: Add your logo here
      order_id: orderData.id,
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Your Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Your Address",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment initiation failed:", error);
  }
};

export default initiatePayment