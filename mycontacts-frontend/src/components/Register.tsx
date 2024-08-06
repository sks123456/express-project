import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Api/UserApi";
import Modal from "./Modal"; // Import the modal component

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      await registerUser({ username, email, password });
      setModalVisible(true); // Show the modal on successful registration
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    navigate("/"); // Redirect to login after closing the modal
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          New User?
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
          >
            Register
          </button>
        </form>
        {modalVisible && (
          <Modal
            message="You have successfully registered!"
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
