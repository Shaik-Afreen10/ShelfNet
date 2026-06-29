import React from "react";
import { Link } from "react-router-dom"; 

// Renamed to 'MainContent' to match your import in main.jsx
export default function MainContent() {
  // No state or logic needed for this page

  return (
    <div 
      className="min-h-screen flex flex-col"
      // Apply the gradient background from the image
      style={{ background: 'linear-gradient(to right, #8B4513, #D2B48C)' }}
    >
      {/* Header */}
      <header className="w-full bg-[#8B4500]/80 shadow-md sticky top-0 z-10">
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-between items-center">
            {/* Logo/Title based on screenshot */}
            <div className="text-xl sm:text-3xl font-bold font-serif tracking-wide flex items-center mb-2 sm:mb-0">
              {/* SVG Logo from the screenshot */}
              <svg className="h-6 w-6 sm:h-7 sm:w-7 mr-2 shrink-0" viewBox="0 0 85 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="skewX(-10)">
                  <rect x="0" y="10" width="18" height="80" rx="4" fill="#3B82F6"/>
                  <rect x="22" y="10" width="18" height="80" rx="4" fill="#22C55E"/>
                  <rect x="44" y="10" width="18" height="80" rx="4" fill="#FACC15"/>
                  <rect x="66" y="10" width="18" height="80" rx="4" fill="#EF4444"/>
                </g>
              </svg>
              
              {/* Gradient text for "ShelfNet" */}
              <div className="text-center mt-6">
  {/* ShelfNet Title */}
  <h1 className="text-5xl font-[Pacifico] text-amber-400">
    ShelfNet
  </h1>

  {/* Caption below */}
  <p className="text-sm text-gray-200 mt-2 italic">
    Where stories live forever
  </p>
</div>

            </div>
            {/* Nav Links -- Using <a> tags for direct preview compatibility */}
            <div className="flex space-x-3 sm:space-x-6 text-white font-semibold font-sans text-sm sm:text-base">
              <a href="/" className="hover:text-yellow-200 transition-colors">Home</a>
              <a href="/login" className="hover:text-yellow-200 transition-colors">Login</a>
              <a href="/userui/register" className="hover:text-yellow-200 transition-colors">Register</a>
              <a href="/about" className="hover:text-yellow-200 transition-colors">About</a>
              <a href="/bookshelf" className="hover:text-yellow-200 transition-colors">BookShelf</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grow flex flex-col items-center justify-center p-4 sm:p-6 text-center">
        
        {/* Welcome Title from the image */}
        <h1 
          className="text-5xl sm:text-6xl font-bold font-serif text-white mb-10"
          style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.6)' }}
        >
          Welcome to ShelfNet
        </h1>

        {/* Login and Register Buttons from the image */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
          {/* Changed to <a> tags for direct preview compatibility */}
          <a href="/login"
            className="px-10 py-3 text-lg text-center text-white rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
            style={{
              background: 'linear-gradient(to right, #8B4513, #A0522D)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            Login
          </a>
          
          <a href="/userui/register" 
            className="px-10 py-3 text-lg text-center text-white rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
            style={{
              background: 'linear-gradient(to right, #8B4513, #A0522D)', // Corrected from 8B4IS
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            Register
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#8B4513]/80 py-3 shadow-inner mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white text-sm font-sans">
            © 2025 ShelfNet Library — Where Stories Live Forever 📚
          </p>
        </div>
      </footer>
    </div>
  );
}

