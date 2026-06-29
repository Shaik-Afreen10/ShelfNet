import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import real Link and new useEffect/useNavigate

export default function Bookshelf() {
  
  // --- State to manage authentication ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // For loading state

  // --- Your existing mock data and state (Complete List) ---
  const [books] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://m.media-amazon.com/images/I/71FTb9X6wsL._SY466_.jpg",
      year: 1925,
      desc: "A millionaire's obsessive love for a woman from his past.",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "https://m.media-amazon.com/images/I/71Q1tPupKjL._SY466_.jpg",
      year: 1813,
      desc: "The spirited Elizabeth Bennet navigates societal expectations and love.",
      rating: 4.8,
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "https://m.media-amazon.com/images/I/81aY1lxk+9L._SY466_.jpg",
      year: 1960,
      desc: "A lawyer defends a black man in the racially charged American South.",
      rating: 4.9,
    },
    {
      id: 4,
      title: "1984",
      author: "George Orwell",
      cover: "https://www.eourmart.com/cdn/shop/products/51FXP6S8wWS.jpg?v=1639834548",
      year: 1949,
      desc: "A man's struggle for truth and freedom in a totalitarian state.",
      rating: 4.7,
    },
    {
      id: 5,
      title: "The Book Thief",
      author: "Markus Zusak",
      cover: "https://m.media-amazon.com/images/I/91JGwQlnu7L.jpg",
      year: 2005,
      desc: "A young girl finds solace in stealing books during Nazi Germany.",
      rating: 4.6,
    },
    {
      id: 6,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKR3w66-MpkXqbj4Ue5WqGrkREOgx2SX6jg&s",
      year: 1951,
      desc: "A few days in the life of a disillusioned teenager, Holden Caulfield.",
      rating: 4.3,
    },
    {
      id: 7,
      title: "The Immortals of Meluha",
      author: "Amish Tripathi",
      cover: "https://m.media-amazon.com/images/I/818bGgNn0EL.jpg",
      year: 2010,
      desc: "A Tibetan immigrant is revered as a god in the land of Meluha.",
      rating: 4.7,
    },
    {
      id: 8,
      title: "The God of Small Things",
      author: "Arundhati Roy",
      cover: "https://m.media-amazon.com/images/I/91saO95VziL._AC_UF1000,1000_QL80_.jpg",
      year: 1997,
      desc: "The story of fraternal twins whose lives are destroyed by love laws.",
      rating: 4.6,
    },
    {
      id: 9,
      title: "Train to Pakistan",
      author: "Khushwant Singh",
      cover: "https://upload.wikimedia.org/wikipedia/en/b/be/Train_to_Pakistan.jpg",
      year: 1956,
      desc: "A tale of love and horror set during the 1947 partition of India.",
      rating: 4.5,
    },
    {
      id: 10,
      title: "Godaan (गोदान)",
      author: "Munshi Premchand",
      cover: "https://m.media-amazon.com/images/I/61SqBrWGb2L._AC_UF1000,1000_QL80_.jpg",
      year: 1936,
      desc: "A classic Hindi novel depicting the socio-economic struggles of village life.",
      rating: 4.8,
    },
    {
      id: 11,
      title: "Malgudi Days",
      author: "R. K. Narayan",
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTulrEGkFIdYP_imbKCXb3rCiXTESHbTelp-g&s",
      year: 1943,
      desc: "Short stories set in the fictional South Indian town of Malgudi.",
      rating: 4.4,
    },
    {
      id: 12,
      title: "The White Tiger",
      author: "Aravind Adiga",
      cover: "https://m.media-amazon.com/images/I/71Nes-1tfPL._AC_UF1000,1000_QL80_.jpg",
      year: 2008,
      desc: "A dark-humored story of a poor Indian villager's rise to success.",
      rating: 4.5,
    },
    {
      id: 13,
      title: "Midnight's Children",
      author: "Salman Rushdie",
      cover: "https://shorturl.at/EVDAz",
      year: 1981,
      desc: "A man born at India's independence is linked to other 'midnight's children'.",
      rating: 4.2,
    },
    {
      id: 14,
      title: "The Palace of Illusions",
      author: "Chitra Banerjee Divakaruni",
      cover: "https://m.media-amazon.com/images/I/51HkhnXXvLL._UF1000,1000_QL80_.jpg",
      year: 2008,
      desc: "The epic Mahabharata retold from the perspective of Draupadi.",
      rating: 4.7,
    },
    {
      id: 15,
      title: "Asura: Tale of the Vanquished",
      author: "Anand Neelakantan",
      cover: "https://imgv2-2-f.scribdassets.com/img/word_document/423779357/original/19205cf38b/1?v=1",
      year: 2012,
      desc: "The epic Ramayana told from the perspective of Ravana and his people.",
      rating: 4.6,
    },
    {
      id: 16,
      title: "x",
      author: "R. K. Narayan",
      cover: "https://m.media-amazon.com/images/I/71UseLsa-CL._AC_UF1000,1000_QL80_.jpg",
      year: 1958,
      desc: "A tour guide who is mistaken for a spiritual guru.",
      rating: 4.4,
    },
    {
      id: 17,
      title: "Half Girlfriend",
      author: "Chetan Bhagat",
      cover: "https://m.media-amazon.com/images/I/712HEn9SNwL.jpg",
      year: 2014,
      desc: "A boy from rural Bihar falls in love with a high-society girl from Delhi.",
      rating: 4.0,
    },
    {
      id: 18,
      title: "Amrutham Kurisina Rathri (అమృతం...)",
      author: "D. Balagangadhara Tilak",
      cover: "https://pbs.twimg.com/media/EWRueasU8Acd1x8.jpg:large",
      year: 1968,
      desc: "A landmark collection of modern Telugu poetry.",
      rating: 4.3,
    },
    {
      id: 19,
      title: "Kanyasulkam (కన్యాశుల్కం)",
      author: "Gurajada Apparao",
      cover: "https://images-eu.ssl-images-amazon.com/images/I/91PkDeIA7gL._AC_UL900_SR615,900_.jpg",
      year: 1892,
      desc: "A pioneering Telugu play that satirizes the regressive 'Kanyasulkam' practice.",
      rating: 4.8,
    },
    {
      id: 20,
      title: "Veyi Padagalu (వేయి పడగలు)",
      author: "Viswanatha Satyanarayana",
      cover: "https://www.hindueshop.com/wp-content/uploads/2021/08/Thousand-hoods-Veyyi-padagalu.jpg",
      year: 1934,
      desc: "A classic Telugu epic reflecting the decline of traditional values.",
      rating: 4.7,
    },
    {
      id: 21,
      title: "Amma Dairy Lo Konni Pageelu (అమ్మ డైరీలో కొన్ని పేజీలు)",
      author: "Ravi Manthi",
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0eUelRZWMhhqMtkWmsImS4JCQzMwxIYJBXA&s",
      year: 2024,
      desc: "A heartfelt exploration of a mother's inner world, capturing her unspoken emotions, desires, and the complexities of her relationships",
      rating: 4.89,
    },
    {
      id: 22,
      title: "Dheera Sameere Ganga Teere (ధీర సమీరే గంగాతీరే)",
      author: "Ravi Mantri",
      cover: "https://images.meesho.com/images/products/607008748/zmrrb_512.webp?width=512",
      year: 2025,
      desc: "Telugu novel that delves into themes of love, spirituality, and self-discovery",
      rating: 4.7,
    },
  ]);
  const [favouriteBooks, setFavouriteBooks] = useState(new Set());

  // --- Check for login token on component load ---
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    }
    setIsCheckingAuth(false); // Finished checking
  }, []);

  // Your existing toggle function (Unchanged)
  const toggleFavourite = (bookId) => {
    setFavouriteBooks((prevFavourites) => {
      const newFavourites = new Set(prevFavourites);
      if (newFavourites.has(bookId)) {
        newFavourites.delete(bookId);
      } else {
        newFavourites.add(bookId);
      }
      return newFavourites;
    });
  };

  // --- Conditional Rendering ---

  // Show a blank/loading screen while checking auth
  if (isCheckingAuth) {
    return (
      <div className="relative min-h-screen" 
           style={{ backgroundColor: '#1a1a1a' }}>
        {/* You can put a loading spinner here */}
      </div>
    );
  }

  // If not logged in, show the "Please Login" prompt
  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen flex items-center justify-center text-white p-6 font-[Raleway]">
        {/* Style tag (same as your bookshelf) */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Raleway:ital,wght@0,300;0,400;1,300&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
          `}
        </style>
        
        {/* Background (same as your bookshelf) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop')`,
            filter: "brightness(65%) saturate(80%) blur(1px)",
            zIndex: 0,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50 z-1"></div>

        {/* The Login Prompt Card */}
        <div className="relative z-2 max-w-lg w-full text-center p-8 bg-black/50 border border-amber-400 rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-[Pacifico] text-amber-400 mb-6">
            Access Denied
          </h1>
          <p className="text-xl font-light text-gray-200 mb-8 italic">
            You must be logged in to view your bookshelf.
          </p>
          <Link
            to="/login"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Go to Login Page
          </Link>
        </div>

        {/* Footer (same as your bookshelf) */}
        <footer className="absolute bottom-0 w-full z-20 text-center text-amber-200/70 py-4 border-t border-amber-400/30">
          <p>&copy; 2025 ShelfNet. All rights reserved.</p>
          <p className="text-sm mt-2">Where stories live forever.</p>
        </footer>
      </div>
    );
  }

  // --- If logged in, show the bookshelf (Your existing code) ---
  return (
    <div className="relative min-h-screen text-white overflow-hidden p-6 font-[Raleway]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Raleway:ital,wght@0,300;0,400;1,300&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        `}
      </style>

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop')`,
          filter: "brightness(65%) saturate(80%) blur(1px)",
          zIndex: 0,
        }}
      ></div>
      <div className="absolute inset-0 bg-black/50 z-1"></div>

      <div className="relative z-2 max-w-7xl mx-auto py-12 px-4">
        {/* Back & Profile Buttons (Uses the REAL Link) */}
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="flex items-center text-amber-300 hover:text-amber-100 transition-colors duration-200 group"
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

          <div className="flex justify-end items-center space-x-4 mb-8">
            <Link
              to="/profile" // (Uses the REAL Link)
              className="text-amber-300 hover:text-amber-100 transition-colors duration-200"
              title="User Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A7.963 7.963 0 0112 15a7.963 7.963 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-[Pacifico] text-amber-400 mb-8 text-center">
          My Bookshelf
        </h1>
        <p className="text-lg md:text-xl font-light text-gray-200 mb-12 max-w-3xl mx-auto text-center italic">
          Explore your favorite reads and discover new stories that inspire you.
        </p>

        {/* Books Grid (Uses your mock data) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="relative bg-black/40 border border-amber-400 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300 flex flex-col"
            >
              {/* Favourite Button */}
              <button
                onClick={() => toggleFavourite(book.id)}
                className="absolute top-3 right-2 z-10 text-white hover:text-red-500 transition-colors text-2xl"
                title={favouriteBooks.has(book.id) ? "Remove from favourites" : "Add to favourites"}
              >
                {favouriteBooks.has(book.id) ? "💖" : "ㅤ♡"}
              </button>

              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/400x600/2a1a0c/f7b731?text=Book+Cover";
                }}
              />

              <div className="p-5 grow flex flex-col">
                <h2 className="text-xl font-[Playfair_Display] font-bold text-amber-300 mb-2">
                  {book.title}
                </h2>
                <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                  <p className="italic truncate w-3/4">by {book.author}</p>
                  <p className="font-semibold">{book.year}</p>
                </div>
                <p className="text-gray-300 text-sm font-light grow mb-2">
                  {book.desc}
                </p>
                <p className="text-amber-400 font-semibold">
                  ★ {book.rating.toFixed(1)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-20 pt-8 border-t border-amber-400/30 text-center text-amber-200/70">
          <p>&copy; 2025 ShelfNet. All rights reserved.</p>
          <p className="text-sm mt-2">Where stories live forever.</p>
        </footer>
      </div>
    </div>
  );
}