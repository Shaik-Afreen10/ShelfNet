import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContent from "./components/common/maincontent.jsx";
import Register from "./components/userui/register.jsx";
import Login from "./components/common/login.jsx";
import About from "./components/common/about.jsx";
import BookShelf from "./components/userui/books.jsx";
import Profile from "./components/userui/profile.jsx";
import AdminDashboard from "./components/adminUi/AdminDashboard.jsx";
import ManageUsers from "./components/adminUi/manageusers.jsx";
import AddBook from "./components/adminUi/addbook.jsx";
import "./main.css";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userui/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/bookshelf" element={<BookShelf />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/adminUi/dashboard" element={<AdminDashboard />} />
        <Route path="/adminUi/manageusers" element={<ManageUsers />} />
        <Route path="/adminUi/addbook" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
