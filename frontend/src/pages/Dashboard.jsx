import { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../components/BookingCard";
import HospitalCard from "../components/HospitalCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [hospitals, setHospitals] = useState([]);

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

      {/* Hospital List */}

      {/* <h2 className="text-2xl font-semibold mb-6">Your Hospitals</h2>

      {hospitals.length === 0 ? (
        <p>No hospitals added</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {hospitals.map((hospital) => (
            <HospitalCard
              key={hospital._id}
              hospital={hospital}
              refreshHospitals={fetchHospitals}
            />
          ))}
        </div>
      )} */}

      {/* Booking Requests */}

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
