import { useState } from "react";
import axios from "axios";

function AddHospital() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    hospitalType: "Private",
    totalICU: "",
    availableICU: "",
    totalOxygenBeds: "",
    availableOxygenBeds: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://oxytrack.onrender.com/api/hospital/create",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Hospital added successfully");

      navigate("/dashboard");
    } catch (error) {
      alert("Error adding hospital");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-bold">Add Hospital</h2>

        <input
          name="name"
          placeholder="Hospital Name"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <select
          name="hospitalType"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option>Government</option>
          <option>Private</option>
          <option>NGO</option>
          <option>Emergency</option>
        </select>

        <input
          name="totalICU"
          placeholder="Total ICU Beds"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          name="availableICU"
          placeholder="Available ICU Beds"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          name="totalOxygenBeds"
          placeholder="Total Oxygen Beds"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          name="availableOxygenBeds"
          placeholder="Available Oxygen Beds"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <button className="bg-indigo-600 text-white w-full py-2 rounded">
          Add Hospital
        </button>
      </form>
    </div>
  );
}

export default AddHospital;
