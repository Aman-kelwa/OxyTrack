import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hospitals from "./pages/Hospitals";
import Dashboard from "./pages/HospitalDashboard";
import AddHospital from "./pages/AddHospital";
import MyBookings from "./pages/MyBookings";
import UpdateHospital from "./pages/UpdateHospital";
import MyHospitals from "./pages/MyHospitals";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/hospitals"
          element={
            <ProtectedRoute>
              <Hospitals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="hospital">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/add-hospital" element={<AddHospital />} />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute role="citizen">
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route path="/update-hospital/:id" element={<UpdateHospital />} />

        <Route
          path="/my-hospitals"
          element={
            <ProtectedRoute role="hospital">
              <MyHospitals />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
