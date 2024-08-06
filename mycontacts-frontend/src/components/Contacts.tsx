// src/components/ContactsList.tsx
import React, { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../Api/ContactApi";
import CreateContact from "./CreateContactModal";
import Modal from "./Modal";

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const fetchContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure on deleting the contact for ${name}`
    );
    if (confirmed) {
      try {
        await deleteContact(id); // Call the delete function
        // Assuming deleteContact throws an error on failure
        fetchContacts();
      } catch (error) {
        console.error("Error deleting contact:", error);
        // You may want to handle the error (e.g., show a notification) here
      }
    }
  };

  return (
    <div className="w-auto">
      {/* Button to open the modal for creating a new contact */}
      <button
        className="mt-4 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
        onClick={openModal}
      >
        Create Contact
      </button>

      {/* Modal for creating a new contact */}
      {isModalOpen && (
        <Modal message="" onClose={closeModal}>
          <CreateContact />{" "}
          {/* Render the CreateContact component inside the modal */}
        </Modal>
      )}

      {/* Table to display contacts */}
      <table className="min-w-full bg-white border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className="py-2 px-4 border-b">{contact.name}</td>
              <td className="py-2 px-4 border-b">{contact.email}</td>
              <td className="py-2 px-4 border-b">{contact.phone}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(contact._id, contact.name)}
                  className="py-1 px-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsList;
