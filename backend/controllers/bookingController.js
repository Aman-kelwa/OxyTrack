const Booking = require("../models/Booking");
const Hospital = require("../models/Hospital");

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      createdBy: req.user,
    });

    res.status(201).json({
      message: "Booking request created",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("hospital")
      .populate("createdBy", "name email");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id);

    if (req.user.role !== "hospital") {
      return res.status(403).json({
        message: "Only hospital can approve bookings",
      });
    }

    if (!booking) {
      res.status(404).json({
        message: "Booking not found",
      });
    }

    if (status === "APPROVED") {
      const hospital = await Hospital.findById(booking.hospital);

      if (!hospital) {
        res.status(404).json({
          message: "Hospital not found",
        });
      }
      if (booking.bedType === "ICU") {
        if (hospital.availableICU <= 0) {
          return res.status(400).json({
            message: "ICU Beds are not available",
          });
        }
        hospital.availableICU -= 1;
      }
      //updating oxygen beds
      if (booking.bedType === "OXYGEN") {
        if (hospital.availableOxygenBeds <= 0) {
          return res.status(400).json({
            message: "Oxygen Beds are not available",
          });
        }
        hospital.availableOxygenBeds -= 1;
      }
      await hospital.save();
    }
    if (booking.status === "APPROVED") {
      return res.status(400).json({
        message: "Booking already approved",
      });
    }
    booking.status = status;
    await booking.save();

    res.json({
      message: "Booking Update Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
