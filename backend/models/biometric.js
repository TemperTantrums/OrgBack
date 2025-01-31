const mongoose = require("mongoose");

const BiometricSchema = new mongoose.Schema({
  enNo: { type: String, required: true },
  DateTime: { type: String, required: true },
});

module.exports = mongoose.model("Biometric", BiometricSchema);
