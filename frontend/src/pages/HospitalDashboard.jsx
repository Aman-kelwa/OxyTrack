/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "../components/BookingCard";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";

const socket = io("https://oxytrack.onrender.com");

/* ─────────────────────────── Skeleton Components ─────────────────────────── */

function StatCardSkeleton() {
  return (
    <div className="dashboard-card skeleton-card">
      <div className="skeleton skeleton-text-sm" />
      <div
        className="skeleton skeleton-text-lg"
        style={{ marginTop: "10px" }}
      />
      <div className="skeleton skeleton-bar" style={{ marginTop: "16px" }} />
    </div>
  );
}

function BookingCardSkeleton() {
  return (
    <div
      className="dashboard-card skeleton-card"
      style={{ minHeight: "160px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div className="skeleton skeleton-text-md" style={{ width: "55%" }} />
        <div className="skeleton skeleton-badge" />
      </div>
      <div
        className="skeleton skeleton-text-sm"
        style={{ width: "70%", marginBottom: "8px" }}
      />
      <div
        className="skeleton skeleton-text-sm"
        style={{ width: "45%", marginBottom: "20px" }}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <div className="skeleton skeleton-btn" />
        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  );
}

/* ─────────────────────────── Live Ping Dot ─────────────────────────── */
function LivePing() {
  return (
    <span className="live-ping-wrapper">
      <span className="live-ping-ring" />
      <span className="live-ping-dot" />
    </span>
  );
}

/* ─────────────────────────── Toast Notification ─────────────────────────── */
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      className="toast"
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <span className="toast-icon">🔔</span>
      <span>{message}</span>
    </motion.div>
  );
}

/* ─────────────────────────── Main Dashboard ─────────────────────────── */
function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const hospitalName = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  /* Socket.IO */
  useEffect(() => {
    socket.on("new-booking", (data) => {
      setBookings((prev) => [...prev, data]);
      setToasts((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: `New booking from ${data.patientName || "a patient"}!`,
        },
      ]);
    });
    return () => socket.off("new-booking");
  }, []);

  /* Fetch */
  const fetchBookings = async () => {
    try {
      const res = await axios.get("https://oxytrack.onrender.com/api/booking", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } finally {
      setLoadingBookings(false);
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* Stats */
  const totalBookings = bookings.length;
  const approved = bookings.filter((b) => b.status === "APPROVED").length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const rejected = bookings.filter((b) => b.status === "REJECTED").length;

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      color: "#0d9488",
      bg: "rgba(13,148,136,0.08)",
      icon: "📋",
    },
    {
      title: "Approved",
      value: approved,
      color: "#10b981",
      bg: "rgba(16,185,129,0.08)",
      icon: "✅",
    },
    {
      title: "Pending",
      value: pending,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.08)",
      icon: "⏳",
    },
    {
      title: "Rejected",
      value: rejected,
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.08)",
      icon: "❌",
    },
  ];

  /* Filter */
  const filtered =
    filterStatus === "ALL"
      ? bookings
      : bookings.filter((b) => b.status === filterStatus);

  const removeToast = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  /* ── JSX ── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .dash-root {
          min-height: 100vh;
          background: #f0fdf9;
          background-image:
            radial-gradient(ellipse 80% 50% at 10% -10%, rgba(13,148,136,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 90% 100%, rgba(16,185,129,0.08) 0%, transparent 60%);
          font-family: 'DM Sans', sans-serif;
          padding: 100px 24px 60px;
        }

        .dash-inner { max-width: 1280px; margin: 0 auto; }

        /* ── Header ── */
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 40px;
        }
        .dash-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 800;
          color: #134e4a;
          line-height: 1.1;
        }
        .dash-title span { color: #0d9488; }
        .dash-subtitle {
          font-size: 0.95rem;
          color: #5eada5;
          margin-top: 6px;
          font-weight: 400;
        }

        /* ── Add Hospital Button ── */
        .btn-add {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #0d9488, #10b981);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 11px 22px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(13,148,136,0.35);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          white-space: nowrap;
        }
        .btn-add:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(13,148,136,0.45);
        }
        .btn-add:active { transform: translateY(0); }

        /* ── Live indicator ── */
        .live-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
        }
        .live-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #0d9488;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .live-ping-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 14px; height: 14px;
        }
        .live-ping-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #10b981;
          position: relative;
          z-index: 1;
        }
        .live-ping-ring {
          position: absolute;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: rgba(16,185,129,0.4);
          animation: ping 1.4s ease-in-out infinite;
        }
        @keyframes ping {
          0%   { transform: scale(0.8); opacity: 0.8; }
          80%  { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        /* ── Stats Grid ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 44px;
        }
        @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .stats-grid { grid-template-columns: 1fr; } }

        .stat-card {
          background: #fff;
          border-radius: 18px;
          padding: 22px 20px;
          border: 1px solid rgba(13,148,136,0.1);
          box-shadow: 0 2px 12px rgba(13,148,136,0.06);
          cursor: default;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .stat-card:hover { box-shadow: 0 8px 30px rgba(13,148,136,0.14); }
        .stat-icon {
          font-size: 1.5rem;
          margin-bottom: 10px;
          display: block;
        }
        .stat-title {
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #7da8a2;
          margin-bottom: 6px;
        }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: #134e4a;
          line-height: 1;
        }
        .stat-bar {
          height: 3px;
          border-radius: 99px;
          margin-top: 14px;
        }
        .stat-glow {
          position: absolute;
          top: -20px; right: -20px;
          width: 80px; height: 80px;
          border-radius: 50%;
          filter: blur(28px);
          opacity: 0.25;
        }

        /* ── Section Header ── */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #134e4a;
        }

        /* ── Filter Tabs ── */
        .filter-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-tab {
          padding: 6px 16px;
          border-radius: 99px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: all 0.18s ease;
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          color: #5eada5;
          border-color: rgba(13,148,136,0.18);
        }
        .filter-tab:hover { border-color: #0d9488; color: #0d9488; }
        .filter-tab.active {
          background: linear-gradient(135deg, #0d9488, #10b981);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 3px 12px rgba(13,148,136,0.3);
        }

        /* ── Bookings Grid ── */
        .bookings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        @media (max-width: 1024px) { .bookings-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  { .bookings-grid { grid-template-columns: 1fr; } }

        /* ── Empty State ── */
        .empty-state {
          text-align: center;
          padding: 70px 20px;
          color: #7da8a2;
          grid-column: 1 / -1;
        }
        .empty-icon { font-size: 3rem; margin-bottom: 14px; }
        .empty-title { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700; color: #134e4a; margin-bottom: 6px; }
        .empty-sub { font-size: 0.9rem; }

        /* ── Dashboard Card (shared) ── */
        .dashboard-card {
          background: #fff;
          border-radius: 18px;
          padding: 22px;
          border: 1px solid rgba(13,148,136,0.1);
          box-shadow: 0 2px 12px rgba(13,148,136,0.06);
        }

        /* ── Skeleton ── */
        .skeleton-card { pointer-events: none; }
        .skeleton {
          background: linear-gradient(90deg, #e6f7f5 25%, #ccefec 50%, #e6f7f5 75%);
          background-size: 200% 100%;
          animation: shimmer 1.6s infinite;
          border-radius: 8px;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .skeleton-text-sm  { height: 12px; width: 60%; }
        .skeleton-text-md  { height: 16px; width: 80%; }
        .skeleton-text-lg  { height: 28px; width: 40%; }
        .skeleton-bar      { height: 3px; width: 100%; }
        .skeleton-badge    { height: 22px; width: 70px; border-radius: 99px; }
        .skeleton-btn      { height: 32px; width: 80px; border-radius: 8px; }

        /* ── Toast ── */
        .toast-stack {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .toast {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #134e4a;
          color: #fff;
          padding: 13px 20px;
          border-radius: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          box-shadow: 0 8px 32px rgba(13,148,136,0.35);
          max-width: 320px;
          border-left: 4px solid #10b981;
        }
        .toast-icon { font-size: 1.1rem; }

        /* ── Count badge ── */
        .count-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(13,148,136,0.12);
          color: #0d9488;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 2px 9px;
          border-radius: 99px;
          margin-left: 8px;
        }
      `}</style>

      <div className="dash-root">
        <div className="dash-inner">
          {/* ── Header ── */}
          <motion.div
            className="dash-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div>
              <h1 className="dash-title">
                <span>{hospitalName || "Hospital"}</span> Dashboard
              </h1>
              <p className="dash-subtitle">
                Manage bookings and hospital operations in real-time
              </p>
            </div>

            <Link to="/add-hospital" className="btn-add">
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
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Hospital
            </Link>
          </motion.div>

          {/* ── Live indicator ── */}
          <motion.div
            className="live-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <LivePing />
            <span className="live-label">Live updates active</span>
          </motion.div>

          {/* ── Stats ── */}
          <div className="stats-grid">
            {loadingStats
              ? Array(4)
                  .fill(0)
                  .map((_, i) => <StatCardSkeleton key={i} />)
              : stats.map((item, i) => (
                  <motion.div
                    key={i}
                    className="stat-card"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      duration: 0.45,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -5, transition: { duration: 0.18 } }}
                  >
                    <div
                      className="stat-glow"
                      style={{ background: item.color }}
                    />
                    <span className="stat-icon">{item.icon}</span>
                    <p className="stat-title">{item.title}</p>
                    <motion.h2
                      className="stat-value"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.3 + i * 0.08,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {item.value}
                    </motion.h2>
                    <div
                      className="stat-bar"
                      style={{ background: item.color }}
                    />
                  </motion.div>
                ))}
          </div>

          {/* ── Bookings Section ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="section-header">
              <h2 className="section-title">
                Booking Requests
                {!loadingBookings && (
                  <span className="count-badge">{filtered.length}</span>
                )}
              </h2>

              {/* Filter tabs */}
              {!loadingBookings && (
                <div className="filter-tabs">
                  {["ALL", "APPROVED", "PENDING", "REJECTED"].map((s) => (
                    <button
                      key={s}
                      className={`filter-tab ${filterStatus === s ? "active" : ""}`}
                      onClick={() => setFilterStatus(s)}
                    >
                      {s.charAt(0) + s.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bookings-grid">
              {loadingBookings ? (
                Array(6)
                  .fill(0)
                  .map((_, i) => <BookingCardSkeleton key={i} />)
              ) : filtered.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🗂️</div>
                  <p className="empty-title">No bookings found</p>
                  <p className="empty-sub">
                    {filterStatus === "ALL"
                      ? "No booking requests have been submitted yet."
                      : `No ${filterStatus.toLowerCase()} bookings at the moment.`}
                  </p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filtered.map((booking, index) => (
                    <motion.div
                      key={booking._id}
                      layout
                      initial={{ opacity: 0, y: 28, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.92,
                        transition: { duration: 0.15 },
                      }}
                      transition={{
                        delay: index * 0.04,
                        duration: 0.38,
                        ease: "easeOut",
                      }}
                      whileHover={{ y: -4, transition: { duration: 0.15 } }}
                    >
                      <BookingCard
                        booking={booking}
                        refreshBookings={fetchBookings}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Toast Stack ── */}
      <div className="toast-stack">
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast
              key={t.id}
              message={t.message}
              onClose={() => removeToast(t.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Dashboard;
