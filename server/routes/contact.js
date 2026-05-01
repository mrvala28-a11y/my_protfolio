const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// ENV
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const adminWhatsApp = process.env.ADMIN_WHATSAPP;

// ✅ Twilio Sandbox number (FIXED)
const FROM_NUMBER = 'whatsapp:+14155238886';

// Create client
let client = null;
if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
} else {
  console.log("❌ Twilio ENV missing");
}

// POST route
router.post('/', async (req, res) => {
  try {
const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields required'
      });
    }

    // Validate phone number (10-15 digits only)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Phone number must be 10-15 digits'
      });
    }

    console.log("📩 New Form:", name, email, phone, message);

    if (client && adminWhatsApp) {
      try {
        const msg = `🚀 New Contact Form

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
💬 Message: ${message}`;

        const response = await client.messages.create({
          from: FROM_NUMBER,
          to: `whatsapp:${adminWhatsApp}`,
          body: msg
        });

        console.log("✅ SID:", response.sid);
        console.log("📊 Status:", response.status);

      } catch (err) {
        console.log("❌ Twilio Error:", err.message);
      }
    } else {
      console.log("⚠️ Twilio not configured");
    }

    res.json({ success: true });

  } catch (err) {
    console.log("🔥 Server Error:", err.message);
    res.status(500).json({ success: false });
  }
});

module.exports = router;