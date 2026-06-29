import React, { useState } from 'react';
import ManageUsers from './manageusers';
import ManageBooks from './managebooks';
import AddGenre from './addgenre';
import AddBook from './addbook';

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState('users');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    window.location.href = '/login';
  };

  const renderView = () => {
    switch (currentView) {
      case 'users':
        return <ManageUsers />;
      case 'books':
        return <ManageBooks />;
      case 'addGenre':
        return <AddGenre />;
      case 'addBook':
        return <AddBook />;
      default:
        return <ManageUsers />;
    }
  };

  // --- 🎨 UPDATED navButtonClass with icon support ---
  const navButtonClass = (viewName) =>
    `w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
      currentView === viewName
        ? 'bg-amber-600 text-white shadow-lg'
        : 'text-amber-100 hover:bg-amber-800 hover:text-white'
    }`;

  return (
    <div className="flex min-h-screen bg-orange-50 text-amber-950 font-[Raleway]">
      
      {/* --- ✨ UPDATED Sidebar --- */}
      <aside className="w-64 bg-amber-900 text-amber-100 p-5 flex flex-col shadow-lg z-10 border-r border-amber-800/30">
        <h1 className="text-4xl font-[Pacifico] text-amber-400 mb-12 text-center">
          ShelfNet
        </h1>
        <nav className="flex flex-col space-y-3">
          {/* --- 🎨 ICONS ADDED --- */}
          <button onClick={() => setCurrentView('users')} className={navButtonClass('users')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0110 13v-2.26A6.97 6.97 0 0012 9a6.99 6.99 0 00-6-6.92V1.5a.5.5 0 00-1 0V2.08A6.99 6.99 0 000 9c0 3.86 3.14 7 7 7v-2.26c-.43-.09-.84-.23-1.23-.4l-1.83 1.83a.5.5 0 00.7.71L6.7 14.77A5 5 0 0110 13v2.26c.43.09.84.23 1.23.4l1.83-1.83a.5.5 0 00-.7-.71L10.53 15.2z" /></svg>
            <span>Manage Users</span>
          </button>
          
          <button onClick={() => setCurrentView('books')} className={navButtonClass('books')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 005.5 16c1.255 0 2.443-.29 3.5-.804v-10zM6.5 16A6.969 6.969 0 015.5 16V4A6.969 6.969 0 016.5 4v12zM14.5 4A7.969 7.969 0 0011 4.804v10A7.968 7.968 0 0014.5 16c1.255 0 2.443-.29 3.5-.804v-10A7.968 7.968 0 0014.5 4zM13.5 16V4A6.969 6.969 0 0114.5 4A6.969 6.969 0 0115.5 4v12A6.969 6.969 0 0114.5 16z" /></svg>
            <span>Manage Books</span>
          </button>
          
          <button onClick={() => setCurrentView('addGenre')} className={navButtonClass('addGenre')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 112 0v4h4a1 1 0 110 2H9V5z" clipRule="evenodd" /></svg>
            <span>Add Genre</span>
          </button>
          
          <button onClick={() => setCurrentView('addBook')} className={navButtonClass('addBook')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l.293.293a1 1 0 001.414-1.414l-7-7z" /><path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L15 9.414V17a1 1 0 01-1 1h-2a1 1 0 01-1-1V6.414l-1.293 1.293a1 1 0 01-1.414-1.414l4-4z" /></svg>
            <span>Add Book</span>
          </button>
        </nav>
        
        <div className="mt-auto">
          <a
            href="/"
            className="block w-full text-center px-4 py-3 rounded-lg text-amber-100 hover:bg-amber-800 hover:text-white transition-colors duration-200 mb-3"
          >
            Back to Home
          </a>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 p-8 md:p-12 overflow-auto">
        {/* The child component (e.g., ManageUsers) will render here */}
        {renderView()}
      </main>
    </div>
  );
}