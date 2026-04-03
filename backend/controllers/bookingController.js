const Booking = require("../models/Booking");
const Hospital = require("../models/Hospital");
const { Server } = require("socket.io");

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      createdBy: req.user,
    });

    const io = req.app.get("io");
    io.emit("new-booking", booking);

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
    let bookings = [];

    // Citizen bookings
    if (req.user.role === "citizen") {
      bookings = await Booking.find({
        createdBy: req.user._id,
      }).populate("hospital", "name city");
    }

    // Hospital bookings
    if (req.user.role === "hospital") {
      // get ALL hospitals created by this user
      const hospitals = await Hospital.find({
        createdBy: req.user._id,
      });

      const hospitalIds = hospitals.map((h) => h._id);

      bookings = await Booking.find({
        hospital: { $in: hospitalIds },
      })
        .populate("createdBy", "name email")
        .populate("hospital", "name city");
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

    // prevent double approval/rejection
    if (booking.status !== "PENDING") {
      return res.status(400).json({
        message: `Booking already ${booking.status}`,
      });
    }

    const hospital = await Hospital.findById(booking.hospital);

    // BED MANAGEMENT
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

    // REAL-TIME EVENT
    const io = req.app.get("io");
    io.emit("bookingUpdated", booking);

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
//delete bookings
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    await Booking.findByIdAndDelete(id);

    return res.json({
      message: "Booking deleted successfully",
    });

    // 👨‍⚕️ Hospital delete → real delete + restore beds
    if (req.user.role === "hospital") {
      if (booking.status === "APPROVED") {
        const hospital = await Hospital.findById(booking.hospital);

        if (
          booking.bedType === "ICU" &&
          hospital.availableICU < hospital.totalICU
        ) {
          hospital.availableICU += 1;
        }

        if (
          booking.bedType === "OXYGEN" &&
          hospital.availableOxygenBeds < hospital.totalOxygenBeds
        ) {
          hospital.availableOxygenBeds += 1;
        }

        await hospital.save();
      }

      await Booking.findByIdAndDelete(id);

      return res.json({
        message: "Booking deleted by hospital",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
