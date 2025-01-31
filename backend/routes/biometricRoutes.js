const express = require("express");
const Biometric = require("../models/biometric");

const router = express.Router();

// POST route to save biometric data
router.post("/upload", async (req, res) => {
  try {
    const data = req.body; // Data sent from Angular
    await Biometric.insertMany(data);
    res.status(200).json({ message: "Data successfully saved to MongoDB!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

// GET route to fetch biometric records
router.get("/records", async (req, res) => {
  try {
    const records = await Biometric.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

module.exports = router;
