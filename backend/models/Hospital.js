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

    address: {
      type: String,
      required: true,
    },

    hospitalType: {
      type: String,
      enum: ["Government", "Private", "NGO", "Emergency"],
      required: true,
      default: "Private",
    },

    totalICU: {
      type: Number,
      required: true,
    },

    availableICU: {
      type: Number,
      required: true,
    },

    totalOxygenBeds: {
      type: Number,
      required: true,
    },

    availableOxygenBeds: {
      type: Number,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hospital", hospitalSchema);
