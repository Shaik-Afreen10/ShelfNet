// Registration Form
import backgroundImage from "../../assets/bs.jpg";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [role, setRole] = useState("User");
  
  // --- States for messages ---
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState(null); // <-- For password errors

  // --- 1. Password Validation Regex ---
  // Min 8, Max 15, 1 uppercase, 1 lowercase, 1 digit, 1 special char
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // --- 2. Clear all previous messages ---
    setValidationError(null);
    setMessage(null);
    setIsSuccess(false);

    // --- 3. Client-Side Validation ---
    if (pass !== confirmPass) {
      setValidationError("Passwords do not match!");
      return;
    }

    if (!passwordRegex.test(pass)) {
      setValidationError(
        "Password must be 8-15 chars with 1 uppercase, 1 lowercase, 1 digit, & 1 special char."
      );
      return;
    }

    // --- 4. If validation passes, proceed to API call ---
   // --- 4. If validation passes, proceed to API call ---
    try {
      // Uses the environment variable if available, otherwise defaults to localhost for your computer
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8060";
      
      const response = await axios.post(
        `${baseUrl}/api/user/register`,
        {
          name: name,
          email: email,
          pass: pass,
          role: "User",
        }
      );

      setMessage(
        response.data?.message || "Registration successful! You can now log in."
      );
      setIsSuccess(true);
      setValidationError(null); // Clear validation error on success

      // Clear form
      setname("");
      setEmail("");
      setPass("");
      setConfirmPass("");

    } catch (err) {
      console.error("Registration API error:", err);
      // This will show "Email already in use" if that's what the server sends
      setMessage(
        "Registration failed: " + (err.response?.data?.message || err.message)
      );
      setIsSuccess(false);
    }
  };

  return (
    <div className="relative h-screen flex justify-center items-center p-4 overflow-hidden">

      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          filter: "grayscale(40%) brightness(70%)",
          zIndex: 0,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-1"></div>

      {/* Logo Section */}
      <div className="absolute top-8 left-8 text-white z-2">
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Home
      </Link>

      {/* Registration Form */}
      <form
        className="relative z-2 p-8 bg-black/50 rounded-xl shadow-2xl max-w-md w-full border border-amber-400"
        onSubmit={handleRegister}
      >
        <h2 className="text-amber-400 text-4xl mb-8 font-serif text-center font-bold">
          Sign Up
        </h2>

        {/* Name Input */}
        <input
          value={name}
          onChange={(e) => setname(e.target.value)}
          required type="text" placeholder="Name"
          className="w-full p-3 my-2 rounded-lg bg-black-100/70 text-amber-50 placeholder-white-200 border border-amber-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200"
        />

        {/* Email Input */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required type="email" placeholder="Email address"
          className="w-full p-3 my-2 rounded-lg bg-black-100/70 text-amber-50 placeholder-white-200 border border-amber-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200"
        />

        {/* Password Input */}
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required type="password" placeholder="Password"
          className="w-full p-3 my-2 rounded-lg bg-black-100/70 text-amber-50 placeholder-white-200 border border-amber-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200"
        />

        {/* Confirm Password Input */}
        <input
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required type="password" placeholder="Confirm Password"
          className="w-full p-3 my-2 rounded-lg bg-black-100/70 text-amber-50 placeholder-white-200 border border-amber-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all duration-200"
        />

        <input type="hidden" value={role} />

        {/* --- 5. Display Validation Error --- */}
        {validationError && (
          <p className="mt-4 text-center text-sm font-medium text-red-400 [text-shadow:0_0_8px_#f87171]">
            {validationError}
          </p>
        )}

        <button
          type="submit"
          className="bg-linear-to-r from-yellow-700 to-yellow-900 hover:from-yellow-800 hover:to-yellow-700 p-4 my-6 text-white text-xl rounded-lg w-full font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Sign Up
        </button>

        {/* --- 6. Display API Success/Error Message --- */}
        {message && (
          <p
            className={`mt-4 text-center text-lg font-medium ${
              isSuccess
                ? "text-green-400 [text-shadow:0_0_8px_#4ade80,0_0_15px_#4ade80]"
                : "text-red-400 [text-shadow:0_0_8px_#f87171,0_0_15px_#f87171]"
            }`}
          >
            {message}
          </p>
        )}

        <div className="text-amber-200 mt-6 text-center text-lg">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-50 hover:underline font-semibold"
          >
            Sign In now.
          </Link>
        </div>
      </form>
       <footer className="absolute bottom-0 w-full z-2 text-center text-amber-200/70 py-4 border-t border-amber-200">
        <p>&copy; 2025 ShelfNet. All rights reserved.</p>
        <p className="text-sm mt-0">Where stories live forever.</p>
      </footer>
    </div>
  );
}