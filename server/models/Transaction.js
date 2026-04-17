const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  text: { type: String, required: true }, // 🔥 ADD THIS
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, default: "General" }, // optional
  date: { type: String, default: () => new Date().toISOString().split("T")[0] }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);