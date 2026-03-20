import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function MyBookings() {
  const [bookings, setBookings] = useState([]);

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

    // listen for booking updates
    socket.on("bookingUpdated", (updatedBooking) => {
      setBookings((prev) =>
        prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b)),
      );
    });

    return () => {
      socket.off("bookingUpdated");
    };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/booking/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchBookings();
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-10">
      <h1 className="text-3xl font-bold mb-10">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-xl shadow border"
            >
              <h2 className="text-lg font-bold">
                {booking.hospital?.name || "Hospital unavailable"}
              </h2>

              <p className="text-sm text-gray-500">{booking.hospital?.city}</p>

              <p className="mt-3">Patient: {booking.patientName}</p>

              <p>Bed Type: {booking.bedType}</p>

              <p className="mt-2">
                Status:
                <span
                  className={`ml-2 font-semibold
                    ${
                      booking.status === "APPROVED"
                        ? "text-green-600"
                        : booking.status === "REJECTED"
                          ? "text-red-600"
                          : "text-yellow-600"
                    }`}
                >
                  {booking.status}
                </span>
              </p>

              {/* {booking.status !== "PENDING" && (
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-400"
                >
                  Delete Booking
                </button>
              )} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
