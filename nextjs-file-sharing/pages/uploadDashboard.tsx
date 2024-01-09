import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/NavBar';

interface User {
  id: string;
  username: string;
}

const Dashboard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
console.log("selecteed", selectedUsers);

  useEffect(() => {
    // Fetch the list of users when the component mounts
    fetch('/api/getUsersList')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  useEffect(() => {
    // Update filteredUsers when searchTerm changes
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleUserSelect = (user: User) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile ) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await axios.post('/api/uploadFile', formData);
        const sharedFile = response.data.file;

        if(selectedUsers.length>0){
          await Promise.all(
            selectedUsers.map((user) =>
              axios.post('/api/shareFile', {
                userId: user.id,
                fileId: sharedFile.id,
              })
            )
          );
        }

        alert('File uploaded and shared successfully!');
      } catch (error) {
        console.error('File upload error:', error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>

      <h2>Search Users</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <h2>Select Users to Share File With</h2>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user)}
              onChange={() => handleUserSelect(user)}
            />
            {user.username}
          </li>
        ))}
      </ul>

      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload and Share</button>

    </div>
  );
};

export default Dashboard;
