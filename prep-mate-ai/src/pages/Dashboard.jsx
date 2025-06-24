import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import XPProgressChart from "../components/XPProgressChart";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

// Badge logic
const getBadge = (xp) => {
  if (xp >= 300) return { label: "Expert", icon: "🔥" };
  if (xp >= 100) return { label: "Intermediate", icon: "🚀" };
  return { label: "Beginner", icon: "🌱" };
};

function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [xpData, setXpData] = useState([]);
  const [totalXp, setTotalXp] = useState(0);
  const [username, setUsername] = useState("");

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  useEffect(() => {
    const fetchData = async () => {
      // Get Username from users collection
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        setUsername(userDoc.data().username);
      }

      // Get user interview feedback from interview_feedback collection
      const q = query(collection(db, "interview_feedback"), where("userId", "==", currentUser.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setHistory(data);

      // XP Calculation
      const chart = data.map((item, index) => ({
        session: `#${index + 1}`,
        xp: item.xp || 10,
      }));
      setXpData(chart);

      const total = data.reduce((sum, item) => sum + (item.xp || 0), 0);
      setTotalXp(total);
    };

    fetchData();
  }, [currentUser]);

  const badge = getBadge(totalXp);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {username}
          </h2>
          <div className="flex items-center gap-2 mt-2 bg-green-100 text-green-800 px-3 py-1 rounded font-medium">
            XP: {totalXp}
            <span className={`px-2 py-1 text-xs rounded font-semibold ${
                badge.label === "Expert"
                  ? "bg-red-100 text-red-600"
                  : badge.label === "Intermediate"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}>
              {badge.icon} {badge.label}
            </span>
          </div>
        </div>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <XPProgressChart data={xpData} />

      <h3 className="text-xl font-bold mt-10 mb-3 text-gray-800">
        📜 Feedback History
      </h3>
      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((item, i) => (
            <div key={i} className="p-4 bg-white rounded shadow">
              <p><b>Role:</b> {item.role}</p>
              <p><b>Question:</b> {item.question}</p>
              <p><b>Answer:</b> {item.answer}</p>
              <p><b>Feedback:</b> {item.feedback}</p>
              <p><b>XP Earned:</b> {item.xp}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No feedback submitted yet.</p>
      )}
    </div>
  );
}

export default Dashboard;
