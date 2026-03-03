const mongoose = require("mongoose");

const oxygenLogSchema = new mongoose.Schema({
  hospital: ObjectId,
  date: Date,
  cylindersUsed: Number,
  remainingStock: Number,
});

module.exports = mongoose.model("OxygenLog", oxygenLogSchema);
