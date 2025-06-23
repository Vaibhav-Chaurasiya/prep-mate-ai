import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Login to PrepMate</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
        >
          Login
        </button>
        <p className="text-sm mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
