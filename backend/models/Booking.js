const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  patientName: String,
  age: Number,
  condition: String,
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  bedType: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed"],
  },
  createdAt: Date,
});

module.exports = mongoose.model("Booking", bookingSchema);
