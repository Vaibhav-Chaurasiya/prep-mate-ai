import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import XPProgressChart from "../components/XPProgressChart";

function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  // Dummy XP Data (future: use Firebase or LocalStorage)
  const xpData = [
    { session: "1", xp: 10 },
    { session: "2", xp: 30 },
    { session: "3", xp: 50 },
    { session: "4", xp: 70 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Welcome, {currentUser?.email}</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <XPProgressChart data={xpData} />
    </div>
  );
}

export default Dashboard;
