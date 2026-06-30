import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Dynamic API Base URL Setup for Vercel / Local Dev
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8060';

  // --- 1. State for the Edit Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', pass: '' });

  // --- 2. Fetch Users ---
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError("Admin token not found. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        // CHANGED: Adjusted to use dynamic baseUrl variable
        const response = await axios.get(`${baseUrl}/api/admin/allusers`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUsers(response.data.users || response.data.data || []); 
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.response?.data?.message || "Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [baseUrl]); // Added baseUrl dependency

  // --- 3. Handlers for Delete ---
  const handleDeleteClick = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        const token = localStorage.getItem('adminToken');
        // CHANGED: Adjusted to use dynamic baseUrl variable
        await axios.delete(`${baseUrl}/api/admin/user/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        // Remove user from state to update UI instantly
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        console.error("Delete error:", err);
        setError("Failed to delete user.");
      }
    }
  };

  // --- 4. Handlers for Edit Modal ---
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditFormData({ name: user.name, email: user.email, pass: '' }); // Pre-fill form
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setEditFormData({ name: '', email: '', pass: '' });
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModalSave = async () => {
    const dataToUpdate = {
      name: editFormData.name,
      email: editFormData.email,
    };
    // Only include the password if the user typed one
    if (editFormData.pass) {
      dataToUpdate.pass = editFormData.pass;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      // CHANGED: Adjusted to use dynamic baseUrl variable
      const response = await axios.patch(`${baseUrl}/api/admin/user/${selectedUser.id}`, dataToUpdate, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Update the user in the list
      setUsers(users.map(user => 
        user.id === selectedUser.id ? response.data.data : user
      ));
      handleModalClose(); // Close the modal on success

    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.message || "Failed to update user.");
    }
  };


  // --- 5. Render Logic ---
  if (loading) return <p className="text-center text-amber-700">Loading users...</p>;
  if (error && !isModalOpen) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      {/* --- Main User Table Card --- */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-amber-200/50">
        <h2 className="text-3xl font-bold text-amber-900 mb-6">Manage Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-amber-100">
            <thead className="bg-orange-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">User ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.length > 0 ? users.map((user) => (
                <tr key={user.id} className="hover:bg-orange-50/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-700">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600 font-mono">{user.id}</td>
                  {/* --- Action Buttons --- */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-amber-600 hover:text-amber-800 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-stone-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Edit User Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-amber-200">
            <h3 className="text-2xl font-bold text-amber-900 mb-4">Edit User</h3>
            {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editFormData.name}
                  onChange={handleModalChange}
                  className="mt-1 block w-full p-2 rounded-lg bg-white text-stone-900 border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={editFormData.email}
                  onChange={handleModalChange}
                  className="mt-1 block w-full p-2 rounded-lg bg-white text-stone-900 border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label htmlFor="pass" className="block text-sm font-medium text-stone-700">New Password (optional)</label>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  value={editFormData.pass}
                  onChange={handleModalChange}
                  placeholder="Leave blank to keep current password"
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

export default ManageUsers;