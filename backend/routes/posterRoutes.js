const express = require("express");
const router = express.Router();
const Poster = require("../models/Poster");
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

// Create Poster
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imagePath = req.file ? req.file.path : "";

    const newPoster = new Poster({
      title,
      description,
      image: imagePath
    });

    await newPoster.save();
    res.status(201).json({ message: "Poster created successfully", poster: newPoster });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Posters
router.get("/", async (req, res) => {
  try {
    const posters = await Poster.find();
    res.json(posters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Poster
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

    const updatedPoster = await Poster.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedPoster) {
      return res.status(404).json({ message: "Poster not found" });
    }

    res.json({
      message: "Poster updated successfully",
      poster: updatedPoster,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;