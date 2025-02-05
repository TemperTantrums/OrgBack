const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");

const companyRoutes = require("./routes/companyRoutes");
const biometricRoutes = require("./routes/biometricRoutes");
const dbConnectRoutes = require("./routes/dbConnectRoutes"); // Import new route

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Ensure JSON body parsing for incoming requests
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use("/api/companies", companyRoutes);
app.use("/api/biometric", biometricRoutes);
app.use("/api", dbConnectRoutes); // Add the new route here

module.exports = app;
