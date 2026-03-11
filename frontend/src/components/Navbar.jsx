import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
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

          <Link to="/hospitals" className="hover:text-cyan-200 transition">
            Hospitals
          </Link>

          <Link to="/dashboard" className="hover:text-cyan-200 transition">
            Dashboard
          </Link>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">
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
              className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:scale-105 transition"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
