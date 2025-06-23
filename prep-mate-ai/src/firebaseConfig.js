import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCr9W25fpLTsMynTyRoDnBU49OF9OzBl5s",
  authDomain: "prepmate-ai-b5cb7.firebaseapp.com",
  projectId: "prepmate-ai-b5cb7",
  storageBucket: "prepmate-ai-b5cb7.appspot.com",
  messagingSenderId: "271901904613",
  appId: "1:271901904613:web:69c94c10167a134f0b8e0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);
