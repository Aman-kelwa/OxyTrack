const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: String,
    contactNumber: String,

    totalICU: Number,
    availableICU: Number,

    totalOxygenBeds: Number,
    availableOxygenBeds: Number,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hospitalType: {
      type: String,
      enum: ["Government", "Private", "NGO", "Emergency"],
      required: true,
      default: "Private",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hospital", hospitalSchema);
