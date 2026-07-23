require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Message = require("./models/Message");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB (optional for now)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Serve static files
app.use(express.static(path.join(__dirname, "client")));

// API route (keep ABOVE wildcard)
app.get("/api", (req, res) => {
  res.json({ message: "Backend working 🚀" });
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic backend validation (never trust the frontend alone)
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: "Invalid email format." });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    console.log("Saved to DB:", newMessage);
    res.json({ success: true, message: "Saved in DB" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Server error, please try again later." });
  }
});

// ✅ FINAL FIX (catch-all route)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});