const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: String,
  date: String
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
