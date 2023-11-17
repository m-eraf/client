import React, { useState } from 'react';

const AddUserForm = ({ onAddUser, onCancel }) => {
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    avatar: '',
    domain: '',
    available: false,
  });

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = () => {
    // Perform any validation if needed
    onAddUser(newUser);
  };

  return (
    <div className="modal mx-auto p-4 bg-white rounded-lg shadow-md md:w-[50%] w-[80%]">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      <label className="block mb-2">
        First Name:
        <input
          type="text"
          name="first_name"
          value={newUser.first_name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Last Name:
        <input
          type="text"
          name="last_name"
          value={newUser.last_name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Email:
        <input
          type="text"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Gender:
        <input
          type="text"
          name="gender"
          value={newUser.gender}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Avatar:
        <input
          type="text"
          name="avatar"
          value={newUser.avatar}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Domain:
        <input
          type="text"
          name="domain"
          value={newUser.domain}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </label>
      <label className="block mb-2">
        Available:
        <input
          type="checkbox"
          name="available"
          checked={newUser.available}
          onChange={handleCheckboxChange}
        />
      </label>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
        >
          Add User
        </button>
        <button
          onClick={onCancel}
          className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddUserForm;
