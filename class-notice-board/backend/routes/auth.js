const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Direct string comparison for plain text password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
