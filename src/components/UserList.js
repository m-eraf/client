import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import UpdateForm from './UpdateForm';
import AddUserForm from './AddUserForm';
import CreateTeamModal from './CreateTeamModal';
import { Toaster, toast } from 'react-hot-toast';

const UserList = () => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
    const [isAddUserFormVisible, setAddUserFormVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [domainFilter, setDomainFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [availabilityFilter, setAvailabilityFilter] = useState('');
    const debounceTimeout = useRef(null);
    const [isCreateTeamFormVisible, setCreateTeamFormVisible] = useState(false);
    const [isTeamListVisible, setTeamListVisible] = useState(false);
    const [teamList, setTeamList] = useState([]);

    const fetchTeamList = async () => {
        try {
            const response = await axios.get('team/api/teams');
            setTeamList(response.data);
        } catch (error) {
            console.error('Error fetching team list', error);
        }
    };


    const openTeamListModal = () => {
        fetchTeamList();
        setTeamListVisible(true);
    };

    const closeTeamListModal = () => {
        setTeamListVisible(false);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `/api/users?page=${currentPage}&search=${searchQuery}&domain=${domainFilter}&gender=${genderFilter}&availability=${availabilityFilter}`
                );
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        fetchUsers();
    }, [currentPage, searchQuery, domainFilter, genderFilter, availabilityFilter]);

    const fetchFilteredUsers = async () => {
        try {
            const response = await axios.get(
                `/api/users?page=${currentPage}&search=${searchQuery}&domain=${domainFilter}&gender=${genderFilter}&availability=${availabilityFilter}`
            );
            setFilteredUsers(response.data);
        } catch (error) {
            console.error('Error fetching filtered users', error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setSelectedUser(null);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
        setSelectedUser(null);
    };

    const handleCardClick = (user) => {
        setSelectedUser(user);
        setUpdateFormVisible(true);
    };

    const handleUpdateFormCancel = () => {
        setUpdateFormVisible(false);
    };

    const handleUpdateFormSubmit = async (updatedUser) => {
        try {
            await axios.put(`/api/users/${updatedUser._id}`, updatedUser);
            setUpdateFormVisible(false);
            fetchFilteredUsers();
            toast.success('User updated successfully');
        } catch (error) {
            console.error('Error updating user', error);
            toast.error('Error updating user');
        }
    };


    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/api/users/${userId}`);
            fetchFilteredUsers();
            toast.success('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user', error);
            toast.error('Error deleting user');
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            fetchFilteredUsers();
        }, 300);
    };

    const handleDomainChange = (e) => {
        setDomainFilter(e.target.value);
        fetchFilteredUsers();
    };

    const handleGenderChange = (e) => {
        setGenderFilter(e.target.value);
        fetchFilteredUsers();
    };

    const handleAvailabilityChange = (e) => {
        setAvailabilityFilter(e.target.value);
        fetchFilteredUsers();
    };

    const handleAddUserFormToggle = () => {
        setAddUserFormVisible(!isAddUserFormVisible);
    };

    const handleAddUser = async (newUser) => {
        try {
            await axios.post('/api/users', newUser);
            setAddUserFormVisible(false);
            toast.success('User added successfully');
        } catch (error) {
            console.error('Error adding user', error);
            toast.error('Error adding user');
        }
    };

    const handleCreateTeam = async (teamName, selectedUsers) => {
        try {
            const response = await axios.post('team/api/team', { teamName, selectedUsers });
            console.log('New team created:', response.data);
            setCreateTeamFormVisible(false);
            toast.success('Team created successfully');
        } catch (error) {
            console.error('Error creating team', error);
            toast.error('Error creating team');
        }
    };


    const [expandedTeams, setExpandedTeams] = useState([]);

    const handleTeamClick = (teamId) => {
        setExpandedTeams((prevExpandedTeams) => {
            if (prevExpandedTeams.includes(teamId)) {
                return prevExpandedTeams.filter((id) => id !== teamId);
            } else {
                return [...prevExpandedTeams, teamId];
            }
        });
    };
    return (
        <div className="container mx-auto p-10 overflow-hidden">
            <h1 className="text-3xl font-bold underline mb-4">User List</h1>
            <div className="mb-4  flex flex-col md:gap-4 md:flex-row">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-2 border rounded mb-2"
                />
                <label className="mb-2">
                    Domain:
                    <select value={domainFilter} onChange={handleDomainChange} className="p-2 border rounded">
                        <option value="">All</option>
                        <option value="UI Designing">UI Designing</option>
                        <option value="IT">IT</option>
                        <option value="Management">Management</option>
                        <option value="Business Development">Business Development</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                    </select>
                </label>
                <label className="mb-2">
                    Gender:
                    <select value={genderFilter} onChange={handleGenderChange} className="p-2 border rounded">
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>
                <label className="mb-2">
                    Availability:
                    <select value={availabilityFilter} onChange={handleAvailabilityChange} className="p-2 border rounded">
                        <option value="">All</option>
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </label>
                <button
                    onClick={() => setCreateTeamFormVisible(true)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none mb-2"
                >
                    Create Team
                </button>
                <button
                    onClick={openTeamListModal}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none mb-2"
                >
                    Show Team List
                </button>
                <button
                    onClick={handleAddUserFormToggle}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-700 focus:outline-none mb-2"
                >
                    Add New User
                </button>
                {isAddUserFormVisible && (
                    <AddUserForm onAddUser={handleAddUser} onCancel={handleAddUserFormToggle} />
                )}
            </div>

            <div className="md:left-[60%] md:transform md:-translate-x-1/2  relative flex flex-wrap gap-2 ">
                {filteredUsers.map((user) => (
                    <UserCard
                        key={user._id}
                        user={user}
                        onCardClick={handleCardClick}
                        onDeleteUser={handleDeleteUser}
                    />
                ))}
            </div>

            {isUpdateFormVisible && selectedUser && (
                <UpdateForm
                    user={selectedUser}
                    onUpdate={handleUpdateFormSubmit}
                    onCancel={handleUpdateFormCancel}
                />
            )}

            <div className="flex justify-between my-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 focus:outline-none"
                >
                    Previous Page
                </button>
                <span className="mx-4">Page {currentPage}</span>
                <button
                    onClick={handleNextPage}
                    className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 focus:outline-none"
                >
                    Next Page
                </button>
            </div>

            {isCreateTeamFormVisible && (
                <CreateTeamModal
                    users={filteredUsers}
                    onCreateTeam={handleCreateTeam}
                    onCancel={() => setCreateTeamFormVisible(false)}
                />
            )}

            {isTeamListVisible && (
                <div className="modal max-h-[80%] max-w-[70%] md:w-[50%]">
                    <h2>Team List</h2>
                    <ul>
                        {teamList.map((team) => (
                            <li key={team._id}>
                                <strong
                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                    onClick={() => handleTeamClick(team._id)}
                                >
                                    Team Name: {team.teamName}
                                </strong>
                                {expandedTeams.includes(team._id) && (
                                    <div>
                                        <strong>Members:</strong>
                                        <ul>
                                            {team.members.map((member, index) => (
                                                <li key={index}>
                                                    {member.user} - {member.domain}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={closeTeamListModal}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-700 focus:outline-none"
                    >
                        Close Team List
                    </button>
                </div>
            )}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default UserList;
