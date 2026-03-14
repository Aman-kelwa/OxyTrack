const Hospital = require("../models/Hospital");

// CREATE HOSPITAL
exports.createHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Hospital created successfully",
      hospital,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL HOSPITALS
exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().populate("createdBy", "name email");

    res.json(hospitals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE BED AVAILABILITY
exports.updateBeds = async (req, res) => {
  try {
    const { id } = req.params;

    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        message: "Hospital not found",
      });
    }

    const { availableICU, availableOxygenBeds } = req.body;

    if (availableICU > hospital.totalICU) {
      return res.status(400).json({
        message: "Available ICU beds cannot be greater than total ICU beds",
      });
    }

    if (availableOxygenBeds > hospital.totalOxygenBeds) {
      return res.status(400).json({
        message:
          "Available oxygen beds cannot be greater than total oxygen beds",
      });
    }

    hospital.availableICU = availableICU ?? hospital.availableICU;
    hospital.availableOxygenBeds =
      availableOxygenBeds ?? hospital.availableOxygenBeds;

    await hospital.save();

    res.json({
      message: "Beds updated successfully",
      hospital,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;

    const hospital = await Hospital.findByIdAndDelete(id);

    if (!hospital) {
      return res.status(404).json({
        message: "Hospital not found",
      });
    }

    res.json({
      message: "Hospital deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
