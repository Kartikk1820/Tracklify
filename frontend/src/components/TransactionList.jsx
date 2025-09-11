import React, { useEffect, useMemo, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import "./TransactionList.css"; // create this file

export default function TransactionList() {
  const [tx, setTx] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [category, setCategory] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchTx = async () => {
    try {
      setLoading(true);
      const res = await api.get("/transactions");
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
    await api.delete(`/transactions/${id}`);
    setTx((t) => t.filter((item) => item._id !== id));
  };

  const categories = useMemo(() => {
    const set = new Set(tx.map((t) => t.category).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [tx]);

  const filtered = useMemo(() => {
    return tx.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      const time = new Date(t.date).getTime();
      if (fromDate) {
        const from = new Date(fromDate).setHours(0, 0, 0, 0);
        if (time < from) return false;
      }
      if (toDate) {
        const to = new Date(toDate).setHours(23, 59, 59, 999);
        if (time > to) return false;
      }
      return true;
    });
  }, [tx, category, fromDate, toDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  useEffect(() => {
    setPage(1); // reset page when filters change
  }, [category, fromDate, toDate]);

  return (
    <div className="tx-container">
      <div className="tx-header">
        <h2>Transactions</h2>
        <Link className="btn-add" to="/add">
          + Add
        </Link>
      </div>

      {/* Filters */}
      <div className="tx-filters">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="tx-filter"
          style={{ color: "black" }}
        >
          {categories.map((c) => (
            <option key={c} value={c} style={{ color: "black" }}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="tx-filter"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="tx-filter"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No transactions</p>
      ) : (
        <>
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
              {paged.map((t) => (
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

          {/* Pagination */}
          <div className="tx-pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span>
              Page {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
