import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 opacity-20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl font-bold leading-tight">
              Smart Hospital
              <span className="text-cyan-400"> Bed Tracking</span>
            </h1>

            <p className="mt-6 text-gray-300 text-lg">
              Find real-time ICU and oxygen bed availability across hospitals
              and book instantly during emergencies.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/hospitals"
                className="px-6 py-3 bg-cyan-500 rounded-lg font-semibold hover:bg-cyan-400 transition"
              >
                View Hospitals
              </Link>

              <Link
                to="/register"
                className="px-6 py-3 border border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition"
              >
                Get Started
              </Link>
            </div>
          </motion.div>

          {/* RIGHT SIDE ANIMATION */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="w-96 h-96 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full blur-3xl opacity-40 absolute"></div>

            <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20">
              <h3 className="text-xl font-semibold mb-3">
                Live Hospital Status
              </h3>

              <p className="text-gray-300">ICU Beds: 12 Available</p>

              <p className="text-gray-300">Oxygen Beds: 25 Available</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Powerful Platform Features
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              title="Real-Time Bed Updates"
              desc="Hospitals update ICU and oxygen beds instantly."
            />

            <Feature
              title="Emergency Booking"
              desc="Citizens request beds within seconds."
            />

            <Feature
              title="Hospital Dashboard"
              desc="Manage bookings and bed inventory easily."
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}

      <section className="py-24 text-center bg-gradient-to-r from-indigo-600 to-cyan-500">
        <motion.h2
          className="text-4xl font-bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Save Lives With Real-Time Data
        </motion.h2>

        <p className="mt-4 text-lg text-gray-100">
          Connect hospitals and citizens on a single platform.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 px-8 py-3 bg-white text-black rounded-lg font-semibold hover:scale-105 transition"
        >
          Join Now
        </Link>
      </section>

      <Footer />
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20"
    >
      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      <p className="text-gray-300">{desc}</p>
    </motion.div>
  );
}

export default LandingPage;
