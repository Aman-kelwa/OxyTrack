import { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../components/BookingCard";
import { motion } from "framer-motion";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  const hospitalName = localStorage.getItem("name");

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/api/booking", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Stats
  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const approved = bookings.filter((b) => b.status === "APPROVED").length;
  const rejected = bookings.filter((b) => b.status === "REJECTED").length;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-10">
      {/* Animated Header */}

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold text-indigo-700">
          🏥 {hospitalName} Dashboard
        </h1>

        <p className="text-gray-500 mt-1">Manage patient booking requests</p>
      </motion.div>

      {/* Statistics Cards */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-4 gap-6 mb-10"
      >
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-yellow-100 p-6 rounded-xl shadow">
          <p className="text-yellow-700">Pending</p>
          <h2 className="text-2xl font-bold">{pending}</h2>
        </div>

        <div className="bg-green-100 p-6 rounded-xl shadow">
          <p className="text-green-700">Approved</p>
          <h2 className="text-2xl font-bold">{approved}</h2>
        </div>

        <div className="bg-red-100 p-6 rounded-xl shadow">
          <p className="text-red-700">Rejected</p>
          <h2 className="text-2xl font-bold">{rejected}</h2>
        </div>
      </motion.div>

      {/* Booking Cards */}

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
