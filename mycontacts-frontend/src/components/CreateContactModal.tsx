import React, { useState } from "react";
import { createContact } from "../Api/ContactApi"; // Adjust the import based on your file structure
import Modal from "./Modal"; // Import the modal component

const CreateContact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState("");

  const handleCreateContact = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      await createContact({ name, email, phone });
      setModalVisible(true); // Show the modal on successful contact creation
      // Clear form fields after creation
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Error creating contact:", error);
      setError("Failed to create contact. Please try again."); // Set error message
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    // You can add additional logic here if needed (like refreshing the contact list)
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Create New Contact
        </h2>
        <form onSubmit={handleCreateContact}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
          >
            Create Contact
          </button>
        </form>
        {error && <p className="text-red-600">{error}</p>}
        {modalVisible && (
          <Modal message="Contact created successfully!" onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default CreateContact;
