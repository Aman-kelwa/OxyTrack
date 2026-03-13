import { useState } from "react";
import axios from "axios";

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

      alert("Booking request sent");

      closeModal();
    } catch (error) {
      alert("Booking failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleBooking}
        className="bg-white p-8 rounded-xl w-96 space-y-4"
      >
        <h2 className="text-xl font-bold">Book Bed</h2>

        <input
          placeholder="Patient Name"
          onChange={(e) => setPatientName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Age"
          type="number"
          onChange={(e) => setAge(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Condition"
          onChange={(e) => setCondition(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <select
          onChange={(e) => setBedType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="ICU">ICU</option>
          <option value="OXYGEN">Oxygen</option>
        </select>

        <button className="bg-indigo-600 text-white w-full py-2 rounded">
          Submit
        </button>

        <button
          type="button"
          onClick={closeModal}
          className="w-full border py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default BookingModal;
