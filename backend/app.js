const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");

const companyRoutes = require("./routes/companyRoutes");
const biometricRoutes = require("./routes/biometricRoutes");
const dbConnectRoutes = require("./routes/dbConnectRoutes");

dotenv.config();

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:4200", // Allow during development
  "https://orgfront.onrender.com", // Replace with your deployed Angular frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Allow cookies and credentials if needed
  })
);

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use("/api/companies", companyRoutes);
app.use("/api/biometric", biometricRoutes);
app.use("/api", dbConnectRoutes);

module.exports = app;
