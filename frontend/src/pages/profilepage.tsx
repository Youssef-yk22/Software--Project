// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user'); // Replace with your API endpoint
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Profile</h1>
      </header>
      <main className="profile-content">
        {error && <p className="error-message">{error}</p>}
        {user ? (
          <div>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Account Type: {user.role}</p> {/* 'role' could be student, admin, or instructor */}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
