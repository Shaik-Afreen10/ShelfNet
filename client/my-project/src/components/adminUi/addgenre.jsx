// src/components/adminUi/addgenre.jsx
import React, { useState } from 'react';
import axios from 'axios';

function AddGenre() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // 🔹 Dynamic API Base URL Setup for Vercel / Local Dev
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8060';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setMessage('You must be logged in to add a genre.');
      setIsSuccess(false);
      return;
    }
    try {
      // CHANGED: Using dynamic baseUrl variable instead of hardcoded localhost
      const response = await axios.post(
        `${baseUrl}/api/admin/genre`,
        { name: name },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setMessage(`Genre "${response.data.data.name}" created successfully!`);
      setIsSuccess(true);
      setName(''); 
    } catch (err) {
      console.error('Error adding genre:', err);
      setIsSuccess(false);
      setMessage(err.response?.data?.message || 'Error adding genre. Please try again.');
    }
  };

  // --- ✨ UPDATED STYLING ---
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-amber-200/50 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">
        Add New Genre
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g., Science Fiction"
            className="grow w-full p-3 rounded-lg bg-white text-stone-900 border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
          
          <button
            type="submit"
            className="py-3 px-6 text-white font-bold rounded-lg bg-linear-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 transition duration-300 whitespace-nowrap shadow-md"
          >
            Add Genre
          </button>
        </div>
        
        {message && (
          <p className={`mt-4 text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default AddGenre;