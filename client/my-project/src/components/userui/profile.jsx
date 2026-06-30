import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();

  // Centralized Base API URL logic
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8060";

  // State for user data
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for inline editing
  const [editingField, setEditingField] = useState(null); // 'name', 'password', or null
  const [tempValue, setTempValue] = useState("");

  // --- 1. Fetch User Data ---
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem('userToken');
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        navigate('/login');
        return;
      }
      try {
        // CHANGED: Using dynamic baseUrl instead of hardcoded localhost
        const response = await axios.get(`${baseUrl}/api/user/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUser(response.data.data); // Set user data
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(err.response?.data?.message || "Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [navigate, baseUrl]); // Added baseUrl dependency

  // --- 2. Edit Button Handlers ---
  const startEditing = (field) => {
    setEditingField(field);
    // Use an empty string for password to force new entry
    setTempValue(field === 'password' ? '' : user[field]);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue("");
  };

  // --- 3. Save Button Handler (NEEDS BACKEND) ---
  const saveField = async () => {
    if (!tempValue) {
      setError("Field cannot be empty.");
      return;
    }
    
    console.log("Saving field:", editingField, "with value:", tempValue);
    
    // Optimistic UI update
    setUser((prev) => ({ ...prev, [editingField]: editingField === 'password' ? '********' : tempValue }));
    
    setEditingField(null);
    setTempValue("");
    
    // --- TODO: Add axios.patch call here ---
    // try {
    //   const token = localStorage.getItem('userToken');
    //   // CHANGED: Adjusted to use dynamic baseUrl when you decide to uncomment this
    //   await axios.patch(`${baseUrl}/api/user/profile`, 
    //     { [editingField]: tempValue }, // e.g., { name: "New Name" }
    //     { headers: { 'Authorization': `Bearer ${token}` } }
    //   );
    //   setUser((prev) => ({ ...prev, [editingField]: tempValue }));
    //   setEditingField(null);
    // } catch (err) {
    //   setError("Failed to update profile.");
    // }
  };


  // --- 4. Logout Handler ---
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    alert("Logged out successfully!");
    navigate("/");
  };

  // --- 5. Helper to Render Content ---
  const renderProfileContent = () => {
    if (loading) {
      return <h2 className="text-2xl text-white font-semibold">Loading profile...</h2>;
    }
    if (error) {
      return <h2 className="text-2xl text-red-400 font-semibold">{error}</h2>;
    }
    if (!user) {
      return <h2 className="text-2xl text-white font-semibold">Could not load user data.</h2>;
    }

    // --- Profile Card UI ---
    return (
      <div className="relative z-20 max-w-3xl w-full mx-auto bg-black/50 rounded-2xl p-8 shadow-2xl border border-amber-400">
        <h1 className="text-4xl font-[Pacifico] text-amber-400 mb-8 text-center">
          User Profile
        </h1>

        {/* Name Field */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-300 text-sm">Name</p>
            {editingField === "name" ? (
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="rounded-md px-3 py-1 text-black bg-white/90"
                />
                <button onClick={saveField} className="text-green-500 font-bold" title="Save">✔</button>
                <button onClick={cancelEdit} className="text-red-500 font-bold" title="Cancel">✖</button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-lg text-white">{user.name}</p>
                <button onClick={() => startEditing("name")} className="text-amber-300 hover:text-amber-100" title="Edit Name">✏️</button>
              </div>
            )}
          </div>
        </div>

        {/* Email (read-only) */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-300 text-sm">Email</p>
            <p className="text-lg text-white mt-1">{user.email}</p>
          </div>
        </div>

        {/* Password Field */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-300 text-sm">Password</p>
            {editingField === "password" ? (
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="password"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="rounded-md px-3 py-1 text-black bg-white/90"
                  placeholder="Enter new password"
                />
                <button onClick={saveField} className="text-green-500 font-bold" title="Save">✔</button>
                <button onClick={cancelEdit} className="text-red-500 font-bold" title="Cancel">✖</button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-lg text-white">********</p>
                <button onClick={() => startEditing("password")} className="text-amber-300 hover:text-amber-100" title="Change Password">✏️</button>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-6 py-2 font-semibold rounded-full bg-linear-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all"
          >
            Logout
          </button>
          <Link
            to="/bookshelf"
            className="w-full sm:w-auto text-center px-6 py-2 font-semibold rounded-full border border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-black transition-all"
          >
            Back to Bookshelf
          </Link>
        </div>
      </div>
    );
  };

  // --- 6. Main Render (Theme) ---
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 font-[Raleway] overflow-hidden">
      {/* Global Styles */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Raleway:ital,wght@0,300;0,400;1,300&display=swap');`}</style>

      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop')`,
          filter: "grayscale(40%) brightness(70%)",
          zIndex: 0,
        }}
      ></div>

      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-black/40 z-1"></div>

      {/* Content */}
      {renderProfileContent()}

      {/* Footer */}
      <footer className="absolute bottom-0 w-full z-20 text-center text-amber-200/70 py-4 border-t border-amber-200/50">
        <p>&copy; 2026 ShelfNet. All rights reserved.</p>
        <p className="text-sm mt-1">Where stories live forever.</p>
      </footer>
    </div>
  );
}