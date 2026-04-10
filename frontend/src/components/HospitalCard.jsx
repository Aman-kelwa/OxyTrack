import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import BookingModal from "./BookingModal";

function HospitalCard({ hospital, refreshHospitals }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const icuPercent =
    hospital.totalICU > 0
      ? Math.round((hospital.availableICU / hospital.totalICU) * 100)
      : 0;
  const oxygenPercent =
    hospital.totalOxygenBeds > 0
      ? Math.round(
          (hospital.availableOxygenBeds / hospital.totalOxygenBeds) * 100,
        )
      : 0;
  const bedPercent =
    hospital.totalBeds > 0
      ? Math.round((hospital.availableBeds / hospital.totalBeds) * 100)
      : 0;

  const getBarColor = (pct) => {
    if (pct >= 60) return "linear-gradient(90deg,#0d9488,#10b981)";
    if (pct >= 30) return "linear-gradient(90deg,#f59e0b,#fbbf24)";
    return "linear-gradient(90deg,#ef4444,#f87171)";
  };

  const typeColors = {
    Government: { bg: "rgba(13,148,136,0.1)", color: "#0d9488" },
    Private: { bg: "rgba(99,102,241,0.1)", color: "#6366f1" },
    NGO: { bg: "rgba(16,185,129,0.1)", color: "#059669" },
    Emergency: { bg: "rgba(239,68,68,0.1)", color: "#ef4444" },
  };
  const typeStyle = typeColors[hospital.hospitalType] ?? {
    bg: "rgba(13,148,136,0.1)",
    color: "#0d9488",
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this hospital?")) return;
    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://oxytrack.onrender.com/api/hospital/delete/${hospital._id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      refreshHospitals();
    } catch {
      alert("Delete failed");
      setDeleting(false);
    }
  };
  const getBedColor = (val) => {
    if (!Number.isFinite(val)) return "#9ca3af"; // gray
    if (val >= 70) return "#16a34a";
    if (val >= 40) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .hcard {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          border-radius: 20px;
          border: 1px solid rgba(13,148,136,0.12);
          box-shadow: 0 2px 16px rgba(13,148,136,0.06);
          overflow: hidden;
          transition: box-shadow 0.25s ease, border-color 0.25s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .hcard:hover {
          box-shadow: 0 8px 32px rgba(13,148,136,0.14);
          border-color: rgba(13,148,136,0.22);
        }

        /* ── Top accent bar ── */
        .hcard-accent {
          height: 4px;
          background: linear-gradient(90deg, #0d9488, #10b981, #34d399);
          width: 100%;
        }

        .hcard-body {
          padding: 22px 22px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* ── Header ── */
        .hcard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }
        .hcard-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #134e4a;
          line-height: 1.25;
        }
        .hcard-city {
          font-size: 0.8rem;
          color: #7da8a2;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .hcard-type-badge {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 4px 11px;
          border-radius: 99px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── Divider ── */
        .hcard-divider {
          height: 1px;
          background: rgba(13,148,136,0.08);
          margin: 0 0 18px;
        }

        /* ── Stat Row (beds summary) ── */
        .hcard-stats {
          display: flex;
          gap: 0;
          margin-bottom: 18px;
          border: 1px solid rgba(13,148,136,0.1);
          border-radius: 14px;
          overflow: hidden;
        }
        .hcard-stat {
          flex: 1;
          text-align: center;
          padding: 11px 8px;
          border-right: 1px solid rgba(13,148,136,0.08);
        }
        .hcard-stat:last-child { border-right: none; }
        .hcard-stat-val {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          color: #134e4a;
          display: block;
          line-height: 1;
        }
        .hcard-stat-label {
          font-size: 0.67rem;
          font-weight: 600;
          color: #7da8a2;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-top: 3px;
          display: block;
        }

        /* ── Progress Bars ── */
        .hcard-bars {
          display: flex;
          flex-direction: column;
          gap: 13px;
          margin-bottom: 20px;
          flex: 1;
        }
        .hcard-bar-row {}
        .hcard-bar-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .hcard-bar-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #5e7b78;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .hcard-bar-count {
          font-size: 0.78rem;
          font-weight: 700;
          color: #134e4a;
          font-family: 'Syne', sans-serif;
        }
        .hcard-bar-pct {
          font-size: 0.7rem;
          color: #7da8a2;
          margin-left: 4px;
        }
        .hcard-bar-track {
          width: 100%;
          height: 7px;
          background: rgba(13,148,136,0.08);
          border-radius: 99px;
          overflow: hidden;
        }
        .hcard-bar-fill {
          height: 100%;
          border-radius: 99px;
        }

        /* ── Buttons ── */
        .hcard-actions {
          display: flex;
          gap: 10px;
          margin-top: auto;
          padding-top: 4px;
        }
        .hcard-btn-book {
          flex: 1;
          padding: 11px 0;
          border-radius: 13px;
          border: none;
          background: linear-gradient(135deg, #0d9488, #10b981);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(13,148,136,0.28);
          transition: box-shadow 0.18s, transform 0.15s;
        }
        .hcard-btn-book:hover {
          box-shadow: 0 6px 20px rgba(13,148,136,0.38);
          transform: translateY(-1px);
        }
        .hcard-btn-delete {
          padding: 11px 16px;
          border-radius: 13px;
          border: 1.5px solid rgba(239,68,68,0.2);
          background: rgba(239,68,68,0.05);
          color: #ef4444;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s ease;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .hcard-btn-delete:hover:not(:disabled) {
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.4);
        }
        .hcard-btn-delete:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <motion.div
        className="hcard"
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.38, ease: "easeOut" }}
        layout
      >
        {/* Accent bar */}
        <div className="hcard-accent" />

        <div className="hcard-body">
          {/* Header */}
          <div className="hcard-header">
            <div>
              <p className="hcard-name">{hospital.name}</p>
              <p className="hcard-city">📍 {hospital.city}</p>
            </div>
            <span
              className="hcard-type-badge"
              style={{
                background: typeStyle.bg,
                color: typeStyle.color,
              }}
            >
              {hospital.hospitalType}
            </span>
          </div>

          <div className="hcard-divider" />

          {/* Stat Row */}
          <div className="hcard-stats">
            <div className="hcard-stat">
              <span className="hcard-stat-val">
                {(hospital.availableOxygenBeds ?? 0) +
                  (hospital.availableICU ?? 0)}
              </span>
              <span className="hcard-stat-label">Avail.</span>
            </div>
            <div className="hcard-stat">
              <span className="hcard-stat-val">
                {/* {hospital.totalOxygenBeds ?? "—"} */}
                {(hospital.totalICU ?? 0) + (hospital.totalOxygenBeds ?? 0)}
              </span>
              <span className="hcard-stat-label">Total</span>
            </div>
            {/* <div className="hcard-stat">
              <span
                className="hcard-stat-val"
                style={{ color: getBedColor(bedPercent) }}
              >
                {Number.isFinite(bedPercent) ? `${bedPercent}%` : "—"}
              </span>
              <span className="hcard-stat-label">Free</span>
            </div> */}
          </div>

          {/* Progress Bars */}
          <div className="hcard-bars">
            {/* ICU */}
            <div className="hcard-bar-row">
              <div className="hcard-bar-meta">
                <span className="hcard-bar-label">
                  <span>🧪</span> ICU Beds
                </span>
                <span>
                  <span className="hcard-bar-count">
                    {hospital.availableICU}/{hospital.totalICU}
                  </span>
                  <span className="hcard-bar-pct">({icuPercent}%)</span>
                </span>
              </div>
              <div className="hcard-bar-track">
                <motion.div
                  className="hcard-bar-fill"
                  style={{ background: getBarColor(icuPercent) }}
                  initial={{ width: 0 }}
                  animate={{ width: `${icuPercent}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Oxygen */}
            <div className="hcard-bar-row">
              <div className="hcard-bar-meta">
                <span className="hcard-bar-label">
                  <span>💨</span> Oxygen Beds
                </span>
                <span>
                  <span className="hcard-bar-count">
                    {hospital.availableOxygenBeds}/{hospital.totalOxygenBeds}
                  </span>
                  <span className="hcard-bar-pct">({oxygenPercent}%)</span>
                </span>
              </div>
              <div className="hcard-bar-track">
                <motion.div
                  className="hcard-bar-fill"
                  style={{ background: getBarColor(oxygenPercent) }}
                  initial={{ width: 0 }}
                  animate={{ width: `${oxygenPercent}%` }}
                  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hcard-actions">
            <motion.button
              className="hcard-btn-book"
              onClick={() => setOpen(true)}
              whileTap={{ scale: 0.96 }}
            >
              Book Bed
            </motion.button>

            <motion.button
              className="hcard-btn-delete"
              onClick={handleDelete}
              disabled={deleting}
              whileTap={{ scale: 0.96 }}
            >
              {deleting ? "…" : "🗑"}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <BookingModal hospital={hospital} closeModal={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default HospitalCard;
