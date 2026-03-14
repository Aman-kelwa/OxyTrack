import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      navigate("/login");
    } catch (error) {
      setError("Registration fail , try another email");
      console.log(error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleRegister}
        className="bg-white/10 backdrop-blur-lg p-10 rounded-xl w-96"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Register
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          required
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role Selection */}
        <select
          className="w-full p-3 mb-6 rounded bg-gray-800 text-white"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="citizen">Citizen</option>
          <option value="hospital">Hospital</option>
        </select>

        {/* Register Button */}
        <button className="w-full bg-cyan-500 p-3 rounded font-semibold hover:bg-cyan-400 transition">
          Register
        </button>

        {/* Login Link */}
        <p className="text-gray-300 text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
