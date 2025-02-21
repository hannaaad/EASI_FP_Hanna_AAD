import { useMemo } from 'react';
import axios from 'axios';

const useAxiosAuth = (username: string, password: string) => {
  return useMemo(() => {
    return axios.create({
      baseURL: 'http://localhost:3000', // Update to match your backend URL
      withCredentials: false,
      auth: {
        username,
        password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, [username, password]);
};

export default useAxiosAuth;