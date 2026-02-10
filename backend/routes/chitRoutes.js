const express = require("express");
const router = express.Router();
const ChitGroup = require("../models/ChitGroup");
const multer = require("multer"); // Ensure you ran npm install multer

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

// Create Route
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { chitValue, months, members, installment, category, description } = req.body;
    const imagePath = req.file ? req.file.path : "";

    const newChit = new ChitGroup({
      chitValue,
      months,
      members,
      installment,
      category,
      description,
      image: imagePath
    });

    await newChit.save();
    res.status(201).json({ message: "Chit group created successfully", chit: newChit });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const chits = await ChitGroup.find(); // your model
    res.json(chits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { chitValue, months, members, installment, category, description } = req.body;

    const updateData = {
      chitValue,
      months,
      members,
      installment,
      category,
      description,
    };

    // If new image uploaded, update it
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedChit = await ChitGroup.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedChit) {
      return res.status(404).json({ message: "Chit group not found" });
    }

    res.json({
      message: "Chit group updated successfully",
      chit: updatedChit,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// THIS LINE IS REQUIRED
module.exports = router;