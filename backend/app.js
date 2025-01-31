const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");

const companyRoutes = require("./routes/companyRoutes");
const biometricRoutes = require("./routes/biometricRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use("/api/companies", companyRoutes);
app.use("/api/biometric", biometricRoutes);

module.exports = app;
