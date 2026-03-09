const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBooking,
  updateBookingStatus,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");
const { route } = require("./hospitalRoutes");

// router.post("/create", createBooking);
router.post("/create", protect, createBooking);

//get all the booking
router.get("/", protect, getBooking);

//update booking
router.patch("/update/:id", protect, updateBookingStatus);

module.exports = router;
