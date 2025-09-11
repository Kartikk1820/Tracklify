import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import "./TransactionList.css"; // create this file

export default function TransactionList() {
  const [tx, setTx] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTx = async () => {
    try {
      setLoading(true);
      const res = await api.get("/");
      setTx(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTx();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    await api.delete(`/${id}`);
    setTx((t) => t.filter((item) => item._id !== id));
  };

  return (
    <div className="tx-container">
      <div className="tx-header">
        <h2>Transactions</h2>
        <Link className="btn-add" to="/add">
          + Add
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : tx.length === 0 ? (
        <p>No transactions</p>
      ) : (
        <table className="tx-table">
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
            {tx.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>{t.category}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td className={t.amount >= 0 ? "amount-green" : "amount-red"}>
                  {t.amount}
                </td>
                <td>
                  <Link className="btn-edit" to={`/${t._id}/edit`}>
                    Edit
                  </Link>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
