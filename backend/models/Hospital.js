const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  contactNumber: String,
  totalICU: Number,
  availableICU: Number,
  totalOxygenBeds: Number,
  availableOxygenBeds: Number,
  totalVentilators: Number,
  availableVentilators: Number,
  oxygenStockLevel: Number,
  lastUpdated: Date,
});

module.exports = mongoose.model("Hospital", hospitalSchema);
