import { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../components/BookingCard";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  const navigate = useNavigate();

  const hospitalName = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:5000/api/booking", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBookings(res.data);
  };

  const fetchHospitals = async () => {
    const res = await axios.get("http://localhost:5000/api/hospital");

    setHospitals(res.data);
  };

  useEffect(() => {
    fetchBookings();
    fetchHospitals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-10">
      {/* Header */}

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-indigo-700">
            🏥 {hospitalName} Dashboard
          </h1>

          <p className="text-gray-500">Manage hospitals and booking requests</p>
        </div>

        <Link
          to="/add-hospital"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
        >
          Add Hospital
        </Link>
      </div>

      {/* Hospitals Section */}

      <h2 className="text-2xl font-semibold mb-6">Your Hospitals</h2>

      {hospitals.length === 0 ? (
        <p>No hospitals found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {hospitals.map((hospital) => (
            <div
              key={hospital._id}
              className="bg-white p-6 rounded-xl shadow border"
            >
              <h2 className="text-lg font-bold">{hospital.name}</h2>

              <p className="text-sm text-gray-500">{hospital.city}</p>

              <p className="mt-2">
                ICU: {hospital.availableICU} / {hospital.totalICU}
              </p>

              <p>
                Oxygen: {hospital.availableOxygenBeds} /{" "}
                {hospital.totalOxygenBeds}
              </p>

              {/* ✅ Correct Update Button */}

              <button
                onClick={() => navigate(`/update-hospital/${hospital._id}`)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
              >
                Update Beds
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Booking Section */}

      <h2 className="text-2xl font-semibold mb-6">Booking Requests</h2>

      {bookings.length === 0 ? (
        <p>No booking requests</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BookingCard booking={booking} refreshBookings={fetchBookings} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
