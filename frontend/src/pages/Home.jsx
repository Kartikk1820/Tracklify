import React from "react";
import TransactionList from "../components/TransactionList";

export default function Home() {
  return (
    <div>
      <header>
        <h1>Personal Finance Tracker</h1>
      </header>
      <main>
        <TransactionList />
      </main>
    </div>
  );
}
