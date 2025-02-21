import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session or token
    navigate('/login');
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, User!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserPage;