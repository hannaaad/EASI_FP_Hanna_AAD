import api from '../api';

interface User {
  username: string;
  password_hash: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  address?: string;
  country?: string;
  date_of_birth?: string;
  sex?: 'M' | 'F' | 'O';
  status?: 'active' | 'inactive';
  role?: 'admin' | 'user';
}

export const createUser = async (user: User) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const getUserById = async (userId: number) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId: number, user: Partial<User>) => {
  const response = await api.put(`/users/${userId}`, user);
  return response.data;
};

export const deleteUser = async (userId: number) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};