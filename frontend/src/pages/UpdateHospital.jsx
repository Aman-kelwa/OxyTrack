import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateHospital() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hospital, setHospital] = useState(null);

  const [form, setForm] = useState({
    totalICU: "",
    availableICU: "",
    totalOxygenBeds: "",
    availableOxygenBeds: "",
  });

  // Fetch hospital data
  const fetchHospital = async () => {
    const res = await axios.get("http://localhost:5000/api/hospital");

    const found = res.data.find((h) => h._id === id);

    setHospital(found);

    setForm({
      totalICU: found.totalICU,
      availableICU: found.availableICU,
      totalOxygenBeds: found.totalOxygenBeds,
      availableOxygenBeds: found.availableOxygenBeds,
    });
  };

  useEffect(() => {
    fetchHospital();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.put(`http://localhost:5000/api/hospital/update/${id}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Beds updated successfully");
    console.log(err);

    navigate("/dashboard");
  };

  if (!hospital) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-6 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-lg">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Update Beds</h1>

        <p className="text-gray-500 mb-6">{hospital.name}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ICU */}

          <h2 className="font-semibold text-lg">ICU Beds</h2>

          <input
            type="number"
            name="totalICU"
            value={form.totalICU}
            onChange={handleChange}
            placeholder="Total ICU"
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="availableICU"
            value={form.availableICU}
            onChange={handleChange}
            placeholder="Available ICU"
            className="w-full border p-2 rounded"
          />

          {/* Oxygen */}

          <h2 className="font-semibold text-lg mt-4">Oxygen Beds</h2>

          <input
            type="number"
            name="totalOxygenBeds"
            value={form.totalOxygenBeds}
            onChange={handleChange}
            placeholder="Total Oxygen Beds"
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="availableOxygenBeds"
            value={form.availableOxygenBeds}
            onChange={handleChange}
            placeholder="Available Oxygen Beds"
            className="w-full border p-2 rounded"
          />

          {/* Buttons */}

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 bg-gray-400 text-white py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateHospital;
