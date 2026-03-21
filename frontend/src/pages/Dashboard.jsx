import { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../components/BookingCard";
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

  const totalBookings = bookings.length;
  const approved = bookings.filter((b) => b.status === "APPROVED").length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const rejected = bookings.filter((b) => b.status === "REJECTED").length;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-6">
      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-10"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {hospitalName} Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage bookings and hospital operations
          </p>
        </div>

        <Link
          to="/add-hospital"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-500 transition"
        >
          + Add Hospital
        </Link>
      </motion.div>

      {/* 📊 STATS CARDS */}

      <div className="grid md:grid-cols-4 gap-5 mb-10">
        {[
          { title: "Total", value: totalBookings, color: "bg-blue-500" },
          { title: "Approved", value: approved, color: "bg-green-500" },
          { title: "Pending", value: pending, color: "bg-yellow-500" },
          { title: "Rejected", value: rejected, color: "bg-red-500" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-5 rounded-xl shadow-sm border"
          >
            <p className="text-sm text-gray-500">{item.title}</p>

            <h2 className="text-2xl font-bold text-gray-800">{item.value}</h2>

            <div className={`h-1 mt-3 rounded ${item.color}`}></div>
          </motion.div>
        ))}
      </div>

      {/* BOOKINGS */}

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-semibold text-gray-700 mb-6"
      >
        Booking Requests
      </motion.h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No booking requests</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
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
