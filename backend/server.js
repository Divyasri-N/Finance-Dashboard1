require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug
console.log("MONGO_URI:", process.env.MONGO_URI);

// Mongoose settings
mongoose.set("strictQuery", true);
mongoose.set("bufferCommands", false);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    // Routes
    const transactionRoutes = require("./routes/transaction");
    app.use("/api/transactions", transactionRoutes);

    // Start server
    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });