const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import User model
const Notice = require("../models/Notice");
const auth = require("../middleware/auth");
const router = express.Router();
require("dotenv").config();

// Login route for users (admin, teacher, student)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists in the database
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password as plain text (no hashing)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
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

// POST route to add a notice (Teachers only)
router.post("/postNotice", auth, async (req, res) => {
  const { title, content } = req.body;
  if (req.user.role !== "teacher") {
    return res.status(403).json({ error: "Only teachers can post notices" });
  }

  const notice = new Notice({
    title,
    content,
    postedBy: req.user.id,
    createdAt: new Date(),
  });

  await notice.save();
  res.status(201).json({ message: "Notice posted successfully" });
});

// DELETE route to delete a notice (Only the teacher who posted it or admin can delete)
router.delete("/deleteNotice/:id", auth, async (req, res) => {
  const notice = await Notice.findById(req.params.id);

  if (!notice) {
    return res.status(404).json({ error: "Notice not found" });
  }

  if (
    req.user.role === "admin" ||
    notice.postedBy.toString() === req.user.id.toString()
  ) {
    await notice.remove();
    res.json({ message: "Notice deleted successfully" });
  } else {
    res
      .status(403)
      .json({ error: "You are not authorized to delete this notice" });
  }
});

// Route for admin to add users
router.post("/register", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Only admins can add users" });
  }

  const { username, password, role } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser)
    return res.status(400).json({ error: "User already exists" });

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, role });
  await newUser.save();

  res.status(201).json({ message: "User created successfully" });
});

// Get all notices for students (sorted by date)
router.get("/getNotices", async (req, res) => {
  const notices = await Notice.find().sort({ createdAt: -1 }); // Sort by date
  res.json(notices);
});

module.exports = router;
