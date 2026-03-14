import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [bookingCount, setBookingCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // Fetch booking count for citizen
  const fetchBookings = async () => {
    if (role !== "citizen") return;

    try {
      const res = await axios.get("http://localhost:5000/api/booking", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookingCount(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LOGO */}

        <Link to="/" className="flex items-center gap-3">
          <span className="text-xl font-bold text-white">OxyTrack</span>
        </Link>

        {/* NAV LINKS */}

        <div className="hidden md:flex gap-8 text-white font-medium">
          <Link to="/" className="hover:text-cyan-200 transition">
            Home
          </Link>

          {/* Citizen Navigation */}

          {role === "citizen" && (
            <>
              <Link to="/hospitals" className="hover:text-cyan-200 transition">
                Hospitals
              </Link>

              {/* My Bookings */}

              <Link
                to="/my-bookings"
                className="relative hover:text-cyan-200 transition"
              >
                My Bookings
                {bookingCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {bookingCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* Hospital Navigation */}

          {role === "hospital" && (
            <Link to="/dashboard" className="hover:text-cyan-200 transition">
              Dashboard
            </Link>
          )}
        </div>

        {/* RIGHT SIDE BUTTONS */}

        <div className="flex gap-3">
          {!token && (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-white rounded-lg text-white hover:bg-white hover:text-indigo-600 transition"
                >
                  Login
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold"
                >
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}

          {token && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold"
            >
              Logout
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
