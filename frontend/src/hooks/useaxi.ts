import { useMemo } from 'react';
import axios from 'axios';

export const useAxios = () => {
  return useMemo(() => {
    return axios.create({
      baseURL: 'http://localhost:3000', // Update to match your backend URL
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, []);
};