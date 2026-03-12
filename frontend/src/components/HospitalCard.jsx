import { useState } from "react";
import { motion } from "framer-motion";
import BookingModal from "./BookingModal";

function HospitalCard({ hospital }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-white shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-2">{hospital.name}</h2>

        <p className="text-gray-300 mb-4">{hospital.city}</p>

        <p>
          ICU Beds:
          <span className="text-green-400 ml-2">{hospital.availableICU}</span>
        </p>

        <p>
          Oxygen Beds:
          <span className="text-green-400 ml-2">
            {hospital.availableOxygenBeds}
          </span>
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="mt-5 w-full bg-cyan-500 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition"
        >
          Book Bed
        </button>
      </motion.div>

      {showModal && (
        <BookingModal
          hospital={hospital}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default HospitalCard;
