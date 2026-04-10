import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

const socket = io("https://oxytrack.onrender.com");

/* ─── Skeleton Card ─── */
function BookingSkeleton() {
  return (
    <div className="mbk-skeleton">
      <div className="sk sk-accent" />
      <div style={{ padding: "20px 22px" }}>
        <div className="sk sk-title" />
        <div className="sk sk-sub" style={{ marginTop: 8 }} />
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <div className="sk sk-row" />
          <div className="sk sk-badge" />
        </div>
        <div className="sk sk-row" style={{ marginTop: 10, width: "60%" }} />
      </div>
    </div>
  );
}

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://oxytrack.onrender.com/api/booking", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();

    socket.on("bookingUpdated", (updatedBooking) => {
      setBookings((prev) =>
        prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b)),
      );
    });

    return () => {
      socket.off("bookingUpdated");
    };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `https://oxytrack.onrender.com/api/booking/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log("Delete success:", res.data);

      fetchBookings();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  const statusConfig = {
    PENDING: {
      label: "Pending",
      color: "#d97706",
      bg: "rgba(245,158,11,0.1)",
      border: "rgba(245,158,11,0.22)",
      dot: "#f59e0b",
      accent: "linear-gradient(90deg,#f59e0b,#fbbf24,#fde68a)",
    },
    APPROVED: {
      label: "Approved",
      color: "#059669",
      bg: "rgba(16,185,129,0.1)",
      border: "rgba(16,185,129,0.22)",
      dot: "#10b981",
      accent: "linear-gradient(90deg,#0d9488,#10b981,#34d399)",
    },
    REJECTED: {
      label: "Rejected",
      color: "#dc2626",
      bg: "rgba(239,68,68,0.1)",
      border: "rgba(239,68,68,0.22)",
      dot: "#ef4444",
      accent: "linear-gradient(90deg,#ef4444,#f87171,#fca5a5)",
    },
  };

  const bedTypeIcons = {
    General: "🛏️",
    ICU: "🧪",
    OXYGEN: "💨",
    Oxygen: "💨",
    Emergency: "🚨",
  };

  const counts = {
    total: bookings.length,
    approved: bookings.filter((b) => b.status === "APPROVED").length,
    pending: bookings.filter((b) => b.status === "PENDING").length,
    rejected: bookings.filter((b) => b.status === "REJECTED").length,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .mbk-root {
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          background: #f0fdf9;
          background-image:
            radial-gradient(ellipse 70% 40% at 15% -5%, rgba(13,148,136,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 35% at 85% 95%, rgba(16,185,129,0.08) 0%, transparent 60%);
          padding: 100px 24px 72px;
        }
        .mbk-inner { max-width: 1280px; margin: 0 auto; }

        /* ── Hero ── */
        .mbk-hero {
          text-align: center;
          margin-bottom: 40px;
        }
        .mbk-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(13,148,136,0.1);
          color: #0d9488;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 99px;
          margin-bottom: 18px;
          border: 1px solid rgba(13,148,136,0.2);
        }
        .mbk-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.9rem, 4.5vw, 2.8rem);
          font-weight: 800;
          color: #134e4a;
          line-height: 1.12;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }
        .mbk-title span { color: #0d9488; }
        .mbk-subtitle {
          font-size: 1rem;
          color: #5eada5;
          max-width: 420px;
          margin: 0 auto 32px;
          line-height: 1.6;
        }

        /* ── Stat Pills ── */
        .mbk-stat-pills {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 44px;
        }
        .mbk-stat-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border: 1px solid rgba(13,148,136,0.14);
          border-radius: 14px;
          padding: 11px 18px;
          box-shadow: 0 2px 10px rgba(13,148,136,0.05);
        }
        .mbk-pill-icon { font-size: 1.2rem; }
        .mbk-pill-val {
          display: block;
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 800;
          color: #134e4a;
          line-height: 1;
        }
        .mbk-pill-label {
          display: block;
          font-size: 0.68rem;
          font-weight: 600;
          color: #7da8a2;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-top: 2px;
        }

        /* ── Results row ── */
        .mbk-results-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .mbk-results-label {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #134e4a;
        }
        .mbk-results-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(13,148,136,0.1);
          color: #0d9488;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 2px 10px;
          border-radius: 99px;
          margin-left: 8px;
        }
        .mbk-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          color: #0d9488;
          background: rgba(13,148,136,0.07);
          border: 1px solid rgba(13,148,136,0.15);
          border-radius: 99px;
          padding: 4px 12px;
        }
        .mbk-live-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #10b981;
          animation: mbk-pulse 2s ease-in-out infinite;
        }
        @keyframes mbk-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.7); }
        }

        /* ── Grid ── */
        .mbk-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        @media (max-width: 1024px) { .mbk-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 600px)  { .mbk-grid { grid-template-columns: 1fr; } }

        /* ── Booking Card ── */
        .mbk-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid rgba(13,148,136,0.12);
          box-shadow: 0 2px 16px rgba(13,148,136,0.06);
          overflow: hidden;
          transition: box-shadow 0.25s ease, border-color 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .mbk-card:hover {
          box-shadow: 0 8px 32px rgba(13,148,136,0.13);
          border-color: rgba(13,148,136,0.2);
        }
        .mbk-card-accent { height: 4px; width: 100%; }
        .mbk-card-body { padding: 20px 22px 20px; flex: 1; display: flex; flex-direction: column; }

        /* Card header */
        .mbk-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 14px;
        }
        .mbk-hosp-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.02rem;
          font-weight: 700;
          color: #134e4a;
          line-height: 1.25;
        }
        .mbk-hosp-city {
          font-size: 0.78rem;
          color: #7da8a2;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .mbk-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 5px 11px;
          border-radius: 99px;
          border: 1px solid;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .mbk-status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Divider */
        .mbk-divider {
          height: 1px;
          background: rgba(13,148,136,0.08);
          margin: 0 0 15px;
        }

        /* Info rows */
        .mbk-info { display: flex; flex-direction: column; gap: 9px; margin-bottom: 18px; }
        .mbk-info-row { display: flex; align-items: center; gap: 10px; }
        .mbk-info-icon {
          width: 30px; height: 30px;
          border-radius: 9px;
          background: rgba(13,148,136,0.07);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.88rem;
          flex-shrink: 0;
        }
        .mbk-info-label {
          font-size: 0.67rem;
          font-weight: 700;
          color: #7da8a2;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }
        .mbk-info-val {
          font-size: 0.88rem;
          font-weight: 600;
          color: #134e4a;
          margin-top: 1px;
        }

        /* Delete button */
        .mbk-btn-delete {
          margin-top: auto;
          width: 100%;
          padding: 10px 0;
          border-radius: 12px;
          border: 1.5px solid rgba(239,68,68,0.18);
          background: rgba(239,68,68,0.05);
          color: #ef4444;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.18s ease;
        }
        .mbk-btn-delete:hover {
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.35);
        }

        /* ── Empty State ── */
        .mbk-empty {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          text-align: center;
        }
        .mbk-empty-icon {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: rgba(13,148,136,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 2.2rem;
          margin-bottom: 20px;
        }
        .mbk-empty-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #134e4a;
          margin-bottom: 8px;
        }
        .mbk-empty-sub { font-size: 0.9rem; color: #7da8a2; }

        /* ── Skeletons ── */
        .mbk-skeleton {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(13,148,136,0.1);
          box-shadow: 0 2px 12px rgba(13,148,136,0.05);
        }
        .sk {
          background: linear-gradient(90deg, #e6f7f5 25%, #ccefec 50%, #e6f7f5 75%);
          background-size: 200% 100%;
          animation: shimmer 1.6s infinite;
          border-radius: 8px;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .sk-accent { height: 4px; border-radius: 0; width: 100%; }
        .sk-title  { height: 16px; width: 65%; }
        .sk-sub    { height: 12px; width: 45%; }
        .sk-row    { height: 12px; flex: 1; }
        .sk-badge  { height: 24px; width: 80px; border-radius: 99px; }
      `}</style>

      <div className="mbk-root">
        <div className="mbk-inner">
          {/* ── Hero ── */}
          <motion.div
            className="mbk-hero"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="mbk-eyebrow">
              <span>📋</span> Your Booking History
            </div>
            <h1 className="mbk-title">
              My <span>Bookings</span>
            </h1>
            <p className="mbk-subtitle">
              Track your bed requests in real-time. Status updates happen
              automatically.
            </p>
          </motion.div>

          {/* ── Stat Pills ── */}
          {!loading && bookings.length > 0 && (
            <motion.div
              className="mbk-stat-pills"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
            >
              {[
                { icon: "📋", label: "Total", value: counts.total },
                { icon: "✅", label: "Approved", value: counts.approved },
                { icon: "⏳", label: "Pending", value: counts.pending },
                { icon: "❌", label: "Rejected", value: counts.rejected },
              ].map((p) => (
                <div className="mbk-stat-pill" key={p.label}>
                  <span className="mbk-pill-icon">{p.icon}</span>
                  <div>
                    <span className="mbk-pill-val">{p.value}</span>
                    <span className="mbk-pill-label">{p.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ── Results Header ── */}
          {!loading && (
            <motion.div
              className="mbk-results-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="mbk-results-label">
                Bookings
                <span className="mbk-results-count">{bookings.length}</span>
              </span>
              <span className="mbk-live-badge">
                <span className="mbk-live-dot" />
                Live updates on
              </span>
            </motion.div>
          )}

          {/* ── Grid ── */}
          <div className="mbk-grid">
            {loading ? (
              Array(6)
                .fill(0)
                .map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <BookingSkeleton />
                  </motion.div>
                ))
            ) : bookings.length === 0 ? (
              <motion.div
                className="mbk-empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="mbk-empty-icon">📋</div>
                <p className="mbk-empty-title">No bookings yet</p>
                <p className="mbk-empty-sub">
                  Your bed booking requests will appear here once submitted.
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {bookings.map((booking, index) => {
                  const s =
                    statusConfig[booking.status] ?? statusConfig.PENDING;
                  return (
                    <motion.div
                      key={booking._id}
                      className="mbk-card"
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
                      whileHover={{ y: -5, transition: { duration: 0.15 } }}
                    >
                      {/* Status-colored accent bar */}
                      <div
                        className="mbk-card-accent"
                        style={{ background: s.accent }}
                      />

                      <div className="mbk-card-body">
                        {/* Header */}
                        <div className="mbk-card-header">
                          <div>
                            <p className="mbk-hosp-name">
                              {booking.hospital?.name || "Hospital unavailable"}
                            </p>
                            {booking.hospital?.city && (
                              <p className="mbk-hosp-city">
                                📍 {booking.hospital.city}
                              </p>
                            )}
                          </div>
                          <span
                            className="mbk-status-badge"
                            style={{
                              color: s.color,
                              background: s.bg,
                              borderColor: s.border,
                            }}
                          >
                            <span
                              className="mbk-status-dot"
                              style={{ background: s.dot }}
                            />
                            {s.label}
                          </span>
                        </div>

                        <div className="mbk-divider" />

                        {/* Info rows */}
                        <div className="mbk-info">
                          <div className="mbk-info-row">
                            <div className="mbk-info-icon">👤</div>
                            <div>
                              <p className="mbk-info-label">Patient</p>
                              <p className="mbk-info-val">
                                {booking.patientName}
                              </p>
                            </div>
                          </div>
                          <div className="mbk-info-row">
                            <div className="mbk-info-icon">
                              {bedTypeIcons[booking.bedType] ?? "🛏️"}
                            </div>
                            <div>
                              <p className="mbk-info-label">Bed Type</p>
                              <p className="mbk-info-val">{booking.bedType}</p>
                            </div>
                          </div>
                          {booking.condition && (
                            <div className="mbk-info-row">
                              <div className="mbk-info-icon">🩺</div>
                              <div>
                                <p className="mbk-info-label">Condition</p>
                                <p className="mbk-info-val">
                                  {booking.condition}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Delete — same as original handleDelete logic */}
                        <motion.button
                          className="mbk-btn-delete"
                          onClick={() => handleDelete(booking._id)}
                          whileTap={{ scale: 0.96 }}
                        >
                          🗑 Delete Booking
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBookings;
