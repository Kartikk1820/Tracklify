const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const transactionsRoute = require("./routes/transactions.js");
const connectDB = require("./config/db.js");

connectDB();

const app = express();
if (process.env.FRONTEND_URL) {
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );
}
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());

app.use("/api/transactions", transactionsRoute);

app.get("/", (req, res) => res.send("Personal Finance Tracker API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
