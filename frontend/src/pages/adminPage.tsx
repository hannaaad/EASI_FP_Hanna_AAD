import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session or token
    navigate('/login');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminPage;