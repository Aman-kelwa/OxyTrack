import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);
      if (user.role === "hospital") navigate("/dashboard");
      else navigate("/hospitals");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f0fdf9;
        }

        /* ── Left Panel ── */
        .auth-left {
          flex: 1;
          background: linear-gradient(145deg, #134e4a 0%, #0d9488 50%, #10b981 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 60px 56px;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 768px) { .auth-left { display: none; } }

        .auth-left-blob1 {
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          top: -80px; right: -80px;
        }
        .auth-left-blob2 {
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          bottom: 60px; left: -60px;
        }
        .auth-left-blob3 {
          position: absolute;
          width: 140px; height: 140px;
          border-radius: 50%;
          background: rgba(255,255,255,0.07);
          bottom: 200px; right: 60px;
        }

        .auth-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 52px;
        }
        .auth-brand-icon {
          width: 44px; height: 44px;
          background: rgba(255,255,255,0.15);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          backdrop-filter: blur(8px);
        }
        .auth-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem;
          font-weight: 800;
          color: #fff;
        }

        .auth-left-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 18px;
        }
        .auth-left-sub {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.72);
          line-height: 1.65;
          max-width: 360px;
          margin-bottom: 48px;
        }

        .auth-features { display: flex; flex-direction: column; gap: 16px; }
        .auth-feature {
          display: flex;
          align-items: center;
          gap: 14px;
          color: rgba(255,255,255,0.88);
          font-size: 0.9rem;
          font-weight: 500;
        }
        .auth-feature-dot {
          width: 32px; height: 32px; flex-shrink: 0;
          border-radius: 10px;
          background: rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
        }

        /* ── Right Panel ── */
        .auth-right {
          width: 480px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 48px 40px;
          background: #f0fdf9;
          background-image: radial-gradient(ellipse 60% 50% at 80% 10%, rgba(13,148,136,0.08) 0%, transparent 60%);
        }
        @media (max-width: 768px) { .auth-right { width: 100%; padding: 40px 24px; } }

        .auth-form-wrap { width: 100%; max-width: 380px; }

        .auth-form-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(13,148,136,0.1);
          color: #0d9488;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 99px;
          border: 1px solid rgba(13,148,136,0.2);
          margin-bottom: 16px;
        }
        .auth-form-title {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #134e4a;
          margin-bottom: 6px;
        }
        .auth-form-sub {
          font-size: 0.9rem;
          color: #5eada5;
          margin-bottom: 36px;
        }

        /* ── Field ── */
        .auth-field { margin-bottom: 18px; }
        .auth-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: #134e4a;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 7px;
        }
        .auth-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .auth-input-icon {
          position: absolute;
          left: 14px;
          font-size: 1rem;
          pointer-events: none;
          color: #aacfcc;
          transition: color 0.2s;
        }
        .auth-input-wrap.focused .auth-input-icon { color: #0d9488; }
        .auth-input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.93rem;
          color: #134e4a;
          background: #fff;
          border: 1.5px solid rgba(13,148,136,0.2);
          border-radius: 12px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(13,148,136,0.04);
        }
        .auth-input::placeholder { color: #aacfcc; }
        .auth-input:focus {
          border-color: #0d9488;
          box-shadow: 0 0 0 4px rgba(13,148,136,0.1);
        }
        .auth-input.has-right { padding-right: 44px; }
        .auth-eye-btn {
          position: absolute;
          right: 13px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.05rem;
          color: #7da8a2;
          padding: 4px;
          transition: color 0.15s;
          display: flex; align-items: center;
        }
        .auth-eye-btn:hover { color: #0d9488; }

        /* ── Error ── */
        .auth-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(244,63,94,0.08);
          border: 1px solid rgba(244,63,94,0.2);
          color: #e11d48;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 11px 14px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        /* ── Submit Button ── */
        .auth-submit {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #0d9488, #10b981);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(13,148,136,0.35);
          transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }
        .auth-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(13,148,136,0.42);
        }
        .auth-submit:active:not(:disabled) { transform: translateY(0); }
        .auth-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        /* Spinner */
        .spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Footer link ── */
        .auth-footer {
          text-align: center;
          margin-top: 28px;
          font-size: 0.88rem;
          color: #5eada5;
        }
        .auth-footer a {
          color: #0d9488;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.15s;
        }
        .auth-footer a:hover { color: #134e4a; text-decoration: underline; }

        /* ── Divider ── */
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
          color: #aacfcc;
          font-size: 0.78rem;
          font-weight: 600;
        }
        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(13,148,136,0.15);
        }
      `}</style>

      <div className="auth-root">
        {/* ── Left decorative panel ── */}
        <motion.div
          className="auth-left"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="auth-left-blob1" />
          <div className="auth-left-blob2" />
          <div className="auth-left-blob3" />

          <div className="auth-brand">
            <div className="auth-brand-icon">🏥</div>
            <span className="auth-brand-name">MediBook</span>
          </div>

          <h2 className="auth-left-title">
            Book Hospital
            <br />
            Beds Instantly
          </h2>
          <p className="auth-left-sub">
            Real-time bed availability across all hospitals. Find, compare, and
            book in seconds.
          </p>

          <div className="auth-features">
            {[
              { icon: "🛏️", text: "Live bed availability updates" },
              { icon: "⚡", text: "Instant booking confirmation" },
              { icon: "🔒", text: "Secure & private health data" },
              { icon: "📍", text: "Hospitals near your location" },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="auth-feature"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="auth-feature-dot">{f.icon}</div>
                {f.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Right form panel ── */}
        <div className="auth-right">
          <motion.div
            className="auth-form-wrap"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          >
            <div className="auth-form-eyebrow">👋 Welcome back</div>
            <h1 className="auth-form-title">Sign in</h1>
            <p className="auth-form-sub">
              Enter your credentials to access your account
            </p>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="auth-error"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.22 }}
                >
                  ⚠️ {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="auth-field">
                <label className="auth-label">Email Address</label>
                <div
                  className={`auth-input-wrap ${focusedField === "email" ? "focused" : ""}`}
                >
                  <span className="auth-input-icon">✉️</span>
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="auth-field">
                <label className="auth-label">Password</label>
                <div
                  className={`auth-input-wrap ${focusedField === "password" ? "focused" : ""}`}
                >
                  <span className="auth-input-icon">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="auth-input has-right"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="auth-submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? (
                  <>
                    <div className="spinner" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </motion.button>
            </form>

            <div className="auth-divider">or</div>

            <p className="auth-footer">
              Don't have an account? <Link to="/register">Create one free</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Login;
