// src/api/contactsApi.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token"); // Assuming you store the token in local storage
};

export const getContacts = async () => {
  const jsonObj = await axios
    .get(`${API_URL}/api/contacts/`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      return response.data; // Get jsonObj
    })
    .catch((error) => {
      console.log(error.response.status);
      if (error.response.status === 401) {
        window.location.href = "/";
      }
    });

  return jsonObj;
};

export const createContact = async (contact: {
  name: string;
  email: string;
  phone: string;
}) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(contact),
  });
  return response.json();
};

export const getContact = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.json();
};

export const updateContact = async (
  id: string,
  contact: { name: string; email: string; phone: string }
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(contact),
  });
  return response.json();
};

export const deleteContact = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.json();
};
