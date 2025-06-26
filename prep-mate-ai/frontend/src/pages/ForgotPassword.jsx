// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your inbox for password reset instructions.");
    } catch (error) {
      setMessage("Failed to send reset email: " + error.message);
    }
  };

  return (
    <div className="forgot-container">
      <form onSubmit={handleReset} className="forgot-form">
        <h2>Reset Your Password</h2>
        <p className="subtitle">Enter your email to receive reset instructions</p>

        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send Reset Email</button>

        {message && <p className="message">{message}</p>}

        <p className="back">
          <Link to="/signin">Back to Login</Link>
        </p>
      </form>
    </div>
  );
}
