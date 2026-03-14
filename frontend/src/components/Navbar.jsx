import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const userToken = localStorage.getItem("token");

    setRole(userRole);
    setToken(userToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");

    window.location.reload();
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}

        <Link to="/" className="text-xl font-bold text-indigo-600">
          OxyTrack
        </Link>

        {/* NAV LINKS */}

        <div className="flex gap-6 items-center">
          <Link to="/hospitals" className="text-gray-700 hover:text-indigo-600">
            Hospitals
          </Link>

          {/* Citizen Only */}

          {role === "citizen" && (
            <Link
              to="/my-bookings"
              className="text-gray-700 hover:text-indigo-600"
            >
              My Bookings
            </Link>
          )}

          {/* Hospital Only */}

          {role === "hospital" && (
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600"
            >
              Dashboard
            </Link>
          )}

          {/* Auth Buttons */}

          {!token ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
