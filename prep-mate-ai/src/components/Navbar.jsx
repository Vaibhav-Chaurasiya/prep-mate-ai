import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white/30 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 drop-shadow-md">
          PrepMate<span className="text-gray-800"> AI</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <GlowLink to="/" label="Home" />
          <GlowLink to="/interview" label="Interview" />
          <GlowLink to="/resume-match" label="Resume Match" />
          <GlowLink to="/dashboard" label="Dashboard" />
          <Link
            to="/signin"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded shadow transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white/60 backdrop-blur-md shadow">
          <GlowLink to="/" label="Home" mobile />
          <GlowLink to="/interview" label="Interview" mobile />
          <GlowLink to="/resume-match" label="Resume Match" mobile />
          <GlowLink to="/dashboard" label="Dashboard" mobile />
          <Link
            to="/signin"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

// 🔹 Reusable link with glow effect
const GlowLink = ({ to, label, mobile }) => (
  <Link
    to={to}
    className={`text-gray-700 hover:text-blue-600 transition ${
      mobile ? "block text-sm py-1" : "relative group"
    }`}
  >
    {label}
    {!mobile && (
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
    )}
  </Link>
);

export default Navbar;
