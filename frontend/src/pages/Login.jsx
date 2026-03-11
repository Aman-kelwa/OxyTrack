import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-lg p-10 rounded-xl w-96"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

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
          className="w-full p-3 mb-6 rounded bg-gray-800 text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button className="w-full bg-cyan-500 p-3 rounded font-semibold hover:bg-cyan-400 transition">
          Login
        </button>

        {/* Register Link */}
        <p className="text-gray-300 text-center mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
