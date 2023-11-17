import React from 'react';

const UserCard = ({ user, onCardClick, onDeleteUser }) => {
  return (
    <div className="bg-white border-dashed border-2 card border-gray-300 justify-center rounded-lg overflow-hidden  m-4 md:h-[80%] h-[25em] w-[30em] md:w-1/2 lg:w-1/3 xl:w-1/4">
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="w-full h-40 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{`${user.first_name} ${user.last_name}`}</h3>
        <p className=" mb-2">Email: {user.email}</p>
        <p className="mb-2">Gender: {user.gender}</p>
        <p className=" mb-2">Domain: {user.domain}</p>
        <p className="mb-2">Available: {user.available ? 'Yes' : 'No'}</p>
        <div className="flex justify-between">
          <button
            onClick={() => onCardClick(user)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
          >
            Edit
          </button>
          <button
            onClick={() => onDeleteUser(user._id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
