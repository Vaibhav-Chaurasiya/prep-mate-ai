import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";

function Home() {
  return (
    <>
      {/* 🔹 Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "#191b2a", color: "#fff" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight" style={{ color: "#fff" }}>
            Ace Your Interviews with{" "}
            <span style={{ color: "#fff", textDecoration: "underline" }}>PrepMate AI</span>
          </h1>
          <p className="text-lg mb-8" style={{ color: "#fff" }}>
            Practice real AI-generated questions. Get feedback, earn XP, unlock badges, and boost your career confidence.
          </p>
          <Link
            to="/interview"
            className="inline-block bg-white hover:bg-gray-200 text-[#191b2a] font-medium px-6 py-3 rounded transition"
          >
            🚀 Start Practicing
          </Link>
        </motion.div>
      </section>

      {/* 🔹 Testimonials Section */}
      <section className="py-16 px-4" style={{ backgroundColor: "#191b2a", color: "#fff" }}>
        <Testimonials />
      </section>

      {/* 🔹 Pricing Section */}
      <section className="py-16 px-4" style={{ backgroundColor: "#191b2a", color: "#fff" }}>
        <Pricing />
      </section>
    </>
  );
}

export default Home;