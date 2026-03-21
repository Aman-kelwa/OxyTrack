import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import MyHospitals from "../pages/MyHospitals";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LOGO */}

        <Link to="/" className="text-xl font-bold text-white">
          OxyTrack
        </Link>

        {/* DESKTOP MENU */}

        <div className="hidden md:flex gap-8 text-white font-medium">
          <Link to="/" className="hover:text-cyan-200">
            Home
          </Link>

          {role === "citizen" && (
            <>
              <Link to="/hospitals" className="hover:text-cyan-200">
                Hospitals
              </Link>

              <Link to="/my-bookings" className="hover:text-cyan-200">
                My Bookings
              </Link>
            </>
          )}

          {role === "hospital" && (
            <>
              <Link to="/dashboard" className="hover:text-cyan-200">
                Dashboard
              </Link>

              <Link to="/my-hospitals" className="hover:text-cyan-200">
                Your Hospitals
              </Link>
            </>
          )}
        </div>

        {/* RIGHT BUTTONS */}

        <div className="hidden md:flex gap-3">
          {!token && (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-white rounded text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-white text-indigo-600 rounded"
              >
                Sign Up
              </Link>
            </>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-indigo-600 rounded"
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div className="md:hidden bg-indigo-700 text-white flex flex-col items-center gap-4 py-6">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {role === "citizen" && (
            <>
              <Link to="/hospitals" onClick={() => setMenuOpen(false)}>
                Hospitals
              </Link>

              <Link to="/my-bookings" onClick={() => setMenuOpen(false)}>
                My Bookings
              </Link>
            </>
          )}

          {role === "hospital" && (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}

          {!token && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>

              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}

          {token && <button onClick={handleLogout}>Logout</button>}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
