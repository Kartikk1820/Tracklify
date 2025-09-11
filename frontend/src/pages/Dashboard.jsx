import React, { useEffect, useState } from "react";
import api from "../api";
import AddEditModal from "./AddEdit";
import "./Dashboard.css"; // optional styling

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTx, setEditTx] = useState(null);

  const loadTransactions = async () => {
    try {
      const res = await api.get("/");
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0); // ✅ keep positive for display

  const balance = totalIncome - totalExpense; // ✅ clearer calculation

  const handleDelete = async (id) => {
    if (window.confirm("Delete this transaction?")) {
      await api.delete(`/${id}`);
      loadTransactions();
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="header">💰 Personal Finance Tracker</h1>

      {/* Summary Section */}
      <div className="summary">
        <div className="summary-card">
          <h3>Balance</h3>
          <p>{balance}</p>
        </div>
        <div className="summary-card">
          <h3>Income</h3>
          <p className="amount-positive">{totalIncome}</p>
        </div>
        <div className="summary-card">
          <h3>Expense</h3>
          <p className="amount-negative">{totalExpense}</p>
        </div>
      </div>

      {/* Add Button */}
      <button
        className="add-btn"
        onClick={() => {
          setEditTx(null);
          setShowModal(true);
        }}
      >
        + Add Transaction
      </button>

      {/* Transactions Table */}
      {transactions.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No transactions yet.</p>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id}>
                <td>{tx.title}</td>
                <td>{tx.category}</td>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td
                  className={
                    tx.amount > 0 ? "amount-positive" : "amount-negative"
                  }
                >
                  {tx.amount}
                </td>
                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => {
                      setEditTx(tx);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(tx._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <AddEditModal
          initial={editTx}
          onClose={() => setShowModal(false)} // ✅ no redirect
          onSaved={loadTransactions} // ✅ reload data after save
        />
      )}
    </div>
  );
}
