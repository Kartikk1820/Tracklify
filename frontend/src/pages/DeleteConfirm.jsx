import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function DeleteConfirm() {
  const { id } = useParams();
  const [tx, setTx] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/transactions/${id}`)
      .then((r) => setTx(r.data))
      .catch(() => navigate("/"));
  }, [id]);

  const handleDelete = async () => {
    await api.delete(`/transactions/${id}`);
    navigate("/");
  };

  if (!tx) return <p>Loading...</p>;
  return (
    <div>
      <h3>Delete Transaction</h3>
      <p>Title: {tx.title}</p>
      <p>Amount: {tx.amount}</p>
      <p>Date: {new Date(tx.date).toLocaleDateString()}</p>
      <button onClick={handleDelete}>Confirm Delete</button>
      <Link to="/">Cancel</Link>
    </div>
  );
}
