const express = require("express");

const router = express.Router();

const {
  createHospital,
  getHospitals,
  getMyHospitals,
  updateBeds,
  deleteHospital,
} = require("../controllers/hospitalController");

const protect = require("../middleware/authMiddleware");

// create hospital
router.post("/create", protect, createHospital);

// get all hospitals
router.get("/", getHospitals);

//get hospitals for hospital login
router.get("/my-hospitals", protect, getMyHospitals);

// update bed availability
router.put("/update/:id", protect, updateBeds);

//delete hospital
router.delete("/delete/:id", protect, deleteHospital);

module.exports = router;
