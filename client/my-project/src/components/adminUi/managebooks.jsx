import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]); // <-- 1. Add state for genres
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- State for the Edit Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  // --- 2. Add 'author' and 'genreId' to modal state ---
  const [editFormData, setEditFormData] = useState({ title: '', desc: '', genreId: '' });

  // --- Fetch Books AND Genres ---
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setError("Admin token not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8060/api/admin/viewBooks', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setBooks(response.data.data || []); 
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.response?.data?.message || "Failed to fetch books.");
      }
    };

    // --- 3. Fetch all genres for the dropdown ---
    const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:8060/api/admin/viewGenre', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setGenres(response.data.data || []);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };

    const loadData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([fetchBooks(), fetchGenres()]);
      setLoading(false);
    };
    
    loadData();
  }, []);

  // --- Handler for Delete (Unchanged) ---
  const handleDeleteClick = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`http://localhost:8060/api/admin/book/${bookId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setBooks(books.filter(book => book.id !== bookId));
      } catch (err) {
        console.error("Delete error:", err);
        setError("Failed to delete book.");
      }
    }
  };

  // --- 4. Handlers for Edit Modal (Updated) ---
  const handleEditClick = (book) => {
    setSelectedBook(book);
    setEditFormData({ 
      title: book.title, 
      author: book.author || '', 
      desc: book.desc,
      genreId: book.genreId // Pre-select current genre
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
    setEditFormData({ title: '', author: '', desc: '', genreId: '' });
    setError(null);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModalSave = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      // editFormData now includes author and genreId
      const response = await axios.patch(`http://localhost:8060/api/admin/editBooks/${selectedBook.id}`, editFormData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Update the book in the list with the new data
      setBooks(books.map(book => 
        book.id === selectedBook.id ? response.data.data : book
      ));
      handleModalClose();
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.message || "Failed to update book.");
    }
  };

  if (loading) return <p className="text-center text-amber-700">Loading books...</p>;
 if (error && !isModalOpen)
  return (
    <div className="text-center text-red-600 p-4">
      {typeof error === "string"
        ? error
        : JSON.stringify(error)}
    </div>
  );

  return (
    <>
      {/* --- Main Book Table Card --- */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-amber-200/50">
        <h2 className="text-3xl font-bold text-amber-900 mb-6">Manage Books</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-amber-100">
            <thead className="bg-orange-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Title</th>
                {/* --- 5. UPDATED TABLE HEADERS --- */}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Genre</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Year</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {books.length > 0 ? books.map((book) => (
                <tr key={book.id} className="hover:bg-orange-50/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">{book.title}</td>
                  {/* --- 6. UPDATED TABLE CELLS --- */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-700">{book.genre?.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-700">{book.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditClick(book)}
                      className="text-amber-600 hover:text-amber-800 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(book.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-stone-500">No books found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 7. Edit Book Modal (Updated) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-amber-200">
            <h3 className="text-2xl font-bold text-amber-900 mb-4">Edit Book</h3>
            {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-stone-700">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={editFormData.title}
                  onChange={handleModalChange}
                  className="mt-1 block w-full p-2 rounded-lg bg-white text-stone-900 border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
              {/* --- 8. Add Genre Dropdown to Modal --- */}
              <div>
                <label htmlFor="genreId" className="block text-sm font-medium text-stone-700">Genre</label>
                <select
                  name="genreId"
                  id="genreId"
                  value={editFormData.genreId}
                  onChange={handleModalChange}
                  className="mt-1 block w-full p-2 rounded-lg bg-white text-stone-900 border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                >
                  <option value="" disabled>Select a genre</option>
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="desc" className="block text-sm font-medium text-stone-700">Description</label>
                <textarea
                  name="desc"
                  id="desc"
                  rows="4"
                  value={editFormData.desc}
                  onChange={handleModalChange}
                  className="mt-1 block w-full p-2 rounded-lg bg-white text-stone-900 border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 text-sm font-medium text-stone-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleModalSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageBooks;