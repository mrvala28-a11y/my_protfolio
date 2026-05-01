require('dotenv').config(); // 🔥 MUST

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API running 🚀');
});

// Debug ENV (check once)
console.log("ENV CHECK:");
// console.log(process.env.TWILIO_ACCOUNT_SID);
// console.log(process.env.TWILIO_AUTH_TOKEN);
// console.log(process.env.ADMIN_WHATSAPP);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});