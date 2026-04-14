
const mongoose = require("mongoose");

// Step A: Define structure
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

// Step B: Create model
module.exports = mongoose.model("Message", messageSchema);