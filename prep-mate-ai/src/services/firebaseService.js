import { db } from "../firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

// 📝 Save Interview Feedback
export const saveFeedback = async (userId, data) => {
  try {
    const docRef = collection(db, "interview_feedback");
    await addDoc(docRef, {
      userId,
      role: data.role,
      question: data.question,
      answer: data.answer,
      feedback: data.feedback,
      improvedAnswer: data.improvedAnswer,
      xp: data.xp,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error saving feedback:", error);
  }
};

// 📥 Get User Feedback History
export const getUserFeedback = async (userId) => {
  try {
    const q = query(
      collection(db, "interview_feedback"),
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
};
