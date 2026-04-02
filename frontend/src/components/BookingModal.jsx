import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function BookingModal({ hospital, closeModal }) {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const [bedType, setBedType] = useState("ICU");

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/booking/create",
        {
          patientName,
          age,
          condition,
          bedType,
          hospital: hospital._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Booking request sent");
      closeModal();
    } catch (error) {
      alert("Booking failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .bmodal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 40, 38, 0.5);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'DM Sans', sans-serif;
        }

        .bmodal-card {
          background: #fff;
          border-radius: 24px;
          width: 100%;
          max-width: 440px;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(13,148,136,0.18), 0 4px 16px rgba(0,0,0,0.08);
        }

        .bmodal-accent {
          height: 5px;
          background: linear-gradient(90deg, #0d9488, #10b981, #34d399);
        }

        .bmodal-body {
          padding: 28px 28px 26px;
        }

        .bmodal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 5px;
        }
        .bmodal-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem;
          font-weight: 800;
          color: #134e4a;
        }
        .bmodal-close {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: rgba(13,148,136,0.07);
          border: 1px solid rgba(13,148,136,0.15);
          color: #5e7b78;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
        }
        .bmodal-close:hover {
          background: rgba(239,68,68,0.08);
          border-color: rgba(239,68,68,0.3);
          color: #ef4444;
        }
        .bmodal-hosp-name {
          font-size: 0.82rem;
          color: #7da8a2;
          margin-bottom: 22px;
        }
        .bmodal-divider {
          height: 1px;
          background: rgba(13,148,136,0.08);
          margin: 0 0 22px;
        }

        .bmodal-field {
          margin-bottom: 15px;
        }
        .bmodal-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          color: #5e7b78;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 7px;
        }
        .bmodal-input,
        .bmodal-select {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          color: #134e4a;
          background: #f0fdf9;
          border: 1.5px solid rgba(13,148,136,0.15);
          border-radius: 12px;
          padding: 11px 15px;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          box-sizing: border-box;
        }
        .bmodal-input::placeholder { color: #aacfcc; }
        .bmodal-input:focus,
        .bmodal-select:focus {
          border-color: #0d9488;
          box-shadow: 0 0 0 3px rgba(13,148,136,0.1);
          background: #fff;
        }
        .bmodal-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230d9488' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-color: #f0fdf9;
          padding-right: 38px;
          cursor: pointer;
        }
        .bmodal-select:focus { background-color: #fff; }

        .bmodal-btn-submit {
          width: 100%;
          padding: 13px 0;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #0d9488, #10b981);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 5px 18px rgba(13,148,136,0.28);
          transition: box-shadow 0.18s, transform 0.15s;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        .bmodal-btn-submit:hover {
          box-shadow: 0 8px 24px rgba(13,148,136,0.38);
          transform: translateY(-1px);
        }
        .bmodal-btn-cancel {
          width: 100%;
          padding: 11px 0;
          border-radius: 14px;
          border: 1.5px solid rgba(13,148,136,0.2);
          background: transparent;
          color: #5e7b78;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .bmodal-btn-cancel:hover {
          background: rgba(13,148,136,0.05);
          border-color: rgba(13,148,136,0.35);
          color: #0d9488;
        }
      `}</style>

      <motion.div
        className="bmodal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bmodal-card"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="bmodal-accent" />

          <div className="bmodal-body">
            <div className="bmodal-header">
              <h2 className="bmodal-title">Book a Bed</h2>
              <button
                type="button"
                className="bmodal-close"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
            <p className="bmodal-hosp-name">🏥 {hospital.name}</p>

            <div className="bmodal-divider" />

            {/* ── Exact original form logic — nothing changed ── */}
            <form onSubmit={handleBooking}>
              <div className="bmodal-field">
                <label className="bmodal-label">Patient Name</label>
                <input
                  className="bmodal-input"
                  placeholder="Patient Name"
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>

              <div className="bmodal-field">
                <label className="bmodal-label">Age</label>
                <input
                  className="bmodal-input"
                  placeholder="Age"
                  type="number"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="bmodal-field">
                <label className="bmodal-label">Condition</label>
                <input
                  className="bmodal-input"
                  placeholder="Condition"
                  onChange={(e) => setCondition(e.target.value)}
                />
              </div>

              <div className="bmodal-field">
                <label className="bmodal-label">Bed Type</label>
                <select
                  className="bmodal-select"
                  onChange={(e) => setBedType(e.target.value)}
                >
                  <option value="ICU">ICU</option>
                  <option value="OXYGEN">Oxygen</option>
                </select>
              </div>

              <motion.button
                type="submit"
                className="bmodal-btn-submit"
                whileTap={{ scale: 0.97 }}
              >
                🛏️ Submit Booking
              </motion.button>

              <motion.button
                type="button"
                className="bmodal-btn-cancel"
                onClick={closeModal}
                whileTap={{ scale: 0.97 }}
              >
                Cancel
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default BookingModal;
