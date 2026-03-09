const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    condition: {
      type: String,
    },

    bedType: {
      type: String,
      enum: ["ICU", "OXYGEN"],
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
