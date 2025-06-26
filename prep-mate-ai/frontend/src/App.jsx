import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Home from "./pages/Home";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Interview from "./pages/Interview";
import Dashboard from "./pages/Dashboard";
import ResumeMatch from "./pages/ResumeMatch";
import ForgotPassword from "./pages/ForgotPassword"; // ✅ Moved correctly here

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/resume-match" element={<ResumeMatch />} />
            <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ FIXED */}

            {/* 🔐 Protected Route */}
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

        <Footer />
      </div>
    </Router>
  );
}

export default App;
