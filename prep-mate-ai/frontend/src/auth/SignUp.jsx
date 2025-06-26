import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./SignUp.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: username,
        xp: 0,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="branding-content">
          <div className="logo-section">
            <div className="logo-text">PrepMate AI</div>
            <div className="tagline">for Interview Prep & Coaching</div>
          </div>
          <h1 className="main-title">
            Create your account<br />to start practicing
          </h1>
          <div className="contact-section">
            Already have an account?
            <Link to="/signin" className="contact-link">Log In</Link>
          </div>
        </div>
      </div>

      <div className="signup-right">
        <form onSubmit={handleSignup} className="signup-form-container">
          <h2 className="form-title">Sign Up</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />

          <button type="submit" className="signup-btn">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
