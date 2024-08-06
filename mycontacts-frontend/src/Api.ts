import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export interface User {
  id: string;
  username: string;
  email: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

// Register user
export const registerUser = async (userData: RegisterData): Promise<User> => {
  const response = await axios.post(`${API_URL}/api/users/register`, userData);
  return response.data;
};

// Login user
export const loginUser = async (loginData: LoginData): Promise<{ accessToken: string }> => {
  const response = await axios.post(`${API_URL}/api/users/login`, loginData);
  return response.data;
};

// Get current user
export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/api/users/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
