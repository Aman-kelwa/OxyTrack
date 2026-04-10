import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

function BookingCard({ booking, refreshBookings }) {
  const [acting, setActing] = useState(false);

  const statusConfig = {
    PENDING: {
      label: "Pending",
      color: "#d97706",
      bg: "rgba(245,158,11,0.1)",
      border: "rgba(245,158,11,0.2)",
      dot: "#f59e0b",
    },
    APPROVED: {
      label: "Approved",
      color: "#059669",
      bg: "rgba(16,185,129,0.1)",
      border: "rgba(16,185,129,0.2)",
      dot: "#10b981",
    },
    REJECTED: {
      label: "Rejected",
      color: "#dc2626",
      bg: "rgba(239,68,68,0.1)",
      border: "rgba(239,68,68,0.2)",
      dot: "#ef4444",
    },
  };

  const s = statusConfig[booking.status] ?? statusConfig.PENDING;

  const handleStatus = async (status) => {
    setActing(true);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `https://oxytrack.onrender.com/api/booking/update/${booking._id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      refreshBookings();
    } catch {
      alert("Action failed. Try again.");
    } finally {
      setActing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this booking?")) return;
    setActing(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://oxytrack.onrender.com/api/booking/delete/${booking._id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      refreshBookings();
    } catch {
      alert("Delete failed.");
      setActing(false);
    }
  };

  const bedTypeIcons = {
    General: "🛏️",
    ICU: "🧪",
    Oxygen: "💨",
    Emergency: "🚨",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .bcard {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          border-radius: 20px;
          border: 1px solid rgba(13,148,136,0.12);
          box-shadow: 0 2px 16px rgba(13,148,136,0.06);
          overflow: hidden;
          transition: box-shadow 0.25s ease, border-color 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .bcard:hover {
          box-shadow: 0 8px 32px rgba(13,148,136,0.13);
          border-color: rgba(13,148,136,0.2);
        }

        /* ── Accent bar ── */
        .bcard-accent {
          height: 4px;
          width: 100%;
        }

        .bcard-body {
          padding: 20px 22px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 0;
        }

        /* ── Header ── */
        .bcard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 14px;
        }
        .bcard-patient {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 800;
          color: #134e4a;
          line-height: 1.2;
        }
        .bcard-age {
          font-size: 0.8rem;
          color: #7da8a2;
          margin-top: 4px;
        }
        .bcard-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 5px 12px;
          border-radius: 99px;
          border: 1px solid;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .bcard-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Divider ── */
        .bcard-divider {
          height: 1px;
          background: rgba(13,148,136,0.08);
          margin: 0 0 16px;
        }

        /* ── Info rows ── */
        .bcard-info {
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-bottom: 18px;
        }
        .bcard-info-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bcard-info-icon {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          background: rgba(13,148,136,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }
        .bcard-info-content {}
        .bcard-info-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: #7da8a2;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }
        .bcard-info-val {
          font-size: 0.88rem;
          font-weight: 600;
          color: #134e4a;
          margin-top: 1px;
        }

        /* ── Actions ── */
        .bcard-actions {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }
        .bcard-btn-approve {
          flex: 1;
          padding: 10px 0;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #0d9488, #10b981);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(13,148,136,0.25);
          transition: all 0.18s ease;
        }
        .bcard-btn-approve:hover:not(:disabled) {
          box-shadow: 0 6px 18px rgba(13,148,136,0.35);
          transform: translateY(-1px);
        }
        .bcard-btn-approve:disabled {
          background: rgba(13,148,136,0.15);
          color: #7da8a2;
          box-shadow: none;
          cursor: not-allowed;
          transform: none;
        }
        .bcard-btn-reject {
          flex: 1;
          padding: 10px 0;
          border-radius: 12px;
          border: 1.5px solid rgba(239,68,68,0.2);
          background: rgba(239,68,68,0.05);
          color: #ef4444;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .bcard-btn-reject:hover:not(:disabled) {
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.4);
        }
        .bcard-btn-reject:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .bcard-btn-delete {
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
          margin-top: 8px;
          transition: all 0.18s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .bcard-btn-delete:hover:not(:disabled) {
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.35);
        }
        .bcard-btn-delete:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <motion.div
        className="bcard"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.36, ease: "easeOut" }}
        layout
      >
        {/* Accent bar — color reflects status */}
        <div
          className="bcard-accent"
          style={{
            background:
              booking.status === "APPROVED"
                ? "linear-gradient(90deg,#0d9488,#10b981,#34d399)"
                : booking.status === "REJECTED"
                  ? "linear-gradient(90deg,#ef4444,#f87171)"
                  : "linear-gradient(90deg,#f59e0b,#fbbf24,#fde68a)",
          }}
        />

        <div className="bcard-body">
          {/* Header */}
          <div className="bcard-header">
            <div>
              <p className="bcard-patient">{booking.patientName}</p>
              <p className="bcard-age">Age {booking.age}</p>
            </div>
            <span
              className="bcard-status-badge"
              style={{
                color: s.color,
                background: s.bg,
                borderColor: s.border,
              }}
            >
              <span
                className="bcard-status-dot"
                style={{ background: s.dot }}
              />
              {s.label}
            </span>
          </div>

          <div className="bcard-divider" />

          {/* Info rows */}
          <div className="bcard-info">
            <div className="bcard-info-row">
              <div className="bcard-info-icon">🩺</div>
              <div className="bcard-info-content">
                <p className="bcard-info-label">Condition</p>
                <p className="bcard-info-val">{booking.condition}</p>
              </div>
            </div>
            <div className="bcard-info-row">
              <div className="bcard-info-icon">
                {bedTypeIcons[booking.bedType] ?? "🛏️"}
              </div>
              <div className="bcard-info-content">
                <p className="bcard-info-label">Bed Type</p>
                <p className="bcard-info-val">{booking.bedType}</p>
              </div>
            </div>
            {booking.hospitalName && (
              <div className="bcard-info-row">
                <div className="bcard-info-icon">🏥</div>
                <div className="bcard-info-content">
                  <p className="bcard-info-label">Hospital</p>
                  <p className="bcard-info-val">{booking.hospitalName}</p>
                </div>
              </div>
            )}
          </div>

          {/* Approve / Reject (only shown for PENDING) */}
          {booking.status === "PENDING" && (
            <div className="bcard-actions">
              <motion.button
                className="bcard-btn-approve"
                onClick={() => handleStatus("APPROVED")}
                disabled={acting}
                whileTap={{ scale: 0.96 }}
              >
                {acting ? "…" : "✓ Approve"}
              </motion.button>
              <motion.button
                className="bcard-btn-reject"
                onClick={() => handleStatus("REJECTED")}
                disabled={acting}
                whileTap={{ scale: 0.96 }}
              >
                ✕ Reject
              </motion.button>
            </div>
          )}

          {/* Delete (only after decision) */}
          {booking.status !== "PENDING" && (
            <motion.button
              className="bcard-btn-delete"
              onClick={handleDelete}
              disabled={acting}
              whileTap={{ scale: 0.97 }}
            >
              {acting ? "Deleting…" : "🗑 Delete Booking"}
            </motion.button>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default BookingCard;
