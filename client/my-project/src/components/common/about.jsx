import backgroundImage from "../../assets/bs.jpg";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* 🔹 Background Layer (only this gets dull effect) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          filter: "brightness(60%) saturate(80%) blur(1px)",
          zIndex: 0,
        }}
      ></div>

      {/* 🔹 Overlay for mood */}
      <div className="absolute inset-0 bg-black/50 z-1"></div>

      {/* 🔹 Content Section */}
      <div className="relative z-2 max-w-4xl p-10 bg-black/40 rounded-2xl shadow-2xl border border-amber-500 text-center">
        <h1 className="text-5xl font-[Pacifico] mb-6 text-amber-400 [text-shadow:2px_2px_6px_rgba(0,0,0,0.8)]">
          About ShelfNet
        </h1>

        <p className="text-lg font-[Raleway] leading-relaxed text-gray-100 mb-6">
          Welcome to <span className="text-amber-300 font-semibold">ShelfNet</span> — a digital haven for book lovers, storytellers, and readers from around the world.
          Our platform is built on the simple belief that every story deserves a shelf, and every reader deserves a place to find their next favorite tale.
        </p>

        <p className="text-lg font-[Raleway] leading-relaxed text-gray-100 mb-6">
          Whether you're exploring timeless classics, discovering hidden literary gems, or curating your personal digital library, ShelfNet is designed to make reading more immersive and connected than ever before.
        </p>

        <p className="text-lg font-[Raleway] leading-relaxed text-gray-100 mb-6">
          Join our growing community of passionate readers and let your imagination run free — because here, <span className="italic text-amber-300">stories live forever.</span>
        </p>

        <div className="flex justify-center mt-10">
          <Link
            to="/"
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
        <footer className="mt-20 pt-8 border-t border-amber-400/30 text-center text-amber-200/70">
          <p>&copy; 2025 ShelfNet. All rights reserved.</p>
          <p className="text-sm mt-2">Where stories live forever.</p>
        </footer>
      </div>
    </div>
    
  );
}
