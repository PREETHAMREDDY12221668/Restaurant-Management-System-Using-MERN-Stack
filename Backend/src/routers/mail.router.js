const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

// POST route to send a welcome email
router.post("/send-welcome-email", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        // Configure the mail transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password or app password
            },
        });

        // Mail options
        const mailOptions = {
            from: `"Your Company" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Welcome to Our Platform",
            text: "Welcome to our platform! We're excited to have you on board.",
            html: `<h1>Welcome!</h1><p>We're excited to have you on board.</p>`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Welcome email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send welcome email" });
    }
});

module.exports = router;
