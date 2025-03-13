const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");
const auth = require("../middleware/auth"); // Middleware to authenticate user
const User = require("../models/User"); // User model

// Get all notices (Available for everyone)
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find()
      .sort({ createdAt: -1 })
      .populate("author", "username role");
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Post a new notice (Only Teachers)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ error: "Only teachers can post notices" });
    }

    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newNotice = new Notice({ title, content, author: req.user.id });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a notice by ID (Only Admins or the Teacher who posted it)
router.delete("/:id", auth, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ error: "Notice not found" });

    // Fetch the notice author role
    const noticeAuthor = await User.findById(notice.author);

    // Only admin or the notice author (teacher) can delete
    if (req.user.role !== "admin" && req.user.id !== notice.author.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this notice" });
    }

    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
