import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import Footer from "../components/Footer";

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function Feature({ icon, title, desc, delay }) {
  return (
    <FadeUp delay={delay}>
      <motion.div
        className="lp-feature-card"
        whileHover={{ y: -6, transition: { duration: 0.18 } }}
      >
        <div className="lp-feature-icon">{icon}</div>
        <h3 className="lp-feature-title">{title}</h3>
        <p className="lp-feature-desc">{desc}</p>
      </motion.div>
    </FadeUp>
  );
}

function StatCard({ value, label, icon }) {
  return (
    <div className="lp-stat-card">
      <span className="lp-stat-icon">{icon}</span>
      <span className="lp-stat-val">{value}</span>
      <span className="lp-stat-label">{label}</span>
    </div>
  );
}

function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lp-root {
          font-family: 'DM Sans', sans-serif;
          background: #f0fdf9;
          color: #134e4a;
          overflow-x: hidden;
        }

        /* ════════════════════════════════
           HERO
        ════════════════════════════════ */
        .lp-hero {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          padding: 120px 24px 80px;
          overflow: hidden;
        }

        /* Decorative blobs */
        .lp-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .lp-blob-1 {
          width: 520px; height: 520px;
          background: rgba(13,148,136,0.14);
          top: -120px; left: -140px;
        }
        .lp-blob-2 {
          width: 380px; height: 380px;
          background: rgba(16,185,129,0.1);
          bottom: -60px; right: -80px;
        }
        .lp-blob-3 {
          width: 240px; height: 240px;
          background: rgba(52,211,153,0.12);
          top: 40%; right: 8%;
        }

        /* Subtle dot grid */
        .lp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(13,148,136,0.12) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 0;
        }

        .lp-hero-inner {
          max-width: 1240px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* ── Hero Left ── */
        .lp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(13,148,136,0.1);
          color: #0d9488;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 99px;
          margin-bottom: 22px;
          border: 1px solid rgba(13,148,136,0.2);
        }
        .lp-hero-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.6rem, 5.5vw, 4rem);
          font-weight: 800;
          color: #134e4a;
          line-height: 1.08;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }
        .lp-hero-h1 span {
          color: #0d9488;
          position: relative;
        }
        .lp-hero-h1 span::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #0d9488, #34d399);
          border-radius: 2px;
        }
        .lp-hero-p {
          font-size: 1.05rem;
          color: #5e7b78;
          line-height: 1.7;
          max-width: 440px;
          margin-bottom: 36px;
        }
        .lp-hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .lp-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #0d9488, #10b981);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 14px;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(13,148,136,0.32);
          transition: box-shadow 0.2s, transform 0.15s;
        }
        .lp-cta-primary:hover {
          box-shadow: 0 10px 28px rgba(13,148,136,0.42);
          transform: translateY(-2px);
        }
        .lp-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #fff;
          color: #0d9488;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 14px;
          text-decoration: none;
          border: 1.5px solid rgba(13,148,136,0.25);
          box-shadow: 0 2px 12px rgba(13,148,136,0.08);
          transition: all 0.18s ease;
        }
        .lp-cta-secondary:hover {
          border-color: #0d9488;
          box-shadow: 0 4px 18px rgba(13,148,136,0.14);
          transform: translateY(-2px);
        }

        /* ── Hero Right ── */
        .lp-hero-right { position: relative; }
        .lp-hero-card {
          background: #fff;
          border-radius: 22px;
          border: 1px solid rgba(13,148,136,0.14);
          box-shadow: 0 12px 40px rgba(13,148,136,0.12);
          overflow: hidden;
        }
        .lp-hero-card-accent {
          height: 5px;
          background: linear-gradient(90deg, #0d9488, #10b981, #34d399);
        }
        .lp-hero-card-body { padding: 26px 26px 22px; }
        .lp-hero-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #134e4a;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .lp-live-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: lp-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes lp-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }
        .lp-hero-bars { display: flex; flex-direction: column; gap: 14px; }
        .lp-hbar-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          font-weight: 600;
          color: #5e7b78;
          margin-bottom: 6px;
        }
        .lp-hbar-count {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          color: #0d9488;
        }
        .lp-hbar-track {
          width: 100%;
          height: 8px;
          background: rgba(13,148,136,0.08);
          border-radius: 99px;
          overflow: hidden;
        }
        .lp-hbar-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, #0d9488, #10b981);
        }
        .lp-hero-card-stats {
          display: flex;
          gap: 0;
          margin-top: 20px;
          border-top: 1px solid rgba(13,148,136,0.08);
          padding-top: 18px;
        }
        .lp-mini-stat {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(13,148,136,0.08);
          padding: 0 8px;
        }
        .lp-mini-stat:last-child { border-right: none; }
        .lp-mini-val {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          color: #134e4a;
          display: block;
        }
        .lp-mini-label {
          font-size: 0.67rem;
          font-weight: 600;
          color: #7da8a2;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-top: 2px;
          display: block;
        }

        /* Floating badge */
        .lp-float-badge {
          position: absolute;
          top: -18px;
          right: -16px;
          background: linear-gradient(135deg,#0d9488,#10b981);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.07em;
          padding: 7px 14px;
          border-radius: 99px;
          box-shadow: 0 6px 18px rgba(13,148,136,0.35);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* ════════════════════════════════
           STATS BAND
        ════════════════════════════════ */
        .lp-stats-band {
          background: #fff;
          border-top: 1px solid rgba(13,148,136,0.1);
          border-bottom: 1px solid rgba(13,148,136,0.1);
          padding: 36px 24px;
        }
        .lp-stats-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
        }
        .lp-stat-card {
          flex: 1;
          min-width: 160px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 20px 16px;
          border-right: 1px solid rgba(13,148,136,0.1);
        }
        .lp-stat-card:last-child { border-right: none; }
        .lp-stat-icon { font-size: 1.5rem; margin-bottom: 4px; }
        .lp-stat-val {
          font-family: 'Syne', sans-serif;
          font-size: 1.7rem;
          font-weight: 800;
          color: #134e4a;
          line-height: 1;
        }
        .lp-stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #7da8a2;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          text-align: center;
        }

        /* ════════════════════════════════
           FEATURES
        ════════════════════════════════ */
        .lp-features {
          padding: 100px 24px;
          position: relative;
        }
        .lp-features::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(ellipse 60% 40% at 80% 50%, rgba(13,148,136,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .lp-section-inner { max-width: 1200px; margin: 0 auto; }
        .lp-section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(13,148,136,0.1);
          color: #0d9488;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 99px;
          margin-bottom: 16px;
          border: 1px solid rgba(13,148,136,0.18);
        }
        .lp-section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          color: #134e4a;
          line-height: 1.15;
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }
        .lp-section-sub {
          font-size: 1rem;
          color: #5e7b78;
          max-width: 480px;
          line-height: 1.65;
          margin-bottom: 56px;
        }
        .lp-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .lp-feature-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid rgba(13,148,136,0.12);
          box-shadow: 0 2px 16px rgba(13,148,136,0.05);
          padding: 28px 26px;
          transition: box-shadow 0.2s, border-color 0.2s;
          cursor: default;
        }
        .lp-feature-card:hover {
          box-shadow: 0 8px 32px rgba(13,148,136,0.13);
          border-color: rgba(13,148,136,0.22);
        }
        .lp-feature-icon {
          width: 50px; height: 50px;
          border-radius: 14px;
          background: rgba(13,148,136,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          margin-bottom: 18px;
        }
        .lp-feature-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #134e4a;
          margin-bottom: 10px;
        }
        .lp-feature-desc {
          font-size: 0.88rem;
          color: #5e7b78;
          line-height: 1.65;
        }

        /* ════════════════════════════════
           HOW IT WORKS
        ════════════════════════════════ */
        .lp-how {
          padding: 100px 24px;
          background: #fff;
          border-top: 1px solid rgba(13,148,136,0.08);
          border-bottom: 1px solid rgba(13,148,136,0.08);
        }
        .lp-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          position: relative;
          margin-top: 56px;
        }
        .lp-steps::before {
          content: '';
          position: absolute;
          top: 28px;
          left: calc(16.66% + 16px);
          right: calc(16.66% + 16px);
          height: 2px;
          background: linear-gradient(90deg, rgba(13,148,136,0.2), rgba(13,148,136,0.5), rgba(13,148,136,0.2));
          pointer-events: none;
        }
        .lp-step { text-align: center; }
        .lp-step-num {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0d9488, #10b981);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          box-shadow: 0 6px 18px rgba(13,148,136,0.28);
          position: relative;
          z-index: 1;
        }
        .lp-step-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #134e4a;
          margin-bottom: 10px;
        }
        .lp-step-desc {
          font-size: 0.86rem;
          color: #5e7b78;
          line-height: 1.65;
          max-width: 220px;
          margin: 0 auto;
        }

        /* ════════════════════════════════
           CTA BANNER
        ════════════════════════════════ */
        .lp-cta {
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .lp-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 50% -10%, rgba(13,148,136,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 110%, rgba(16,185,129,0.1) 0%, transparent 60%);
          pointer-events: none;
        }
        .lp-cta-inner { max-width: 640px; margin: 0 auto; position: relative; z-index: 1; }
        .lp-cta-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          color: #134e4a;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        .lp-cta-title span { color: #0d9488; }
        .lp-cta-sub {
          font-size: 1rem;
          color: #5e7b78;
          line-height: 1.65;
          margin-bottom: 40px;
        }
        .lp-cta-btns {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ════════════════════════════════
           RESPONSIVE
        ════════════════════════════════ */
        @media (max-width: 900px) {
          .lp-hero-inner { grid-template-columns: 1fr; gap: 48px; }
          .lp-hero-right { display: none; }
          .lp-features-grid { grid-template-columns: 1fr 1fr; }
          .lp-steps { grid-template-columns: 1fr; }
          .lp-steps::before { display: none; }
        }
        @media (max-width: 560px) {
          .lp-features-grid { grid-template-columns: 1fr; }
          .lp-stats-inner { gap: 0; }
          .lp-stat-card { min-width: 50%; border-bottom: 1px solid rgba(13,148,136,0.1); }
        }
      `}</style>

      <div className="lp-root">
        {/* ══ HERO ══ */}
        <section className="lp-hero">
          <div className="lp-blob lp-blob-1" />
          <div className="lp-blob lp-blob-2" />
          <div className="lp-blob lp-blob-3" />

          <div className="lp-hero-inner">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="lp-eyebrow">
                  🏥 Real-time Bed Availability
                </span>
              </motion.div>

              <motion.h1
                className="lp-hero-h1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Smart Hospital
                <br />
                <span>Bed Tracking</span>
                <br />
                Platform
              </motion.h1>

              <motion.p
                className="lp-hero-p"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22 }}
              >
                Find real-time ICU and oxygen bed availability across hospitals
                and book instantly during emergencies.
              </motion.p>

              <motion.div
                className="lp-hero-ctas"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.34 }}
              >
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link to="/hospitals" className="lp-cta-primary">
                    🏥 View Hospitals
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link to="/register" className="lp-cta-secondary">
                    Get Started →
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right — Live status card */}
            <motion.div
              className="lp-hero-right"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            >
              <div className="lp-float-badge">
                <span className="lp-live-dot" style={{ width: 6, height: 6 }} />
                LIVE UPDATES
              </div>

              <div className="lp-hero-card">
                <div className="lp-hero-card-accent" />
                <div className="lp-hero-card-body">
                  <p className="lp-hero-card-title">
                    <span className="lp-live-dot" /> Live Hospital Status
                  </p>

                  <div className="lp-hero-bars">
                    <div>
                      <div className="lp-hbar-label">
                        <span>🧪 ICU Beds</span>
                        <span className="lp-hbar-count">12 Available</span>
                      </div>
                      <div className="lp-hbar-track">
                        <motion.div
                          className="lp-hbar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: "65%" }}
                          transition={{
                            duration: 1,
                            delay: 0.6,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="lp-hbar-label">
                        <span>💨 Oxygen Beds</span>
                        <span className="lp-hbar-count">25 Available</span>
                      </div>
                      <div className="lp-hbar-track">
                        <motion.div
                          className="lp-hbar-fill"
                          style={{
                            background:
                              "linear-gradient(90deg,#10b981,#34d399)",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: "82%" }}
                          transition={{
                            duration: 1,
                            delay: 0.8,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="lp-hbar-label">
                        <span>🛏️ General Beds</span>
                        <span className="lp-hbar-count">47 Available</span>
                      </div>
                      <div className="lp-hbar-track">
                        <motion.div
                          className="lp-hbar-fill"
                          style={{
                            background:
                              "linear-gradient(90deg,#0d9488,#34d399)",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: "54%" }}
                          transition={{
                            duration: 1,
                            delay: 1.0,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lp-hero-card-stats">
                    <div className="lp-mini-stat">
                      <span className="lp-mini-val">48+</span>
                      <span className="lp-mini-label">Hospitals</span>
                    </div>
                    <div className="lp-mini-stat">
                      <span className="lp-mini-val">1.2k</span>
                      <span className="lp-mini-label">Beds</span>
                    </div>
                    <div className="lp-mini-stat">
                      <span className="lp-mini-val">24/7</span>
                      <span className="lp-mini-label">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ STATS BAND ══ */}
        <section className="lp-stats-band">
          <FadeUp>
            <div className="lp-stats-inner">
              <StatCard icon="🏥" value="48+" label="Hospitals" />
              <StatCard icon="🛏️" value="1,200+" label="Total Beds" />
              <StatCard icon="✅" value="840+" label="Available Now" />
              <StatCard icon="📋" value="3,600+" label="Bookings Made" />
            </div>
          </FadeUp>
        </section>

        {/* ══ FEATURES ══ */}
        <section className="lp-features">
          <div className="lp-section-inner">
            <FadeUp>
              <span className="lp-section-eyebrow">✦ Platform Features</span>
              <h2 className="lp-section-title">
                Everything you need
                <br />
                in a crisis
              </h2>
              <p className="lp-section-sub">
                A unified system connecting hospitals and citizens so that no
                one ever has to search blindly for a bed.
              </p>
            </FadeUp>

            <div className="lp-features-grid">
              <Feature
                icon="⚡"
                title="Real-Time Bed Updates"
                desc="Hospitals update ICU and oxygen beds instantly. Availability reflects actual conditions at all times."
                delay={0}
              />
              <Feature
                icon="🚨"
                title="Emergency Booking"
                desc="Citizens can request a bed within seconds — no calls, no queues, no confusion."
                delay={0.08}
              />
              <Feature
                icon="📊"
                title="Hospital Dashboard"
                desc="Manage bookings, approve requests, and track your bed inventory from one clean interface."
                delay={0.16}
              />
              <Feature
                icon="🔍"
                title="Smart Filtering"
                desc="Filter hospitals by city, type, or bed availability to find exactly what you need, instantly."
                delay={0.06}
              />
              <Feature
                icon="🔔"
                title="Booking Status Alerts"
                desc="Patients and hospitals stay in sync with live approval, rejection, and cancellation updates."
                delay={0.12}
              />
              <Feature
                icon="🔒"
                title="Role-Based Access"
                desc="Separate, secure portals for citizens and hospital administrators — each seeing only what they need."
                delay={0.18}
              />
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section className="lp-how">
          <div className="lp-section-inner">
            <FadeUp>
              <span className="lp-section-eyebrow">✦ How It Works</span>
              <h2 className="lp-section-title">
                Three steps to
                <br />a confirmed bed
              </h2>
            </FadeUp>

            <div className="lp-steps">
              {[
                {
                  n: "01",
                  title: "Search Hospitals",
                  desc: "Browse real-time bed availability across all registered hospitals in your city.",
                },
                {
                  n: "02",
                  title: "Submit a Request",
                  desc: "Fill in patient details and choose your bed type. Your request is sent instantly.",
                },
                {
                  n: "03",
                  title: "Get Confirmed",
                  desc: "The hospital reviews and approves your booking. You're notified immediately.",
                },
              ].map((step, i) => (
                <FadeUp key={step.n} delay={i * 0.12}>
                  <div className="lp-step">
                    <motion.div
                      className="lp-step-num"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {step.n}
                    </motion.div>
                    <p className="lp-step-title">{step.title}</p>
                    <p className="lp-step-desc">{step.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA BANNER ══ */}
        <section className="lp-cta">
          <div className="lp-cta-inner">
            <FadeUp>
              <span className="lp-section-eyebrow" style={{ marginBottom: 20 }}>
                ✦ Join OxyTrack
              </span>
              <h2 className="lp-cta-title">
                Save Lives With
                <br />
                <span>Real-Time Data</span>
              </h2>
              <p className="lp-cta-sub">
                Connect hospitals and citizens on a single platform. Fast,
                accurate, and available when it matters most.
              </p>
              <div className="lp-cta-btns">
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link to="/register" className="lp-cta-primary">
                    🚀 Join Now — It's Free
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link to="/hospitals" className="lp-cta-secondary">
                    Browse Hospitals
                  </Link>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
