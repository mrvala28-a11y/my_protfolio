require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ======================
// PORT
// ======================
const PORT = process.env.PORT || 5000;

// ======================
// MIDDLEWARE
// ======================
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// ROUTES
// ======================
const contactRoutes = require("./routes/contact");

app.use("/api/contact", contactRoutes);

// ======================
// HOME ROUTE
// ======================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API running successfully 🚀",
  });
});

// ======================
// HEALTH CHECK ROUTE
// ======================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// ======================
// 404 ROUTE
// ======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ======================
// GLOBAL ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ======================
// SERVER LISTEN
// ======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});