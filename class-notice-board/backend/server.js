const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Import Routes
const noticeRoutes = require("./routes/noticeRoutes");
const userRoutes = require("./routes/userRoutes"); // Ensure this import is correct

app.use("/api/notices", noticeRoutes);
app.use("/api/users", userRoutes); // Ensure this is properly set

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
