import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";

function Home() {
  return (
    <>
      {/* 🔹 Hero Section with Background Image and Stats */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-white bg-[#0f111a] overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=1920&q=80"
          alt="hero background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f111a]/90 to-[#191b2a]/95" />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center max-w-3xl z-10"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-[1.4]">
            Ace Your Interviews with{" "}
            <motion.span
              className="bg-gradient-to-r from-yellow-400 via-blue-400 to-yellow-400 bg-clip-text text-transparent animate-pulse"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              PrepMate AI
            </motion.span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Practice real AI-generated questions. <br />
            Get feedback, improve, and grow your career confidence.
          </p>

          <Link
            to="/interview"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded transition"
          >
            🚀 Start Practicing
          </Link>
        </motion.div>

        {/* 🔹 Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-4xl w-full text-center"
        >
          {[
            { label: "Interviews Simulated", value: "10K+" },
            { label: "Companies Covered", value: "500+" },
            { label: "Feedback Delivered", value: "50K+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#1b1e2b] border border-gray-700 p-6 rounded-xl shadow-lg"
            >
              <p className="text-3xl font-bold text-yellow-400">{stat.value}</p>
              <p className="text-sm text-gray-300 mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 🔹 Testimonials Section */}
      <section className="py-20 px-4 bg-[#12141f] text-white">
        <Testimonials />
      </section>

      {/* 🔹 Pricing Section */}
      <section className="py-20 px-4 bg-[#191b2a] text-white">
        <Pricing />
      </section>
    </>
  );
}

export default Home;
