import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function MyHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchHospitals = async () => {
    const res = await axios.get("http://localhost:5000/api/hospital", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setHospitals(res.data);
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hospital?")) return;

    await axios.delete(`http://localhost:5000/api/hospital/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchHospitals();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-6">
      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold text-gray-800">My Hospitals</h1>
        <p className="text-gray-500 mt-2">
          Manage your hospitals and bed availability
        </p>
      </motion.div>

      {hospitals.length === 0 ? (
        <p className="text-gray-500">No hospitals found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital, index) => (
            <motion.div
              key={hospital._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border transition"
            >
              {/* Title */}

              <h2 className="text-lg font-semibold text-gray-800">
                {hospital.name}
              </h2>

              <p className="text-sm text-gray-500 mb-4">{hospital.city}</p>

              {/* ICU */}

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>ICU Beds</span>
                  <span>
                    {hospital.availableICU}/{hospital.totalICU}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(hospital.availableICU / hospital.totalICU) * 100}%`,
                    }}
                    className="bg-indigo-500 h-2 rounded-full"
                  />
                </div>
              </div>

              {/* Oxygen */}

              <div className="mb-5">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Oxygen Beds</span>
                  <span>
                    {hospital.availableOxygenBeds}/{hospital.totalOxygenBeds}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(hospital.availableOxygenBeds / hospital.totalOxygenBeds) * 100}%`,
                    }}
                    className="bg-green-500 h-2 rounded-full"
                  />
                </div>
              </div>

              {/* Buttons */}

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/update-hospital/${hospital._id}`)}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-500 transition"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(hospital._id)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyHospitals;
