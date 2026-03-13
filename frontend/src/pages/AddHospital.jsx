import { useState } from "react";
import axios from "axios";

function AddHospital() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    hospitalType: "Government",
    totalICU: "",
    availableICU: "",
    totalOxygenBeds: "",
    availableOxygenBeds: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      console.log(form);

      await axios.post("http://localhost:5000/api/hospital/create", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Hospital added");
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-bold">Add Hospital</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="hospitalType"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Government</option>
          <option>Private</option>
          <option>NGO</option>
          <option>Emergency</option>
        </select>

        <input
          name="totalICU"
          placeholder="Total ICU"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="availableICU"
          placeholder="Available ICU"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="totalOxygenBeds"
          placeholder="Total Oxygen Beds"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="availableOxygenBeds"
          placeholder="Available Oxygen Beds"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="bg-indigo-600 text-white w-full py-2 rounded">
          Add Hospital
        </button>
      </form>
    </div>
  );
}

export default AddHospital;
