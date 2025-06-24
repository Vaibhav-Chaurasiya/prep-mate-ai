import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // ✅ include navbar
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Home from "./pages/Home";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Interview from "./pages/Interview";
import Dashboard from "./pages/Dashboard";
import ResumeMatch from "./pages/ResumeMatch"; // ✅ new route
import Footer from "./components/Footer"; // optional

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Navbar /> {/* ✅ always visible at top */}

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/resume-match" element={<ResumeMatch />} />

            {/* 🔐 Protected route */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>

        <Footer /> {/* ✅ optional: if you want a sticky footer */}
      </div>
    </Router>
  );
}

export default App;
