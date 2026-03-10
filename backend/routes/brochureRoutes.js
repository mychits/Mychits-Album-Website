const express = require("express");
const router = express.Router();
const Brochure = require("../models/Brochure");
const multer = require("multer");

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create Brochure
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imagePath = req.file ? req.file.path : "";

    const newBrochure = new Brochure({
      title,
      description,
      image: imagePath
    });

    await newBrochure.save();
    res.status(201).json({ message: "Brochure created successfully", brochure: newBrochure });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Brochures
router.get("/", async (req, res) => {
  try {
    const brochures = await Brochure.find();
    res.json(brochures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Brochure
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    const updateData = {
      title,
      description,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedBrochure = await Brochure.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedBrochure) {
      return res.status(404).json({ message: "Brochure not found" });
    }

    res.json({
      message: "Brochure updated successfully",
      brochure: updatedBrochure,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;