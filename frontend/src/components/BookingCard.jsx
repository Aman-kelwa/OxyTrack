import axios from "axios";

function BookingCard({ booking, refreshBookings }) {
  const handleStatus = async (status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(
        `http://localhost:5000/api/booking/update/${booking._id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);

      refreshBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-lg font-bold">{booking.patientName}</h2>

      <p className="text-sm text-gray-500">Age: {booking.age}</p>

      <p className="mt-2">Condition: {booking.condition}</p>

      <p>
        Bed Type:
        <span className="ml-1 font-semibold">{booking.bedType}</span>
      </p>

      <p className="mt-2">
        Status:
        <span
          className={`ml-2 font-bold
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

      <div className="flex gap-2 mt-4">
        <button
          disabled={booking.status !== "PENDING"}
          onClick={() => handleStatus("APPROVED")}
          className="flex-1 bg-green-600 text-white py-2 rounded disabled:bg-gray-400"
        >
          Approve
        </button>

        <button
          disabled={booking.status !== "PENDING"}
          onClick={() => handleStatus("REJECTED")}
          className="flex-1 bg-red-600 text-white py-2 rounded disabled:bg-gray-400"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default BookingCard;
