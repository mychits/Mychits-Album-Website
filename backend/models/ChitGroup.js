const mongoose = require("mongoose");

const chitGroupSchema = new mongoose.Schema({
  chitValue: { type: Number, required: true },
  months: { type: Number, required: true },
  members: { type: Number, required: true },
    installment: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true } // This will store the file path/URL
});
// const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

// 'chitgroup' forces the collection name to be exactly "chitgroup" in the DB
module.exports = mongoose.model("ChitGroups", chitGroupSchema);