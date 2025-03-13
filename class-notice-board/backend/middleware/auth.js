const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

module.exports = async function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id);

    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = { id: user._id, role: user.role }; // Attach user info to request
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};
