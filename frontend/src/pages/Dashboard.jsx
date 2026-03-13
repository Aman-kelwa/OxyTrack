import { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../components/BookingCard";
import { Link } from "react-router-dom";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/booking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Hospital Dashboard</h1>

        <Link
          to="/add-hospital"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Hospital
        </Link>
      </div>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              refreshBookings={fetchBookings}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
