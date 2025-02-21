import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosAuth from '../hooks/useAxiosAuth'; // Adjust the import path

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create an authenticated Axios instance
      const authAxios = useAxiosAuth(username, password);

      // Send login request to the backend
      const response = await authAxios.post('/login', {
        username,
        password,
      });

      const { role } = response.data;

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'user') {
        navigate('/user');
      } else {
        setError('Invalid role');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;