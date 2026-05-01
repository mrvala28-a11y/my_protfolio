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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});