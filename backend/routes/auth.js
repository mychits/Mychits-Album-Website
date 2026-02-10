const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER (store in DB)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ email, password });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN (verify credentials)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // 2. Check if password matches
    // NOTE: Since your register route saves passwords as plain text, we compare plain text here.
    // In a real app, you should use bcrypt to hash passwords.
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // 3. Send the user object back to the frontend
    // Your frontend expects: login(res.data.user)
    res.json({ 
        message: "Login successful",
        user: { email: user.email, _id: user._id } // Send the data needed by frontend
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;