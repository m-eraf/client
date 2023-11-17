import React, { useState } from 'react';

const UpdateForm = ({ user, onUpdate, onCancel }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onUpdate(updatedUser);
  };

  return (
    
    <div className="fixed md:top-1/2 top-[22em] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-lg md:h-[40em]  shadow-md w-[90%] md:w-2/3 lg:w-1/2 xl:w-1/3">
      <h2 className="text-2xl mb-4">Update User</h2>
      {Object.keys(updatedUser).map((property) => (
        <div key={property} className="md:mb-4 mb-2">
          <label className="block text-sm font-medium text-gray-700">
            {property.charAt(0).toUpperCase() + property.slice(1)}:
            <input
              type="text"
              name={property}
              value={updatedUser[property]}
              onChange={handleInputChange}
              className=" border rounded-md w-full"
            />
          </label>
        </div>
      ))}
      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
        >
          Update User
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateForm;
