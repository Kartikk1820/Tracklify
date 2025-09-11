import React, { useEffect, useMemo, useState } from "react";
import api from "../api";
import AddEditModal from "./AddEdit";
import "./Dashboard.css"; // optional styling

// Import Recharts components (only those needed for the pie chart)
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTx, setEditTx] = useState(null);

  const loadTransactions = async () => {
    try {
      const res = await api.get("/transactions");
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
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const handleDelete = async (id) => {
    if (window.confirm("Delete this transaction?")) {
      await api.delete(`/transactions/${id}`);
      loadTransactions();
    }
  };

  // Pie chart for summary only
  const summaryData = useMemo(
    () => [
      { name: "Income", value: totalIncome },
      { name: "Expense", value: totalExpense },
      { name: "Balance", value: balance },
    ],
    [totalIncome, totalExpense, balance]
  );

  const COLORS = ["#2e7d32", "#c62828", "#1976d2"]; // green, red, blue

  return (
    <div className="dashboard-container">
      <h1 className="header">💰 Personal Finance Tracker</h1>

      {/* Summary Pie Chart */}
      {summaryData.some((d) => d.value > 0) && (
        <div style={{ width: "100%", height: 300, marginTop: 20 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={summaryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60} // donut
                label
              >
                {summaryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Add Transaction Button */}
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

      {/* Add/Edit Modal */}
      {showModal && (
        <AddEditModal
          initial={editTx}
          onClose={() => setShowModal(false)}
          onSaved={loadTransactions}
        />
      )}
    </div>
  );
}
