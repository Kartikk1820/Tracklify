import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        background: "linear-gradient(90deg, #000000, #1c1c1c)",
        color: "white",
      }}
    >
      <h2 style={{ margin: 0 }}>💰 Finance Tracker</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/add" style={{ color: "white", textDecoration: "none" }}>
          Add
        </Link>
        <Link
          to="/dashboard"
          style={{ color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
