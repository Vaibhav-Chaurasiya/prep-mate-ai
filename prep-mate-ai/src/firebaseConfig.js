import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCr9W25fpLTsMynTyRoDnBU49OF9OzBl5s",
  authDomain: "prepmate-ai-b5cb7.firebaseapp.com",
  projectId: "prepmate-ai-b5cb7",
  storageBucket: "prepmate-ai-b5cb7.firebasestorage.app",
  messagingSenderId: "271901904613",
  appId: "1:271901904613:web:69c94c10167a134f0b8e0c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
