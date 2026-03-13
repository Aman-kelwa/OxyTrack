import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import BookingModal from "./BookingModal";

function HospitalCard({ hospital, refreshHospitals }) {
  const [open, setOpen] = useState(false);

  const icuPercent = (hospital.availableICU / hospital.totalICU) * 100;

  const oxygenPercent =
    (hospital.availableOxygenBeds / hospital.totalOxygenBeds) * 100;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this hospital?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/hospital/delete/${hospital._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Hospital deleted");

      refreshHospitals();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.04 }}
        className="bg-white p-6 rounded-xl shadow border hover:shadow-xl transition"
      >
        {/* HEADER */}

        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{hospital.name}</h2>

            <p className="text-sm text-gray-500">📍 {hospital.city}</p>
          </div>

          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
            {hospital.hospitalType}
          </span>
        </div>

        {/* ICU BEDS */}

        <div className="mt-5">
          <div className="flex justify-between text-sm mb-1">
            <span>ICU Beds</span>

            <span>
              {hospital.availableICU}/{hospital.totalICU}
            </span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${icuPercent}%` }}
            ></div>
          </div>
        </div>

        {/* OXYGEN BEDS */}

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Oxygen Beds</span>

            <span>
              {hospital.availableOxygenBeds}/{hospital.totalOxygenBeds}
            </span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-cyan-500 h-2 rounded"
              style={{ width: `${oxygenPercent}%` }}
            ></div>
          </div>
        </div>

        {/* BUTTONS */}

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setOpen(true)}
            className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
          >
            Book Bed
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </motion.div>

      {open && (
        <BookingModal hospital={hospital} closeModal={() => setOpen(false)} />
      )}
    </>
  );
}

export default HospitalCard;
