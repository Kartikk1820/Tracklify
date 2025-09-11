// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

function toSafeUser(user) {
  return { id: user._id, username: user.username, email: user.email };
}

function setAuthCookie(res, token) {
  if (process.env.NODE_ENV === "production") {
    // Secure cookie only in production
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
  }
}

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({ error: "User with email/username exists" });
    }
    const user = new User({ username, email, password });
    await user.save();

    const token = signToken(user._id);
    setAuthCookie(res, token);
    res.status(201).json({ token, user: toSafeUser(user) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = signToken(user._id);
    setAuthCookie(res, token);
    res.json({ token, user: toSafeUser(user) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Logout (clear cookie in prod)
router.post("/logout", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
  res.json({ message: "Logged out" });
});

module.exports = router;
