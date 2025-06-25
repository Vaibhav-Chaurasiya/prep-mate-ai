import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
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
    };

    fetchData();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {username}
          </h2>
        </div>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

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
