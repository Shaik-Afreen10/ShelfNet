import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBook = () => {
  // --- Form States ---
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState(''); // <-- 1. Add author state
  const [year, setYear] = useState('');
  const [desc, setDesc] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [genreId, setGenreId] = useState('');

  // --- State for Genre Dropdown ---
  const [genres, setGenres] = useState([]);
  
  // --- Other States ---
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- Fetch Genres (Unchanged) ---
  useEffect(() => {
    const fetchGenres = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setMessage("You must be logged in to load genres.");
        setIsSuccess(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:8060/api/admin/viewGenre', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setGenres(response.data.data || []);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setMessage("Could not load genres.");
        setIsSuccess(false);
      }
    };
    fetchGenres();
  }, []);

  const handleSaveBook = async (e) => {
    e.preventDefault();
    
    if (!genreId) {
       setMessage("Please select a genre.");
       setIsSuccess(false);
       return;
    }

    const data = {
      title,
      author, // <-- 2. Add author to data
      year: parseInt(year),
      desc,
      bannerUrl,
      genreId,
    };

    setLoading(true);
    setMessage(null);
    const token = localStorage.getItem('adminToken');

    try {
      await axios.post('http://localhost:8060/api/admin/addBooks', data, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      setLoading(false);
      setIsSuccess(true);
      setMessage(`Book "${title}" added successfully!`);

      // Clear the form
      setTitle('');
      setAuthor(''); // <-- 3. Clear author field
      setYear('');
      setDesc('');
      setBannerUrl('');
      setGenreId('');

    } catch (error) {
      setLoading(false);
      setIsSuccess(false);
      setMessage(error.response?.data?.message || 'An error occurred.');
      console.error('Error saving book:', error);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-amber-200/50">
      
      <h1 className="text-3xl font-bold text-amber-900 mb-6 text-center">Add New Book</h1>

      <form onSubmit={handleSaveBook} className="space-y-4">
        
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-stone-700">Title</label>
          <input
            type="text" id="title" value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-3 rounded-lg bg-white text-stone-900 border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            required
          />
        </div>

        {/* --- 4. Author Field (NEW) --- */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-stone-700">Author</label>
          <input
            type="text" id="author" value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full p-3 rounded-lg bg-white text-stone-900 border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            required
          />
        </div>

        {/* Year & Genre (side-by-side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-stone-700">Year</label>
            <input
              type="number" id="year" value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g., 1997"
              className="mt-1 block w-full p-3 rounded-lg bg-white text-stone-900 border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-stone-700">Genre</label>
            <select
              id="genre"
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
              className="mt-1 block w-full p-3 rounded-lg bg-white text-stone-900 border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              required
            >
              <option value="" disabled>Select a genre</option>
              {genres.length > 0 ? (
                genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading genres...</option>
              )}
            </select>
          </div>
        </div>
        
        {/* Description Field */}
        <div>
          <label htmlFor="desc" className="block text-sm font-medium text-stone-700">Description</label>
          <textarea
            id="desc" rows="4" value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 block w-full p-3 rounded-lg bg-white text-stone-900 border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            required
          />
        </div>

        {/* Book Cover URL Field */}
        <div>
          <label htmlFor="bannerUrl" className="block text-sm font-medium text-stone-700">
            Book Cover URL (bannerUrl)
          </label>
          <input
            type="text" id="bannerUrl" value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            placeholder="https://..."
            className="mt-1 block w-full p-3 rounded-lg bg-white text-stone-900 border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
        
        {/* Message Display */}
        {message && (
          <div className={`text-center p-2 rounded-lg ${isSuccess ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'}`}>
            {message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 rounded-lg shadow-md text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-gray-400"
        >
          {loading ? 'Saving...' : 'Save Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBook;