import { useEffect, useState, useRef } from "react";
import axios from "axios";
import HospitalCard from "../components/HospitalCard";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────── Skeleton Card ─────────────────────── */
function HospitalCardSkeleton() {
  return (
    <div className="hosp-skeleton-card">
      <div className="sk sk-img" />
      <div style={{ padding: "18px" }}>
        <div className="sk sk-title" />
        <div className="sk sk-sub" style={{ marginTop: 8 }} />
        <div className="sk sk-sub short" style={{ marginTop: 6 }} />
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <div className="sk sk-badge" />
          <div className="sk sk-badge" />
        </div>
        <div className="sk sk-btn" style={{ marginTop: 18 }} />
      </div>
    </div>
  );
}

/* ─────────────────────── Stat Pill ─────────────────────── */
function StatPill({ icon, label, value, loading }) {
  return (
    <div className="stat-pill">
      <span className="stat-pill-icon">{icon}</span>
      <div>
        {loading ? (
          <div className="sk sk-pill-val" />
        ) : (
          <span className="stat-pill-val">{value}</span>
        )}
        <span className="stat-pill-label">{label}</span>
      </div>
    </div>
  );
}

/* ─────────────────────── Main Component ─────────────────────── */
function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const fetchHospitals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/hospital");
      setHospitals(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const cities = [
    "All",
    ...new Set(hospitals.map((h) => h.city).filter(Boolean)),
  ];

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchSearch = hospital.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchCity = cityFilter === "All" || hospital.city === cityFilter;
    const matchType =
      typeFilter === "All" || hospital.hospitalType === typeFilter;
    return matchSearch && matchCity && matchType;
  });

  const totalBeds = hospitals.reduce((a, h) => a + (h.totalBeds || 0), 0);
  const availableBeds = hospitals.reduce(
    (a, h) => a + (h.availableBeds || 0),
    0,
  );

  const typeIcons = {
    All: "🏥",
    Government: "🏛️",
    Private: "🏨",
    NGO: "🤝",
    Emergency: "🚨",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hosp-root {
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          background: #f0fdf9;
          background-image:
            radial-gradient(ellipse 70% 40% at 15% -5%, rgba(13,148,136,0.13) 0%, transparent 60%),
            radial-gradient(ellipse 50% 35% at 85% 95%, rgba(16,185,129,0.09) 0%, transparent 60%);
          padding: 100px 24px 72px;
        }
        .hosp-inner { max-width: 1280px; margin: 0 auto; }

        /* ── Hero ── */
        .hosp-hero {
          text-align: center;
          margin-bottom: 44px;
        }
        .hosp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(13,148,136,0.1);
          color: #0d9488;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 99px;
          margin-bottom: 18px;
          border: 1px solid rgba(13,148,136,0.2);
        }
        .hosp-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          color: #134e4a;
          line-height: 1.1;
          margin-bottom: 12px;
        }
        .hosp-title span { color: #0d9488; }
        .hosp-subtitle {
          font-size: 1rem;
          color: #5eada5;
          max-width: 460px;
          margin: 0 auto 30px;
          line-height: 1.6;
        }

        /* ── Stat Pills ── */
        .stat-pills {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 44px;
        }
        .stat-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border: 1px solid rgba(13,148,136,0.15);
          border-radius: 14px;
          padding: 12px 20px;
          box-shadow: 0 2px 10px rgba(13,148,136,0.06);
        }
        .stat-pill-icon { font-size: 1.4rem; }
        .stat-pill-val {
          display: block;
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem;
          font-weight: 800;
          color: #134e4a;
          line-height: 1;
        }
        .stat-pill-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          color: #7da8a2;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-top: 2px;
        }
        .sk-pill-val { height: 20px; width: 40px; border-radius: 6px; }

        /* ── Search Bar ── */
        .search-bar-wrap {
          max-width: 680px;
          margin: 0 auto 24px;
          position: relative;
        }
        .search-bar-inner {
          display: flex;
          align-items: center;
          background: #fff;
          border: 2px solid rgba(13,148,136,0.2);
          border-radius: 16px;
          padding: 4px 4px 4px 18px;
          box-shadow: 0 4px 20px rgba(13,148,136,0.08);
          transition: border-color 0.2s, box-shadow 0.2s;
          gap: 10px;
        }
        .search-bar-inner.focused {
          border-color: #0d9488;
          box-shadow: 0 0 0 4px rgba(13,148,136,0.1), 0 4px 20px rgba(13,148,136,0.12);
        }
        .search-icon { font-size: 1.1rem; flex-shrink: 0; color: #5eada5; }
        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: #134e4a;
          background: transparent;
          padding: 10px 0;
        }
        .search-input::placeholder { color: #aacfcc; }
        .search-clear {
          background: rgba(13,148,136,0.08);
          border: none;
          border-radius: 10px;
          color: #0d9488;
          font-size: 1rem;
          width: 36px; height: 36px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .search-clear:hover { background: rgba(13,148,136,0.16); }

        /* ── Filters Row ── */
        .filters-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
        }
        .city-select {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: #134e4a;
          background: #fff;
          border: 1.5px solid rgba(13,148,136,0.2);
          border-radius: 12px;
          padding: 10px 16px;
          cursor: pointer;
          outline: none;
          box-shadow: 0 2px 8px rgba(13,148,136,0.06);
          transition: border-color 0.2s;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230d9488' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 34px;
        }
        .city-select:focus { border-color: #0d9488; }

        .type-tabs { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
        .type-tab {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 16px;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid rgba(13,148,136,0.18);
          background: #fff;
          color: #5eada5;
          transition: all 0.18s ease;
        }
        .type-tab:hover { border-color: #0d9488; color: #0d9488; }
        .type-tab.active {
          background: linear-gradient(135deg, #0d9488, #10b981);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 14px rgba(13,148,136,0.3);
        }

        /* ── Results Label ── */
        .results-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .results-label {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #134e4a;
        }
        .results-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(13,148,136,0.1);
          color: #0d9488;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 2px 10px;
          border-radius: 99px;
          margin-left: 8px;
        }
        .sort-note {
          font-size: 0.82rem;
          color: #7da8a2;
        }

        /* ── Grid ── */
        .hosp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) { .hosp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .hosp-grid { grid-template-columns: 1fr; } }

        /* ── Empty State ── */
        .empty-state {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          text-align: center;
        }
        .empty-icon-wrap {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: rgba(13,148,136,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 2.2rem;
          margin-bottom: 20px;
        }
        .empty-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #134e4a;
          margin-bottom: 8px;
        }
        .empty-sub { font-size: 0.9rem; color: #7da8a2; }

        /* ── Skeleton ── */
        .hosp-skeleton-card {
          background: #fff;
          border-radius: 18px;
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
        .sk-img   { height: 160px; border-radius: 0; }
        .sk-title { height: 18px; width: 70%; }
        .sk-sub   { height: 13px; width: 85%; }
        .sk-sub.short { width: 50%; }
        .sk-badge { height: 22px; width: 70px; border-radius: 99px; }
        .sk-btn   { height: 38px; width: 100%; border-radius: 10px; }
      `}</style>

      <div className="hosp-root">
        <div className="hosp-inner">
          {/* ── Hero ── */}
          <motion.div
            className="hosp-hero"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="hosp-eyebrow">
              <span>🏥</span> Real-time Bed Availability
            </div>
            <h1 className="hosp-title">
              Find the Right <span>Hospital</span>
              <br />
              Near You
            </h1>
            <p className="hosp-subtitle">
              Search, filter, and book hospital beds instantly. Updated in
              real-time.
            </p>
          </motion.div>

          {/* ── Stat Pills ── */}
          <motion.div
            className="stat-pills"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
          >
            <StatPill
              icon="🏥"
              label="Total Hospitals"
              value={hospitals.length}
              loading={loading}
            />
            <StatPill
              icon="🛏️"
              label="Total Beds"
              value={totalBeds.toLocaleString()}
              loading={loading}
            />
            <StatPill
              icon="✅"
              label="Available Beds"
              value={availableBeds.toLocaleString()}
              loading={loading}
            />
          </motion.div>

          {/* ── Search Bar ── */}
          <motion.div
            className="search-bar-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
          >
            <div className={`search-bar-inner ${focused ? "focused" : ""}`}>
              <span className="search-icon">🔍</span>
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Search hospitals by name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
              <AnimatePresence>
                {search && (
                  <motion.button
                    className="search-clear"
                    onClick={() => {
                      setSearch("");
                      inputRef.current?.focus();
                    }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                  >
                    ✕
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Filters ── */}
          <motion.div
            className="filters-row"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.4 }}
          >
            {/* City Dropdown */}
            <select
              className="city-select"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === "All" ? "📍 All Cities" : city}
                </option>
              ))}
            </select>

            {/* Type Tabs */}
            <div className="type-tabs">
              {["All", "Government", "Private", "NGO", "Emergency"].map(
                (type) => (
                  <motion.button
                    key={type}
                    className={`type-tab ${typeFilter === type ? "active" : ""}`}
                    onClick={() => setTypeFilter(type)}
                    whileTap={{ scale: 0.94 }}
                  >
                    <span>{typeIcons[type]}</span>
                    {type}
                  </motion.button>
                ),
              )}
            </div>
          </motion.div>

          {/* ── Results Header ── */}
          {!loading && (
            <motion.div
              className="results-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <span className="results-label">
                Hospitals
                <span className="results-count">
                  {filteredHospitals.length}
                </span>
              </span>
              <span className="sort-note">
                {filteredHospitals.length === hospitals.length
                  ? "Showing all hospitals"
                  : `Filtered from ${hospitals.length} total`}
              </span>
            </motion.div>
          )}

          {/* ── Grid ── */}
          <div className="hosp-grid">
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
                    <HospitalCardSkeleton />
                  </motion.div>
                ))
            ) : filteredHospitals.length === 0 ? (
              <motion.div
                className="empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="empty-icon-wrap">🔍</div>
                <p className="empty-title">No hospitals found</p>
                <p className="empty-sub">
                  Try adjusting your search or filters to find more results.
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredHospitals.map((hospital, index) => (
                  <motion.div
                    key={hospital._id}
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
                    <HospitalCard
                      hospital={hospital}
                      refreshHospitals={fetchHospitals}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hospitals;
