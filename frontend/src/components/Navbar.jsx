import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks =
    role === "citizen"
      ? [
          { to: "/", label: "Home" },
          { to: "/hospitals", label: "Hospitals" },
          { to: "/my-bookings", label: "My Bookings" },
        ]
      : role === "hospital"
        ? [
            { to: "/", label: "Home" },
            { to: "/dashboard", label: "Dashboard" },
            { to: "/my-hospitals", label: "Your Hospitals" },
          ]
        : [{ to: "/", label: "Home" }];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nav-root {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 999;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
        }

        .nav-root.scrolled .nav-inner {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 2px 24px rgba(13,148,136,0.1);
          border-bottom: 1px solid rgba(13,148,136,0.12);
          padding: 8px 32px;
        }

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px;
          transition: all 0.3s ease;
        }

        /* ── Logo ── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
        }
        .nav-logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #0d9488, #10b981);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          box-shadow: 0 4px 12px rgba(13,148,136,0.3);
          flex-shrink: 0;
          transition: box-shadow 0.2s;
        }
        .nav-logo-icon:hover {
          box-shadow: 0 6px 18px rgba(13,148,136,0.4);
        }
        .nav-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #134e4a;
          letter-spacing: -0.01em;
        }
        .nav-logo-text span { color: #0d9488; }

        /* ── Desktop Links ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link {
          position: relative;
          text-decoration: none;
          color: #000;
          font-size: .9rem;
          font-weight: 500;
          padding: 7px 14px;
          border-radius: 10px;
          transition: color 0.18s, background 0.18s;
        }
        .nav-link:hover {
          color: #0d9488;
          background: rgba(13,148,136,0.07);
        }
        .nav-link.active {
          color: #0d9488;
          background: rgba(13,148,136,0.1);
          font-weight: 600;
        }

        /* ── Right Buttons ── */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-btn-outline {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #0d9488;
          background: transparent;
          border: 1.5px solid rgba(13,148,136,0.35);
          border-radius: 11px;
          padding: 8px 18px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.18s ease;
          display: inline-flex;
          align-items: center;
        }
        .nav-btn-outline:hover {
          border-color: #0d9488;
          background: rgba(13,148,136,0.07);
        }
        .nav-btn-solid {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #0d9488, #10b981);
          border: none;
          border-radius: 11px;
          padding: 8px 18px;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(13,148,136,0.28);
          transition: all 0.18s ease;
          display: inline-flex;
          align-items: center;
        }
        .nav-btn-solid:hover {
          box-shadow: 0 6px 20px rgba(13,148,136,0.38);
          transform: translateY(-1px);
        }
        .nav-btn-logout {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #0d9488;
          background: rgba(13,148,136,0.08);
          border: 1.5px solid rgba(13,148,136,0.15);
          border-radius: 11px;
          padding: 8px 18px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.18s ease;
        }
        .nav-btn-logout:hover {
          background: rgba(239,68,68,0.08);
          border-color: rgba(239,68,68,0.25);
          color: #ef4444;
        }

        /* ── Hamburger ── */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          background: rgba(13,148,136,0.08);
          border: 1px solid rgba(13,148,136,0.15);
          border-radius: 10px;
          cursor: pointer;
          padding: 0;
        }
        .nav-hamburger span {
          display: block;
          width: 18px;
          height: 2px;
          background: #0d9488;
          border-radius: 2px;
          transition: all 0.25s ease;
        }
        .nav-hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .nav-hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .nav-hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* ── Mobile Menu ── */
 .nav-mobile {
  position: fixed;
  inset: 0;
  background: rgba(240,253,249,0.98);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  z-index: 998;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;   /* 🔥 FIX */
  
  padding: 100px 24px 40px;
}
        .nav-mobile-link {
  font-family: 'Syne', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #134e4a;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 260px;          /* 🔥 FIXED WIDTH */
  padding: 14px;

  border-radius: 12px;
  background: transparent;

  transition: all 0.2s ease;
}
        .nav-mobile-link:hover { color: #0d9488; }
       .nav-mobile-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
  align-items: center;   /* 🔥 center everything */
}

.nav-mobile-actions a,
.nav-mobile-actions button {
  width: 260px;         /* 🔥 SAME WIDTH AS HOME */
  justify-content: center;
}
      .nav-mobile-close {
  position: fixed;
  top: 16px;
  right: 16px;

  width: 40px;
  height: 40px;

  background: transparent;   /* 🔥 remove white */
  border: none;              /* 🔥 remove border */

  color: #0d9488;
  font-size: 1.6rem;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 9999;
}

        @media (max-width: 768px) {
          .nav-links, .nav-actions { display: none; }
          .nav-hamburger { display: flex; }
          .nav-inner { padding: 12px 20px; }
        }
      `}</style>

      <motion.nav
        className={`nav-root ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <motion.div
              className="nav-logo-icon"
              whileHover={{ scale: 1.08, rotate: -4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              🏥
            </motion.div>
            <span className="nav-logo-text">
              Oxy<span>Track</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <Link to={link.to} className="nav-link">
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Actions */}
          <motion.div
            className="nav-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            {!token && (
              <>
                <Link to="/login" className="nav-btn-outline">
                  Login
                </Link>
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link to="/register" className="nav-btn-solid">
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
            {token && (
              <motion.button
                className="nav-btn-logout"
                onClick={handleLogout}
                whileTap={{ scale: 0.96 }}
              >
                <span>↩</span> Logout
              </motion.button>
            )}
          </motion.div>

          {/* Hamburger */}
          <button
            className={`nav-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <button
              className="nav-mobile-close"
              onClick={() => setMenuOpen(false)}
            ></button>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                style={{ display: "flex", justifyContent: "center" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={link.to}
                  className="nav-mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <div className="nav-mobile-actions">
              {!token && (
                <>
                  <Link
                    to="/login"
                    className="nav-btn-outline"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="nav-btn-solid"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {token && (
                <button
                  className="nav-btn-logout"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  ↩ Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
