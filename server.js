// server.js
const express = require("express");
require("dotenv").config(); 
const cors = require("cors"); // <-- needed CORS
const productRoutes = require("./routes/product.routes");

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // <-- allow frontend from Vercel and others
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Simple Products REST API." });
});

// Product Routes
app.use("/api/products", productRoutes);

// Global Error Handler Middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    detail: process.env.NODE_ENV !== "production" ? err.message : null,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Access the API at http://localhost:${PORT}`);
});
