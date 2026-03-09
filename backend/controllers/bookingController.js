const Booking = require("../models/Booking");

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

    if (!booking) {
      res.status(404).json({
        message: "Booking not found",
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
