require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// 🔍 DEBUG
console.log("MONGO_URI:", process.env.MONGO_URI);

// ✅ Fix buffering issue
mongoose.set("strictQuery", true);
mongoose.set("bufferCommands", false);

// ✅ Connect FIRST
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    // ✅ LOAD ROUTES ONLY AFTER CONNECTION
    const transactionRoutes = require("./routes/transaction");
    app.use("/api/transactions", transactionRoutes);

    // ✅ START SERVER
    app.listen(5000, () => {
      console.log("🚀 Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });