import axios from "axios";
import React from "react";
import { useState } from "react";

function BookingModal({ hospital, closeModal }) {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const [bedType, setBedType] = useState("ICU");

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/booking/create",
        {
          patientName,
          age,
          condition,
          bedType,
          hospital: hospital._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert("Booking request send");
      closeModal();
    } catch (error) {
      alert("Booking failed");
      console.log("Error", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-gray-900 p-8 rounded-xl w-96 text-white">
        <h2 className="text-2xl font-bold mb-6">Book Bed at {hospital.name}</h2>

        <form onSubmit={handleBooking} className="space-y-4">
          <input
            type="text"
            placeholder="Patient Name"
            required
            className="w-full p-3 rounded bg-gray-800"
            onChange={(e) => setPatientName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            required
            className="w-full p-3 rounded bg-gray-800"
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="text"
            placeholder="Condition"
            required
            className="w-full p-3 rounded bg-gray-800"
            onChange={(e) => setCondition(e.target.value)}
          />

          <select
            className="w-full p-3 rounded bg-gray-800"
            onChange={(e) => setBedType(e.target.value)}
          >
            <option value="ICU">ICU</option>
            <option value="OXYGEN">Oxygen</option>
          </select>

          <button className="w-full bg-cyan-500 py-2 rounded-lg hover:bg-cyan-400 transition">
            Submit Booking
          </button>
        </form>

        <button
          onClick={closeModal}
          className="mt-4 w-full border border-gray-400 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default BookingModal;
