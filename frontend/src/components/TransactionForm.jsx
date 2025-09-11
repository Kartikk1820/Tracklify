import React, { useState, useEffect } from "react";
import "./TransactionForm.css";

export default function TransactionForm({ initial, onSubmit }) {
  const [form, setForm] = useState(initial);

  useEffect(() => setForm(initial), [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  return (
    <form
      className="transaction-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="form-group">
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="e.g. Salary, Rent, Groceries"
        />
      </div>

      <div className="form-group">
        <label>Amount</label>
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          required
          placeholder="Use + for income, - for expense"
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          name="date"
          type="date"
          value={form.date.split("T")[0]}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          placeholder="e.g. Food, Bills, Shopping"
        />
      </div>

      <button type="submit" className="btn-primary">
        Save Transaction
      </button>
    </form>
  );
}
