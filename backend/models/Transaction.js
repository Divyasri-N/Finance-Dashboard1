const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: String,
  category: String,
  amount: Number,
  type: String,
});

// ✅ IMPORTANT: avoid model overwrite issue
module.exports = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);