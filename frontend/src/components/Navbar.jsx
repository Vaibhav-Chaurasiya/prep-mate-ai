import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const getInitials = (email) => {
    if (!email) return "U";
    return email[0].toUpperCase();
  };

  return (
    <nav className="bg-[#0f111acc] backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-yellow-400 tracking-wide">
          PrepMate<span className="text-white"> AI</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
          <GlowLink to="/" label="Home" />
          <GlowLink to="/interview" label="Interview" />
          <GlowLink to="/resume-match" label="Resume Match" />
          <GlowLink to="/business" label="Business" />
          <GlowLink to="/dashboard" label="Dashboard" />

          {currentUser ? (
            <>
              {/* Profile Image or Initials */}
              <div
                onClick={() => navigate("/dashboard")}
                className="cursor-pointer w-9 h-9 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center hover:opacity-80 transition"
                title="Go to Dashboard"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  getInitials(currentUser.email)
                )}
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-1 rounded shadow font-semibold transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-white">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-[#0f111acc] backdrop-blur-md text-white">
          <GlowLink to="/" label="Home" mobile />
          <GlowLink to="/interview" label="Interview" mobile />
          <GlowLink to="/resume-match" label="Resume Match" mobile />
          <GlowLink to="/business" label="Business" mobile />
          <GlowLink to="/dashboard" label="Dashboard" mobile />
          {currentUser ? (
            <>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/dashboard");
                }}
                className="block w-full text-left px-4 py-2 rounded hover:bg-gray-700"
              >
                👤 Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-center font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="block w-full bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded text-center font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

// 🔹 Reusable link with glow effect
const GlowLink = ({ to, label, mobile }) => (
  <Link
    to={to}
    className={`hover:text-yellow-400 transition-all duration-200 ease-in-out ${
      mobile ? "block text-sm py-1" : "relative group"
    }`}
  >
    {label}
    {!mobile && (
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300 rounded-full"></span>
    )}
  </Link>
);

export default Navbar;
