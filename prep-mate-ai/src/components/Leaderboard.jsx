import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const q = query(collection(db, "users"), orderBy("xp", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setUsers(data);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">🏆 Leaderboard</h2>
      <ul className="divide-y divide-gray-200">
        {users.map((user, index) => (
          <li key={index} className="py-2 flex justify-between text-gray-700">
            <span>{index + 1}. {user.email}</span>
            <span>{user.xp} XP</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
