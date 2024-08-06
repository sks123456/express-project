import React, { useState } from "react";
import { getCurrentUser, User } from "../Api/UserApi";
import { useNavigate } from "react-router-dom";

const CurrentUser: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showDetails, setShowDetails] = useState(false); // State to toggle user details visibility
  const navigate = useNavigate();

  const handleGetCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await getCurrentUser(token);
        setCurrentUser(user);
        setShowDetails(!showDetails); // Toggle the visibility of user details
        console.log("Current user:", user);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  // Function to truncate the token
  const truncateToken = (token: string | null) => {
    if (!token) return "";
    return `${token.slice(0, 10)}...${token.slice(-10)}`; // Show first 10 and last 10 characters
  };

  // Function to copy the token to clipboard
  const copyToClipboard = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigator.clipboard.writeText(token);
      alert("Token copied to clipboard");
    }
  };

  return (
    <div className="current-user-section">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
        onClick={handleGetCurrentUser}
      >
        {showDetails ? "Hide Details" : "User Details"}
      </button>
      {showDetails && currentUser && (
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <p>
            <strong>Username:</strong> {currentUser.username}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <div className="flex items-center">
            <p className="mr-2">
              <strong>Token:</strong>{" "}
              {truncateToken(localStorage.getItem("token"))}
            </p>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded"
              onClick={copyToClipboard}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentUser;
