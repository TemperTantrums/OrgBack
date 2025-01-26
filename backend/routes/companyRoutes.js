// Initialize express router
const express = require("express");
const { body, validationResult } = require("express-validator");
const validateObjectId = require("../middleware/validateObjectId");
const Company = require("../models/company");
const router = express.Router();

// Fetch all companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json({ data: companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});

// Create a company
router.post(
  "/",
  [
    body("company").isString().notEmpty().withMessage("Company is required"),
    body("department")
      .isString()
      .notEmpty()
      .withMessage("Department is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const company = new Company(req.body);
      await company.save();
      res.status(201).json({ success: true, data: company });
    } catch (error) {
      console.error("Error creating company:", error);
      res.status(500).json({ error: "Failed to create company" });
    }
  }
);

// Update a company
router.put("/:id", validateObjectId, async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json({ success: true, data: updatedCompany });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ error: "Failed to update company" });
  }
});

// Delete a company
router.delete("/:id", validateObjectId, async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ error: "Failed to delete company" });
  }
});

// Export the router
module.exports = router;
