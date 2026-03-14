import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
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
              {/* Hospital Name */}

              <h2 className="text-lg font-bold">
                {booking.hospital
                  ? booking.hospital.name
                  : "Hospital unavailable"}
              </h2>

              {/* Hospital City */}

              <p className="text-sm text-gray-500">
                {booking.hospital?.city || "Unknown city"}
              </p>

              {/* Patient */}

              <p className="mt-3">Patient: {booking.patientName}</p>

              {/* Bed Type */}

              <p>Bed Type: {booking.bedType}</p>

              {/* Status */}

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
