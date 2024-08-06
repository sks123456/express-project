import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import Register from "../components/Register";
import Modal from "../components/Modal"; // Import the modal component

const AuthPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <LoginForm />
      <button
        className="mt-4 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
        onClick={openModal}
      >
        Show Register Form
      </button>
      {isModalOpen && (
        <Modal message="" onClose={closeModal}>
          <Register /> {/* Render the Register component inside the modal */}
        </Modal>
      )}
    </div>
  );
};

export default AuthPage;
