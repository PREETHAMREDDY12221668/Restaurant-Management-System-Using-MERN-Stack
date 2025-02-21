const express = require('express');
const router = express.Router();
let orderId = 1; // Starting order ID
let lastResetTime = new Date().toDateString(); // Store the last reset date

// API to generate new order ID
router.get('/', (req, res) => {
    const today = new Date().toDateString();
    if (today !== lastResetTime) {
        orderId = 1; // Reset order ID
        lastResetTime = today; // Update reset time
    }
    res.json({ orderId: orderId++ });
});

module.exports = router;
