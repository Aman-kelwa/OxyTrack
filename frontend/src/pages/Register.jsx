import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("citizen");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try a different email.");
      console.log(err.response?.data);
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
          position: absolute; width: 320px; height: 320px;
          border-radius: 50%; background: rgba(255,255,255,0.06);
          top: -80px; right: -80px;
        }
        .auth-left-blob2 {
          position: absolute; width: 200px; height: 200px;
          border-radius: 50%; background: rgba(255,255,255,0.05);
          bottom: 60px; left: -60px;
        }
        .auth-left-blob3 {
          position: absolute; width: 140px; height: 140px;
          border-radius: 50%; background: rgba(255,255,255,0.07);
          bottom: 200px; right: 60px;
        }

        .auth-brand {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 52px;
        }
        .auth-brand-icon {
          width: 44px; height: 44px;
          background: rgba(255,255,255,0.15);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; backdrop-filter: blur(8px);
        }
        .auth-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem; font-weight: 800; color: #fff;
        }

        .auth-left-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800; color: #fff; line-height: 1.15;
          margin-bottom: 18px;
        }
        .auth-left-sub {
          font-size: 0.95rem; color: rgba(255,255,255,0.72);
          line-height: 1.65; max-width: 360px; margin-bottom: 48px;
        }

        .auth-steps { display: flex; flex-direction: column; gap: 20px; }
        .auth-step {
          display: flex; align-items: flex-start; gap: 14px;
          color: rgba(255,255,255,0.88);
        }
        .auth-step-num {
          width: 30px; height: 30px; flex-shrink: 0;
          border-radius: 8px; background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 0.85rem; color: #fff;
        }
        .auth-step-text strong {
          display: block; font-size: 0.9rem; font-weight: 600;
          margin-bottom: 2px;
        }
        .auth-step-text span {
          font-size: 0.8rem; color: rgba(255,255,255,0.6);
        }

        /* ── Right Panel ── */
        .auth-right {
          width: 500px;
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          padding: 48px 40px;
          background: #f0fdf9;
          background-image: radial-gradient(ellipse 60% 50% at 80% 10%, rgba(13,148,136,0.08) 0%, transparent 60%);
          overflow-y: auto;
        }
        @media (max-width: 768px) { .auth-right { width: 100%; padding: 40px 24px; } }

        .auth-form-wrap { width: 100%; max-width: 400px; }

        .auth-form-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(13,148,136,0.1); color: #0d9488;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 99px;
          border: 1px solid rgba(13,148,136,0.2);
          margin-bottom: 16px;
        }
        .auth-form-title {
          font-family: 'Syne', sans-serif;
          font-size: 2rem; font-weight: 800; color: #134e4a; margin-bottom: 6px;
        }
        .auth-form-sub {
          font-size: 0.9rem; color: #5eada5; margin-bottom: 32px;
        }

        /* ── Field ── */
        .auth-field { margin-bottom: 16px; }
        .auth-label {
          display: block; font-size: 0.8rem; font-weight: 600;
          color: #134e4a; text-transform: uppercase;
          letter-spacing: 0.06em; margin-bottom: 7px;
        }
        .auth-input-wrap {
          position: relative; display: flex; align-items: center;
        }
        .auth-input-icon {
          position: absolute; left: 14px; font-size: 1rem;
          pointer-events: none; color: #aacfcc; transition: color 0.2s;
        }
        .auth-input-wrap.focused .auth-input-icon { color: #0d9488; }
        .auth-input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.93rem; color: #134e4a;
          background: #fff;
          border: 1.5px solid rgba(13,148,136,0.2);
          border-radius: 12px; outline: none;
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
          position: absolute; right: 13px;
          background: none; border: none; cursor: pointer;
          font-size: 1.05rem; color: #7da8a2; padding: 4px;
          transition: color 0.15s; display: flex; align-items: center;
        }
        .auth-eye-btn:hover { color: #0d9488; }

        /* ── Role Selector ── */
        .role-selector { display: flex; gap: 12px; }
        .role-option {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; gap: 8px;
          padding: 14px 10px;
          border-radius: 14px;
          border: 2px solid rgba(13,148,136,0.18);
          background: #fff;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .role-option:hover { border-color: #0d9488; }
        .role-option.selected {
          border-color: #0d9488;
          background: rgba(13,148,136,0.06);
          box-shadow: 0 0 0 4px rgba(13,148,136,0.1);
        }
        .role-icon { font-size: 1.6rem; }
        .role-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 600;
          color: #134e4a;
        }
        .role-desc { font-size: 0.72rem; color: #7da8a2; text-align: center; }
        .role-check {
          width: 18px; height: 18px;
          border-radius: 50%;
          border: 2px solid rgba(13,148,136,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem;
          margin-top: 4px;
          transition: all 0.18s;
        }
        .role-option.selected .role-check {
          background: #0d9488; border-color: #0d9488; color: #fff;
        }

        /* ── Error ── */
        .auth-error {
          display: flex; align-items: center; gap: 8px;
          background: rgba(244,63,94,0.08);
          border: 1px solid rgba(244,63,94,0.2);
          color: #e11d48; font-size: 0.85rem; font-weight: 500;
          padding: 11px 14px; border-radius: 10px; margin-bottom: 20px;
        }

        /* ── Submit ── */
        .auth-submit {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #0d9488, #10b981);
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem; font-weight: 700;
          border: none; border-radius: 12px; cursor: pointer;
          box-shadow: 0 4px 18px rgba(13,148,136,0.35);
          transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s;
          display: flex; align-items: center; justify-content: center;
          gap: 8px; margin-top: 8px;
        }
        .auth-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(13,148,136,0.42);
        }
        .auth-submit:active:not(:disabled) { transform: translateY(0); }
        .auth-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite; flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .auth-footer {
          text-align: center; margin-top: 24px;
          font-size: 0.88rem; color: #5eada5;
        }
        .auth-footer a {
          color: #0d9488; font-weight: 600;
          text-decoration: none; transition: color 0.15s;
        }
        .auth-footer a:hover { color: #134e4a; text-decoration: underline; }

        .auth-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 22px 0; color: #aacfcc;
          font-size: 0.78rem; font-weight: 600;
        }
        .auth-divider::before, .auth-divider::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(13,148,136,0.15);
        }

        .password-strength { margin-top: 8px; }
        .ps-bar-wrap {
          display: flex; gap: 4px; margin-bottom: 5px;
        }
        .ps-bar {
          flex: 1; height: 3px; border-radius: 99px;
          background: rgba(13,148,136,0.12);
          transition: background 0.3s;
        }
        .ps-label { font-size: 0.72rem; color: #7da8a2; }
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
            Join Thousands
            <br />
            of Users Today
          </h2>
          <p className="auth-left-sub">
            Create your account in seconds and get instant access to real-time
            hospital bed booking.
          </p>

          <div className="auth-steps">
            {[
              {
                n: "1",
                title: "Create your account",
                desc: "Fill in your details below",
              },
              {
                n: "2",
                title: "Choose your role",
                desc: "Citizen or hospital staff",
              },
              {
                n: "3",
                title: "Start booking",
                desc: "Find & book beds instantly",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="auth-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
              >
                <div className="auth-step-num">{s.n}</div>
                <div className="auth-step-text">
                  <strong>{s.title}</strong>
                  <span>{s.desc}</span>
                </div>
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
            <div className="auth-form-eyebrow">🚀 Get started free</div>
            <h1 className="auth-form-title">Create account</h1>
            <p className="auth-form-sub">
              Join MediBook and access hospitals near you
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

            <form onSubmit={handleRegister}>
              {/* Name */}
              <div className="auth-field">
                <label className="auth-label">Full Name</label>
                <div
                  className={`auth-input-wrap ${focusedField === "name" ? "focused" : ""}`}
                >
                  <span className="auth-input-icon">👤</span>
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Aman"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

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
                    placeholder="Min. 8 characters"
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
                {/* Password strength bars */}
                {password.length > 0 && (
                  <motion.div
                    className="password-strength"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="ps-bar-wrap">
                      {[1, 2, 3, 4].map((lvl) => {
                        const strength = Math.min(
                          4,
                          Math.floor(password.length / 3),
                        );
                        const colors = [
                          "#f43f5e",
                          "#f59e0b",
                          "#10b981",
                          "#0d9488",
                        ];
                        return (
                          <div
                            key={lvl}
                            className="ps-bar"
                            style={{
                              background:
                                lvl <= strength
                                  ? colors[strength - 1]
                                  : undefined,
                            }}
                          />
                        );
                      })}
                    </div>
                    <span className="ps-label">
                      {password.length < 3
                        ? "Too short"
                        : password.length < 6
                          ? "Weak"
                          : password.length < 9
                            ? "Good"
                            : "Strong"}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Role */}
              <div className="auth-field">
                <label className="auth-label">I am a…</label>
                <div className="role-selector">
                  {[
                    {
                      val: "citizen",
                      icon: "👤",
                      label: "Citizen",
                      desc: "Book beds for myself or family",
                    },
                    {
                      val: "hospital",
                      icon: "🏥",
                      label: "Hospital",
                      desc: "Manage beds & bookings",
                    },
                  ].map((r) => (
                    <motion.div
                      key={r.val}
                      className={`role-option ${role === r.val ? "selected" : ""}`}
                      onClick={() => setRole(r.val)}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span className="role-icon">{r.icon}</span>
                      <span className="role-label">{r.label}</span>
                      <span className="role-desc">{r.desc}</span>
                      <div className="role-check">
                        {role === r.val ? "✓" : ""}
                      </div>
                    </motion.div>
                  ))}
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
                    Creating account…
                  </>
                ) : (
                  <>
                    Create Account
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
              Already have an account? <Link to="/login">Sign in instead</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Register;
