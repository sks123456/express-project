import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token"); // Assuming you store the token in local storage
};

export const getContacts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/contacts`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error occurred in getContacts:");
    if (axios.isAxiosError(error)) {
      console.error("Axios error message:", error.message);
      console.error("Axios error response:", error.response);
      if (error.response?.status === 401) {
        window.location.href = "/";
      }
    } else {
      console.error("Unexpected error:", error);
    }
    return [];
  }
};

interface Contact {
  name: string;
  email: string;
  phone: string;
}

export const createContact = async (contact: Contact) => {
  try {
    const response = await axios.post(`${API_URL}/api/contacts`, contact, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

export const getContact = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      window.location.href = "/";
    }
    throw error;
  }
};

export const updateContact = async (
  id: string,
  contact: { name: string; email: string; phone: string }
) => {
  try {
    const response = await axios.put(`${API_URL}/api/contacts/${id}`, contact, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

export const deleteContact = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/api/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting contact:", error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      window.location.href = "/";
    }
    throw error;
  }
};
