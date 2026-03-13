const express = require("express");

const router = express.Router();

const {
  createHospital,
  getHospitals,
  updateBeds,
  deleteHospital,
} = require("../controllers/hospitalController");

const protect = require("../middleware/authMiddleware");

// create hospital
router.post("/create", protect, createHospital);

// get all hospitals
router.get("/", getHospitals);

// update bed availability
router.patch("/update/:id", protect, updateBeds);

//delete hospital
router.delete("/delete/:id", protect, deleteHospital);

module.exports = router;
