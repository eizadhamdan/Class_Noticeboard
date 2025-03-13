const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true }, // Teacher's name
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notice", NoticeSchema);
