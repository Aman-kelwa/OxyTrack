import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hospitals from "./pages/Hospitals";
import Dashboard from "./pages/Dashboard";
import AddHospital from "./pages/AddHospital";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/hospitals" element={<Hospitals />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-hospital" element={<AddHospital />} />
      </Routes>
    </Router>
  );
}

export default App;
