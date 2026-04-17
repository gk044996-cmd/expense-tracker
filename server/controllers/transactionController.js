const Transaction = require("../models/Transaction");

// CREATE
exports.addTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction({
      ...req.body,
      user: req.userId // 👈 attach user
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// READ (only user's data)
exports.getTransactions = async (req, res) => {
  try {
    const data = await Transaction
      .find({ user: req.userId }) // 👈 filter
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE (only own)
exports.deleteTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.userId // 👈 ensure ownership
    });

    if (!tx) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE (only own)
exports.updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, // 👈 ensure ownership
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};