// models/Transaction.js
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true }, // positive = income, negative = expense
  date: { type: Date, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // linked user
});

module.exports = mongoose.model("Transaction", TransactionSchema);
