const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET all transactions
router.get("/", async (req, res) => {
  const data = await Transaction.find();
  res.json(data);
});

// POST transaction
router.post("/", async (req, res) => {
  const newTx = new Transaction(req.body);
  await newTx.save();
  res.json(newTx);
});

// ❌ THIS IS WHAT YOU WERE MISSING
// DELETE transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;