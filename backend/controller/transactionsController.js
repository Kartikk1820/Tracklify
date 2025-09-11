const Transaction = require("../models/Transaction.js");

// Get all transactions for logged-in user
exports.getAll = async (req, res) => {
  try {
    const tx = await Transaction.find({ user: req.user }).sort({ date: -1 });
    res.json(tx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const tx = await Transaction.findOne({
      _id: req.params.id,
      user: req.user,
    });
    if (!tx) return res.status(404).json({ error: "Not found" });
    res.json(tx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;
    const newTx = new Transaction({
      title,
      amount,
      date,
      category,
      user: req.user,
    });
    const saved = await newTx.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const removed = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });
    if (!removed) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
