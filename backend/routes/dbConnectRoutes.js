const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Keep track of the current database connection
let dbConnection = null;

// Route to accept connection string from the frontend and connect to MongoDB
router.post("/db-connect", async (req, res) => {
  const { connectionString } = req.body;

  if (!connectionString) {
    return res.status(400).json({ message: "Connection string is required." });
  }

  // Disconnect any existing connection
  if (dbConnection) {
    await mongoose.disconnect();
    console.log("Previous MongoDB connection closed.");
  }

  try {
    // Attempt to connect to MongoDB with the new connection string
    dbConnection = await mongoose.connect(connectionString, {});
    console.log(`Connected to MongoDB at ${connectionString}`);
    res.status(200).json({ message: "Connected to MongoDB successfully." });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({ message: "Failed to connect to MongoDB.", error });
  }
});

router.get("/db-status", (req, res) => {
  const status = mongoose.connection.readyState;
  let message = "";

  switch (status) {
    case 0:
      message = "Disconnected";
      break;
    case 1:
      message = "Connected";
      break;
    case 2:
      message = "Connecting";
      break;
    case 3:
      message = "Disconnecting";
      break;
    default:
      message = "Unknown";
  }

  res.json({ status: message });
});

module.exports = router;
