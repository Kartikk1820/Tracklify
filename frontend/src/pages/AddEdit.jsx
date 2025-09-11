// src/pages/AddEdit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "./AddEdit.css";

export default function AddEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // check if we are editing
  const [form, setForm] = useState({
    title: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    category: "",
  });
  const [loading, setLoading] = useState(false);

  // fetch transaction when editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      api
        .get(`/${id}`)
        .then((res) => {
          const tx = res.data;
          setForm({
            title: tx.title || "",
            amount: tx.amount || 0,
            date: tx.date
              ? new Date(tx.date).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0],
            category: tx.category || "",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await api.put(`/${id}`, form); // update
    } else {
      await api.post("/", form); // create
    }
    navigate("/"); // redirect to home after save
  };

  const handleCancel = () => {
    navigate("/"); // redirect back on cancel
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="form-page">
      <div className="modal-content">
        <h2>{id ? "Edit" : "Add"} Transaction</h2>
        <form onSubmit={handleSubmit} className="tx-form">
          <div className="form-group">
            <label>Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
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
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
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
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
