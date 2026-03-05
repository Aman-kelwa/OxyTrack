const express = require("express");

const router = express.Router();

const {
  createHospital,
  getHospitals,
  updateBeds,
} = require("../controllers/hospitalController");

const protect = require("../middleware/authMiddleware");

// create hospital
router.post("/create", protect, createHospital);

// get all hospitals
router.get("/", getHospitals);

// update bed availability
router.patch("/update/:id", protect, updateBeds);

module.exports = router;
