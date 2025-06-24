import { db } from "../firebaseConfig";
import {
  collection, addDoc, query, where, getDocs, Timestamp, doc, setDoc, getDoc
} from "firebase/firestore";

// Save feedback and update XP
export const saveFeedback = async (userId, data) => {
  try {
    const docRef = collection(db, "interview_feedback");
    await addDoc(docRef, {
      userId,
      role: data.role,
      question: data.question,
      answer: data.answer,
      feedback: data.feedback,
      score: data.score,
      xp: data.xp,
      createdAt: Timestamp.now(),
    });

    const userDocRef = doc(db, "users", userId);
    const userSnap = await getDoc(userDocRef);
    let currentXP = 0;
    if (userSnap.exists()) {
      currentXP = userSnap.data().xp || 0;
    }
    await setDoc(userDocRef, { xp: currentXP + data.xp }, { merge: true });
  } catch (error) {
    console.error("Error saving feedback:", error);
  }
};

// Get individual user history
export const getUserFeedback = async (userId) => {
  try {
    const q = query(collection(db, "interview_feedback"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return [];
  }
};

// Get leaderboard
export const getLeaderboard = async () => {
  try {
    const q = query(collection(db, "users"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a, b) => b.xp - a.xp);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
};
