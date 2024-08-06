// components/LogoutButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      localStorage.removeItem("token"); // Remove the token from localStorage
      navigate("/"); // Redirect to the login page
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
