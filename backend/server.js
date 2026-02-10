const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const chitRoutes = require("./routes/chitRoutes");
const leadRoutes = require("./routes/leadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect("mongodb://127.0.0.1:27017/sanjay");

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/chitgroup", chitRoutes);
app.use("/api/leads", leadRoutes);   // ✅ ONLY THIS

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
