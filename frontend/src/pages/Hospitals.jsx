import { useEffect, useState } from "react";
import axios from "axios";
import HospitalCard from "../components/HospitalCard";

function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchHospitals = async () => {
    const res = await axios.get("http://localhost:5000/api/hospital");

    setHospitals(res.data);
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const filteredHospitals =
    filter === "All"
      ? hospitals
      : hospitals.filter((h) => h.hospitalType === filter);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-10">
      <h1 className="text-4xl font-bold text-center mb-8">Find Hospitals</h1>

      {/* FILTER BUTTONS */}

      <div className="flex justify-center gap-4 mb-10">
        {["All", "Government", "Private", "NGO", "Emergency"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full border
              ${filter === type ? "bg-indigo-600 text-white" : "bg-white"}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* HOSPITAL GRID */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHospitals.map((hospital) => (
          <HospitalCard
            key={hospital._id}
            hospital={hospital}
            refreshHospitals={fetchHospitals}
          />
        ))}
      </div>
    </div>
  );
}

export default Hospitals;
