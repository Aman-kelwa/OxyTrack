import { useEffect, useState } from "react";
import axios from "axios";
import HospitalCard from "../components/HospitalCard";
import { motion } from "framer-motion";

function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const fetchHospitals = async () => {
    const res = await axios.get("http://localhost:5000/api/hospital");

    setHospitals(res.data);
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const cities = ["All", ...new Set(hospitals.map((h) => h.city))];

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchSearch = hospital.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCity = cityFilter === "All" || hospital.city === cityFilter;

    const matchType =
      typeFilter === "All" || hospital.hospitalType === typeFilter;

    return matchSearch && matchCity && matchType;
  });

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-10">
      {/* Animated Heading */}

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10 text-indigo-700"
      >
        Find Hospitals
      </motion.h1>

      {/* Stylish Search Section */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4 mb-10"
      >
        {/* Search Box */}

        <div className="relative">
          <input
            type="text"
            placeholder="Search hospitals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 pl-10 pr-4 py-2 border rounded-full shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>

        {/* City Dropdown */}

        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border rounded-full px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {cities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </motion.div>

      {/* Type Filter Buttons */}

      <div className="flex justify-center gap-4 mb-10">
        {["All", "Government", "Private", "NGO", "Emergency"].map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`px-4 py-2 rounded-full border transition
              ${
                typeFilter === type
                  ? "bg-indigo-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Hospitals Grid */}

      {filteredHospitals.length === 0 ? (
        <p className="text-center text-gray-500">No hospitals found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHospitals.map((hospital) => (
            <HospitalCard
              key={hospital._id}
              hospital={hospital}
              refreshHospitals={fetchHospitals}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Hospitals;
