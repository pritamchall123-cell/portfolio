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

app.post("/contact", async(req, res) => {
  try{
    const {name, email, message} = req.body;
    const newMessage = new Message({name, email, message});

    await newMessage.save();

    console.log("Saved to DB:", newMessage);

    res.json({ success: true, message: "Saved in DB"});
  }catch(err){
    console.log(err);
    res.status(500).json({success: false});
  }
});

// ✅ FINAL FIX (catch-all route)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});