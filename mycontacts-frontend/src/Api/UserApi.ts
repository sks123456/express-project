import axios from "axios";
import { toast } from "react-toastify";

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
export const loginUser = async (
  loginData: LoginData
): Promise<{ accessToken: string }> => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, loginData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Check for 401 status code
      if (error.response.status === 401) {
        toast.error("Unauthorized: Incorrect email or password");
        throw new Error("Unauthorized: Incorrect email or password");
      }
      console.error("Error:", error.response.data);
      throw new Error("An error occurred while logging in.");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
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
