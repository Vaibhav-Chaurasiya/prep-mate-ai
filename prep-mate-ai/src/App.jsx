import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Interview from './pages/Interview';
import Dashboard from './pages/Dashboard';
import ResumeMatch from './pages/ResumeMatch'; // 🆕 import

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/resume-match" element={<ResumeMatch />} /> {/* 🆕 route */}

          {/* 🔐 Protected Route for Logged-in Users Only */}
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
    </Router>
  );
}

export default App;
