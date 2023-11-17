import React, { useState } from 'react';

const CreateTeamModal = ({ users, onCancel, onCreateTeam }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamName, setTeamName] = useState('');

  const handleUserSelect = (user) => {
    const isUserSelected = selectedUsers.some((selectedUser) => selectedUser._id === user._id);

    if (isUserSelected) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((selectedUser) => selectedUser._id !== user._id)
      );
    } else {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    }
  };

  const handleCreateTeam = () => {
    if (teamName.trim() === '') {
      alert('Please enter a team name.');
      return;
    }
    if (selectedUsers.length === 0) {
      alert('Please select at least one user for the team.');
      return;
    }

    onCreateTeam(teamName.trim(), selectedUsers);
    setTeamName('');
    setSelectedUsers([]);
    onCancel();
  };

  return (
    <div className="modal mx-auto md:w-[50%] w-[80%] p-4 bg-white rounded-lg shadow-md max-w-md">
      <h2 className="text-2xl font-bold mb-4">Create Team</h2>
      <label className="block mb-2">
        Team Name:
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>
      <h3 className="text-xl font-bold mb-2">Select Team Members</h3>
      <ul className="max-h-[16em] overflow-y-auto">
        {users.map((user) => (
          <li
            key={user._id}
            onClick={() => handleUserSelect(user)}
            className={`cursor-pointer py-2 ${
              selectedUsers.includes(user) ? 'bg-blue-200' : ''
            }`}
          >
            {user.first_name} {user.last_name} - {user.domain} {user.available.toString()}
          </li>
        ))}
      </ul>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleCreateTeam}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
        >
          Create Team
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

export default CreateTeamModal;
