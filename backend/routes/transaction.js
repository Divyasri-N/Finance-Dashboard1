const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction"); // ✅ correct

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const data = await Transaction.find();
    res.json(data);
  } catch (err) {
    console.log("ERROR:", err); 
    res.status(500).json({ error: err.message });
  }
});

// POST transaction
router.post("/", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const saved = await newTransaction.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;