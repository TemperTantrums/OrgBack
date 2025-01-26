// Initialize mongoose
const mongoose = require("mongoose");

// Define the schema for a company
const CompanySchema = new mongoose.Schema(
  {
    // Define the fields for the company
    company: { type: String, required: true },
    department: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

// Create the model for the company
const Company = mongoose.model("Company", CompanySchema);

// Export the model
module.exports = Company;
