const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

router.post("/create", async (req, res) => {
  try {
    const { name, phone, schemeId } = req.body;

    if (!name || !phone || !schemeId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const lead = new Lead({
      name,
      phone,
      schemeId,
    });

    await lead.save();

    res.status(201).json({ message: "Lead saved", lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
