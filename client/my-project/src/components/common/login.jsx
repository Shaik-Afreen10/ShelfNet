import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("User"); 
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  // 🔹 Dynamic API Base URL Setup modified for Vercel Environment Variables
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8060';

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsSuccess(false);

    try {
      // 🛠️ Added .toLowerCase() to match your standard backend Express router patterns
      const response = await axios.post(`${BACKEND_URL}/api/${role.toLowerCase()}/login`, {
        email: email,
        pass: pass,
      });

      setMessage(response.data?.message || "Login successful!");
      setIsSuccess(true);
      
      const token = response.data.token;
      if (role === "Admin" && token) {
        localStorage.setItem('adminToken', token);
        setTimeout(() => navigate("/adminUi/dashboard"), 1000);
      } else if (role === "User" && token) {
        localStorage.setItem('userToken', token);
        setTimeout(() => navigate("/bookshelf"), 1000);
      }

    } catch (err) {
      console.error("Login API error:", err);
      setMessage(
        "Login failed: " + (err.response?.data?.message || err.message)
      );
      setIsSuccess(false);
    }
  };

  return (
    <div className="relative h-screen flex justify-center items-center p-4 overflow-hidden font-[Raleway]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Raleway:ital,wght@0,300;0,400;1,300&display=swap');
          .font-\\[Pacifico\\] { font-family: 'Pacifico', cursive; }
          .font-\\[Raleway\\] { font-family: 'Raleway', sans-serif; }
        `}
      </style>

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop')`,
          filter: "grayscale(40%) brightness(70%)",
          zIndex: 0,
        }}
      ></div>

      <div className="absolute inset-0 bg-black/40 z-1"></div>

      <div className="absolute top-8 left-8 text-white z-20">
        <h1 className="text-6xl font-[Pacifico] tracking-wider [text-shadow:2px_2px_5px_rgba(0,0,0,0.8)]">
          ShelfNet
        </h1>
        <p className="text-2xl font-[Raleway] mt-2 italic [text-shadow:1px_1px_3px_rgba(0,0,0,0.7)]">
          Where stories live forever
        </p>
      </div>

      <Link
        to="/"
        className="absolute top-8 right-8 z-20 flex items-center text-amber-300 hover:text-amber-100 transition-colors duration-200 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Home
      </Link>

      <form
        className="relative z-20 p-8 bg-black/50 rounded-xl shadow-2xl max-w-md w-full border border-amber-400"
        onSubmit={handleLogin}
      >
        <h2 className="text-amber-400 text-4xl mb-8 font-serif text-center font-bold">
          Sign In
        </h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="text"
          placeholder="Email"
          className="w-full p-3 my-2 rounded-lg bg-black/60 text-amber-50 placeholder-white border border-amber-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200"
        />

        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
          type="password"
          placeholder="Password"
          className="w-full p-3 my-2 rounded-lg bg-black/60 text-amber-50 placeholder-white border border-amber-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200"
        />
        
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 my-2 rounded-lg bg-black/60 text-amber-50 placeholder-white border border-amber-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-linear-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 p-4 my-6 text-white text-xl rounded-lg w-full font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Sign In
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-lg font-medium ${
              isSuccess ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <div className="text-amber-200 mt-6 text-center text-lg">
          Don’t have an account?{" "}
          <Link
            to="/userui/register"
            className="text-amber-50 hover:underline font-semibold"
          >
            Sign Up now.
          </Link>
        </div>
      </form>

      <footer className="absolute bottom-0 w-full z-20 text-center text-amber-200/70 py-4 border-t border-amber-200">
        <p>&copy; 2026 ShelfNet. All rights reserved.</p>
      </footer>
    </div>
  );
}