import axios from "axios";

function BookingCard({ booking, refreshBookings }) {
  const handleStatus = async (status) => {
    const token = localStorage.getItem("token");

    await axios.patch(
      `http://localhost:5000/api/booking/update/${booking._id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    refreshBookings();
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this booking?")) return;

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/booking/delete/${booking._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    refreshBookings();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-lg font-bold">{booking.patientName}</h2>

      <p className="text-sm text-gray-500">Age: {booking.age}</p>

      <p className="mt-2">Condition: {booking.condition}</p>

      <p>Bed Type: {booking.bedType}</p>

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

      {booking.status !== "PENDING" && (
        <button
          onClick={handleDelete}
          className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-gray-500"
        >
          Delete Booking
        </button>
      )}
    </div>
  );
}

export default BookingCard;
