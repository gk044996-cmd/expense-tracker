const Transaction = require("../models/Transaction");

// ➕ Add Transaction
exports.addTransaction = async (req, res) => {
  try {
    const { text, amount, type, category, date } = req.body;

    // 🔥 Validation
    if (!text || !amount || !type) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newTransaction = new Transaction({
      text,
      amount: Number(amount),
      type,
      category: category || "General",
      date: date || new Date().toISOString().split("T")[0]
    });

    const saved = await newTransaction.save();
    res.status(201).json(saved);

  } catch (err) {
    console.error("Add Error:", err); // 🔥 IMPORTANT
    res.status(500).json({ message: "Server Error" });
  }
};

// 📥 Get Transactions
exports.getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ❌ Delete
exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✏️ Update
exports.updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};