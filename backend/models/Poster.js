const mongoose = require("mongoose");

const posterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, required: true } // Stores the file path
});

module.exports = mongoose.model("Poster", posterSchema);