import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";

function Home() {
  return (
    <>
      {/* 🔹 Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Ace Your Interviews with{" "}
            <span className="text-blue-600">PrepMate AI</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Practice real AI-generated questions. Get feedback, earn XP, unlock badges, and boost your career confidence.
          </p>
          <Link
            to="/interview"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded transition"
          >
            🚀 Start Practicing
          </Link>
        </motion.div>
      </section>

      {/* 🔹 Testimonials Section */}
      <section className="bg-gray-100 py-16 px-4">
        <Testimonials />
      </section>

      {/* 🔹 Pricing Section */}
      <section className="bg-white py-16 px-4">
        <Pricing />
      </section>
    </>
  );
}

export default Home;
