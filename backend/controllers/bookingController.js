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

// exports.getBooking = async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate("hospital")
//       .populate("createdBy", "name email");
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
exports.getBooking = async (req, res) => {
  try {
    let bookings;

    if (req.user.role === "citizen") {
      bookings = await Booking.find({
        createdBy: req.user._id,
      })
        .populate("hospital", "name city")
        .populate("createdBy", "name email");
    } else if (req.user.role === "hospital") {
      bookings = await Booking.find()
        .populate("hospital")
        .populate("createdBy", "name email");
    }

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

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (req.user.role !== "hospital") {
      return res.status(403).json({
        message: "Only hospital can approve bookings",
      });
    }

    // NEW CHECK
    if (booking.status !== "PENDING") {
      return res.status(400).json({
        message: `Booking already ${booking.status}`,
      });
    }

    const hospital = await Hospital.findById(booking.hospital);

    if (status === "APPROVED") {
      if (booking.bedType === "ICU") {
        if (hospital.availableICU <= 0) {
          return res.status(400).json({
            message: "No ICU beds available",
          });
        }

        hospital.availableICU -= 1;
      }

      if (booking.bedType === "OXYGEN") {
        if (hospital.availableOxygenBeds <= 0) {
          return res.status(400).json({
            message: "No oxygen beds available",
          });
        }

        hospital.availableOxygenBeds -= 1;
      }

      await hospital.save();
    }

    booking.status = status;

    await booking.save();

    res.json({
      message: `Booking ${status}`,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
